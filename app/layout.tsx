import type { Metadata } from "next";
import { fredoka, nunito } from "./fonts";
import "./tokens.css";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Lifecycle Offsite 2027", template: "%s | Lifecycle Offsite 2027" },
  description: "A fictional three-day team offsite itinerary. Practice project.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fredoka.variable} ${nunito.variable}`}>
      <body>{children}</body>
    </html>
  );
}
