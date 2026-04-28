import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemaTypes";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "replace-with-project-id";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export default defineConfig({
  name: "uli-corp",
  title: "U-LI Corporation — Content Studio",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            // Singleton: Site Settings
            S.listItem()
              .title("Site Settings")
              .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
            S.divider(),
            S.listItem().title("Products").schemaType("product").child(S.documentTypeList("product").title("Products")),
            S.listItem().title("Projects").schemaType("project").child(S.documentTypeList("project").title("Projects")),
            S.divider(),
            S.listItem()
              .title("Contact Submissions")
              .schemaType("contactSubmission")
              .child(
                S.documentTypeList("contactSubmission")
                  .title("Contact Submissions")
                  .defaultOrdering([{ field: "submittedAt", direction: "desc" }])
              ),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
