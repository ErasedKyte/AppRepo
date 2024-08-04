import fs from 'fs';
import path from 'path';

const uploadDir = path.join(process.cwd(), 'uploads');

export default async (req, res) => {
  fs.readdir(uploadDir, (err, files) => {
    if (err) return res.status(500).json({ error: 'Error reading files' });
    res.status(200).json(files);
  });
};
