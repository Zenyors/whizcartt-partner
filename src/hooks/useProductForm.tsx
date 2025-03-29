
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { ProductFormData, ExpandedSections } from '@/types/product';
import { useProductAttributes } from './useProductAttributes';
import { useProductCategories } from './useProductCategories';
import { useProductDiscount } from './useProductDiscount';
import { useProductVariations } from './useProductVariations';

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

  // Import specialized hooks
  const attributeHandlers = useProductAttributes(formData, setFormData);
  const categoryHandlers = useProductCategories(formData, setFormData);
  const discountHandlers = useProductDiscount(formData, setFormData);
  const variationHandlers = useProductVariations(formData, setFormData);

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
    handleSubmit,
    ...attributeHandlers,
    ...categoryHandlers,
    ...discountHandlers,
    ...variationHandlers
  };
}

export type { ProductFormData, ExpandedSections };
