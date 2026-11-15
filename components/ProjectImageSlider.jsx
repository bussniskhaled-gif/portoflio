'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { animate, motion, useMotionValue } from 'framer-motion'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// ============================================================
// PROJECT IMAGE SLIDER
// Draggable, snap-to-image carousel for projects with multiple
// screenshots (e.g. Enrollhub). Built with Framer Motion drag +
// motion values, SSR-safe (measures container after mount),
// and respects the site's 60/30/10 dark palette.
//
// The track's x position is always 0 or negative: slide 0 sits at 0
// and slide N sits at -N * containerWidth. Every move — drag, dot,
// or arrow — goes through the same negative offset so direction
// can never disagree.
// ============================================================

const SNAP_SPRING = { type: 'spring', damping: 28, stiffness: 320 }

export default function ProjectImageSlider({
  images,
  alt = 'Project screenshot',
  className = '',
  showControls = true,
  showDots = true,
  aspectRatio = '16 / 10',
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [containerWidth, setContainerWidth] = useState(0)

  const containerRef = useRef(null)
  const slideCount = images.length

  // The index is mirrored in a ref so the resize effect can re-anchor
  // the track without depending on state (which would cancel a
  // running snap animation on every index change).
  const currentIndexRef = useRef(0)

  // Motion value driving the track's horizontal position.
  const scrollX = useMotionValue(0)

  // Measure the container after mount, then keep the measurement in
  // sync on resize/rotation so drag limits and snap points stay exact.
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const measure = () => setContainerWidth(el.getBoundingClientRect().width)
    measure()

    if (typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const goToSlide = useCallback(
    (index) => {
      const clamped = Math.max(0, Math.min(slideCount - 1, index))
      currentIndexRef.current = clamped
      setCurrentIndex(clamped)
      if (containerWidth > 0) {
        animate(scrollX, -clamped * containerWidth, SNAP_SPRING)
      }
    },
    [containerWidth, slideCount, scrollX],
  )

  // Re-anchor instantly (no animation) only when the width changes.
  useEffect(() => {
    if (containerWidth > 0) {
      scrollX.set(-currentIndexRef.current * containerWidth)
    }
  }, [containerWidth, scrollX])

  // Drag constraints in pixels: can't drag past the first or last slide.
  const dragConstraints =
    containerWidth === 0 || slideCount <= 1
      ? { left: 0, right: 0 }
      : { left: -(slideCount - 1) * containerWidth, right: 0 }

  // Snap to the nearest slide when the user releases the drag. The
  // drag itself has already moved scrollX, so read it back rather
  // than measuring the pointer's absolute page position.
  const handleDragEnd = useCallback(() => {
    if (containerWidth === 0) return
    const index = Math.round(-scrollX.get() / containerWidth)
    goToSlide(index)
  }, [containerWidth, scrollX, goToSlide])

  const nextSlide = useCallback(() => goToSlide(currentIndex + 1), [currentIndex, goToSlide])
  const prevSlide = useCallback(() => goToSlide(currentIndex - 1), [currentIndex, goToSlide])

  if (slideCount === 0) return null

  return (
    <section
      ref={containerRef}
      className={`group relative w-full min-w-0 overflow-hidden ${className}`}
      aria-label="Project image gallery"
      aria-roledescription="carousel"
    >
      {/* Aspect-ratio wrapper so the slider keeps its shape before images load */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio }}>
        <motion.div
          className="flex h-full"
          drag="x"
          dragConstraints={dragConstraints}
          dragElastic={0}
          dragMomentum={false}
          onDragEnd={handleDragEnd}
          style={{
            width: `${slideCount * 100}%`,
            x: scrollX,
          }}
        >
          {images.map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="relative h-full shrink-0 grow-0"
              style={{ width: `${100 / slideCount}%` }}
            >
              <Image
                src={src}
                alt={`${alt} — screenshot ${i + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="h-full w-full object-cover object-center"
                priority={i === 0}
                draggable={false}
              />
              {/* Dark gradient overlay so the counter is readable */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <span className="absolute bottom-4 left-4 z-10 font-mono text-xs text-text opacity-70">
                {i + 1} / {slideCount}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Navigation dots — show which image is active */}
      {showDots && slideCount > 1 && (
        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 flex-row gap-2">
          {Array.from({ length: slideCount }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goToSlide(i)}
              aria-label={`Go to image ${i + 1}`}
              aria-pressed={currentIndex === i}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                currentIndex === i ? 'w-6 bg-accent' : 'bg-surface-light hover:bg-accent'
              }`}
            />
          ))}
        </div>
      )}

      {/* Prev / Next arrows — always available on touch, on hover
          (or keyboard focus) from the lg breakpoint up. */}
      {showControls && slideCount > 1 && (
        <>
          <button
            type="button"
            onClick={prevSlide}
            disabled={currentIndex === 0}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-surface-light bg-black/60 text-text transition-all hover:bg-accent hover:text-background focus-visible:opacity-100 disabled:cursor-not-allowed disabled:opacity-30 lg:opacity-0 lg:group-hover:opacity-100"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            disabled={currentIndex === slideCount - 1}
            aria-label="Next image"
            className="absolute right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-surface-light bg-black/60 text-text transition-all hover:bg-accent hover:text-background focus-visible:opacity-100 disabled:cursor-not-allowed disabled:opacity-30 lg:opacity-0 lg:group-hover:opacity-100"
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}
    </section>
  )
}
