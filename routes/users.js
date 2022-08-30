import { Router } from "express"
import * as userController from '../controllers/users.js'

const router = Router()

// add login route
router.post('/login', userController.loginUser)
// add signup route
router.post('/signup', userController.signupUser)

export { router }