
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

// Import components
import ProductHeader from '@/components/product/ProductHeader';
import ProductImageUpload from '@/components/product/ProductImageUpload';
import BasicProductDetails from '@/components/product/BasicProductDetails';
import AttributesSection from '@/components/product/AttributesSection';
import DiscountSection from '@/components/product/DiscountSection';
import CategoriesSection from '@/components/product/CategoriesSection';
import VariationsSection from '@/components/product/VariationsSection';
import DateTimeSection from '@/components/product/DateTimeSection';

interface ProductFormData {
  name: string;
  price: string;
  stock: number;
  description: string;
  categories: string[];
  discount: {
    enabled: boolean;
    type: 'percentage' | 'fixed';
    amount: string;
  };
  attributes: Array<{
    name: string;
    value: string;
  }>;
  variations: Array<{
    name: string;
    options: string[];
  }>;
  expiryDate: string;
  scheduledTime: string;
}

const AddProduct: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Default form data
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    price: '',
    stock: 0,
    description: '',
    categories: [],
    discount: {
      enabled: false,
      type: 'percentage',
      amount: ''
    },
    attributes: [],
    variations: [],
    expiryDate: '',
    scheduledTime: ''
  });

  // States for expandable sections
  const [expandedSections, setExpandedSections] = useState({
    attributes: false,
    discount: false,
    categories: false,
    variations: false,
    expiryDate: false,
    scheduledTime: false
  });

  // Images state
  const [productImages, setProductImages] = useState<string[]>([]);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const increaseStock = () => {
    setFormData({
      ...formData,
      stock: formData.stock + 1,
    });
  };

  const decreaseStock = () => {
    if (formData.stock > 0) {
      setFormData({
        ...formData,
        stock: formData.stock - 1,
      });
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

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
    
    // Here you would normally save the product to your backend
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

      {/* Form Content */}
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
    </div>
  );
};

export default AddProduct;
