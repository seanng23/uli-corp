/** Note requested by U-LI (Nov 2026) for every product page, shown under the product images. */
export default function ImageDisclaimer({ className = "" }: { className?: string }) {
  return (
    <p className={`font-raleway text-[11px] italic text-[#5C4A30] leading-relaxed ${className}`}>
      All images are for illustration purposes only. Actual finishes shall be subject to the selected specifications.
    </p>
  );
}
