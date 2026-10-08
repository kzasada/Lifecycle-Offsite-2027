import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.main}>
      <h1>Page not found</h1>
      <p>This page is not on the sitemap. It may have been moved, or it may never have been scheduled.</p>
      <Link href="/">Back to the itinerary</Link>
    </main>
  );
}
