"use client";

import { useEffect, useState } from "react";

type Point = { t: number; c: number };
type Meta = {
  price: number | null;
  prevClose: number | null;
  high52: number | null;
  low52: number | null;
  currency: string;
};
type ApiData = { points: Point[]; meta: Meta };

const RANGES = [
  { key: "1mo", label: "1M" },
  { key: "3mo", label: "3M" },
  { key: "6mo", label: "6M" },
  { key: "1y", label: "1Y" },
];

const BURSA_PROFILE =
  "https://www.bursamalaysia.com/trade/trading_resources/listing_directory/company-profile?stock_code=7133";

export default function SharePriceChart() {
  const [range, setRange] = useState("6mo");
  const [data, setData] = useState<ApiData | null>(null);
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    fetch(`/api/share-price?range=${range}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d: ApiData) => {
        if (cancelled) return;
        if (!d.points || d.points.length < 2) {
          setStatus("error");
          return;
        }
        setData(d);
        setStatus("ok");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, [range]);

  const W = 1000;
  const H = 420;
  const padL = 56;
  const padR = 16;
  const padT = 16;
  const padB = 44;

  const points = data?.points ?? [];
  const closes = points.map((p) => p.c);
  const lo = closes.length ? Math.min(...closes) : 0;
  const hi = closes.length ? Math.max(...closes) : 1;
  const pad = (hi - lo) * 0.12 || 0.1;
  const yMin = lo - pad;
  const yMax = hi + pad;

  const x = (i: number) => padL + (i / (points.length - 1)) * (W - padL - padR);
  const y = (v: number) => padT + (1 - (v - yMin) / (yMax - yMin)) * (H - padT - padB);

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(p.c).toFixed(1)}`)
    .join(" ");
  const areaPath = points.length
    ? `${linePath} L${x(points.length - 1).toFixed(1)},${(H - padB).toFixed(1)} L${x(0).toFixed(1)},${(H - padB).toFixed(1)} Z`
    : "";

  const gridVals = [0, 0.25, 0.5, 0.75, 1].map((f) => yMin + f * (yMax - yMin));
  const xLabelIdx = points.length
    ? Array.from(new Set([0, ...[0.25, 0.5, 0.75].map((f) => Math.round(f * (points.length - 1))), points.length - 1]))
    : [];
  const fmtDate = (ms: number) =>
    new Date(ms).toLocaleDateString("en-GB", { day: "2-digit", month: "short" });

  const price = data?.meta.price ?? (closes.length ? closes[closes.length - 1] : null);
  const prev = data?.meta.prevClose ?? null;
  const change = price != null && prev != null ? price - prev : null;
  const changePct = change != null && prev ? (change / prev) * 100 : null;
  const up = (change ?? 0) >= 0;

  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap items-end justify-between gap-3 mb-4">
        <div>
          {price != null ? (
            <div className="flex flex-wrap items-end gap-x-3 gap-y-1">
              <span className="font-typewriter text-[clamp(1.7rem,3vw,2.4rem)] leading-none text-[#1A0F00]">
                {price.toFixed(2)} <span className="text-[14px] text-[#5C4A30]">MYR</span>
              </span>
              {change != null && changePct != null && (
                <span
                  className="font-raleway text-[14px] font-semibold"
                  style={{ color: up ? "#2f7d32" : "#c0392b" }}
                >
                  {up ? "▲" : "▼"} {Math.abs(change).toFixed(2)} ({changePct.toFixed(2)}%)
                </span>
              )}
            </div>
          ) : (
            <span className="font-typewriter text-[20px] text-[#5C4A30]">MYX:ULICORP</span>
          )}
        </div>
        <div className="flex gap-1.5">
          {RANGES.map((r) => (
            <button
              key={r.key}
              type="button"
              onClick={() => setRange(r.key)}
              className={`font-raleway text-[12px] font-semibold px-3 py-1.5 rounded-md border transition-colors ${
                range === r.key
                  ? "bg-[#ff8905] text-white border-[#ff8905]"
                  : "border-[#1A0F00]/25 text-[#1A0F00] hover:border-[#ff8905]"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-[300px] flex items-center justify-center">
        {status === "loading" && (
          <p className="font-raleway text-[14px] text-[#5C4A30] py-20">Loading chart…</p>
        )}
        {status === "error" && (
          <div className="py-16 text-center">
            <p className="font-raleway text-[14px] text-[#5C4A30] mb-3">
              Live chart data is temporarily unavailable.
            </p>
            <a
              href={BURSA_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
              className="font-raleway text-[13px] font-semibold text-[#ff8905] hover:text-[#cc6e00] underline underline-offset-2"
            >
              View live share price on Bursa Malaysia ↗
            </a>
          </div>
        )}
        {status === "ok" && points.length > 1 && (
          <svg
            viewBox={`0 0 ${W} ${H}`}
            width="100%"
            className="block"
            style={{ height: "auto", fontFamily: "var(--font-raleway), sans-serif" }}
            role="img"
            aria-label="United U-LI Corporation Berhad share price chart"
          >
            <defs>
              <linearGradient id="spArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ff8905" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#ff8905" stopOpacity="0" />
              </linearGradient>
            </defs>
            {gridVals.map((v, i) => (
              <g key={i}>
                <line
                  x1={padL}
                  x2={W - padR}
                  y1={y(v)}
                  y2={y(v)}
                  stroke="#1A0F00"
                  strokeOpacity="0.08"
                  strokeWidth="1"
                />
                <text x={padL - 8} y={y(v) + 4} textAnchor="end" fontSize="13" fill="#5C4A30">
                  {v.toFixed(2)}
                </text>
              </g>
            ))}
            <path d={areaPath} fill="url(#spArea)" />
            <path
              d={linePath}
              fill="none"
              stroke="#ff8905"
              strokeWidth="2.5"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            {xLabelIdx.map((idx, i) => (
              <text
                key={idx}
                x={x(idx)}
                y={H - padB + 24}
                textAnchor={i === 0 ? "start" : i === xLabelIdx.length - 1 ? "end" : "middle"}
                fontSize="13"
                fill="#5C4A30"
              >
                {fmtDate(points[idx].t)}
              </text>
            ))}
          </svg>
        )}
      </div>
    </div>
  );
}
