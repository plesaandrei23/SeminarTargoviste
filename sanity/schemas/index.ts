import { activitate } from "./activitate";
import { anunt } from "./anunt";
import { admitere } from "./admitere";
import { rezultate } from "./rezultate";
import { personal } from "./personal";
import { erasmus } from "./erasmus";
import { pagina } from "./pagina";
import { documentFile } from "./documentFile";
import { siteSettings } from "./siteSettings";
import { seoFields } from "./_objects/seoFields";
import { localizedImage } from "./_objects/localizedImage";

export const schemaTypes = [
  // Objects (reusable blocks)
  seoFields,
  localizedImage,
  // Document types
  activitate,
  anunt,
  admitere,
  rezultate,
  personal,
  erasmus,
  pagina,
  documentFile,
  // Singletons
  siteSettings,
];
