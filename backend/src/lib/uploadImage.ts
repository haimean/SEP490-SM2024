import { Request } from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import path from 'path';

// create s3 instance using S3Client
// (this is how we create s3 instance in v3)
const s3 = new S3Client({
  credentials: {
    accessKeyId: 'YOUR_ACCESS_KEY_ID_HERE', // store it in .env file to keep it safe
    secretAccessKey: 'YOUR_SECRET_KEY_HERE',
  },
  region: 'ap-south-1', // this is the region that you select in AWS account
});
const s3Storage = multerS3({
  s3: s3, // s3 instance
  bucket: 'my-images', // change it as per your project requirement
  acl: 'public-read', // storage access type
  metadata: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: any, metadata?: any) => void
  ) => {
    cb(null, { fieldname: file.fieldname });
  },
  key: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: any, key?: string) => void
  ) => {
    const fileName =
      Date.now() + '_' + file.fieldname + '_' + file.originalname;
    cb(null, fileName);
  },
});

// function to sanitize files and send error for unsupported files
function sanitizeFile(
  file: Express.Multer.File,
  cb: (error: any, result?: boolean) => void
) {
  // Define the allowed extension
  const fileExts = ['.png', '.jpg', '.jpeg', '.gif'];

  // Check allowed extensions
  const isAllowedExt = fileExts.includes(
    path.extname(file.originalname.toLowerCase())
  );

  // Mime type must be an image
  const isAllowedMimeType = file.mimetype.startsWith('image/');

  if (isAllowedExt && isAllowedMimeType) {
    return cb(null, true); // no errors
  } else {
    // pass error msg to callback, which can be displaye in frontend
    cb('Error: File type not allowed!');
  }
}

// our middleware
const uploadImage = multer({
  storage: s3Storage,
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    callback: multer.FileFilterCallback
  ) => {
    sanitizeFile(file, callback);
  },
  limits: {
    fileSize: 1024 * 1024 * 2, // 2mb file size
  },
});

export default uploadImage;
