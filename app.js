const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()
const PORT = process.env.PORT || config.get('port') || 5000

const start = async () => {
    try {
        await mongoose.connect(config.get('dataBaseUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, () => {
            console.log(`Server has been started on ${PORT} port`)
        })
    } catch (e) {
        console.log('Server error', e.message)
        process.exit(1)
    }
}

start()


