
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import BottomNav from '@/components/BottomNav';
import { adFormSchema, AdFormValues } from '@/types/ads';

// Import our new components
import CampaignDetailsForm from '@/components/ads/CampaignDetailsForm';
import AdCreativeForm from '@/components/ads/AdCreativeForm';
import AudienceTargetingForm from '@/components/ads/AudienceTargetingForm';
import BudgetScheduleForm from '@/components/ads/BudgetScheduleForm';
import StepIndicator from '@/components/ads/StepIndicator';
import StepNavigation from '@/components/ads/StepNavigation';

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
  
  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Campaign Details";
      case 2:
        return "Ad Creative";
      case 3:
        return "Audience Targeting";
      case 4:
        return "Budget & Schedule";
      default:
        return "";
    }
  };
  
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <CampaignDetailsForm form={form} />;
      case 2:
        return (
          <AdCreativeForm 
            form={form} 
            adImage={adImage} 
            setAdImage={setAdImage} 
            previewTab={previewTab} 
            setPreviewTab={setPreviewTab} 
          />
        );
      case 3:
        return <AudienceTargetingForm form={form} />;
      case 4:
        return <BudgetScheduleForm form={form} />;
      default:
        return null;
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
              <StepIndicator currentStep={currentStep} stepTitle={getStepTitle()} />
              
              {renderStepContent()}
              
              <StepNavigation 
                currentStep={currentStep}
                totalSteps={4}
                isEdit={isEdit}
                onNext={nextStep}
                onPrevious={prevStep}
                onCancel={() => navigate('/advertisements')}
                onSubmit={form.handleSubmit(onSubmit)}
              />
            </div>
          </form>
        </Form>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default CreateAd;
