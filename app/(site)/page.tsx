import Link from "next/link";
import StopBrowser from "@/components/StopBrowser";
import { getSiteContent } from "@/lib/content";
import { getStop, stops } from "@/lib/stops";
import styles from "./page.module.css";

export default async function HomePage() {
  const { settings, featured, packing } = await getSiteContent();
  const picks = featured.filter((f) => getStop(f.stopSlug));

  return (
    <main>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.title}>{settings.heroTitle}</h1>
          <p className={styles.subtitle}>{settings.heroSubtitle}</p>
        </div>
      </section>

      {picks.length > 0 && (
        <section className={styles.section} aria-labelledby="featured">
          <h2 id="featured" className={styles.h2}>
            Featured stops
          </h2>
          <ul className={styles.featured}>
            {picks.map((f) => (
              <li key={f.slug} className={styles.featuredItem}>
                <Link href={`/stops/${f.stopSlug}`}>{f.title}</Link>
                <p>{f.blurb}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className={styles.section} aria-labelledby="itinerary">
        <h2 id="itinerary" className={styles.h2}>
          The itinerary
        </h2>
        <StopBrowser stops={stops} />
      </section>

      <section className={styles.section} aria-labelledby="packing">
        <h2 id="packing" className={styles.h2}>
          Packing list
        </h2>
        <ul className={styles.packing}>
          {packing.map((p) => (
            <li key={p.slug}>
              <strong>{p.title}</strong>
              {p.essential && <span className={styles.essential}>Essential</span>}
              {p.note && <div className={styles.note}>{p.note}</div>}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
