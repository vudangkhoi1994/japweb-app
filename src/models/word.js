const mongoose = require('mongoose');

const WordSchema = new mongoose.Schema(
    {
        word: {
            type: String,
            trim: true,
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
            default: ''
        },
        image: {
            type: String,
            trim: true,
            default: ''
        },
        type: {
            type: String,
            enum: [
                'n',    //Danh tu
                'v1',   //Dong tu loai I
                'v2',   //Dong tu loai II
                'v3',   //Dong tu loai III
                'adj1', //Tinh tu duoi [i]
                'adj2', //Tinh tu duoi [na]
                'adv'   //Pho tu
            ],
            default: 'n'
        }
    },
    {
        timestamps: true
    },
)

const Word = mongoose.model('Word', WordSchema)

module.exports = Word