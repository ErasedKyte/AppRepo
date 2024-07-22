// src/app/acquisition/FileUploadForm.tsx
"use client";

import React, { useState } from 'react';

export default function FileUploadForm() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Handle successful upload (e.g., refresh the document list)
        const newSnippet = await response.json();
        // Optionally, refresh the page or update the state to show the new document
      } else {
        // Handle error
      }
    }
  };

  return (
    <form onSubmit={handleUpload} className="mb-6">
      <input
        type="file"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none mb-4"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
      >
        Upload
      </button>
    </form>
  );
}
