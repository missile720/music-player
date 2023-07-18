import mongoose from 'mongoose'

const playlistSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        coverImageSource: {
            type: String,
            required: false
        },
        tracks: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Track'
        }],
        source: 'local'
    }
);

const Playlist = mongoose.model('Playlist', playlistSchema);

export { Playlist }

