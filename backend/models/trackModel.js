const mongoose = require('mongoose');

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
        }
    }
);

const Track = mongoose.model('Track', trackSchema);

module.exports = Track;