
import React from 'react';
import ProductHeader from '@/components/product/ProductHeader';
import ProductForm from '@/components/product/ProductForm';
import { useProductForm } from '@/hooks/useProductForm';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const AddProduct: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const {
    formData,
    expandedSections,
    productImages,
    setProductImages,
    toggleSection,
    handleInputChange,
    setFormField,
    increaseStock,
    decreaseStock,
    handleCancel,
    handleSubmit,
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
        setFormField={setFormField}
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
