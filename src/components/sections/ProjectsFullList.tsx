import { Plus } from "lucide-react";
import RevealRule from "@/components/motion/RevealRule";
import { PROJECT_LIST, PROJECT_LIST_STATS } from "@/data/project-list";

/** Plain text reference list under the photo gallery. Server rendered, names are not links. */
export default function ProjectsFullList() {
  return (
    <section id="full-project-list" className="site-container pb-12 lg:pb-16 scroll-mt-24">
      <RevealRule src="/images/double-line.png" className="w-full block mb-10 lg:mb-12" />
      <h2 className="font-typewriter text-[clamp(1.4rem,2.5vw,2.2rem)] leading-tight text-[#1A0F00] mb-3">Full Project List</h2>
      <p className="font-raleway text-[15px] text-[#5C4A30] leading-relaxed max-w-[620px] mb-8">
        A reference list of U‑LI projects since {PROJECT_LIST_STATS.sinceYear}, grouped by sector. Open a sector to see its projects.
      </p>
      <div className="border-t border-[#1A0F00]/20">
        {PROJECT_LIST.map((group) => (
          <details key={group.category} className="group border-b border-[#1A0F00]/20">
            <summary className="flex items-center justify-between gap-4 min-h-[52px] py-3 cursor-pointer list-none [&::-webkit-details-marker]:hidden hover:text-[#ff8905] text-[#1A0F00] transition-colors">
              <span className="font-typewriter text-[15px] lg:text-[17px] leading-snug">{group.category}</span>
              <span className="flex items-center gap-3 shrink-0">
                <span className="font-raleway text-[13px] font-semibold text-[#5C4A30]">{group.projects.length}</span>
                <Plus size={16} strokeWidth={2} className="text-[#ff8905] group-open:rotate-45" aria-hidden="true" />
              </span>
            </summary>
            <ul className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-10 pb-6">
              {group.projects.map(([name, location]) => (
                <li key={name} className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between sm:gap-4 py-2 border-b border-[#1A0F00]/10">
                  <span className="font-raleway text-[12px] font-semibold uppercase tracking-wide leading-snug text-[#1A0F00]">{name}</span>
                  <span className="font-raleway text-[12px] leading-snug text-[#5C4A30] sm:text-right sm:shrink-0">{location}</span>
                </li>
              ))}
            </ul>
          </details>
        ))}
      </div>
    </section>
  );
}
