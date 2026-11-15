'use client'

import { motion } from 'framer-motion'
import { Terminal, Database, Server, CheckCircle2 } from 'lucide-react'
import { useEntranceDelay } from '../hooks/useEntranceDelay'

export default function HeroIllustrations() {
  const d = useEntranceDelay(0.1, 0.4)

  return (
    <div className="relative w-full max-w-lg lg:max-w-xl">
      {/* Ambient background glow */}
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-accent/20 via-emerald-500/10 to-teal-500/20 opacity-70 blur-2xl" />

      {/* Main Glass IDE Terminal Window */}
      <motion.div
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-surface/90 shadow-2xl backdrop-blur-xl"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: d + 0.15, duration: 0.7, ease: 'easeOut' }}
      >
        {/* Window Chrome / Title bar */}
        <div className="flex items-center justify-between border-b border-white/5 bg-background/50 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500/70" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
            <span className="h-3 w-3 rounded-full bg-green-500/70" />
          </div>
          <div className="flex items-center gap-1.5 rounded-md bg-white/[0.04] px-2.5 py-0.5 font-mono text-[11px] text-muted">
            <Terminal size={12} className="text-accent" />
            <span>architecture.ts</span>
          </div>
          <div className="flex items-center gap-1 font-mono text-[11px] text-accent/70">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            <span>live</span>
          </div>
        </div>

        {/* Code Content */}
        <div className="p-5 font-mono text-xs leading-relaxed sm:text-[13px]">
          <div className="text-muted/60">// Full Stack Architecture Config</div>
          <div className="mt-2">
            <span className="text-emerald-400">const</span>{' '}
            <span className="text-text font-semibold">khaledWaleed</span>{' '}
            <span className="text-accent">=</span> {'{'}
          </div>

          <div className="pl-4">
            <span className="text-soft">role</span>:{' '}
            <span className="text-amber-300">&apos;Full Stack Engineer&apos;</span>,
          </div>

          <div className="pl-4">
            <span className="text-soft">specialties</span>: {'['}
          </div>
          <div className="pl-8 text-amber-200/90">
            &apos;Next.js 15 &amp; React 19&apos;,<br />
            &apos;Node.js &amp; Express APIs&apos;,<br />
            &apos;PostgreSQL Schemas &amp; Queries&apos;,<br />
            &apos;Interactive Framer Motion &amp; Tailwind&apos;
          </div>
          <div className="pl-4">{'],'}</div>

          <div className="pl-4">
            <span className="text-soft">principles</span>: {'['}
          </div>
          <div className="pl-8 text-emerald-300/80">
            &apos;Pixel-perfect responsiveness&apos;,<br />
            &apos;Bulletproof API validation&apos;,<br />
            &apos;End-to-end product delivery&apos;
          </div>
          <div className="pl-4">{']'}</div>

          <div className="mt-1">{'};'}</div>

          {/* Terminal status line */}
          <div className="mt-5 rounded-lg border border-white/5 bg-background/60 p-3">
            <div className="flex items-center justify-between text-[11px] text-muted">
              <span className="flex items-center gap-1.5 text-accent">
                <CheckCircle2 size={13} /> All systems operational
              </span>
              <span className="text-muted/70">Next.js 15 · PostgreSQL</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating Badges */}
      <motion.div
        className="absolute -bottom-4 -left-4 flex items-center gap-2 rounded-xl border border-white/10 bg-surface/95 px-3.5 py-2 shadow-xl backdrop-blur-md"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: d + 0.35, duration: 0.6 }}
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/15 text-accent">
          <Database size={15} />
        </div>
        <div className="text-[11px]">
          <p className="font-semibold text-text">PostgreSQL</p>
          <p className="font-mono text-muted text-[10px]">Optimized Schemas</p>
        </div>
      </motion.div>

      <motion.div
        className="absolute -top-4 -right-3 flex items-center gap-2 rounded-xl border border-white/10 bg-surface/95 px-3.5 py-2 shadow-xl backdrop-blur-md"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: d + 0.45, duration: 0.6 }}
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/15 text-accent">
          <Server size={15} />
        </div>
        <div className="text-[11px]">
          <p className="font-semibold text-text">Node.js API</p>
          <p className="font-mono text-muted text-[10px]">REST &amp; Auth Ready</p>
        </div>
      </motion.div>
    </div>
  )
}
