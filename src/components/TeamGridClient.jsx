// components/TeamGridClient.jsx
'use client'

import { motion } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa6'

export default function TeamGridClient({ initialMembers }) {
  if (!initialMembers || initialMembers.length === 0) {
    return (
      <div className="text-center py-20 border border-dashed border-gray-300">
        <p className="text-gray-500 text-lg">No team members added yet.</p>
      </div>
    )
  }

  return (
    <>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, ease: 'easeOut' }}
        className="text-4xl md:text-5xl font-bold text-gray-900 mb-14 tracking-tight"
      >
        Our expert members
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-16">
        {initialMembers.map((member, index) => (
          <motion.div
            key={member._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: index * 0.15,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="group relative flex flex-col"
          >
            {/* Image Container */}
            <div className="relative aspect-[4/5] w-full bg-[#52C876] overflow-hidden rounded-md flex items-end justify-center">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Floating Social Icons */}
              <div className="absolute left-5 top-1/2 -translate-y-1/2 flex flex-col gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out z-10">
                {member.socials?.facebook && (
                  <a
                    href={member.socials.facebook}
                    aria-label="Facebook"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border border-black rounded-full flex items-center justify-center text-black bg-white/20 backdrop-blur-sm hover:bg-black hover:text-white transition-all duration-300"
                  >
                    <FaFacebookF className="w-4 h-4" />
                  </a>
                )}
                {member.socials?.twitter && (
                  <a
                    href={member.socials.twitter}
                    aria-label="Twitter"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border border-black rounded-full flex items-center justify-center text-black bg-white/20 backdrop-blur-sm hover:bg-black hover:text-white transition-all duration-300"
                  >
                    <FaTwitter className="w-4 h-4" />
                  </a>
                )}
                {member.socials?.instagram && (
                  <a
                    href={member.socials.instagram}
                    aria-label="Instagram"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border border-black rounded-full flex items-center justify-center text-black bg-white/20 backdrop-blur-sm hover:bg-black hover:text-white transition-all duration-300"
                  >
                    <FaInstagram className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Info Row */}
            <div className="mt-5 flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 leading-tight">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-500 font-medium mt-1">
                  {member.role}
                </p>
              </div>

              <button
                type="button"
                aria-label={`View details for ${member.name}`}
                className="w-11 h-11 border border-gray-400 rounded-full flex items-center justify-center text-gray-800 group-hover:bg-black group-hover:text-white group-hover:border-black transition-colors duration-500 shrink-0"
              >
                <FiArrowUpRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  )
}