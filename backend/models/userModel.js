import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        playlists: [{
            type: String,
            ref: 'Playlist'
        }],
        id: {
            type: String,
            required: true,
            unique: true
        }
    }
);

const User = mongoose.model('User', userSchema);

export default User 
