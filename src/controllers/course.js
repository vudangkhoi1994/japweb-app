const Course = require('../models/course')
const Unit = require('../models/unit')

async function addCourse(req, res) {
    const course = new Course(req.body)
    try {
        await course.save()
        res.status(201).send(course)
    } catch (e) {
        res.status(500).send(e)
    }
}

async function getCourseById(req, res) {
    const _id = req.params.id
    try {
        const course = await Course.findById(_id)
        if (!course) {
            return res.status(404).send({ message: 'Course not found!' })
        }
        res.send(course)
    } catch (e) {
        res.status(500).send(e)
    }
}

async function getAllCourse(req, res) {
    try {
        const courses = await Course.find({})
        if (!courses) {
            return res.status(404).send({ message: 'No courses found!' })
        }
        res.send(courses)
    } catch (e) {
        res.status(500).send(e)
    }
}

async function updateCourse(req, res) {
    // Error Handler
    const updateKeys = Object.keys(req.body)
    const allowedUpdateKeys = ['name', 'description']
    const isValidUpdateKey = updateKeys.every((updateKey) => allowedUpdateKeys.includes(updateKey))

    if (!isValidUpdateKey) {
        return res.status(400).send({ error: 'Invalid fields!' })
    }
    //end of error handler

    try {
        const course = await Course.findById({ _id: req.params.id })

        if (!course) {
            return res.status(404).send({ error: 'Course not found' })
        }

        updateKeys.forEach((updateKey) => course[updateKey] = req.body[updateKey])

        await course.save()
        res.send(course)
    } catch (e) {
        res.status(500).send(e)
    }
}

async function getUnitsCrouse(req, res) {
    try {
        const units = await Unit.find({ unitid: req.params.id })
        if (!units) {
            return res.status(404).send({ message: 'No units found' })
        }
        res.send(units)
    } catch (e) {
        res.status(500).send(0)
    }
}

async function deleteCourse(req, res) {
    try {
        const course = await Course.findByIdAndDelete({ _id: req.params.id })
        if (!course) {
            return res.status(404).send({ error: 'Course not found' })
        }
        res.send({ message: 'Course deleted' })
    } catch (e) {
        res.status(500).send(e)
    }
}

module.exports = {
    addCourse,
    getCourseById,
    getAllCourse,
    updateCourse,
    getUnitsCrouse,
    deleteCourse
}
