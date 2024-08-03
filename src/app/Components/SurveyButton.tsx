'use client';

import { useRouter } from 'next/navigation';

interface CreateSurveyButtonProps {
  projectId: number;

}

export default function CreateSurveyButton({ projectId }: CreateSurveyButtonProps) {
  const router = useRouter();

  const handleCreateSurvey = () => {
    // Navigate to the new survey's page
    router.push(`/project/${projectId}/survey`);
  };

  return (
    <button
      onClick={handleCreateSurvey}
      className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg transition duration-300 ease-in-out hover:bg-blue-600"
    >
      Create Survey
    </button>
  );
}
