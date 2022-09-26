import mongoose from 'mongoose'
const Schema = mongoose.Schema

const profileSchema = new Schema({
    username: String,
    avatar: String
},
{
    timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
    Profile
}