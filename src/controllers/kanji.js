const Kanji = require('../models/kanji')

async function addKanji(req, res) {
    const kanji = new Kanji(req.body)

    try {
        await kanji.save()
        res.status(201).send(kanji)
    } catch (e) {
        res.status(500).send(e)
    }
}

async function getKanjiById(req, res) {
    const _id = req.params.id
    try {
        const kanji = await Kanji.findById(_id)

        if (!kanji) {
            return res.status(404).send({ message: 'Kanji not found!' })
        }

        res.send(kanji)
    } catch (e) {
        res.status(500).send(e)
    }
}

async function getAllKanji(req, res) {
    try {
        const kanjis = await Kanji.find({})
        if (kanjis.length === 0) {
            return res.status(404).send({ message: 'Kanji not found!' })
        }
        res.send(kanjis)
    } catch (e) {
        res.status(500).send(e)
    }
}

async function updateKanji(req, res) {
    const updateKeys = Object.keys(req.body)
    const allowedUpdateKeys = ['character', 'meaning', 'onyomi', 'kunyomi', 'level', 'radical', 'examples']
    const isValidUpdateKey = updateKeys.every((updateKey) => allowedUpdateKeys.includes(updateKey))

    if (!isValidUpdateKey) {
        return res.status(400).send({ error: 'Invalid fields!' })
    }
    //end of error handler

    try {
        const kanji = await Kanji.findById(req.params.id)

        if (!kanji) {
            return res.status(404).send({ error: 'Kanji not found' })
        }

        updateKeys.forEach((updateKey) => {
            if (updateKey === 'example_on' || updateKey === 'example_kun') {
                kanji[updateKey] = kanji[updateKey].concat(req.body[updateKey])
            } else {
                kanji[updateKey] = req.body[updateKey]
            }
        })
        await kanji.save()
        res.send(kanji)
    } catch (e) {
        res.status(500).send(e)
    }
}

async function updateteExample(req, res) {
    const updateKeys = Object.keys(req.body)
    const allowedUpdateKeys = ['word', 'meaning', 'pronuncitaion']
    const isValidUpdateKey = updateKeys.every((updateKey) => allowedUpdateKeys.includes(updateKey))

    if (!isValidUpdateKey) {
        return res.status(400).send({ error: 'Invalid fields!' })
    }
    
    try{
        const kanji = await Kanji.findById(req.params.kid)
        if (!kanji) {
            return res.status(404).send({ error: 'Kanji not found' })
        }
        const example = kanji.examples.id(req.params.eid)
        if (!example) {
            return res.status(404).send({ error: 'Example not found' })
        }

        updateKeys.forEach((updateKey) =>  kanji.examples.id(req.params.eid)[updateKey] = req.body[updateKey])

        await kanji.save()
        res.send(kanji)
    } catch (e) {
        res.status(500).send(e)
    }
}

async function deleteExample(req, res) {
    try{
        const kanji = await Kanji.findById(req.params.kid)
        if (!kanji) {
            return res.status(404).send({ error: 'Kanji not found' })
        }
        const example = kanji.examples.id(req.params.eid).remove()
        if (!example) {
            return res.status(404).send({ error: 'Example not found' })
        }

        await kanji.save(function (error) {
            if (error) return res.status(500).send(error);
        })
        res.send(kanji)
    } catch (e) {
        res.status(500).send(e)
    }
}

async function deleteKanji(req, res) {
    try {
        const kanji = await Kanji.findByIdAndDelete({ _id: req.params.id })
        if (!kanji) {
            return res.status(404).send({ error: 'Kanji not found' })
        }
        res.send({ message: 'Kanji deleted' })
    } catch (e) {
        res.status(500).send(e)
    }
}

module.exports = {
    addKanji,
    getKanjiById,
    getAllKanji,
    updateKanji,
    updateteExample,
    deleteExample,
    deleteKanji
}
