const express = require('express');
const router = express.Router();
const s3Controller = require('../controllers/s3Controller')

router.get("/getUploadedPlaylists", s3Controller.getUploadedPlaylists)


module.exports = router;