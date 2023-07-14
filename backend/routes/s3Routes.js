import express from 'express';
import { uploadFilesToS3 } from '../controllers/s3Controller.js';
const router = express.Router();

router.post("/uploadFilesToS3", uploadFilesToS3);

export default router;
