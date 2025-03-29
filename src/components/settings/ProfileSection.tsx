
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUser } from '@/contexts/UserContext';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ProfileSection: React.FC = () => {
  const { userProfile, updateProfile } = useUser();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: userProfile.name,
    phone: userProfile.phone,
    email: userProfile.email
  });
  
  const handleEditProfile = () => {
    setIsDialogOpen(true);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSave = () => {
    updateProfile(formData);
    setIsDialogOpen(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully",
    });
  };
  
  return (
    <>
      <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
        <div className="flex items-center">
          <Avatar className="h-16 w-16 mr-4">
            <AvatarImage src={userProfile.avatarUrl} alt={userProfile.name} />
            <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{userProfile.name}</h3>
            <p className="text-sm text-gray-600">{userProfile.phone}</p>
            <p className="text-sm text-gray-500">{userProfile.email}</p>
            <Button variant="link" size="sm" className="p-0 h-auto text-gray-500" onClick={handleEditProfile}>
              Edit Profile
            </Button>
          </div>
        </div>
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input 
                id="phone" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                name="email" 
                value={formData.email} 
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

export default ProfileSection;
