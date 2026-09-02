"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp, FileText } from "lucide-react";

/**
 * Mobile-only Data Sheet row and collapsible Certificate section, rendered under the
 * product's collapsible sections. On desktop the documents stay in the configurator column.
 */
export default function MobileDocuments({ onEnlargeCertificate }: { onEnlargeCertificate: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="lg:hidden">
      <div className="border-t border-[#1A0F00]/20">
        <button type="button" className="flex items-center gap-2.5 w-full py-4 font-raleway text-[13px] font-bold uppercase tracking-widest text-[#1A0F00]">
          <FileText size={16} strokeWidth={2} />
          Data Sheet
        </button>
      </div>
      <div id="certificate" className="border-t border-[#1A0F00]/20 scroll-mt-24">
        <button type="button" onClick={() => setOpen((value) => !value)} className="flex items-center justify-between w-full py-4 text-left">
          <span className="font-raleway text-[13px] font-bold uppercase tracking-widest text-[#1A0F00]">Certificate</span>
          {open ? <ChevronUp size={16} strokeWidth={2.5} className="text-[#1A0F00] flex-shrink-0" /> : <ChevronDown size={16} strokeWidth={2.5} className="text-[#1A0F00] flex-shrink-0" />}
        </button>
        {open && (
          <div className="pb-6">
            <button type="button" onClick={onEnlargeCertificate} aria-label="Enlarge certificate" className="relative block w-full max-w-[280px] border border-[#1A0F00]/20 rounded-md overflow-hidden">
              <Image src="/images/product-certificate.png" alt="U-LI Product Certificate" width={400} height={550} className="w-full h-auto" />
            </button>
            <p className="font-raleway text-[11px] text-[#5C4A30] mt-2">Tap the certificate to enlarge.</p>
          </div>
        )}
      </div>
    </div>
  );
}
