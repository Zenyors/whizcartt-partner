
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
    return savedSettings ? JSON.parse(savedSettings) : {
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
  });

  // Apply dark mode on initial load
  useEffect(() => {
    document.documentElement.classList.toggle('dark', settings.darkMode);
  }, []);

  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem('userSettings', JSON.stringify(settings));
    
    // Apply dark mode when it changes
    document.documentElement.classList.toggle('dark', settings.darkMode);
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
      title: value ? "Dark mode enabled" : "Dark mode disabled",
    });
  };

  const updateLanguage = (value: string) => {
    setSettings(prev => ({ ...prev, language: value }));
    toast({
      title: "Language updated",
      description: `Language changed to ${value}`,
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
    toast({
      title: "Privacy setting updated",
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
