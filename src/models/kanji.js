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
        type: String,
        enum: ['n5', 'n4', 'n3', 'n2', 'n1'],
        default: 'n5'
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
