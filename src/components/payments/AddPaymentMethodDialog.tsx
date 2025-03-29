
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

// Payment method form schema
const paymentMethodFormSchema = z.object({
  type: z.enum(['bank', 'upi']),
  bankName: z.string().optional(),
  accountNumber: z.string().optional(),
  ifscCode: z.string().optional(),
  upiId: z.string().optional(),
});

interface AddPaymentMethodDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddPaymentMethod: (data: z.infer<typeof paymentMethodFormSchema>) => void;
}

const AddPaymentMethodDialog: React.FC<AddPaymentMethodDialogProps> = ({ 
  open, 
  onOpenChange, 
  onAddPaymentMethod 
}) => {
  const [selectedPaymentMethodType, setSelectedPaymentMethodType] = useState<'bank' | 'upi'>('bank');
  
  const form = useForm<z.infer<typeof paymentMethodFormSchema>>({
    resolver: zodResolver(paymentMethodFormSchema),
    defaultValues: {
      type: 'bank',
      bankName: "",
      accountNumber: "",
      ifscCode: "",
      upiId: "",
    },
  });

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add Payment Method</AlertDialogTitle>
          <AlertDialogDescription>
            Enter your payment details to add a new payment method.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onAddPaymentMethod)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="account-type">Account Type</Label>
              <div className="flex space-x-2">
                <Button 
                  type="button"
                  variant="outline" 
                  className={`flex-1 ${selectedPaymentMethodType === 'bank' ? 'bg-blue-50 border-blue-300' : ''}`}
                  onClick={() => {
                    setSelectedPaymentMethodType('bank');
                    form.setValue('type', 'bank');
                  }}
                >
                  Bank Account
                </Button>
                <Button 
                  type="button"
                  variant="outline" 
                  className={`flex-1 ${selectedPaymentMethodType === 'upi' ? 'bg-blue-50 border-blue-300' : ''}`}
                  onClick={() => {
                    setSelectedPaymentMethodType('upi');
                    form.setValue('type', 'upi');
                  }}
                >
                  UPI
                </Button>
              </div>
            </div>
            
            {selectedPaymentMethodType === 'bank' ? (
              <>
                <FormField
                  control={form.control}
                  name="bankName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bank Name</FormLabel>
                      <FormControl>
                        <Input id="bank-name" placeholder="Enter bank name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="accountNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Number</FormLabel>
                      <FormControl>
                        <Input id="account-number" placeholder="Enter account number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ifscCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>IFSC Code</FormLabel>
                      <FormControl>
                        <Input id="ifsc-code" placeholder="Enter IFSC code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            ) : (
              <FormField
                control={form.control}
                name="upiId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>UPI ID</FormLabel>
                    <FormControl>
                      <Input id="upi-id" placeholder="Enter UPI ID (e.g. name@upi)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction type="submit">Add Payment Method</AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddPaymentMethodDialog;
