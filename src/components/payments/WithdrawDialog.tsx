
import React from 'react';
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

// Withdrawal form schema
const withdrawalFormSchema = z.object({
  amount: z.string()
    .refine(val => !isNaN(Number(val)), { message: "Amount must be a number" })
    .refine(val => Number(val) > 0, { message: "Amount must be greater than 0" })
    .refine(val => Number(val) <= 1000, { message: "Amount must not exceed available balance" })
    .refine(val => Number(val) >= 500, { message: "Minimum withdrawal amount is ₹500" }),
  accountNumber: z.string().min(1, { message: "Account number is required" }),
});

interface WithdrawDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  totalEarnings: number;
  onWithdrawSubmit: (values: z.infer<typeof withdrawalFormSchema>) => void;
}

const WithdrawDialog: React.FC<WithdrawDialogProps> = ({ 
  open, 
  onOpenChange, 
  totalEarnings, 
  onWithdrawSubmit 
}) => {
  const form = useForm<z.infer<typeof withdrawalFormSchema>>({
    resolver: zodResolver(withdrawalFormSchema),
    defaultValues: {
      amount: "",
      accountNumber: "",
    },
  });

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Withdraw Funds</AlertDialogTitle>
          <AlertDialogDescription>
            Enter the amount you'd like to withdraw. Minimum withdrawal is ₹500.
            Available balance: ₹{totalEarnings.toFixed(2)}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onWithdrawSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount (₹)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter amount" {...field} type="number" min="500" max={totalEarnings} />
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
                    <Input placeholder="Enter bank account number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction type="submit">Withdraw</AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default WithdrawDialog;
