
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface SettingsState {
  notifications: boolean;
  darkMode: boolean;
  language: string;
  availableLanguages: { value: string; label: string }[];
  privacySettings: {
    shareData: boolean;
    storeAnalytics: boolean;
    marketingEmails: boolean;
  };
}

export function useSettings() {
  const { toast } = useToast();
  
  // Initialize settings from localStorage or use defaults
  const [settings, setSettings] = useState<SettingsState>(() => {
    const savedSettings = localStorage.getItem('userSettings');
    
    // Default settings
    const defaultSettings = {
      notifications: true,
      darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
      language: 'english',
      availableLanguages: [
        { value: 'english', label: 'English' },
        { value: 'hindi', label: 'Hindi' },
        { value: 'tamil', label: 'Tamil' },
        { value: 'telugu', label: 'Telugu' },
        { value: 'malayalam', label: 'Malayalam' }
      ],
      privacySettings: {
        shareData: false,
        storeAnalytics: true,
        marketingEmails: false
      }
    };
    
    // Use saved settings if available
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        return { ...defaultSettings, ...parsedSettings };
      } catch (error) {
        console.error("Error parsing saved settings:", error);
        return defaultSettings;
      }
    }
    
    return defaultSettings;
  });

  // Apply dark mode on initial load and when settings change
  useEffect(() => {
    // Apply dark mode class to the HTML element
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Save settings to localStorage whenever they change
    localStorage.setItem('userSettings', JSON.stringify(settings));
  }, [settings]);

  const updateNotifications = (value: boolean) => {
    setSettings(prev => ({ ...prev, notifications: value }));
    toast({
      title: value ? "Notifications enabled" : "Notifications disabled",
      description: value 
        ? "You will now receive notifications" 
        : "You will no longer receive notifications",
    });
  };

  const updateDarkMode = (value: boolean) => {
    setSettings(prev => ({ ...prev, darkMode: value }));
    toast({
      title: value ? "Dark mode enabled" : "Light mode enabled",
      description: value 
        ? "App theme switched to dark mode" 
        : "App theme switched to light mode",
    });
  };

  const updateLanguage = (value: string) => {
    setSettings(prev => ({ ...prev, language: value }));
    
    // Find the language label for the toast
    const languageLabel = settings.availableLanguages.find(lang => lang.value === value)?.label || value;
    
    toast({
      title: "Language updated",
      description: `Language changed to ${languageLabel}`,
    });
  };

  const updatePrivacySetting = (key: keyof SettingsState['privacySettings'], value: boolean) => {
    setSettings(prev => ({
      ...prev,
      privacySettings: {
        ...prev.privacySettings,
        [key]: value
      }
    }));
    
    const settingLabels: Record<keyof SettingsState['privacySettings'], string> = {
      shareData: "Share usage data",
      storeAnalytics: "Store analytics",
      marketingEmails: "Marketing emails"
    };
    
    toast({
      title: "Privacy setting updated",
      description: `${settingLabels[key]} ${value ? 'enabled' : 'disabled'}`,
    });
  };

  return {
    settings,
    updateNotifications,
    updateDarkMode,
    updateLanguage,
    updatePrivacySetting
  };
}
