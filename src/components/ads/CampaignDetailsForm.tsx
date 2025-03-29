
import React from 'react';
import { Award, Globe, Target, DollarSign } from 'lucide-react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { AdFormValues } from '@/types/ads';

interface CampaignDetailsFormProps {
  form: UseFormReturn<AdFormValues>;
}

const CampaignDetailsForm: React.FC<CampaignDetailsFormProps> = ({ form }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium">Campaign Details</h2>
        <p className="text-sm text-gray-500">Define your campaign objective and details</p>
      </div>
      
      <FormField
        control={form.control}
        name="campaignName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Campaign Name</FormLabel>
            <FormControl>
              <Input placeholder="E.g., Summer Sale 2023" {...field} />
            </FormControl>
            <FormDescription>
              This name is for your reference only and won't be shown to customers.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="objective"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Campaign Objective</FormLabel>
            <FormControl>
              <RadioGroup 
                onValueChange={field.onChange} 
                value={field.value}
                className="grid grid-cols-2 gap-4"
              >
                <div className="flex">
                  <RadioGroupItem id="awareness" value="awareness" className="sr-only peer" />
                  <Label
                    htmlFor="awareness"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <Award className="mb-3 h-6 w-6" />
                    <div className="space-y-1 text-center">
                      <p className="text-sm font-medium leading-none">Brand Awareness</p>
                      <p className="text-xs text-muted-foreground">
                        Reach as many people as possible
                      </p>
                    </div>
                  </Label>
                </div>
                
                <div className="flex">
                  <RadioGroupItem id="traffic" value="traffic" className="sr-only peer" />
                  <Label
                    htmlFor="traffic"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <Globe className="mb-3 h-6 w-6" />
                    <div className="space-y-1 text-center">
                      <p className="text-sm font-medium leading-none">Website Traffic</p>
                      <p className="text-xs text-muted-foreground">
                        Get more visitors to your website
                      </p>
                    </div>
                  </Label>
                </div>
                
                <div className="flex">
                  <RadioGroupItem id="conversions" value="conversions" className="sr-only peer" />
                  <Label
                    htmlFor="conversions"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <Target className="mb-3 h-6 w-6" />
                    <div className="space-y-1 text-center">
                      <p className="text-sm font-medium leading-none">Conversions</p>
                      <p className="text-xs text-muted-foreground">
                        Get more sign-ups or leads
                      </p>
                    </div>
                  </Label>
                </div>
                
                <div className="flex">
                  <RadioGroupItem id="sales" value="sales" className="sr-only peer" />
                  <Label
                    htmlFor="sales"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <DollarSign className="mb-3 h-6 w-6" />
                    <div className="space-y-1 text-center">
                      <p className="text-sm font-medium leading-none">Sales</p>
                      <p className="text-xs text-muted-foreground">
                        Increase your store sales
                      </p>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormDescription>
              Choose the main goal of your advertising campaign.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default CampaignDetailsForm;
