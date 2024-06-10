import express from 'express'
import { gamesController } from '@/controllers'

const router = express.Router()

// get all games
router.get('/', gamesController.getGames)

// Get one game by id
router.get('/:id', gamesController.getGame)

export default router
