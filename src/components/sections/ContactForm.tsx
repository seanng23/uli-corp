"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitContact, ContactState } from "@/app/actions/contact";
import { useFormStatus } from "react-dom";
import { AlertCircle, ArrowRight, CheckCircle, ChevronDown, Mail, Phone } from "lucide-react";

const INITIAL_STATE: ContactState = { status: "idle" };

const TITLES = ["Mr.", "Ms.", "Mrs.", "Dr.", "Prof."];
const COMPANY_CATEGORIES = [
  "Construction",
  "Data Center",
  "Education",
  "Government",
  "Healthcare",
  "Hospitality",
  "Industrial",
  "Oil, Gas & Chemical",
  "Power & Energy",
  "Residential Developer",
  "Solar / Renewable Energy",
  "Telecommunication",
  "Transportation",
  "Water & Utilities",
  "Other",
];

const inputCls =
  "w-full font-raleway text-[14px] text-[#1A0F00] bg-white rounded-lg border border-[#1A0F00]/15 px-4 py-3 placeholder:text-[#5C4A30]/40 focus:outline-none focus:border-[#ff8905] focus:ring-2 focus:ring-[#ff8905]/20 transition-all";
const labelCls =
  "block font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00] mb-1.5";

function Label({ htmlFor, children, required }: { htmlFor: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className={labelCls}>
      {children}
      {required && <span className="text-[#ff8905] ml-0.5">*</span>}
    </label>
  );
}

