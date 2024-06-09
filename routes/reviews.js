import express from 'express'
import {
  createReview,
  deleteReview,
  getGameReviews,
  getReviews,
  updateReview,
} from '../controllers/reviewsControllers.js'

const router = express.Router()

// Get all reviews
router.get('/', getReviews)

// Get reviews from a specific game
router.get('/:gameId', getGameReviews)

// Create new review
router.post('/', createReview)

// Update review
router.put('/:id', updateReview)

// Delete post
router.delete('/:id', deleteReview)
export default router
