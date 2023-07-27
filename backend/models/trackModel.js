import mongoose from 'mongoose'

const trackSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        artist: {
            type: String,
            required: true
        },
        songSource: {
            type: String,
            required: true
        },
        songImage: {
            type: String,
            required: false
        },
        songSourceId: {
            type: String,
            required: true
        },
        songImageId: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        }
    }
);

const Track = mongoose.model('Track', trackSchema);

export default Track