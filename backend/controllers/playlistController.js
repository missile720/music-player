import dotenv from 'dotenv';
import { nanoid } from 'nanoid'
import { uploadFile } from '../libs/client.js';

dotenv.config();

async function uploadNewPlaylist(req, res) {
    const playlistName = req.body.playlistName;
    const files = req.files;
    console.log(playlistName)
    const playlistId = nanoid(15);

    console.log(playlistName, playlistId)
    try {
        for (let i = 0; i < files.length; i++) {
            const fileId = nanoid(20);
            const file = files[i];
            const buffer = file.buffer;
            const mimetype = file.mimetype
            console.log(file)
            await uploadFile(fileId, buffer, mimetype);
        }
        res.send('File uploaded successfully.')
    } catch (error) {
        console.log(error);
    }
}

export {
    uploadNewPlaylist,
};
