const express = require('express')
const router = new express.Router()
const CourseController = require('../controllers/course')
const userAuth = require('../middleware/userAuth')
const roleAuth = require('../middleware/roleAuth')

router.post('/courses/create', CourseController.addCourse)

router.get('/courses/:id', userAuth, CourseController.getCourseById)
router.get('/allcourses', CourseController.getAllCourse)
router.get('/courses/:id/units', userAuth, CourseController.getUnitsCrouse)

router.put('/courses/:id', userAuth, roleAuth, CourseController.updateCourse)

router.delete('/courses/:id', userAuth, roleAuth, CourseController.deleteCourse)

module.exports = router
