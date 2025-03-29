
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { UseFormReturn } from 'react-hook-form';
import { AdFormValues } from '@/types/ads';
import AdImageUpload from './AdImageUpload';
import AdPreview from './AdPreview';

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
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium">Ad Creative</h2>
        <p className="text-sm text-gray-500">Design how your ad will look</p>
      </div>
      
      <div className="space-y-4">
        <AdImageUpload adImage={adImage} setAdImage={setAdImage} />
        
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
        
        <AdPreview 
          form={form} 
          adImage={adImage} 
          previewTab={previewTab} 
          setPreviewTab={setPreviewTab} 
        />
      </div>
    </div>
  );
};

export default AdCreativeForm;
