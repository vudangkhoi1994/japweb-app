const express = require('express')
const router = new express.Router()
const UserController = require('../controllers/user')
const userAuth = require('../middleware/userAuth')
const avatarAuth = require('../middleware/avatarAuth')
const roleAuth = require('../middleware/roleAuth')

router.post('/users/create', UserController.addUser) // sign up no auth
// router.post('/users/create', userAuth, roleAuth, UserController.addUser) // => for testing auth
router.post('/users/login', UserController.login)
router.post('/users/logout', userAuth, UserController.logout)
router.post('/users/logoutAll', userAuth, UserController.logoutAll)
router.post('/users/me/avatar', userAuth, avatarAuth, UserController.uploadAvatar, (error, req, res, next) =>{
    res.status(400).send({error: error.message})
})

router.get(('/allusers'), UserController.getAllUsers)
router.get(('/users/me'), userAuth, UserController.getMyProfile)
router.get('/users/:id', UserController.getUserById)
router.get('/users/:id/avatar', UserController.getAvatarById)

router.put('/users/me', userAuth, UserController.updateProfile)

router.delete('/users/me', userAuth, UserController.deleteProfile)
router.delete('/users/me/avatar', userAuth, UserController.deleteAvatar)

module.exports = router
