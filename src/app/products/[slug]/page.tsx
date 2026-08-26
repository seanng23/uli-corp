import { notFound } from "next/navigation";
import ProductInnerClient from "@/components/products/ProductInnerClient";
import { getAllProductSlugs, getProductBySlug } from "@/sanity/lib/queries";
import type { Metadata } from "next";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

// Slugs served by dedicated static routes instead of this generic template.
const DEDICATED_ROUTES = new Set([
  "underfloor-trunking-systems",
  "raisedfloor-trunking-systems",
  "flushfloor-trunking-systems",
]);

export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  return slugs.filter((slug) => !DEDICATED_ROUTES.has(slug)).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: `/products/${slug}` },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return <ProductInnerClient product={product} />;
}
