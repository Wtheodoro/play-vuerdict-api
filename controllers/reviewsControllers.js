let reviews = [
  { id: 1, title: 'This is the first review', gameId: 1 },
  { id: 2, title: 'This is the second review', gameId: 1 },
  { id: 3, title: 'This is the third review', gameId: 2 },
  { id: 4, title: 'This is the fourth review', gameId: 1 },
  { id: 5, title: 'This is the fifth review', gameId: 2 },
]

// @desc Get all reviews
// @route GET /api/reviews
export const getReviews = (request, response) => {
  const limit = parseInt(request.query.limit)

  if (!isNaN(limit) && limit > 0) {
    return response.status(200).json(reviews.slice(0, limit))
  }

  response.status(200).json(reviews)
}

// @desc Get reviews from a specific game
// @route GET /api/reviews/:gameId
export const getGameReviews = (request, response, next) => {
  const requestGameId = parseInt(request.params.gameId)
  const currentGameReviews = reviews.filter(
    (review) => review.gameId === requestGameId
  )

  if (!currentGameReviews.length) {
    const error = new Error(
      `Reviews from the game id of ${requestGameId} was not found.`
    )
    error.status = 404

    return next(error)
  }

  response.status(200).json(currentGameReviews)
}

// @desc Create new review
// @route POST /api/reviews
export const createReview = (request, response, next) => {
  const newReview = {
    id: reviews.length + 1,
    name: request.body.name,
    review: request.body.review,
    gameId: request.body.gameId,
  }

  if (!newReview.review) {
    const error = new Error('Please include a review')
    error.status = 400

    return next(error)
  }

  reviews.push(newReview)

  response.status(201).json(reviews)
}

// @desc Update a review
// @route PUT /api/reviews/:id
export const updateReview = (request, response, next) => {
  const reviewId = parseInt(request.params.id)
  const currentReview = reviews.find((review) => review.id === reviewId)

  if (!currentReview) {
    const error = new Error(
      `Reviews from the game id of ${requestGameId} was not found.`
    )
    error.status = 404

    return next(error)
  }

  currentReview.review = request.body.review
  response.status(200).json(reviews)
}

// @desc Delete a review
// @route DELETE /api/reviews/:id
export const deleteReview = (request, response, next) => {
  const reviewId = parseInt(request.params.id)
  const currentReview = reviews.find((review) => review.id === reviewId)

  if (!currentReview) {
    const error = new Error(
      `Reviews from the game id of ${requestGameId} was not found.`
    )
    error.status = 404

    return next(error)
  }

  reviews = reviews.filter((review) => review.id !== reviewId)
  response.status(200).json(reviews)
}
