'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import site, { navRoutes } from '../data/site'
import { useDesktop } from '../hooks/useMediaQuery'
import { useEntranceDelay } from '../hooks/useEntranceDelay'

// Active state for a route link. "/" is only active on the exact
// home path; every other path must match itself or a child of it.
function isActive(pathname, path) {
  if (path === '/') return pathname === '/'
  return pathname === path || pathname.startsWith(`${path}/`)
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const isDesktop = useDesktop()
  const pathname = usePathname()
  const menuRef = useRef(null)
  // Slide in after the one-time loader on a first visit; immediately
  // on every return visit.
  const entranceDelay = useEntranceDelay(0.15, 1.7)

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Any completed navigation closes the mobile menu — covers links,
  // browser back/forward, and programmatic redirects.
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Growing past the desktop breakpoint removes the hamburger; drop
  // the open state too so it cannot reappear pre-opened on resize back.
  useEffect(() => {
    if (isDesktop) setOpen(false)
  }, [isDesktop])

  // Close mobile menu on Escape key
  useEffect(() => {
    if (!open) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  // Close mobile menu on outside click
  useEffect(() => {
    if (!open) return
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [open])

  return (
    <>
      {/* Neon scroll-progress line */}
      <motion.div
        className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left bg-accent"
        style={{ scaleX: progress }}
      />

      <motion.header
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 py-3 sm:px-6 lg:px-8 transition-all duration-300 pointer-events-none"
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: entranceDelay, duration: 0.6, ease: 'easeOut' }}
      >
        <div
          className={`pointer-events-auto flex h-14 w-full max-w-7xl items-center justify-between px-5 transition-all duration-300 sm:px-6 ${
            scrolled
              ? 'rounded-full bg-surface/85 backdrop-blur-xl border border-white/10 shadow-xl shadow-black/40'
              : 'rounded-full bg-transparent border border-transparent'
          }`}
        >
          {/* Logo / name mark → home */}
          <Link
            href="/"
            aria-label={`${site.name} — home`}
            className="group flex items-center gap-2.5 font-display text-lg tracking-tight text-text"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 border border-accent/30 font-mono text-xs font-bold text-accent transition-transform duration-300 group-hover:scale-105 group-hover:border-accent">
              KW
            </span>
            <span className="font-semibold transition-colors group-hover:text-accent">
              {site.name}
            </span>
          </Link>

          {/* Desktop links */}
          {isDesktop ? (
            <nav className="flex items-center gap-6" aria-label="Main">
              {navRoutes.map((s) => {
                const active = isActive(pathname, s.path)
                return (
                  <Link
                    key={s.path}
                    href={s.path}
                    aria-current={active ? 'page' : undefined}
                    className="group relative font-mono text-xs uppercase tracking-wider"
                  >
                    <span
                      className={`transition-colors duration-200 ${
                        active
                          ? 'text-accent font-semibold'
                          : 'text-muted hover:text-text'
                      }`}
                    >
                      <span className="text-accent/60">// </span>
                      {s.label}
                    </span>
                    {active && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-accent"
                      />
                    )}
                  </Link>
                )
              })}

              {/* Status pill */}
              <div className="hidden xl:flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-3 py-1 font-mono text-[11px] text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                Available for work
              </div>

              {/* CTA */}
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/contact"
                  className="group flex items-center gap-1.5 rounded-full bg-accent/15 hover:bg-accent border border-accent/40 hover:border-accent px-4 py-1.5 font-mono text-xs font-semibold text-accent hover:text-background transition-all duration-300 hover:shadow-[0_0_20px_rgba(16,185,129,0.35)]"
                >
                  hire me
                  <ArrowUpRight
                    size={14}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </motion.div>
            </nav>
          ) : (
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={open}
              className="rounded-full p-2 text-text transition-colors hover:bg-surface border border-white/5"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}
        </div>

        {/* Mobile dropdown menu */}
        <AnimatePresence>
          {open && !isDesktop && (
            <motion.nav
              ref={menuRef}
              className="pointer-events-auto absolute left-4 right-4 top-16 overflow-hidden rounded-2xl border border-white/10 bg-surface/95 p-4 shadow-2xl backdrop-blur-2xl"
              initial={{ opacity: 0, y: -10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              aria-label="Mobile menu"
            >
              <div className="flex flex-col gap-1 px-4 py-3">
                {navRoutes.map((s, i) => {
                  const active = isActive(pathname, s.path)
                  return (
                    <motion.div
                      key={s.path}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={s.path}
                        onClick={() => setOpen(false)}
                        aria-current={active ? 'page' : undefined}
                        className={`flex flex-col gap-0.5 rounded-md px-3 py-3 font-mono text-sm transition-colors hover:bg-surface ${
                          active ? 'text-text' : 'text-soft'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-accent">//</span>
                          {s.label}
                        </span>
                        <span className="pl-5 text-xs text-muted">{s.blurb}</span>
                      </Link>
                    </motion.div>
                  )
                })}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: navRoutes.length * 0.05 }}
                >
                  <Link
                    href="/contact"
                    onClick={() => setOpen(false)}
                    className="mt-2 flex items-center justify-center gap-1.5 rounded-md border border-accent px-4 py-2.5 font-mono text-sm text-accent"
                  >
                    hire me <ArrowUpRight size={15} />
                  </Link>
                </motion.div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}
