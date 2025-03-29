
import React, { useState } from 'react';
import { User } from 'lucide-react';
import SettingsCategory from './SettingsCategory';
import SettingsItem from './SettingsItem';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useUser } from '@/contexts/UserContext';

const PersonalInformationSection: React.FC = () => {
  const { toast } = useToast();
  const { userProfile, updateProfile } = useUser();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    name: userProfile.name,
    phone: userProfile.phone,
    email: userProfile.email,
    address: "123 Main St, Mumbai",
    panNumber: "ABCTY1234D",
    gstNumber: "22AAAAA0000A1Z5",
  });
  
  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSave = () => {
    // Update profile with relevant information
    updateProfile({
      name: personalInfo.name,
      phone: personalInfo.phone,
      email: personalInfo.email
    });
    
    setIsDialogOpen(false);
    toast({
      title: "Information Updated",
      description: "Your personal information has been updated successfully",
    });
  };
  
  return (
    <>
      <SettingsCategory 
        title="Personal Information" 
        description="Manage your personal details"
      >
        <SettingsItem 
          icon={<User className="h-5 w-5 text-gray-600" />}
          label="Edit Personal Information"
          onClick={handleOpenDialog}
        />
      </SettingsCategory>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Personal Information</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                name="name" 
                value={personalInfo.name} 
                onChange={handleChange} 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                name="phone" 
                value={personalInfo.phone} 
                onChange={handleChange} 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                name="email" 
                value={personalInfo.email} 
                onChange={handleChange} 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Input 
                id="address" 
                name="address" 
                value={personalInfo.address} 
                onChange={handleChange} 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="panNumber">PAN Number</Label>
              <Input 
                id="panNumber" 
                name="panNumber" 
                value={personalInfo.panNumber} 
                onChange={handleChange} 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="gstNumber">GST Number</Label>
              <Input 
                id="gstNumber" 
                name="gstNumber" 
                value={personalInfo.gstNumber} 
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

export default PersonalInformationSection;
