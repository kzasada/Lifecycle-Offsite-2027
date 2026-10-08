export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2025-01-01";
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const isSanityConfigured = projectId.length > 0;
