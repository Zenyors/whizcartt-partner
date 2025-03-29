
import React from 'react';
import { Card } from '@/components/ui/card';

interface CategoryCardProps {
  title: string;
  count: number;
  image: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, count, image }) => {
  return (
    <Card className="overflow-hidden">
      <div className="h-24 relative">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <div className="text-center text-white">
            <h3 className="font-medium">{title}</h3>
            <p className="text-xs">{count} {count === 1 ? 'item' : 'items'}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CategoryCard;
