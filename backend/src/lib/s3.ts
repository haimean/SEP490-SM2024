import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import crypto from 'crypto';
import sharp from 'sharp';
import dotenv from 'dotenv';

dotenv.config();

const bucketName = process.env.AWS_BUCKET_NAME as string;
const region = process.env.AWS_BUCKET_REGION as string;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID as string;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY as string;

const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString('hex');

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

export async function uploadFile(file: any): Promise<string> {
  const fileBuffer = await sharp(file.buffer)
    .resize({ height: 1920, width: 1080, fit: 'contain' })
    .toBuffer();
  const filename = generateFileName();
  const uploadParams = {
    Bucket: bucketName,
    Body: fileBuffer,
    Key: filename,
    ContentType: file.mimetype,
  };

  await s3Client.send(new PutObjectCommand(uploadParams));
  return filename;
}

export function deleteFile(fileName: string) {
  const deleteParams = {
    Bucket: bucketName,
    Key: fileName,
  };

  return s3Client.send(new DeleteObjectCommand(deleteParams));
}

export async function getObjectSignedUrl(key: string) {
  const params = {
    Bucket: bucketName,
    Key: key,
  };

  // https://aws.amazon.com/blogs/developer/generate-presigned-url-modular-aws-sdk-javascript/
  const command = new GetObjectCommand(params);
  const seconds = 60;
  const url = await getSignedUrl(s3Client, command, {
    expiresIn: seconds,
  });

  return url;
}
