const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const config = require('config')

const authRouter = require('./routes/auth')
const linkRouter = require('./routes/link')
const redirectRouter = require('./routes/redirect')

const app = express()


async function start(){
    try {
        await mongoose.connect(config.get('mongoUri'), {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true})
        .then(console.log(`mongoDB connected`))
    } catch (error) {
        console.log('Server error',error.message)
        process.exit(1)
    }
}
start()

app.use(express.json({ extended: true }))
app.use(morgan('dev'))
app.use(cors())
app.use('/t', redirectRouter)
app.use('/api/auth', authRouter)
app.use('/api/link', linkRouter)


module.exports = app