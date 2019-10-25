const mongoose = require('mongoose')
const validator = require('validator')

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

const Course = mongoose.model('Course', CourseSchema)

module.exports = Course