import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = "2024-01-01";

// Read-only client — used for all data fetching in pages
export const sanityClient = projectId
  ? createClient({ projectId, dataset, apiVersion, useCdn: process.env.NODE_ENV === "production" })
  : null;

// Write-enabled client — used only in server actions (contact form submissions)
export const sanityWriteClient =
  projectId && process.env.SANITY_API_WRITE_TOKEN
    ? createClient({
        projectId,
        dataset,
        apiVersion,
        useCdn: false,
        token: process.env.SANITY_API_WRITE_TOKEN,
      })
    : null;

export const sanityConfigured = Boolean(projectId);
