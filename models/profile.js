import mongoose from 'mongoose'
const Schema = mongoose.Schema

const profileSchema = new Schema({
    email: String,
    username: String,
    avatar: String,
    watching: String
},
{
    timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
    Profile
}