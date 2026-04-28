import { defineField, defineType } from "sanity";

export const productSchema = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" }, validation: (r) => r.required() }),
    defineField({ name: "subcategory", title: "Sub-category", type: "string", description: "e.g. Cable Trunking, Cable Trays, Cable Ladders" }),
    defineField({ name: "category", title: "Category", type: "string", description: "e.g. Cable Support Systems" }),
    defineField({ name: "categorySlug", title: "Category Slug", type: "string", description: "e.g. cable-support-systems" }),
    defineField({ name: "itemNo", title: "Item No.", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
    defineField({
      name: "image",
      title: "Main Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "thumbnails",
      title: "Additional Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      description: "Up to 4 additional product images shown as thumbnails",
    }),
    defineField({
      name: "video",
      title: "Product Video",
      type: "file",
      options: { accept: "video/*" },
      description: "MP4 video file for this product",
    }),
    defineField({
      name: "standards",
      title: "Applicable Standards",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description: "e.g. MS IEC 61084, SS 249, JKR EMAL, Others/Custom",
    }),
    defineField({
      name: "finishing",
      title: "Finishing Options",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "dimensions",
      title: "Available Dimensions",
      type: "object",
      fields: [
        defineField({ name: "height", title: "Height (mm) options", type: "array", of: [{ type: "string" }], options: { layout: "tags" } }),
        defineField({ name: "width", title: "Width (mm) options", type: "array", of: [{ type: "string" }], options: { layout: "tags" } }),
        defineField({ name: "length", title: "Length (mm) options", type: "array", of: [{ type: "string" }], options: { layout: "tags" } }),
        defineField({ name: "thickness", title: "Thickness (mm) options", type: "array", of: [{ type: "string" }], options: { layout: "tags" } }),
      ],
    }),
    defineField({
      name: "properties",
      title: "Properties",
      type: "object",
      fields: [
        defineField({ name: "materials", title: "Materials", type: "array", of: [{ type: "string" }], options: { layout: "tags" } }),
        defineField({ name: "finishings", title: "Finishing Descriptions", type: "array", of: [{ type: "string" }], options: { layout: "tags" } }),
        defineField({ name: "standards", title: "Standards", type: "array", of: [{ type: "string" }], options: { layout: "tags" } }),
        defineField({
          name: "components",
          title: "Component Reference Table",
          type: "array",
          of: [{
            type: "object",
            fields: [
              defineField({ name: "ref", title: "Reference Code", type: "string" }),
              defineField({ name: "description", title: "Description", type: "string" }),
            ],
            preview: { select: { title: "ref", subtitle: "description" } },
          }],
        }),
        defineField({ name: "notes", title: "Notes (below Component Reference)", type: "text", rows: 4, description: "e.g. preferred lengths, tolerances, included items" }),
      ],
    }),
    defineField({
      name: "accessories",
      title: "Accessories",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "no", title: "No.", type: "number" }),
          defineField({ name: "description", title: "Description", type: "string" }),
        ],
        preview: { select: { title: "description", subtitle: "no" } },
      }],
    }),
    defineField({ name: "order", title: "Display Order", type: "number", description: "Lower = appears first" }),
    defineField({ name: "dataSheetUrl", title: "Data Sheet URL", type: "url" }),
    defineField({ name: "certificateUrl", title: "Certificate URL", type: "url" }),
  ],
  preview: {
    select: { title: "name", subtitle: "subcategory", media: "image" },
  },
  orderings: [{ title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
});
