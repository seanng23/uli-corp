import Image from "next/image";

/** U-LI™ trademark badge pinned to the top-left of every product's main image, same inset on every page. */
export default function ProductBadge() {
  return (
    <div className="pointer-events-none absolute top-3 left-3 lg:top-5 lg:left-5 z-[5] rounded-lg lg:rounded-xl bg-white px-2.5 py-2 lg:px-4 lg:py-3 shadow-[0_2px_10px_rgba(26,15,0,0.12)] ring-1 ring-[#1A0F00]/5">
      <Image
        src="/images/brand/uli-tm.png"
        alt="U-LI trademark"
        width={640}
        height={230}
        className="block w-[60px] lg:w-[104px] h-auto"
      />
    </div>
  );
}
