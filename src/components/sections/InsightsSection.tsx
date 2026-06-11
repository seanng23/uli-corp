import Image from "next/image";
import Link from "next/link";
import FadeUp from "@/components/motion/FadeUp";
import Typewriter from "@/components/motion/Typewriter";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";

const articles = [
  {
    title: "Made in Malaysia, Trusted Globally: The U-LI Manufacturing Story",
    date: "April 12, 2026",
    excerpt:
      "With five fully integrated factories across the country, U-LI manufactures over 40,000 metric tonnes of steel-based products every year.",
    src: "/images/homepage/blog-1.jpg",
    href: "/media/made-in-malaysia-trusted-globally",
  },
  {
    title: "How to Choose the Right Cable Support Systems for Your Project",
    date: "April 12, 2026",
    excerpt:
      "A well-planned Cable Support Systems is the backbone of any electrical or data installation. Discover the key components and importance of strategic planning.",
    src: "/images/homepage/blog-2.jpg",
    href: "/media/choosing-cable-support-systems",
  },
  {
    title: "Understanding Cable Management Systems in Modern Infrastructure",
    date: "April 12, 2026",
    excerpt:
      "This guide breaks down the differences and provides expert tips for selecting the right solutions that meet key industry standards.",
    src: "/images/homepage/blog-3.jpg",
    href: "/media/understanding-cable-management-systems",
  },
];

export default function InsightsSection() {
  return (
    <section className="site-container py-16">
      <div className="mb-12">
        <h2 className="font-typewriter text-[clamp(2rem,5vw,3.75rem)] leading-[1.05] text-[#1A0F00]">
          <Typewriter text="Insights & Expertise." />
        </h2>
        <FadeUp delay={0.15}>
          <p className="font-raleway font-bold text-[20px] text-[#ff8905] mt-3">
            Real-world knowledge from the people who build infrastructure every day.
          </p>
        </FadeUp>
      </div>
      <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {articles.map((a) => (
          <StaggerItem key={a.title}>
            <Link href={a.href} className="block group">
              <div className="relative w-full h-72 overflow-hidden mb-5">
                <Image
                  src={a.src}
                  alt={a.title}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <h3 className="font-typewriter text-[20px] leading-snug text-[#1A0F00] mb-2 group-hover:text-[#ff8905] transition-colors">
                {a.title}
              </h3>
              <p className="font-raleway text-sm text-[#5C4A30] mb-2">{a.date}</p>
              <p className="font-raleway text-[16px] text-[#5C4A30] leading-relaxed">{a.excerpt}</p>
              <span className="link-underline text-sm text-[#1A0F00] mt-3 inline-flex">
                Read More »
              </span>
            </Link>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
