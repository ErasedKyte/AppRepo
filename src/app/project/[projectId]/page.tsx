import { notFound } from 'next/navigation';
import { db } from '../../db'; // Adjust the path if needed

interface DocumentShowPageProps {
  params: {
    projectId: string;
    sarfFormId: string;
  };
}

export default async function DocumentShowPage({ params }: DocumentShowPageProps) {
  const projectId = parseInt(params.projectId, 10);

  // Check if the projectId is a valid number
  if (isNaN(projectId)) {
    return notFound(); // Return a 404 page if the projectId is invalid
  }

  // Fetch the project by ID
  const project = await db.project.findUnique({
    where: { id: projectId },
    select: { name: true },
  });

  // If no Project is found, return a 404 page
  if (!project) {
    return notFound();
  }

    
  return (
        <><a href={`/pages/Acquisition`}>
      <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600">
        Back
      </button>
    </a><div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-md rounded-lg max-w-md w-full p-6">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Project Details</h1>
          <p className="text-xl font-semibold text-gray-700 mb-6">Project Name: {project.name}</p>
          <div className="flex justify-center">
            <a
              href={`/project/${projectId}/sarfForm/${params.projectId}`}
              className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 transition duration-300 ease-in-out"
            >
              View Sarf
            </a>
          </div>
        </div>
      </div></>
  );
}
