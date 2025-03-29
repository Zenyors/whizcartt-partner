
import React from 'react';
import { ProductFormData, ExpandedSections } from '@/types/product';

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
  setFormField: (field: keyof ProductFormData, value: any) => void;
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
  setFormField,
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
  const handleBarcodeDetected = (barcodeData: { rawValue: string }) => {
    const barcodeValue = barcodeData.rawValue;
    console.log("Barcode detected:", barcodeValue);
    
    // You can implement product lookup from a database here
    // For demo, we'll populate with mock data based on the barcode
    
    // Example: If the barcode looks like a UPC/EAN
    if (/^\d{8,14}$/.test(barcodeValue)) {
      // For demo purposes, generate "fake" product data based on the barcode
      const mockProductData = generateMockProductData(barcodeValue);
      
      // Update form fields with the mock data
      setFormField('name', mockProductData.name);
      setFormField('price', mockProductData.price);
      setFormField('description', mockProductData.description);
      
      // Add a sample attribute
      if (mockProductData.barcode) {
        // Check if we already have a barcode attribute
        const existingBarcodeAttr = formData.attributes.findIndex(attr => 
          attr.name.toLowerCase() === 'barcode' || attr.name.toLowerCase() === 'upc');
          
        if (existingBarcodeAttr === -1) {
          // Add new barcode attribute
          updateAttribute(formData.attributes.length, 'name', 'Barcode');
          updateAttribute(formData.attributes.length, 'value', mockProductData.barcode);
          addAttribute();
        } else {
          // Update existing barcode attribute
          updateAttribute(existingBarcodeAttr, 'value', mockProductData.barcode);
        }
      }
    }
  };
  
  // Function to generate mock product data based on barcode
  const generateMockProductData = (barcode: string) => {
    // Simple hash function for deterministic but "random-looking" values
    const hash = (str: string): number => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
      }
      return Math.abs(hash);
    };
    
    const productHash = hash(barcode);
    
    // Generate product name and description based on barcode hash
    const productTypes = ['Headphones', 'Smartphone', 'Laptop', 'Tablet', 'Camera', 'Speaker', 'Watch', 'Accessory'];
    const brands = ['TechPro', 'Nexus', 'Quantum', 'Elite', 'Prime', 'Horizon', 'Apex', 'Vertex'];
    
    const typeIndex = productHash % productTypes.length;
    const brandIndex = (productHash >> 4) % brands.length;
    const modelNumber = (productHash % 1000) + 1000;
    
    const name = `${brands[brandIndex]} ${productTypes[typeIndex]} ${modelNumber}`;
    
    // Generate price based on product type and a factor of the hash
    const basePrice = (((productHash % 100) + 20) * 10).toFixed(2);
    
    return {
      name,
      price: basePrice,
      description: `High-quality ${brands[brandIndex]} ${productTypes[typeIndex]} with premium features. Model ${modelNumber}.`,
      barcode
    };
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 pb-20">
      {/* Product Images */}
      <ProductImageUpload 
        productImages={productImages} 
        setProductImages={setProductImages}
        onBarcodeDetected={handleBarcodeDetected}
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
