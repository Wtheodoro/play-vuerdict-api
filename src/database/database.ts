import config from '@/config'
import mongoose from 'mongoose'

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(config.env.DB_CONNECT_URI)
    console.log(`Mongo DB connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`Error: [connectDb] ${error.message}`)
    process.exit(1)
  }
}

export default connectDb
