"use client";

import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { generateItemId } from "@/lib/cart-store";
import type { Product } from "@/data/products";
import { ShoppingBag, CheckCircle } from "lucide-react";
import Link from "next/link";

type Props = { product: Product };

export default function ProductConfigurator({ product }: Props) {
  const { addToCart } = useCart();
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const allSelected = product.specs.every((s) => selected[s.label]);

  const handleSelect = (label: string, value: string) => {
    setSelected((prev) => ({ ...prev, [label]: value }));
    setAdded(false);
  };

  const handleAdd = () => {
    if (!allSelected) return;
    const id = generateItemId(product.slug, selected);
    addToCart({
      id,
      productName: product.name,
      category: product.category,
      specs: selected,
      quantity: qty,
      slug: product.slug,
    });
    setAdded(true);
  };

  return (
    <div className="space-y-6">
      {product.specs.map((spec) => (
        <div key={spec.label}>
          <p className="font-raleway text-xs font-bold tracking-widest uppercase text-[#1A0F00] mb-3">
            {spec.label}
            {selected[spec.label] && (
              <span className="ml-2 text-[#ff8905] normal-case tracking-normal font-normal">
                — {selected[spec.label]}
              </span>
            )}
          </p>
          <div className="flex flex-wrap gap-2">
            {spec.values.map((val) => (
              <button
                key={val}
                onClick={() => handleSelect(spec.label, val)}
                className={`px-3 py-1.5 text-xs font-raleway font-semibold border transition-all duration-150 ${
                  selected[spec.label] === val
                    ? "bg-[#1A0F00] text-[#F5EDD6] border-[#1A0F00]"
                    : "bg-transparent text-[#1A0F00] border-[#1A0F00]/40 hover:border-[#1A0F00]"
                }`}
              >
                {val}
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Quantity */}
      <div>
        <p className="font-raleway text-xs font-bold tracking-widest uppercase text-[#1A0F00] mb-3">Quantity</p>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="w-8 h-8 border border-[#1A0F00]/40 text-[#1A0F00] text-lg flex items-center justify-center hover:bg-[#1A0F00] hover:text-[#F5EDD6] transition-colors"
          >
            −
          </button>
          <span className="font-typewriter text-lg w-8 text-center">{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="w-8 h-8 border border-[#1A0F00]/40 text-[#1A0F00] text-lg flex items-center justify-center hover:bg-[#1A0F00] hover:text-[#F5EDD6] transition-colors"
          >
            +
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          onClick={handleAdd}
          disabled={!allSelected}
          className={`btn-primary flex-1 justify-center gap-2 ${!allSelected ? "opacity-40 cursor-not-allowed" : ""}`}
        >
          {added ? (
            <>
              <CheckCircle size={16} />
              Added to Enquiry
            </>
          ) : (
            <>
              <ShoppingBag size={16} />
              Add to Enquiry
            </>
          )}
        </button>
        {added && (
          <Link href="/enquiry" className="btn-outline flex-1 justify-center">
            View Enquiry Cart →
          </Link>
        )}
      </div>

      {!allSelected && (
        <p className="font-raleway text-xs text-[#5C4A30]">
          Please select all options above before adding to your enquiry.
        </p>
      )}
    </div>
  );
}
