
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ShieldCheck, User, LogIn, Shield, ChevronRight, CheckCircle } from 'lucide-react';

const WelcomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center">
            <div className="h-10 w-10 bg-primary flex items-center justify-center rounded-md">
              <ShieldCheck className="h-6 w-6 text-white" />
            </div>
            <h1 className="ml-2 text-2xl font-bold text-gray-900 dark:text-white">MinQuan</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <Button variant="outline" asChild>
                <Link to="/dashboard">
                  <User className="h-5 w-5 mr-2" />
                  Dashboard
                </Link>
              </Button>
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link to="/login">
                    <LogIn className="h-5 w-5 mr-2" />
                    Đăng nhập
                  </Link>
                </Button>
                <Button asChild>
                  <Link to="/register">
                    <Shield className="h-5 w-5 mr-2" />
                    Đăng ký
                  </Link>
                </Button>
              </>
            )}
          </div>
        </header>

        <main className="flex flex-col items-center">
          <div className="max-w-3xl text-center animate-fade-in mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
              Giải pháp quản lý doanh nghiệp toàn diện
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
              Hệ thống quản lý tích hợp đa nền tảng giúp bạn vận hành hiệu quả, tối ưu chi phí và tăng trưởng doanh thu
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
                <Link to="/register">
                  <Shield className="h-5 w-5 mr-2" />
                  Dùng thử miễn phí
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="#features">
                  Tìm hiểu thêm
                  <ChevronRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>

          <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
            <FeatureCard
              icon={<Shield className="h-6 w-6 text-primary" />}
              title="Quản lý đơn hàng"
              description="Theo dõi và quản lý đơn hàng từ nhiều kênh bán hàng một cách hiệu quả"
            />
            <FeatureCard
              icon={<LogIn className="h-6 w-6 text-primary" />}
              title="Quản lý kho hàng"
              description="Kiểm soát hàng tồn kho, nhập xuất hàng và cảnh báo hết hàng tự động"
            />
            <FeatureCard
              icon={<ShieldCheck className="h-6 w-6 text-primary" />}
              title="Báo cáo thống kê"
              description="Báo cáo doanh thu, lợi nhuận và các chỉ số kinh doanh quan trọng"
            />
          </div>
          
          <div className="mt-20 w-full max-w-5xl">
            <h3 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
              Tại sao chọn MinQuan?
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <WhyUsCard
                title="Tiết kiệm chi phí"
                description="Giảm 30% chi phí vận hành nhờ hệ thống tự động hóa quy trình"
              />
              <WhyUsCard
                title="Tăng năng suất"
                description="Tăng năng suất nhân viên lên 50% với các công cụ quản lý hiệu quả"
              />
              <WhyUsCard
                title="Dễ dàng sử dụng"
                description="Giao diện thân thiện, dễ học và áp dụng cho mọi đối tượng"
              />
              <WhyUsCard
                title="Hỗ trợ 24/7"
                description="Đội ngũ hỗ trợ chuyên nghiệp luôn sẵn sàng giúp đỡ bạn"
              />
            </div>
          </div>
        </main>
        
        <footer className="mt-20 pb-10 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>© 2025 MinQuan. Tất cả các quyền được bảo lưu.</p>
        </footer>
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

const WhyUsCard: React.FC<{
  title: string;
  description: string;
}> = ({ title, description }) => {
  return (
    <div className="flex items-start">
      <div className="flex-shrink-0 mt-1">
        <CheckCircle className="h-5 w-5 text-primary" />
      </div>
      <div className="ml-4">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h4>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </div>
  );
};

export default WelcomePage;
