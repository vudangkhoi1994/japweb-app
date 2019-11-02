const User = require('../models/user')
const sharp = require('sharp')

async function addUser(req, res) {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(500).send(e)
    }
}

async function getAllUsers(re, res) {
    try {
        const users = await User.find({});
        if (!users) {
            res.status(404).send({error: "No users"})
        }
        res.send(users)
    } catch (error) {
        res.status(500).send(e)
    }
}

async function getUserById(req, res) {
    const _id = req.params.id // can't fixed problem yet

    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send({
                message: 'User not found!'
            })
        }
        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
}

async function getMyProfile(req, res) {
    res.send(req.user)
}

async function updateProfile(req, res) {
    //Error handler
    const updateKeys = Object.keys(req.body)
    const allowedUpdateKeys = ['name', 'email', 'password', 'age', 'avatar']
    const isValidUpdateKey = updateKeys.every((updateKey) => allowedUpdateKeys.includes(updateKey))

    if (!isValidUpdateKey) {
        return res.status(400).send({ error: 'Invalid Update' })
    }
    // end of error handler

    try {
        const user = req.user
        updateKeys.forEach((updateKey) => user[updateKey] = req.body[updateKey])
        await user.save()

        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
}

async function deleteProfile(req, res) {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send(e)
    }
}

async function login(req, res) {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
}

async function logout(req, res) {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })

        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
}

async function logoutAll(req, res) {
    try {
        req.user.tokens = [] //clear all tokens
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
}

async function uploadAvatar(req, res) {
    //resize and convert to png using sharp module
    const buffer = await sharp(req.file.buffer).resize({ width: 250, heigh: 250 }).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send({ message: 'Avatar uploaded' })
}

async function deleteAvatar(req, res) {
    req.user.avatar = undefined
    await req.user.save()
    res.send({ message: 'Avatar deleted' })
}

async function getAvatarById(req, res) {
    try {
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/jpg')
        res.send(user.avatar)
    } catch (e) {
        res.status(404).send(e)
    }
}

module.exports = {
    addUser,
    getAllUsers,
    getUserById,
    updateProfile,
    deleteProfile,
    getMyProfile,
    login,
    logout,
    logoutAll,
    uploadAvatar,
    deleteAvatar,
    getAvatarById
}
