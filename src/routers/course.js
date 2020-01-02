const express = require('express')
const router = new express.Router()
const CourseController = require('../controllers/course')
const userAuth = require('../middleware/userAuth')
const roleAuth = require('../middleware/roleAuth')

router.post('/courses/create', CourseController.addCourse)

router.get('/courses/:id', CourseController.getCourseById)
router.get('/allcourses', CourseController.getAllCourse)
router.get('/courses/:id/units', CourseController.getUnitsCrouse)

router.put('/courses/:id', CourseController.updateCourse)

router.delete('/courses/:id', CourseController.deleteCourse)

module.exports = router
