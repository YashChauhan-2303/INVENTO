import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2, User, Shield, Clock, Mail, Key } from 'lucide-react';
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await updateProfile({
        name: formData.name,
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
  };

  const handleChangePassword = () => {
    toast({
      title: "Coming Soon",
      description: "Password change functionality will be available in a future update.",
      variant: "default",
    });
  };

  const handleEnableNotifications = () => {
    toast({
      title: "Coming Soon",
      description: "Notification preferences will be available in a future update.",
      variant: "default",
    });
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
              <p className="text-sm text-gray-500">{formData.email}</p>
              <div className="flex items-center mt-2 text-sm text-invento-600">
                <Shield className="h-4 w-4 mr-1" />
                <span>{user?.app_metadata?.role || 'Standard User'}</span>
              </div>
            </div>

            <div className="space-y-6">
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your full name"
                      className="max-w-md"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <div className="flex max-w-md">
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
                  </div>

                  <Button type="submit" disabled={isLoading} className="mt-2">
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </CardContent>
        </Card>

        {/* Right Column - Additional Settings */}
        <div className="w-full md:w-96 space-y-6">
          {/* Account Information */}
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Details about your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Member Since</span>
                </div>
                <span className="text-sm font-medium">
                  {new Date(user?.created_at || '').toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Email Status</span>
                </div>
                <span className="text-sm font-medium text-green-600">
                  Verified
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Account Type</span>
                </div>
                <span className="text-sm font-medium">
                  {user?.app_metadata?.role || 'Standard User'}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>Manage your account security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Key className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">Password</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Last changed 30 days ago
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleChangePassword}
                >
                  Change
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-sm font-medium">Two-Factor Auth</span>
                  <p className="text-xs text-gray-500">
                    Add an extra layer of security
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleEnableNotifications}
                >
                  Enable
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile; 