const Unit = require('../models/unit')

async function addUnit (req, res){
    const unit = new Unit(req.body)
    try {
        await unit.save()
        res.status(201).send(unit)
    } catch (e) {
        res.status(500).send(e)
    }
}

async function getUnitById (req, res){
    const _id = req.params.id
    try {
        const unit = await Unit.findById(_id)
        if (!unit) {
            return res.status(404).send({ message: 'Unit not found!' })
        }
        res.send(Unit)
    } catch (e) {
        res.status(500).send(e)
    }
}

async function getAllUnit (req, res){
    try {
        const units = await Unit.find({})
        if (!units) {
            return res.status(404).send({ message: 'No units found!' })
        }
        res.send(units)
    } catch (e) {
        res.status(500).send(e)
    }
}

async function updateUnit (req, res){
        // Error Handler
        const updateKeys = Object.keys(req.body)
        const allowedUpdateKeys = ['name', 'description']
        const isValidUpdateKey = updateKeys.every((updateKey) => allowedUpdateKeys.includes(updateKey))
    
        if (!isValidUpdateKey) {
            return res.status(400).send({ error: 'Invalid fields!' })
        }
        //end of error handler
    
        try {
            const unit = await Unit.findById({_id: req.params.id})
    
            if (!unit) {
                return res.status(404).send({ error: 'Unit not found' })
            }
   
            updateKeys.forEach((updateKey) => unit[updateKey] = req.body[updateKey])

            await unit.save()
            res.send(unit)
        } catch (e) {
            res.status(500).send(e)
        }
}

async function deleteUnit (req, res){
    try {
        const unit = await Unit.findByIdAndDelete({ _id: req.params.id })
        if (!unit) {
            return res.status(404).send({ error: 'Unit not found' })
        }
        res.send({ message: 'Unit deleted' })
    } catch (e) {
        res.status(500).send(e)
    }
}

module.exports = {
    addUnit,
    getUnitById,
    getAllUnit,
    updateUnit,
    deleteUnit
}