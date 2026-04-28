function PhoneIcon() {
  return (
    <svg className="w-4 h-4 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.58.57 1 1 0 011 1V21a1 1 0 01-1 1C9.61 22 2 14.39 2 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.58a1 1 0 01-.24 1.01l-2.21 2.2z" />
    </svg>
  );
}

function FaxIcon() {
  return (
    <svg className="w-4 h-4 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 8H5a3 3 0 00-3 3v6h4v4h12v-4h4v-6a3 3 0 00-3-3zm-3 11H8v-5h8v5zm3-7a1 1 0 110-2 1 1 0 010 2zm-1-9H6v4h12V3z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg className="w-4 h-4 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  );
}

export default function ContactInfo() {
  return (
    <section>
      {/* Double line top */}
      <div className="site-container">
        <img src="/images/single-line.png" alt="" aria-hidden="true" className="w-full block" />
      </div>

      <div className="site-container">
        <div className="grid grid-cols-[40px_1fr_40px] lg:grid-cols-[80px_1fr_80px] items-center py-10">
          <div />
          <h1 className="font-typewriter uppercase text-center text-[clamp(2rem,4.5vw,5rem)] leading-[1.0] text-[#1A0F00] tracking-tight px-4">
            Contact Info
          </h1>
          <div />
        </div>
      </div>

      {/* Double line bottom */}
      <div className="site-container">
        <img src="/images/double-line.png" alt="" aria-hidden="true" className="w-full block" />
      </div>

      {/* Info grid — Col 1 + [header spanning Col 2+3 with sub-cols below] */}
      <div className="site-container py-8 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 lg:gap-16">

          {/* Col 1 — Address + Phones */}
          <div>
            <p className="font-raleway font-bold text-[20px] text-[#1A0F00] mb-3">
              United U-LI Corporation Berhad
            </p>
            <p className="font-raleway text-[14px] text-[#5C4A30] leading-relaxed mb-5">
              Lot.7 (P.T.3475), Jalan 6/1, Kawasan Perusahaan Seri Kembangan,
              43300 Seri Kembangan, Selangor Darul Ehsan, Malaysia
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 font-raleway text-[14px] text-[#1A0F00]">
                <PhoneIcon />
                <span>603-5870 3300</span>
              </li>
              <li className="flex items-start gap-2 font-raleway text-[14px] text-[#1A0F00]">
                <FaxIcon />
                <span>603-5870 3310</span>
              </li>
              <li className="flex items-start gap-2 font-raleway text-[14px] text-[#1A0F00]">
                <EmailIcon />
                <a href="mailto:salescss@uli.com.my" className="hover:text-[#ff8905] transition-colors">
                  salescss@uli.com.my
                </a>
              </li>
            </ul>
          </div>

          {/* Col 2+3 — shared header, then two sub-columns of content */}
          <div>
            <p className="font-raleway font-bold text-[20px] text-[#1A0F00] mb-6">
              Other Dedicated Email Addresses
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Sub-col A — General Enquiries + Sales */}
              <div className="space-y-5">
                <div>
                  <p className="font-raleway font-bold text-[14px] text-[#1A0F00] mb-1">
                    General Equiries
                  </p>
                  <a href="mailto:info@uli.com.my" className="font-raleway text-[14px] text-[#ff8905] hover:underline transition-colors">
                    info@uli.com.my
                  </a>
                </div>

                <div>
                  <p className="font-raleway font-bold text-[14px] text-[#1A0F00] mb-2">
                    General Equiries
                  </p>
                  <ul className="space-y-1">
                    {[
                      ["Cable Support Systems", "salescss@uli.com.my"],
                      ["Building Materials", "salesm@uli.com.my"],
                      ["Goodlite", "salesgl@uli.com.my"],
                      ["OPPLE", "info@uliopple.com.my"],
                    ].map(([label, email]) => (
                      <li key={email} className="font-raleway text-[14px] text-[#1A0F00]">
                        {label} &ndash;{" "}
                        <a href={`mailto:${email}`} className="text-[#ff8905] hover:underline transition-colors">
                          {email}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Sub-col B — Supplies / HR / Investor Relations */}
              <div className="space-y-5">
                <div>
                  <p className="font-raleway font-bold text-[14px] text-[#1A0F00] mb-1">Supplies</p>
                  <p className="font-raleway text-[14px] text-[#1A0F00]">
                    Purchasing &ndash;{" "}
                    <a href="mailto:procurement@uli.com.my" className="text-[#ff8905] hover:underline transition-colors">
                      procurement@uli.com.my
                    </a>
                  </p>
                </div>
                <div>
                  <p className="font-raleway font-bold text-[14px] text-[#1A0F00] mb-1">Human Resources</p>
                  <p className="font-raleway text-[14px] text-[#1A0F00]">
                    Human Resources &ndash;{" "}
                    <a href="mailto:hr@uli.com.my" className="text-[#ff8905] hover:underline transition-colors">
                      hr@uli.com.my
                    </a>
                  </p>
                </div>
                <div>
                  <p className="font-raleway font-bold text-[14px] text-[#1A0F00] mb-1">Investor Relations</p>
                  <p className="font-raleway text-[14px] text-[#1A0F00]">
                    Investor Relations &ndash;{" "}
                    <a href="mailto:investor@uli.com.my" className="text-[#ff8905] hover:underline transition-colors">
                      investor@uli.com.my
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Single-line divider */}
      <div className="site-container">
        <img src="/images/single-line.png" alt="" aria-hidden="true" className="w-full block" />
      </div>
    </section>
  );
}
