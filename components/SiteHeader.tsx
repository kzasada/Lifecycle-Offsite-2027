import Link from "next/link";
import styles from "./SiteHeader.module.css";

export default function SiteHeader({ title }: { title: string }) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          {title}
        </Link>
        <nav aria-label="Main" className={styles.nav}>
          <Link href="/">Itinerary</Link>
          <Link href="/faq">FAQ</Link>
        </nav>
      </div>
    </header>
  );
}
