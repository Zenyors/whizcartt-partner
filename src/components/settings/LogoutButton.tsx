
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/contexts/UserContext';
import SettingsCategory from './SettingsCategory';
import SettingsItem from './SettingsItem';

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { logout } = useUser();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };
  
  return (
    <SettingsCategory title="">
      <SettingsItem 
        icon={<LogOut className="h-5 w-5 text-red-600" />}
        label="Log Out"
        onClick={handleLogout}
        labelClass="text-red-600"
      />
    </SettingsCategory>
  );
};

export default LogoutButton;
