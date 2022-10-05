import { Router } from 'express'
import * as profilesCtrl from '../controllers/profile.js'
import { requireAuth } from "../middleware/auth.js"

const router = Router()

// Get Profile
router.get('/:id', profilesCtrl.getProfile)

// Decode User
router.use(requireAuth)
// Get Animes Watching
router.get('/:id/currently-watching', profilesCtrl.getWatching)
// Get Manga Reading

export {
    router
}