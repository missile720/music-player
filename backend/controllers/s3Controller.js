require('dotenv').config();
const { uploadFile } = require('../libs/client');

async function uploadFilesToS3(req, res) {
    // const fileId = req.body.fileId;
    // const fileBuffer = req.body.fileBuffer

    try {
        uploadFile("123esffes3", "fsefsef")
        console.log("Successfully uploaded files");
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    uploadFilesToS3
}

