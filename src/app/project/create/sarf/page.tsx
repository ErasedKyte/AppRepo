import React from 'react';
import { redirect } from 'next/navigation';
import { db } from '../../../db'; // Ensure this path is correct

export default function SarfFormCreatePage() {
  async function createSarfForm(formData: FormData) {
    'use server';

    // Extract form data
    const projectName = formData.get('ProjectName') as string;
    const nominalSiteId = formData.get('NominalSiteId') as string;
    const nominalSiteName = formData.get('NominalSiteName') as string;
    const roadName = formData.get('RoadName') as string;
    const blockNumber = Number(formData.get('BlockNumber'));
    const longitude = Number(formData.get('Longitude'));
    const latitude = Number(formData.get('Latitude'));
    const searchRadius = Number(formData.get('SearchRadius'));
    const cellType = formData.get('CellType') as string;
    const noOfAntenna1 = Number(formData.get('NoOfAntenna1'));
    const antennaSize1 = formData.get('AntennaSize1') as string;
    const requiredAntennaHeight1 = Number(formData.get('RequiredAntennaHeight1'));
    const antennaAzimuth1 = Number(formData.get('AntennaAzimuth1'));
    const noOfAntenna2 = Number(formData.get('NoOfAntenna2'));
    const antennaSize2 = formData.get('AntennaSize2') as string;
    const requiredAntennaHeight2 = Number(formData.get('RequiredAntennaHeight2'));
    const antennaAzimuth2 = Number(formData.get('AntennaAzimuth2'));
    const noOfAntenna3 = Number(formData.get('NoOfAntenna3'));
    const antennaSize3 = formData.get('AntennaSize3') as string;
    const requiredAntennaHeight3 = Number(formData.get('RequiredAntennaHeight3'));
    const antennaAzimuth3 = Number(formData.get('AntennaAzimuth3'));
    const noOfAntenna4 = formData.get('NoOfAntenna4') ? Number(formData.get('NoOfAntenna4')) : null;
    const antennaSize4 = formData.get('AntennaSize4') as string | null;
    const requiredAntennaHeight4 = formData.get('RequiredAntennaHeight4') ? Number(formData.get('RequiredAntennaHeight4')) : null;
    const antennaAzimuth4 = formData.get('AntennaAzimuth4') ? Number(formData.get('AntennaAzimuth4')) : null;

    // Log extracted form data
    console.log("Form Data Extracted:");
    console.log({
      projectName,
      nominalSiteId,
      nominalSiteName,
      roadName,
      blockNumber,
      longitude,
      latitude,
      searchRadius,
      cellType,
      noOfAntenna1,
      antennaSize1,
      requiredAntennaHeight1,
      antennaAzimuth1,
      noOfAntenna2,
      antennaSize2,
      requiredAntennaHeight2,
      antennaAzimuth2,
      noOfAntenna3,
      antennaSize3,
      requiredAntennaHeight3,
      antennaAzimuth3,
      noOfAntenna4,
      antennaSize4,
      requiredAntennaHeight4,
      antennaAzimuth4
    });

    // Create the project
    const newProject = await db.project.create({
      data: {
        name: projectName,
      },
    });

    // Log the new project data
    console.log("New Project Created:");
    console.log(newProject);

    // Create the SARF form using the project ID
    const newSarfForm = await db.sarfForm.create({
      data: {
        projectId: newProject.id, // Set the projectId field
        ProjectName: projectName,
        NominalSiteId: nominalSiteId,
        NominalSiteName: nominalSiteName,
        RoadName: roadName,
        BlockNumber: blockNumber,
        Longitude: longitude,
        Latitude: latitude,
        SearchRadius: searchRadius,
        CellType: cellType,
        NoOfAntenna1: noOfAntenna1,
        AntennaSize1: antennaSize1,
        RequiredAntennaHeight1: requiredAntennaHeight1,
        AntennaAzimuth1: antennaAzimuth1,
        NoOfAntenna2: noOfAntenna2,
        AntennaSize2: antennaSize2,
        RequiredAntennaHeight2: requiredAntennaHeight2,
        AntennaAzimuth2: antennaAzimuth2,
        NoOfAntenna3: noOfAntenna3,
        AntennaSize3: antennaSize3,
        RequiredAntennaHeight3: requiredAntennaHeight3,
        AntennaAzimuth3: antennaAzimuth3,
        NoOfAntenna4: noOfAntenna4,
        AntennaSize4: antennaSize4,
        RequiredAntennaHeight4: requiredAntennaHeight4,
        AntennaAzimuth4: antennaAzimuth4,
      },
    });

    // Log the new SARF form data
    console.log("New SARF Form Created:");
    console.log(newSarfForm);

    // Create the SFA form with null data using the same project ID
    const newSFAForm = await db.sFAForm.create({
      data: {
        projectId: newProject.id, // Set the projectId field
        siteOwnerContact: '',
        siteId: '',
        siteName: '',
        optionNo: '',
        siteLocation: '',
        siteType: '',
        traZone: '',
        siteCoordinates: '',
        address: '',
        surveyDate: new Date(), // Set to current date
        siteSelectionApproval: '',
        remarks: '',
      },
    });

    // Log the new SFA form data
    console.log("New SFA Form Created:");
    console.log(newSFAForm);

    redirect('/');
  }

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h3 className="font-bold text-xl mb-6 text-center">Create a Sarf Form</h3>
      <form action={createSarfForm} method="POST" className="space-y-4">
        <div className="border p-4 rounded-lg">
          <h2 className="font-bold mb-2">Project Name</h2>
          <div>
            <label className="block font-semibold" htmlFor="ProjectName">Project Name</label>
            <input
              type="text"
              name="ProjectName"
              id="ProjectName"
              className="w-full border rounded p-2"
              required
            />
          </div>
        </div>

        <div className="border p-4 rounded-lg">
          <h2 className="font-bold mb-2">Section 1: Site Details - (Completed by Radio Network Planning)</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold" htmlFor="NominalSiteId">Nominal Site ID</label>
              <input
                type="text"
                name="NominalSiteId"
                id="NominalSiteId"
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block font-semibold" htmlFor="NominalSiteName">Nominal Site Name</label>
              <input
                type="text"
                name="NominalSiteName"
                id="NominalSiteName"
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block font-semibold" htmlFor="RoadName">Road Name</label>
              <input
                type="text"
                name="RoadName"
                id="RoadName"
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block font-semibold" htmlFor="BlockNumber">Block Number</label>
              <input
                type="number"
                name="BlockNumber"
                id="BlockNumber"
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block font-semibold" htmlFor="Longitude">Longitude</label>
              <input
                type="number"
                name="Longitude"
                id="Longitude"
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block font-semibold" htmlFor="Latitude">Latitude</label>
              <input
                type="number"
                name="Latitude"
                id="Latitude"
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block font-semibold" htmlFor="SearchRadius">Search Radius (m)</label>
              <input
                type="number"
                name="SearchRadius"
                id="SearchRadius"
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block font-semibold" htmlFor="CellType">Cell Type</label>
              <input
                type="text"
                name="CellType"
                id="CellType"
                className="w-full border rounded p-2"
                required
              />
            </div>
          </div>
        </div>

        <div className="border p-4 rounded-lg">
          <h2 className="font-bold mb-2">Section 2: Antenna Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold" htmlFor="NoOfAntenna1">Number of Antennas in Sector 1</label>
              <input
                type="number"
                name="NoOfAntenna1"
                id="NoOfAntenna1"
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block font-semibold" htmlFor="AntennaSize1">Antenna Size in Sector 1</label>
              <input
                type="text"
                name="AntennaSize1"
                id="AntennaSize1"
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block font-semibold" htmlFor="RequiredAntennaHeight1">Required Antenna Height in Sector 1 (m)</label>
              <input
                type="number"
                name="RequiredAntennaHeight1"
                id="RequiredAntennaHeight1"
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block font-semibold" htmlFor="AntennaAzimuth1">Antenna Azimuth in Sector 1 (degrees)</label>
              <input
                type="number"
                name="AntennaAzimuth1"
                id="AntennaAzimuth1"
                className="w-full border rounded p-2"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold" htmlFor="NoOfAntenna2">Number of Antennas in Sector 2</label>
              <input
                type="number"
                name="NoOfAntenna2"
                id="NoOfAntenna2"
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block font-semibold" htmlFor="AntennaSize2">Antenna Size in Sector 2</label>
              <input
                type="text"
                name="AntennaSize2"
                id="AntennaSize2"
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block font-semibold" htmlFor="RequiredAntennaHeight2">Required Antenna Height in Sector 2 (m)</label>
              <input
                type="number"
                name="RequiredAntennaHeight2"
                id="RequiredAntennaHeight2"
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block font-semibold" htmlFor="AntennaAzimuth2">Antenna Azimuth in Sector 2 (degrees)</label>
              <input
                type="number"
                name="AntennaAzimuth2"
                id="AntennaAzimuth2"
                className="w-full border rounded p-2"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold" htmlFor="NoOfAntenna3">Number of Antennas in Sector 3</label>
              <input
                type="number"
                name="NoOfAntenna3"
                id="NoOfAntenna3"
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block font-semibold" htmlFor="AntennaSize3">Antenna Size in Sector 3</label>
              <input
                type="text"
                name="AntennaSize3"
                id="AntennaSize3"
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block font-semibold" htmlFor="RequiredAntennaHeight3">Required Antenna Height in Sector 3 (m)</label>
              <input
                type="number"
                name="RequiredAntennaHeight3"
                id="RequiredAntennaHeight3"
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block font-semibold" htmlFor="AntennaAzimuth3">Antenna Azimuth in Sector 3 (degrees)</label>
              <input
                type="number"
                name="AntennaAzimuth3"
                id="AntennaAzimuth3"
                className="w-full border rounded p-2"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold" htmlFor="NoOfAntenna4">Number of Antennas in Sector 4</label>
              <input
                type="number"
                name="NoOfAntenna4"
                id="NoOfAntenna4"
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block font-semibold" htmlFor="AntennaSize4">Antenna Size in Sector 4</label>
              <input
                type="text"
                name="AntennaSize4"
                id="AntennaSize4"
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block font-semibold" htmlFor="RequiredAntennaHeight4">Required Antenna Height in Sector 4 (m)</label>
              <input
                type="number"
                name="RequiredAntennaHeight4"
                id="RequiredAntennaHeight4"
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block font-semibold" htmlFor="AntennaAzimuth4">Antenna Azimuth in Sector 4 (degrees)</label>
              <input
                type="number"
                name="AntennaAzimuth4"
                id="AntennaAzimuth4"
                className="w-full border rounded p-2"
              />
            </div>
          </div>
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Create Sarf Form
        </button>
      </form>
    </div>
  );
}
