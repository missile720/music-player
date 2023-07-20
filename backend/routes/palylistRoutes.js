import express from 'express';
import multer from 'multer'
import { uploadNewPlaylist, getPlaylists, editPlaylist } from '../controllers/playlistController.js';

const upload = multer({ storage: multer.memoryStorage() });
const multerUpload = upload.fields([
    { name: 'email', maxCount: 1 },
    { name: 'playlistName', maxCount: 1 },
    { name: 'playlistImage', maxCount: 1 },
    { name: 'songNames' },
    { name: 'songArtists' },
    { name: 'songImages' },
    { name: 'songSources' }
]);

const router = express.Router();

router.post("/uploadNewPlaylist", multerUpload, uploadNewPlaylist);
router.get("/getPlaylists/:email", getPlaylists);
router.get("/getPlaylists/:email", multerUpload, editPlaylist);

export default router;
