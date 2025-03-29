
import React from 'react';
import { Moon, Sun, CircleDashed } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import SettingsCategory from './SettingsCategory';
import SettingsItem from './SettingsItem';
import { useSettings } from '@/hooks/useSettings';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const DisplaySettingsSection: React.FC = () => {
  const { settings, updateDarkMode, updateDisplaySetting } = useSettings();
  
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
            onCheckedChange={updateDarkMode} 
          />
        }
      />
      
      <SettingsItem 
        label="Compact View"
        description="Show more content with less spacing"
        onClick={() => updateDisplaySetting('compactView', !settings.displaySettings.compactView)}
        showChevron={false}
        addon={
          <Switch 
            checked={settings.displaySettings.compactView} 
            onCheckedChange={(checked) => updateDisplaySetting('compactView', checked)} 
          />
        }
      />
      
      <SettingsItem 
        label="High Contrast"
        description="Increase contrast for better readability"
        onClick={() => updateDisplaySetting('highContrast', !settings.displaySettings.highContrast)}
        showChevron={false}
        addon={
          <Switch 
            checked={settings.displaySettings.highContrast} 
            onCheckedChange={(checked) => updateDisplaySetting('highContrast', checked)} 
          />
        }
      />
      
      <div className="p-4">
        <Label className="text-sm font-medium mb-3 block">Font Size</Label>
        <RadioGroup 
          value={settings.displaySettings.fontSize}
          onValueChange={(value) => 
            updateDisplaySetting('fontSize', value as 'small' | 'medium' | 'large')
          }
          className="grid grid-cols-3 gap-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="small" id="small" />
            <Label htmlFor="small" className="text-xs">Small</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="medium" id="medium" />
            <Label htmlFor="medium" className="text-sm">Medium</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="large" id="large" />
            <Label htmlFor="large" className="text-base">Large</Label>
          </div>
        </RadioGroup>
      </div>
    </SettingsCategory>
  );
};

export default DisplaySettingsSection;
