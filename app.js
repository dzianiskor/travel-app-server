const express = require('express')
const config = require('config')

const app = express()
const PORT = process.env.PORT || config.get('port') || 5000

app.listen(PORT, () => {
    console.log(`Server has been started on ${PORT} port`)
})
