const Grammar = require('../models/grammar')

async function addGrammar (req,res) {
    const grammar = new Grammar(req.body)
    try {
        await grammar.save()
        res.send(grammar)
    } catch (e) {
        res.status(500).send(e)
    }
}

async function getGrammarById (req,res) {
    try {
        const grammar = await Grammar.findById({_id : req.params.id})

        if (!grammar) {
            res.status(404).send({message : 'No grammar found'})
        }
        res.send (grammar)
    } catch (e) {
        res.status(500).send(e)
    }
}


async function getAllGrammar (req,res) {
    try {
        const grammars = await Grammar.find({})
        if (!grammars) {
            return res.status(404).send({ message: 'No grammars found!' })
        }
        res.send(grammars)
    } catch (e) {
        res.status(500).send(e)
    }
}

async function updateGrammar (req,res) {
    // Error Handler
    const updateKeys = Object.keys(req.body)
    const allowedUpdateKeys = ['name', 'content', 'level']
    const isValidUpdateKey = updateKeys.every((updateKey) => allowedUpdateKeys.includes(updateKey))

    if (!isValidUpdateKey) {
        return res.status(400).send({ error: 'Invalid fields!' })
    }
    //end of error handler

    try {
        const grammar = await Grammar.findById({_id: req.params.id})
        
        if (!grammar) {
            return res.status(404).send({ error: 'Grammar not found' })
        }

        updateKeys.forEach((updateKey) => grammar[updateKey] = req.body[updateKey])
        await grammar.save()
        res.send(grammar)
    } catch (e) {
        res.status(500).send(e)
    }
}

async function deleteGrammar (req,res) {
    try {
        const grammar = await Grammar.findByIdAndDelete({_id: req.params.id})
        if (!grammar) {
            return res.status(404).send({ error: 'Grammar not found' })
        }
        res.send({message: 'Grammar deleted'})
    } catch (e) {
        res.status(500).send(e)        
    }
}

module.exports = {
    addGrammar,
    getGrammarById,
    getAllGrammar,
    updateGrammar,
    deleteGrammar
}
