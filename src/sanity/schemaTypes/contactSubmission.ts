import { defineField, defineType } from "sanity";

export const contactSubmissionSchema = defineType({
  name: "contactSubmission",
  title: "Contact Submissions",
  type: "document",
  // Read-only in Studio — submissions come from the website form
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "company", title: "Company", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "subject", title: "Subject", type: "string" }),
    defineField({ name: "message", title: "Message", type: "text", rows: 5 }),
    defineField({ name: "submittedAt", title: "Submitted At", type: "datetime" }),
  ],
  preview: {
    select: { title: "name", subtitle: "email", description: "submittedAt" },
    prepare({ title, subtitle, description }) {
      return {
        title: title ?? "Anonymous",
        subtitle: subtitle,
        description: description ? new Date(description).toLocaleDateString() : "",
      };
    },
  },
  orderings: [{ title: "Newest First", name: "submittedAtDesc", by: [{ field: "submittedAt", direction: "desc" }] }],
});
