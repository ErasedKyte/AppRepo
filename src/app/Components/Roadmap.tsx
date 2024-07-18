'use client'; // Add this directive at the top
import React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { useRouter } from 'next/navigation';

const Roadmap = ({ activeStep }) => {
  const router = useRouter();

  const stages = [
    'Aquisition',
    'Approval',
    'Civil',
    'TI',
    'On Air',
    'Handover',
  ];

  const percentages = [
    '20%',
    '40%',
    '60%',
    '80%',
    '90%',
    '100%',
  ];

  const handleStepClick = (index) => {
    switch(index) {
      case 0:
        router.push('./pages/Acquisition');
        break;
      case 1:
        router.push('./pages/Approval');
        break;
      case 2:
        router.push('/pages/Civil');
        break;
      case 3:
        router.push('/pages/TI');
        break;
      case 4:
        router.push('/pages/OnAir');
        break;
      case 5:
        router.push('/pages/Handover');
        break;
      default:
        router.push('/');
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {stages.map((label, index) => (
          <Step key={label}>
            <StepLabel>
              <Tooltip title={percentages[index]} arrow>
                <Button onClick={() => handleStepClick(index)}>
                  {label}
                </Button>
              </Tooltip>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default Roadmap;
