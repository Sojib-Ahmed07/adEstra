// models/Comment.js
import mongoose from 'mongoose'

const CommentSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Please provide your name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Please enter a comment'],
    },
  },
  { timestamps: true }
)

// Delete cached model in dev so schema changes take effect immediately
delete mongoose.models.Comment

export default mongoose.models.Comment || mongoose.model('Comment', CommentSchema)