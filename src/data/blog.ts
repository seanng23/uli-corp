export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
}

export const blogPosts: BlogPost[] = [
  { slug: "future-of-cable-management", title: "The Future of Cable Management in Smart Buildings", date: "2026-04-10", excerpt: "How modular cable support is reshaping commercial infrastructure.", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200" },
  { slug: "iso-certification-process", title: "Inside ULI's ISO Certification Process", date: "2026-03-22", excerpt: "A look at the rigorous quality standards behind every product.", image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=1200" },
  { slug: "asean-infrastructure-trends", title: "ASEAN Infrastructure Trends in 2026", date: "2026-02-15", excerpt: "Key drivers shaping demand across the region.", image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200" },
];
