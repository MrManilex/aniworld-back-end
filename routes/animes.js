import { Router } from "express"
import * as animeController from '../controllers/animes.js'

const router = Router()

router.get('/', animeController.search)

export { router }