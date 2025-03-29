
import { useState } from 'react';
import { ProductFormData } from '@/types/product';

export function useProductAttributes(
  formData: ProductFormData,
  setFormData: React.Dispatch<React.SetStateAction<ProductFormData>>
) {
  // Add a custom attribute
  const addAttribute = () => {
    setFormData({
      ...formData,
      attributes: [...formData.attributes, { name: '', value: '' }]
    });
  };

  // Update an attribute
  const updateAttribute = (index: number, field: 'name' | 'value', value: string) => {
    const updatedAttributes = [...formData.attributes];
    updatedAttributes[index][field] = value;
    setFormData({
      ...formData,
      attributes: updatedAttributes
    });
  };

  // Remove an attribute
  const removeAttribute = (index: number) => {
    const updatedAttributes = formData.attributes.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      attributes: updatedAttributes
    });
  };

  return {
    addAttribute,
    updateAttribute,
    removeAttribute
  };
}
