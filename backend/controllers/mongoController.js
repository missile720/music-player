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

async function deleteMongoPlaylist() {

}

async function deleteMongoTrack(playlsitId, trackId) {

}

async function editMongoPlaylist(playlistData, tracks, trackIds) {
    const playlistToEdit = await Playlist.findOne({ id: playlistData.id });
    try {
        if (playlistData.name) {
            playlistToEdit.name = playlistData.name;
            await playlistToEdit.save();
        }
        if (playlistData.playlistImage) {
            playlistToEdit.coverImageSource = playlistData.playlistImage;
            playlistToEdit.coverImageSourceId = playlistData.playlistImageSourceId;
            await playlistToEdit.save();
        }
        if (tracks) {
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
            await playlistToEdit.tracks.push(...trackIds)
            await playlistToEdit.save();
        }
        console.log('Playlist updated successfully.');
    } catch (error) {
        console.log(error)
    }
}

/**
 * Helper function to get the source id of an audio or image source.
 * @param {String} documentType The document type to search for: playlist or track
 * @param {String} field The field id we want to get i.e. songSourceId, coverImageId, songImageId
 * @param {String} id The id document we want to search for
 * @returns {String} The source id of the field we want to search for to remove in Amazon S3
 */
async function getFieldId(documentType, field, id) {
    try {
        const documentToSearch = documentType === 'playlist' ? Playlist : Track;
        const fieldSetToRemove = await documentToSearch.findOne({ id: id });
        const fieldSourceId = fieldSetToRemove[field];

        return fieldSourceId
    }
    catch (error) {
        console.log(error)
    }
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

export {
    createMongoPlaylist,
    getMongoPlaylists,
    editMongoPlaylist,
    getFieldId
}