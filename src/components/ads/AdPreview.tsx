
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UseFormReturn } from 'react-hook-form';
import { AdFormValues } from '@/types/ads';

interface AdPreviewProps {
  form: UseFormReturn<AdFormValues>;
  adImage: string | null;
  previewTab: string;
  setPreviewTab: React.Dispatch<React.SetStateAction<string>>;
}

const AdPreview: React.FC<AdPreviewProps> = ({ 
  form, 
  adImage, 
  previewTab, 
  setPreviewTab 
}) => {
  const getCTAText = (cta: string): string => {
    switch(cta) {
      case "shop_now": return "Shop Now";
      case "learn_more": return "Learn More";
      case "sign_up": return "Sign Up";
      case "contact_us": return "Contact Us";
      case "book_now": return "Book Now";
      default: return "Learn More";
    }
  };

  return (
    <div>
      <h3 className="text-sm font-medium mb-2">Ad Preview</h3>
      <Tabs value={previewTab} onValueChange={setPreviewTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="mobile">Mobile</TabsTrigger>
          <TabsTrigger value="desktop">Desktop</TabsTrigger>
        </TabsList>
        <TabsContent value="mobile" className="mt-2">
          <div className="border rounded-md p-2 max-w-xs mx-auto">
            <div className="bg-gray-100 rounded-t-md overflow-hidden">
              {adImage ? (
                <img 
                  src={adImage} 
                  alt="Ad preview" 
                  className="w-full h-40 object-cover" 
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                  <p className="text-gray-500 text-sm">Ad Image</p>
                </div>
              )}
            </div>
            <div className="p-3">
              <p className="font-medium text-sm">
                {form.watch("headline") || "Your Ad Headline"}
              </p>
              <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                {form.watch("description") || "Your ad description will appear here."}
              </p>
              <div className="mt-2">
                <div className="bg-blue-600 text-white text-xs py-1 px-2 rounded text-center w-24">
                  {getCTAText(form.watch("callToAction"))}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="desktop" className="mt-2">
          <div className="border rounded-md p-2">
            <div className="flex">
              <div className="flex-shrink-0 w-1/3">
                {adImage ? (
                  <img 
                    src={adImage} 
                    alt="Ad preview" 
                    className="w-full h-32 object-cover rounded-l-md" 
                  />
                ) : (
                  <div className="w-full h-32 bg-gray-200 flex items-center justify-center rounded-l-md">
                    <p className="text-gray-500 text-sm">Ad Image</p>
                  </div>
                )}
              </div>
              <div className="p-3 flex-1">
                <p className="font-medium text-sm">
                  {form.watch("headline") || "Your Ad Headline"}
                </p>
                <p className="text-xs text-gray-500 mt-1 line-clamp-3">
                  {form.watch("description") || "Your ad description will appear here."}
                </p>
                <div className="mt-2">
                  <div className="bg-blue-600 text-white text-xs py-1 px-2 rounded text-center w-24">
                    {getCTAText(form.watch("callToAction"))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdPreview;
