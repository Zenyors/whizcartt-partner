
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ChevronRight, Plus, Trash } from 'lucide-react';

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
          <h3 className="font-semibold text-sm">Add Variations ({variations.length} Added)</h3>
          <p className="text-xs text-gray-500">Add variations like size, color etc.</p>
        </div>
        <ChevronRight className={`h-5 w-5 transition-transform ${expanded ? 'rotate-90' : ''}`} />
      </button>
      
      {expanded && (
        <div className="mt-3 space-y-4 pl-2">
          {variations.map((variation, variationIndex) => (
            <div key={variationIndex} className="border rounded-md p-3">
              <div className="flex items-center justify-between mb-2">
                <Input
                  placeholder="Variation name (e.g. Size, Color)"
                  value={variation.name}
                  onChange={(e) => updateVariationName(variationIndex, e.target.value)}
                  className="flex-1 mr-2"
                />
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => removeVariation(variationIndex)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-2 mt-2">
                {variation.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex items-center">
                    <Input
                      placeholder="Option value (e.g. Small, Red)"
                      value={option}
                      onChange={(e) => updateVariationOption(variationIndex, optionIndex, e.target.value)}
                      className="flex-1 mr-2"
                    />
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => removeVariationOption(variationIndex, optionIndex)}
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
                  className="mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Option
                </Button>
              </div>
            </div>
          ))}
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={addVariation} 
            className="mt-2"
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
