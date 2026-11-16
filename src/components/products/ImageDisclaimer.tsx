import { Info } from "lucide-react";

/** Note requested by U-LI (Nov 2026) for every product page, shown under the product images. */
export default function ImageDisclaimer({ className = "" }: { className?: string }) {
  return (
    <p className={`flex items-start gap-2 font-raleway text-[13px] font-medium text-[#1A0F00] leading-snug ${className}`}>
      <Info size={16} strokeWidth={2.25} className="mt-[1px] shrink-0 text-[#ff8905]" aria-hidden="true" />
      <span>All images are for illustration purposes only. Actual finishes shall be subject to the selected specifications.</span>
    </p>
  );
}
