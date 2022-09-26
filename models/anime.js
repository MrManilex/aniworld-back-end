import mongoose from 'mongoose'
const Schema = mongoose.Schema

const animeSchema = new Schema({
    animeTitle: { type: String, required: true },
    animeId: Number,
    currentlyWatching: [{type: Schema.Types.ObjectId, ref: 'Profile'}],
    planningToWatch: [{type: Schema.Types.ObjectId, ref: 'Profile'}]
})

const Anime = mongoose.model('Anime', animeSchema)

export {
    Anime
}