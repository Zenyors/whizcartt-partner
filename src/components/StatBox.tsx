
import React from 'react';

interface StatBoxProps {
  value: number;
  label: string;
  isHighlighted?: boolean;
}

const StatBox: React.FC<StatBoxProps> = ({ value, label, isHighlighted = false }) => {
  return (
    <div className={`flex flex-col items-center justify-center p-4 ${
      isHighlighted ? 'bg-whiz-green text-white' : 'bg-whiz-gray'
    } rounded-lg`}>
      <span className="text-3xl font-bold">{value.toString().padStart(2, '0')}</span>
      <span className="text-sm">{label}</span>
    </div>
  );
};

export default StatBox;
