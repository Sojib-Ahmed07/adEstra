'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { FiCheck, FiArrowUpRight } from 'react-icons/fi'

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
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.215, 0.61, 0.355, 1.0],
    },
  },
}

// Packages Data
const packagesData = [
  {
    name: 'Starter Pack',
    price: '$247.00',
    bgColor: 'bg-[#f7f8fa]',
    features: [
      'Social Media Setup & Optimization',
      '10 Custom Graphics & Posts',
      'Basic SEO Optimization',
      '1 Ad Campaign Setup',
      'Monthly Performance Report',
    ],
  },
  {
    name: 'Growth Pack',
    price: '$346.00',
    bgColor: 'bg-[#f4f6fd]',
    features: [
      'Everything in Starter Package',
      'Total 20 Custom Graphics & Posts',
      '2 Ad Campaigns Setup & Management',
      'Website Audit & Optimization',
      'Hashtag & Engagement Strategy',
      'Bi-Weekly Performance Reports',
      'Local video issuance',
    ],
  },
  {
    name: 'Premium Pack',
    price: '$445.00',
    bgColor: 'bg-[#f0faf7]',
    features: [
      'Everything in Growth Package +',
      'Total 30 Custom Graphics & Posts',
      '4 Ad Campaigns with A/B Testing',
      'Advanced SEO & Keyword Strategy',
      'Blog Content (2 per Month)',
      'Competitor Analysis',
      'Weekly Performance Reports',
    ],
  },
]

// Add-Ons Categories Data
const addOnsData = [
  {
    category: 'Social Media',
    title: 'Add-Ons',
    items: [
      'Extra 5 Custom Graphics & Posts - $50',
      'Extra 10 Custom Graphics & Posts - $90',
      'Instagram & Facebook Stories (10 per Month) - $60',
      'Social Media Account Management (Daily Posting & Engagement) - $150',
    ],
  },
  {
    category: 'Advertising',
    title: 'Add-Ons',
    items: [
      'Additional Ad Campaign Setup - $80',
      'Ad Campaign Management & Optimization (per month) - $120',
      'Google Ads Setup & Management - $150',
    ],
  },
  {
    category: 'SEO & Website',
    title: 'Add-Ons',
    items: [
      'Advanced SEO Optimization - $120',
      'Blog Writing (2 articles per month) - $100',
      'Landing Page Design & Development - $250',
      'Website Speed Optimization - $80',
    ],
  },
  {
    category: 'Branding & Content',
    title: 'Creation',
    items: [
      'Logo Design (3 Concepts) - $100',
      'Brand Identity Kit (Logo Colors Fonts) $190',
      'Video Editing (Short Form Content) - $120',
      'Photo Editing (min.10 piece) - $30',
    ],
  },
]

// Awards Data
const awardsData = [
  {
    year: '2019',
    category: 'Illustrator Design',
    title: 'Dribbble Design Month',
    image:
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=80',
  },
  {
    year: '2020',
    category: 'Motion Graphics',
    title: 'Animation Festival',
    image:
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
  },
  {
    year: '2021',
    category: '3D Design',
    title: 'Creation Awards',
    image:
      'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=600&q=80',
  },
  {
    year: '2022',
    category: 'UI/UX Design',
    title: 'UI/UX Innovation',
    image:
      'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=600&q=80',
  },
  {
    year: '2023',
    category: 'Web Design',
    title: 'CSS Winner',
    image:
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80',
  },
]

