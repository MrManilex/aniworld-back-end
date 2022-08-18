import mongoose from 'mongoose'
const Schema = mongoose.Schema

const animeSchema = new Schema({
    animeTitle: { type: String, required: true },
    animeId: Number
})

const Anime = mongoose.model('Anime', animeSchema)

export {
    Anime
}