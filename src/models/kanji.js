const mongoose = require('mongoose')

const KanjiExampleSchema = mongoose.Schema({
    w: {
        type: String
    },
    p: {
        type: String
    },
    m: {
        type: String
    }
})

const KanjiSchema = mongoose.Schema({
    kanji: {
        type: String,
        trim: true,
        unique: true,
    },
    onyomi: {
        type: String
    },
    kunyomi: {
        type: String
    },
    level: {
        type: Number
    },
    stroke_url: {
        type: String
    },
    stroke_number: {
        type: Number
    },
    example_on: [{
        type: KanjiExampleSchema
    }],
    example_kun: [{
        type: KanjiExampleSchema
    }]
}, {
    timestap: true
})

const Kanji = mongoose.model('Kanji', KanjiSchema)

module.exports = Kanji