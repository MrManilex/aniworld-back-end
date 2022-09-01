import { User } from "../models/user.js"
import { Jwt } from "jsonwebtoken"

const createToken = (_id) => {
    return Jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

const loginUser = async (req, res) => {
    console.log('Log In attempted...')
}

const signupUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.signup(email, password)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

export {
    loginUser,
    signupUser
}