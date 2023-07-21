import dotenv from 'dotenv';
import { nanoid } from 'nanoid'
import { formatS3Upload } from './s3Controller.js';
import { createMongoPlaylist, getMongoPlaylists, editMongoPlaylist, getFieldId, deleteMongoTrack } from '../controllers/mongoController.js'
import { deleteFileFromS3 } from '../libs/client.js';

dotenv.config();

const PLAYLIST = 'playlist';
const TRACK = 'track';
const COVER_IMAGE_ID = 'coverImageSourceId';
const SONG_SOURCE_ID = 'songSourceId';
const SONG_IMAGE_ID = 'songImageId';

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
    try {
        await createMongoPlaylist(playlist, tracks, tracksIds)
        res.send('File uploaded successfully.')
    } catch (error) {
        console.log({ "Error creating a new playlist": error });
    }
}

async function deletePlaylist(req, res) {
    const playlistId = req.body.playlistId;
    try {

        console.log(req)
    } catch (error) {
        console.log(error);
    }
}

async function deleteTrack(req, res) {
    const playlistId = req.body.playlistId;
    const trackId = req.body.trackId;
    try {
        const songSourceId = await getFieldId(TRACK, SONG_SOURCE_ID, trackId);
        const songImageId = await getFieldId(TRACK, SONG_IMAGE_ID, trackId);

        await deleteFileFromS3(songSourceId);
        await deleteFileFromS3(songImageId);
        await deleteMongoTrack(playlistId, trackId);

        res.send('Track deleted successfully.')
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

    const tracks = [];
    const newPlaylistData = {
        id: playlistId
    }
    const trackIds = [];

    if (playlistName) {
        newPlaylistData.name = playlistName
    }

    if (playlistImage && playlistImage.length) {
        const imageSourceId = await getFieldId(PLAYLIST, COVER_IMAGE_ID, playlistId);
        await deleteFileFromS3(imageSourceId);
        const { fileSource: playlistImageSource, fileId: playlistImageSourceId } = await formatS3Upload(playlistImage[0])
        newPlaylistData.playlistImage = playlistImageSource;
        newPlaylistData.playlistImageSourceId = playlistImageSourceId;
    }

    if (songSources && songSources.length) {
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
        trackIds.push(tracks.map(track => track.id))
    }
    try {
        await editMongoPlaylist(newPlaylistData, tracks, ...trackIds);
        res.send('Playlist edited successfully.')
    } catch (error) {
        console.log({ "Error editing the playlist": error });
    }
}

export {
    uploadNewPlaylist,
    deletePlaylist,
    deleteTrack,
    getPlaylists,
    editPlaylist
};
