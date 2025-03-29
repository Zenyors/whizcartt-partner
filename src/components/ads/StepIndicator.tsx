
import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  stepTitle: string;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, stepTitle }) => {
  return (
    <div className="flex items-center mb-6">
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white mr-3">
        {currentStep}
      </div>
      <div>
        <h2 className="font-medium">{stepTitle}</h2>
        <p className="text-sm text-gray-500">
          Step {currentStep} of 4
        </p>
      </div>
    </div>
  );
};

export default StepIndicator;
