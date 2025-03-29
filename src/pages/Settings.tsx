
import React from 'react';
import SettingsLayout from '@/components/settings/SettingsLayout';
import ProfileSection from '@/components/settings/ProfileSection';
import SettingsCategory from '@/components/settings/SettingsCategory';
import SettingsItem from '@/components/settings/SettingsItem';
import NotificationsSection from '@/components/settings/NotificationsSection';
import PrivacySettingsSection from '@/components/settings/PrivacySettingsSection';
import DisplaySettingsSection from '@/components/settings/DisplaySettingsSection';
import LanguageSection from '@/components/settings/LanguageSection';
import LogoutButton from '@/components/settings/LogoutButton';
import VersionInfo from '@/components/settings/VersionInfo';
import { User, Store } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Settings: React.FC = () => {
  const { toast } = useToast();
  
  const handleFeatureNotAvailable = () => {
    toast({
      title: "Coming Soon",
      description: "This feature will be available soon",
    });
  };

  return (
    <SettingsLayout>
      {/* Profile Section */}
      <ProfileSection />
      
      {/* Settings Categories */}
      <SettingsCategory 
        title="Account Settings" 
        description="Manage your account preferences"
      >
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
      </SettingsCategory>
      
      {/* Notifications Section */}
      <NotificationsSection />
      
      {/* Privacy Section */}
      <PrivacySettingsSection />
      
      {/* Display Section */}
      <DisplaySettingsSection />
      
      {/* Language Section */}
      <LanguageSection />
      
      {/* Logout */}
      <LogoutButton />
      
      {/* Version Info */}
      <VersionInfo />
    </SettingsLayout>
  );
};

export default Settings;
