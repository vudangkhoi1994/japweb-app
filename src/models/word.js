const mongoose = require('mongoose');

const WordSchema = new mongoose.Schema({
    kana: {
        type: String,
        trim: true,
        required: true
    },
    kanji: {
        type: String,
        trim: true
    },
    meaning: {
        type: String,
        trim: true,
    },
    audio: {
        type: String,
        trim: true,
    },
    image: {
        type: String,
        trim: true,
    },
    type: {
        type: String,
        enum: ['n', 'v1', 'v2', 'v3', 'adj1', 'adj2', 'adv'],
        default: 'n'
    },
    unitid: {
        type: mongoose.Types.ObjectId,
        ref: 'Unit'
    }
}, {
    timestamps: true
})

const Word = mongoose.model('Word', WordSchema)

module.exports = Word
