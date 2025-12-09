import { useState } from 'react';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { DarkModeProvider } from './hooks/useDarkMode';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { UserProfilePage } from './components/UserProfilePage';
import { ResourcesPage } from './components/ResourcesPage';
import { DepartmentsPage } from './components/DepartmentsPage';
import { FeedbackPage } from './components/FeedbackPage';
import { MyRequestsPage } from './components/MyRequestsPage';
import { Toaster } from './components/ui/sonner';
import { DataInitializer } from './components/DataInitializer';
import ExpandableDock from './components/ExpandableDock';
import { LayoutDashboard, BookOpen, Award, CreditCard, Home, User, Brain, Code2 } from 'lucide-react';
import { CoursePage } from './components/CoursePage';
import { ResultPage } from './components/ResultPage';
import { PaymentPage } from './components/PaymentPage';
import { HostelPage } from './components/HostelPage';
import { AuthPage } from './components/AuthPage';
import { AIDashboard } from './components/AIDashboard';
import { AIAssistantChat } from './components/AIAssistantChat';
import { DarkModeToggle } from './components/DarkModeToggle';
import { DeveloperPage } from './components/DeveloperPage';

type PageType = 
  | 'dashboard' 
  | 'resources'
  | 'departments'
  | 'feedback'
  | 'requests'
  | 'profile'
  | 'ai-dashboard'
  | 'developer'
  // Course sections
  | 'course-registration'
  | 'course-view'
  | 'course-form'
  | 'course-drop'
  | 'course-dockets'
  // Result
  | 'result'
  // Payment sections
  | 'payment-hostel'
  | 'payment-tuition'
  | 'payment-status'
  | 'payment-receipts'
  // Hostel sections
  | 'hostel-reservation'
  | 'hostel-history';

function MainApp() {
  const { user, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary animate-spin mx-auto mb-6" style={{ borderTopColor: 'transparent' }}></div>
          <p className="uppercase tracking-wider" style={{ fontFamily: 'var(--font-mono)' }}>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'ai-dashboard':
        return <AIDashboard />;
      case 'resources':
        return <ResourcesPage />;
      case 'departments':
        return <DepartmentsPage />;
      case 'feedback':
        return <FeedbackPage />;
      case 'requests':
        return <MyRequestsPage />;
      case 'profile':
        return <UserProfilePage />;
      case 'developer':
        return <DeveloperPage />;
      // Course pages
      case 'course-registration':
        return <CoursePage section="registration" />;
      case 'course-view':
        return <CoursePage section="view" />;
      case 'course-form':
        return <CoursePage section="form" />;
      case 'course-drop':
        return <CoursePage section="drop" />;
      case 'course-dockets':
        return <CoursePage section="dockets" />;
      // Result page
      case 'result':
        return <ResultPage />;
      // Payment pages
      case 'payment-hostel':
        return <PaymentPage section="hostel" />;
      case 'payment-tuition':
        return <PaymentPage section="tuition" />;
      case 'payment-status':
        return <PaymentPage section="status" />;
      case 'payment-receipts':
        return <PaymentPage section="receipts" />;
      // Hostel pages
      case 'hostel-reservation':
        return <HostelPage section="reservation" />;
      case 'hostel-history':
        return <HostelPage section="history" />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation currentPage={currentPage as any} onNavigate={(page) => setCurrentPage(page as PageType)} />
      <main className="w-full min-h-screen">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-8 sm:py-12">
          {renderPage()}
        </div>
      </main>
      
      {/* Dark Mode Toggle - Top Right */}
      <DarkModeToggle />
      
      {/* AI Assistant Chat - Always Available */}
      <AIAssistantChat />
      
      {/* Expandable Vertical Dock Navigation */}
      <ExpandableDock
        items={[
          {
            icon: <LayoutDashboard className="w-6 h-6" />,
            label: 'Dashboard',
            onClick: () => setCurrentPage('dashboard'),
            className: currentPage === 'dashboard' ? 'ring-2 ring-[#F59E0B]' : ''
          },
          {
            icon: <BookOpen className="w-6 h-6" />,
            label: 'Course',
            className: currentPage.startsWith('course-') ? 'ring-2 ring-[#F59E0B]' : '',
            subItems: [
              { label: 'Course Registration', onClick: () => setCurrentPage('course-registration') },
              { label: 'View Registered Courses', onClick: () => setCurrentPage('course-view') },
              { label: 'Course Form', onClick: () => setCurrentPage('course-form') },
              { label: 'Drop Courses', onClick: () => setCurrentPage('course-drop') },
              { label: 'Examination Dockets', onClick: () => setCurrentPage('course-dockets') }
            ]
          },
          {
            icon: <Award className="w-6 h-6" />,
            label: 'Result',
            onClick: () => setCurrentPage('result'),
            className: currentPage === 'result' ? 'ring-2 ring-[#F59E0B]' : '',
            subItems: [
              { label: 'My Result', onClick: () => setCurrentPage('result') }
            ]
          },
          {
            icon: <CreditCard className="w-6 h-6" />,
            label: 'Payment',
            className: currentPage.startsWith('payment-') ? 'ring-2 ring-[#F59E0B]' : '',
            subItems: [
              { label: 'Hostel Payment', onClick: () => setCurrentPage('payment-hostel') },
              { label: 'Tuition Fee', onClick: () => setCurrentPage('payment-tuition') },
              { label: 'Check Payment Status', onClick: () => setCurrentPage('payment-status') },
              { label: 'Payment Receipts', onClick: () => setCurrentPage('payment-receipts') }
            ]
          },
          {
            icon: <Home className="w-6 h-6" />,
            label: 'Hostel',
            className: currentPage.startsWith('hostel-') ? 'ring-2 ring-[#F59E0B]' : '',
            subItems: [
              { label: 'Hostel Reservation', onClick: () => setCurrentPage('hostel-reservation') },
              { label: 'View Reservation History', onClick: () => setCurrentPage('hostel-history') }
            ]
          },
          {
            icon: <User className="w-6 h-6" />,
            label: 'Profile',
            onClick: () => setCurrentPage('profile'),
            className: currentPage === 'profile' ? 'ring-2 ring-[#F59E0B]' : ''
          },
          {
            icon: <Brain className="w-6 h-6" />,
            label: 'AI Dashboard',
            onClick: () => setCurrentPage('ai-dashboard'),
            className: currentPage === 'ai-dashboard' ? 'ring-2 ring-[#F59E0B]' : ''
          },
          {
            icon: <Code2 className="w-6 h-6" />,
            label: 'Developer',
            onClick: () => setCurrentPage('developer'),
            className: currentPage === 'developer' ? 'ring-2 ring-[#F59E0B]' : ''
          }
        ]}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <DarkModeProvider>
        <MainApp />
        <Toaster />
      </DarkModeProvider>
    </AuthProvider>
  );
}