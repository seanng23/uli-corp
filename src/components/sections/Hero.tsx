import SanityMedia from "@/components/SanityMedia";
import Typewriter from "@/components/motion/Typewriter";
import RevealImage from "@/components/motion/RevealImage";
import type { HeroMedia } from "@/sanity/lib/queries";

export default function Hero({ media }: { media?: HeroMedia | null }) {
  return (
    <section>
      {/* Single-line below nav */}
      <div className="site-container">
        <img src="/images/single-line.png" alt="" aria-hidden="true" className="w-full block" />
      </div>

      {/* Title band */}
      <div className="site-container">
        <div className="grid grid-cols-[40px_1fr_40px] lg:grid-cols-[80px_1fr_80px] items-center py-10">
          <div className="text-right">
            <p className="font-typewriter text-sm text-[#1A0F00]">Est.</p>
            <p className="font-typewriter text-sm text-[#1A0F00]">1978</p>
          </div>
          <h1 className="font-typewriter uppercase text-center text-[clamp(2rem,4.5vw,5rem)] leading-[1.0] text-[#1A0F00] tracking-tight px-4">
            <Typewriter text="Engineering Tomorrow's Infrastructure" speed={0.045} />
          </h1>
          <div className="text-left">
            <p className="font-typewriter text-sm text-[#1A0F00]">Inc.</p>
            <p className="font-typewriter text-sm text-[#1A0F00]">1983</p>
          </div>
        </div>
      </div>

      {/* Double-line below title */}
      <div className="site-container">
        <img src="/images/double-line.png" alt="" aria-hidden="true" className="w-full block" />
      </div>

      {/* Hero photo / video */}
      <div className="site-container pt-4">
        <RevealImage duration={1.5}>
          <SanityMedia
            videoUrl={media?.videoUrl}
            videoThumbnailUrl={media?.videoThumbnailUrl}
            imageUrl={media?.imageUrl}
            fallbackSrc="/images/homepage/mask-group-31.jpg"
            alt="U-Li steel manufacturing"
            width={2038}
            height={744}
            priority
            className="w-full h-auto block"
            sizes="(max-width: 1400px) 100vw, 1400px"
          />
        </RevealImage>
      </div>
    </section>
  );
}
