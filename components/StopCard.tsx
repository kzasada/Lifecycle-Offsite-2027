import Link from "next/link";
import type { Stop } from "@/lib/types";
import ThemeTag from "./ThemeTag";
import styles from "./StopCard.module.css";

export default function StopCard({ stop }: { stop: Stop }) {
  return (
    <article className={styles.card}>
      <p className={styles.meta}>
        Day {stop.day} · {stop.time}
      </p>
      <h3 className={styles.title}>
        <Link href={`/stops/${stop.slug}`} className={styles.link}>
          {stop.name}
        </Link>
      </h3>
      <p className={styles.desc}>{stop.description}</p>
      <div className={styles.tags}>
        {stop.themes.map((t) => (
          <ThemeTag key={t} theme={t} />
        ))}
      </div>
    </article>
  );
}
