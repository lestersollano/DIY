import os
import time
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Initialize FastAPI app
app = FastAPI(title="DIY Image Upload Server")

# Add CORS middleware to allow requests from your React Native app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for now, restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Supabase client
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("Missing SUPABASE_URL or SUPABASE_KEY in .env file")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

BUCKET_NAME = "profile picture"

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "ok", "message": "Server is running"}


@app.post("/upload")
async def upload_image(file: UploadFile = File(...)):
    """
    Upload an image to Supabase storage
    
    Args:
        file: Image file to upload
        
    Returns:
        {
            "success": bool,
            "filename": str (epoch time in ms + .jpg),
            "message": str,
            "url": str (optional)
        }
    """
    try:
        # Validate file type
        if file.content_type not in ["image/jpeg", "image/png", "image/gif", "image/webp"]:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid file type. Expected image, got {file.content_type}",
            )

        # Generate epoch time filename (in milliseconds)
        filename = f"logo_{int(time.time() * 1000)}.jpg"
        
        # Read file content
        file_content = await file.read()
        
        if not file_content:
            raise HTTPException(status_code=400, detail="File is empty")

        # Upload to Supabase storage
        try:
            response = supabase.storage.from_(BUCKET_NAME).upload(
                filename,
                file_content,
                file_options={"content-type": "image/jpeg"}
            )
            
            print(f"Upload successful: {response}")
            
            # Get public URL (returns string directly)
            public_url = supabase.storage.from_(BUCKET_NAME).get_public_url(filename)
            
            return JSONResponse(
                status_code=200,
                content={
                    "success": True,
                    "filename": filename,
                    "message": "Image uploaded successfully",
                    "url": public_url,
                },
            )
        
        except Exception as supabase_error:
            print(f"Supabase error: {supabase_error}")
            raise HTTPException(
                status_code=500,
                detail=f"Failed to upload to Supabase: {str(supabase_error)}",
            )

    except HTTPException:
        raise
    except Exception as e:
        print(f"Upload error: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred during upload: {str(e)}",
        )


@app.get("/")
async def root():
    """Root endpoint with API documentation"""
    return {
        "name": "DIY Image Upload Server",
        "version": "1.0.0",
        "endpoints": {
            "POST /upload": "Upload an image file",
            "GET /health": "Health check",
        },
        "usage": "Send a POST request to /upload with form-data containing 'file'",
    }


if __name__ == "__main__":
    import uvicorn
    
    # Run the server with auto-reload
    uvicorn.run(
        "app:app",
        host="0.0.0.0",
        port=8000,
        log_level="info",
        reload=True,
    )
