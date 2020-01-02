const Word = require('../models/word')

async function addWord(req, res) {
    const word = new Word(req.body)
    console.log(req.body);

    try {
        await word.save()
        res.status(201).send(word)
    } catch (e) {
        res.status(500).send(e)
    }
}

async function getWordById(req, res) {
    const _id = req.params.id
    try {
        const word = await Word.findById(_id)
        if (!word) {
            return res.status(404).send({ message: 'Word not found!' })
        }
        res.send(word)
    } catch (e) {
        res.status(500).send(e)
    }
}

async function getAllWord(req, res) {
    try {
        const { limit, offset } = req.query;
        const words = await Word.find({}).limit(limit || 10).offset(offset || 0);
        if (!words) {
            return res.status(404).send({ message: 'No word found!' })
        }
        res.send(words)
    } catch (e) {
        res.status(500).send(e)
    }
}

async function updateWord(req, res) {
    // const updateKeys = Object.keys(req.body)

    try {
        const word = await Word.findOneAndUpdate({ _id: req.params.id }, req.body)

        if (!word) {
            return res.status(404).send({ error: 'Word not found' })
        }

        // updateKeys.forEach((updateKey) => word[updateKey] = req.body[updateKey])
        // await word.save()
        res.send(word)
    } catch (e) {
        res.status(500).send(e)
    }
}

async function deleteWord(req, res) {
    try {
        const word = await Word.findByIdAndDelete({ _id: req.params.id })
        if (!word) {
            return res.status(404).send({ error: 'Word not found' })
        }
        res.send({ message: 'Word deleted' })
    } catch (e) {
        res.status(500).send(e)
    }
}

module.exports = {
    addWord,
    getWordById,
    getAllWord,
    updateWord,
    deleteWord
}
