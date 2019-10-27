const mongoose = require('mongoose')

const KanjiExampleSchema = mongoose.Schema({
    word: { 
        type: String,
        trim: true
    },
    pronuncitaion: {
        type: String,
        trim: true
    },
    meaning: {
        type: String,
        trim: true
    }
})

const KanjiRadicalSchema = mongoose.Schema({
    image:{
        type: String,
        trim: true
    },
    strokes: {
        type: Number
    }
    
})

const KanjiSchema = mongoose.Schema({
    character: {
        type: String,
        trim: true,
        unique: true,
    },
    meaning: {
        type: String,
        trim: true
    },
    onyomi: {
        type: String,
        trim: true
    },
    kunyomi: {
        type: String,
        trim: true
    },
    level: {
        type: String,
        enum: ['n5', 'n4', 'n3', 'n2', 'n1'],
        default: 'n5'
    },
    radical: {
        type: KanjiRadicalSchema
    },
    examples: [{
        type: KanjiExampleSchema
    }],
    unitid: {
        type: mongoose.Types.ObjectId,
        ref: 'Unit'
    }
}, {
    timestap: true
})

const Kanji = mongoose.model('Kanji', KanjiSchema)

module.exports = Kanji
