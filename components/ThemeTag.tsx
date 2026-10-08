import styles from "./ThemeTag.module.css";

export default function ThemeTag({ theme }: { theme: string }) {
  return <span className={styles.tag}>{theme}</span>;
}
