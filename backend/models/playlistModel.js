import mongoose from 'mongoose'

const playlistSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        coverImageSource: {
            type: String,
            required: true
        },
        coverImageSourceId: {
            type: String,
            required: true
        },
        tracks: [{
            type: String,
            ref: 'Track'
        }],
        source: {
            type: String,
            default: 'local',
        },
        id: {
            type: String,
            default: 'local',
        }
    }
);

const Playlist = mongoose.model('Playlist', playlistSchema);

export default Playlist

