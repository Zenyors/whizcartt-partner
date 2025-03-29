
import { useState } from 'react';
import { ProductFormData } from '@/types/product';

export function useProductDiscount(
  formData: ProductFormData,
  setFormData: React.Dispatch<React.SetStateAction<ProductFormData>>
) {
  // Toggle discount
  const toggleDiscount = () => {
    setFormData({
      ...formData,
      discount: {
        ...formData.discount,
        enabled: !formData.discount.enabled
      }
    });
  };

  // Update discount
  const updateDiscount = (field: 'type' | 'amount', value: string) => {
    setFormData({
      ...formData,
      discount: {
        ...formData.discount,
        [field]: value
      }
    });
  };

  return {
    toggleDiscount,
    updateDiscount
  };
}
