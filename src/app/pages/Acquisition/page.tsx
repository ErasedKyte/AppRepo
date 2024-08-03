// src/pages/acquisition/page.tsx

import React from 'react';
import { db } from '../../db'; // Adjust the import path if needed
import Link from 'next/link';
import { Button } from '@mui/material';

// This is a server-side component
export default async function AcquisitionPage() {
  // Fetch data from the database
  const snippets = await db.sarfForm.findMany();

  // Render the SARF forms
  const rendered = snippets.map((sarfForm) => {
    // Determine the status color class based on the status value
    const statusColorClass = sarfForm.status === 'approved' ? 'text-green-500' : 'text-orange-500';

    // Convert status to display text
    const displayStatus = sarfForm.status.charAt(0).toUpperCase() + sarfForm.status.slice(1);

    return (
      <Link 
        key={sarfForm.id} 
        href={`/project/${sarfForm.id}`}
        className="p-4 border border-gray-300 rounded-lg shadow-sm flex justify-between items-center"
      >
        <div>
          <div className="font-semibold">{sarfForm.ProjectName}</div>
          <div className={`text-sm ${statusColorClass}`}>Status: {displayStatus}</div>
        </div>
        <div className="text-blue-500">View</div>
      </Link>
    );
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Acquisition Page</h1>
      <Link href={'/project/create/sarf'}>
        <Button variant="contained" color="primary">Start New Acquisition +</Button>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {rendered}
      </div>
    </div>
  );
}
