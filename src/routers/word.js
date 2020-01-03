const express = require('express')
const router = new express.Router()
const WordController = require('../controllers/word')
const userAuth = require('../middleware/userAuth')
const roleAuth = require('../middleware/roleAuth')

router.post('/words/create',  WordController.addWord)

router.get('/words/:id', userAuth, WordController.getWordById)
router.get('/allwords', userAuth, roleAuth, WordController.getAllWord)

router.put('/words/:id', userAuth, roleAuth, WordController.updateWord)

router.delete('/words/:id', userAuth, roleAuth, WordController.deleteWord)

module.exports = router
