import { Router } from 'express'
import * as profilesCtrl from '../controllers/profile.js'

const router = Router()

// Get Profile
router.get('/:id', profilesCtrl.getProfile)
// Get Animes Watching
// Get Manga Reading

export {
    router
}