import RevealRule from "@/components/motion/RevealRule";
import Typewriter from "@/components/motion/Typewriter";
import { PROJECT_LIST_STATS } from "@/data/project-list";

export default function ProjectsHero() {
  return (
    <section>
      <div className="site-container">
        <RevealRule src="/images/single-line.png" className="w-full block" />
      </div>

      <div className="site-container">
        <div className="grid grid-cols-[40px_1fr_40px] lg:grid-cols-[80px_1fr_80px] items-center py-10">
          <div />
          <h1 className="font-typewriter uppercase text-center text-[clamp(2rem,4.5vw,5rem)] leading-[1.0] text-[#1A0F00] tracking-tight px-4">
            <Typewriter text="Our Projects" startDelay={0.35} />
          </h1>
          <div />
          <p className="col-start-2 text-center font-raleway text-[15px] lg:text-[17px] text-[#5C4A30] leading-relaxed mt-4 px-4">
            <strong className="font-bold text-[#1A0F00]">{PROJECT_LIST_STATS.totalRounded.toLocaleString("en-US")}+ projects</strong> across{" "}
            <strong className="font-bold text-[#1A0F00]">{PROJECT_LIST_STATS.countriesRounded}+ countries</strong> since {PROJECT_LIST_STATS.sinceYear}.{" "}
            <a href="#full-project-list" className="whitespace-nowrap font-semibold text-[#cc6e00] underline underline-offset-2 hover:text-[#ff8905] transition-colors">See the full list</a>
          </p>
        </div>
      </div>

      <div className="site-container">
        <RevealRule src="/images/double-line.png" className="w-full block" delay={0.45} />
      </div>
    </section>
  );
}
