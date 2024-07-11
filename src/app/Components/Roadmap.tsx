import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';


const Roadmap: React.FC = () => {
  const stages = [
        'Aquisition' ,
        'Approval',
        'Civil',
        'TI',
        'On Air',
        'Handover',   
];

  return (
    <Box sx={{ width: '100%' }} className ='min-h-screen items-center jusify-center place-content-center'>
      <Stepper activeStep={3} alternativeLabel>
        {stages.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>  
    
  );
};

export default Roadmap;
