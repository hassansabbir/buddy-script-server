import dotenv from 'dotenv';
import path from 'path';

const envPath = path.resolve(process.cwd(), '.env');
dotenv.config({ path: envPath });

// Internal validation for Cloudinary credentials
if (!process.env.CLOUDINARY_CLOUD_NAME) {
  console.warn(`[CONFIG WARNING] CLOUDINARY_CLOUD_NAME is missing in ${envPath}`);
}

export default {
  port: process.env.PORT || 5000,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: Number(process.env.BCRYPT_SALT_ROUNDS) || 12,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME?.trim(),
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY?.trim(),
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET?.trim(),
};
