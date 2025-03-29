
import React from 'react';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ChevronRight } from 'lucide-react';

interface DateTimeSectionProps {
  title: string;
  description: string;
  expanded: boolean;
  toggleSection: () => void;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputType: 'date' | 'datetime-local';
  name: string;
  minDate?: string;
}

const DateTimeSection: React.FC<DateTimeSectionProps> = ({
  title,
  description,
  expanded,
  toggleSection,
  value,
  handleChange,
  inputType,
  name,
  minDate
}) => {
  return (
    <div>
      <button 
        onClick={toggleSection}
        className="w-full flex justify-between items-center"
      >
        <div>
          <h3 className="font-semibold text-sm">{title} {value ? `(${value})` : ''}</h3>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
        <ChevronRight className={`h-5 w-5 transition-transform ${expanded ? 'rotate-90' : ''}`} />
      </button>
      
      {expanded && (
        <div className="mt-3 pl-2">
          <Input
            type={inputType}
            name={name}
            value={value}
            onChange={handleChange}
            min={minDate}
          />
        </div>
      )}
      <Separator className="mt-3" />
    </div>
  );
};

export default DateTimeSection;
