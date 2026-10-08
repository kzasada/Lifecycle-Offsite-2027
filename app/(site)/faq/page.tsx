import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import { getSiteContent } from "@/lib/content";
import styles from "./page.module.css";

export const metadata: Metadata = { title: "FAQ" };

export default async function FaqPage() {
  const { faqs } = await getSiteContent();
  return (
    <main>
      <PageBanner title="Frequently asked questions" />
      <div className={styles.body}>
      {faqs.length === 0 ? (
        <p className={styles.empty}>No questions yet. Check back after the next quarterly review.</p>
      ) : (
        faqs.map((f) => (
          <details key={f.slug} className={styles.item}>
            <summary className={styles.question}>{f.title}</summary>
            <p className={styles.answer}>{f.answer}</p>
          </details>
        ))
      )}
      </div>
    </main>
  );
}
