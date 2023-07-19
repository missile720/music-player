import dotenv from 'dotenv';
import { nanoid } from 'nanoid'
import { formatS3Upload } from './s3Controller.js';
import { createMongoPlaylist, createMongoTrack, getMongoPlaylists } from '../controllers/mongoController.js'

dotenv.config();

async function uploadNewPlaylist(req, res) {
    const email = req.body.email;
    const playlistName = req.body.playlistName;
    const playlistImage = req.files.playlistImage;
    const playlistId = nanoid(15);
    const userId = nanoid(15);

    const songSources = Array.isArray(req.files.songSources) ? req.files.songSources : [req.files.songSources];
    const songNames = Array.isArray(req.body.songNames) ? req.body.songNames : [req.body.songNames];
    const songImages = Array.isArray(req.files.songImages) ? req.files.songImages : [req.files.songImages];
    const songArtists = Array.isArray(req.body.songArtists) ? req.body.songArtists : [req.body.songArtists];

    const { fileSource: playlistImageSource, fileId: playlistImageSourceId } = await formatS3Upload(playlistImage[0])
    const tracks = [];
    const playlist = {
        email: email,
        userId: userId,
        name: playlistName,
        coverImageSource: playlistImageSource,
        coverImageSourceId: playlistImageSourceId,
        id: playlistId,
    }

    for (let i = 0; i < songSources.length; i++) {
        const { fileSource: songSource, fileId: songSourceId } = await formatS3Upload(songSources[i])
        const { fileSource: songImageSource, fileId: songImageId } = !songImages[i] ? { fileSource: '', fileId: 0 } : await formatS3Upload(songImages[i])
        tracks.push({
            name: songNames[i],
            artist: songArtists[i],
            songSource: songSource,
            songImage: songImageSource,
            songSourceId: songSourceId,
            songImageId: songImageId,
            id: nanoid(20)
        })
    }
    const tracksIds = tracks.map(track => track.id)
    createMongoPlaylist(playlist, tracks, tracksIds)

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
async function getPlaylists(req, res) {
    const email = req.params.email;
    console.log({ 'Email': email })
    try {
        const playLists = await getMongoPlaylists(email);
        console.log(playLists)
        res.send(playLists)
    } catch (error) {
        console.log(error)
    }
}

export {
    uploadNewPlaylist,
    deletePlaylist,
    addNewTrack,
    deleteTrack,
    getPlaylists
};
