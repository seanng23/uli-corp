type Variant = "default" | "thick" | "double" | "thin";

const LINE_SRC: Record<string, string> = {
  thick: "/images/lines/line-thick.png",
  double: "/images/lines/line-double.png",
  thin: "/images/lines/line-thin.png",
};

export default function Divider({ variant = "default" }: { variant?: Variant }) {
  return (
    <div className="site-container">
      {variant === "default" ? (
        <div className="border-t-[4px] border-[#1A0F00]" />
      ) : (
        <img
          src={LINE_SRC[variant]}
          alt=""
          aria-hidden="true"
          className="block w-full h-auto"
        />
      )}
    </div>
  );
}
