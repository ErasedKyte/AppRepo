// src/components/ApproveButton.tsx
import React from 'react';

interface ApproveButtonProps {
  sarfFormId: number;
  onApprove: () => void;
}

export default function ApproveButton({ sarfFormId, onApprove }: ApproveButtonProps) {
  return (
    <button
      onClick={onApprove}
      className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors"
    >
      Approve
    </button>
  );
}
