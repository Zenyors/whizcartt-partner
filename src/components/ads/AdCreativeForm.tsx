
import React from 'react';
import { Upload } from 'lucide-react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UseFormReturn } from 'react-hook-form';
import { AdFormValues } from '@/types/ads';

interface AdCreativeFormProps {
  form: UseFormReturn<AdFormValues>;
  adImage: string | null;
  setAdImage: React.Dispatch<React.SetStateAction<string | null>>;
  previewTab: string;
  setPreviewTab: React.Dispatch<React.SetStateAction<string>>;
}

const AdCreativeForm: React.FC<AdCreativeFormProps> = ({ 
  form, 
  adImage, 
  setAdImage, 
  previewTab, 
  setPreviewTab 
}) => {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAdImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium">Ad Creative</h2>
        <p className="text-sm text-gray-500">Design how your ad will look</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="image-upload" className="block text-sm font-semibold mb-1">Ad Image</label>
          <div className="mt-1 flex items-center">
            {adImage ? (
              <div className="relative">
                <img 
                  src={adImage} 
                  alt="Ad preview" 
                  className="h-48 w-full object-cover rounded-md" 
                />
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="absolute bottom-2 right-2"
                  onClick={() => setAdImage(null)}
                >
                  Change
                </Button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-md cursor-pointer hover:bg-gray-50">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-medium">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    Recommended size: 1200 x 628 pixels
                  </p>
                </div>
                <input 
                  id="image-upload" 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleImageUpload} 
                />
              </label>
            )}
          </div>
        </div>
        
        <FormField
          control={form.control}
          name="headline"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Headline</FormLabel>
              <FormControl>
                <Input placeholder="E.g., 50% Off Summer Collection" {...field} />
              </FormControl>
              <FormDescription>
                Keep it short, clear, and attention-grabbing.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your offer or product..."
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Explain the benefits of your offering.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="callToAction"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Call to Action</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a CTA button" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="shop_now">Shop Now</SelectItem>
                  <SelectItem value="learn_more">Learn More</SelectItem>
                  <SelectItem value="sign_up">Sign Up</SelectItem>
                  <SelectItem value="contact_us">Contact Us</SelectItem>
                  <SelectItem value="book_now">Book Now</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                This button will appear on your ad.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Separator className="my-6" />
        
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
                      {form.watch("callToAction") === "shop_now" && "Shop Now"}
                      {form.watch("callToAction") === "learn_more" && "Learn More"}
                      {form.watch("callToAction") === "sign_up" && "Sign Up"}
                      {form.watch("callToAction") === "contact_us" && "Contact Us"}
                      {form.watch("callToAction") === "book_now" && "Book Now"}
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
                        {form.watch("callToAction") === "shop_now" && "Shop Now"}
                        {form.watch("callToAction") === "learn_more" && "Learn More"}
                        {form.watch("callToAction") === "sign_up" && "Sign Up"}
                        {form.watch("callToAction") === "contact_us" && "Contact Us"}
                        {form.watch("callToAction") === "book_now" && "Book Now"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdCreativeForm;
