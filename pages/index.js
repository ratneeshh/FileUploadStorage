import Header from '../components/Header';
import UploadForm from '../components/UploadForm';
import RecentUploads from '../components/RecentUploads';
import '../styles/global.css';

export default function Home() {
  return (
    <div>
      <Header />
      <UploadForm onUploadComplete={() => {}} />
      <RecentUploads />
    </div>
  );
}
