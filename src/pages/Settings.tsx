import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { Moon, Globe, RotateCw } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { AppSettings } from '@/types';

const Settings = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<AppSettings>({
    theme: 'light',
    language: 'en',
    autoBackup: false,
  });
  
  const { toast } = useToast();
  
  const toggleDarkMode = () => {
    setSettings(prev => ({
      ...prev,
      theme: prev.theme === 'light' ? 'dark' : 'light'
    }));
    // Show toast for immediate feedback
    toast({
      title: "Theme Updated",
      description: `Switched to ${settings.theme === 'light' ? 'dark' : 'light'} mode`,
    });
  };
  
  const toggleAutomaticBackup = () => {
    setSettings(prev => ({
      ...prev,
      autoBackup: !prev.autoBackup
    }));
    // Show toast for immediate feedback
    toast({
      title: "Backup Setting Updated",
      description: `Automatic backup ${!settings.autoBackup ? 'enabled' : 'disabled'}`,
    });
  };
  
  const handleLanguageChange = (value: 'en' | 'es' | 'fr' | 'de') => {
    setSettings(prev => ({
      ...prev,
      language: value
    }));
    // Show toast for immediate feedback
    toast({
      title: "Language Updated",
      description: "Language preference has been changed",
    });
  };

  return (
    <div>
      <PageHeader 
        title="Settings" 
        subtitle="Manage your application preferences" 
      />
      
      <Tabs defaultValue="general" className="w-full mb-6 animate-fade-in">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="account" onClick={() => navigate('/profile')}>Account</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="bg-gray-50 rounded-lg p-6 animate-fade-in">
        <div className="bg-white rounded-lg shadow border border-gray-100">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">General Settings</h3>
            <p className="text-sm text-gray-500 mb-6">Manage your application preferences</p>
            
            <div className="space-y-6">
              {/* <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center">
                  <div className="bg-yellow-100 p-2 rounded-full mr-4">
                    <Moon className="h-5 w-5 text-yellow-700" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Dark Mode</h4>
                    <p className="text-sm text-gray-500">Toggle between dark and light theme</p>
                  </div>
                </div>
                <Switch
                  checked={settings.theme === 'dark'}
                  onCheckedChange={toggleDarkMode}
                />
              </div> */}
              
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
                      <SelectItem value="es">More Coming Soon!!</SelectItem>
                      {/* <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem> */}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* <div className="flex items-center justify-between py-3">
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-4">
                    <RotateCw className="h-5 w-5 text-green-700" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Automatic Backup</h4>
                    <p className="text-sm text-gray-500">Enable automatic data backup</p>
                  </div>
                </div>
                <Switch
                  checked={settings.autoBackup}
                  onCheckedChange={toggleAutomaticBackup}
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        INVENTO version 1.0.0
      </div>
    </div>
  );
};

export default Settings;
