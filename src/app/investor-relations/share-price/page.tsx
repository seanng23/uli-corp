import type { Metadata } from "next";
import Link from "next/link";
import SharePriceChart from "@/components/SharePriceChart";

export const metadata: Metadata = {
  title: "Share Price",
  description:
    "Live share price and stock information for United U-LI Corporation Berhad (Bursa Malaysia, stock code 7133 / MYX:ULICORP).",
  alternates: { canonical: "/investor-relations/share-price" },
};

const BURSA_PROFILE =
  "https://www.bursamalaysia.com/trade/trading_resources/listing_directory/company-profile?stock_code=7133";

const facts = [
  { label: "Market", value: "Main Market" },
  { label: "Sector", value: "Industrial Products & Services" },
  { label: "Stock Code", value: "7133" },
  { label: "Status", value: "Shariah-compliant" },
];

const links = [
  { label: "View Full Profile on Bursa Malaysia", href: BURSA_PROFILE, external: true, primary: true },
  { label: "Company Announcements", href: "/investor-relations/announcements", external: false },
  { label: "General Meeting Minutes", href: "/investor-relations/general-meetings", external: false },
];

export default function SharePricePage() {
  return (
    <>
      {/* Top line */}
      <div className="site-container">
        <img src="/images/single-line.png" alt="" aria-hidden="true" className="w-full block" />
      </div>

      {/* Header */}
      <section className="site-container py-8 lg:py-10">
        <p className="font-raleway text-[11px] font-bold tracking-[0.2em] uppercase text-[#ff8905] mb-3">
          Investor Relations
        </p>
        <h1 className="font-typewriter text-[clamp(1.6rem,2.5vw,2.5rem)] leading-tight text-[#1A0F00] mb-4">
          Share Price
        </h1>
        <p className="font-raleway text-[15px] text-[#5C4A30] leading-relaxed max-w-[680px]">
          United U-LI Corporation Berhad is listed on the Main Market of Bursa Malaysia under stock
          code 7133 (MYX:ULICORP). The chart below reflects live market activity. For official filings
          and company information, refer to our profile on Bursa Malaysia.
        </p>
      </section>

      {/* Divider */}
      <div className="site-container">
        <img src="/images/double-line.png" alt="" aria-hidden="true" className="w-full block" />
      </div>

      {/* Stock info + chart */}
      <section className="site-container py-8 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 lg:gap-8 items-stretch">
          {/* Company panel */}
          <div className="border border-[#1A0F00]/15 bg-white/40 p-6 flex flex-col">
            <p className="font-typewriter text-[18px] leading-tight text-[#1A0F00] mb-1">
              United U-LI
            </p>
            <p className="font-typewriter text-[14px] leading-tight text-[#5C4A30] mb-5">
              Corporation Berhad
            </p>

            <dl className="space-y-3 mb-6">
              {facts.map((f) => (
                <div key={f.label} className="border-t border-[#1A0F00]/12 pt-2">
                  <dt className="font-raleway text-[10px] font-bold uppercase tracking-[0.15em] text-[#ff8905] mb-0.5">
                    {f.label}
                  </dt>
                  <dd className="font-raleway text-[14px] text-[#1A0F00]">{f.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-auto space-y-2.5">
              {links.map((l) =>
                l.external ? (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block text-center font-raleway text-[12px] font-semibold px-4 py-2.5 rounded-md transition-colors ${
                      l.primary
                        ? "bg-[#ff8905] text-white hover:bg-[#cc6e00]"
                        : "border border-[#1A0F00]/30 text-[#1A0F00] hover:border-[#ff8905] hover:text-[#ff8905]"
                    }`}
                  >
                    {l.label} ↗
                  </a>
                ) : (
                  <Link
                    key={l.label}
                    href={l.href}
                    className="block text-center font-raleway text-[12px] font-semibold px-4 py-2.5 rounded-md border border-[#1A0F00]/30 text-[#1A0F00] hover:border-[#ff8905] hover:text-[#ff8905] transition-colors"
                  >
                    {l.label}
                  </Link>
                )
              )}
            </div>
          </div>

          {/* Live chart */}
          <div className="border border-[#1A0F00]/15 bg-white/40 p-4 lg:p-5">
            <SharePriceChart />
          </div>
        </div>

        <p className="font-raleway text-[12px] text-[#5C4A30] mt-4">
          Market data is sourced from public market data feeds and may be delayed. For official
          share price and company information, refer to{" "}
          <a
            href={BURSA_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#ff8905] hover:text-[#cc6e00] underline underline-offset-2"
          >
            Bursa Malaysia
          </a>
          .
        </p>
      </section>
    </>
  );
}
