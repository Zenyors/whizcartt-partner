
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUser } from '@/contexts/UserContext';
import { useToast } from '@/hooks/use-toast';

const ProfileSection: React.FC = () => {
  const { userProfile } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleEditProfile = () => {
    toast({
      title: "Edit Profile",
      description: "This feature will be available soon",
    });
  };
  
  return (
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
  );
};

export default ProfileSection;
