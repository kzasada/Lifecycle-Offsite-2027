"use client";

import dynamic from "next/dynamic";
import { isSanityConfigured } from "@/sanity/env";

// Client-only: keeps the Studio out of the server bundle.
const Studio = dynamic(() => import("./StudioInner"), {
  ssr: false,
  loading: () => <p style={{ padding: "2rem" }}>Loading Studio…</p>,
});

export default function StudioClient() {
  if (!isSanityConfigured) {
    return (
      <main style={{ padding: "2rem", maxWidth: "40rem", fontFamily: "var(--font-body)" }}>
        <h1>Sanity isn&apos;t connected yet</h1>
        <p>
          Set <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> in <code>.env.local</code> and restart the dev server.
          See the README for setup steps. The site runs on default content in the meantime.
        </p>
      </main>
    );
  }
  return <Studio />;
}
