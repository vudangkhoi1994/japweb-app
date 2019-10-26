const express = require('express')
const router = new express.Router()
const kanjiController = require('../controllers/kanji')
//TODO: accAuth

router.post('/kanjis/create', kanjiController.addKanji)

router.get('/kanjis/:id', kanjiController.getKanjiById)
router.get('/allkanjis', kanjiController.getAllKanji)

router.patch('/kanjis/:id', kanjiController.updateKanji)
router.patch('/kanjis/:kid/examples/:eid', kanjiController.updateteExample)

router.delete('/kanjis/:id', kanjiController.deleteKanji)
router.delete('/kanjis/:kid/examples/:eid', kanjiController.deleteExample)

module.exports = router