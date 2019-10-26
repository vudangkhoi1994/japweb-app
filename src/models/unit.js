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
        }
    },
    {
        timestamps: true
    },
)

module.exports = mongoose.model('Unit', UnitSchema);
