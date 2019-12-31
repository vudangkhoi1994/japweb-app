const mongoose = require('mongoose')

const CourseSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    description: String,
    image: String,
}, {
    timestamps: true
})

CourseSchema.virtual('units', {
    ref: 'Unit',
    localField: '_id',
    foreignField: 'courseid' //foreign key
})

const Course = mongoose.model('Course', CourseSchema)

module.exports = Course
