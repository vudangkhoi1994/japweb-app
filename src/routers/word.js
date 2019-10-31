const express = require('express')
const router = new express.Router()
const WordController = require('../controllers/word')
const userAuth = require('../middleware/userAuth')
const roleAuth = require('../middleware/roleAuth')

router.post('/words/create',  WordController.addWord)

router.get('/words/:id', WordController.getWordById)
router.get('/allwords', WordController.getAllWord)

router.patch('/words/:id', WordController.updateWord)

router.delete('/words/:id',  WordController.deleteWord)

module.exports = router
