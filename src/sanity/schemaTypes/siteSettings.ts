import { defineField, defineType } from "sanity";

// Singleton document — one per site
export const siteSettingsSchema = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    // ── Page Hero Images & Videos ─────────────────────────────────────
    defineField({
      name: "heroes",
      title: "Page Hero Media",
      type: "array",
      description:
        "Hero image or video for each page. Add one item per page using the exact key listed below. " +
        "Valid keys: home, about, products, projects, technology, quality, contact. " +
        "If a video is uploaded it plays automatically (muted, looped) replacing the image.",
      of: [{
        type: "object",
        fields: [
          defineField({
            name: "key",
            title: "Page Key",
            type: "string",
            description: "Exact key: home | about | products | projects | technology | quality | contact",
          }),
          defineField({ name: "image", title: "Hero Image", type: "image", options: { hotspot: true } }),
          defineField({ name: "video", title: "Hero Video (replaces image when set)", type: "file", options: { accept: "video/*" } }),
          defineField({ name: "videoThumbnail", title: "Video Poster / Thumbnail", type: "image", options: { hotspot: true } }),
        ],
        preview: { select: { title: "key", media: "image" } },
      }],
    }),

    // ── Section Images ────────────────────────────────────────────────
    defineField({
      name: "sectionImages",
      title: "Section / Module Images",
      type: "array",
      description:
        "Named images (or videos) used in specific sections across the site. " +
        "Add one item per slot using the exact key. Valid keys:\n" +
        "Homepage: home-legacy, home-projects-international, home-projects-local\n" +
        "About:    about-split-worker, about-split-tray, about-split-factory, about-legacy\n" +
        "Quality:  quality-controls, quality-field\n" +
        "If a video is uploaded it plays automatically replacing the image.",
      of: [{
        type: "object",
        fields: [
          defineField({
            name: "key",
            title: "Section Key",
            type: "string",
            description:
              "Exact key — e.g. home-legacy, about-split-worker, quality-controls. See description above for full list.",
          }),
          defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
          defineField({ name: "video", title: "Video (replaces image when set)", type: "file", options: { accept: "video/*" } }),
          defineField({ name: "alt", title: "Alt Text", type: "string" }),
        ],
        preview: { select: { title: "key", media: "image" } },
      }],
    }),

    // ── Contact Information ───────────────────────────────────────────
    defineField({
      name: "contact",
      title: "Contact Information",
      type: "object",
      fields: [
        defineField({ name: "phone1", title: "Phone 1", type: "string" }),
        defineField({ name: "phone2", title: "Phone 2", type: "string" }),
        defineField({ name: "fax", title: "Fax", type: "string" }),
        defineField({ name: "email", title: "General Email", type: "string" }),
        defineField({ name: "salesEmail", title: "Sales Email", type: "string" }),
        defineField({ name: "suppliesEmail", title: "Supplies Email", type: "string" }),
        defineField({ name: "hrEmail", title: "HR Email", type: "string" }),
        defineField({ name: "irEmail", title: "Investor Relations Email", type: "string" }),
        defineField({ name: "address", title: "Head Office Address", type: "text", rows: 4 }),
      ],
    }),

    // ── Office Locations ─────────────────────────────────────────────
    defineField({
      name: "locations",
      title: "Office Locations",
      description:
        "Displayed on the Contact page. When a location has an image it replaces the placeholder. " +
        "Add a Google Maps URL to make the card clickable.",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "name", title: "Location Name", type: "string" }),
          defineField({ name: "address", title: "Address", type: "text", rows: 3 }),
          defineField({ name: "image", title: "Location Photo", type: "image", options: { hotspot: true } }),
          defineField({ name: "mapsUrl", title: "Google Maps URL", type: "url" }),
        ],
        preview: { select: { title: "name", media: "image" } },
      }],
    }),
  ],
  preview: { prepare: () => ({ title: "Site Settings" }) },
});
