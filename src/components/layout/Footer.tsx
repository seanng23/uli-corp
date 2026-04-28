import Link from 'next/link'
import { company } from '@/data/company'

const FOOTER_LINKS = {
  Company: [
    { href: '/about', label: 'About' },
    { href: '/sustainability', label: 'Sustainability' },
    { href: '/investor-relations', label: 'Investor Relations' },
    { href: '/media', label: 'Media' },
  ],
  Solutions: [
    { href: '/products', label: 'Products' },
    { href: '/projects', label: 'Projects' },
    { href: '/technology', label: 'Technology' },
  ],
  Contact: [
    { href: '/contact', label: 'Get In Touch' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-ink text-surface mt-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Address column */}
          <div className="space-y-3">
            <h3 className="font-display text-xl text-surface">{company.name}</h3>
            <address className="not-italic font-body text-sm leading-relaxed text-surface/80">
              {company.address.street}<br />
              {company.address.locality}, {company.address.region}<br />
              {company.address.country}
            </address>
            <div className="font-body text-sm text-surface/80 space-y-1 pt-2">
              {company.phones.map((p) => (
                <div key={p}>Tel: {p}</div>
              ))}
              <div>
                <a href={`mailto:${company.email}`} className="hover:text-accent">
                  {company.email}
                </a>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading} className="space-y-3">
              <h4 className="font-display text-sm uppercase tracking-widest text-accent">{heading}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="font-body text-sm text-surface/80 hover:text-accent transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-surface/20 flex flex-col md:flex-row justify-between gap-4 font-body text-xs text-surface/60">
          <div>
            Registration: {company.registrationNumber} &middot; Listed on Bursa Malaysia ({company.bursaCode})
          </div>
          <div>&copy; {new Date().getFullYear()} {company.name}. All rights reserved.</div>
        </div>
      </div>
    </footer>
  )
}
