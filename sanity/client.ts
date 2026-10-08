import "server-only";
import { createClient } from "next-sanity";
import { apiVersion, dataset, isSanityConfigured, projectId } from "./env";

// Server-only, published content, always fresh. No token: public dataset reads only.
export const sanityClient = isSanityConfigured
  ? createClient({ projectId, dataset, apiVersion, useCdn: false, perspective: "published" })
  : null;
