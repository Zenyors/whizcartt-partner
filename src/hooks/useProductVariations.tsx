
import { useState } from 'react';
import { ProductFormData } from '@/types/product';

export function useProductVariations(
  formData: ProductFormData,
  setFormData: React.Dispatch<React.SetStateAction<ProductFormData>>
) {
  // Add a variation
  const addVariation = () => {
    setFormData({
      ...formData,
      variations: [...formData.variations, { name: '', options: [''] }]
    });
  };

  // Update variation name
  const updateVariationName = (index: number, name: string) => {
    const updatedVariations = [...formData.variations];
    updatedVariations[index].name = name;
    setFormData({
      ...formData,
      variations: updatedVariations
    });
  };

  // Add variation option
  const addVariationOption = (variationIndex: number) => {
    const updatedVariations = [...formData.variations];
    updatedVariations[variationIndex].options.push('');
    setFormData({
      ...formData,
      variations: updatedVariations
    });
  };

  // Update variation option
  const updateVariationOption = (variationIndex: number, optionIndex: number, value: string) => {
    const updatedVariations = [...formData.variations];
    updatedVariations[variationIndex].options[optionIndex] = value;
    setFormData({
      ...formData,
      variations: updatedVariations
    });
  };

  // Remove variation option
  const removeVariationOption = (variationIndex: number, optionIndex: number) => {
    const updatedVariations = [...formData.variations];
    updatedVariations[variationIndex].options = 
      updatedVariations[variationIndex].options.filter((_, i) => i !== optionIndex);
    setFormData({
      ...formData,
      variations: updatedVariations
    });
  };

  // Remove variation
  const removeVariation = (index: number) => {
    setFormData({
      ...formData,
      variations: formData.variations.filter((_, i) => i !== index)
    });
  };

  return {
    addVariation,
    updateVariationName,
    addVariationOption,
    updateVariationOption,
    removeVariationOption,
    removeVariation
  };
}
