// Small line-art icon shown beside a product page title.
// Drawn to match the Cable Trunking icon (141x81, oblique view).
const ICONS = {
  "cable-tray": "cable-tray",
  "cable-ladder": "cable-ladder",
  "wire-mesh-tray": "wire-mesh-tray",
  "steel-conduit": "steel-conduit",
  "metal-framing": "metal-framing",
  "underfloor-trunking-systems": "underfloor",
  "raisedfloor-trunking-systems": "raisedfloor",
  "flushfloor-trunking-systems": "flushfloor",
} as const;

export default function TitleIcon({ name }: { name: string }) {
  const file = ICONS[name as keyof typeof ICONS];
  if (!file) return null;
  return (
    <img
      src={`/images/products/title-icons/${file}.png`}
      alt=""
      aria-hidden="true"
      width={141}
      height={81}
      className="inline-block w-[56px] h-auto ml-3 align-middle -translate-y-[2px]"
    />
  );
}
