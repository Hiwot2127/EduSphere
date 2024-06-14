import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import cloudinary from '../config/cloudinary.js';
import config from '../config/config.js';
import upload from '../middlewares/multer.js';
import File from '../models/file.js';

// Handler to upload a file
export const uploadFile = async (req, res) => {
    upload(req, res, async function (err) {
        try {
            if (err instanceof multer.MulterError || err) {
                // Handle Multer errors and other unknown errors
                return res.status(400).json({ error: err.message });
            }

            // Extract request data
            const { title, courseName } = req.body;
            const file = req.file;

            if (!file) {
                return res.status(400).json({ error: 'Please upload a file.' });
            }

            // Define paths and file details
            const __filename = fileURLToPath(import.meta.url);
            const __dirname = path.dirname(__filename);
            const filePath = path.join(__dirname, '../middlewares/uploads', file.filename);

            let fileData = {
                title,
                courseName,
                public_id: "",
                secureUrl: "",
                resource_type: "",
                size: file.size,
                thumbnailUrl: ""
            };

            if (file.mimetype.startsWith('video/')) {
                // Handle video uploads
                const result = await cloudinary.uploader.upload(filePath, { resource_type: 'video' });
                fileData = {
                    ...fileData,
                    public_id: result.public_id,
                    secureUrl: result.secure_url,
                    resource_type: result.resource_type,
                    size: result.bytes
                };
                fs.unlinkSync(filePath);
            } else if (file.mimetype === 'application/pdf') {
                // Handle PDF uploads
                fileData = {
                    ...fileData,
                    secureUrl: `${config.SERVER_URL}/outputs/${file.filename}`,
                    resource_type: 'pdf'
                };
            }

            // Create a new file entry in the database
            const newFile = await File.create(fileData);
            res.status(200).json({ success: true, data: newFile });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    });
};

// Handler to get the list of uploaded files
export const getUploadedFiles = async (req, res) => {
    try {
        const perPage = 10;
        const page = parseInt(req.query.page, 10) || 1;
        const files = await File.find()
            .skip(perPage * (page - 1))
            .limit(perPage)
            .lean()
            .exec();

        if (!files.length) {
            return res.status(404).json({ error: 'No files found.' });
        }

        res.status(200).json({ success: true, data: files });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export default uploadFile;
