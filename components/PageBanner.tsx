import styles from "./PageBanner.module.css";

type Props = { title: string; eyebrow?: string; day?: number; children?: React.ReactNode };

export default function PageBanner({ title, eyebrow, day, children }: Props) {
  return (
    <div className={styles.banner}>
      <div className={styles.inner}>
        {children}
        {eyebrow && (
          <p className={styles.eyebrow} data-day={day}>
            {eyebrow}
          </p>
        )}
        <h1 className={styles.title}>{title}</h1>
      </div>
    </div>
  );
}
