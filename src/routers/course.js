const express = require('express')
const router = new express.Router()
const CourseController = require('../controllers/course')
const userAuth = require('../middleware/userAuth')
const roleAuth = require('../middleware/roleAuth')

router.post('/courses/create', userAuth, roleAuth ,CourseController.addCourse)

router.get('/courses/:id', CourseController.getCourseById)
router.get('/allcourses', CourseController.getAllCourse)
router.get('/courses/:id/units', CourseController.getAllCourse)

router.patch('/courses/:id', userAuth, roleAuth, CourseController.updateCourse)

router.delete('/courses/:id', userAuth, roleAuth, CourseController.deleteCourse)

module.exports = router
