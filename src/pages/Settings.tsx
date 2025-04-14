
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Moon, Globe, RotateCw, Save } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { AppSettings } from '@/types';

const Settings = () => {
  const [settings, setSettings] = useState<AppSettings>({
    theme: 'light',
    language: 'en',
    autoBackup: false,
  });
  
  const { toast } = useToast();
  
  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated",
    });
  };
  
  const toggleDarkMode = () => {
    setSettings(prev => ({
      ...prev,
      theme: prev.theme === 'light' ? 'dark' : 'light'
    }));
  };
  
  const toggleAutomaticBackup = () => {
    setSettings(prev => ({
      ...prev,
      autoBackup: !prev.autoBackup
    }));
  };
  
  const handleLanguageChange = (value: 'en' | 'es' | 'fr' | 'de') => {
    setSettings(prev => ({
      ...prev,
      language: value
    }));
  };

  return (
    <div>
      <PageHeader 
        title="Settings" 
        subtitle="Manage your application preferences" 
      />
      
      <Tabs defaultValue="general" className="w-full mb-6 animate-fade-in">
        <TabsList className="grid w-full max-w-md grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="bg-gray-50 rounded-lg p-6 animate-fade-in">
        <div className="bg-white rounded-lg shadow border border-gray-100 mb-6">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">General Settings</h3>
            <p className="text-sm text-gray-500 mb-6">Manage your application preferences</p>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center">
                  <div className="bg-yellow-100 p-2 rounded-full mr-4">
                    <Moon className="h-5 w-5 text-yellow-700" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Dark Mode</h4>
                    <p className="text-sm text-gray-500">Toggle between dark and light theme</p>
                  </div>
                </div>
                <div className="flex items-center h-6">
                  <button
                    onClick={toggleDarkMode}
                    className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
                      settings.theme === 'dark' ? 'bg-invento-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                        settings.theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-full mr-4">
                    <Globe className="h-5 w-5 text-blue-700" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Language</h4>
                    <p className="text-sm text-gray-500">Select your preferred language</p>
                  </div>
                </div>
                <div className="w-40">
                  <Select 
                    value={settings.language} 
                    onValueChange={(value: 'en' | 'es' | 'fr' | 'de') => handleLanguageChange(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-4">
                    <RotateCw className="h-5 w-5 text-green-700" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Automatic Backup</h4>
                    <p className="text-sm text-gray-500">Enable automatic data backup</p>
                  </div>
                </div>
                <div className="flex items-center h-6">
                  <button
                    onClick={toggleAutomaticBackup}
                    className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
                      settings.autoBackup ? 'bg-invento-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                        settings.autoBackup ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
            <Button onClick={handleSaveSettings}>
              <Save className="mr-2 h-4 w-4" /> Save Changes
            </Button>
          </div>
        </div>
        
        {/* Other settings sections would go here */}
        <div className="text-center text-gray-500 text-sm">
          <p>INVENTO version 1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
