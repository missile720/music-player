import dotenv from 'dotenv';
import { nanoid } from 'nanoid'
import { formatS3Upload } from './s3Controller.js';
import { createMongoPlaylist } from '../controllers/mongoController.js'

dotenv.config();

async function uploadNewPlaylist(req, res) {
    const email = req.body.email;
    const playlistName = req.body.playlistName;
    const playlistImage = req.files.playlistImage;
    const playlistId = nanoid(15);

    const songSources = [...req.files.songSources];
    const songNames = Array.isArray(req.body.songNames) ? [req.body.songNames] : req.body.songNames;
    const songImages = [req.body.songImages];
    const songArtists = Array.isArray(req.body.songArtists) ? [req.body.songArtists] : req.body.songArtists;
    const tracks = [];
    const playlist = {
        playlistName: playlistName,
        playlistImage: playlistImage,
        playlistId: playlistId,
    }
    console.log(req.body)

    // for (let i = 0; i < songSources.length; i++) {
    //     const { fileSource: songSource, fileId: songSourceId } = await formatS3Upload(songSources[i])
    //     const { fileSource: songImageSource, fileId: songImageId } = await formatS3Upload(songImages[i])
    //     tracks.push({
    //         name: songNames[i],
    //         artist: songArtists[i],
    //         songSource: songSource,
    //         songImage: songImageSource,
    //         songSourceId: songSourceId,
    //         songImageId: songImageId,
    //         id: nanoid(20)
    //     })
    // }
    // console.log(tracks)

    try {

        res.send('File uploaded successfully.')
    } catch (error) {
        console.log(error);
    }
}

async function deletePlaylist(req, res) {


    try {
        console.log(req)
    } catch (error) {
        console.log(error);
    }
}

async function addNewTrack(req, res) {


    try {
        console.log(req)
    } catch (error) {
        console.log(error);
    }
}

async function deleteTrack(req, res) {


    try {
        console.log(req)
    } catch (error) {
        console.log(error);
    }
}

export {
    uploadNewPlaylist,
    deletePlaylist,
    addNewTrack,
    deleteTrack
};
