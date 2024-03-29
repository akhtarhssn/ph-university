import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_URL: process.env.DATABASE_URL,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
  default_password: process.env.DEFAULT_PASS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_expires: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_expires: process.env.JWT_REFRESH_EXPIRES_IN,
  smtp_pass: process.env.SMTP_PASS,
  mail_sender: process.env.MAIL_SENDER,
  cloudinary_name: process.env.CLOUDINARY_NAME,
  cloudinary_api: process.env.CLOUDINARY_API,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
};
