/* eslint-disable @typescript-eslint/no-explicit-any */
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import config from '../config';
import fs from 'fs';

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
      },
    );

    // delete a file asynchronously
    fs.unlink(filePath, (err) => {
      if (err) {
        reject(err);
      } else {
        console.log('file is deleted successfully');
      }
    });
  });
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
