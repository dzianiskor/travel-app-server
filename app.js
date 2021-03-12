const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const bodyParser = require("body-parser")
const cors = require('cors')

const app = express()

app.use(cors({origin:true,credentials: true}))
app.use(bodyParser.json())
app.use(bodyParser.json({ type: "text/*" }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/uploads'));

app.use('/api/countries', require('./routes/countries'))
app.use('/api/db', require('./routes/db'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/uploads', require('./routes/uploads'))

const PORT = process.env.PORT || config.get('port') || 5000
const mongoUri = process.env.MONGO || config.get('dataBaseUri')

const start = async () => {
    try {
        await mongoose.connect(mongoUri, {
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


