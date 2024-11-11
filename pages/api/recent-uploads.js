import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const dirPath = path.join(process.cwd(), 'Database');
  const folders = fs.readdirSync(dirPath).filter(folder => 
    fs.statSync(path.join(dirPath, folder)).isDirectory()
  );

  let recentUploads = [];
  folders.forEach(folder => {
    const metadataPath = path.join(dirPath, folder, 'metadata.json');
    if (fs.existsSync(metadataPath)) {
      const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
      recentUploads = recentUploads.concat(metadata);
    }
  });

  recentUploads.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));

  res.status(200).json(recentUploads);
}
