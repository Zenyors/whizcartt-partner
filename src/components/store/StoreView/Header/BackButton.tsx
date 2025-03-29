
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BackButtonProps {
  onBack: () => void;
}

export const BackButton: React.FC<BackButtonProps> = ({ onBack }) => (
  <Button variant="ghost" size="icon" onClick={onBack}>
    <ArrowLeft className="h-5 w-5" />
  </Button>
);
