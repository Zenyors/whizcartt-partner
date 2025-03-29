
import React from 'react';
import { Upload } from 'lucide-react';

interface ProductImageUploadProps {
  productImages: string[];
  setProductImages: React.Dispatch<React.SetStateAction<string[]>>;
}

const ProductImageUpload: React.FC<ProductImageUploadProps> = ({ 
  productImages, 
  setProductImages 
}) => {
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

  return (
    <>
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
    </>
  );
};

export default ProductImageUpload;
