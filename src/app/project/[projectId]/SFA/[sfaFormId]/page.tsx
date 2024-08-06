"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '../../../../db'; // Adjust the path to your db

const SFAFormDetailsPage = () => {
  const router = useRouter();
  const [formDetails, setFormDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [projectId, setProjectId] = useState<string | null>(null);
  const [sfaFormId, setSfaFormId] = useState<string | null>(null);

  useEffect(() => {
    const { query } = router;
    const projectId = query.projectId as string | undefined;
    const sfaFormId = query.sfaFormId as string | undefined;

    if (projectId && sfaFormId) {
      setProjectId(projectId);
      setSfaFormId(sfaFormId);
    } else {
      console.error('Project ID or SFA Form ID is missing in the query parameters.');
    }
  }, [router]);

  useEffect(() => {
    if (sfaFormId) {
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
    }
  }, [sfaFormId]);

  useEffect(() => {
    const handleApprovalActions = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const approve = urlParams.get('approve');
      const undo = urlParams.get('undo');

      if (sfaFormId) {
        if (approve === 'true') {
          await db.sFAForm.update({
            where: { id: Number(sfaFormId) },
            data: { status: 'approved' }, // Ensure status field exists in the SFAForm model
          });
          router.push(`/project/${projectId}/sfa/${sfaFormId}`);
        }

        if (undo === 'true') {
          await db.sFAForm.update({
            where: { id: Number(sfaFormId) },
            data: { status: 'pending' }, // Ensure status field exists in the SFAForm model
          });
          router.push(`/project/${projectId}/sfa/${sfaFormId}`);
        }
      }
    };

    handleApprovalActions();
  }, [sfaFormId, projectId, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!formDetails) {
    return <div>No details found for this SFA form.</div>;
  }

  const siteSelectionApproval = JSON.parse(formDetails.siteSelectionApproval || '[]');

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
          {siteSelectionApproval.map((team: any, teamIndex: number) => (
            <div key={team.team} className="mt-4">
              <h3 className="text-xl font-semibold">{team.team}</h3>
              <table className="w-full border-collapse mt-2 border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">Responsibility</th>
                    <th className="border border-gray-300 px-4 py-2">Acceptance</th>
                    <th className="border border-gray-300 px-4 py-2">Name</th>
                    <th className="border border-gray-300 px-4 py-2">Sign</th>
                    <th className="border border-gray-300 px-4 py-2">Date</th>
                    <th className="border border-gray-300 px-4 py-2">Comments</th>
                  </tr>
                </thead>
                <tbody>
                  {team.responsibilities.map((resp: any, respIndex: number) => (
                    <tr key={resp.responsibility}>
                      <td className="border border-gray-300 px-4 py-2">{resp.responsibility}</td>
                      <td className="border border-gray-300 px-4 py-2">{resp.acceptance}</td>
                      <td className="border border-gray-300 px-4 py-2">{resp.name}</td>
                      <td className="border border-gray-300 px-4 py-2">{resp.sign}</td>
                      <td className="border border-gray-300 px-4 py-2">{new Date(resp.date).toLocaleDateString()}</td>
                      <td className="border border-gray-300 px-4 py-2">{resp.comments}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <label className="block text-gray-700">Remarks</label>
          <p className="mt-1">{formDetails.remarks}</p>
        </div>

        <div className="mt-6 flex space-x-4">
          {formDetails.status === 'pending' && (
            <a
              href={`?approve=true`}
              className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Approve
            </a>
          )}
          {formDetails.status === 'approved' && (
            <a
              href={`?undo=true`}
              className="inline-block bg-red-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Undo Approval
            </a>
          )}
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
