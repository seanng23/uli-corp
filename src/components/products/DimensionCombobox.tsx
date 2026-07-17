"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  allowDecimal?: boolean;
  placeholder?: string;
};

// Keep only digits (and a single decimal point when allowed) so the field
// can't accept junk while still letting users key in custom sizes.
function sanitize(raw: string, allowDecimal: boolean) {
  let s = raw.replace(allowDecimal ? /[^0-9.]/g : /[^0-9]/g, "");
  if (allowDecimal) {
    const dot = s.indexOf(".");
    if (dot !== -1) s = s.slice(0, dot + 1) + s.slice(dot + 1).replace(/\./g, "");
  }
  return s;
}

export default function DimensionCombobox({
  value,
  onChange,
  options,
  allowDecimal = false,
  placeholder = "Select or type",
}: Props) {
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(-1);
  const wrapRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const filtered = value ? options.filter((o) => o.startsWith(value)) : options;
  const isCustom = value !== "" && !options.includes(value);

  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  function commit(v: string) {
    onChange(v);
    setOpen(false);
    setHighlight(-1);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setHighlight((h) => Math.min(h + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter" && open && highlight >= 0 && filtered[highlight]) {
      e.preventDefault();
      commit(filtered[highlight]);
    } else if (e.key === "Escape") {
      setOpen(false);
      setHighlight(-1);
    }
  }

  return (
    <div ref={wrapRef} className="relative">
      <div
        className={`flex items-center bg-[#F5EDD6] border rounded-md transition-colors ${
          open ? "border-[#ff8905]" : "border-[#1A0F00]/40"
        }`}
      >
        <input
          type="text"
          inputMode={allowDecimal ? "decimal" : "numeric"}
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          autoComplete="off"
          value={value}
          placeholder={placeholder}
          onFocus={() => setOpen(true)}
          onClick={() => setOpen(true)}
          onChange={(e) => {
            onChange(sanitize(e.target.value, allowDecimal));
            setOpen(true);
            setHighlight(-1);
          }}
          onKeyDown={onKeyDown}
          className="w-full min-w-0 font-raleway text-[13px] text-[#1A0F00] bg-transparent rounded-md px-2.5 py-2 focus:outline-none placeholder:text-[#1A0F00]/45"
        />
        {isCustom && (
          <span className="mr-1 shrink-0 font-raleway text-[10px] font-bold uppercase tracking-wide text-[#ff8905] bg-[#ff8905]/15 rounded px-1.5 py-0.5">
            Custom
          </span>
        )}
        <button
          type="button"
          tabIndex={-1}
          aria-label="Toggle options"
          onClick={() => setOpen((o) => !o)}
          className="shrink-0 px-2 py-2 text-[#1A0F00]"
        >
          <ChevronDown
            size={15}
            strokeWidth={2}
            className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {open && (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-30 mt-1 w-full max-h-[180px] overflow-auto bg-[#F5EDD6] border border-[#1A0F00]/25 rounded-md shadow-[0_8px_24px_rgba(26,15,0,0.18)]"
        >
          {filtered.map((o, i) => {
            const selected = o === value;
            return (
              <li
                key={o}
                role="option"
                aria-selected={selected}
                onMouseDown={(e) => {
                  e.preventDefault();
                  commit(o);
                }}
                onMouseEnter={() => setHighlight(i)}
                className={`cursor-pointer font-raleway text-[13px] px-2.5 py-2 ${
                  highlight === i ? "bg-[#ff8905]/15" : ""
                } ${selected ? "text-[#ff8905] font-semibold" : "text-[#1A0F00]"}`}
              >
                {o}
              </li>
            );
          })}
          <li className="font-raleway text-[11px] text-[#8a7a5c] px-2.5 py-2 border-t border-[#1A0F00]/12">
            {filtered.length === 0
              ? "No standard size — custom value will be used"
              : "Or type any value in the box for a custom size"}
          </li>
        </ul>
      )}
    </div>
  );
}
