
import React from 'react';
import SettingsLayout from '@/components/settings/SettingsLayout';
import ProfileSection from '@/components/settings/ProfileSection';
import PersonalInformationSection from '@/components/settings/PersonalInformationSection';
import StoreSettingsSection from '@/components/settings/StoreSettingsSection';
import NotificationsSection from '@/components/settings/NotificationsSection';
import PrivacySettingsSection from '@/components/settings/PrivacySettingsSection';
import LanguageSection from '@/components/settings/LanguageSection';
import LogoutButton from '@/components/settings/LogoutButton';
import VersionInfo from '@/components/settings/VersionInfo';

const Settings: React.FC = () => {
  return (
    <SettingsLayout>
      {/* Profile Section */}
      <ProfileSection />
      
      {/* Personal Information */}
      <PersonalInformationSection />
      
      {/* Store Settings */}
      <StoreSettingsSection />
      
      {/* Notifications Section */}
      <NotificationsSection />
      
      {/* Privacy Section */}
      <PrivacySettingsSection />
      
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
