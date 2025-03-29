
import React from 'react';
import { Button } from '@/components/ui/button';

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  isEdit: boolean;
  onNext: () => void;
  onPrevious: () => void;
  onCancel: () => void;
  onSubmit: () => void;
}

const StepNavigation: React.FC<StepNavigationProps> = ({
  currentStep,
  totalSteps,
  isEdit,
  onNext,
  onPrevious,
  onCancel,
  onSubmit
}) => {
  return (
    <div className="flex justify-between mt-8">
      {currentStep > 1 ? (
        <Button type="button" variant="outline" onClick={onPrevious}>
          Previous
        </Button>
      ) : (
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      )}
      
      {currentStep < totalSteps ? (
        <Button type="button" onClick={onNext}>
          Continue
        </Button>
      ) : (
        <Button type="button" onClick={onSubmit}>
          {isEdit ? "Update Advertisement" : "Create Advertisement"}
        </Button>
      )}
    </div>
  );
};

export default StepNavigation;
