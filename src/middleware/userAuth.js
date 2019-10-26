const jwt = require('jsonwebtoken')
const User = require('../models/user')

const userAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'khoivdvd0411@gmail.com')
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token})
        console.log(decoded);
        
        if(!user){
            throw new Error()
        }

        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({error: 'authencation fail'})
    }
}

module.exports = userAuth
