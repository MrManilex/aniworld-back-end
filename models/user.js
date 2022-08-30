import mongoose from "mongoose"
import bcrypt from 'bcrypt'
import validator from "validator"

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true // Signing up with same email address will not work
    },
    password: {
        type: String,
        required: true
    }
})

const User = mongoose.model('User', userSchema)

export {
    User
}