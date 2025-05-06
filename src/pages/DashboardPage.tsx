
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '../contexts/AuthContext';
import ProfileCard from '../components/ProfileCard';
import TokenInfoCard from '../components/TokenInfoCard';
import { LogOut, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  const verifyApiCall = () => {
    // This would be a real API call in a production app
    setTimeout(() => {
      toast.success("Token verified successfully");
    }, 500);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-slate-800">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-primary flex items-center justify-center rounded-md">
                <ShieldCheck className="h-5 w-5 text-white" />
              </div>
              <h1 className="ml-2 text-xl font-semibold text-gray-900 dark:text-white">
                SecureAuth Dashboard
              </h1>
            </div>
            <Button variant="outline" onClick={handleLogout} className="flex items-center">
              <LogOut className="h-4 w-4 mr-2" />
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 md:grid-cols-2 animate-fade-in">
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              Welcome, {user.name}!
            </h2>
            <div className="space-y-6">
              <ProfileCard user={user} />
              
              <div>
                <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">
                  API Interactions
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  <Button onClick={verifyApiCall}>
                    <ShieldCheck className="h-4 w-4 mr-2" />
                    Verify Token
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              Auth Status
            </h2>
            <TokenInfoCard />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
