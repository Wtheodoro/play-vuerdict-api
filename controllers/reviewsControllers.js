let reviews = [
  {
    id: 1,
    gameId: 1,
    name: 'John Doe',
    review:
      'This game is fantastic! I loved every moment of it. The storyline is captivating, the graphics are stunning, and the gameplay is smooth. The developers really did an amazing job creating this masterpiece. I highly recommend it to anyone looking for a great gaming experience.',
    rating: 5,
    date: '2024-06-01',
  },
  {
    id: 2,
    gameId: 1,
    name: 'Jane Smith',
    review:
      'The game was okay, but I expected more from it. The storyline felt a bit lacking, and the gameplay mechanics were not as polished as I had hoped. However, the graphics were decent, and there were some enjoyable moments throughout. Overall, it was an average experience for me.',
    rating: 3,
    date: '2024-06-02',
  },
  {
    id: 3,
    gameId: 1,
    name: 'Alice Johnson',
    review:
      'The graphics are stunning and the gameplay is smooth. I was blown away by the attention to detail in the visuals, from the character models to the environments. It really helped immerse me in the game world and made the experience all the more enjoyable.',
    rating: 4,
    date: '2024-06-03',
  },
  {
    id: 4,
    gameId: 2,
    name: 'Bob Brown',
    review:
      'The game was great but way too short. I felt like I was just getting into it when it suddenly ended. I wish there was more content to explore and more challenges to overcome. Hopefully, the developers will release some DLC or updates to extend the gameplay.',
    rating: 3,
    date: '2024-06-04',
  },
  {
    id: 5,
    gameId: 3,
    name: 'Charlie White',
    review:
      "The story kept me hooked from start to finish. It was well-written and filled with unexpected twists and turns. I found myself emotionally invested in the characters and their journey. Overall, it was a memorable experience that I won't soon forget.",
    rating: 5,
    date: '2024-06-05',
  },
  {
    id: 6,
    gameId: 3,
    name: 'David Black',
    review:
      'It has potential but needs more polish. While the game has some great ideas and a strong foundation, it suffers from technical issues and lackluster execution. With some updates and improvements, it could become a truly standout title.',
    rating: 3,
    date: '2024-06-06',
  },
  {
    id: 7,
    gameId: 4,
    name: 'Eve Green',
    review:
      "Playing with friends is a blast! The multiplayer mode offers fast-paced action and intense battles. It's a great way to spend time with friends and compete against each other. I've had some of my most memorable gaming moments in multiplayer matches.",
    rating: 4,
    date: '2024-06-07',
  },
  {
    id: 8,
    gameId: 4,
    name: 'Frank Blue',
    review:
      "The game is good but suffers from lag in multiplayer mode. Despite its enjoyable gameplay and engaging mechanics, the experience is often marred by lag spikes and connection issues. It's frustrating when you're in the middle of a match and suddenly get disconnected.",
    rating: 2,
    date: '2024-06-08',
  },
  {
    id: 9,
    gameId: 5,
    name: 'Grace Yellow',
    review:
      'The game introduces some really cool mechanics. I was impressed by the unique gameplay elements and how they were integrated into the overall experience. It added a layer of depth and complexity that kept me engaged from start to finish.',
    rating: 5,
    date: '2024-06-09',
  },
  {
    id: 10,
    gameId: 5,
    name: 'Hank Orange',
    review:
      "The gameplay gets repetitive after a while. While the game starts off strong with its innovative mechanics, it quickly becomes repetitive as you progress. The lack of variety in objectives and challenges makes it feel like you're just going through the motions.",
    rating: 3,
    date: '2024-06-10',
  },
  {
    id: 11,
    gameId: 6,
    name: 'Ivy Purple',
    review:
      'The world is beautifully designed and immersive. I was blown away by the attention to detail in the environments and the sheer scale of the world. It felt like a living, breathing world that I could get lost in for hours on end.',
    rating: 5,
    date: '2024-06-11',
  },
  {
    id: 12,
    gameId: 6,
    name: 'Jack Red',
    review:
      "The game is full of bugs that ruin the experience. Despite its beautiful world and engaging story, the game is plagued by numerous bugs and glitches that detract from the overall experience. It's frustrating when you encounter game-breaking bugs that force you to restart.",
    rating: 5,
    date: '2024-06-11',
  },
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
    gameId: request.body.gameId,
    name: request.body.name,
    review: request.body.review,
    rating: request.body.rating,
    date: request.body.date,
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
