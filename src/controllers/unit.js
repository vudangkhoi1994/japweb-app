const Unit = require('../models/unit')
const Word = require('../models/word')
const Kanji = require('../models/kanji')
const Grammar = require('../models/grammar')

async function addUnit(req, res) {
    const unit = new Unit(req.body)
    try {
        await unit.save()
        res.status(201).send(unit)
    } catch (e) {
        res.status(500).send(e)
    }
}

async function getUnitById(req, res) {
    const _id = req.params.id
    try {
        const unit = await Unit.findById(_id)
        if (!unit) {
            return res.status(404).send({ message: 'Unit not found!' })
        }
        res.send(unit)
    } catch (e) {
        res.status(500).send(e)
    }
}

async function getAllUnit(req, res) {
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

async function updateUnit(req, res) {
    try {
        const unit = await Unit.findById({ _id: req.params.id })

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

async function getWordsUnit(req, res) {
    try {
        const words = await Word.find({unitid : req.params.id})
        if(!words) {
            return res.status(404).send({message: 'No words found'})
        }
        res.send(words)
    } catch (e) {
        res.status(500).send(0)
    }
}

async function getKanjisUnit(req, res) {
    try {
        const kanjis = await Kanji.find({unitid : req.params.id})
        if(!kanjis) {
            return res.status(404).send({message: 'No kanjis found'})
        }
        res.send(kanjis)
    } catch (e) {
        res.status(500).send(0)
    }
}

async function getGrammarsUnit(req, res) {
    try {
        const grammars = await Grammar.find({unitid : req.params.id})
        if(!grammars) {
            return res.status(404).send({message: 'No grammar found'})
        }
        res.send(grammars)
    } catch (e) {
        res.status(500).send(0)
    }
}

async function deleteUnit(req, res) {
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
    getWordsUnit,
    getWordsUnit,
    getGrammarsUnit,
    getKanjisUnit,
    deleteUnit
}
