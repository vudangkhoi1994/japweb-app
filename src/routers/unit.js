const express = require('express')
const router = new express.Router()
const unitController = require('../controllers/unit')
const userAuth = require('../middleware/userAuth')
const roleAuth = require('../middleware/roleAuth')

router.post('/units/create', unitController.addUnit)

router.get('/units/:id', unitController.getUnitById)
router.get('/allunits', unitController.getAllUnit)
router.get('/units/:id/words', unitController.getWordsUnit)
router.get('/units/:id/kanjis', unitController.getKanjisUnit)
router.get('/units/:id/grammars', unitController.getGrammarsUnit)

router.patch('/units/:id', unitController.updateUnit)

router.delete('/units/:id', unitController.deleteUnit)

module.exports = router
