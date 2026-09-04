import { Mail, Phone, Printer } from "lucide-react";

const SALES: [string, string][] = [
  ["Cable Support Systems", "salescss@uli.com.my"],
  ["Building Materials", "salesm@uli.com.my"],
  ["Goodlite", "salesgl@uli.com.my"],
  ["OPPLE", "info@uliopple.com.my"],
];

const DEPARTMENTS: [string, string][] = [
  ["Purchasing", "procurement@uli.com.my"],
  ["Human Resources", "hr@uli.com.my"],
  ["Investor Relations", "investor@uli.com.my"],
];

function EmailLink({ email }: { email: string }) {
  return (
    <a href={`mailto:${email}`} className="font-raleway text-[14px] text-[#ff8905] hover:underline transition-colors break-all">
      {email}
    </a>
  );
}

export default function ContactInfo() {
  return (
    <section className="site-container py-12 lg:py-16">
      {/* Same eyebrow + heading treatment as the sections above */}
      <div className="mb-8 lg:mb-10">
        <p className="font-raleway text-[11px] font-bold tracking-[0.2em] uppercase text-[#ff8905] mb-3">
          Contact Info
        </p>
        <h2 className="font-typewriter uppercase text-[clamp(1.6rem,2.8vw,2.4rem)] leading-tight text-[#1A0F00] tracking-tight">
          Head office and department contacts.
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,380px)_1fr] gap-10 lg:gap-16">
        {/* Head office */}
        <div>
          <p className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00] mb-3">Head Office</p>
          <p className="font-raleway font-bold text-[16px] text-[#1A0F00] mb-2">United U-LI Corporation Berhad</p>
          <p className="font-raleway text-[14px] text-[#5C4A30] leading-relaxed mb-5">
            Lot.7 (P.T.3475), Jalan 6/1, Kawasan Perusahaan Seri Kembangan,
            43300 Seri Kembangan, Selangor Darul Ehsan, Malaysia
          </p>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-lg bg-[#ff8905]/10 flex items-center justify-center shrink-0"><Phone size={16} className="text-[#ff8905]" /></span>
              <a href="tel:+60358703300" className="font-raleway text-[14px] text-[#1A0F00] hover:text-[#ff8905] transition-colors">603-5870 3300</a>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-lg bg-[#ff8905]/10 flex items-center justify-center shrink-0"><Printer size={16} className="text-[#ff8905]" /></span>
              <span className="font-raleway text-[14px] text-[#1A0F00]">603-5870 3310 <span className="text-[#5C4A30]">(fax)</span></span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-lg bg-[#ff8905]/10 flex items-center justify-center shrink-0"><Mail size={16} className="text-[#ff8905]" /></span>
              <a href="mailto:hello@uli.com.my" className="font-raleway text-[14px] text-[#1A0F00] hover:text-[#ff8905] transition-colors">hello@uli.com.my</a>
            </li>
          </ul>
        </div>

        {/* Department directory */}
        <div>
          <p className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00] mb-3">Department Emails</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <p className="font-raleway font-bold text-[14px] text-[#1A0F00] mb-2">Sales</p>
              <ul className="space-y-2">
                {SALES.map(([label, email]) => (
                  <li key={email} className="font-raleway text-[14px] text-[#1A0F00] leading-snug">
                    <span className="block text-[#5C4A30]">{label}</span>
                    <EmailLink email={email} />
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-raleway font-bold text-[14px] text-[#1A0F00] mb-2">Corporate</p>
              <ul className="space-y-2">
                {DEPARTMENTS.map(([label, email]) => (
                  <li key={email} className="font-raleway text-[14px] text-[#1A0F00] leading-snug">
                    <span className="block text-[#5C4A30]">{label}</span>
                    <EmailLink email={email} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
