
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Plus, Minus, Upload, ChevronRight, Calendar, Tag, Gauge, Clock } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';

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

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setProductImages([...productImages, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    }
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

  // Predefined categories
  const availableCategories = ['Groceries', 'Electronics', 'Fashion', 'Health & Beauty', 'Home & Kitchen'];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <button 
          className="text-red-500 font-medium"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <div className="font-bold text-base">Add Product</div>
        <button 
          className="font-medium"
          onClick={handleSubmit}
        >
          ADD
        </button>
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto p-4 pb-20">
        {/* Product Images */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {productImages.length > 0 ? (
            productImages.map((img, index) => (
              <div key={index} className="aspect-square rounded-md overflow-hidden relative">
                <img src={img} alt={`Product ${index + 1}`} className="w-full h-full object-cover" />
                <button 
                  className="absolute top-2 right-2 bg-white rounded-full p-1"
                  onClick={() => setProductImages(productImages.filter((_, i) => i !== index))}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                </button>
              </div>
            ))
          ) : (
            <>
              <label className="bg-gray-100 aspect-square rounded-md flex flex-col items-center justify-center cursor-pointer">
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleImageUpload}
                />
                <div className="rounded-full border border-gray-400 p-2 mb-2">
                  <Upload className="h-5 w-5 text-gray-500" />
                </div>
                <span className="text-sm text-gray-500">Add Products</span>
              </label>
              <label className="bg-gray-100 aspect-square rounded-md flex flex-col items-center justify-center cursor-pointer">
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleImageUpload}
                />
                <div className="rounded-full border border-gray-400 p-2 mb-2">
                  <Upload className="h-5 w-5 text-gray-500" />
                </div>
                <span className="text-sm text-gray-500">Add Products</span>
              </label>
            </>
          )}
        </div>

        <div className="flex justify-end mb-4">
          <span className="text-sm text-gray-500">Drag to reorder</span>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Product Name</label>
            <Input 
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter product name"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <Input 
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="₹0.00"
              type="number"
              min="0"
              step="0.01"
            />
          </div>

          {/* Stock */}
          <div>
            <label className="block text-sm font-medium mb-1">Stock</label>
            <div className="flex items-center">
              <span className="mr-4">{formData.stock} in Stock</span>
              <div className="flex">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-r-none border-r-0" 
                  onClick={decreaseStock}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-l-none" 
                  onClick={increaseStock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Add Product Description</label>
            <Textarea 
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter product description"
              rows={3}
            />
            <Separator className="mt-1" />
          </div>

          {/* Custom Attributes Section */}
          <div>
            <button 
              onClick={() => toggleSection('attributes')}
              className="w-full flex justify-between items-center"
            >
              <div>
                <h3 className="font-medium text-sm">Manage Custom Attributes ({formData.attributes.length} Added)</h3>
                <p className="text-xs text-gray-500">Collect custom information such as measurement</p>
              </div>
              <ChevronRight className={`h-5 w-5 transition-transform ${expandedSections.attributes ? 'rotate-90' : ''}`} />
            </button>
            
            {expandedSections.attributes && (
              <div className="mt-3 space-y-3 pl-2">
                {formData.attributes.map((attr, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      placeholder="Attribute name"
                      value={attr.name}
                      onChange={(e) => updateAttribute(index, 'name', e.target.value)}
                      className="flex-1"
                    />
                    <Input
                      placeholder="Value"
                      value={attr.value}
                      onChange={(e) => updateAttribute(index, 'value', e.target.value)}
                      className="flex-1"
                    />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeAttribute(index)}
                      className="h-8 w-8"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6 6 18"></path>
                        <path d="m6 6 12 12"></path>
                      </svg>
                    </Button>
                  </div>
                ))}
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={addAttribute}
                  className="mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Attribute
                </Button>
              </div>
            )}
            <Separator className="mt-3" />
          </div>

          {/* Discount Section */}
          <div>
            <button 
              onClick={() => toggleSection('discount')}
              className="w-full flex justify-between items-center"
            >
              <div>
                <h3 className="font-medium text-sm">Add Discount {formData.discount.enabled ? `(${formData.discount.amount}${formData.discount.type === 'percentage' ? '%' : '₹'} Off)` : ''}</h3>
                <p className="text-xs text-gray-500">Add discount on your products like 20% off</p>
              </div>
              <ChevronRight className={`h-5 w-5 transition-transform ${expandedSections.discount ? 'rotate-90' : ''}`} />
            </button>
            
            {expandedSections.discount && (
              <div className="mt-3 space-y-3 pl-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.discount.enabled}
                    onChange={toggleDiscount}
                    className="mr-2"
                  />
                  <span>Enable discount</span>
                </div>
                
                {formData.discount.enabled && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm mb-1">Discount Type</label>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant={formData.discount.type === 'percentage' ? 'default' : 'outline'}
                          onClick={() => updateDiscount('type', 'percentage')}
                          className="flex-1"
                        >
                          Percentage (%)
                        </Button>
                        <Button
                          type="button"
                          variant={formData.discount.type === 'fixed' ? 'default' : 'outline'}
                          onClick={() => updateDiscount('type', 'fixed')}
                          className="flex-1"
                        >
                          Fixed Amount (₹)
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm mb-1">
                        {formData.discount.type === 'percentage' ? 'Discount Percentage' : 'Discount Amount'}
                      </label>
                      <Input
                        type="number"
                        min="0"
                        placeholder={formData.discount.type === 'percentage' ? 'Enter percentage' : 'Enter amount'}
                        value={formData.discount.amount}
                        onChange={(e) => updateDiscount('amount', e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
            <Separator className="mt-3" />
          </div>

          {/* Categories Section */}
          <div>
            <button 
              onClick={() => toggleSection('categories')}
              className="w-full flex justify-between items-center"
            >
              <div>
                <h3 className="font-medium text-sm">Add Categories {formData.categories.length > 0 ? `(${formData.categories.length})` : ''}</h3>
                <p className="text-xs text-gray-500">Add Categories to the product</p>
              </div>
              <ChevronRight className={`h-5 w-5 transition-transform ${expandedSections.categories ? 'rotate-90' : ''}`} />
            </button>
            
            {expandedSections.categories && (
              <div className="mt-3 space-y-3 pl-2">
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.categories.map((category, index) => (
                    <div key={index} className="bg-gray-100 rounded-full px-3 py-1 flex items-center">
                      <span className="text-sm">{category}</span>
                      <button
                        onClick={() => removeCategory(category)}
                        className="ml-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 6 6 18"></path>
                          <path d="m6 6 12 12"></path>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
                
                <div>
                  <label className="block text-sm mb-1">Select or add categories</label>
                  <div className="grid grid-cols-2 gap-2">
                    {availableCategories.map((category) => (
                      <Button
                        key={category}
                        variant="outline"
                        className={`text-left justify-start ${formData.categories.includes(category) ? 'bg-gray-100' : ''}`}
                        onClick={() => 
                          formData.categories.includes(category) 
                            ? removeCategory(category) 
                            : addCategory(category)
                        }
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm mb-1">Add custom category</label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter category name"
                      id="customCategory"
                    />
                    <Button
                      onClick={() => {
                        const input = document.getElementById('customCategory') as HTMLInputElement;
                        if (input && input.value) {
                          addCategory(input.value);
                          input.value = '';
                        }
                      }}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            )}
            <Separator className="mt-3" />
          </div>

          {/* Variations Section */}
          <div>
            <button 
              onClick={() => toggleSection('variations')}
              className="w-full flex justify-between items-center"
            >
              <div>
                <h3 className="font-medium text-sm">Add Variation {formData.variations.length > 0 ? `(${formData.variations.length})` : ''}</h3>
                <p className="text-xs text-gray-500">Add different variations of the products such as size, color, fabric option</p>
              </div>
              <ChevronRight className={`h-5 w-5 transition-transform ${expandedSections.variations ? 'rotate-90' : ''}`} />
            </button>
            
            {expandedSections.variations && (
              <div className="mt-3 space-y-5 pl-2">
                {formData.variations.map((variation, variationIndex) => (
                  <div key={variationIndex} className="border rounded-md p-3 space-y-3">
                    <div className="flex items-center justify-between">
                      <Input
                        placeholder="Variation name (e.g., Size, Color)"
                        value={variation.name}
                        onChange={(e) => updateVariationName(variationIndex, e.target.value)}
                        className="flex-1"
                      />
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => removeVariation(variationIndex)}
                        className="ml-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 6 6 18"></path>
                          <path d="m6 6 12 12"></path>
                        </svg>
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm">Options:</label>
                      {variation.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex items-center gap-2">
                          <Input
                            placeholder={`Option ${optionIndex + 1}`}
                            value={option}
                            onChange={(e) => updateVariationOption(variationIndex, optionIndex, e.target.value)}
                            className="flex-1"
                          />
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => removeVariationOption(variationIndex, optionIndex)}
                            className="h-8 w-8"
                            disabled={variation.options.length <= 1}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M18 6 6 18"></path>
                              <path d="m6 6 12 12"></path>
                            </svg>
                          </Button>
                        </div>
                      ))}
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => addVariationOption(variationIndex)}
                        className="w-full mt-2"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Option
                      </Button>
                    </div>
                  </div>
                ))}
                
                <Button 
                  variant="outline"
                  onClick={addVariation}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Variation
                </Button>
              </div>
            )}
            <Separator className="mt-3" />
          </div>

          {/* Expiry Date Section */}
          <div>
            <button 
              onClick={() => toggleSection('expiryDate')}
              className="w-full flex justify-between items-center"
            >
              <div className="flex items-center">
                <div>
                  <h3 className="font-medium text-sm">Expiry Date {formData.expiryDate ? `(${formData.expiryDate})` : ''}</h3>
                  <p className="text-xs text-gray-500">Add expiry date of the product</p>
                </div>
              </div>
              <ChevronRight className={`h-5 w-5 transition-transform ${expandedSections.expiryDate ? 'rotate-90' : ''}`} />
            </button>
            
            {expandedSections.expiryDate && (
              <div className="mt-3 pl-2">
                <Input
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            )}
            <Separator className="mt-3" />
          </div>

          {/* Schedule Publishing Section */}
          <div>
            <button 
              onClick={() => toggleSection('scheduledTime')}
              className="w-full flex justify-between items-center"
            >
              <div>
                <h3 className="font-medium text-sm">Schedule Publishing {formData.scheduledTime ? `(${formData.scheduledTime})` : ''}</h3>
                <p className="text-xs text-gray-500">Select the time when this product will be published</p>
              </div>
              <ChevronRight className={`h-5 w-5 transition-transform ${expandedSections.scheduledTime ? 'rotate-90' : ''}`} />
            </button>
            
            {expandedSections.scheduledTime && (
              <div className="mt-3 pl-2">
                <Input
                  type="datetime-local"
                  name="scheduledTime"
                  value={formData.scheduledTime}
                  onChange={handleInputChange}
                  min={new Date().toISOString().slice(0, 16)}
                />
              </div>
            )}
            <Separator className="mt-3" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
