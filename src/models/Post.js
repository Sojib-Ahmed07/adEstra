import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, default: null }, // Stores Cloudinary image URL
    author: { type: String, default: 'admin' },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    tags: [{ type: String }],
  },
  { timestamps: true }
)

export default mongoose.models.Post || mongoose.model('Post', PostSchema)