// The default export was deprecated in @sanity/image-url — use the named
// export to silence the deprecation warning on every Sanity image render.
import { createImageUrlBuilder } from "@sanity/image-url";
import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({ projectId, dataset });

export function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source);
}
