import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageBanner from "@/components/PageBanner";
import ThemeTag from "@/components/ThemeTag";
import { getDay, getStop, stops } from "@/lib/stops";
import styles from "./page.module.css";

type Props = { params: Promise<{ slug: string }> };

// dynamicParams stays at its default (true): Webflow Cloud 404s on `false`.
export function generateStaticParams() {
  return stops.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const stop = getStop((await params).slug);
  return stop ? { title: stop.name, description: stop.description } : { title: "Stop not found" };
}

export default async function StopPage({ params }: Props) {
  const stop = getStop((await params).slug);
  if (!stop) notFound();

  const day = getDay(stop.day);
  const i = stops.findIndex((s) => s.slug === stop.slug);
  const prev = stops[i - 1];
  const next = stops[i + 1];

  return (
    <main>
      <PageBanner
        title={stop.name}
        day={stop.day}
        eyebrow={`Day ${stop.day}${day ? `: ${day.title}` : ""} · ${stop.time}`}
      >
        <Link href="/">← All stops</Link>
      </PageBanner>
      <div className={styles.body}>
        <div className={styles.card}>
          <p className={styles.desc}>{stop.description}</p>
          <div className={styles.tags}>
            {stop.themes.map((t) => (
              <ThemeTag key={t} theme={t} />
            ))}
          </div>
        </div>
        <nav className={styles.nav} aria-label="Adjacent stops">
          {prev ? <Link href={`/stops/${prev.slug}`}>← {prev.name}</Link> : <span />}
          {next ? <Link href={`/stops/${next.slug}`}>{next.name} →</Link> : <span />}
        </nav>
      </div>
    </main>
  );
}
