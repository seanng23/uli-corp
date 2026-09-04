"use client";

import Link from "next/link";
import { Award, ChevronRight, FileText } from "lucide-react";
import { certificateRequestHref } from "./RequestCertificateButton";

/**
 * Mobile-only Data Sheet row and Request Certificate row, rendered under the product's
 * collapsible sections. On desktop the documents stay in the configurator column.
 */
export default function MobileDocuments({ product }: { product: string }) {
  const rowCls = "flex items-center gap-2.5 w-full py-4 font-raleway text-[13px] font-bold uppercase tracking-widest text-[#1A0F00]";
  return (
    <div className="lg:hidden">
      <div className="border-t border-[#1A0F00]/20">
        <button type="button" className={rowCls}>
          <FileText size={16} strokeWidth={2} />
          Data Sheet
        </button>
      </div>
      <div id="certificate" className="border-t border-[#1A0F00]/20 scroll-mt-24">
        <Link href={certificateRequestHref(product)} className={`${rowCls} justify-between`}>
          <span className="flex items-center gap-2.5"><Award size={16} strokeWidth={2} className="text-[#ff8905]" />Request Certificate</span>
          <ChevronRight size={16} strokeWidth={2.5} className="flex-shrink-0" />
        </Link>
        <p className="font-raleway text-[11px] text-[#5C4A30] leading-snug -mt-1 pb-4">Product certificates are sent by our sales team on request.</p>
      </div>
    </div>
  );
}
