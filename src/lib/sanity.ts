import { createClient } from "@sanity/client";
import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET || "production";

export const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-10-02",
  useCdn: false,
});

const builder = createImageUrlBuilder(client);
export function urlFor(source: SanityImageSource) {
  return builder.image(source).url();
}
