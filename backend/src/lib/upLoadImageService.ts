import crypto from 'crypto';
import dotenv from 'dotenv';
import cloudinary from './cloudinary';
import { logger } from '../utils/logger';
import { UploadApiResponse } from 'cloudinary';

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
              folder: 'your_folder_name', // Thay 'your_folder_name' bằng tên thư mục bạn muốn lưu trữ trên Cloudinary
              public_id: file.filename + new Date().getTime(), // Đặt tên file tùy chỉnh
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
