// src/app/acquisition/page.tsx
import React from 'react';
import { db } from '../../db';
import FileUploadForm from '../../Components/FileUploadForm';

// This is a server-side component
export default async function AcquisitionPage() {
  const snippets = await db.documents.findMany();

  const rendered = snippets.map((documents) => {
    return (
      <div key={documents.id} className="p-4 border border-gray-300 rounded-lg shadow-sm">
        {documents.Docs}
      </div>
    );
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Acquisition Page</h1>
      <FileUploadForm />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rendered}
      </div>
    </div>
  );
}
