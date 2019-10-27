const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email not OK!')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
    },
    password: {
        type: String,
        minlength: 7,
        required: true,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                console.log('pw contains password')
            }
        }

    },
    tokens: [{
        token: {
            type: String,
            require: true
        }
    }],
    avatar: {
        type: Buffer
    },
    role: {
        type: String,
        default: 'user'
    }
}, {
    timestamps: true
})

UserSchema.virtual('', {
   //TODO
})

UserSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}

UserSchema.methods.generateAuthToken = async function () {
    const user = this

    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

UserSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('Login failed')
    }

    const isMatchedPassword = await bcrypt.compare(password, user.password)
    if (!isMatchedPassword) {
        throw new Error('Login failed')
    }

    return user
}

// middlerware
//// Hash password
UserSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

//// Delete User related
UserSchema.pre('remove', async function (next) {
//TODO
})

const User = mongoose.model('User', UserSchema)

module.exports = User
