const express = require('express')
const router = new express.Router()
const CourseController = require('../controllers/course')
// const isAdmin= require('../middleware/isAdmin')

router.post('/courses/create', CourseController.addCourse)

router.get('/courses/:id', CourseController.getCourseById)
router.get('/allcourses', CourseController.getAllCourse)

router.patch('/courses/:id', CourseController.updateCourse)


router.delete('/courses/:id', CourseController.deleteCourse)

module.exports = router