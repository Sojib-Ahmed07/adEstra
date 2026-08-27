// models/TeamMember.js
import mongoose from 'mongoose'

const TeamMemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    image: { type: String, required: true },
    socials: {
      facebook: { type: String, default: '#' },
      twitter: { type: String, default: '#' },
      instagram: { type: String, default: '#' },
    },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export default mongoose.models.TeamMember ||
  mongoose.model('TeamMember', TeamMemberSchema)