import Image from "next/image";
import ProductsClientPage from "@/components/products/ProductsClientPage";
import { getAllProducts } from "@/sanity/lib/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse U-LI's complete range of ISO-certified Cable Support Systems, Metal Framing Systems, and Floor Trunking Systems.",
  alternates: { canonical: "/products" },
};

export default async function ProductsPage() {
  const products = await getAllProducts();
  return (
    <>
      {/* Double-line top */}
      <div className="site-container">
        <img src="/images/single-line.png" alt="" aria-hidden="true" className="w-full block" />
      </div>

      {/* Hero — split layout */}
      <section className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center py-8 lg:py-10">
          {/* Left: text */}
          <div>
            <p className="font-raleway text-[11px] font-bold tracking-[0.2em] uppercase text-[#ff8905] mb-3">
              Our Products
            </p>
            <h1 className="font-typewriter text-[clamp(1.6rem,2.5vw,2.5rem)] leading-tight text-[#1A0F00] mb-4">
              Cable Support Systems.
            </h1>
            <p className="font-raleway text-[15px] text-[#5C4A30] leading-relaxed max-w-[480px]">
              The Cable Support System is the foundation of any efficient electrical infrastructure.
              U‑LI manufactures a complete range of steel-based solutions engineered to perform in
              demanding environments across commercial, industrial, and infrastructure projects.
            </p>
          </div>

          {/* Right: image */}
          <div className="relative h-[300px] lg:h-[420px]">
            <Image
              src="/images/products-hero.jpg"
              alt="U-LI Cable Support Systems"
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Double-line divider */}
      <div className="site-container">
        <img
          src="/images/double-line.png"
          alt=""
          aria-hidden="true"
          className="w-full block"
        />
      </div>

      {/* Sidebar + grid */}
      <ProductsClientPage products={products} />
    </>
  );
}
