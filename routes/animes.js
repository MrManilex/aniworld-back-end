import { Router } from "express"
import * as animeController from '../controllers/animes.js'

const router = Router()

router.post('/', animeController.search)
router.post('/trending', animeController.searchTrending)
router.post('/upcoming', animeController.searchUpcoming)


export { router }