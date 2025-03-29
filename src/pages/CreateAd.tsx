
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Upload, Info, Target, Users, Globe, Clock, DollarSign, Percent, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import BottomNav from '@/components/BottomNav';

const adFormSchema = z.object({
  // Campaign Details
  campaignName: z.string().min(3, { message: "Campaign name must be at least 3 characters" }),
  objective: z.enum(["awareness", "traffic", "conversions", "sales"]),
  
  // Ad Creative
  headline: z.string().min(3, { message: "Headline must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  callToAction: z.enum(["shop_now", "learn_more", "sign_up", "contact_us", "book_now"]),
  
  // Audience Targeting
  targetingType: z.enum(["broad", "custom", "lookalike"]),
  ageRange: z.object({
    min: z.number().min(13).max(65),
    max: z.number().min(13).max(65),
  }),
  gender: z.enum(["all", "male", "female"]),
  locations: z.string(),
  interests: z.string().optional(),
  
  // Budget & Schedule
  budgetType: z.enum(["daily", "lifetime"]),
  budget: z.number().min(100, { message: "Minimum budget is ₹100" }),
  startDate: z.string(),
  endDate: z.string().optional(),
  scheduleType: z.enum(["continuous", "scheduled"]),
  
  // Advanced Options
  bidStrategy: z.enum(["lowest_cost", "cost_cap", "bid_cap"]),
  bidAmount: z.number().optional(),
  optimizationGoal: z.enum(["impressions", "clicks", "conversions", "reach"]),
});

type AdFormValues = z.infer<typeof adFormSchema>;

const CreateAd: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [adImage, setAdImage] = useState<string | null>(null);
  const [previewTab, setPreviewTab] = useState<string>("mobile");
  const [currentStep, setCurrentStep] = useState(1);
  const [isEdit, setIsEdit] = useState(false);
  const [adId, setAdId] = useState<string | null>(null);
  
  const form = useForm<AdFormValues>({
    resolver: zodResolver(adFormSchema),
    defaultValues: {
      campaignName: "",
      objective: "awareness",
      headline: "",
      description: "",
      callToAction: "shop_now",
      targetingType: "broad",
      ageRange: { min: 18, max: 65 },
      gender: "all",
      locations: "",
      interests: "",
      budgetType: "daily",
      budget: 100,
      startDate: new Date().toISOString().split('T')[0],
      scheduleType: "continuous",
      bidStrategy: "lowest_cost",
      optimizationGoal: "impressions",
    },
  });
  
  // Check if we're editing an existing ad
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const editAdId = searchParams.get('edit');
    
    if (editAdId) {
      setIsEdit(true);
      setAdId(editAdId);
      
      // In a real app, you would fetch the ad data here
      // For now, we'll simulate with mock data
      if (editAdId === 'AD001') {
        form.reset({
          campaignName: "Summer Sale Campaign",
          objective: "sales",
          headline: "Summer Sale - Up to 50% Off",
          description: "Get amazing deals on our summer collection. Limited time offer!",
          callToAction: "shop_now",
          targetingType: "broad",
          ageRange: { min: 18, max: 45 },
          gender: "all",
          locations: "Mumbai, Delhi, Bangalore",
          interests: "Fashion, Shopping, Summer",
          budgetType: "daily",
          budget: 1000,
          startDate: "2023-05-01",
          endDate: "2023-05-30",
          scheduleType: "continuous",
          bidStrategy: "lowest_cost",
          optimizationGoal: "conversions",
        });
        setAdImage('/placeholder.svg');
      }
    }
  }, [location, form]);
  
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
  
  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const onSubmit = (data: AdFormValues) => {
    if (!adImage) {
      toast({
        title: "Missing Image",
        description: "Please upload an image for your ad",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, you would submit the form data to your API
    console.log("Form data:", data);
    
    toast({
      title: isEdit ? "Ad Updated" : "Ad Created",
      description: isEdit 
        ? "Your advertisement has been updated successfully" 
        : "Your advertisement has been created and is pending review",
    });
    
    // Navigate back to the ads page
    navigate('/advertisements');
  };
  
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
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
        
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium">Ad Creative</h2>
              <p className="text-sm text-gray-500">Design how your ad will look</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="image-upload">Ad Image</Label>
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
        
      case 3:
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
        
      case 4:
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
    }
  };
  
  return (
    <div className="min-h-screen pb-20 bg-gray-50">
      <div className="bg-white shadow-sm p-4 flex items-center">
        <Button variant="ghost" size="icon" onClick={() => navigate('/advertisements')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="font-medium text-lg ml-2">
          {isEdit ? "Edit Advertisement" : "Create Advertisement"}
        </h1>
      </div>
      
      <div className="p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="bg-white rounded-md shadow-sm p-4 mb-4">
              <div className="flex items-center mb-6">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white mr-3">
                  {currentStep}
                </div>
                <div>
                  <h2 className="font-medium">
                    {currentStep === 1 && "Campaign Details"}
                    {currentStep === 2 && "Ad Creative"}
                    {currentStep === 3 && "Audience Targeting"}
                    {currentStep === 4 && "Budget & Schedule"}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Step {currentStep} of 4
                  </p>
                </div>
              </div>
              
              {renderStepContent()}
              
              <div className="flex justify-between mt-8">
                {currentStep > 1 ? (
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Previous
                  </Button>
                ) : (
                  <Button type="button" variant="outline" onClick={() => navigate('/advertisements')}>
                    Cancel
                  </Button>
                )}
                
                {currentStep < 4 ? (
                  <Button type="button" onClick={nextStep}>
                    Continue
                  </Button>
                ) : (
                  <Button type="submit">
                    {isEdit ? "Update Advertisement" : "Create Advertisement"}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </Form>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default CreateAd;
