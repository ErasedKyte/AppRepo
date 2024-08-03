import { notFound, redirect } from 'next/navigation';
import { db } from '../../../../db'; // Adjust the path if needed

interface DocumentShowPageProps {
  params: {
    projectId: string;
    surveyFormId: string;
  };
  searchParams: {
    approve?: string; // Query parameter for approving the form
    undo?: string; // Query parameter for undoing the approval
  };
}

export default async function DocumentShowPage({ params, searchParams }: DocumentShowPageProps) {
  // Fetch the Survey entry by ID
  const survey = await db.survey.findUnique({
    where: { id: parseInt(params.surveyFormId) }
  });

  // If no Survey is found, return a 404 page
  if (!survey) {
    return notFound();
  }

  // Handle the approval action if the query parameter is present
  if (searchParams.approve === 'true') {
    await db.survey.update({
      where: { id: survey.id },
      data: { status: 'approved' } // Ensure status field exists in the Survey model
    });

    // Redirect to the same page to reflect the updated status
    return redirect(`/project/${params.projectId}/survey/${params.surveyFormId}`);
  }

  // Handle the undo approval action if the query parameter is present
  if (searchParams.undo === 'true') {
    await db.survey.update({
      where: { id: survey.id },
      data: { status: 'pending' } // Ensure status field exists in the Survey model
    });

    // Redirect to the same page to reflect the updated status
    return redirect(`/project/${params.projectId}/survey/${params.surveyFormId}`);
  }

  return (
    <>
      <div>
        <a href={`/project/${params.projectId}`}>
          <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600">
            Back
          </button>
        </a>
      </div>
      <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Survey Details</h1>

        {/* Site Details */}
        <div className="border p-4 rounded-lg">
          <h2 className="font-bold mb-2">Site Details</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Latitude / Longitude Option 1', value: survey.latLonOpt1 },
              { label: 'Building Plot Option 1', value: survey.buildingPlotOpt1 },
              { label: 'Gate Option 1', value: survey.gateOpt1 },
              { label: 'Road Option 1', value: survey.roadOpt1 },
              { label: 'Block Option 1', value: survey.blockOpt1 },
              { label: 'Area Option 1', value: survey.areaOpt1 },
              { label: 'Latitude / Longitude Option 2', value: survey.latLonOpt2 },
              { label: 'Building Plot Option 2', value: survey.buildingPlotOpt2 },
              { label: 'Gate Option 2', value: survey.gateOpt2 },
              { label: 'Road Option 2', value: survey.roadOpt2 },
              { label: 'Block Option 2', value: survey.blockOpt2 },
              { label: 'Area Option 2', value: survey.areaOpt2 },
              { label: 'Latitude / Longitude Option 3', value: survey.latLonOpt3 },
              { label: 'Building Plot Option 3', value: survey.buildingPlotOpt3 },
              { label: 'Gate Option 3', value: survey.gateOpt3 },
              { label: 'Road Option 3', value: survey.roadOpt3 },
              { label: 'Block Option 3', value: survey.blockOpt3 },
              { label: 'Area Option 3', value: survey.areaOpt3 },
              { label: 'Contact Name', value: survey.contactName },
              { label: 'Contact Tel', value: survey.contactTel },
              { label: 'Procurement Comments', value: survey.procurementComments },
            ].map(({ label, value }) => (
              <div key={label}>
                <label className="block font-semibold">{label}</label>
                <div className="border border-gray-300 rounded-lg p-2 bg-gray-50">
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submitted At and Status */}
        <div className="border p-4 rounded-lg mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold">Submitted At</label>
              <div className="border border-gray-300 rounded-lg p-2 bg-gray-50">
                {new Date(survey.submittedAt).toLocaleString()}
              </div>
            </div>
            <div>
              <label className="block font-semibold">Status</label>
              <div className="border border-gray-300 rounded-lg p-2 bg-gray-50">
                {survey.status}
              </div>
            </div>
          </div>
          {/* Approve or Undo Approval Button */}
          {survey.status === 'pending' && (
            <div className="mt-4">
              <a
                href={`?approve=true`}
                className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Approve
              </a>
            </div>
          )}
          {survey.status === 'approved' && (
            <div className="mt-4">
              <a
                href={`?undo=true`}
                className="inline-block bg-red-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                Undo Approval
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
