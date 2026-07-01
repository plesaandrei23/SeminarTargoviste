import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";
import { apiVersion, dataset, projectId } from "./sanity/env";

export default defineConfig({
  basePath: "/studio",
  name: "seminar-targoviste",
  title: "Seminarul Teologic Târgoviște — CMS",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Conținut")
          .items([
            S.listItem()
              .title("Setări site")
              .child(
                S.editor()
                  .id("siteSettings")
                  .schemaType("siteSettings")
                  .documentId("siteSettings"),
              ),
            S.divider(),
            S.documentTypeListItem("activitate").title("Activități"),
            S.documentTypeListItem("anunt").title("Anunțuri"),
            S.documentTypeListItem("admitere").title("Admitere"),
            S.documentTypeListItem("rezultate").title("Rezultate examene"),
            S.divider(),
            S.documentTypeListItem("personal").title("Personal"),
            S.documentTypeListItem("erasmus").title("Erasmus+"),
            S.divider(),
            S.documentTypeListItem("hotarareCA").title("Hotărâri C.A."),
            S.documentTypeListItem("pagina").title("Pagini statice"),
            S.documentTypeListItem("documentFile").title("Documente (PDF)"),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
