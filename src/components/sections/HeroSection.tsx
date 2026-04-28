import Image from 'next/image'
import Link from 'next/link'
import { HeroParallax } from '@/components/motion/HeroParallax'
import { WordReveal } from '@/components/motion/WordReveal'

// Placeholder hero image from Unsplash (industrial steel).
// TODO: Replace with real ULI manufacturing image when supplied.
const HERO_IMAGE = 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=2400&q=80'

export function HeroSection() {
  return (
    <section className="relative h-screen min-h-[640px] w-full overflow-hidden">
      {/* Parallax background image */}
      <HeroParallax className="absolute inset-0 h-[120%] w-full">
        <Image
          src={HERO_IMAGE}
          alt="Industrial steel manufacturing"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink/50" />
      </HeroParallax>

      {/* Foreground content */}
      <div className="relative z-10 h-full mx-auto max-w-7xl px-6 lg:px-12 flex flex-col justify-end pb-24 lg:pb-32">
        <div className="max-w-4xl space-y-6">
          <p className="font-body text-xs uppercase tracking-[2px] text-accent">
            Est. 1978 | Inc. 1983
          </p>
          <h1
            className="font-display text-surface leading-[1.05]"
            style={{ fontSize: 'clamp(48px, 7vw, 120px)' }}
          >
            <WordReveal text="Engineering Tomorrow's Infrastructure" />
          </h1>
          <p className="font-body text-base lg:text-lg text-surface/90 max-w-2xl">
            Over 40 years delivering certified cable support solutions across ASEAN and international markets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-7 py-3 rounded-btn bg-accent text-white font-body font-medium hover:opacity-90 transition-opacity"
            >
              Explore Our Products
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-7 py-3 rounded-btn border border-surface text-surface bg-transparent font-body font-medium hover:bg-surface hover:text-ink transition-colors"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
