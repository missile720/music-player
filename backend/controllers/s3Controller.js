import dotenv from 'dotenv';
import { uploadFile } from '../libs/client.js';

dotenv.config();

async function uploadFilesToS3(req, res) {
    const fileId = req.body.Id;
    const file = req.body.file;

    try {
        console.log('TEST')
        //const response = await uploadFile(fileId, file);
        res.send('Test')
    } catch (error) {
        console.log(error);
    }
}

export {
    uploadFilesToS3,
};
