import dotenv from 'dotenv';
import { nanoid } from 'nanoid'
import { uploadFileToS3 } from '../libs/client.js';

dotenv.config();

async function uploadNewPlaylist(req, res) {
    const files = req.files;
    const playlistName = req.body.playlistName;
    const playlistId = nanoid(15);
    console.log({ 'Playlist Name': playlistName })
    try {
        for (let i = 0; i < files.length; i++) {
            const fileId = nanoid(20);
            const file = files[i];
            const buffer = file.buffer;
            const mimetype = file.mimetype

            const response = await uploadFileToS3(fileId, buffer, mimetype);
            const data = response.json();
            console.log(data)
        }
        res.send('File uploaded successfully.')
    } catch (error) {
        console.log(error);
    }
}

export {
    uploadNewPlaylist,
};
