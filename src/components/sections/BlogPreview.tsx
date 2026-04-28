import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { blogPosts } from '@/data/blog'
import { FadeUp } from '@/components/motion/FadeUp'

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-MY', { year: 'numeric', month: 'long', day: 'numeric' })
}

export function BlogPreview() {
  return (
    <section className="bg-surface py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl space-y-6">
            <FadeUp>
              <p className="font-body text-xs uppercase tracking-[2px] text-accent">
                Insights
              </p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2
                className="font-display text-ink leading-[1.05]"
                style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}
              >
                Field Notes & Industry Perspectives
              </h2>
            </FadeUp>
          </div>
          <FadeUp delay={0.2}>
            <Link
              href="/media"
              className="inline-flex items-center gap-2 font-body text-sm text-ink hover:text-accent transition-colors"
            >
              View all insights
              <ArrowUpRight size={16} />
            </Link>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {blogPosts.map((post, i) => (
            <FadeUp key={post.slug} delay={i * 0.08}>
              <article className="group flex flex-col gap-5">
                <Link
                  href={`/media/${post.slug}`}
                  className="block relative aspect-[4/3] w-full rounded-card overflow-hidden bg-ink"
                >
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>
                <div className="space-y-3">
                  <time className="font-body text-xs uppercase tracking-[2px] text-ink-body/60">
                    {formatDate(post.date)}
                  </time>
                  <h3
                    className="font-display text-ink leading-tight"
                    style={{ fontSize: 'clamp(22px, 2vw, 28px)' }}
                  >
                    <Link href={`/media/${post.slug}`} className="hover:text-accent transition-colors">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="font-body text-sm text-ink-body/80 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </article>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
