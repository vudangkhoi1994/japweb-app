const express = require('express')
const router = new express.Router()
const grammarController = require('../controllers/grammar')
const userAuth = require('../middleware/userAuth')
const roleAuth = require('../middleware/roleAuth')

router.post('/grammars/create', userAuth, roleAuth, grammarController.addGrammar)

router.get('/grammars/:id', userAuth, grammarController.getGrammarById)
router.get('/allgrammars', userAuth, roleAuth, grammarController.getAllGrammar)

router.put('/grammars/:id', userAuth, roleAuth, grammarController.updateGrammar)

router.delete('/grammars/:id', userAuth, roleAuth, grammarController.deleteGrammar)

module.exports = router
