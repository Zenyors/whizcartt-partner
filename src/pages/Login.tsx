
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { UserProvider, useUser } from '@/contexts/UserContext';
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useUser();
  
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  
  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phoneNumber.trim()) {
      toast({
        title: "Missing information",
        description: "Please enter your phone number",
        variant: "destructive",
      });
      return;
    }
    
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    if (!phoneRegex.test(phoneNumber.replace(/\s/g, ''))) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid phone number",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate sending OTP
    toast({
      title: "OTP sent",
      description: `Verification code sent to ${phoneNumber}`,
    });
    
    // Move to OTP verification
    setStep('otp');
  };
  
  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the complete 6-digit verification code",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would verify the OTP with a backend service
    // For now, any 6-digit code will work
    
    // Log the user in
    login();
    
    toast({
      title: "Login successful",
      description: "Welcome back!",
    });
    
    // Navigate to the home page
    navigate('/');
  };
  
  const resendOtp = () => {
    toast({
      title: "OTP resent",
      description: `New verification code sent to ${phoneNumber}`,
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="p-4 flex items-center border-b">
        <Button 
          variant="ghost" 
          size="icon" 
          className="mr-2" 
          onClick={() => step === 'otp' ? setStep('phone') : navigate('/')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-medium">Login</h1>
      </div>
      
      {/* Form */}
      <div className="flex-1 p-4 flex flex-col justify-center">
        {step === 'phone' ? (
          <div className="max-w-md mx-auto w-full">
            <h2 className="text-2xl font-bold mb-6">Welcome Back!</h2>
            <p className="text-gray-600 mb-8">Enter your registered phone number to continue</p>
            
            <form onSubmit={handlePhoneSubmit} className="space-y-6">
              <div className="space-y-1">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Input
                    id="phone"
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="pl-10"
                  />
                  <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
              
              <Button type="submit" className="w-full">Send Verification Code</Button>
              
              <div className="text-center text-sm">
                Don't have an account?{" "}
                <a 
                  href="#" 
                  className="text-primary font-medium"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/signup');
                  }}
                >
                  Sign Up
                </a>
              </div>
            </form>
          </div>
        ) : (
          <div className="max-w-md mx-auto w-full">
            <h2 className="text-2xl font-bold mb-4">Verification</h2>
            <p className="text-gray-600 mb-8">
              Enter the 6-digit code sent to {phoneNumber}
            </p>
            
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div className="flex justify-center mb-4">
                <InputOTP 
                  maxLength={6} 
                  value={otp} 
                  onChange={(value) => setOtp(value)}
                  containerClassName="gap-2"
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              
              <Button type="submit" className="w-full">Verify & Login</Button>
              
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Didn't receive code?{" "}
                  <a 
                    href="#" 
                    className="text-primary font-medium"
                    onClick={(e) => {
                      e.preventDefault();
                      resendOtp();
                    }}
                  >
                    Resend
                  </a>
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
