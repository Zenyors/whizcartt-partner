
import React, { useState } from 'react';
import { Store } from 'lucide-react';
import SettingsCategory from './SettingsCategory';
import SettingsItem from './SettingsItem';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const StoreSettingsSection: React.FC = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [storeInfo, setStoreInfo] = useState({
    storeName: "My Fashion Store",
    storeDescription: "Best fashion items at affordable prices",
    storeAddress: "123 Market Street, Delhi",
    storePhone: "+91 9876543210",
    storeEmail: "contact@myfashionstore.com",
    storeWebsite: "www.myfashionstore.com",
    storeTimings: "9:00 AM - 9:00 PM"
  });
  
  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setStoreInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSave = () => {
    setIsDialogOpen(false);
    toast({
      title: "Store Updated",
      description: "Your store settings have been updated successfully",
    });
  };
  
  return (
    <>
      <SettingsCategory 
        title="Store Settings" 
        description="Configure your store information"
      >
        <SettingsItem 
          icon={<Store className="h-5 w-5 text-gray-600" />}
          label="Edit Store Settings"
          onClick={handleOpenDialog}
        />
      </SettingsCategory>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Store Settings</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="storeName">Store Name</Label>
              <Input 
                id="storeName" 
                name="storeName" 
                value={storeInfo.storeName} 
                onChange={handleChange} 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="storeDescription">Store Description</Label>
              <Textarea 
                id="storeDescription" 
                name="storeDescription" 
                value={storeInfo.storeDescription} 
                onChange={handleChange} 
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="storeAddress">Store Address</Label>
              <Input 
                id="storeAddress" 
                name="storeAddress" 
                value={storeInfo.storeAddress} 
                onChange={handleChange} 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="storePhone">Store Phone</Label>
              <Input 
                id="storePhone" 
                name="storePhone" 
                value={storeInfo.storePhone} 
                onChange={handleChange} 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="storeEmail">Store Email</Label>
              <Input 
                id="storeEmail" 
                name="storeEmail" 
                value={storeInfo.storeEmail} 
                onChange={handleChange} 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="storeWebsite">Store Website</Label>
              <Input 
                id="storeWebsite" 
                name="storeWebsite" 
                value={storeInfo.storeWebsite} 
                onChange={handleChange} 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="storeTimings">Store Timings</Label>
              <Input 
                id="storeTimings" 
                name="storeTimings" 
                value={storeInfo.storeTimings} 
                onChange={handleChange} 
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default StoreSettingsSection;
