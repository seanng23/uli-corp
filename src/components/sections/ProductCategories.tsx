import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { products } from '@/data/products'
import { FadeUp } from '@/components/motion/FadeUp'

// Asymmetric col-span pattern for the 7 tiles on lg+
const COL_SPANS = [
  'lg:col-span-7',
  'lg:col-span-5',
  'lg:col-span-4',
  'lg:col-span-4',
  'lg:col-span-4',
  'lg:col-span-7',
  'lg:col-span-5',
] as const

export function ProductCategories() {
  return (
    <section className="bg-surface py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="max-w-3xl space-y-6 mb-16">
          <FadeUp>
            <p className="font-body text-xs uppercase tracking-[2px] text-accent">
              What We Engineer
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2
              className="font-display text-ink leading-[1.05]"
              style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}
            >
              Seven Product Lines. One Standard.
            </h2>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
          {products.map((product, i) => (
            <FadeUp
              key={product.slug}
              delay={i * 0.06}
              className={`${COL_SPANS[i] ?? 'lg:col-span-4'}`}
            >
              <Link
                href="/products"
                className="group relative block aspect-[4/3] rounded-card overflow-hidden bg-ink"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-end text-surface">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <h3
                        className="font-display leading-tight"
                        style={{ fontSize: 'clamp(22px, 2.4vw, 32px)' }}
                      >
                        {product.name}
                      </h3>
                      <p className="font-body text-sm text-surface/80 max-w-md">
                        {product.description}
                      </p>
                    </div>
                    <ArrowUpRight
                      className="shrink-0 text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                      size={28}
                    />
                  </div>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
