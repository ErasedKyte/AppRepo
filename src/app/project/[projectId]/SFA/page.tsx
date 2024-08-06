"use client";

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { db } from '../../../db'; // Adjust the path to your db

const SFAForm = () => {
  const { projectId } = useParams();
  const router = useRouter();

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
    // Table data
    siteSelectionApproval: [
      { team: 'RNP', responsibilities: [{ responsibility: 'Site Location', acceptance: '', name: '', sign: '', date: '', comments: '' }, { responsibility: 'Height', acceptance: '', name: '', sign: '', date: '', comments: '' }] },
      { team: 'PB3', responsibilities: [{ responsibility: 'Initial Landlord Approval', acceptance: '', name: '', sign: '', date: '', comments: '' }, { responsibility: 'Provide the required Documents', acceptance: '', name: '', sign: '', date: '', comments: '' }, { responsibility: 'Full authority', acceptance: '', name: '', sign: '', date: '', comments: '' }, { responsibility: 'Lease amount is acceptable', acceptance: '', name: '', sign: '', date: '', comments: '' }] },
      { team: 'RAN', responsibilities: [{ responsibility: 'Site Implementation', acceptance: '', name: '', sign: '', date: '', comments: '' }, { responsibility: 'Achieve required height', acceptance: '', name: '', sign: '', date: '', comments: '' }, { responsibility: 'MW feasibility', acceptance: '', name: '', sign: '', date: '', comments: '' }, { responsibility: 'Power connection', acceptance: '', name: '', sign: '', date: '', comments: '' }, { responsibility: 'Power source', acceptance: '', name: '', sign: '', date: '', comments: '' }, { responsibility: 'Power capacity', acceptance: '', name: '', sign: '', date: '', comments: '' }, { responsibility: 'Power route', acceptance: '', name: '', sign: '', date: '', comments: '' }, { responsibility: 'Access', acceptance: '', name: '', sign: '', date: '', comments: '' }, { responsibility: 'Building condition', acceptance: '', name: '', sign: '', date: '', comments: '' }, { responsibility: 'Building height', acceptance: '', name: '', sign: '', date: '', comments: '' }, { responsibility: 'Space', acceptance: '', name: '', sign: '', date: '', comments: '' }] },
    ],
    remarks: '',
  });

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Serialize the JSON data before saving
      const serializedApproval = JSON.stringify(formData.siteSelectionApproval);

      // Save the form data to the database
      await db.sFAForm.create({
        data: {
          ...formData,
          projectId: Number(projectId),
          surveyDate: new Date(formData.surveyDate), // Ensure the surveyDate is saved as a Date object
          siteSelectionApproval: serializedApproval, // Save serialized data
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
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700">Site Owner & Contact No.</label>
              <input
                type="text"
                name="siteOwnerContact"
                value={formData.siteOwnerContact}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                required
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
                required
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
                required
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
                required
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
                required
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
                required
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
                required
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
                required
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
                required
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
                required
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-gray-700">Site Selection Approval</label>
            <table className="min-w-full bg-white border">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Teams</th>
                  <th className="px-4 py-2 border">Responsibility</th>
                  <th className="px-4 py-2 border">Acceptance (Yes or No)</th>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Sign</th>
                  <th className="px-4 py-2 border">Date</th>
                  <th className="px-4 py-2 border">Comments</th>
                </tr>
              </thead>
              <tbody>
                {formData.siteSelectionApproval.map((team, teamIndex) => (
                  team.responsibilities.map((resp, respIndex) => (
                    <tr key={`${teamIndex}-${respIndex}`}>
                      {respIndex === 0 && (
                        <td className="px-4 py-2 border" rowSpan={team.responsibilities.length}>
                          {team.team}
                        </td>
                      )}
                      <td className="px-4 py-2 border">{resp.responsibility}</td>
                      <td className="px-4 py-2 border">
                        <input
                          type="text"
                          value={resp.acceptance}
                          onChange={(e) => handleTableChange(e, teamIndex, respIndex, 'acceptance')}
                          className="w-full border rounded px-2 py-1"
                        />
                      </td>
                      <td className="px-4 py-2 border">
                        <input
                          type="text"
                          value={resp.name}
                          onChange={(e) => handleTableChange(e, teamIndex, respIndex, 'name')}
                          className="w-full border rounded px-2 py-1"
                        />
                      </td>
                      <td className="px-4 py-2 border">
                        <input
                          type="text"
                          value={resp.sign}
                          onChange={(e) => handleTableChange(e, teamIndex, respIndex, 'sign')}
                          className="w-full border rounded px-2 py-1"
                        />
                      </td>
                      <td className="px-4 py-2 border">
                        <input
                          type="date"
                          value={resp.date}
                          onChange={(e) => handleTableChange(e, teamIndex, respIndex, 'date')}
                          className="w-full border rounded px-2 py-1"
                        />
                      </td>
                      <td className="px-4 py-2 border">
                        <input
                          type="text"
                          value={resp.comments}
                          onChange={(e) => handleTableChange(e, teamIndex, respIndex, 'comments')}
                          className="w-full border rounded px-2 py-1"
                        />
                      </td>
                    </tr>
                  ))
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6">
            <label className="block text-gray-700">Remarks</label>
            <textarea
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              rows={4}
              required
            />
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SFAForm;
