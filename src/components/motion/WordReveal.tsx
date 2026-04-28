'use client'

interface WordRevealProps {
  text: string
  className?: string
  stagger?: number
}

export function WordReveal({ text, className }: WordRevealProps) {
  return <span className={className}>{text}</span>
}
