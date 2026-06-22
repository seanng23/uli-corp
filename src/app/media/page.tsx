import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Media Centre",
  description:
    "News, insights and press releases from United U-LI Corporation Berhad — Malaysia's leading manufacturer of cable support and management systems.",
  alternates: { canonical: "/media" },
};

const featured = {
  title: "Made in Malaysia, Trusted Globally: The U-LI Manufacturing Story",
  date: "April 12, 2026",
  category: "Company News",
  excerpt:
    "With five fully integrated factories across the country, U-LI manufactures over 40,000 metric tonnes of steel-based products every year — supplying cable support and management systems to projects across the region and beyond.",
  src: "/images/homepage/blog-1.jpg",
  href: "/media/made-in-malaysia-trusted-globally",
};

const articles = [
  {
    title: "How to Choose the Right Cable Support Systems for Your Project",
    date: "April 12, 2026",
    category: "Insights",
    excerpt:
      "A well-planned cable support system is the backbone of any electrical or data installation. Discover the key components and the importance of strategic planning.",
    src: "/images/homepage/blog-2.jpg",
    href: "/media/choosing-cable-support-systems",
  },
  {
    title: "Understanding Cable Management Systems in Modern Infrastructure",
    date: "April 12, 2026",
    category: "Insights",
    excerpt:
      "This guide breaks down the differences and provides expert tips for selecting solutions that meet key industry standards.",
    src: "/images/homepage/blog-3.jpg",
    href: "/media/understanding-cable-management-systems",
  },
  {
    title: "Inside Our Factories: A Look at U-LI's Integrated Manufacturing",
    date: "March 28, 2026",
    category: "Behind the Scenes",
    excerpt:
      "From coil handling and roll forming to robotic welding and hot-dip galvanizing — a tour of the technologies that shape every U-LI product.",
    src: "/images/homepage/factory-1.jpg",
    href: "/media/inside-our-factories",
  },
  {
    title: "Powering Progress: U-LI Solutions in Major Regional Projects",
    date: "March 10, 2026",
    category: "Projects",
    excerpt:
      "How U-LI cable support systems underpin some of the most demanding commercial, transport and energy installations in the region.",
    src: "/images/homepage/project-1.jpg",
    href: "/media/u-li-in-regional-projects",
  },
  {
    title: "Sustainability in Steel: Our Move Toward Renewable Energy",
    date: "February 18, 2026",
    category: "Sustainability",
    excerpt:
      "Renewable energy now makes up over a quarter of the electricity used across our operations — a milestone on our path to greener manufacturing.",
    src: "/images/homepage/steel-1.jpg",
    href: "/sustainability",
  },
  {
    title: "Engineering Quality: How U-LI Maintains World-Class Standards",
    date: "January 30, 2026",
    category: "Quality",
    excerpt:
      "Every product is built to exacting tolerances and tested against rigorous quality controls — here is how our teams keep that promise.",
    src: "/images/homepage/welding.jpg",
    href: "/quality-assurance",
  },
];

const pressReleases = [
  { date: "May 22, 2026", title: "U-LI Corporation announces results for the first quarter of FY2026" },
  { date: "April 30, 2026", title: "United U-LI expands production capacity at its Nilai manufacturing facility" },
  { date: "March 14, 2026", title: "U-LI showcases latest cable management innovations at industry expo" },
  { date: "February 5, 2026", title: "United U-LI Corporation Berhad releases its Annual Report 2025" },
  { date: "January 12, 2026", title: "U-LI strengthens regional distribution network with new partnerships" },
];

