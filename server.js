import 'dotenv/config.js'
import { router as animesRouter } from './routes/animes.js'
import { router as usersRouter } from './routes/users.js'
import { router as profileRouter } from './routes/profile.js'
import express from 'express'
import mongoose from 'mongoose'

// Express App
const app = express()

// Middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/api/animes', animesRouter)
app.use('/api/users', usersRouter)
app.use('/api/profile', profileRouter)

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