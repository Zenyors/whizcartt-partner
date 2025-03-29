
import { useState } from 'react';
import { ProductFormData } from '@/types/product';

export function useProductCategories(
  formData: ProductFormData,
  setFormData: React.Dispatch<React.SetStateAction<ProductFormData>>
) {
  // Add a category
  const addCategory = (category: string) => {
    if (!formData.categories.includes(category) && category.trim() !== '') {
      setFormData({
        ...formData,
        categories: [...formData.categories, category]
      });
    }
  };

  // Remove a category
  const removeCategory = (category: string) => {
    setFormData({
      ...formData,
      categories: formData.categories.filter(c => c !== category)
    });
  };

  return {
    addCategory,
    removeCategory
  };
}
