import { UploadApiResponse } from 'cloudinary';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

import { logger } from '../utils/logger';
import cloudinary from './cloudinary';

dotenv.config();

export async function uploadFile(
  file: Express.Multer.File
): Promise<string> {
  try {
    const result = await new Promise<UploadApiResponse>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: uuidv4(), // Thay 'your_folder_name' bằng tên thư mục bạn muốn lưu trữ trên Cloudinary
              public_id:
                file.filename + new Date().getTime().toString(), // Đặt tên file tùy chỉnh
              overwrite: true, // Tùy chọn để ghi đè nếu file có cùng tên đã tồn tại
            },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result as UploadApiResponse);
              }
            }
          )
          .end(file.buffer); // Truyền buffer vào stream upload
      }
    );
    return result.secure_url;
  } catch (error) {
    logger.error('Upload failed: ', error);
    throw error;
  }
}

export async function deleteFile(url: string) {
  try {
    // Lấy public_id từ URL
    const publicId = url.split('/').slice(-2).join('/').split('.')[0];
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    logger.error('Deletion failed: ', error);
    throw error;
  }
}
