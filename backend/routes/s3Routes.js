const express = require('express');
const router = express.Router();
const s3Controller = require('../controllers/s3Controller')

router.post("/uploadFilesToS3", s3Controller.uploadFilesToS3)


module.exports = router;