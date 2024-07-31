  // src/pages/documents/[id]/page.tsx

  import React from 'react';
  import { db } from '../../db'; // Adjust the path if needed
  import Link from 'next/link';
  import { Button } from '@mui/material';


  interface ProjectDetailsPageProps {
    params: {
      id: string; // Project ID
    };
  }

  export default async function ProjectDetailsPage({ params }: ProjectDetailsPageProps) {
    const { id } = params;
    const projectId = parseInt(id, 10);

    let project = null;

    try {
      if (projectId) {
        project = await db.project.findUnique({
          where: { id: projectId },
          include: {
            sarfForm: true,
            survey: true,
            sfa: true,
          },
        });
        if (!project) {
        }
        console.log("Fetched project details:", project); // Log project details
      }
    } catch (error) {
      console.error("Error fetching project details:", error);
    }

    return (
      <div className="container mx-auto p-4">
          <Link href={`Sarf/${id}`}><h1>ok</h1></Link>
  <p>{id}</p>
      </div>
    );
  }
