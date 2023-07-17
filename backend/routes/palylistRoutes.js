import express from 'express';
import multer from 'multer'
const upload = multer({ storage: multer.memoryStorage() });
import { uploadNewPlaylist } from '../controllers/playlistController.js';

const router = express.Router();

router.post("/uploadNewPlaylist", upload.array('files'), uploadNewPlaylist);

export default router;
