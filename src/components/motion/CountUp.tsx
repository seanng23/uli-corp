'use client'

import { useRef, useEffect } from 'react'
import { useInView, animate, useReducedMotion } from 'framer-motion'

interface CountUpProps {
  value: number
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
}

export function CountUp({ value, prefix = '', suffix = '', duration = 2, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (!isInView || shouldReduceMotion) return
    const el = ref.current
    if (!el) return
    const controls = animate(0, value, {
      duration,
      ease: 'easeOut',
      onUpdate(latest) {
        el.textContent = prefix + Math.round(latest).toLocaleString() + suffix
      },
    })
    return () => controls.stop()
  }, [isInView, value, prefix, suffix, duration, shouldReduceMotion])

  // SSR renders the final value as a single string — crawlers see the real number
  // (avoid React <!-- --> comment separators between prefix/value/suffix text nodes)
  const ssrText = `${prefix}${value.toLocaleString()}${suffix}`
  return (
    <span ref={ref} className={className}>
      {ssrText}
    </span>
  )
}
