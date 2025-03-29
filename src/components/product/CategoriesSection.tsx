
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ChevronRight } from 'lucide-react';

interface CategoriesSectionProps {
  categories: string[];
  expanded: boolean;
  toggleSection: () => void;
  addCategory: (category: string) => void;
  removeCategory: (category: string) => void;
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  categories,
  expanded,
  toggleSection,
  addCategory,
  removeCategory
}) => {
  // Predefined categories
  const availableCategories = ['Groceries', 'Electronics', 'Fashion', 'Health & Beauty', 'Home & Kitchen'];

  return (
    <div>
      <button 
        onClick={toggleSection}
        className="w-full flex justify-between items-center"
      >
        <div>
          <h3 className="font-medium text-sm">Add Categories {categories.length > 0 ? `(${categories.length})` : ''}</h3>
          <p className="text-xs text-gray-500">Add Categories to the product</p>
        </div>
        <ChevronRight className={`h-5 w-5 transition-transform ${expanded ? 'rotate-90' : ''}`} />
      </button>
      
      {expanded && (
        <div className="mt-3 space-y-3 pl-2">
          <div className="flex flex-wrap gap-2 mb-3">
            {categories.map((category, index) => (
              <div key={index} className="bg-gray-100 rounded-full px-3 py-1 flex items-center">
                <span className="text-sm">{category}</span>
                <button
                  onClick={() => removeCategory(category)}
                  className="ml-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                </button>
              </div>
            ))}
          </div>
          
          <div>
            <label className="block text-sm mb-1">Select or add categories</label>
            <div className="grid grid-cols-2 gap-2">
              {availableCategories.map((category) => (
                <Button
                  key={category}
                  variant="outline"
                  className={`text-left justify-start ${categories.includes(category) ? 'bg-gray-100' : ''}`}
                  onClick={() => 
                    categories.includes(category) 
                      ? removeCategory(category) 
                      : addCategory(category)
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm mb-1">Add custom category</label>
            <div className="flex gap-2">
              <Input
                placeholder="Enter category name"
                id="customCategory"
              />
              <Button
                onClick={() => {
                  const input = document.getElementById('customCategory') as HTMLInputElement;
                  if (input && input.value) {
                    addCategory(input.value);
                    input.value = '';
                  }
                }}
              >
                Add
              </Button>
            </div>
          </div>
        </div>
      )}
      <Separator className="mt-3" />
    </div>
  );
};

export default CategoriesSection;
