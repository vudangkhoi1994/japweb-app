const express = require('express')
const router = new express.Router()
const unitController = require('../controllers/unit')
const userAuth = require('../middleware/userAuth')
const roleAuth = require('../middleware/roleAuth')

router.post('/units/create', unitController.addUnit)

router.get('/units/:id', userAuth, unitController.getUnitById)
router.get('/allunits', userAuth, roleAuth, unitController.getAllUnit)
router.get('/units/:id/words', userAuth, unitController.getWordsUnit)
router.get('/units/:id/kanjis', userAuth, unitController.getKanjisUnit)
router.get('/units/:id/grammars', userAuth, unitController.getGrammarsUnit)

router.put('/units/:id', userAuth, roleAuth, unitController.updateUnit)

router.delete('/units/:id', userAuth, roleAuth, unitController.deleteUnit)

module.exports = router