function Select({ id, name, children, defaultValue, onChange }: { id: string; name: string; children: React.ReactNode; defaultValue?: string; onChange?: (value: string) => void }) {
  return (
    <div className="relative">
      <select
        id={id}
        name={name}
        defaultValue={defaultValue ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
        className={`${inputCls} appearance-none pr-10 cursor-pointer`}
      >
        {children}
      </select>
      <ChevronDown size={16} strokeWidth={2.5} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#5C4A30]" />
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-primary justify-center px-8 py-3.5 text-[14px] w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {pending ? "Sending…" : <>Send Message <ArrowRight size={15} /></>}
    </button>
  );
}

export default function ContactForm() {
  const [state, action] = useActionState(submitContact, INITIAL_STATE);
  const [category, setCategory] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
      setCategory("");
    }
  }, [state]);

  return (
    <section className="site-container py-12 lg:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,380px)_1fr] gap-10 lg:gap-16 items-start">
        {/* Left — intro + direct contact. On mobile the intro stays above the form and the direct-contact
            block drops below it, so the first field is reachable without scrolling past a directory. */}
        <div className="contents lg:block lg:sticky lg:top-24">
          <div className="order-1 lg:order-none">
          <p className="font-raleway text-[11px] font-bold tracking-[0.2em] uppercase text-[#ff8905] mb-3">
            Contact Form
          </p>
          <h2 className="font-typewriter uppercase text-[clamp(1.6rem,2.8vw,2.4rem)] leading-tight text-[#1A0F00] tracking-tight mb-4">
            Let&apos;s Talk About Your Project Needs.
          </h2>
          <p className="font-raleway text-[15px] text-[#5C4A30] leading-relaxed lg:mb-8">
            Whether you&apos;re planning a project, requesting a quotation, or looking for
            technical support, our team is ready to assist you. We typically respond
            within one business day.
          </p>
          </div>

          <div className="order-3 lg:order-none border-t border-[#1A0F00]/15 pt-6 space-y-4">
            <p className="font-raleway text-[11px] font-bold uppercase tracking-widest text-[#1A0F00]">
              Prefer to reach us directly?
            </p>
            <a href="mailto:hello@uli.com.my" className="flex items-center gap-3 group w-fit">
              <span className="w-9 h-9 rounded-lg bg-[#ff8905]/10 flex items-center justify-center shrink-0">
                <Mail size={16} className="text-[#ff8905]" />
              </span>
              <span className="font-raleway text-[14px] text-[#1A0F00] group-hover:text-[#ff8905] transition-colors">
                hello@uli.com.my
              </span>
            </a>
            <a href="tel:+60358703300" className="flex items-center gap-3 group w-fit">
              <span className="w-9 h-9 rounded-lg bg-[#ff8905]/10 flex items-center justify-center shrink-0">
                <Phone size={16} className="text-[#ff8905]" />
              </span>
              <span className="font-raleway text-[14px] text-[#1A0F00] group-hover:text-[#ff8905] transition-colors">
                603-5870 3300
              </span>
            </a>
          </div>
        </div>

        {/* Right — form card */}
        <div className="order-2 lg:order-none border border-white/40 bg-white/15 rounded-2xl shadow-[0_8px_30px_rgba(26,15,0,0.12)] p-6 sm:p-8 lg:p-10">
          <form ref={formRef} action={action} noValidate className="space-y-5">
            {/* Name (title + name) / Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="cf-name" required>Name</Label>
                <div className="flex gap-2">
                  <div className="relative w-[92px] shrink-0">
                    <select id="cf-title" name="title" defaultValue="" aria-label="Title" className={`${inputCls} appearance-none pr-7 cursor-pointer px-3`}>
                      <option value="">Title</option>
                      {TITLES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    <ChevronDown size={14} strokeWidth={2.5} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#5C4A30]" />
                  </div>
                  <input id="cf-name" name="name" type="text" placeholder="Your full name" required className={inputCls} />
                </div>
              </div>
              <div>
                <Label htmlFor="cf-email" required>Email</Label>
                <input id="cf-email" name="email" type="email" placeholder="you@company.com" required className={inputCls} />
              </div>
            </div>

            {/* Contact number / Company name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="cf-phone">Contact Number</Label>
                <input id="cf-phone" name="contactNumber" type="tel" placeholder="+60 12-345 6789" className={inputCls} />
              </div>
              <div>
                <Label htmlFor="cf-company">Company Name</Label>
                <input id="cf-company" name="companyName" type="text" placeholder="Your company" className={inputCls} />
              </div>
            </div>

            {/* Category (+ conditional other) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="cf-category">Company Category</Label>
                <Select id="cf-category" name="companyCategory" onChange={setCategory}>
                  <option value="">Select a category</option>
                  {COMPANY_CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </Select>
              </div>
              {category === "Other" && (
                <div>
                  <Label htmlFor="cf-other">Other Category</Label>
                  <input id="cf-other" name="otherCategory" type="text" placeholder="Tell us your industry" className={inputCls} />
                </div>
              )}
            </div>

            {/* Address */}
            <div>
              <Label htmlFor="cf-address">Address</Label>
              <input id="cf-address" name="address" type="text" placeholder="Street, city, state" className={inputCls} />
            </div>

            {/* Message */}
            <div>
              <Label htmlFor="cf-message" required>Message</Label>
              <textarea id="cf-message" name="message" placeholder="Tell us about your project, quantities, timeline, or the support you need." required rows={5} className={`${inputCls} resize-none`} />
            </div>

            {/* Feedback */}
            {state.status === "success" && (
              <div className="flex items-start gap-2.5 font-raleway text-[14px] text-green-800 bg-green-50 border border-green-200 rounded-lg px-4 py-3">
                <CheckCircle size={17} className="shrink-0 mt-0.5" />
                <span>{state.message}</span>
              </div>
            )}
            {state.status === "error" && (
              <div className="flex items-start gap-2.5 font-raleway text-[14px] text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                <AlertCircle size={17} className="shrink-0 mt-0.5" />
                <span>{state.message}</span>
              </div>
            )}

            {/* Footer row */}
            <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4 pt-1">
              <p className="font-raleway text-[12px] text-[#5C4A30]">
                Fields marked <span className="text-[#ff8905] font-bold">*</span> are required.
              </p>
              <SubmitButton />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
