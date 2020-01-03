const express = require('express')
const router = new express.Router()
const kanjiController = require('../controllers/kanji')
const userAuth = require('../middleware/userAuth')
const roleAuth = require('../middleware/roleAuth')

router.post('/kanjis/create', userAuth, roleAuth, kanjiController.addKanji)

router.get('/kanjis/:id', userAuth, kanjiController.getKanjiById)
router.get('/allkanjis', userAuth, roleAuth, kanjiController.getAllKanji)

router.put('/kanjis/:id', userAuth, roleAuth, kanjiController.updateKanji)
// router.put('/kanjis/:kid/examples/:eid', kanjiController.updateteExample)

router.delete('/kanjis/:id', userAuth, roleAuth, kanjiController.deleteKanji)
// router.delete('/kanjis/:kid/examples/:eid', kanjiController.deleteExample)

module.exports = router
