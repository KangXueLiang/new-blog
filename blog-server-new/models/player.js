import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const playerSchema = new Schema({
        title: {
            type: String,
            required: true,
        },
        artist: {
            type: String,
            required: true,
        },
        cover: {
            type: String,
            required: false,
        },
        music_file_url: {
            type: String,
            required: true,
        },
        lrc: {
            type: String,
            required: false,
        },
        upload_date: {
            type: Date,
            default: Date.now
        },
        order: {
            type: Number,
            default: 0
        }
    },
    {
        collection: 'player',
    }
);

const Player = module.exports = mongoose.model('Player', playerSchema);
