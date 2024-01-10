import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import config from '../config';

export const sendImageToCloudinary = () => {
  cloudinary.config({
    cloud_name: config.cloudinary_name,
    api_key: config.cloudinary_api,
    api_secret: config.cloudinary_api_secret,
  });

  cloudinary.uploader.upload(
    'https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg',
    { public_id: 'olympic_flag' },
    function (error, result) {
      console.log(result);
    },
  );
};
