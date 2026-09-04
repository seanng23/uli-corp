import RevealRule from "@/components/motion/RevealRule";

type Variant = "default" | "thick" | "double" | "thin";

const LINE_SRC: Record<string, string> = {
  thick: "/images/lines/line-thick.png",
  double: "/images/lines/line-double.png",
  thin: "/images/lines/line-thin.png",
};

/** Section rule. Pass `animate` for the soft fade-in (homepage); static everywhere else. */
export default function Divider({ variant = "default", animate = false }: { variant?: Variant; animate?: boolean }) {
  return (
    <div className="site-container">
      {variant === "default" ? (
        <RevealRule className="border-t-[4px] border-[#1A0F00]" animate={animate} />
      ) : (
        <RevealRule src={LINE_SRC[variant]} className="block w-full h-auto" animate={animate} />
      )}
    </div>
  );
}
