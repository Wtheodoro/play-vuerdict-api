import config from './config'
import axios from 'axios'
import express from 'express'
import cors from 'cors'
import logger from './middleware/logger'
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
  app.use(logger)

  // Routes
  app.use('/api/games', gameRoutes)
  app.use('/api/reviews', reviewRoutes)

  

  // test route
  app.get('/challenge/menu', async (req, res) => {
    try {
      const apiUrl = 'https://cdn-dev.preoday.com/challenge/menu';
      
      const response = await axios.get(apiUrl);
      
      res.json(response.data);
    } catch (error) {
      console.error('Erro ao acessar a API externa:', error);
      res.status(500).json({ error: 'Erro ao acessar a API externa' });
    }
  });

  app.get('/challenge/venue/9', async (req, res) => {
    try {
      const apiUrl = 'https://cdn-dev.preoday.com/challenge/venue/9';
      
      const response = await axios.get(apiUrl);
      
      res.json(response.data);
    } catch (error) {
      console.error('Erro ao acessar a API externa:', error);
      res.status(500).json({ error: 'Erro ao acessar a API externa' });
    }
  });

  // Error handler
  app.use(notFound)
  app.use(errorHandler)

  app.listen(port, () =>
    console.log(`Server is running on port: http://localhost:${port}`)
  )
}



startServer()
