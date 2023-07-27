import express from "express";
import multer from "multer";
import {
  uploadNewPlaylist,
  getPlaylists,
  editPlaylist,
  deleteTrack,
  deletePlaylist,
} from "../controllers/playlistController.js";

const upload = multer({ storage: multer.memoryStorage() });
const multerUpload = upload.fields([
  { name: "email", maxCount: 1 },
  { name: "playlistName", maxCount: 1 },
  { name: "playlistImage", maxCount: 1 },
  { name: "songNames" },
  { name: "songArtists" },
  { name: "songImages" },
  { name: "songSources" },
  { name: "trackId" },
]);

const router = express.Router();

router.post("/uploadNewPlaylist", multerUpload, uploadNewPlaylist);
router.get("/getPlaylists/:email", getPlaylists);
router.put("/editPlaylist", multerUpload, editPlaylist);
router.delete("/deleteTrack", deleteTrack);
router.delete("/deletePlaylist", deletePlaylist);

export default router;