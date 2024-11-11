import { useState } from 'react';
import styles from '../styles/UploadForm.module.css';
import { colors } from '../styles/colors';

export default function UploadForm({ onUploadComplete }) {
  const [file, setFile] = useState(null);
  const [link, setLink] = useState('');

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/upload', { method: 'POST', body: formData });
    const data = await res.json();
    setLink(data.link);
    onUploadComplete();
  };

  return (
    <div className={styles.uploadForm}>
      <input type="file" onChange={handleFileChange} className={styles.fileInput} />
      <button
        onClick={handleUpload}
        className={styles.uploadButton}
        style={{ backgroundColor: colors.buttonBg }}
      >
        Upload
      </button>
      {link && (
        <p className={styles.successMessage} style={{ color: colors.primaryText }}>
          File uploaded successfully! Access it <a href={link} style={{ color: colors.link }}>here</a>.
        </p>
      )}
    </div>
  );
}
