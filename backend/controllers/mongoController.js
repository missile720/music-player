import dotenv from 'dotenv';
import mongoose from 'mongoose'
import User from '../models/userModel.js'
import Playlist from '../models/playlistModel.js';
import Track from '../models/trackModel.js';

async function createMongoPlaylist(playlistData, tracks, trackIds) {
    try {
        console.log('Track IDs:', ...trackIds);
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
        console.log(playlist)
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

}

async function deleteMongoPlaylist() {

}

async function deleteMongoTrack() {

}

async function getMongoPlaylists() {

}



export { createMongoPlaylist, createMongoTrack }