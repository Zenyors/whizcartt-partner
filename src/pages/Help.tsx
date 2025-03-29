
import React from 'react';
import { ArrowLeft, ChevronRight, MessageCircle, FileText, Phone, Mail, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useToast } from '@/components/ui/use-toast';
import BottomNav from '@/components/BottomNav';

const faqData = [
  {
    question: "How do I process a customer order?",
    answer: "To process a customer order, go to the Orders page, find the order you want to process, tap on it to view details, and then use the 'Process Order' button. You can update the order status, add tracking information, and send notifications to the customer."
  },
  {
    question: "How do returns and refunds work?",
    answer: "When a customer requests a return, you'll receive a notification. Go to the Returns & Refund section to view details. You can approve or reject the request based on your policy. If approved, you'll need to issue a refund through the payment method used for the purchase."
  },
  {
    question: "How do I add new products to my store?",
    answer: "Go to the My Products section and tap the '+' button to add a new product. Fill in the required information including name, description, price, inventory levels, and images. You can also set up product variations, categories, and tags to help customers find your items more easily."
  },
  {
    question: "How are payments processed?",
    answer: "Payments are processed through our secure payment gateway. Customer payments for orders are automatically credited to your account balance after a holding period of 3-5 business days. You can withdraw funds to your linked bank account from the Payments section."
  },
  {
    question: "How do I create promotional campaigns?",
    answer: "Go to the Advertisement section to create promotional campaigns. You can set up targeted ads, special offers, or discounts. Define your budget, duration, target audience, and promotional content. Track performance in real-time to optimize your campaigns."
  }
];

const Help: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleContactSupport = (method: string) => {
    toast({
      title: "Contact Support",
      description: `Support will be contacted via ${method}`,
    });
  };

  return (
    <div className="min-h-screen pb-20 bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex items-center">
        <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="font-medium text-lg ml-2">Help & Support</h1>
      </div>
      
      {/* Quick Actions */}
      <div className="p-4">
        <Card className="mb-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">How can we help you?</CardTitle>
            <CardDescription>Get support for your Whizcart account</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                className="h-auto py-3 justify-start" 
                onClick={() => handleContactSupport("chat")}
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                <div className="text-left">
                  <div className="font-medium text-sm">Chat Support</div>
                  <div className="text-xs text-gray-500">Available 24/7</div>
                </div>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-auto py-3 justify-start" 
                onClick={() => navigate('/help/guides')}
              >
                <FileText className="h-5 w-5 mr-2" />
                <div className="text-left">
                  <div className="font-medium text-sm">User Guides</div>
                  <div className="text-xs text-gray-500">Step-by-step help</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* FAQs */}
      <div className="px-4">
        <h2 className="font-medium text-lg mb-3">Frequently Asked Questions</h2>
        
        <Card className="mb-4">
          <CardContent className="p-4">
            <Accordion type="single" collapsible className="w-full">
              {faqData.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-sm font-normal">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-500">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
      
      {/* Support Options */}
      <div className="px-4">
        <h2 className="font-medium text-lg mb-3">Contact Options</h2>
        
        <Card className="mb-6">
          <CardContent className="p-0">
            <ContactOption 
              icon={<Phone className="h-5 w-5 text-gray-600" />}
              title="Call Support"
              description="Available Mon-Fri, 9AM-6PM"
              onClick={() => handleContactSupport("phone")}
            />
            
            <ContactOption 
              icon={<Mail className="h-5 w-5 text-gray-600" />}
              title="Email Support"
              description="support@whizcart.com"
              onClick={() => handleContactSupport("email")}
            />
            
            <ContactOption 
              icon={<Globe className="h-5 w-5 text-gray-600" />}
              title="Visit Help Center"
              description="help.whizcart.com"
              onClick={() => handleContactSupport("website")}
              isLast
            />
          </CardContent>
        </Card>
      </div>
      
      {/* Bottom navigation */}
      <BottomNav />
    </div>
  );
};

interface ContactOptionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  isLast?: boolean;
}

const ContactOption: React.FC<ContactOptionProps> = ({ 
  icon, 
  title, 
  description, 
  onClick,
  isLast = false
}) => {
  return (
    <div 
      className={`flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 ${!isLast ? 'border-b' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center">
        <div className="bg-gray-100 p-2 rounded-full mr-3">
          {icon}
        </div>
        <div>
          <p className="font-medium text-sm">{title}</p>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
      </div>
      <ChevronRight className="h-4 w-4 text-gray-400" />
    </div>
  );
};

export default Help;
