# U-LI Corporation — Website

Corporate website for United U-Li Corporation Bhd. Built with Next.js 16, Sanity CMS, and deployed on Vercel.

**Live site:** https://v0-uli-corp.vercel.app
**Sanity Studio:** https://v0-uli-corp.vercel.app/studio

---

## Tech stack

| Layer | Tool |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| CMS | Sanity v3 (embedded Studio at `/studio`) |
| Styling | Tailwind CSS |
| Email | Resend (contact form) |
| Deployment | Vercel (auto-deploy on push to `main`) |

---

## Local setup

```bash
git clone https://github.com/seanng23/uli-corp.git
cd uli-corp
npm install
```

Create `.env.local` in the project root (get values from Sean):

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=obwf7oce
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_WRITE_TOKEN=<token from sanity.io/manage>
RESEND_API_KEY=<key from resend.com>
CONTACT_EMAIL=salescss@uli.com.my
NEXT_PUBLIC_SITE_URL=https://v0-uli-corp.vercel.app
```

```bash
npm run dev   # http://localhost:3000
```

Sanity Studio runs locally at http://localhost:3000/studio.

---

## Project structure

```
src/
  app/                    # Next.js App Router pages
    products/[slug]/      # Product detail pages (ISR, revalidates every 60s)
    studio/[[...tool]]/   # Embedded Sanity Studio
  components/
    products/             # ProductInnerClient — main product page component
    cart/                 # Enquiry cart (quote request flow)
    sections/             # Homepage + inner page sections
  data/
    products.ts           # Static fallback data + TypeScript types
  sanity/
    schemaTypes/          # Sanity document schemas
    lib/
      client.ts           # Sanity client config
      queries.ts          # GROQ queries
public/
  images/                 # Static assets (placeholder, certificate, textures)
```

---

## Content management (Sanity Studio)

### Products
Two independent data sections for dimensions — do not mix them:
- **Dimension Table** — rows for the Properties table (Components Reference, Nominal Size, Min/Max Thickness)
- **Dimension Selectors** — H/W/L/T dropdown values for the configurator panel

Finishing Colors default to Orange/White/Green/Red if left empty. Add extras via the Finishing Colors tag field.

### Projects
Add local and international projects here. The Projects page filters by the `location` field (Local / International).

### Site Settings
Single document controlling hero images, section images, contact info, and office locations.

---

## Deployment

Push to `main` → Vercel auto-deploys via GitHub integration.

Sanity content changes go live within 60 seconds via ISR — no redeploy needed.

Vercel env vars are managed at Project → Settings → Environment Variables (mirror of `.env.local`).

---

## Outstanding items (as of handoff)

1. **Real product images** — 9 products still have placeholder image. Upload via Studio.
2. **Resend sender domain** — contact form sends from `onboarding@resend.dev`. Verify a `@uli.com.my` sender domain in Resend, then update `RESEND_API_KEY` in Vercel env vars.
3. **Custom domain** — point the real domain to Vercel, then add it to Sanity CORS (sanity.io/manage → API → CORS Origins).
4. **Projects content** — Projects page is built but has no Sanity entries yet.
5. **Data sheets** — `dataSheetUrl` field exists on every product (URL type). Consider switching to a Sanity file upload field so the client can upload PDFs directly.
6. **Contact info** — placeholder phone/email in Site Settings needs real values from the client.
7. **Dimension data cleanup** — Cable Trunking has legacy component ref codes in the old Height/Width selector fields. Clear those and re-enter data in the correct fields (Dimension Table vs Dimension Selectors).

---

## Access to grant

| Platform | Action |
|---|---|
| GitHub | github.com/seanng23/uli-corp → Settings → Collaborators |
| Vercel | vercel.com → `sean-ngs-projects` team → Members |
| Sanity | sanity.io/manage → project `obwf7oce` → Members → Invite |
| Resend | resend.com → Team → invite or share API key securely |
