'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiSun, FiSend, FiCheckCircle, FiAlertCircle, FiLoader } from 'react-icons/fi'

// Animation Variants
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1.0] },
  },
}

const scaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

const letterAnimation = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

const locations = [
  {
    title: 'Pennsylvania',
    image:
      'https://images.unsplash.com/photo-1517309260469-be69e5720138?auto=format&fit=crop&w=800&q=80',
    alt: 'Pennsylvania Architecture',
  },
  {
    title: 'Bangladesh',
    image:
      'https://images.unsplash.com/photo-1628172904838-89c5f87b3e1c?auto=format&fit=crop&w=800&q=80',
    alt: 'Bangladesh National Monument',
  },
  {
    title: 'Tasmania',
    image:
      'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80',
    alt: 'Tasmania Harbor',
  },
]

export default function ContactPage() {
  const headingText = 'GET IN TOUCH'

  // Form state management
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: false,
    message: '',
  })

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ submitting: true, success: false, error: false, message: '' })

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          // Replace with your Web3Forms Access Key
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || 'YOUR_ACCESS_KEY_HERE',
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'New Contact Form Submission',
          message: formData.message || 'No additional message provided.',
        }),
      })

      const result = await response.json()

      if (result.success) {
        setStatus({
          submitting: false,
          success: true,
          error: false,
          message: 'Thank you! Your message has been sent successfully.',
        })
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        throw new Error(result.message || 'Something went wrong.')
      }
    } catch (err) {
      setStatus({
        submitting: false,
        success: false,
        error: true,
        message: err.message || 'Failed to send message. Please try again.',
      })
    }
  }

  return (
    <main className="w-full min-h-screen bg-white text-gray-900 font-sans py-20 px-6 lg:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-28">
        
        {/* SECTION 1: Locations Grid */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {locations.map((loc, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              whileHover={{
                y: -10,
                transition: { duration: 0.3, ease: 'easeOut' },
              }}
              className="group border border-gray-200 p-8 rounded-sm bg-white flex flex-col items-center text-center shadow-sm hover:shadow-xl hover:border-black transition-all duration-300"
            >
              <motion.h3 
                variants={scaleUp}
                className="text-2xl font-bold tracking-tight text-gray-900 mb-6 relative pb-2"
              >
                {loc.title}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-black group-hover:w-full transition-all duration-300" />
              </motion.h3>

              <div className="w-full aspect-[4/3] overflow-hidden rounded-sm bg-gray-100">
                <motion.img
                  src={loc.image}
                  alt={loc.alt}
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </motion.div>
          ))}
        </motion.section>

        {/* SECTION 2: Form & Get In Touch Section */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
        >
          {/* Animated Form Container */}
          <motion.div
            variants={fadeInUp}
            whileHover={{ borderColor: 'rgba(0,0,0,1)' }}
            className="lg:col-span-6 border border-gray-900 p-8 md:p-12 rounded-sm bg-white shadow-lg transition-colors duration-300"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 mb-8 flex items-center gap-3"
            >
              Send Us a Message
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              >
                <FiSend className="w-5 h-5 text-gray-600" />
              </motion.span>
            </motion.h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div variants={fadeInUp}>
                <label
                  htmlFor="name"
                  className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2"
                >
                  Name
                </label>
                <motion.input
                  whileFocus={{ scale: 1.01, borderColor: '#000' }}
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full p-3.5 border border-gray-200 rounded-sm focus:outline-none text-sm transition-all bg-gray-50/50 focus:bg-white"
                />
              </motion.div>

              <motion.div variants={fadeInUp}>
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2"
                >
                  Email
                </label>
                <motion.input
                  whileFocus={{ scale: 1.01, borderColor: '#000' }}
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full p-3.5 border border-gray-200 rounded-sm focus:outline-none text-sm transition-all bg-gray-50/50 focus:bg-white"
                />
              </motion.div>

              <motion.div variants={fadeInUp}>
                <label
                  htmlFor="subject"
                  className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2"
                >
                  Subject
                </label>
                <motion.input
                  whileFocus={{ scale: 1.01, borderColor: '#000' }}
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  className="w-full p-3.5 border border-gray-200 rounded-sm focus:outline-none text-sm transition-all bg-gray-50/50 focus:bg-white"
                />
              </motion.div>

              <motion.div variants={fadeInUp}>
                <label
                  htmlFor="message"
                  className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2"
                >
                  Message
                </label>
                <motion.textarea
                  whileFocus={{ scale: 1.01, borderColor: '#000' }}
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project..."
                  className="w-full p-3.5 border border-gray-200 rounded-sm focus:outline-none text-sm transition-all bg-gray-50/50 focus:bg-white resize-none"
                />
              </motion.div>

              {/* Success / Error Notification */}
              {status.success && (
                <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-sm">
                  <FiCheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{status.message}</span>
                </div>
              )}

              {status.error && (
                <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-sm">
                  <FiAlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{status.message}</span>
                </div>
              )}

              <motion.div variants={fadeInUp} className="pt-2">
                <motion.button
                  whileHover={{
                    scale: status.submitting ? 1 : 1.03,
                    backgroundColor: '#000000',
                    color: '#ffffff',
                  }}
                  whileTap={{ scale: status.submitting ? 1 : 0.97 }}
                  type="submit"
                  disabled={status.submitting}
                  className="w-full md:w-auto px-10 py-3.5 bg-gray-900 text-white text-xs font-semibold uppercase tracking-widest transition-colors rounded-sm border border-black shadow-md flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status.submitting ? (
                    <>
                      <FiLoader className="w-4 h-4 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <span>Submit Message</span>
                  )}
                </motion.button>
              </motion.div>
            </form>
          </motion.div>

          {/* Animated Info Container */}
          <motion.div
            variants={staggerContainer}
            className="lg:col-span-6 lg:pl-12 space-y-12"
          >
            <div>
              <motion.div 
                variants={staggerContainer}
                className="flex flex-wrap text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-8 overflow-hidden"
              >
                {headingText.split('').map((char, index) => (
                  <motion.span
                    key={index}
                    variants={letterAnimation}
                    className={char === ' ' ? 'mr-4' : ''}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.div>

              <motion.div variants={fadeInUp} className="flex items-start gap-5">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
                  className="p-3.5 border border-gray-900 rounded-full shrink-0 bg-white shadow-sm"
                >
                  <FiSun className="w-6 h-6 text-gray-900" />
                </motion.div>
                <p className="text-sm text-gray-600 leading-relaxed pt-1 max-w-sm">
                  Reach out to us with any questions, feedback, or custom web design support needs.
                </p>
              </motion.div>
            </div>

            <motion.hr variants={fadeInUp} className="border-gray-200" />

            <motion.div variants={fadeInUp} className="flex items-baseline gap-6 group">
              <motion.span
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="text-6xl md:text-8xl font-black tracking-tighter text-gray-900 cursor-default"
              >
                100+
              </motion.span>
              <span className="text-xs font-medium uppercase tracking-wider text-gray-500 leading-normal">
                Successfully
                <br />
                Completed Projects
              </span>
            </motion.div>
          </motion.div>
        </motion.section>

      </div>
    </main>
  )
}