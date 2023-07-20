import dotenv from 'dotenv';
import { nanoid } from 'nanoid'
import { formatS3Upload } from './s3Controller.js';
import { createMongoPlaylist, createMongoTrack, getMongoPlaylists, editMongoPlaylist } from '../controllers/mongoController.js'

dotenv.config();

async function uploadNewPlaylist(req, res) {
    try {
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

        res.send('File uploaded successfully.')
    } catch (error) {
        console.log({ "Error creating a new playlist": error });
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
    try {
        const playLists = await getMongoPlaylists(email);
        res.send(playLists)
    } catch (error) {
        console.log({ "Error retrieving playlists": error });
    }
}

async function editPlaylist(req, res) {
    const playlistName = req.body.playlistName;
    const playlistImage = req.files.playlistImage;
    const playlistId = req.body.playlistId

    const songSources = Array.isArray(req.files.songSources) ? req.files.songSources : [req.files.songSources];
    const songNames = Array.isArray(req.body.songNames) ? req.body.songNames : [req.body.songNames];
    const songImages = Array.isArray(req.files.songImages) ? req.files.songImages : [req.files.songImages];
    const songArtists = Array.isArray(req.body.songArtists) ? req.body.songArtists : [req.body.songArtists];

    const { fileSource: playlistImageSource, fileId: playlistImageSourceId } = await formatS3Upload(playlistImage[0])
    const newPlaylistData = {
        id: playlistId,
        name: playlistName,
        playlistImage: playlistImageSource,
        playlistImageSourceId: playlistImageSourceId
    }

    const tracks = [];

    if (songSources.length > 0) {
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
    }
    const tracksIds = tracks.map(track => track.id)

    try {
        const playLists = await editMongoPlaylist(newPlaylistData, tracks);
        res.send(playLists)
    } catch (error) {
        console.log({ "Error editing the playlist": error });
    }
}

export {
    uploadNewPlaylist,
    deletePlaylist,
    addNewTrack,
    deleteTrack,
    getPlaylists,
    editPlaylist
};
