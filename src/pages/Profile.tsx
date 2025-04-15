import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { User, Mail } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.user_metadata?.name || '',
    email: user?.email || '',
  });

  // Get user initials for avatar fallback
  const getInitials = () => {
    const name = user?.user_metadata?.name || user?.email || '';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Auto-save functionality - updates profile whenever form data changes
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // If changing name field, auto-update the profile
    if (name === 'name') {
      setIsLoading(true);
      try {
        await updateProfile({
          name: value,
        });
        
        // Optionally show a toast for successful update
        toast({
          title: "Profile Updated",
          description: "Your profile has been updated automatically",
          variant: "default",
        });
      } catch (error) {
        toast({
          title: "Update Failed",
          description: "There was an error updating your profile.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader 
        title="Profile Settings" 
        subtitle="Manage your account information and preferences" 
      />

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column - Profile Overview */}
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Profile Overview</CardTitle>
            <CardDescription>Your personal information and account details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center text-center mb-8 p-4 bg-gray-50 rounded-lg">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={user?.user_metadata?.avatar_url || ''} />
                <AvatarFallback className="text-xl bg-invento-100 text-invento-700">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-semibold text-gray-900">
                {formData.name || 'User'}
              </h3>
              <p className="text-gray-500">{formData.email}</p>
            </div>

            <div className="space-y-4">
              <form className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-500" />
                    Full Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    disabled={isLoading}
                    className="animate-fade-in"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    Email Address
                  </label>
                  <Input
                    id="email"
                    value={formData.email}
                    disabled
                    className="bg-gray-50"
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Email cannot be changed. Please contact support if you need to update your email.
                </p>
              </form>
            </div>
          </CardContent>
        </Card>

        {/* Right Column - Account Information */}
        <div className="w-full md:w-96 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Details about your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">User ID</span>
                </div>
                <span className="text-sm font-mono">{user?.id?.substring(0, 8)}...</span>
              </div>
              
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Account Type</span>
                </div>
                <span className="text-sm font-medium">
                  {user?.app_metadata?.role || 'Standard User'}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;