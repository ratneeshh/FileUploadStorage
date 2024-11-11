import { useEffect, useState } from 'react';
import styles from '../styles/RecentUploads.module.css';
import { colors } from '../styles/colors';

export default function RecentUploads() {
  const [recentUploads, setRecentUploads] = useState([]);

  useEffect(() => {
    async function fetchUploads() {
      const res = await fetch('/api/recent-uploads');
      const data = await res.json();
      setRecentUploads(data);
    }
    fetchUploads();
  }, []);

  return (
    <div className={styles.recentUploads}>
      <h2 style={{ color: colors.secondaryText }}>Recent Uploads</h2>
      <ul className={styles.uploadList}>
        {recentUploads.map((upload, index) => (
          <li key={index} className={styles.uploadItem} style={{ borderColor: colors.cardBorder }}>
            {upload.originalname} - <a href={upload.link} className={styles.downloadLink} style={{ color: colors.link }}>Download</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