export default function MediaPage() {
  return (
    <>
      {/* Top line */}
      <div className="site-container">
        <img src="/images/single-line.png" alt="" aria-hidden="true" className="w-full block" />
      </div>

      {/* Header */}
      <section className="site-container py-8 lg:py-10">
        <p className="font-raleway text-[11px] font-bold tracking-[0.2em] uppercase text-[#ff8905] mb-3">
          Media Centre
        </p>
        <h1 className="font-typewriter text-[clamp(1.8rem,3vw,3rem)] leading-tight text-[#1A0F00] mb-4">
          News &amp; Insights.
        </h1>
        <p className="font-raleway text-[15px] text-[#5C4A30] leading-relaxed max-w-[720px]">
          The latest stories, announcements and expertise from United U-LI Corporation Berhad —
          real-world knowledge from the people who build infrastructure every day.
        </p>
      </section>

      {/* Divider */}
      <div className="site-container">
        <img src="/images/double-line.png" alt="" aria-hidden="true" className="w-full block" />
      </div>

      {/* Featured */}
      <section className="site-container py-12 lg:py-16">
        <Link href={featured.href} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 group">
          <div className="relative w-full h-72 lg:h-[420px] overflow-hidden">
            <Image
              src={featured.src}
              alt={featured.title}
              fill
              className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-raleway text-[11px] font-bold uppercase tracking-[0.18em] text-[#ff8905] mb-3">
              {featured.category} &nbsp;·&nbsp; {featured.date}
            </span>
            <h2 className="font-typewriter text-[clamp(1.6rem,3vw,2.5rem)] leading-[1.1] text-[#1A0F00] mb-4 group-hover:text-[#ff8905] transition-colors">
              {featured.title}
            </h2>
            <p className="font-raleway text-[16px] text-[#5C4A30] leading-relaxed mb-5">
              {featured.excerpt}
            </p>
            <span className="link-underline text-sm text-[#1A0F00] inline-flex">Read More »</span>
          </div>
        </Link>
      </section>

      {/* Divider */}
      <div className="site-container">
        <img src="/images/double-line.png" alt="" aria-hidden="true" className="w-full block" />
      </div>

      {/* Latest news grid */}
      <section className="site-container py-12 lg:py-16">
        <h2 className="font-typewriter text-[clamp(1.5rem,2.5vw,2.25rem)] leading-tight text-[#1A0F00] mb-10">
          Latest Stories.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {articles.map((a) => (
            <Link key={a.title} href={a.href} className="block group">
              <div className="relative w-full h-60 overflow-hidden mb-5">
                <Image
                  src={a.src}
                  alt={a.title}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <span className="font-raleway text-[11px] font-bold uppercase tracking-[0.18em] text-[#ff8905]">
                {a.category} &nbsp;·&nbsp; {a.date}
              </span>
              <h3 className="font-typewriter text-[20px] leading-snug text-[#1A0F00] mt-2 mb-2 group-hover:text-[#ff8905] transition-colors">
                {a.title}
              </h3>
              <p className="font-raleway text-[15px] text-[#5C4A30] leading-relaxed">{a.excerpt}</p>
              <span className="link-underline text-sm text-[#1A0F00] mt-3 inline-flex">
                Read More »
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="site-container">
        <img src="/images/double-line.png" alt="" aria-hidden="true" className="w-full block" />
      </div>

      {/* Press releases */}
      <section className="site-container py-12 lg:py-16">
        <h2 className="font-typewriter text-[clamp(1.5rem,2.5vw,2.25rem)] leading-tight text-[#1A0F00] mb-3">
          Press Releases.
        </h2>
        <p className="font-raleway font-bold text-[17px] text-[#ff8905] mb-8">
          Official announcements from United U-LI Corporation Berhad.
        </p>
        <ul className="max-w-[820px] border-t border-[#1A0F00]/15">
          {pressReleases.map((p) => (
            <li key={p.title} className="border-b border-[#1A0F00]/15">
              <Link href="/media" className="flex items-start gap-4 py-5 group">
                <FileText size={18} strokeWidth={1.8} className="text-[#ff8905] shrink-0 mt-1" />
                <span className="min-w-0">
                  <span className="block font-raleway text-[12px] font-semibold uppercase tracking-wide text-[#5C4A30] mb-1">
                    {p.date}
                  </span>
                  <span className="font-raleway text-[16px] text-[#1A0F00] group-hover:text-[#ff8905] transition-colors">
                    {p.title}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="font-raleway text-[14px] text-[#5C4A30] leading-relaxed mt-8 max-w-[680px]">
          For official Bursa Malaysia filings, visit our{" "}
          <Link
            href="/investor-relations/announcements"
            className="text-[#ff8905] font-semibold hover:underline"
          >
            Investor Relations announcements
          </Link>
          . Media enquiries may be directed to{" "}
          <a
            href="mailto:salescss@uli.com.my"
            className="text-[#ff8905] font-semibold hover:underline"
          >
            salescss@uli.com.my
          </a>
          .
        </p>
      </section>
    </>
  );
}
