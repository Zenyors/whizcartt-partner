
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

export interface ProductFormData {
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

export interface ExpandedSections {
  attributes: boolean;
  discount: boolean;
  categories: boolean;
  variations: boolean;
  expiryDate: boolean;
  scheduledTime: boolean;
}

export function useProductForm() {
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
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>({
    attributes: false,
    discount: false,
    categories: false,
    variations: false,
    expiryDate: false,
    scheduledTime: false
  });

  // Images state
  const [productImages, setProductImages] = useState<string[]>([]);

  const toggleSection = (section: keyof ExpandedSections) => {
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

  return {
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
  };
}
