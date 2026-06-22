import { NextResponse } from "next/server";

// United U-LI on Bursa Malaysia = 7133.KL on Yahoo Finance.
// Bursa blocks iframe embedding and TradingView's free widget has no MYX data
// rights, so we proxy Yahoo's public chart feed server-side (avoids CORS) and
// render our own chart. Cached for 15 minutes to stay light on the upstream.
const RANGE_MAP: Record<string, { range: string; interval: string }> = {
  "1mo": { range: "1mo", interval: "1d" },
  "3mo": { range: "3mo", interval: "1d" },
  "6mo": { range: "6mo", interval: "1d" },
  "1y": { range: "1y", interval: "1d" },
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("range") ?? "6mo";
  const { range, interval } = RANGE_MAP[key] ?? RANGE_MAP["6mo"];
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/7133.KL?range=${range}&interval=${interval}`;

  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
      next: { revalidate: 900 },
    });
    if (!res.ok) {
      return NextResponse.json({ error: "upstream" }, { status: 502 });
    }
    const data = await res.json();
    const result = data?.chart?.result?.[0];
    const ts: number[] = result?.timestamp ?? [];
    const closes: (number | null)[] = result?.indicators?.quote?.[0]?.close ?? [];
    const points = ts
      .map((t, i) => ({ t: t * 1000, c: closes[i] }))
      .filter((p): p is { t: number; c: number } => typeof p.c === "number");

    if (points.length < 2) {
      return NextResponse.json({ error: "no-data" }, { status: 502 });
    }

    const meta = result.meta ?? {};
    return NextResponse.json({
      points,
      meta: {
        price: meta.regularMarketPrice ?? null,
        prevClose: meta.chartPreviousClose ?? null,
        high52: meta.fiftyTwoWeekHigh ?? null,
        low52: meta.fiftyTwoWeekLow ?? null,
        currency: meta.currency ?? "MYR",
      },
    });
  } catch {
    return NextResponse.json({ error: "fetch-failed" }, { status: 502 });
  }
}
