"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitContact, ContactState } from "@/app/actions/contact";
import { useFormStatus } from "react-dom";

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

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full btn-primary justify-center py-4 text-[15px] disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {pending ? "Sending…" : "Submit"}
    </button>
  );
}

const inputCls =
  "w-full font-raleway text-[14px] text-[#1A0F00] bg-white border border-[#1A0F00]/40 px-4 py-3 placeholder:text-[#5C4A30]/50 focus:outline-none focus:border-[#ff8905] transition-colors";

export default function ContactForm() {
  const [state, action] = useActionState(submitContact, INITIAL_STATE);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <section className="site-container py-8 lg:py-10">
      <div>
        <h2 className="font-typewriter uppercase text-[clamp(1.5rem,3vw,2.75rem)] leading-tight text-[#1A0F00] tracking-tight mb-3">
          Let&apos;s Talk About Your Project Needs.
        </h2>
        <p className="font-raleway text-[15px] text-[#5C4A30] leading-relaxed mb-2">
          Whether you&apos;re planning a project, requesting a quotation, or looking for technical
          support, our team is ready to assist you.
        </p>
        <p className="font-raleway text-[13px] text-[#5C4A30] mb-8">
          Compulsory fields. Please fill all fields marked with *
        </p>

        <form ref={formRef} action={action} noValidate className="space-y-4">
          {/* Row 1: Title + Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select name="title" className={inputCls}>
              <option value="">Title</option>
              {TITLES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <input
              name="name"
              type="text"
              placeholder="Name *"
              required
              className={inputCls}
            />
          </div>

          {/* Row 2: Email + Contact Number */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              name="email"
              type="email"
              placeholder="Email *"
              required
              className={inputCls}
            />
            <input
              name="contactNumber"
              type="tel"
              placeholder="Contact Number"
              className={inputCls}
            />
          </div>

          {/* Row 3: Company Name */}
          <input
            name="companyName"
            type="text"
            placeholder="Company Name"
            className={inputCls}
          />

          {/* Row 4: Company Category + Other Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select name="companyCategory" className={inputCls}>
              <option value="">Company Category</option>
              {COMPANY_CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <input
              name="otherCategory"
              type="text"
              placeholder="Other Category"
              className={inputCls}
            />
          </div>

          {/* Row 5: Address */}
          <input
            name="address"
            type="text"
            placeholder="Address"
            className={inputCls}
          />

          {/* Row 6: Message */}
          <textarea
            name="message"
            placeholder="Message *"
            required
            rows={5}
            className={`${inputCls} resize-none`}
          />

          {/* Feedback */}
          {state.status === "success" && (
            <p className="font-raleway text-[14px] text-green-700 bg-green-50 border border-green-200 px-4 py-3">
              {state.message}
            </p>
          )}
          {state.status === "error" && (
            <p className="font-raleway text-[14px] text-red-700 bg-red-50 border border-red-200 px-4 py-3">
              {state.message}
            </p>
          )}

          <SubmitButton />
        </form>
      </div>

    </section>
  );
}
