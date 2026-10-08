import Link from "next/link";
import styles from "./not-found.module.css";

export default function RootNotFound() {
  return (
    <main className={styles.main}>
      <h1>Page not found</h1>
      <p>This page is not on the sitemap.</p>
      <Link href="/">Back to the itinerary</Link>
    </main>
  );
}
