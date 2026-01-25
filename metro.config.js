// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Add the onnx and ort extensions to the asset resolver
config.resolver.assetExts.push('tflite');

module.exports = config;
