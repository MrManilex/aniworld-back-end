require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

// Express App
const app = express()

// Middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// Connect to MongoDB
mongoose.connect(process.env.DATABASE)
    .then(() => {
        // Listen for Requests
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })