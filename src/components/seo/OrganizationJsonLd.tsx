import { company } from '@/data/company'
import { JsonLd } from './JsonLd'

export function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: company.name,
    legalName: company.legalName,
    url: company.url,
    identifier: company.registrationNumber,
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.address.street,
      addressLocality: company.address.locality,
      addressRegion: company.address.region,
      addressCountry: company.address.countryCode,
    },
    contactPoint: company.phones.map((tel) => ({
      '@type': 'ContactPoint',
      telephone: tel,
      contactType: 'sales',
      email: company.email,
    })),
  }
  return <JsonLd data={data} />
}
