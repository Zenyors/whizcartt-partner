
import React, { useState } from 'react';
import { Check, Globe } from 'lucide-react';
import SettingsCategory from './SettingsCategory';
import SettingsItem from './SettingsItem';
import { useSettings } from '@/hooks/useSettings';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const LanguageSection: React.FC = () => {
  const { settings, updateLanguage } = useSettings();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const getLanguageLabel = () => {
    const lang = settings.availableLanguages.find(l => l.value === settings.language);
    return lang ? lang.label : 'English';
  };
  
  return (
    <>
      <SettingsCategory title="Language">
        <SettingsItem 
          icon={<Globe className="h-5 w-5 text-gray-600" />}
          label="Language"
          description={getLanguageLabel()}
          onClick={() => setIsDialogOpen(true)}
        />
      </SettingsCategory>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Select Language</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="max-h-[300px] overflow-y-auto">
              {settings.availableLanguages.map((language) => (
                <div
                  key={language.value}
                  className="flex items-center justify-between p-3 hover:bg-gray-100 cursor-pointer rounded-md"
                  onClick={() => {
                    updateLanguage(language.value);
                    setIsDialogOpen(false);
                  }}
                >
                  <span>{language.label}</span>
                  {settings.language === language.value && (
                    <Check className="h-4 w-4 text-green-500" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LanguageSection;
