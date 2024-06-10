import connectDb from '@/database/database'
import dotenv from 'dotenv'

interface Config {
  init(): Promise<void>
  env: {
    PORT: number
    DB_CONNECT_URI: string
  }
}

const config: Config = {
  init: async () => {
    console.log('Initializing configuration...')
    dotenv.config()

    console.log('Initializing environment variables...')
    config.env = {
      PORT: parseInt(process.env.PORT || '8000', 10),
      DB_CONNECT_URI: process.env.DB_CONNECT_URI as string,
    }

    if (!config.env.DB_CONNECT_URI) {
      console.error(
        'Error: DB_CONNECT_URI environment variable is not defined!'
      )
      process.exit(1)
    }

    console.log('Initializing database...')
    await connectDb()
  },

  env: {} as Config['env'],
}

export default config
