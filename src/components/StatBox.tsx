
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
    } rounded-lg shadow-sm`}>
      <span className="text-3xl font-normal text-center w-full h-10">{value.toString().padStart(2, '0')}</span>
      <span className="text-sm font-light text-center w-full -mt-1">{label}</span>
    </div>
  );
};

export default StatBox;
