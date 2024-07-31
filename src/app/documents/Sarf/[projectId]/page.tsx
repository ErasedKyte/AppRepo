// src/app/documents/Sarf/[projectId]/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { db } from '../../../db'; // Adjust the path according to your project structure

// Rest of your code

const SarfFormPage = () => {
  const pathname = usePathname();
  const projectId = pathname.split('/').pop(); // Extract project ID from URL
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    if (projectId) {
      const fetchProject = async () => {
        const fetchedProject = await db.sarfForm.findUnique({ where: { id: Number(projectId) } }); // Adjust this query to match your database schema
        setProject(fetchedProject);
      };

      fetchProject();
    }
  }, [projectId]);

  if (!project) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const data = {
      ProjectName: formData.get('ProjectName') as string,
      NominalSiteId: formData.get('NominalSiteId') as string,
      NominalSiteName: formData.get('NominalSiteName') as string,
      RoadName: formData.get('RoadName') as string,
      BlockNumber: Number(formData.get('BlockNumber')),
      Longitude: Number(formData.get('Longitude')),
      Latitude: Number(formData.get('Latitude')),
      SearchRadius: Number(formData.get('SearchRadius')),
      CellType: formData.get('CellType') as string,
      NoOfAntenna1: Number(formData.get('NoOfAntenna1')),
      AntennaSize1: formData.get('AntennaSize1') as string,
      RequiredAntennaHeight1: Number(formData.get('RequiredAntennaHeight1')),
      AntennaAzimuth1: Number(formData.get('AntennaAzimuth1')),
      NoOfAntenna2: Number(formData.get('NoOfAntenna2')),
      AntennaSize2: formData.get('AntennaSize2') as string,
      RequiredAntennaHeight2: Number(formData.get('RequiredAntennaHeight2')),
      AntennaAzimuth2: Number(formData.get('AntennaAzimuth2')),
      NoOfAntenna3: Number(formData.get('NoOfAntenna3')),
      AntennaSize3: formData.get('AntennaSize3') as string,
      RequiredAntennaHeight3: Number(formData.get('RequiredAntennaHeight3')),
      AntennaAzimuth3: Number(formData.get('AntennaAzimuth3')),
      NoOfAntenna4: Number(formData.get('NoOfAntenna4')),
      AntennaSize4: formData.get('AntennaSize4') as string,
      RequiredAntennaHeight4: Number(formData.get('RequiredAntennaHeight4')),
      AntennaAzimuth4: Number(formData.get('AntennaAzimuth4')),
    };

    await db.sarfForm.create({ data });
    window.location.href = '/'; // Redirect to the main page after submission
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h3 className="font-bold text-xl mb-6 text-center">Create a SARF Form</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Form fields */}
        <div className="border p-4 rounded-lg">
          <h2 className="font-bold mb-2">Project Name</h2>
          <div>
            <label className="block font-semibold" htmlFor="ProjectName">Project Name</label>
            <input
              type="text"
              name="ProjectName"
              id="ProjectName"
              className="w-full border rounded p-2"
              defaultValue={project.name}
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
              />
            </div>
            <div>
              <label className="block font-semibold" htmlFor="NominalSiteName">Nominal Site Name</label>
              <input
                type="text"
                name="NominalSiteName"
                id="NominalSiteName"
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block font-semibold" htmlFor="RoadName">Road Name</label>
              <input
                type="text"
                name="RoadName"
                id="RoadName"
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block font-semibold" htmlFor="BlockNumber">Block Number</label>
              <input
                type="text"
                name="BlockNumber"
                id="BlockNumber"
                className="w-full border rounded p-2"
              />
            </div>
          </div>
        </div>

        <div className="border p-4 rounded-lg">
          <h2 className="font-bold mb-2">Section 2: Nominal Position (Completed by Radio Network Planning)</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold" htmlFor="Longitude">Longitude (WGS84)</label>
              <input
                type="text"
                name="Longitude"
                id="Longitude"
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block font-semibold" htmlFor="Latitude">Latitude (WGS84)</label>
              <input
                type="text"
                name="Latitude"
                id="Latitude"
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block font-semibold" htmlFor="SearchRadius">Search Area Radius (m)</label>
              <input
                type="text"
                name="SearchRadius"
                id="SearchRadius"
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block font-semibold" htmlFor="CellType">Cell Type (Micro/Macro)</label>
              <input
                type="text"
                name="CellType"
                id="CellType"
                className="w-full border rounded p-2"
              />
            </div>
          </div>
        </div>

        <div className="border p-4 rounded-lg">
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
              {['NoOfAntenna', 'AntennaSize', 'RequiredAntennaHeight', 'AntennaAzimuth'].map((detail) => (
                <tr key={detail}>
                  <td className="border p-2">{detail}</td>
                  {[1, 2, 3, 4].map((sector) => (
                    <td key={sector} className="border p-2">
                      <input
                        type="text"
                        name={`${detail}${sector}`}
                        id={`${detail}${sector}`}
                        className="w-full border rounded p-2"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default SarfFormPage;
