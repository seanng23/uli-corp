'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

interface HeroParallaxProps {
  children: ReactNode
  className?: string
}

export function HeroParallax({ children, className }: HeroParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ['0%', '0%'] : ['0%', '50%'])
  return (
    <div ref={ref} className={className} style={{ overflow: 'hidden' }}>
      <motion.div style={{ y, position: 'absolute', inset: 0 }}>{children}</motion.div>
    </div>
  )
}
