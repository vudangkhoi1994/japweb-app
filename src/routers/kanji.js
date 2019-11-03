const express = require('express')
const router = new express.Router()
const kanjiController = require('../controllers/kanji')
const userAuth = require('../middleware/userAuth')
const roleAuth = require('../middleware/roleAuth')

router.post('/kanjis/create', kanjiController.addKanji)

router.get('/kanjis/:id', kanjiController.getKanjiById)
router.get('/allkanjis',  kanjiController.getAllKanji)

router.put('/kanjis/:id', kanjiController.updateKanji)
router.put('/kanjis/:kid/examples/:eid', kanjiController.updateteExample)

router.delete('/kanjis/:id', kanjiController.deleteKanji)
router.delete('/kanjis/:kid/examples/:eid', kanjiController.deleteExample)

module.exports = router
