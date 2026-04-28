import { defineField, defineType } from "sanity";

const CATEGORIES = [
  "Industrial",
  "Commercial",
  "Infrastructure",
  "Energy & Utilities",
  "Government",
  "Transport",
  "Data Centre",
  "Healthcare",
  "Education",
  "Others",
];

export const projectSchema = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Project Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" } }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      options: { list: ["Local", "International"], layout: "radio" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: { list: CATEGORIES },
    }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({ name: "client", title: "Client / Owner", type: "string" }),
    defineField({ name: "year", title: "Year Completed", type: "number" }),
    defineField({
      name: "image",
      title: "Main Image",
      type: "image",
      options: { hotspot: true },
      description: "Primary image shown in the grid",
    }),
    defineField({
      name: "gallery",
      title: "Gallery Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      description: "Additional images for this project",
    }),
    defineField({
      name: "video",
      title: "Project Video",
      type: "file",
      options: { accept: "video/*" },
      description: "MP4 video file for this project",
    }),
    defineField({ name: "featured", title: "Featured Project", type: "boolean", initialValue: false }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  preview: {
    select: { title: "title", subtitle: "location", media: "image" },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: `${subtitle ?? ""}`, media };
    },
  },
  orderings: [{ title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
});
