import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        playlists: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Playlist'
        }]
    }
);

const User = mongoose.model('User', userSchema);

export { User }
