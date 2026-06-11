"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { useCart } from "@/components/cart/CartProvider";

type NavLink = {
  label: string;
  href: string;
  dropdown?: { label: string; href: string }[];
};

const leftLinks: NavLink[] = [
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

const rightLinks: NavLink[] = [
  {
    label: "Investor Relations",
    href: "/investor-relations/announcements",
    dropdown: [
      { label: "Announcements", href: "/investor-relations/announcements" },
      { label: "General Meetings", href: "/investor-relations/general-meetings" },
    ],
  },
  { label: "Media Centre", href: "/media" },
  { label: "Sustainability", href: "/sustainability" },
  { label: "Contact Us", href: "/contact-us" },
];

const linkClass =
  "font-raleway text-[13px] font-semibold tracking-wide text-[#1A0F00] hover:text-[#ff8905] transition-colors duration-200";

export default function Nav() {
  const { count } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [openMobile, setOpenMobile] = useState<string | null>(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const cancelClose = useCallback(() => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
  }, []);
  const openDropdown = useCallback((key: string, el: HTMLElement) => {
    cancelClose();
    const rect = el.getBoundingClientRect();
    setDropdownPos({ top: rect.bottom + 8, left: rect.left + rect.width / 2 });
    setOpenKey(key);
  }, [cancelClose]);
  const scheduleClose = useCallback(() => {
    closeTimerRef.current = setTimeout(() => setOpenKey(null), 150);
  }, []);

  function renderDesktopItem(l: NavLink) {
    if (!l.dropdown) {
      return (
        <li key={l.href}>
          <Link href={l.href} className={linkClass}>{l.label}</Link>
        </li>
      );
    }
    const isOpen = openKey === l.href;
    return (
      <li
        key={l.href}
        onMouseEnter={(e) => openDropdown(l.href, e.currentTarget)}
        onMouseLeave={scheduleClose}
      >
        <button className={`flex items-center gap-1 ${linkClass}`}>
          {l.label}
          <ChevronDown size={13} strokeWidth={2.5} className={`mt-0.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
        </button>
        {mounted && isOpen && createPortal(
          <div
            style={{ position: "fixed", top: dropdownPos.top, left: dropdownPos.left, transform: "translateX(-50%)", zIndex: 9999 }}
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
          >
            <div className="bg-[#F5EDD6] border border-[#1A0F00]/15 shadow-md min-w-[200px]">
              {l.dropdown.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpenKey(null)}
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
    );
  }

  function renderMobileItem(l: NavLink) {
    if (!l.dropdown) {
      return (
        <li key={l.href}>
          <Link href={l.href} onClick={() => setMobileOpen(false)} className="font-raleway text-sm font-semibold tracking-wide text-[#1A0F00] hover:text-[#ff8905]">
            {l.label}
          </Link>
        </li>
      );
    }
    const isOpen = openMobile === l.href;
    return (
      <li key={l.href}>
        <button
          onClick={() => setOpenMobile(isOpen ? null : l.href)}
          className="flex items-center gap-1 font-raleway text-sm font-semibold tracking-wide text-[#1A0F00] hover:text-[#ff8905]"
        >
          {l.label}
          <ChevronDown size={13} strokeWidth={2.5} className={`mt-0.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
        </button>
        {isOpen && (
          <ul className="mt-2 pl-4 space-y-3">
            {l.dropdown.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={() => setMobileOpen(false)} className="font-raleway text-sm font-semibold tracking-wide text-[#5C4A30] hover:text-[#ff8905]">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  }

  return (
    <header className="bg-paper-fixed border-b border-[#1A0F00]/10 sticky top-0 z-[200]">
      <div className="site-container py-4">
        {/* Desktop nav */}
        <nav className="hidden lg:grid grid-cols-[1fr_auto_1fr] items-center gap-6">
          <ul className="flex items-center gap-5 xl:gap-7 justify-end">
            {leftLinks.map(renderDesktopItem)}
          </ul>

          <Link href="/" className="flex-shrink-0">
            <Image src="/images/cropped-logo.png" alt="United U-Li Corporation Berhad" width={90} height={90} priority />
          </Link>

          <ul className="flex items-center gap-5 xl:gap-7">
            {rightLinks.map(renderDesktopItem)}
            <li>
              <Link href="/enquiry" className="relative flex items-center gap-1 hover:text-[#ff8905] transition-colors">
                <ShoppingBag size={20} strokeWidth={1.8} />
                {count > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#ff8905] text-[#F5EDD6] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{count}</span>
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
                <span className="absolute -top-2 -right-2 bg-[#ff8905] text-[#F5EDD6] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{count}</span>
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
        <div className="lg:hidden bg-paper-fixed border-t border-[#1A0F00]/10 px-6 py-6">
          <ul className="space-y-4">
            {leftLinks.map(renderMobileItem)}
            {rightLinks.map(renderMobileItem)}
          </ul>
        </div>
      )}
    </header>
  );
}
