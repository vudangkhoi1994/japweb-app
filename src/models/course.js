const mongoose = require('mongoose')

const CourseSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    description: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
})

CourseSchema.virtual('units', {
    ref: 'Unit',
    localField: '_id',
    foreignField: 'course' //fk
})


const Course = mongoose.model('Course', CourseSchema)

module.exports = Course