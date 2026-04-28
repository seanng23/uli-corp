'use client'

import type { ReactNode } from 'react'

interface MarqueeProps {
  children: ReactNode
  durationSec?: number
  className?: string
}

export function Marquee({ children, durationSec = 30, className }: MarqueeProps) {
  return (
    <div className={`overflow-hidden ${className ?? ''}`}>
      <div
        className="flex gap-8 whitespace-nowrap"
        style={{ animation: `marquee ${durationSec}s linear infinite` }}
      >
        <div className="flex gap-8 shrink-0">{children}</div>
        <div className="flex gap-8 shrink-0" aria-hidden>{children}</div>
      </div>
      <style jsx>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        div:hover > div { animation-play-state: paused; }
      `}</style>
    </div>
  )
}
