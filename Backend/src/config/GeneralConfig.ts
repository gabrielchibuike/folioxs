// const cloudinary = require("cloudinary").v2;
import cloudinary from 'cloudinary'

// cloudinary.v2

export const cloud_upload = cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  // folder: "Home/gabbySoft",
});


 