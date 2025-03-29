
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import SettingsCategory from './SettingsCategory';
import SettingsItem from './SettingsItem';
import { useSettings } from '@/hooks/useSettings';

const DisplaySettingsSection: React.FC = () => {
  const { settings, updateDarkMode } = useSettings();
  
  // Handle dark mode toggle
  const handleDarkModeToggle = (checked: boolean) => {
    updateDarkMode(checked);
  };
  
  return (
    <SettingsCategory 
      title="Display & Accessibility" 
      description="Customize your app experience"
    >
      <SettingsItem 
        icon={settings.darkMode ? <Moon className="h-5 w-5 text-indigo-500" /> : <Sun className="h-5 w-5 text-amber-500" />}
        label="Dark Mode"
        onClick={() => updateDarkMode(!settings.darkMode)}
        showChevron={false}
        addon={
          <Switch 
            checked={settings.darkMode} 
            onCheckedChange={handleDarkModeToggle} 
            className={settings.darkMode ? "bg-indigo-500" : ""}
          />
        }
      />
    </SettingsCategory>
  );
};

export default DisplaySettingsSection;
