import React from 'react';
import FileUpload from '../../Components/FileUpload';
import FileList from '../../Components/FileList';

const AcquisitionPage: React.FC = () => {
  return (
    <div>
      <h1>Acquisition Page</h1>
      <form>
        <input 
        name = "Docs" 
        id = "Docs"
        type="text" 
        />
      </form>
    </div>
  );
};

export default AcquisitionPage;
