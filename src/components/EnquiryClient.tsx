"use client";

import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { Trash2, ShoppingBag } from "lucide-react";
import Link from "next/link";
import FadeUp from "@/components/motion/FadeUp";

// Dimension specs are expressed in millimetres — show the unit in the label.
const MM_FIELDS = new Set(["Height", "Width", "Length", "Thickness"]);
const specLabel = (key: string) => (MM_FIELDS.has(key) ? `${key} (mm)` : key);

type FormData = {
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  projectName: string;
  deliveryRegion: string;
  notes: string;
};

const INITIAL_FORM: FormData = {
  name: "",
  company: "",
  email: "",
  phone: "",
  country: "Malaysia",
  projectName: "",
  deliveryRegion: "",
  notes: "",
};

export default function EnquiryClient() {
  const { items, removeFromCart, updateQuantity, clearCart, count } = useCart();
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ form, items }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
      clearCart();
    } catch {
      setError("Something went wrong. Please try again or email us directly at info@uli.com.my");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-[700px] mx-auto px-6 py-24 text-center">
        <FadeUp>
          <div className="w-16 h-16 bg-[#ff8905] mx-auto flex items-center justify-center mb-8">
            <ShoppingBag size={28} className="text-[#F5EDD6]" />
          </div>
          <h1 className="font-typewriter text-[clamp(2rem,4vw,3rem)] text-[#1A0F00] mb-4">
            Enquiry Submitted.
          </h1>
          <p className="font-raleway text-sm text-[#5C4A30] leading-relaxed mb-8">
            Thank you. Our sales team will review your enquiry and respond within 1–2 business days.
            A confirmation has been sent to <strong>{form.email}</strong>.
          </p>
          <Link href="/products" className="btn-primary">
            Continue Browsing Products
          </Link>
        </FadeUp>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-12">
      <FadeUp>
        <p className="font-raleway text-xs font-bold tracking-widest uppercase text-[#ff8905] mb-3">Enquiry</p>
        <h1 className="font-typewriter text-[clamp(2rem,5vw,4rem)] leading-[0.95] text-[#1A0F00] mb-2">
          Your Enquiry Cart.
        </h1>
        <p className="font-raleway text-sm text-[#5C4A30] mb-10">
          Review your selected products, configure quantities, then complete the form to send your enquiry directly to our sales team.
        </p>
      </FadeUp>

      {items.length === 0 ? (
        <div className="py-20 text-center border border-[#1A0F00]/15">
          <ShoppingBag size={40} className="mx-auto text-[#5C4A30] mb-4" strokeWidth={1.5} />
          <p className="font-typewriter text-xl text-[#1A0F00] mb-3">Your cart is empty.</p>
          <p className="font-raleway text-sm text-[#5C4A30] mb-6">Browse our products and configure specifications before enquiring.</p>
          <Link href="/products" className="btn-primary">Browse Products</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12">
          {/* Cart items */}
          <div>
            <div className="border border-[#1A0F00]/15 divide-y divide-[#1A0F00]/10">
              {/* Header */}
              <div className="hidden md:grid grid-cols-[1fr_auto] gap-4 px-5 py-3 bg-[#1A0F00]/5">
                <p className="font-raleway text-[11px] font-bold tracking-widest uppercase text-[#5C4A30]">Product & Specifications</p>
                <p className="font-raleway text-[11px] font-bold tracking-widest uppercase text-[#5C4A30]">Qty</p>
              </div>

              {items.map((item) => (
                <div key={item.id} className="px-5 py-5 flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    {item.image && (
                      <div className="shrink-0 w-32 h-32 rounded-md border border-[#1A0F00]/15 bg-white/50 flex items-center justify-center overflow-hidden">
                        <img src={item.image} alt={item.productName} className="w-full h-full object-contain p-1" />
                      </div>
                    )}
                    <div className="flex-1">
                    <p className="font-typewriter text-base text-[#1A0F00] mb-1">{item.productName}</p>
                    <p className="font-raleway text-xs text-[#ff8905] font-semibold mb-2">{item.category}</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                      {Object.entries(item.specs).map(([k, v]) => (
                        <span key={k} className="font-raleway text-xs text-[#5C4A30]">
                          <span className="font-semibold">{specLabel(k)}:</span> {v}
                        </span>
                      ))}
                    </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-[#1A0F00]/30 rounded-md overflow-hidden">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="w-8 h-8 flex items-center justify-center font-raleway text-lg text-[#1A0F00] hover:bg-[#1A0F00]/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors border-r border-[#1A0F00]/30"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="w-10 text-center font-typewriter text-[15px] text-[#1A0F00]">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center font-raleway text-lg text-[#1A0F00] hover:bg-[#1A0F00]/10 transition-colors border-l border-[#1A0F00]/30"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-[#5C4A30] hover:text-[#ff8905] transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-between items-center">
              <span className="font-raleway text-xs text-[#5C4A30]">{count} item{count !== 1 ? "s" : ""} in cart</span>
              <button onClick={clearCart} className="font-raleway text-xs text-[#5C4A30] hover:text-[#ff8905] underline transition-colors">
                Clear all
              </button>
            </div>

            <div className="mt-6">
              <Link href="/products" className="link-underline text-[#1A0F00] text-xs">
                ← Continue adding products
              </Link>
            </div>
          </div>

          {/* Enquiry form */}
          <div>
            <h2 className="font-typewriter text-[clamp(1.25rem,2.5vw,1.75rem)] text-[#1A0F00] mb-6">
              Your Details
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { name: "name", label: "Full Name", required: true, type: "text" },
                { name: "company", label: "Company Name", required: true, type: "text" },
                { name: "email", label: "Email Address", required: true, type: "email" },
                { name: "phone", label: "Phone Number", required: true, type: "tel" },
                { name: "country", label: "Country", required: true, type: "text" },
                { name: "projectName", label: "Project Name (optional)", required: false, type: "text" },
                { name: "deliveryRegion", label: "Delivery Region / Site Location", required: false, type: "text" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="font-raleway text-[11px] font-bold tracking-widest uppercase text-[#1A0F00] block mb-1.5">
                    {field.label}{field.required && <span className="text-[#ff8905]"> *</span>}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    required={field.required}
                    value={form[field.name as keyof FormData]}
                    onChange={handleChange}
                    className="w-full border border-[#1A0F00]/30 bg-transparent px-3 py-2.5 font-raleway text-sm text-[#1A0F00] focus:outline-none focus:border-[#ff8905] transition-colors"
                  />
                </div>
              ))}

              <div>
                <label className="font-raleway text-[11px] font-bold tracking-widest uppercase text-[#1A0F00] block mb-1.5">
                  Additional Notes / Special Requirements
                </label>
                <textarea
                  name="notes"
                  rows={4}
                  value={form.notes}
                  onChange={handleChange}
                  className="w-full border border-[#1A0F00]/30 bg-transparent px-3 py-2.5 font-raleway text-sm text-[#1A0F00] focus:outline-none focus:border-[#ff8905] transition-colors resize-none"
                />
              </div>

              {error && (
                <p className="font-raleway text-xs text-red-700 bg-red-50 border border-red-200 px-3 py-2">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting || items.length === 0}
                className="btn-primary w-full justify-center text-center mt-2"
              >
                {submitting ? "Sending Enquiry..." : "Submit Enquiry →"}
              </button>

              <p className="font-raleway text-[11px] text-[#5C4A30] text-center">
                Your enquiry will be sent to our sales team at info@uli.com.my
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
