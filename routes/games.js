import express from 'express'
import { getGames, getGame } from '../controllers/gamesControllers.js'

const router = express.Router()

// get all games
router.get('/', getGames)

// Get one game by id
router.get('/:id', getGame)

export default router
