
import React from 'react';
import ProductHeader from '@/components/product/ProductHeader';
import ProductForm from '@/components/product/ProductForm';
import { useProductForm } from '@/hooks/useProductForm';

const AddProduct: React.FC = () => {
  const {
    formData,
    expandedSections,
    productImages,
    setProductImages,
    toggleSection,
    handleInputChange,
    increaseStock,
    decreaseStock,
    handleCancel,
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
    removeVariation,
    handleSubmit
  } = useProductForm();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <ProductHeader 
        title="Add Product" 
        handleCancel={handleCancel} 
        handleSubmit={handleSubmit}
      />

      <ProductForm 
        formData={formData}
        expandedSections={expandedSections}
        productImages={productImages}
        setProductImages={setProductImages}
        toggleSection={toggleSection}
        handleInputChange={handleInputChange}
        increaseStock={increaseStock}
        decreaseStock={decreaseStock}
        addAttribute={addAttribute}
        updateAttribute={updateAttribute}
        removeAttribute={removeAttribute}
        addCategory={addCategory}
        removeCategory={removeCategory}
        toggleDiscount={toggleDiscount}
        updateDiscount={updateDiscount}
        addVariation={addVariation}
        updateVariationName={updateVariationName}
        addVariationOption={addVariationOption}
        updateVariationOption={updateVariationOption}
        removeVariationOption={removeVariationOption}
        removeVariation={removeVariation}
      />
    </div>
  );
};

export default AddProduct;
