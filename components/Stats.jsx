'use client'

import { motion } from 'framer-motion'
import stats from '../data/stats'
import { useReveal } from '../hooks/useReveal'

export default function Stats({ id = 'proof' }) {
  const [ref, inView] = useReveal({ amount: 0.2 })

  return (
    <motion.section
      ref={ref}
      id={id}
      className="w-full scroll-mt-24 border-y border-white/5 bg-surface/20 py-12"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/5 bg-surface/60 p-6 sm:p-7 backdrop-blur-md transition-all duration-300 hover:border-accent/30 hover:shadow-[0_0_25px_rgba(16,185,129,0.1)]"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-accent">
                  {s.value}
                </span>
                <span className="font-mono text-xs text-muted/50 group-hover:text-accent transition-colors">
                  0{i + 1}
                </span>
              </div>
              <span className="mt-4 font-mono text-xs uppercase tracking-wider text-muted">
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