export default function PricingPage() {
  const [hoveredAward, setHoveredAward] = useState(null)

  return (
    <main className="w-full min-h-screen bg-white text-gray-900 font-sans py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-20 sm:space-y-24 lg:space-y-28">

        {/* =====================================================
            SECTION 1: PRICING
        ====================================================== */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="text-center"
        >
          <motion.h1
            variants={fadeInUp}
            className="
              text-3xl
              sm:text-4xl
              md:text-5xl
              lg:text-6xl
              font-extrabold
              tracking-tight
              text-gray-900
              mb-10
              sm:mb-12
              lg:mb-16
              leading-[1.05]
              max-w-4xl
              mx-auto
            "
          >
            Special offer! choose <br className="hidden sm:block" />
            your pack today
          </motion.h1>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 items-stretch">
            {packagesData.map((pkg, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3 },
                }}
                className={`
                  ${pkg.bgColor}
                  p-6
                  sm:p-8
                  lg:p-10
                  rounded-2xl
                  sm:rounded-3xl
                  flex
                  flex-col
                  justify-between
                  text-left
                  transition-all
                  duration-300
                  shadow-sm
                  hover:shadow-xl
                  min-w-0
                `}
              >
                <div>
                  <span className="text-sm font-medium text-gray-500 block mb-2">
                    {pkg.name}
                  </span>

                  <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-7 sm:mb-8">
                    {pkg.price}
                  </div>

                  <ul className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
                    {pkg.features.map((feat, fIdx) => (
                      <li
                        key={fIdx}
                        className="flex items-start gap-2.5 sm:gap-3 text-sm text-gray-600 leading-snug"
                      >
                        <FiCheck className="w-4 h-4 text-gray-900 shrink-0 mt-0.5" />

                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <motion.div whileTap={{ scale: 0.96 }}>
                  <Link
                    href="/contact"
                    className="
                      inline-block
                      px-6
                      sm:px-7
                      py-3
                      rounded-full
                      border
                      border-gray-900
                      text-gray-900
                      text-xs
                      font-semibold
                      hover:bg-black
                      hover:text-white
                      transition-colors
                    "
                  >
                    Get Started
                  </Link>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* =====================================================
            SECTION 2: ADD-ONS
        ====================================================== */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="
            bg-[#edf9f8]
            p-6
            sm:p-8
            md:p-10
            lg:p-14
            rounded-2xl
            sm:rounded-3xl
            shadow-sm
          "
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-8">
            {addOnsData.map((col, idx) => (
              <div key={idx} className="space-y-4 min-w-0">
                <div>
                  <span className="text-xs font-medium text-gray-500 block mb-1">
                    {col.category}
                  </span>

                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                    {col.title}
                  </h3>
                </div>

                <ul className="space-y-3 pt-1">
                  {col.items.map((item, iIdx) => (
                    <li
                      key={iIdx}
                      className="
                        flex
                        items-start
                        gap-2.5
                        text-xs
                        text-gray-600
                        leading-normal
                      "
                    >
                      <FiCheck className="w-3.5 h-3.5 text-gray-900 shrink-0 mt-0.5" />

                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.section>

        {/* =====================================================
            SECTION 3: AWARDS
        ====================================================== */}
        <section className="space-y-8 sm:space-y-10 lg:space-y-12">

          {/* Section Header */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="pt-8 sm:pt-10 border-t border-gray-900"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-gray-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full border border-indigo-600 inline-block" />

              OUR AWARDS
            </span>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="
              grid
              grid-cols-1
              lg:grid-cols-12
              gap-10
              lg:gap-12
              items-start
            "
          >

            {/* =================================================
                LEFT COLUMN
            ================================================== */}
            <motion.div
              variants={fadeInUp}
              className="lg:col-span-5 space-y-6 sm:space-y-8"
            >
              <h2
                className="
                  text-3xl
                  sm:text-4xl
                  md:text-5xl
                  lg:text-6xl
                  font-extrabold
                  tracking-tight
                  text-gray-900
                  leading-[1.05]
                "
              >
                Awards that give us inspiration
              </h2>

              <div>
                <Link
                  href="/contact"
                  className="
                    inline-block
                    px-7
                    sm:px-8
                    py-3
                    rounded-full
                    border
                    border-gray-900
                    text-gray-900
                    text-xs
                    font-semibold
                    hover:bg-black
                    hover:text-white
                    transition-colors
                  "
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>

            {/* =================================================
                RIGHT COLUMN: AWARDS
            ================================================== */}
            <motion.div
              variants={fadeInUp}
              className="lg:col-span-7 divide-y divide-gray-200 w-full"
            >
              {awardsData.map((award, idx) => (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredAward(idx)}
                  onMouseLeave={() => setHoveredAward(null)}
                  className="
                    relative
                    py-6
                    sm:py-7
                    lg:py-8
                    first:pt-0
                    last:pb-0
                    flex
                    flex-col
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                    gap-5
                    sm:gap-6
                    group
                    cursor-pointer
                    min-w-0
                  "
                >
                  {/* =================================================
                      HOVER IMAGE
                  ================================================== */}
                  <AnimatePresence>
                    {hoveredAward === idx && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          scale: 0.8,
                          x: -20,
                        }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          x: 0,
                        }}
                        exit={{
                          opacity: 0,
                          scale: 0.8,
                          x: -20,
                        }}
                        transition={{
                          duration: 0.25,
                          ease: 'easeOut',
                        }}
                        className="
                          hidden
                          md:block
                          absolute
                          -left-40
                          lg:-left-44
                          top-1/2
                          -translate-y-1/2
                          w-32
                          lg:w-36
                          h-22
                          lg:h-24
                          rounded-lg
                          overflow-hidden
                          shadow-2xl
                          border
                          border-gray-100
                          z-20
                          pointer-events-none
                        "
                      >
                        <img
                          src={award.image}
                          alt={award.title}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* =================================================
                      YEAR & CATEGORY
                  ================================================== */}
                  <div
                    className="
                      flex
                      items-center
                      gap-4
                      sm:gap-6
                      md:gap-10
                      lg:gap-12
                      text-gray-500
                      font-medium
                      min-w-0
                      shrink-0
                    "
                  >
                    <span className="text-sm sm:text-base lg:text-lg shrink-0">
                      {award.year}
                    </span>

                    <span className="text-gray-300 shrink-0">
                      •
                    </span>

                    <span
                      className="
                        text-sm
                        sm:text-base
                        lg:text-lg
                        truncate
                        sm:min-w-[120px]
                        lg:min-w-[140px]
                      "
                    >
                      {award.category}
                    </span>
                  </div>

                  {/* =================================================
                      AWARD TITLE & ARROW
                  ================================================== */}
                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      sm:justify-end
                      gap-4
                      sm:gap-5
                      lg:gap-6
                      min-w-0
                      w-full
                      sm:w-auto
                    "
                  >
                    <h3
                      className="
                        text-xl
                        sm:text-2xl
                        lg:text-3xl
                        font-bold
                        text-gray-900
                        group-hover:text-gray-500
                        transition-colors
                        leading-tight
                        min-w-0
                      "
                    >
                      {award.title}
                    </h3>

                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="
                        w-10
                        h-10
                        sm:w-11
                        sm:h-11
                        md:w-12
                        md:h-12
                        rounded-full
                        bg-black
                        text-white
                        flex
                        items-center
                        justify-center
                        shrink-0
                        group-hover:bg-indigo-600
                        transition-colors
                      "
                    >
                      <FiArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6" />
                    </motion.div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </section>
      </div>
    </main>
  )
}