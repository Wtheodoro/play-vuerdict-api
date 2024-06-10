import mongoose, { Schema, Document } from 'mongoose'

interface ReviewModel extends Document {
  gameId: mongoose.Types.ObjectId
  name: string
  review: string
  date: Date
}

const reviewSchema = new Schema<ReviewModel>({
  gameId: { type: Schema.Types.ObjectId, ref: 'Game', required: true },
  name: { type: String, required: true },
  review: { type: String, required: true },
  date: { type: Date, required: true },
})

const Review = mongoose.model<ReviewModel>('Review', reviewSchema)

export default Review
