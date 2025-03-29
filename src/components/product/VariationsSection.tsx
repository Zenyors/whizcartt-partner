
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ChevronRight, Plus } from 'lucide-react';

interface Variation {
  name: string;
  options: string[];
}

interface VariationsSectionProps {
  variations: Variation[];
  expanded: boolean;
  toggleSection: () => void;
  addVariation: () => void;
  updateVariationName: (index: number, name: string) => void;
  addVariationOption: (variationIndex: number) => void;
  updateVariationOption: (variationIndex: number, optionIndex: number, value: string) => void;
  removeVariationOption: (variationIndex: number, optionIndex: number) => void;
  removeVariation: (index: number) => void;
}

const VariationsSection: React.FC<VariationsSectionProps> = ({
  variations,
  expanded,
  toggleSection,
  addVariation,
  updateVariationName,
  addVariationOption,
  updateVariationOption,
  removeVariationOption,
  removeVariation
}) => {
  return (
    <div>
      <button 
        onClick={toggleSection}
        className="w-full flex justify-between items-center"
      >
        <div>
          <h3 className="font-medium text-sm">Add Variation {variations.length > 0 ? `(${variations.length})` : ''}</h3>
          <p className="text-xs text-gray-500">Add different variations of the products such as size, color, fabric option</p>
        </div>
        <ChevronRight className={`h-5 w-5 transition-transform ${expanded ? 'rotate-90' : ''}`} />
      </button>
      
      {expanded && (
        <div className="mt-3 space-y-5 pl-2">
          {variations.map((variation, variationIndex) => (
            <div key={variationIndex} className="border rounded-md p-3 space-y-3">
              <div className="flex items-center justify-between">
                <Input
                  placeholder="Variation name (e.g., Size, Color)"
                  value={variation.name}
                  onChange={(e) => updateVariationName(variationIndex, e.target.value)}
                  className="flex-1"
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => removeVariation(variationIndex)}
                  className="ml-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                </Button>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm">Options:</label>
                {variation.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex items-center gap-2">
                    <Input
                      placeholder={`Option ${optionIndex + 1}`}
                      value={option}
                      onChange={(e) => updateVariationOption(variationIndex, optionIndex, e.target.value)}
                      className="flex-1"
                    />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeVariationOption(variationIndex, optionIndex)}
                      className="h-8 w-8"
                      disabled={variation.options.length <= 1}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6 6 18"></path>
                        <path d="m6 6 12 12"></path>
                      </svg>
                    </Button>
                  </div>
                ))}
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => addVariationOption(variationIndex)}
                  className="w-full mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Option
                </Button>
              </div>
            </div>
          ))}
          
          <Button 
            variant="outline"
            onClick={addVariation}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Variation
          </Button>
        </div>
      )}
      <Separator className="mt-3" />
    </div>
  );
};

export default VariationsSection;
