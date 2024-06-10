import express from 'express'
import { reviewsController } from '@/controllers'

const router = express.Router()

// Get all reviews
router.get('/', reviewsController.getReviews)

// Get reviews from a specific game
router.get('/:gameId', reviewsController.getGameReviews)

// Create new review
router.post('/', reviewsController.createReview)

// Update review
router.put('/:id', reviewsController.updateReview)

// Delete post
router.delete('/:id', reviewsController.deleteReview)
export default router
