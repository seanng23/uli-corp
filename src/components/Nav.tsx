"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { useCart } from "@/components/cart/CartProvider";

const leftLinks = [
  { label: "About Us", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Projects", href: "/projects" },
  {
    label: "Technology",
    href: "/technology",
    dropdown: [
      { label: "Technology & Innovation", href: "/technology" },
      { label: "Quality Assurance", href: "/quality-assurance" },
    ],
  },
];

const rightLinks = [
  { label: "Investor Relations", href: "/investor-relations" },
  { label: "Media Centre", href: "/media" },
  { label: "Sustainability", href: "/sustainability" },
  { label: "Contact Us", href: "/contact-us" },
];

type NavLink = {
  label: string;
  href: string;
  dropdown?: { label: string; href: string }[];
};

export default function Nav() {
  const { count } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [techOpen, setTechOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLLIElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const openDropdown = useCallback(() => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + 8,
        left: rect.left + rect.width / 2,
      });
    }
    setDropdownOpen(true);
  }, []);

  const scheduleClose = useCallback(() => {
    closeTimerRef.current = setTimeout(() => setDropdownOpen(false), 150);
  }, []);

  return (
    <header className="bg-[#F5EDD6] border-b border-[#1A0F00]/10 sticky top-0 z-[200]">
      <div className="site-container py-4">
        {/* Desktop nav */}
        <nav className="hidden lg:grid grid-cols-[1fr_auto_1fr] items-center gap-6">
          {/* Left links */}
          <ul className="flex items-center gap-5 xl:gap-7 justify-end">
            {leftLinks.map((l: NavLink) =>
              l.dropdown ? (
                <li
                  key={l.href}
                  ref={triggerRef}
                  onMouseEnter={openDropdown}
                  onMouseLeave={scheduleClose}
                >
                  <button className="flex items-center gap-1 font-raleway text-[13px] font-semibold tracking-wide text-[#1A0F00] hover:text-[#ff8905] transition-colors duration-200">
                    {l.label}
                    <ChevronDown size={13} strokeWidth={2.5} className={`mt-0.5 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  {/* Portal — renders at document.body, escapes all stacking contexts */}
                  {mounted && dropdownOpen && createPortal(
                    <div
                      style={{ position: "fixed", top: dropdownPos.top, left: dropdownPos.left, transform: "translateX(-50%)", zIndex: 9999 }}
                      onMouseEnter={openDropdown}
                      onMouseLeave={scheduleClose}
                    >
                      <div className="bg-[#F5EDD6] border border-[#1A0F00]/15 shadow-md min-w-[200px]">
                        {l.dropdown!.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setDropdownOpen(false)}
                            className="block px-5 py-3 font-raleway text-[13px] font-semibold tracking-wide text-[#1A0F00] hover:text-[#ff8905] hover:bg-[#1A0F00]/5 transition-colors duration-150 whitespace-nowrap border-b border-[#1A0F00]/10 last:border-0"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>,
                    document.body
                  )}
                </li>
              ) : (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="font-raleway text-[13px] font-semibold tracking-wide text-[#1A0F00] hover:text-[#ff8905] transition-colors duration-200"
                  >
                    {l.label}
                  </Link>
                </li>
              )
            )}
          </ul>

          {/* Center logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/cropped-logo.png"
              alt="United U-Li Corporation Berhad"
              width={90}
              height={90}
              priority
            />
          </Link>

          {/* Right links + cart */}
          <ul className="flex items-center gap-5 xl:gap-7">
            {rightLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="font-raleway text-[13px] font-semibold tracking-wide text-[#1A0F00] hover:text-[#ff8905] transition-colors duration-200"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/enquiry" className="relative flex items-center gap-1 hover:text-[#ff8905] transition-colors">
                <ShoppingBag size={20} strokeWidth={1.8} />
                {count > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#ff8905] text-[#F5EDD6] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {count}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile nav */}
        <div className="lg:hidden flex items-center justify-between">
          <Link href="/">
            <Image src="/images/cropped-logo.png" alt="U-Li" width={60} height={60} />
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/enquiry" className="relative">
              <ShoppingBag size={22} strokeWidth={1.8} />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#ff8905] text-[#F5EDD6] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>
            <button onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#F5EDD6] border-t border-[#1A0F00]/10 px-6 py-6">
          <ul className="space-y-4">
            {leftLinks.map((l: NavLink) =>
              l.dropdown ? (
                <li key={l.href}>
                  <button
                    onClick={() => setTechOpen(!techOpen)}
                    className="flex items-center gap-1 font-raleway text-sm font-semibold tracking-wide text-[#1A0F00] hover:text-[#ff8905]"
                  >
                    {l.label}
                    <ChevronDown size={13} strokeWidth={2.5} className={`mt-0.5 transition-transform duration-200 ${techOpen ? "rotate-180" : ""}`} />
                  </button>
                  {techOpen && (
                    <ul className="mt-2 pl-4 space-y-3">
                      {l.dropdown.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className="font-raleway text-sm font-semibold tracking-wide text-[#5C4A30] hover:text-[#ff8905]"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-raleway text-sm font-semibold tracking-wide text-[#1A0F00] hover:text-[#ff8905]"
                  >
                    {l.label}
                  </Link>
                </li>
              )
            )}
            {rightLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-raleway text-sm font-semibold tracking-wide text-[#1A0F00] hover:text-[#ff8905]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
