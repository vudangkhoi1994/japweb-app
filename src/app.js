const express = require('express')
require('dotenv').config()
require('./db/mongoose')
const cors = require('cors')
const path = require('path')
// const hbs = require('hbs')
// const router = new express.Router()

const userRouter = require('./routers/user')
const courseRouter = require('./routers/course')
const wordRouter = require('./routers/word')
const grammarRouter = require('./routers/grammar')
const kanjiRouter = require('./routers/kanji')
const unitRouter = require('./routers/unit')

const app = express()
const port = process.env.PORT
app.use(express.json())

//Path config for express
const publicDirectoryPath = path.join(__dirname, '../public')
// const viewsPath = path.join(__dirname, '../templates/views')
// const partialsPath = path.join(__dirname, '../templates/partials')

// Set up hbs and view engine
// app.set('view engine', 'hbs')
// app.set('views', viewsPath)
// hbs.registerPartials(partialsPath)
app.use(cors())
// Set up static diretory to serve
app.use(express.static(publicDirectoryPath))

app.use(userRouter)
app.use(courseRouter)
app.use(wordRouter)
app.use(grammarRouter)
app.use(kanjiRouter)
app.use(unitRouter)

app.listen(port, () => {
    console.log('Server is up on port:', port)
})
