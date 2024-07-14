'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FileList: React.FC = () => {
  const [files, setFiles] = useState<string[]>([]);

  useEffect(() => {
    const fetchFiles = async () => {
      const response = await axios.get('/api/files');
      setFiles(response.data);
    };

    fetchFiles();
  }, []);

  return (
    <div>
      <h2>Uploaded Documents</h2>
      <ul>
        {files.map((file) => (
          <li key={file}>
            <a href={`/uploads/${file}`} target="_blank" rel="noopener noreferrer">
              {file}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;
