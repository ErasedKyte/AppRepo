"use client";

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { db } from '../../../../db'; // Adjust the path to your db

const SFAFormDetailsPage = () => {
  const { projectId, sfaFormId } = useParams();
  const [formDetails, setFormDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchFormDetails = async () => {
      try {
        const sfaForm = await db.sFAForm.findUnique({
          where: {
            id: Number(sfaFormId),
          },
        });
        setFormDetails(sfaForm);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching SFA form details:', error);
        setLoading(false);
      }
    };

    fetchFormDetails();
  }, [sfaFormId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!formDetails) {
    return <div>No details found for this SFA form.</div>;
  }

  // Deserialize the siteSelectionApproval JSON string
  const siteSelectionApproval = JSON.parse(formDetails.siteSelectionApproval);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Site Feature Approval (SFA) Form Details</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700">Site Owner & Contact No.</label>
            <p className="mt-1">{formDetails.siteOwnerContact}</p>
          </div>
          <div>
            <label className="block text-gray-700">Site ID</label>
            <p className="mt-1">{formDetails.siteId}</p>
          </div>
          <div>
            <label className="block text-gray-700">Site Name</label>
            <p className="mt-1">{formDetails.siteName}</p>
          </div>
          <div>
            <label className="block text-gray-700">Option No.</label>
            <p className="mt-1">{formDetails.optionNo}</p>
          </div>
          <div>
            <label className="block text-gray-700">Site Location</label>
            <p className="mt-1">{formDetails.siteLocation}</p>
          </div>
          <div>
            <label className="block text-gray-700">Site Type</label>
            <p className="mt-1">{formDetails.siteType}</p>
          </div>
          <div>
            <label className="block text-gray-700">TRA Zone</label>
            <p className="mt-1">{formDetails.traZone}</p>
          </div>
          <div>
            <label className="block text-gray-700">Site Coordinates</label>
            <p className="mt-1">{formDetails.siteCoordinates}</p>
          </div>
          <div>
            <label className="block text-gray-700">Address</label>
            <p className="mt-1">{formDetails.address}</p>
          </div>
          <div>
            <label className="block text-gray-700">Survey Date</label>
            <p className="mt-1">{new Date(formDetails.surveyDate).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-gray-700">Site Selection Approval</label>
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Teams</th>
                <th className="px-4 py-2 border">Responsibility</th>
                <th className="px-4 py-2 border">Acceptance</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Sign</th>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Comments</th>
              </tr>
            </thead>
            <tbody>
              {siteSelectionApproval.map((team, teamIndex) => (
                team.responsibilities.map((resp, respIndex) => (
                  <tr key={`${teamIndex}-${respIndex}`}>
                    {respIndex === 0 && (
                      <td className="px-4 py-2 border" rowSpan={team.responsibilities.length}>
                        {team.team}
                      </td>
                    )}
                    <td className="px-4 py-2 border">{resp.responsibility}</td>
                    <td className="px-4 py-2 border">{resp.acceptance}</td>
                    <td className="px-4 py-2 border">{resp.name}</td>
                    <td className="px-4 py-2 border">{resp.sign}</td>
                    <td className="px-4 py-2 border">{new Date(resp.date).toLocaleDateString()}</td>
                    <td className="px-4 py-2 border">{resp.comments}</td>
                  </tr>
                ))
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6">
          <label className="block text-gray-700">Remarks</label>
          <p className="mt-1">{formDetails.remarks}</p>
        </div>

        <button
          onClick={() => router.push(`/project/${projectId}`)}
          className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Back to Project
        </button>
      </div>
    </div>
  );
};

export default SFAFormDetailsPage;
