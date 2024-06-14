import upload from "../middlewares/multer.js";

import express from 'express';
import { Router } from "express";
import uploadFile from "../controllers/upload.js";
import { getUploadedFiles } from "../controllers/upload.js";
import auth from "../middlewares/authenticate.js";
const router = Router();
router.post("/",auth.isAuthenticated,auth.isInstructor,uploadFile)
router.get("/",auth.isAuthenticated,getUploadedFiles)

export default router;