import express from 'express'
import path from 'path'
import reviewsRoutes from './routes/reviews.js'
import logger from './middleware/logger.js'
import errorHandler from './middleware/error.js'
import notFound from './middleware/notFound.js'

const app = express()
const port = process.env.PORT || 8000

// Body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Logger middleware
app.use(logger)

// Routes
app.use('/api/reviews', reviewsRoutes)

// Error handler
app.use(notFound)
app.use(errorHandler)

app.listen(port, () =>
  console.log(`Server is running on port: http://localhost:${port}`)
)
