import Image from "next/image";
import Link from "next/link";

const productLinks = [
  "Cable Support Systems",
  "Metal Framing Systems",
  "Floor Trunking Systems",
  "Wire Mesh Tray Systems",
  "Conduits Pipe & Accessories",
  "Custom Made",
  "Lighting Systems",
];

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Group Structure", href: "/about#group-structure" },
  { label: "Corporate Information", href: "/about#corporate-info" },
  { label: "Corporate Governance", href: "/about#governance" },
];

const investorLinks = [
  { label: "Announcements", href: "/investor-relations" },
  { label: "General Meetings", href: "/investor-relations#meetings" },
];

export default function Footer() {
  return (
    <footer className="bg-[#F5EDD6] border-t-0 mt-0">
      {/* Double line divider */}
      <div className="site-container">
        <img src="/images/double-line.png" alt="" className="w-full h-auto block" aria-hidden="true" />
      </div>

      <div className="site-container py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Logo + address */}
          <div className="lg:col-span-2">
            <Image src="/images/cropped-logo.png" alt="United U-Li Corporation Berhad" width={72} height={72} className="mb-5" />
            <p className="font-typewriter text-[13px] font-bold tracking-widest uppercase text-[#1A0F00] mb-3">
              United U-Li<br />Corporation Berhad
            </p>
            <p className="text-xs text-[#5C4A30] leading-relaxed mb-4">
              Lot 7 (P.T.3475), Jalan 6/1,<br />
              Kawasan Perusahaan Seri Kembangan,<br />
              43300 Seri Kembangan,<br />
              Selangor Darul Ehsan, Malaysia
            </p>
            <div className="space-y-1 text-xs text-[#5C4A30]">
              <p>📞 603-5870 3300</p>
              <p>📠 603-5870 3310</p>
              <p>✉ <a href="mailto:salescss@uli.com.my" className="hover:text-[#ff8905] transition-colors">salescss@uli.com.my</a></p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-raleway text-[11px] font-bold tracking-widest uppercase text-[#1A0F00] mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-xs text-[#5C4A30] hover:text-[#ff8905] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-raleway text-[11px] font-bold tracking-widest uppercase text-[#1A0F00] mb-4">Products</h4>
            <ul className="space-y-2">
              {productLinks.map((l) => (
                <li key={l}>
                  <Link href="/products" className="text-xs text-[#5C4A30] hover:text-[#ff8905] transition-colors">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects & Media */}
          <div>
            <h4 className="font-raleway text-[11px] font-bold tracking-widest uppercase text-[#1A0F00] mb-4">Projects</h4>
            <ul className="space-y-2 mb-6">
              <li><Link href="/projects" className="text-xs text-[#5C4A30] hover:text-[#ff8905] transition-colors">Local</Link></li>
              <li><Link href="/projects#international" className="text-xs text-[#5C4A30] hover:text-[#ff8905] transition-colors">International</Link></li>
            </ul>
            <h4 className="font-raleway text-[11px] font-bold tracking-widest uppercase text-[#1A0F00] mb-4">Investor Relations</h4>
            <ul className="space-y-2">
              {investorLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-xs text-[#5C4A30] hover:text-[#ff8905] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Technology & Contact */}
          <div>
            <h4 className="font-raleway text-[11px] font-bold tracking-widest uppercase text-[#1A0F00] mb-4">Technology</h4>
            <ul className="space-y-2 mb-6">
              <li><Link href="/technology" className="text-xs text-[#5C4A30] hover:text-[#ff8905] transition-colors">Manufacturing Facilities</Link></li>
              <li><Link href="/technology#innovation" className="text-xs text-[#5C4A30] hover:text-[#ff8905] transition-colors">Technology & Innovation</Link></li>
              <li><Link href="/technology#quality" className="text-xs text-[#5C4A30] hover:text-[#ff8905] transition-colors">Quality Assurance</Link></li>
            </ul>
            <h4 className="font-raleway text-[11px] font-bold tracking-widest uppercase text-[#1A0F00] mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li><Link href="/contact" className="text-xs text-[#5C4A30] hover:text-[#ff8905] transition-colors">Our Location</Link></li>
              <li><Link href="/enquiry" className="text-xs text-[#5C4A30] hover:text-[#ff8905] transition-colors">Enquiry Form</Link></li>
              <li><Link href="/careers" className="text-xs text-[#5C4A30] hover:text-[#ff8905] transition-colors">Careers</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[#1A0F00]/15">
          <p className="text-center text-[11px] text-[#5C4A30] tracking-wide uppercase">
            Copyright © 2024 United U-Li Corporation Berhad. | Registration No. 200001008131 (510737-H) |. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
