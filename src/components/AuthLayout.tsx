
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-slate-800">
      {/* Left Side - Branding */}
      <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center text-center animate-fade-in">
        <Link to="/" className="mb-6">
          <div className="flex items-center justify-center">
            <div className="h-16 w-16 rounded-lg bg-primary flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-8 w-8 text-white"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                <path d="m16 8-8 8" />
                <path d="m8 8 8 8" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold ml-3 text-gray-900 dark:text-white">MinQuan</h1>
          </div>
        </Link>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
          Giải pháp quản lý doanh nghiệp toàn diện
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md mx-auto">
          Hệ thống quản lý doanh nghiệp tích hợp đa nền tảng giúp bạn vận hành hiệu quả
        </p>
      </div>

      {/* Right Side - Auth Form */}
      <div className="w-full md:w-1/2 p-8 flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">{subtitle}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
