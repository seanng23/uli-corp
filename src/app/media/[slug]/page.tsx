import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

type Block =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "quote"; text: string; cite?: string };

type Article = {
  slug: string;
  title: string;
  date: string;
  category: string;
  readTime: string;
  author: string;
  image: string;
  excerpt: string;
  body: Block[];
};

const ARTICLES: Article[] = [
  {
    slug: "made-in-malaysia-trusted-globally",
    title: "Made in Malaysia, Trusted Globally: The U-LI Manufacturing Story",
    date: "April 12, 2026",
    category: "Company News",
    readTime: "5 min read",
    author: "U-LI Editorial Team",
    image: "/images/homepage/blog-1.jpg",
    excerpt:
      "With five fully integrated factories across the country, U-LI manufactures over 40,000 metric tonnes of steel-based products every year — supplying cable support and management systems to projects across the region and beyond.",
    body: [
      {
        type: "p",
        text: "For more than two decades, United U-Li Corporation Berhad has grown from a local manufacturer into one of Malaysia's most trusted names in cable support and management systems. What began as a single production line is today a national manufacturing network — five fully integrated factories turning raw steel into the backbone of modern infrastructure.",
      },
      {
        type: "p",
        text: "Every year, U-LI processes over 40,000 metric tonnes of steel into cable trays, ladders, trunking, conduits and a wide portfolio of building products. From hospitals and airports to data centres and power stations, our solutions quietly hold together the electrical and data systems that keep cities running.",
      },
      { type: "h", text: "Five Factories, One Standard" },
      {
        type: "p",
        text: "Our manufacturing footprint spans Seri Kembangan, Balakong, Taming Jaya, Ipoh and Nilai. Each site is purpose-built and vertically integrated, meaning we control quality at every stage — from incoming steel coil to the finished, coated product that leaves our gates.",
      },
      {
        type: "p",
        text: "This integration is deliberate. By keeping forming, punching, welding and finishing under one roof, we shorten lead times, maintain consistency across large orders, and respond quickly to the custom requirements that complex projects demand.",
      },
      {
        type: "quote",
        text: "We don't just supply products — we engineer reliability into every metre of cable support that carries a building's nervous system.",
        cite: "U-LI Manufacturing",
      },
      { type: "h", text: "Technology That Shapes Steel" },
      {
        type: "p",
        text: "Behind every U-LI product is a line of precision machinery: coil handling and roll forming systems, CNC turret punches, laser cutting, robotic welding, a continuous powder spray line and hot-dip galvanizing. Together they allow us to deliver consistent tolerances at volume, while meeting the corrosion and load-bearing standards that demanding environments require.",
      },
      {
        type: "p",
        text: "Automation has also become a quiet driver of quality. Robotic welding removes variability from critical joints, while inline finishing ensures every surface receives uniform protection — the difference between a system that lasts a few years and one that lasts decades.",
      },
      { type: "h", text: "Trusted Beyond Our Borders" },
      {
        type: "p",
        text: "Although proudly made in Malaysia, U-LI products are specified on projects well beyond it. Our reputation rests on a simple promise: that what we ship performs exactly as engineered, wherever it is installed. That trust — earned project by project — is the real story behind the steel.",
      },
      {
        type: "p",
        text: "As we look ahead, the mission stays the same: to build responsibly, invest in our people and technology, and remain the partner that engineers and contractors reach for first.",
      },
    ],
  },
  {
    slug: "choosing-cable-support-systems",
    title: "How to Choose the Right Cable Support Systems for Your Project",
    date: "April 12, 2026",
    category: "Insights",
    readTime: "4 min read",
    author: "U-LI Editorial Team",
    image: "/images/homepage/blog-2.jpg",
    excerpt:
      "A well-planned cable support system is the backbone of any electrical or data installation. Discover the key components and the importance of strategic planning.",
    body: [
      {
        type: "p",
        text: "Choosing the right cable support system is one of the most consequential decisions in any electrical or data installation. Get it right, and cabling is organised, protected and easy to maintain for decades. Get it wrong, and you inherit a lifetime of access headaches and safety risks.",
      },
      { type: "h", text: "Start With the Load" },
      {
        type: "p",
        text: "Every system begins with the load it must carry — the weight of cables now, plus realistic allowance for future expansion. Under-specifying capacity is the most common and costly mistake. A good rule of thumb is to plan for the system you'll need in five years, not just on day one.",
      },
      { type: "h", text: "Match the Environment" },
      {
        type: "p",
        text: "Indoor office, humid plant room, coastal site or corrosive industrial environment — each calls for a different finish. Pre-galvanized, hot-dip galvanized and powder-coated options each have their place, and selecting the right protection is what determines real-world lifespan.",
      },
      {
        type: "quote",
        text: "The cheapest tray on paper is rarely the cheapest over the life of a building.",
      },
      { type: "h", text: "Plan for Access" },
      {
        type: "p",
        text: "Cables get added, moved and replaced. Ladder, perforated tray, solid tray and wire mesh each offer different trade-offs between protection, ventilation and ease of access. Thinking about maintenance early saves enormous effort later.",
      },
      {
        type: "p",
        text: "Our technical team works with engineers and contractors to specify the right combination for each project — talk to us early, and we'll help you plan it properly.",
      },
    ],
  },
  {
    slug: "understanding-cable-management-systems",
    title: "Understanding Cable Management Systems in Modern Infrastructure",
    date: "April 12, 2026",
    category: "Insights",
    readTime: "4 min read",
    author: "U-LI Editorial Team",
    image: "/images/homepage/blog-3.jpg",
    excerpt:
      "This guide breaks down the differences and provides expert tips for selecting solutions that meet key industry standards.",
    body: [
      {
        type: "p",
        text: "As buildings grow smarter and more connected, the systems that organise their cabling have never mattered more. Cable management is no longer an afterthought — it is fundamental infrastructure that affects safety, performance and maintainability.",
      },
      { type: "h", text: "Support vs. Management" },
      {
        type: "p",
        text: "Cable support systems carry the physical load of cabling — trays, ladders and channels. Cable management systems go further, routing, separating and protecting cables to meet electrical segregation and fire-safety requirements. Most modern projects use both in concert.",
      },
      { type: "h", text: "Standards Matter" },
      {
        type: "p",
        text: "Specifying to recognised standards isn't bureaucracy — it's how you guarantee load ratings, corrosion resistance and electrical performance are independently verifiable. It protects everyone from the specifier to the end user.",
      },
      {
        type: "quote",
        text: "Good cable management is invisible when it works — and impossible to ignore when it doesn't.",
      },
      {
        type: "p",
        text: "Whether you're designing a data centre, a hospital or a transport hub, the principles are the same: plan generously, segregate correctly, and choose products built to last.",
      },
    ],
  },
  {
    slug: "inside-our-factories",
    title: "Inside Our Factories: A Look at U-LI's Integrated Manufacturing",
    date: "March 28, 2026",
    category: "Behind the Scenes",
    readTime: "3 min read",
    author: "U-LI Editorial Team",
    image: "/images/homepage/factory-1.jpg",
    excerpt:
      "From coil handling and roll forming to robotic welding and hot-dip galvanizing — a tour of the technologies that shape every U-LI product.",
    body: [
      {
        type: "p",
        text: "Step onto a U-LI factory floor and the first thing you notice is flow. Steel coil enters at one end and leaves as finished, coated product at the other — a continuous, controlled process built for both precision and scale.",
      },
      { type: "h", text: "From Coil to Component" },
      {
        type: "p",
        text: "Coil handling and roll forming shape raw steel into profiles. CNC turret punches and laser cutting add the perforations and details each product needs, while robotic welding brings consistency to the joints that matter most.",
      },
      { type: "h", text: "Built to Endure" },
      {
        type: "p",
        text: "Finishing is where longevity is decided. Our continuous powder spray line and hot-dip galvanizing give every product the corrosion protection its environment demands — uniform, repeatable and tested.",
      },
      {
        type: "p",
        text: "It's this integration, across five sites, that lets us promise the same standard on every order, large or small.",
      },
    ],
  },
  {
    slug: "u-li-in-regional-projects",
    title: "Powering Progress: U-LI Solutions in Major Regional Projects",
    date: "March 10, 2026",
    category: "Projects",
    readTime: "3 min read",
    author: "U-LI Editorial Team",
    image: "/images/homepage/project-1.jpg",
    excerpt:
      "How U-LI cable support systems underpin some of the most demanding commercial, transport and energy installations in the region.",
    body: [
      {
        type: "p",
        text: "From transport terminals to power stations, U-LI products are specified where reliability is non-negotiable. Our systems are designed to carry critical cabling through some of the most demanding environments in the region.",
      },
      { type: "h", text: "Engineered for Demanding Sites" },
      {
        type: "p",
        text: "Large infrastructure projects bring scale, tight timelines and exacting standards. Our integrated manufacturing lets us meet bulk volumes without compromising on the tolerances and finishes that these installations require.",
      },
      {
        type: "quote",
        text: "When a project can't afford to fail, specifiers reach for systems they trust.",
      },
      {
        type: "p",
        text: "Explore more of our work on the projects page, or talk to our team about specifying U-LI for your next development.",
      },
    ],
  },
];

