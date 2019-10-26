const express = require('express')
const router = new express.Router()
const unitController = require('../controllers/unit')
//TODO: accAuth

router.post('/units/create', unitController.addUnit)

router.get('/units/:id', unitController.getUnitById)
router.get('/allunits', unitController.getAllUnit)

router.patch('/units/:id', unitController.updateUnit)

router.delete('/units/:id', unitController.deleteUnit)

module.exports = router
