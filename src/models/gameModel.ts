import mongoose, { Schema, Document } from 'mongoose'

interface GameModel extends Document {
  name: string
  description: string
  bannerImageUrl: string
  cardImageUrl: string
  releaseDate: Date
  developer: string
  publisher: string
  genre: string[]
  platforms: string[]
  rating: number
  slug: string
}

const gameSchema = new Schema<GameModel>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  bannerImageUrl: { type: String, required: true },
  cardImageUrl: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  developer: { type: String, required: true },
  publisher: { type: String, required: true },
  genre: [{ type: String, required: true }],
  platforms: [{ type: String, required: true }],
  rating: { type: Number, required: true, min: 0, max: 5 },
  slug: { type: String, required: true },
})

const Game = mongoose.model<GameModel>('Game', gameSchema)

export default Game
