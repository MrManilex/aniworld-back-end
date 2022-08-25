import { Router } from "express"
import * as animeController from '../controllers/animes.js'

const router = Router()

router.post('/', animeController.search)

export { router }