import { notFound, redirect } from 'next/navigation';
import { db } from '../../db'; // Adjust the path if needed

interface DocumentShowPageProps {
  params: {
    id: string;
  };
  searchParams: {
    approve?: string; // Query parameter for approving the form
    undo?: string; // Query parameter for undoing the approval
  };
}

export default async function DocumentShowPage({ params, searchParams }: DocumentShowPageProps) {
  // Fetch the SarfForm entry by ID
  const sarfForm = await db.sarfForm.findUnique({
    where: { id: parseInt(params.id) }
  });

  // If no SarfForm is found, return a 404 page
  if (!sarfForm) {
    return notFound();
  }

  // Handle the approval action if the query parameter is present
  if (searchParams.approve === 'true') {
    await db.sarfForm.update({
      where: { id: sarfForm.id },
      data: { status: 'approved' }
    });

    // Redirect to the same page to reflect the updated status
    return redirect(`/documents/${params.id}`);
  }

  // Handle the undo approval action if the query parameter is present
  if (searchParams.undo === 'true') {
    await db.sarfForm.update({
      where: { id: sarfForm.id },
      data: { status: 'pending' }
    });

    // Redirect to the same page to reflect the updated status
    return redirect(`/documents/${params.id}`);
  }

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Sarf Form Details</h1>

      {/* Project Name */}
      <div className="border p-4 rounded-lg">
        <h2 className="font-bold mb-2">Project Name</h2>
        <div className="border border-gray-300 rounded-lg p-2 bg-gray-50">
          {sarfForm.ProjectName}
        </div>
      </div>

      {/* Section 1: Site Details */}
      <div className="border p-4 rounded-lg mt-4">
        <h2 className="font-bold mb-2">Section 1: Site Details - (Completed by Radio Network Planning)</h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Nominal Site ID', value: sarfForm.NominalSiteId },
            { label: 'Nominal Site Name', value: sarfForm.NominalSiteName },
            { label: 'Road Name', value: sarfForm.RoadName },
            { label: 'Block Number', value: sarfForm.BlockNumber },
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

      {/* Section 2: Nominal Position */}
      <div className="border p-4 rounded-lg mt-4">
        <h2 className="font-bold mb-2">Section 2: Nominal Position (Completed by Radio Network Planning)</h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Longitude (WGS84)', value: sarfForm.Longitude },
            { label: 'Latitude (WGS84)', value: sarfForm.Latitude },
            { label: 'Search Area Radius (m)', value: sarfForm.SearchRadius },
            { label: 'Cell Type (Micro/Macro)', value: sarfForm.CellType },
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

      {/* Antenna Details */}
      <div className="border p-4 rounded-lg mt-4">
        <h2 className="font-bold mb-2">Antenna Details</h2>
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Antenna Details</th>
              <th className="border p-2">Sector 1</th>
              <th className="border p-2">Sector 2</th>
              <th className="border p-2">Sector 3</th>
              <th className="border p-2">Sector 4</th>
            </tr>
          </thead>
          <tbody>
            {[
              'NoOfAntenna',
              'AntennaSize',
              'RequiredAntennaHeight',
              'AntennaAzimuth',
            ].map((detail) => (
              <tr key={detail}>
                <td className="border p-2">{detail.replace(/([A-Z])/g, ' $1').trim()}</td>
                {[1, 2, 3, 4].map((sector) => (
                  <td key={sector} className="border p-2">
                    <div className="border border-gray-300 rounded-lg p-2 bg-gray-50">
                      {sarfForm[`${detail}${sector}`]}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Submitted At and Status */}
      <div className="border p-4 rounded-lg mt-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold">Submitted At</label>
            <div className="border border-gray-300 rounded-lg p-2 bg-gray-50">
              {new Date(sarfForm.submittedAt).toLocaleString()}
            </div>
          </div>
          <div>
            <label className="block font-semibold">Status</label>
            <div className="border border-gray-300 rounded-lg p-2 bg-gray-50">
              {sarfForm.status}
            </div>
          </div>
        </div>
        {/* Approve or Undo Approval Button */}
        {sarfForm.status === 'pending' && (
          <div className="mt-4">
            <a 
              href={`?approve=true`} 
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Approve
            </a>
          </div>
        )}
        {sarfForm.status === 'approved' && (
          <div className="mt-4">
            <a 
              href={`?undo=true`} 
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Undo Approval
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
