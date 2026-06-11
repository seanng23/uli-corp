import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Company Announcements",
  description:
    "Official Bursa Malaysia announcements from United U-Li Corporation Berhad (stock code 7133).",
  alternates: { canonical: "/investor-relations/announcements" },
};

const BURSA_SRC =
  "https://www.bursamalaysia.com/market/listed-companies/company-announcements/subscribe/7133/option1";

export default function AnnouncementsPage() {
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
          Company Announcements
        </h1>
        <p className="font-raleway text-[15px] text-[#5C4A30] leading-relaxed max-w-[640px]">
          Official announcements released by United U-Li Corporation Berhad (stock code 7133) on
          Bursa Malaysia. The list below updates live from Bursa Malaysia — use the filters to
          search, and click any title to read the full announcement.
        </p>
      </section>

      {/* Divider */}
      <div className="site-container">
        <img src="/images/double-line.png" alt="" aria-hidden="true" className="w-full block" />
      </div>

      {/* Bursa Malaysia announcements widget */}
      <section className="site-container py-8 lg:py-10">
        <div className="mx-auto max-w-[1040px]">
          <div className="relative w-full overflow-hidden">
            <iframe
              src={BURSA_SRC}
              title="United U-Li Corporation Berhad — Bursa Malaysia Company Announcements"
              className="w-full block"
              style={{ height: "1150px", border: "0" }}
              loading="lazy"
            />
          </div>
          <p className="font-raleway text-[12px] text-[#5C4A30] mt-4">
            Source: Bursa Malaysia. If the panel above does not load, view announcements directly on{" "}
            <a
              href={BURSA_SRC}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ff8905] hover:text-[#cc6e00] underline underline-offset-2"
            >
              Bursa Malaysia
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
