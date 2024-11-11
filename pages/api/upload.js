import multer from 'multer';
import { nanoid } from 'nanoid';
import path from 'path';
import fs from 'fs';

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const date = new Date().toISOString().split('T')[0];
      const dir = `./Database/${date}`;
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      const uniqueName = `${nanoid()}-${file.originalname}`;
      cb(null, uniqueName);
    },
  }),
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|pdf/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only images and PDFs are allowed!'));
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadMiddleware = upload.single('file');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  await new Promise((resolve, reject) => {
    uploadMiddleware(req, res, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });

  const file = req.file;
  if (!file) {
    res.status(400).json({ error: 'No file uploaded' });
    return;
  }

  const date = new Date().toISOString().split('T')[0];
  const uniqueLink = `/Database/${date}/${file.filename}`;


  const fileData = {
    originalname: file.originalname,
    uploadDate: date,
    link: uniqueLink,
  };

  const metadataDir = `./Database/${date}/metadata.json`;
  let metadata = [];
  if (fs.existsSync(metadataDir)) {
    metadata = JSON.parse(fs.readFileSync(metadataDir, 'utf8'));
  }
  metadata.push(fileData);
  fs.writeFileSync(metadataDir, JSON.stringify(metadata, null, 2));

  res.status(200).json({ link: uniqueLink });
}
