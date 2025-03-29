
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import CategoryCard from './CategoryCard';

const CategoriesTab: React.FC = () => {
  return (
    <TabsContent value="categories" className="mt-4">
      <div className="grid grid-cols-2 gap-4">
        <CategoryCard title="Fruits" count={2} image="/placeholder.svg" />
        <CategoryCard title="Bakery" count={1} image="/placeholder.svg" />
        <CategoryCard title="Dairy" count={2} image="/placeholder.svg" />
        <CategoryCard title="Meat" count={1} image="/placeholder.svg" />
        <CategoryCard title="Vegetables" count={1} image="/placeholder.svg" />
      </div>
    </TabsContent>
  );
};

export default CategoriesTab;
