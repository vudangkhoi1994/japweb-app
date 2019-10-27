const mongoose = require('mongoose');

const GrammarSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    content: {
        type: String,
        default: ''
    },
    level: {
        type: String,
        enum: ['n5', 'n4', 'n3', 'n2', 'n1'],
        default: 'n5'
    },
    unitid: {
        type: mongoose.Types.ObjectId,
        ref: 'Unit'
    }
}, {
    timestamps: true
})

const Grammar = mongoose.model('Grammar', GrammarSchema)

module.exports = Grammar
