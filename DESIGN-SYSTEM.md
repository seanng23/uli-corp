# U-LI Corp — Design System Baseline

Reference for all page development. Every new page and section must follow these specs exactly.

---

## Colors

| Token | Hex | Usage |
|---|---|---|
| Surface | `#F5EDD6` | Background, card fills |
| Ink | `#1A0F00` | All primary text, borders, dividers |
| Ink Muted | `#5C4A30` | Secondary/caption text |
| Accent | `#ff8905` | Orange highlights, labels, hover |
| Accent Dark | `#cc6e00` | Hover state for accent |

---

## Container

```
.site-container
  max-width: 1400px
  margin: 0 auto
  padding: 0 20px   ← same on mobile and desktop
```

Every section wraps in `site-container`. No exceptions.

---

## Section Vertical Padding

| Usage | Class |
|---|---|
| Standard sections | `py-16` |
| Tighter sections (split layouts) | `py-14` |
| Compact sections | `py-10` |
| Stats band | `py-12` |

Default to `py-16` unless visual weight calls for tighter.

---

## Typography

### Font Families
- **Headings / decorative:** `font-typewriter` → American Typewriter, Courier New fallback
- **Body / labels:** `font-raleway` → Raleway, sans-serif fallback

### Heading Scale

| Level | Class | Usage |
|---|---|---|
| H1 (page hero) | `font-typewriter text-[clamp(2rem,4.5vw,5rem)] leading-[1.0] tracking-tight` | Hero titles only |
| H2 (section) | `font-typewriter text-[clamp(1.75rem,4.5vw,2.875rem)] leading-[1.05]` | All primary section headings |
| H2 (smaller) | `font-typewriter text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.1]` | Split-layout column headings |
| H3 (sub) | `font-typewriter text-[clamp(1.4rem,2.5vw,2rem)] leading-[1.1]` | Card/column subheadings |

All headings: `text-[#1A0F00]`

### Body Text Scale

| Size | Class | Usage |
|---|---|---|
| Large body | `font-raleway text-[20px] leading-relaxed` | Primary paragraphs (hero, split intros) |
| Standard body | `font-raleway text-[18px] leading-relaxed` | General section body text |
| Default body | `font-raleway text-[16px] leading-relaxed` | Cards, captions, column text |
| Small body | `font-raleway text-[15px] leading-relaxed` | Value/feature card descriptions |
| Label | `font-raleway text-[14px] leading-snug` | Stats labels, captions |
| Micro label | `font-raleway text-[11px] font-semibold tracking-widest uppercase` | Stat prefixes (OVER, ONGOING) |

Primary body color: `text-[#1A0F00]`
Muted body color: `text-[#5C4A30]`
Accent body color: `text-[#ff8905]`

---

## Dividers

### Horizontal (between sections)
```tsx
<Divider />   ← default
```
Renders a single `border-t-[4px] border-[#1A0F00]` inside site-container.

### Double line (hero areas)
Uses `/images/double-line.png` as a full-width image.

### Vertical (column separator)
Always a dedicated grid column, never a border on a content column:
```tsx
<div className="hidden lg:block bg-[#1A0F00] self-stretch" />
```
Grid template: `grid-cols-[1fr_4px_1fr]`

### Internal section dividers
`border-t-[4px] border-[#1A0F00]` with `pt-6` or `pt-8` above content.

### Grid cell borders
- Container: `border-[4px] border-[#1A0F00]`
- Each cell (except first): `border-l-[4px] border-[#1A0F00]`

All border thickness: **4px**. All border color: **#1A0F00**. No exceptions.

---

## Split Layouts (2-column with divider)

```tsx
<div className="grid grid-cols-1 lg:grid-cols-[1fr_4px_1fr] gap-0 lg:gap-x-14 items-stretch">
  {/* Left column */}
  <div> ... </div>

  {/* Vertical divider */}
  <div className="hidden lg:block bg-[#1A0F00] self-stretch" />

  {/* Right column */}
  <div> ... </div>
</div>
```

Gap values:
- `lg:gap-x-14` — standard (most sections)
- `lg:gap-x-12` — tighter (industries-style)
- `lg:gap-x-10` — compact (close splits)

