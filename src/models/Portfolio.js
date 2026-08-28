// models/Portfolio.js
import mongoose from 'mongoose'

const ProcessStepSchema = new mongoose.Schema({
  title: { type: String, required: true },
  points: [{ type: String }],
})

const PortfolioSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    coverImage: { type: String, required: true },
    
    // Metadata Sidebar
    client: { type: String, required: true },
    industry: { type: String, required: true },
    projectType: { type: String, required: true }, // e.g., "Social Media Marketing"
    duration: { type: String, required: true },   // e.g., "3 years"

    // Case Study Sections
    background: { type: String, required: true },
    objectives: [{ type: String }],
    process: [ProcessStepSchema],
    galleryImages: [{ type: String }],
    results: [{ type: String }],

    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export default mongoose.models.Portfolio || mongoose.model('Portfolio', PortfolioSchema)