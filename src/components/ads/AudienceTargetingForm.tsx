
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { UseFormReturn } from 'react-hook-form';
import { AdFormValues } from '@/types/ads';

interface AudienceTargetingFormProps {
  form: UseFormReturn<AdFormValues>;
}

const AudienceTargetingForm: React.FC<AudienceTargetingFormProps> = ({ form }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium">Audience Targeting</h2>
        <p className="text-sm text-gray-500">Define who you want to reach with your ad</p>
      </div>
      
      <FormField
        control={form.control}
        name="targetingType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Targeting Type</FormLabel>
            <FormControl>
              <RadioGroup 
                onValueChange={field.onChange} 
                value={field.value}
                className="grid gap-4"
              >
                <div className="flex items-start space-x-3">
                  <RadioGroupItem id="broad" value="broad" />
                  <div>
                    <Label htmlFor="broad" className="font-medium">Broad Audience</Label>
                    <p className="text-sm text-gray-500">
                      Let our system find the right people for your ad based on your objective
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <RadioGroupItem id="custom" value="custom" />
                  <div>
                    <Label htmlFor="custom" className="font-medium">Custom Audience</Label>
                    <p className="text-sm text-gray-500">
                      Define detailed targeting preferences yourself
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <RadioGroupItem id="lookalike" value="lookalike" />
                  <div>
                    <Label htmlFor="lookalike" className="font-medium">Lookalike Audience</Label>
                    <p className="text-sm text-gray-500">
                      Target people similar to your existing customers
                    </p>
                  </div>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className={form.watch('targetingType') !== 'broad' ? "" : "opacity-50 pointer-events-none"}>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Demographics</CardTitle>
            <CardDescription>Define age range, gender, and location</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="ageRange"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age Range</FormLabel>
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs">
                      <span>13</span>
                      <span>65+</span>
                    </div>
                    <FormControl>
                      <div className="flex flex-col space-y-1">
                        <div className="px-1">
                          <div className="flex justify-between">
                            <span className="text-xs">Min: {field.value.min}</span>
                            <span className="text-xs">Max: {field.value.max}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Slider 
                            min={13} 
                            max={65} 
                            step={1} 
                            value={[field.value.min, field.value.max]}
                            onValueChange={([min, max]) => {
                              field.onChange({ min, max });
                            }}
                          />
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender targeting" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="all">All genders</SelectItem>
                      <SelectItem value="male">Men</SelectItem>
                      <SelectItem value="female">Women</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="locations"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Locations</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="E.g., Mumbai, Delhi, Bangalore" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Enter cities or regions separated by commas
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        
        <div className="mt-6">
          <FormField
            control={form.control}
            name="interests"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Interests & Behaviors</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="E.g., Fashion, Technology, Sports, Cooking"
                    rows={3}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Enter interests separated by commas to target people with these interests
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default AudienceTargetingForm;
