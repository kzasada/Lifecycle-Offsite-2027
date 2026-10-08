import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { basePath, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";

// Exactly one workspace. Edit content in the embedded Studio at /studio.
export default defineConfig({
  name: "default",
  title: "Lifecycle Offsite 2027",
  // Placeholder keeps the config loadable before Sanity is set up.
  projectId: projectId || "unset",
  dataset,
  basePath: `${basePath}/studio`,
  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter((t) => t.schemaType !== "siteSettings"),
  },
  document: {
    newDocumentOptions: (prev) => prev.filter((o) => o.templateId !== "siteSettings"),
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Site settings")
              .id("siteSettings")
              .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
            S.divider(),
            S.documentTypeListItem("featuredStop").title("Featured stops"),
            S.documentTypeListItem("faq").title("FAQs"),
            S.documentTypeListItem("packingItem").title("Packing items"),
          ]),
    }),
  ],
});
