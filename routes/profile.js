import { Router } from 'express'
import * as profilesCtrl from '../controllers/profile.js'
import { checkAuth, decodeUserFromToken } from "../middleware/auth.js"

const router = Router()

// Get Profile
router.get('/:id', profilesCtrl.getProfile)

// Decode User
router.use(decodeUserFromToken)
// Get Animes Watching
router.get('/:id/currently-watching', checkAuth, profilesCtrl.getWatching)
// Get Manga Reading

export {
    router
}