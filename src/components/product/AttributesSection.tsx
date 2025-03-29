
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ChevronRight, Plus } from 'lucide-react';

interface Attribute {
  name: string;
  value: string;
}

interface AttributesSectionProps {
  attributes: Attribute[];
  expanded: boolean;
  toggleSection: () => void;
  addAttribute: () => void;
  updateAttribute: (index: number, field: 'name' | 'value', value: string) => void;
  removeAttribute: (index: number) => void;
}

const AttributesSection: React.FC<AttributesSectionProps> = ({
  attributes,
  expanded,
  toggleSection,
  addAttribute,
  updateAttribute,
  removeAttribute
}) => {
  return (
    <div>
      <button 
        onClick={toggleSection}
        className="w-full flex justify-between items-center"
      >
        <div>
          <h3 className="font-medium text-sm">Manage Custom Attributes ({attributes.length} Added)</h3>
          <p className="text-xs text-gray-500">Collect custom information such as measurement</p>
        </div>
        <ChevronRight className={`h-5 w-5 transition-transform ${expanded ? 'rotate-90' : ''}`} />
      </button>
      
      {expanded && (
        <div className="mt-3 space-y-3 pl-2">
          {attributes.map((attr, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                placeholder="Attribute name"
                value={attr.name}
                onChange={(e) => updateAttribute(index, 'name', e.target.value)}
                className="flex-1"
              />
              <Input
                placeholder="Value"
                value={attr.value}
                onChange={(e) => updateAttribute(index, 'value', e.target.value)}
                className="flex-1"
              />
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => removeAttribute(index)}
                className="h-8 w-8"
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
            onClick={addAttribute}
            className="mt-2"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Attribute
          </Button>
        </div>
      )}
      <Separator className="mt-3" />
    </div>
  );
};

export default AttributesSection;
