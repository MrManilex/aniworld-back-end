import { Router } from "express"
import * as animeController from '../controllers/animes.js'
import { requireAuth } from "../middleware/auth.js"

const router = Router()

// search routes
router.post('/', animeController.search)
router.post('/trending', animeController.searchTrending)
router.post('/upcoming', animeController.searchUpcoming)
router.post('/atpopular', animeController.searchATPopular)
router.get('/:id', animeController.getAnime)

// collecting routes
router.use(requireAuth)
router.patch('/:id/add-to-watching', animeController.addToWatching)


export { router }