// models/Service.js
import mongoose from 'mongoose'

const OfferCardSchema = new mongoose.Schema(
    {
        icon: { type: String, default: 'Sparkles' }, // lucide icon name, e.g. "Search"
        title: { type: String, default: '' },
        description: { type: String, default: '' },
        points: { type: [String], default: [] },
        footer: { type: String, default: '' },
    },
    { _id: false }
)

const WhyChooseSchema = new mongoose.Schema(
    {
        title: { type: String, default: '' },
        description: { type: String, default: '' },
    },
    { _id: false }
)

const ServiceSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        slug: { type: String, required: true, unique: true, lowercase: true, trim: true },

        // Navbar dropdown + home cards (short one-liner)
        shortDescription: { type: String, default: '' },

        // Hero section
        heroHeading: { type: String, default: '' },
        heroIntro: { type: String, default: '' },
        heroHighlight: { type: String, default: '' },

        // Hero central badge image (uploaded via Cloudinary)
        heroIconImage: { type: String, default: '' },

        // Large image used lower on the page (why-choose visual)
        coverImage: { type: String, default: '' },

        // Section: offer cards
        offerCards: { type: [OfferCardSchema], default: [] },

        // Section: why choose adEstra
        whyChoose: { type: [WhyChooseSchema], default: [] },

        // Ordering / visibility
        order: { type: Number, default: 0 },
        published: { type: Boolean, default: true },
    },
    { timestamps: true }
)

export default mongoose.models.Service || mongoose.model('Service', ServiceSchema)