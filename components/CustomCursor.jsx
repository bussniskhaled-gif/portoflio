'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useFinePointer } from '../hooks/useMediaQuery'

// Desktop-only custom cursor: a small dot that follows the mouse with
// a lagging ring. The ring scales up over interactive elements.
// On touch devices this component renders nothing (native cursor).
export default function CustomCursor() {
  const fine = useFinePointer()

  // Use refs to avoid re-renders on every mousemove.
  const dotX = useMotionValue(-100)
  const dotY = useMotionValue(-100)
  const ringX = useSpring(dotX, { stiffness: 400, damping: 40 })
  const ringY = useSpring(dotY, { stiffness: 400, damping: 40 })

  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)
  const initialHideRef = useRef(false)

  const onMove = useCallback(
    (e) => {
      dotX.set(e.clientX)
      dotY.set(e.clientY)
      // Skip the very first movement to avoid the cursor jumping from (0,0).
      if (!initialHideRef.current) {
        initialHideRef.current = true
        setVisible(true)
      }
    },
    [dotX, dotY],
  )

  const onOver = useCallback((e) => {
    if (e.target.closest('a, button, [data-cursor-hover], input, textarea, label')) {
      setHovering(true)
    } else {
      setHovering(false)
    }
  }, [])

  const onLeave = useCallback(() => setVisible(false), [])
  const onEnter = useCallback(() => setVisible(true), [])

  useEffect(() => {
    if (!fine) return
    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)
    document.body.classList.add('has-custom-cursor')
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
      document.body.classList.remove('has-custom-cursor')
    }
  }, [fine, onMove, onOver, onLeave, onEnter])

  if (!fine) return null

  return (
    <>
      {/* Leading dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[200] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
        style={{ x: dotX, y: dotY, opacity: visible ? 1 : 0 }}
        transition={{ opacity: { duration: 0.2 } }}
      />
      {/* Trailing ring with ambient glow */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[199] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/60 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
        style={{ x: ringX, y: ringY, opacity: visible ? 1 : 0 }}
        animate={{
          width: hovering ? 52 : 28,
          height: hovering ? 52 : 28,
          borderColor: hovering ? 'rgba(16,185,129,0.9)' : 'rgba(16,185,129,0.4)',
          backgroundColor: hovering
            ? 'rgba(16,185,129,0.1)'
            : 'rgba(16,185,129,0)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      />
    </>
  )
}