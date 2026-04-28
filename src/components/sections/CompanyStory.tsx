import Image from 'next/image'
import { FadeUp } from '@/components/motion/FadeUp'

// Placeholder image — industrial steel processing
const STORY_IMAGE = 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1600&q=80'

export function CompanyStory() {
  return (
    <section className="bg-surface py-24 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Text column */}
          <div className="lg:col-span-7 space-y-8">
            <FadeUp>
              <p className="font-body text-xs uppercase tracking-[2px] text-accent">
                Our Story
              </p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2
                className="font-display text-ink leading-[1.05]"
                style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}
              >
                A Legacy of Steel and Precision
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="space-y-5 font-body text-base lg:text-lg text-ink-body leading-relaxed max-w-xl">
                <p>
                  Founded in 1978 and incorporated in 1983, United U-Li Corporation Berhad has spent more than four decades engineering the unseen infrastructure that powers Malaysia&apos;s commercial, industrial, and civic landscape.
                </p>
                <p>
                  From our five integrated manufacturing plants in Seri Kembangan, we process over 40,000 metric tonnes of steel each year into certified cable support, framing, and electrical accessory systems trusted across ASEAN.
                </p>
                <p>
                  Today, listed on Bursa Malaysia, we continue to invest in precision manufacturing and product engineering, building components that quietly hold the modern world together.
                </p>
              </div>
            </FadeUp>
          </div>

          {/* Image column */}
          <div className="lg:col-span-5">
            <FadeUp delay={0.15}>
              <div className="relative aspect-[4/5] w-full rounded-card overflow-hidden">
                <Image
                  src={STORY_IMAGE}
                  alt="ULI manufacturing operations"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  )
}
