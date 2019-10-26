const express = require('express')
require('./db/mongoose')

const userRouter = require('./routers/user')
const courseRouter = require('./routers/course')
const wordRouter = require('./routers/word')
const grammarRouter = require('./routers/grammar')
const kanjiRouter = require('./routers/kanji')
const unitRouter = require('./routers/unit')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.use(userRouter)
app.use(courseRouter)
app.use(wordRouter)
app.use(grammarRouter)
app.use(kanjiRouter)
app.use(unitRouter)

app.listen(port, () => {
    console.log('Server is up on port:', port)
})
