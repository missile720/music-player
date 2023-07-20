import dotenv from 'dotenv';
import mongoose from 'mongoose'
import User from '../models/userModel.js'
import Playlist from '../models/playlistModel.js';
import Track from '../models/trackModel.js';

async function createMongoPlaylist(playlistData, tracks, trackIds) {
    try {
        for (const track of tracks) {
            await Track.create({
                name: track.name,
                artist: track.artist,
                songSource: track.songSource,
                songImage: track.songImage,
                songSourceId: track.songSourceId,
                songImageId: track.songImageId,
                id: track.id
            });
        }
        const playlist = await Playlist.create({
            name: playlistData.name,
            coverImageSource: playlistData.coverImageSource,
            coverImageSourceId: playlistData.coverImageSourceId,
            tracks: [...trackIds],
            id: playlistData.id
        })
        playlist.save()
        const user = await User.findOne({ email: playlistData.email });

        if (user) {
            user.playlists.push(playlistData.id)
            await user.save()

        } else {
            await User.create({
                email: playlistData.email,
                playlists: [playlistData.id],
                id: playlistData.userId
            });
        }
        console.log('Playlist and tracks inserted successfully.');
    } catch (error) {
        console.log('Error creating playlist:', error)
    }

}

async function createMongoTrack() {
    try {

    } catch (error) {
        console.log(error)
    }
}

async function deleteMongoPlaylist() {

}

async function deleteMongoTrack() {

}

async function getMongoPlaylists(email) {
    const playlists = [];
    try {
        const user = await User.findOne({ email: email });
        const playlistIds = user.playlists;

        for (const playlistId of playlistIds) {
            const playlistSongs = []
            const playlist = await Playlist.findOne({ id: playlistId });
            const trackIds = playlist.tracks
            for (const track of trackIds) {
                const songData = await Track.findOne({ id: track });

                playlistSongs.push({
                    name: songData.name,
                    artist: songData.artist,
                    songSource: songData.songSource,
                    songImage: songData.songImage,
                    songSourceId: songData.songSourceId,
                    id: songData.id
                })
            }
            playlists.push({
                name: playlist.name,
                images: [{
                    url: playlist.coverImageSource,
                    id: playlist.coverImageSourceId
                }],
                tracks: [...playlistSongs],
                source: playlist.source,
                id: playlist.id
            })
        }
        return playlists
    } catch (error) {
        console.log(error)
    }
}

async function editMongoPlaylist(playlistId) {

    try {
        console.log(playlistId)

    } catch (error) {
        console.log(error)
    }
}


export { createMongoPlaylist, createMongoTrack, getMongoPlaylists, editMongoPlaylist }