// pages/index.tsx

import React from 'react';

const Process: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="grid grid-cols-1 gap-4 w-full max-w-sm">
        <button className="bg-acquisition text-white py-2 px-4 rounded hover:bg-blue-700">Acquisition</button>
        <button className="bg-approval text-white py-2 px-4 rounded hover:bg-green-700">Approval</button>
        <button className="bg-civil text-white py-2 px-4 rounded hover:bg-yellow-700">Civil</button>
        <button className="bg-ti text-white py-2 px-4 rounded hover:bg-red-700">TI</button>
        <button className="bg-handover text-white py-2 px-4 rounded hover:bg-purple-700">On Air and Handover</button>
      </div>
    </div>
  );
};

export default Process;
