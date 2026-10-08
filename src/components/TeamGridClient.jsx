// components/TeamGridClient.jsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowUpRight, FiX, FiMail } from 'react-icons/fi'
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa'

export default function TeamGridClient({ initialMembers }) {
  const [selectedMember, setSelectedMember] = useState(null)

  if (!initialMembers || initialMembers.length === 0) {
    return (
      <div className="pt-20 lg:pt-24 max-w-7xl mx-auto px-6 lg:px-12 pb-20">
        <div className="text-center py-20 border border-dashed border-gray-300">
          <p className="text-gray-500 text-lg">No team members added yet.</p>
        </div>
      </div>
    )
  }

  return (
    <section className="pt-20 lg:pt-24 pb-16 max-w-7xl mx-auto px-6 lg:px-12">
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
            onClick={() => setSelectedMember(member)}
            className="group relative flex flex-col cursor-pointer"
          >
            {/* Image Container */}
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md flex items-end justify-center">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Floating Social Icons */}
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute left-5 top-1/2 -translate-y-1/2 flex flex-col gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out z-10"
              >
                {member.socials?.facebook && member.socials.facebook !== '#' && (
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
                {member.socials?.linkedin && member.socials.linkedin !== '#' && (
                  <a
                    href={member.socials.linkedin}
                    aria-label="LinkedIn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border border-black rounded-full flex items-center justify-center text-black bg-white/20 backdrop-blur-sm hover:bg-black hover:text-white transition-all duration-300"
                  >
                    <FaLinkedinIn className="w-4 h-4" />
                  </a>
                )}
                {member.socials?.instagram && member.socials.instagram !== '#' && (
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

      {/* Member Details Modal */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMember(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col md:flex-row"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/10 hover:bg-black text-black hover:text-white flex items-center justify-center transition-colors duration-300"
              >
                <FiX className="w-5 h-5" />
              </button>

              {/* Modal Image */}
              <div className="w-full md:w-1/2 aspect-[4/5] bg-gray-100 shrink-0">
                <img
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Modal Content */}
              <div className="p-6 md:p-8 flex flex-col justify-between overflow-y-auto w-full">
                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#52C876]">
                      {selectedMember.experience || 'Team Member'}
                    </span>
                    <h3 className="text-3xl font-bold text-gray-900 mt-1">
                      {selectedMember.name}
                    </h3>
                    <p className="text-base text-gray-500 font-medium">
                      {selectedMember.role}
                    </p>
                  </div>

                  {selectedMember.bio && (
                    <p className="text-gray-600 leading-relaxed text-sm pt-3 border-t border-gray-100">
                      {selectedMember.bio}
                    </p>
                  )}

                  {selectedMember.skills && selectedMember.skills.length > 0 && (
                    <div className="pt-2">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                        Specializations
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedMember.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-6 mt-6 border-t border-gray-100 space-y-4">
                  {selectedMember.email && (
                    <a
                      href={`mailto:${selectedMember.email}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-[#52C876] transition-colors"
                    >
                      <FiMail className="w-4 h-4" />
                      {selectedMember.email}
                    </a>
                  )}

                  <div className="flex items-center gap-3">
                    {selectedMember.socials?.facebook && selectedMember.socials.facebook !== '#' && (
                      <a
                        href={selectedMember.socials.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 border border-gray-300 rounded-full flex items-center justify-center text-gray-700 hover:bg-black hover:text-white hover:border-black transition-all"
                      >
                        <FaFacebookF className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {selectedMember.socials?.linkedin && selectedMember.socials.linkedin !== '#' && (
                      <a
                        href={selectedMember.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 border border-gray-300 rounded-full flex items-center justify-center text-gray-700 hover:bg-black hover:text-white hover:border-black transition-all"
                      >
                        <FaLinkedinIn className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {selectedMember.socials?.instagram && selectedMember.socials.instagram !== '#' && (
                      <a
                        href={selectedMember.socials.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 border border-gray-300 rounded-full flex items-center justify-center text-gray-700 hover:bg-black hover:text-white hover:border-black transition-all"
                      >
                        <FaInstagram className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}