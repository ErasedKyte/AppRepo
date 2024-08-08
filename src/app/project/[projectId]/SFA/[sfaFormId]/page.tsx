"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { db } from '../../../../db'; // Adjust the path to your db

const SFAForm = () => {
  const { projectId } = useParams();
  const router = useRouter();

  // Initialize form data with default values
  const [formData, setFormData] = useState({
    siteOwnerContact: '',
    siteId: '',
    siteName: '',
    optionNo: '',
    siteLocation: '',
    siteType: '',
    traZone: '',
    siteCoordinates: '',
    address: '',
    surveyDate: '',
    siteSelectionApproval: [
      { team: 'RNP', responsibilities: [{ responsibility: 'Site Location', acceptance: '', name: '', sign: '', date: '', comments: '' }, { responsibility: 'Height', acceptance: '', name: '', sign: '', date: '', comments: '' }] },
      { team: 'PB3', responsibilities: [{ responsibility: 'Initial Landlord Approval', acceptance: '', name: '', sign: '', date: '', comments: '' }, { responsibility: 'Provide the required Documents', acceptance: '', name: '', sign: '', date: '', comments: '' }, { responsibility: 'Full authority', acceptance: '', name: '', sign: '', date: '', comments: '' }, { responsibility: 'Lease amount is acceptable', acceptance: '', name: '', sign: '', date: '', comments: '' }] },
      { team: 'RAN', responsibilities: [{ responsibility: 'Site Implementation', acceptance: '', name: '', sign: '', date: '', comments: '' }, { responsibility: 'Achieve required height', acceptance: '', name: '', sign: '', date: '', comments: '' }, { responsibility: 'MW feasibility', acceptance: '', name: '', sign: '', date: '', comments: '' }, { responsibility: 'Power connection', acceptance: '', name: '', sign: '', date: '', comments: '' }, { responsibility: 'Power source', acceptance: '', name: '', sign: '', date: '', comments: '' }, { responsibility: 'Power capacity', acceptance: '', name: '', sign: '', date: '', comments: '' }, { responsibility: 'Power route', acceptance: '', name: '', sign: '', date: '', comments: '' }, { responsibility: 'Access', acceptance: '', name: '', sign: '', date: '', comments: '' }, { responsibility: 'Building condition', acceptance: '', name: '', sign: '', date: '', comments: '' }, { responsibility: 'Building height', acceptance: '', name: '', sign: '', date: '', comments: '' }, { responsibility: 'Space', acceptance: '', name: '', sign: '', date: '', comments: '' }] },
    ],
    remarks: '',
  });

  useEffect(() => {
    // Fetch existing data if any
    const fetchData = async () => {
      try {
        const existingData = await db.sFAForm.findUnique({
          where: { projectId: Number(projectId) }
        });
        if (existingData) {
          const parsedApproval = JSON.parse(existingData.siteSelectionApproval);
          setFormData({
            ...existingData,
            siteSelectionApproval: parsedApproval,
            surveyDate: existingData.surveyDate ? new Date(existingData.surveyDate).toISOString().split('T')[0] : '',
          });
        }
      } catch (error) {
        console.error('Error fetching form data:', error);
      }
    };

    if (projectId) {
      fetchData();
    }
  }, [projectId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleTableChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, teamIndex: number, responsibilityIndex: number, field: string) => {
    const { value } = e.target;
    setFormData(prevState => {
      const updatedTeams = [...prevState.siteSelectionApproval];
      updatedTeams[teamIndex].responsibilities[responsibilityIndex][field] = value;
      return { ...prevState, siteSelectionApproval: updatedTeams };
    });
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const serializedApproval = JSON.stringify(formData.siteSelectionApproval);

      await db.sFAForm.upsert({
        where: { projectId: Number(projectId) },
        update: {
          ...formData,
          surveyDate: formData.surveyDate ? new Date(formData.surveyDate) : null,
          siteSelectionApproval: serializedApproval,
        },
        create: {
          ...formData,
          projectId: Number(projectId),
          surveyDate: formData.surveyDate ? new Date(formData.surveyDate) : null,
          siteSelectionApproval: serializedApproval,
        },
      });
      router.push(`/project/${projectId}`);
    } catch (error) {
      console.error('Error saving form data:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Site Feature Approval (SFA) Form</h1>
        <form onSubmit={handleSave}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700">Site Owner & Contact No.</label>
              <input
                type="text"
                name="siteOwnerContact"
                value={formData.siteOwnerContact}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-gray-700">Site ID</label>
              <input
                type="text"
                name="siteId"
                value={formData.siteId}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-gray-700">Site Name</label>
              <input
                type="text"
                name="siteName"
                value={formData.siteName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-gray-700">Option No.</label>
              <input
                type="text"
                name="optionNo"
                value={formData.optionNo}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-gray-700">Site Location</label>
              <input
                type="text"
                name="siteLocation"
                value={formData.siteLocation}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-gray-700">Site Type</label>
              <input
                type="text"
                name="siteType"
                value={formData.siteType}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-gray-700">TRA Zone</label>
              <input
                type="text"
                name="traZone"
                value={formData.traZone}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-gray-700">Site Coordinates</label>
              <input
                type="text"
                name="siteCoordinates"
                value={formData.siteCoordinates}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-gray-700">Survey Date</label>
              <input
                type="date"
                name="surveyDate"
                value={formData.surveyDate}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Site Selection Approval</h2>
            {formData.siteSelectionApproval.map((team, teamIndex) => (
              <div key={teamIndex} className="mb-8">
                <h3 className="text-xl font-semibold text-gray-700">{team.team}</h3>
                <table className="min-w-full bg-white">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 font-semibold text-gray-700">Responsibility</th>
                      <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 font-semibold text-gray-700">Acceptance</th>
                      <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 font-semibold text-gray-700">Name</th>
                      <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 font-semibold text-gray-700">Sign</th>
                      <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 font-semibold text-gray-700">Date</th>
                      <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 font-semibold text-gray-700">Comments</th>
                    </tr>
                  </thead>
                  <tbody>
                    {team.responsibilities.map((responsibility, responsibilityIndex) => (
                      <tr key={responsibilityIndex}>
                        <td className="py-2 px-4 border-b border-gray-200">{responsibility.responsibility}</td>
                        <td className="py-2 px-4 border-b border-gray-200">
                          <input
                            type="text"
                            value={responsibility.acceptance}
                            onChange={(e) => handleTableChange(e, teamIndex, responsibilityIndex, 'acceptance')}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                          />
                        </td>
                        <td className="py-2 px-4 border-b border-gray-200">
                          <input
                            type="text"
                            value={responsibility.name}
                            onChange={(e) => handleTableChange(e, teamIndex, responsibilityIndex, 'name')}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                          />
                        </td>
                        <td className="py-2 px-4 border-b border-gray-200">
                          <input
                            type="text"
                            value={responsibility.sign}
                            onChange={(e) => handleTableChange(e, teamIndex, responsibilityIndex, 'sign')}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                          />
                        </td>
                        <td className="py-2 px-4 border-b border-gray-200">
                          <input
                            type="date"
                            value={responsibility.date}
                            onChange={(e) => handleTableChange(e, teamIndex, responsibilityIndex, 'date')}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                          />
                        </td>
                        <td className="py-2 px-4 border-b border-gray-200">
                          <textarea
                            value={responsibility.comments}
                            onChange={(e) => handleTableChange(e, teamIndex, responsibilityIndex, 'comments')}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <label className="block text-gray-700">Remarks</label>
            <textarea
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SFAForm;
