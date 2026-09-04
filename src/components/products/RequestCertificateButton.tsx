"use client";

import Link from "next/link";
import { Award } from "lucide-react";

/** Deep link into the contact form with the certificate request pre-ticked for this product. */
export function certificateRequestHref(product: string): string {
  return `/contact-us?certificate=${encodeURIComponent(product)}#contact-form`;
}

/**
 * Product certificates are no longer shown on the page. The sales team issues them on request,
 * so this block sends the visitor to the contact form with the request already ticked.
 */
export default function RequestCertificateButton({ product, className = "" }: { product: string; className?: string }) {
  return (
    <div className={className}>
      <p className="flex items-center gap-2.5 font-raleway text-[12px] font-semibold uppercase tracking-wide text-[#1A0F00] mb-3">
        <Award size={14} strokeWidth={2} className="text-[#ff8905]" />
        Certificate
      </p>
      <Link href={certificateRequestHref(product)} className="btn-outline justify-center text-center w-full max-w-[280px]">
        <Award size={15} strokeWidth={2} /> Request Certificate
      </Link>
      <p className="font-raleway text-[11px] text-[#5C4A30] leading-snug mt-2 max-w-[280px]">
        Product certificates are sent by our sales team on request.
      </p>
    </div>
  );
}