const bySlug = (slug: string) => ARTICLES.find((a) => a.slug === slug);

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = bySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/media/${slug}` },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = bySlug(slug);
  if (!article) notFound();

  const related = ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <>
      {/* Top line */}
      <div className="site-container">
        <img src="/images/single-line.png" alt="" aria-hidden="true" className="w-full block" />
      </div>

      {/* Back link */}
      <div className="site-container pt-6">
        <Link
          href="/media"
          className="inline-flex items-center gap-2 font-raleway text-[13px] font-semibold tracking-wide text-[#5C4A30] hover:text-[#ff8905] transition-colors"
        >
          <ArrowLeft size={15} strokeWidth={2} /> Back to Media Centre
        </Link>
      </div>

      {/* Article header */}
      <article>
        <header className="site-container pt-6 pb-8 max-w-[820px]">
          <p className="font-raleway text-[11px] font-bold uppercase tracking-[0.18em] text-[#ff8905] mb-4">
            {article.category} &nbsp;·&nbsp; {article.date} &nbsp;·&nbsp; {article.readTime}
          </p>
          <h1 className="font-typewriter text-[clamp(1.8rem,4vw,3.25rem)] leading-[1.1] text-[#1A0F00] mb-5">
            {article.title}
          </h1>
          <p className="font-raleway text-[18px] text-[#5C4A30] leading-relaxed">
            {article.excerpt}
          </p>
          <p className="font-raleway text-[13px] font-semibold text-[#1A0F00] mt-5">
            By {article.author}
          </p>
        </header>

        {/* Hero image */}
        <div className="site-container mb-10">
          <div className="relative w-full h-72 lg:h-[480px] overflow-hidden">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover object-center"
              sizes="100vw"
              priority
            />
          </div>
        </div>

        {/* Body */}
        <div className="site-container">
          <div className="max-w-[720px] mx-auto">
            {article.body.map((block, i) => {
              if (block.type === "h") {
                return (
                  <h2
                    key={i}
                    className="font-typewriter text-[clamp(1.4rem,2.4vw,2rem)] leading-tight text-[#1A0F00] mt-10 mb-4"
                  >
                    {block.text}
                  </h2>
                );
              }
              if (block.type === "quote") {
                return (
                  <blockquote
                    key={i}
                    className="border-l-[3px] border-[#ff8905] pl-6 my-8"
                  >
                    <p className="font-typewriter text-[clamp(1.2rem,2vw,1.6rem)] leading-snug text-[#1A0F00]">
                      “{block.text}”
                    </p>
                    {block.cite && (
                      <cite className="block font-raleway text-[13px] font-semibold not-italic text-[#5C4A30] mt-3">
                        — {block.cite}
                      </cite>
                    )}
                  </blockquote>
                );
              }
              return (
                <p
                  key={i}
                  className="font-raleway text-[17px] text-[#3a2c18] leading-[1.8] mb-5"
                >
                  {block.text}
                </p>
              );
            })}
          </div>
        </div>
      </article>

      {/* Divider */}
      <div className="site-container mt-14">
        <img src="/images/double-line.png" alt="" aria-hidden="true" className="w-full block" />
      </div>

      {/* Related */}
      <section className="site-container py-12 lg:py-16">
        <h2 className="font-typewriter text-[clamp(1.5rem,2.5vw,2.25rem)] leading-tight text-[#1A0F00] mb-10">
          More Stories.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
          {related.map((a) => (
            <Link key={a.slug} href={`/media/${a.slug}`} className="block group">
              <div className="relative w-full h-56 overflow-hidden mb-5">
                <Image
                  src={a.image}
                  alt={a.title}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <span className="font-raleway text-[11px] font-bold uppercase tracking-[0.18em] text-[#ff8905]">
                {a.category} &nbsp;·&nbsp; {a.date}
              </span>
              <h3 className="font-typewriter text-[19px] leading-snug text-[#1A0F00] mt-2 mb-2 group-hover:text-[#ff8905] transition-colors">
                {a.title}
              </h3>
              <span className="link-underline text-sm text-[#1A0F00] mt-1 inline-flex">
                Read More »
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
