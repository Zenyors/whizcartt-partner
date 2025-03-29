
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DollarSign, Percent } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { AdFormValues } from '@/types/ads';

interface BudgetScheduleFormProps {
  form: UseFormReturn<AdFormValues>;
}

const BudgetScheduleForm: React.FC<BudgetScheduleFormProps> = ({ form }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium">Budget & Schedule</h2>
        <p className="text-sm text-gray-500">Set how much you want to spend and when your ad will run</p>
      </div>
      
      <FormField
        control={form.control}
        name="budgetType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Budget Type</FormLabel>
            <FormControl>
              <RadioGroup 
                onValueChange={field.onChange} 
                value={field.value}
                className="grid grid-cols-2 gap-4"
              >
                <div className="flex">
                  <RadioGroupItem id="daily" value="daily" className="sr-only peer" />
                  <Label
                    htmlFor="daily"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <DollarSign className="mb-3 h-6 w-6" />
                    <div className="space-y-1 text-center">
                      <p className="text-sm font-medium leading-none">Daily Budget</p>
                      <p className="text-xs text-muted-foreground">
                        Spend up to this amount each day
                      </p>
                    </div>
                  </Label>
                </div>
                
                <div className="flex">
                  <RadioGroupItem id="lifetime" value="lifetime" className="sr-only peer" />
                  <Label
                    htmlFor="lifetime"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <Percent className="mb-3 h-6 w-6" />
                    <div className="space-y-1 text-center">
                      <p className="text-sm font-medium leading-none">Lifetime Budget</p>
                      <p className="text-xs text-muted-foreground">
                        Set a total amount for the entire campaign
                      </p>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="budget"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Budget Amount (₹)</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="Enter amount"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
            <FormDescription>
              {form.watch('budgetType') === 'daily' 
                ? 'Minimum daily budget is ₹100'
                : 'Minimum lifetime budget is ₹500'}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  placeholder="Optional"
                  {...field}
                  value={field.value || ''}
                />
              </FormControl>
              <FormDescription>
                Leave blank to run continuously
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <FormField
        control={form.control}
        name="scheduleType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Schedule Type</FormLabel>
            <FormControl>
              <RadioGroup 
                onValueChange={field.onChange} 
                value={field.value}
                className="grid gap-4"
              >
                <div className="flex items-start space-x-3">
                  <RadioGroupItem id="continuous" value="continuous" />
                  <div>
                    <Label htmlFor="continuous" className="font-medium">Run continuously</Label>
                    <p className="text-sm text-gray-500">
                      Ad will run 24/7 between start and end dates
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <RadioGroupItem id="scheduled" value="scheduled" />
                  <div>
                    <Label htmlFor="scheduled" className="font-medium">Run on schedule</Label>
                    <p className="text-sm text-gray-500">
                      Define specific hours and days for your ad to run
                    </p>
                  </div>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <Separator className="my-6" />
      
      <div>
        <h3 className="text-sm font-medium mb-3">Advanced Options</h3>
        
        <Card>
          <CardContent className="pt-6 space-y-4">
            <FormField
              control={form.control}
              name="bidStrategy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bid Strategy</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select strategy" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="lowest_cost">Lowest Cost (Automatic)</SelectItem>
                      <SelectItem value="cost_cap">Cost Cap</SelectItem>
                      <SelectItem value="bid_cap">Bid Cap</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Determines how your budget is spent
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="optimizationGoal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Optimization Goal</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select goal" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="impressions">Impressions</SelectItem>
                      <SelectItem value="clicks">Link Clicks</SelectItem>
                      <SelectItem value="conversions">Conversions</SelectItem>
                      <SelectItem value="reach">Reach</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    What result you want to optimize for
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BudgetScheduleForm;
