/* eslint-disable @typescript-eslint/no-explicit-any */
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import fs from 'fs';

import config from '../config';

cloudinary.config({
  cloud_name: config.cloudinary_name,
  api_key: config.cloudinary_api,
  api_secret: config.cloudinary_api_secret,
});

export const sendImageToCloudinary = (fileName: string, filePath: string) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      filePath,
      { public_id: fileName },
      function (error, result) {
        if (error) {
          reject(error);
        }
        resolve(result);
        // delete the file from local uploads folder after uploading to cloudinary
        fs.unlink(filePath, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log('file is deleted successfully');
          }
        });
      },
    );
  });
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '.' + file.mimetype.split('/')[1];
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