Text within split columns has **no additional horizontal padding** — the grid gap alone handles divider breathing room.

---

## Buttons & Links

### Primary CTA
```tsx
<a className="btn-primary">Label</a>
```
Orange fill, cream text, 1rem × 2.5rem padding, 700 weight, uppercase, 0.05em tracking.

### Outline button
```tsx
<a className="btn-outline">Label</a>
```
2px `#1A0F00` border, transparent bg, inverts on hover.

### Text link
```tsx
<a className="link-underline text-[#1A0F00]">Label »</a>
```
Underline with 3px offset, 600 weight, 0.9rem, turns accent orange on hover.

---

## Animation

- **FadeUp** — single element fade+slide up on scroll. `delay` prop for stagger (0.1s increments).
- **StaggerGroup / StaggerItem** — wraps a grid; children animate in sequence (0.08s stagger default).

Use FadeUp for headings and body blocks. Use StaggerGroup for grids of cards/items.

---

## Image Patterns

```tsx
{/* Contained image (with fixed height) */}
<div className="relative w-full h-[400px]">
  <Image src="..." alt="..." fill className="object-cover object-center"
    sizes="(max-width: 1024px) 100vw, 50vw" />
</div>

{/* Full-height column image (stretches to match adjacent column) */}
<div className="relative h-[480px] lg:h-auto">
  <Image src="..." alt="..." fill className="object-cover object-center"
    sizes="(max-width: 1024px) 100vw, 50vw" />
</div>
```

Always use Next.js `<Image>` with `fill` + `object-cover`. Never hard-code pixel widths on images.

---

## Section Heading Block (standard pattern)

```tsx
<FadeUp className="text-center mb-4">
  <h2 className="font-typewriter text-[clamp(1.75rem,4.5vw,2.875rem)] leading-[1.05] text-[#1A0F00]">
    Section Title
  </h2>
</FadeUp>
<FadeUp delay={0.1} className="text-center mb-10">
  <p className="font-raleway text-[18px] text-[#1A0F00] leading-relaxed max-w-3xl mx-auto">
    Supporting description text.
  </p>
</FadeUp>
```

`max-w-3xl mx-auto` on description paragraphs when centered.

---

## Stats Block Pattern

```tsx
<StaggerGroup className="grid grid-cols-2 lg:grid-cols-4">
  <StaggerItem className="text-center">
    <p className="font-raleway text-[11px] font-semibold tracking-widest uppercase text-[#ff8905] mb-1">
      Over
    </p>
    <p className="font-typewriter text-[clamp(2rem,3.5vw,3.5rem)] leading-none text-[#1A0F00]">
      40,000
    </p>
    <p className="font-typewriter text-[clamp(1.4rem,2.2vw,2.2rem)] leading-none text-[#1A0F00]">
      MT
    </p>
    <p className="font-raleway text-[14px] text-[#5C4A30] mt-2">of steel processed annually</p>
  </StaggerItem>
</StaggerGroup>
```

---

## Grid Card Pattern (equal columns)

```tsx
<StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
  <StaggerItem className="...">
    ...
  </StaggerItem>
</StaggerGroup>
```

---

## Responsive Breakpoints

Only two breakpoints used:
- `lg:` — 1024px (primary — most layout switches)
- `sm:` / `md:` — secondary, grid column adjustments only

Mobile-first. Base = mobile. `lg:` = desktop.

---

## Checklist Before Building Any Section

- [ ] Wrapped in `site-container` with correct `py-` value
- [ ] Headings use correct clamp scale
- [ ] Body text 16–20px Raleway depending on prominence
- [ ] All borders exactly 4px `#1A0F00`
- [ ] Vertical divider is its own 4px grid column (not a border on content)
- [ ] Images use Next.js `<Image>` with `fill` + `object-cover`
- [ ] Animations use FadeUp or StaggerGroup
- [ ] No extra horizontal padding inside split columns (grid gap handles it)
- [ ] Buttons use `.btn-primary`, `.btn-outline`, or `.link-underline`
