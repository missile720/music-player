import mongoose from 'mongoose'

const playlistSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            "writable": true
        },
        coverImageSource: {
            type: String,
            required: true,
            "writable": true
        },
        coverImageSourceId: {
            type: String,
            required: true,
            "writable": true
        },
        tracks: [{
            type: String,
            ref: 'Track',
            "writable": true
        }],
        source: {
            type: String,
            default: 'local',
            "writable": true
        },
        id: {
            type: String,
            default: 'local',
        }
    }
);

const Playlist = mongoose.model('Playlist', playlistSchema);

export default Playlist

