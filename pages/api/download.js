import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { filePath } = req.query;
  const decodedPath = decodeURIComponent(filePath); // Decode any URL-encoded characters
  const fullPath = path.join(process.cwd(), 'Database', decodedPath);

  // Check if the file exists
  if (fs.existsSync(fullPath)) {
    res.setHeader('Content-Disposition', `attachment; filename="${path.basename(decodedPath)}"`);
    res.setHeader('Content-Type', 'application/octet-stream');
    fs.createReadStream(fullPath).pipe(res);
  } else {
    res.status(404).json({ error: 'File not found' });
  }
}
