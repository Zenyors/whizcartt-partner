
import React, { useState } from 'react';
import { ArrowLeft, User, Store, Bell, Shield, LogOut, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';
import { useUser } from '@/contexts/UserContext';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import BottomNav from '@/components/BottomNav';

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { userProfile, logout } = useUser();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  
  const handleLogout = () => {
    logout();
    navigate('/');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };
  
  const handleFeatureNotAvailable = () => {
    toast({
      title: "Coming Soon",
      description: "This feature will be available soon",
    });
  };

  return (
    <div className="min-h-screen pb-20 bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex items-center">
        <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="font-medium text-lg ml-2">Settings</h1>
      </div>
      
      {/* Profile Section */}
      <div className="p-4">
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
              <Button variant="link" size="sm" className="p-0 h-auto text-gray-500" onClick={handleFeatureNotAvailable}>
                Edit Profile
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Settings Categories */}
      <div className="px-4">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-4">
          <div className="p-4">
            <h3 className="font-medium mb-1">Account Settings</h3>
            <p className="text-sm text-gray-500">Manage your account preferences</p>
          </div>
          
          <Separator />
          
          <SettingsItem 
            icon={<User className="h-5 w-5 text-gray-600" />}
            label="Personal Information"
            onClick={handleFeatureNotAvailable}
          />
          
          <SettingsItem 
            icon={<Store className="h-5 w-5 text-gray-600" />}
            label="Store Settings"
            onClick={handleFeatureNotAvailable}
          />
          
          <SettingsItem 
            icon={<Bell className="h-5 w-5 text-gray-600" />}
            label="Notifications"
            onClick={handleFeatureNotAvailable}
            addon={
              <Switch 
                checked={notifications} 
                onCheckedChange={setNotifications} 
              />
            }
          />
          
          <SettingsItem 
            icon={<Shield className="h-5 w-5 text-gray-600" />}
            label="Privacy & Security"
            onClick={handleFeatureNotAvailable}
          />
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-4">
          <div className="p-4">
            <h3 className="font-medium mb-1">Display & Accessibility</h3>
            <p className="text-sm text-gray-500">Customize your app experience</p>
          </div>
          
          <Separator />
          
          <SettingsItem 
            label="Dark Mode"
            onClick={() => setDarkMode(!darkMode)}
            addon={
              <Switch 
                checked={darkMode} 
                onCheckedChange={setDarkMode} 
              />
            }
          />
          
          <SettingsItem 
            label="Language"
            onClick={handleFeatureNotAvailable}
            description="English"
          />
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
          <SettingsItem 
            icon={<LogOut className="h-5 w-5 text-red-600" />}
            label="Log Out"
            onClick={handleLogout}
            labelClass="text-red-600"
          />
        </div>
        
        <p className="text-center text-xs text-gray-500 mb-6">
          Whizcart Partner v1.0.0
        </p>
      </div>
      
      {/* Bottom navigation */}
      <BottomNav />
    </div>
  );
};

interface SettingsItemProps {
  icon?: React.ReactNode;
  label: string;
  description?: string;
  onClick: () => void;
  addon?: React.ReactNode;
  labelClass?: string;
}

const SettingsItem: React.FC<SettingsItemProps> = ({ 
  icon, 
  label, 
  description, 
  onClick, 
  addon,
  labelClass
}) => {
  return (
    <div 
      className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
      onClick={onClick}
    >
      <div className="flex items-center">
        {icon && <div className="mr-3">{icon}</div>}
        <div>
          <span className={`text-sm font-light ${labelClass}`}>{label}</span>
          {description && <p className="text-xs text-gray-500">{description}</p>}
        </div>
      </div>
      
      {addon || <ChevronRight className="h-4 w-4 text-gray-400" />}
    </div>
  );
};

export default Settings;
