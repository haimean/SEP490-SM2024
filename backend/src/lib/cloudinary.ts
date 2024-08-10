import { v2 as cloudinary } from 'cloudinary';

// Cấu hình Cloudinary với API key và secret của bạn
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
