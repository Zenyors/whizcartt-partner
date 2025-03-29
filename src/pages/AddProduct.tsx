
import React, { useEffect } from 'react';
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
    removeVariation
  } = useProductForm();

  const handleSubmit = () => {
    if (!formData.name || !formData.price) {
      toast({
        title: "Missing information",
        description: "Please fill in at least the product name and price",
        variant: "destructive",
      });
      return;
    }
    
    // Validate discount if enabled
    if (formData.discount.enabled && !formData.discount.amount) {
      toast({
        title: "Invalid discount",
        description: "Please enter a discount amount",
        variant: "destructive",
      });
      return;
    }
    
    // Get existing products from localStorage
    const existingProducts = JSON.parse(localStorage.getItem('storeProducts') || '[]');
    
    // Create a new product with a unique ID
    const newProduct = {
      id: Date.now(),
      name: formData.name,
      price: formData.price,
      stock: formData.stock,
      description: formData.description,
      categories: formData.categories,
      discount: formData.discount,
      attributes: formData.attributes,
      variations: formData.variations,
      expiryDate: formData.expiryDate,
      scheduledTime: formData.scheduledTime,
      images: productImages
    };
    
    // Add the new product to the existing products
    const updatedProducts = [...existingProducts, newProduct];
    
    // Save to localStorage
    localStorage.setItem('storeProducts', JSON.stringify(updatedProducts));
    
    toast({
      title: "Product added",
      description: "Your product has been added successfully",
    });
    
    // Navigate back to store view
    navigate('/store-view');
  };

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
