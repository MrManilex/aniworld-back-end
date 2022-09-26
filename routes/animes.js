import { Router } from "express"
import * as animeController from '../controllers/animes.js'
import { checkAuth, decodeUserFromToken } from "../middleware/auth.js"

const router = Router()

// search routes
router.post('/', animeController.search)
router.post('/trending', animeController.searchTrending)
router.post('/upcoming', animeController.searchUpcoming)
router.post('/atpopular', animeController.searchATPopular)

// collecting routes
router.use(decodeUserFromToken)
router.patch('/:id/add-to-watching', checkAuth, animeController.addToWatching)


export { router }