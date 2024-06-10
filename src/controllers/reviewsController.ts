import { HttpError } from '@/middleware/error'
import { Request, Response, NextFunction } from 'express'
import { ControllerRequest } from './types'
import Review from '@/models/reviewModel'

// @desc Get all reviews
// @route GET /api/reviews
export const getReviews = async (
  request: ControllerRequest<{ limit: string }>,
  response: Response
) => {
  const limit = parseInt(request.query.limit)

  try {
    const allReviews = await Review.find().limit(limit || 100)

    return response.status(200).json(allReviews)
  } catch (error) {
    return response
      .status(500)
      .json({ message: 'Failed to get all reviews', error })
  }
}

// @desc Get reviews from a specific game
// @route GET /api/reviews/:gameId
export const getGameReviews = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const requestGameId = request.params.gameId

  try {
    const currentGameReviews = await Review.find({ gameId: requestGameId })

    return response.status(200).json(currentGameReviews)
  } catch (error) {
    response.status(500).json({ message: 'Failed to get game reviews', error })
    return next(error)
  }
}

// @desc Create new review
// @route POST /api/reviews
export const createReview = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { gameId, name, review, rating, date } = request.body

  if (!review) {
    const error: HttpError = new Error('Please include a review')
    error.status = 400

    return next(error)
  }

  if (!gameId || !name || !rating || !date) {
    response.status(400).json({ message: 'All fields are required!' })
  }

  const newReview = new Review({
    gameId,
    name,
    review,
    rating,
    date,
  })

  try {
    const savedReview = await newReview.save()

    return response.status(201).json(savedReview)
  } catch (error) {
    console.error('Error creating review:', error)
    return response
      .status(500)
      .json({ message: 'Failed to create review', error })
  }
}

// @desc Update review by ID
// @route PUT /api/reviews/:id
export const updateReview = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const reviewId = request.params.id
  const { gameId, name, review, rating, date } = request.body

  try {
    const updatedReview = await Review.findOneAndUpdate(
      { _id: reviewId },
      { gameId, name, review, rating, date },
      { new: true }
    )

    return response.status(200).json(updatedReview)
  } catch (error) {
    console.error('Error updating review:', error)
    return response
      .status(500)
      .json({ message: 'Failed to update review', error })
  }
}

// @desc Delete review by ID
// @route DELETE /api/reviews/:id
export const deleteReview = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const reviewId = request.params.id

  try {
    const deletedReview = await Review.findByIdAndDelete(reviewId)

    return response
      .status(200)
      .json({ message: 'Review deleted successfully', deletedReview })
  } catch (error) {
    console.error('Error deleting review:', error)
    return response
      .status(500)
      .json({ message: 'Failed to delete review', error })
  }
}

const ReviewsController = {
  getReviews,
  getGameReviews,
  createReview,
  updateReview,
  deleteReview,
}

export default ReviewsController
