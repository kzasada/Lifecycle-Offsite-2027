import styles from "./GhostTabs.module.css";

// Decorative nod to "zero open tabs": a browser tab strip where everything but the offsite is closed.
export default function GhostTabs() {
  return (
    <div className={styles.strip} aria-hidden="true">
      <span className={styles.dots}>
        <i />
        <i />
        <i />
      </span>
      <span className={`${styles.tab} ${styles.ghost}`}>Untitled</span>
      <span className={`${styles.tab} ${styles.ghost}`}>New Tab</span>
      <span className={`${styles.tab} ${styles.ghost}`}>Untitled 2</span>
      <span className={`${styles.tab} ${styles.active}`}>Offsite 2027</span>
    </div>
  );
}
