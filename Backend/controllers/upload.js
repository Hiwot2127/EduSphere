import express from 'express';
import upload from '../middlewares/multer.js';
import multer from 'multer';
// upload.js (controller)
import cloudinary from '../config/cloudinary.js';
import fs from 'fs';
import File from '../models/file.js';
import path from 'path';
import { fileURLToPath } from 'url';
import config from '../config/config.js';


export const uploadFile = async (req, res) => {
    upload(req, res, async function (err) {
      try{
        const __filename = fileURLToPath(import.meta.url);

        const __dirname = path.dirname(__filename);
  
        if (err instanceof multer.MulterError) {
          // A Multer error occurred when uploading.
          return res.status(400).json({ error: err.message });
        } else if (err) {
          // An unknown error occurred when uploading.
          return res.status(400).json({ error: err.message });
        }
    
        // Everything went fine.
        const { title, courseName } = req.body;
        const file = req.file;
    
        if (!file) {
          return res.status(400).json({ error: 'Please upload a file.' });
        }
        const filePath = path.join(__dirname, '../middlewares/uploads', req.file.filename);
        let thumbnailUrl = ""
        let result;
        let secureUrl;
        let public_id;
        let resource_type;
        let size;
        if (req.file.mimetype.startsWith('video/')) {
          result = await cloudinary.uploader.upload(filePath, {
            resource_type: 'video',
          });
          public_id= result.public_id;
          secureUrl= result.secure_url;
          resource_type= result.resource_type;
          size= result.bytes;
          fs.unlinkSync(filePath);

        }
        else if (req.file.mimetype === 'application/pdf') {
          console.log("mimetype",req.file.mimetype,req.file.filename)
          secureUrl = `http://localhost:5000/outputs/${req.file.filename}`
          resource_type = 'pdf'
          size = req.file.size
        }

        const newFile = await File.create({
          title,
          courseName,
          public_id,
          secureUrl,
          resource_type,
          size,
          thumbnailUrl
        });
        console.log(newFile);
        res.status(200).json({ success: true, data: {...newFile} });
      }
      catch(err){
        console.log(err)
        res.status(500).json({ success: false, message: err.message });
      }

    });
};

export const getUploadedFiles = async (req, res) =>{
  try{
    const perpage = 10;
    const page = req.query.page || 1;
    const files = await File.find().skip((perpage * page) - perpage).limit(perpage).lean().exec();
    if (!files) {
      return res.status(404).json({ error: 'No files found.' });
    }
    res.status(200).json({ success: true, data: files });
  
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export default uploadFile;
