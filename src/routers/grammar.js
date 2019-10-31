const express = require('express')
const router = new express.Router()
const grammarController = require('../controllers/grammar')
const userAuth = require('../middleware/userAuth')
const roleAuth = require('../middleware/roleAuth')

router.post('/grammars/create',grammarController.addGrammar)

router.get('/grammars/:id',  grammarController.getGrammarById)
router.get('/allgrammars', grammarController.getAllGrammar)

router.patch('/grammars/:id', grammarController.updateGrammar)

router.delete('/grammars/:id', grammarController.deleteGrammar)

module.exports = router
