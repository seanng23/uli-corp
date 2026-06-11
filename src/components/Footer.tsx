import Image from "next/image";
import Link from "next/link";
import { Phone, Printer, Mail } from "lucide-react";

type Col = { title: string; href: string; links?: { label: string; href: string; external?: boolean }[] };

const columns: Col[] = [
  { title: "Home", href: "/" },
  {
    title: "About Us",
    href: "/about",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Group Structure", href: "/about#group-structure" },
      { label: "Corporate Information", href: "/about#corporate-info" },
      { label: "Corporate Governance", href: "/about#governance" },
    ],
  },
  {
    title: "Products",
    href: "/products",
    links: [
      { label: "Cable Support Systems", href: "/products" },
      { label: "Metal Framing Systems", href: "/products" },
      { label: "Floor Trunking Systems", href: "/products" },
      { label: "Wire Mesh Tray Systems", href: "/products" },
      { label: "Conduits Pipe & Accessories", href: "/products" },
      { label: "Custom Made", href: "/products" },
      { label: "Lighting Systems", href: "https://www.opple.com/en", external: true },
    ],
  },
  {
    title: "Projects",
    href: "/projects",
    links: [
      { label: "Local", href: "/projects" },
      { label: "International", href: "/projects#international" },
    ],
  },
  {
    title: "Technology",
    href: "/technology",
    links: [
      { label: "Manufacturing Facilities", href: "/technology" },
      { label: "Technology & Innovation", href: "/technology#innovation" },
      { label: "Quality Assurance", href: "/quality-assurance" },
    ],
  },
  {
    title: "Investor Relations",
    href: "/investor-relations/announcements",
    links: [
      { label: "Announcements", href: "/investor-relations/announcements" },
      { label: "General Meetings", href: "/investor-relations/general-meetings" },
    ],
  },
  { title: "Media Centre", href: "/media" },
  { title: "Sustainability", href: "/sustainability" },
  {
    title: "Contact Us",
    href: "/contact-us",
    links: [
      { label: "Our Location", href: "/contact-us" },
      { label: "Enquiry Form", href: "/enquiry" },
      { label: "Careers", href: "/careers" },
    ],
  },
];

export default function Footer() {
  return (
    <footer>
      {/* Double-line divider */}
      <div className="site-container">
        <img src="/images/lines/line-thick.png" alt="" className="w-full h-auto block" aria-hidden="true" />
      </div>

      <div className="site-container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 lg:gap-12">
          {/* Left: logo + company info */}
          <div>
            <Image src="/images/cropped-logo.png" alt="United U-Li Corporation Berhad" width={84} height={84} className="mb-4" />
            <p className="font-typewriter text-[13px] font-bold tracking-wide uppercase text-[#1A0F00] mb-3 leading-snug">
              United <span className="text-[#ff8905]">U-LI</span>
              <br />Corporation Berhad
            </p>
            <p className="text-[12px] text-[#5C4A30] leading-relaxed mb-4">
              Lot.7 (P.T.3475), Jalan 6/1,<br />
              Kawasan Perusahaan Seri Kembangan,<br />
              43300 Seri Kembangan,<br />
              Selangor Darul Ehsan, Malaysia
            </p>
            <div className="space-y-2 text-[12px] text-[#5C4A30]">
              <p className="flex items-center gap-2"><Phone size={13} className="text-[#ff8905] shrink-0" /> 603-5870 3300</p>
              <p className="flex items-center gap-2"><Printer size={13} className="text-[#ff8905] shrink-0" /> 603-5870 3310</p>
              <p className="flex items-center gap-2">
                <Mail size={13} className="text-[#ff8905] shrink-0" />
                <a href="mailto:salescss@uli.com.my" className="hover:text-[#ff8905] transition-colors">salescss@uli.com.my</a>
              </p>
            </div>
          </div>

          {/* Right: nav columns — top row of 5, bottom row of 4 (5-col grid, auto-flow) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-6">
            {columns.map((col) => (
              <div key={col.title}>
                <Link
                  href={col.href}
                  className="block font-raleway text-[11px] font-bold tracking-widest uppercase text-[#1A0F00] hover:text-[#ff8905] transition-colors mb-2"
                >
                  {col.title}
                </Link>
                {col.links && (
                  <ul className="space-y-1">
                    {col.links.map((l) => (
                      <li key={l.label}>
                        {l.external ? (
                          <a
                            href={l.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[12px] text-[#5C4A30] hover:text-[#ff8905] transition-colors leading-snug"
                          >
                            {l.label}
                          </a>
                        ) : (
                          <Link href={l.href} className="text-[12px] text-[#5C4A30] hover:text-[#ff8905] transition-colors leading-snug">
                            {l.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-4 border-t border-[#1A0F00]/15">
          <p className="text-center text-[11px] text-[#5C4A30] tracking-wide">
            Copyright © 2026 United <span className="text-[#ff8905]">U-LI</span> Corporation Berhad. | Registration No. 200001008131 (510737-H) | All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
