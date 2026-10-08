import type { Metadata } from "next";
import { fraunces, inter } from "./fonts";
import "./tokens.css";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Lifecycle Offsite 2027", template: "%s | Lifecycle Offsite 2027" },
  description: "A fictional three-day team offsite itinerary. Practice project.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
