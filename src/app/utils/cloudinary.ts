import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import fs from 'fs';
import config from '../config/index.js';

if (config.cloudinary_cloud_name) {
  cloudinary.config({
    cloud_name: config.cloudinary_cloud_name,
    api_key: config.cloudinary_api_key,
    api_secret: config.cloudinary_api_secret,
  });
} else {
  console.error('[CLOUDINARY ERROR] Configuration is missing cloud_name.');
}

export const sendImageToCloudinary = (
  imageName: string,
  path: string,
): Promise<Record<string, any>> => {
  return new Promise((resolve, reject) => {
    console.log(`>>> Starting Cloudinary upload for: ${imageName}...`);
    cloudinary.uploader.upload(
      path,
      { 
        public_id: imageName.trim(),
        cloud_name: config.cloudinary_cloud_name,
        api_key: config.cloudinary_api_key,
        api_secret: config.cloudinary_api_secret,
      },
      function (error, result) {
        if (error) {
          console.error('>>> Cloudinary Upload Error:', error);
          reject(new Error(error.message || 'Image upload failed.'));
        } else {
          console.log('>>> Cloudinary Upload Success.');
          resolve(result as UploadApiResponse);
        }
        // delete a file synchronously
        if (fs.existsSync(path)) {
          fs.unlinkSync(path);
        }
      },
    );
  });
};
