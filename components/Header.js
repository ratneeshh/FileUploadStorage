import styles from '../styles/Header.module.css';
import { colors } from '../styles/colors';

export default function Header() {
  return (
    <header className={styles.header} style={{ background: colors.background }}>
      <h1 className={styles.title} style={{ color: colors.primaryText }}>
        File Upload & Storage Platform
      </h1>
      <a
        href="https://ratnesh.vercel.app/"
        className={styles.link}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: colors.link }}
      >
        Created by Ratnesh
      </a>
    </header>
  );
}
