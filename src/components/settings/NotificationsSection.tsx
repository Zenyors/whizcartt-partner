
import React from 'react';
import { Bell } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import SettingsCategory from './SettingsCategory';
import SettingsItem from './SettingsItem';
import { useSettings } from '@/hooks/useSettings';

const NotificationsSection: React.FC = () => {
  const { settings, updateNotifications } = useSettings();
  
  return (
    <SettingsCategory 
      title="Notifications" 
      description="Manage your notification preferences"
    >
      <SettingsItem 
        icon={<Bell className="h-5 w-5 text-gray-600" />}
        label="Notifications"
        onClick={() => updateNotifications(!settings.notifications)}
        showChevron={false}
        addon={
          <Switch 
            checked={settings.notifications} 
            onCheckedChange={updateNotifications} 
          />
        }
      />
    </SettingsCategory>
  );
};

export default NotificationsSection;
