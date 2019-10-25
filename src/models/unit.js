const mongoose = require('mongoose');

const UnitSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        },
        description: {
            type: String,
            default: ''
        },
        video: {
            type: String,
            require: true
        },
        document: {
            type: String,
            default: ''
        },
        course: {
            type: mongoose.Types.ObjectId,
            ref: 'Course'
        },
        words: [{
            type: mongoose.Types.ObjectId,
            ref: 'Word'
        }],
        grammars: [{
            type: mongoose.Types.ObjectId,
            ref: 'Grammar'
        }],
        kanjis: [{
            type: mongoose.Types.ObjectId,
            ref: 'Kanji'
        }]
    },
    {
        timestamps: true
    },
)



module.exports = mongoose.model('Unit', UnitSchema);