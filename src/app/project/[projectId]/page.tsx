import { notFound } from 'next/navigation';
import { db } from '../../db'; // Adjust the path if needed

interface DocumentShowPageProps {
  params: {
    projectId: string;
    surveyFormId: string;
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
    select: { name: true}, // Ensure NominalSiteName is fetched
  });
  const Sarf = await db.sarfForm.findUnique({
    where: { id: projectId },
    select: { NominalSiteName: true, NominalSiteId: true }, // Ensure NominalSiteName is fetched
  });

  // If no Project is found, return a 404 page
  if (!project) {
    return notFound();
  }

  // Check if a survey already exists for this project
  const existingSurvey = await db.survey.findUnique({
    where: { projectId: projectId },
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Project Details</h1>
          <a href="/pages/Acquisition">
            <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600">
              Back
            </button>
          </a>
        </div>
        <p className="text-lg font-medium text-gray-700">Project Name: {project.name}</p>
        <p className="text-lg font-medium text-gray-700">Nominal Site Name: {Sarf?.NominalSiteName}</p>
        <p className="text-lg font-medium text-gray-700 mb-8">Nominal Site ID: {Sarf?.NominalSiteId}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <a
            href={`/project/${projectId}/sarfForm/${projectId}`}
            className="flex items-center justify-center bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            View SARF
          </a>
          {existingSurvey ? (
            <a
              href={`/project/${projectId}/survey/${existingSurvey.id}`}
              className="flex items-center justify-center bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out"
            >
              View Survey
            </a>
          ) : (
            <a
              href={`/project/${projectId}/survey`}
              className="flex items-center justify-center bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 transition duration-300 ease-in-out"
            >
              Create Survey Form
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
