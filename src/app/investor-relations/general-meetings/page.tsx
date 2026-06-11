import type { Metadata } from "next";
import { FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "General Meetings",
  description:
    "Annual General Meeting (AGM) minutes for United U-Li Corporation Berhad.",
  alternates: { canonical: "/investor-relations/general-meetings" },
};

const minutes = [
  { year: 2025, label: "Minutes of the 25th AGM", href: "/documents/agm/agm-minutes-2025.pdf" },
  { year: 2024, label: "Minutes of the 24th AGM", href: "/documents/agm/agm-minutes-2024.pdf" },
  { year: 2023, label: "Minutes of the 23rd AGM", href: "/documents/agm/agm-minutes-2023.pdf" },
  { year: 2022, label: "Minutes of the 22nd AGM", href: "/documents/agm/agm-minutes-2022.pdf" },
  { year: 2021, label: "Minutes of the 21st AGM", href: "/documents/agm/agm-minutes-2021.pdf" },
];

export default function GeneralMeetingsPage() {
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
          General Meetings
        </h1>
        <p className="font-raleway text-[15px] text-[#5C4A30] leading-relaxed max-w-[640px]">
          Minutes of the Annual General Meetings of United U-Li Corporation Berhad. Select a year to
          download the minutes (PDF).
        </p>
      </section>

      {/* Divider */}
      <div className="site-container">
        <img src="/images/double-line.png" alt="" aria-hidden="true" className="w-full block" />
      </div>

      {/* AGM minutes list */}
      <section className="site-container py-8 lg:py-12">
        <ul className="max-w-[700px] border-t border-[#1A0F00]/15">
          {minutes.map((m) => (
            <li key={m.year} className="border-b border-[#1A0F00]/15">
              <a
                href={m.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-4 py-5 group"
              >
                <span className="flex items-center gap-3 min-w-0">
                  <FileText size={18} strokeWidth={1.8} className="text-[#ff8905] shrink-0" />
                  <span className="font-raleway text-[16px] text-[#1A0F00] group-hover:text-[#ff8905] transition-colors">
                    {m.label} <span className="text-[#5C4A30]">({m.year})</span>
                  </span>
                </span>
                <span className="font-raleway text-[12px] font-semibold uppercase tracking-wide text-[#ff8905] whitespace-nowrap">
                  Download »
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
