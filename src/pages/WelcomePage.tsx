
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ShieldCheck, User, LogIn, Shield } from 'lucide-react';

const WelcomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-16">
        <header className="flex justify-center mb-12">
          <div className="flex items-center">
            <div className="h-10 w-10 bg-primary flex items-center justify-center rounded-md">
              <ShieldCheck className="h-6 w-6 text-white" />
            </div>
            <h1 className="ml-2 text-2xl font-bold text-gray-900 dark:text-white">SecureAuth</h1>
          </div>
        </header>

        <main className="flex flex-col items-center">
          <div className="max-w-3xl text-center animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
              Secure Authentication Service
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
              A robust authentication system featuring user registration, login functionality, 
              and JWT token verification designed for modern web applications.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-16">
              {isAuthenticated ? (
                <Button size="lg" asChild>
                  <Link to="/dashboard">
                    <User className="h-5 w-5 mr-2" />
                    Go to Dashboard
                  </Link>
                </Button>
              ) : (
                <>
                  <Button size="lg" asChild>
                    <Link to="/register">
                      <Shield className="h-5 w-5 mr-2" />
                      Get Started
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/login">
                      <LogIn className="h-5 w-5 mr-2" />
                      Sign In
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
            <FeatureCard
              icon={<Shield className="h-6 w-6 text-primary" />}
              title="Secure Registration"
              description="Create an account with email validation and secure password storage"
            />
            <FeatureCard
              icon={<LogIn className="h-6 w-6 text-primary" />}
              title="Seamless Login"
              description="Simple and secure authentication process with JWT tokens"
            />
            <FeatureCard
              icon={<ShieldCheck className="h-6 w-6 text-primary" />}
              title="Token Verification"
              description="Real-time token validation and secure session management"
            />
          </div>
        </main>
      </div>
    </div>
  );
};

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow auth-card">
      <div className="h-12 w-12 bg-blue-50 dark:bg-gray-700 rounded-md flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
};

export default WelcomePage;
