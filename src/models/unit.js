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
        courseid: {
            type: mongoose.Types.ObjectId,
            ref: 'Course'
        }
    },
    {
        timestamps: true
    },
)
// Set relationship for Unit
UnitSchema.virtual('words',{
    ref: 'Word',
    localField: '_id',
    foreignField: 'unitid' //foreign key
})

UnitSchema.virtual('kanjis',{
    ref: 'Kanji',
    localField: '_id',
    foreignField: 'unitid'//foreign key
})

UnitSchema.virtual('grammars',{
    ref: 'Grammar',
    localField: '_id',
    foreignField: 'unitid'//foreign key
})

module.exports = mongoose.model('Unit', UnitSchema);
