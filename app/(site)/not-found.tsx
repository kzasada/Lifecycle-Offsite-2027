import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main>
      <PageBanner title="Page not found" />
      <div className={styles.body}>
        <p>This page is not on the sitemap. It may have been moved, or it may never have been scheduled.</p>
        <Link href="/" className={styles.back}>
          Back to the itinerary
        </Link>
      </div>
    </main>
  );
}
