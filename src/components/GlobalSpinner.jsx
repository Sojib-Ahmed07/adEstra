'use client';

import { motion } from 'framer-motion';

export default function GlobalSpinner() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/40 backdrop-blur-md"
    >
      <div className="relative flex items-center justify-center">
        {/* Outer Pulsing Glow */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute h-24 w-24 rounded-full bg-indigo-500/30 blur-xl"
        />

        {/* Outer Counter-Rotating Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="h-20 w-20 rounded-full border-2 border-transparent border-b-indigo-400/40 border-t-indigo-400/40"
        />

        {/* Inner Main Spinner */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute h-14 w-14 rounded-full border-4 border-transparent border-t-indigo-600 border-r-indigo-500"
        />

        {/* Glowing Center Core */}
        <motion.div
          animate={{
            scale: [0.8, 1.1, 0.8],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute h-4 w-4 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-400 shadow-[0_0_12px_rgba(99,102,241,0.8)]"
        />
      </div>

      {/* Animated Text Indicator */}
      <motion.div
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="mt-6 flex items-center gap-1.5 text-sm font-medium tracking-wide text-slate-200"
      >
        <span>Loading</span>
        <span className="flex gap-0.5">
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
          >
            .
          </motion.span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
          >
            .
          </motion.span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
          >
            .
          </motion.span>
        </span>
      </motion.div>
    </motion.div>
  );
}