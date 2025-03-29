
import React from 'react';
import { ProductFormData, ExpandedSections } from '@/hooks/useProductForm';

// Import components
import ProductImageUpload from '@/components/product/ProductImageUpload';
import BasicProductDetails from '@/components/product/BasicProductDetails';
import AttributesSection from '@/components/product/AttributesSection';
import DiscountSection from '@/components/product/DiscountSection';
import CategoriesSection from '@/components/product/CategoriesSection';
import VariationsSection from '@/components/product/VariationsSection';
import DateTimeSection from '@/components/product/DateTimeSection';

interface ProductFormProps {
  formData: ProductFormData;
  expandedSections: ExpandedSections;
  productImages: string[];
  setProductImages: React.Dispatch<React.SetStateAction<string[]>>;
  toggleSection: (section: keyof ExpandedSections) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  increaseStock: () => void;
  decreaseStock: () => void;
  addAttribute: () => void;
  updateAttribute: (index: number, field: 'name' | 'value', value: string) => void;
  removeAttribute: (index: number) => void;
  addCategory: (category: string) => void;
  removeCategory: (category: string) => void;
  toggleDiscount: () => void;
  updateDiscount: (field: 'type' | 'amount', value: string) => void;
  addVariation: () => void;
  updateVariationName: (index: number, name: string) => void;
  addVariationOption: (variationIndex: number) => void;
  updateVariationOption: (variationIndex: number, optionIndex: number, value: string) => void;
  removeVariationOption: (variationIndex: number, optionIndex: number) => void;
  removeVariation: (index: number) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  formData,
  expandedSections,
  productImages,
  setProductImages,
  toggleSection,
  handleInputChange,
  increaseStock,
  decreaseStock,
  addAttribute,
  updateAttribute,
  removeAttribute,
  addCategory,
  removeCategory,
  toggleDiscount,
  updateDiscount,
  addVariation,
  updateVariationName,
  addVariationOption,
  updateVariationOption,
  removeVariationOption,
  removeVariation
}) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 pb-20">
      {/* Product Images */}
      <ProductImageUpload 
        productImages={productImages} 
        setProductImages={setProductImages}
      />

      {/* Basic Product Details */}
      <BasicProductDetails 
        formData={formData}
        handleInputChange={handleInputChange}
        increaseStock={increaseStock}
        decreaseStock={decreaseStock}
      />

      {/* Additional Sections */}
      <div className="space-y-6 mt-6">
        {/* Custom Attributes Section */}
        <AttributesSection 
          attributes={formData.attributes}
          expanded={expandedSections.attributes}
          toggleSection={() => toggleSection('attributes')}
          addAttribute={addAttribute}
          updateAttribute={updateAttribute}
          removeAttribute={removeAttribute}
        />

        {/* Discount Section */}
        <DiscountSection 
          discount={formData.discount}
          expanded={expandedSections.discount}
          toggleSection={() => toggleSection('discount')}
          toggleDiscount={toggleDiscount}
          updateDiscount={updateDiscount}
        />

        {/* Categories Section */}
        <CategoriesSection 
          categories={formData.categories}
          expanded={expandedSections.categories}
          toggleSection={() => toggleSection('categories')}
          addCategory={addCategory}
          removeCategory={removeCategory}
        />

        {/* Variations Section */}
        <VariationsSection 
          variations={formData.variations}
          expanded={expandedSections.variations}
          toggleSection={() => toggleSection('variations')}
          addVariation={addVariation}
          updateVariationName={updateVariationName}
          addVariationOption={addVariationOption}
          updateVariationOption={updateVariationOption}
          removeVariationOption={removeVariationOption}
          removeVariation={removeVariation}
        />

        {/* Expiry Date Section */}
        <DateTimeSection 
          title="Expiry Date"
          description="Add expiry date of the product"
          expanded={expandedSections.expiryDate}
          toggleSection={() => toggleSection('expiryDate')}
          value={formData.expiryDate}
          handleChange={handleInputChange}
          inputType="date"
          name="expiryDate"
          minDate={new Date().toISOString().split('T')[0]}
        />

        {/* Schedule Publishing Section */}
        <DateTimeSection 
          title="Schedule Publishing"
          description="Select the time when this product will be published"
          expanded={expandedSections.scheduledTime}
          toggleSection={() => toggleSection('scheduledTime')}
          value={formData.scheduledTime}
          handleChange={handleInputChange}
          inputType="datetime-local"
          name="scheduledTime"
          minDate={new Date().toISOString().slice(0, 16)}
        />
      </div>
    </div>
  );
};

export default ProductForm;
