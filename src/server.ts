import config from './config'
import express from 'express'
import cors from 'cors'
import { gameRoutes, reviewRoutes } from './routes'
import { errorHandler, notFound } from './middleware'

const startServer = async () => {
  await config.init()

  const app = express()
  const port = config.env.PORT

  // Enable CORS
  app.use(cors())

  // Body parser middleware
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  // Logger middleware
  // app.use(logger)

  // Routes
  app.use('/api/games', gameRoutes)
  app.use('/api/reviews', reviewRoutes)

  // Error handler
  app.use(notFound)
  app.use(errorHandler)

  app.listen(port, () =>
    console.log(`Server is running on port: http://localhost:${port}`)
  )
}

startServer()
