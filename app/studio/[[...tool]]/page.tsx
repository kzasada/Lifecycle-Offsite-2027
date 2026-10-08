import type { Metadata, Viewport } from "next";
import StudioClient from "./StudioClient";

export const dynamic = "force-static";

export const metadata: Metadata = { title: "Studio", robots: { index: false } };
export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function StudioPage() {
  return <StudioClient />;
}
