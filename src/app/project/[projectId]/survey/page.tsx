import React from 'react';
import { redirect } from 'next/navigation';
import { db } from '../../../db'; // Adjust the path as needed

interface SurveyFormCreatePageProps {
  params: {
    projectId: string;
  };
}

export default async function SurveyFormCreatePage({ params }: SurveyFormCreatePageProps) {
  const projectId = parseInt(params.projectId, 10);

  // Check if the projectId is a valid number
  if (isNaN(projectId)) {
    return <p>Invalid project ID</p>; // Display an error if the projectId is invalid
  }

  // Fetch the project by ID
  const project = await db.project.findUnique({
    where: { id: projectId },
    select: { name: true },
  });

  // If no Project is found, display an error
  if (!project) {
    return <p>Project not found</p>;
  }

  // Define the action function for form submission
  async function createSurveyForm(formData: FormData) {
    'use server';

    // Extract form data
    const latLonOpt1 = formData.get('LatLonOpt1') as string;
    const buildingPlotOpt1 = formData.get('BuildingPlotOpt1') as string;
    const gateOpt1 = formData.get('GateOpt1') as string;
    const roadOpt1 = formData.get('RoadOpt1') as string;
    const blockOpt1 = formData.get('BlockOpt1') as string;
    const areaOpt1 = formData.get('AreaOpt1') as string;
    const latLonOpt2 = formData.get('LatLonOpt2') as string;
    const buildingPlotOpt2 = formData.get('BuildingPlotOpt2') as string;
    const gateOpt2 = formData.get('GateOpt2') as string;
    const roadOpt2 = formData.get('RoadOpt2') as string;
    const blockOpt2 = formData.get('BlockOpt2') as string;
    const areaOpt2 = formData.get('AreaOpt2') as string;
    const latLonOpt3 = formData.get('LatLonOpt3') as string;
    const buildingPlotOpt3 = formData.get('BuildingPlotOpt3') as string;
    const gateOpt3 = formData.get('GateOpt3') as string;
    const roadOpt3 = formData.get('RoadOpt3') as string;
    const blockOpt3 = formData.get('BlockOpt3') as string;
    const areaOpt3 = formData.get('AreaOpt3') as string;
    const contactName = formData.get('ContactName') as string;
    const contactTel = formData.get('ContactTel') as string;
    const procurementComments = formData.get('ProcurementComments') as string;

    await db.survey.create({
      data: {
        projectId,
        latLonOpt1,
        buildingPlotOpt1,
        gateOpt1,
        roadOpt1,
        blockOpt1,
        areaOpt1,
        latLonOpt2,
        buildingPlotOpt2,
        gateOpt2,
        roadOpt2,
        blockOpt2,
        areaOpt2,
        latLonOpt3,
        buildingPlotOpt3,
        gateOpt3,
        roadOpt3,
        blockOpt3,
        areaOpt3,
        contactName,
        contactTel,
        procurementComments,
      },
    });

    // Redirect after form submission
    redirect('/');
  }

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h3 className="font-bold text-xl mb-6 text-center">Create a Survey Form</h3>
      <form action={createSurveyForm} method="POST" className="space-y-4">
        <div className="border p-4 rounded-lg">
          <h2 className="font-bold mb-2">Survey Details</h2>
          <div className="grid grid-cols-2 gap-4">
            {/* Option 1 Fields */}
            <div>
              <label className="block font-semibold" htmlFor="LatLonOpt1">Latitude/Longitude Option 1</label>
              <input
                type="text"
                name="LatLonOpt1"
                id="LatLonOpt1"
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block font-semibold" htmlFor="BuildingPlotOpt1">Building Plot Option 1</label>
              <input
                type="text"
                name="BuildingPlotOpt1"
                id="BuildingPlotOpt1"
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block font-semibold" htmlFor="GateOpt1">Gate Option 1</label>
              <input
                type="text"
                name="GateOpt1"
                id="GateOpt1"
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block font-semibold" htmlFor="RoadOpt1">Road Option 1</label>
              <input
                type="text"
                name="RoadOpt1"
                id="RoadOpt1"
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block font-semibold" htmlFor="BlockOpt1">Block Option 1</label>
              <input
                type="text"
                name="BlockOpt1"
                id="BlockOpt1"
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block font-semibold" htmlFor="AreaOpt1">Area Option 1</label>
              <input
                type="text"
                name="AreaOpt1"
                id="AreaOpt1"
                className="w-full border rounded p-2"
                required
              />
            </div>

            {/* Repeat the fields for Option 2 and Option 3 */}
            <div>
              <label className="block font-semibold" htmlFor="LatLonOpt2">Latitude/Longitude Option 2</label>
              <input
                type="text"
                name="LatLonOpt2"
                id="LatLonOpt2"
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block font-semibold" htmlFor="BuildingPlotOpt2">Building Plot Option 2</label>
              <input
                type="text"
                name="BuildingPlotOpt2"
                id="BuildingPlotOpt2"
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block font-semibold" htmlFor="GateOpt2">Gate Option 2</label>
              <input
                type="text"
                name="GateOpt2"
                id="GateOpt2"
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block font-semibold" htmlFor="RoadOpt2">Road Option 2</label>
              <input
                type="text"
                name="RoadOpt2"
                id="RoadOpt2"
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block font-semibold" htmlFor="BlockOpt2">Block Option 2</label>
              <input
                type="text"
                name="BlockOpt2"
                id="BlockOpt2"
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block font-semibold" htmlFor="AreaOpt2">Area Option 2</label>
              <input
                type="text"
                name="AreaOpt2"
                id="AreaOpt2"
                className="w-full border rounded p-2"
              />
            </div>

            <div>
              <label className="block font-semibold" htmlFor="LatLonOpt3">Latitude/Longitude Option 3</label>
              <input
                type="text"
                name="LatLonOpt3"
                id="LatLonOpt3"
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block font-semibold" htmlFor="BuildingPlotOpt3">Building Plot Option 3</label>
              <input
                type="text"
                name="BuildingPlotOpt3"
                id="BuildingPlotOpt3"
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block font-semibold" htmlFor="GateOpt3">Gate Option 3</label>
              <input
                type="text"
                name="GateOpt3"
                id="GateOpt3"
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block font-semibold" htmlFor="RoadOpt3">Road Option 3</label>
              <input
                type="text"
                name="RoadOpt3"
                id="RoadOpt3"
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block font-semibold" htmlFor="BlockOpt3">Block Option 3</label>
              <input
                type="text"
                name="BlockOpt3"
                id="BlockOpt3"
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block font-semibold" htmlFor="AreaOpt3">Area Option 3</label>
              <input
                type="text"
                name="AreaOpt3"
                id="AreaOpt3"
                className="w-full border rounded p-2"
              />
            </div>
          </div>
        </div>
        <div className="border p-4 rounded-lg">
          <h2 className="font-bold mb-2">Contact Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold" htmlFor="ContactName">Contact Name</label>
              <input
                type="text"
                name="ContactName"
                id="ContactName"
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block font-semibold" htmlFor="ContactTel">Contact Telephone</label>
              <input
                type="text"
                name="ContactTel"
                id="ContactTel"
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div className="col-span-2">
              <label className="block font-semibold" htmlFor="ProcurementComments">Procurement Comments</label>
              <textarea
                name="ProcurementComments"
                id="ProcurementComments"
                className="w-full border rounded p-2"
                rows={4}
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Create Survey Form
        </button>
      </form>
    </div>
  );
}
