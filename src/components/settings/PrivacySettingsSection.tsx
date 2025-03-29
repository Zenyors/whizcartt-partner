
import React from 'react';
import { Shield } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import SettingsCategory from './SettingsCategory';
import SettingsItem from './SettingsItem';
import { useSettings } from '@/hooks/useSettings';

const PrivacySettingsSection: React.FC = () => {
  const { settings, updatePrivacySetting } = useSettings();
  
  return (
    <SettingsCategory 
      title="Privacy & Security" 
      description="Manage your data and security preferences"
    >
      <SettingsItem 
        icon={<Shield className="h-5 w-5 text-gray-600" />}
        label="Share usage data"
        description="Help us improve by sharing anonymous usage data"
        onClick={() => updatePrivacySetting('shareData', !settings.privacySettings.shareData)}
        showChevron={false}
        addon={
          <Switch 
            checked={settings.privacySettings.shareData} 
            onCheckedChange={(checked) => updatePrivacySetting('shareData', checked)} 
          />
        }
      />
      
      <SettingsItem 
        label="Store analytics"
        description="Collect data about your store performance"
        onClick={() => updatePrivacySetting('storeAnalytics', !settings.privacySettings.storeAnalytics)}
        showChevron={false}
        addon={
          <Switch 
            checked={settings.privacySettings.storeAnalytics} 
            onCheckedChange={(checked) => updatePrivacySetting('storeAnalytics', checked)} 
          />
        }
      />
      
      <SettingsItem 
        label="Marketing emails"
        description="Receive promotional emails about new features"
        onClick={() => updatePrivacySetting('marketingEmails', !settings.privacySettings.marketingEmails)}
        showChevron={false}
        addon={
          <Switch 
            checked={settings.privacySettings.marketingEmails} 
            onCheckedChange={(checked) => updatePrivacySetting('marketingEmails', checked)} 
          />
        }
      />
    </SettingsCategory>
  );
};

export default PrivacySettingsSection;
