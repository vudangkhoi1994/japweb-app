const User = require('../models/user')

const roleAuth = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id)
        if (user.role !== 'super-admin') {
            throw new Error()
        }
        next()
    } catch (e) {
        res.status(401).send({error: 'Not permitted'})
    }
}

module.exports = roleAuth
