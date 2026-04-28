import { stats } from '@/data/stats'
import { CountUp } from '@/components/motion/CountUp'
import { FadeUp } from '@/components/motion/FadeUp'

export function StatsBanner() {
  return (
    <section className="relative bg-ink text-surface py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {stats.map((stat, i) => (
            <FadeUp key={stat.label} delay={i * 0.08} className="space-y-3">
              <div
                className="font-display text-surface leading-none"
                style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}
              >
                <CountUp
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </div>
              <p className="font-body text-sm lg:text-base text-surface/70 uppercase tracking-wider">
                {stat.label}
              </p>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
