import { industries } from '@/data/industries'
import { FadeUp } from '@/components/motion/FadeUp'

// Mixed col-spans on lg+ for visual rhythm
// Pattern [2,2,3,2,2,3,2] over a 16-col grid = 16 cols total over 7 items
const COL_SPANS_INDUSTRIES = [
  'lg:col-span-2',
  'lg:col-span-2',
  'lg:col-span-3',
  'lg:col-span-2',
  'lg:col-span-2',
  'lg:col-span-3',
  'lg:col-span-2',
] as const

export function IndustriesServed() {
  return (
    <section className="bg-ink text-surface py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="max-w-3xl space-y-6 mb-16">
          <FadeUp>
            <p className="font-body text-xs uppercase tracking-[2px] text-accent">
              Industries Served
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2
              className="font-display text-surface leading-[1.05]"
              style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}
            >
              Powering Critical Infrastructure
            </h2>
          </FadeUp>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-[repeat(16,minmax(0,1fr))] gap-4 lg:gap-6">
          {industries.map((industry, i) => {
            const Icon = industry.icon
            return (
              <FadeUp
                key={industry.label}
                delay={i * 0.05}
                className={`col-span-1 ${COL_SPANS_INDUSTRIES[i] ?? 'lg:col-span-2'}`}
              >
                <div className="h-full aspect-square lg:aspect-auto lg:min-h-[200px] rounded-card border border-surface/15 p-6 lg:p-8 flex flex-col justify-between hover:border-accent transition-colors">
                  <Icon size={36} className="text-accent" strokeWidth={1.5} />
                  <h3 className="font-display text-surface text-lg lg:text-xl leading-tight">
                    {industry.label}
                  </h3>
                </div>
              </FadeUp>
            )
          })}
        </div>
      </div>
    </section>
  )
}
