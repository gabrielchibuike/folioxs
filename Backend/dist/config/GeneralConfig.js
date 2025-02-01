"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloud_upload = void 0;
// const cloudinary = require("cloudinary").v2;
const cloudinary_1 = __importDefault(require("cloudinary"));
// cloudinary.v2
exports.cloud_upload = cloudinary_1.default.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    // folder: "Home/gabbySoft",
});
