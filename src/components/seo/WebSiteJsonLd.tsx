import { company } from '@/data/company'
import { JsonLd } from './JsonLd'

export function WebSiteJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: company.name,
    url: company.url,
  }
  return <JsonLd data={data} />
}
