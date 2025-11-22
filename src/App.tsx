import { useState } from 'react';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { ResourcesPage } from './components/ResourcesPage';
import { FeedbackPage } from './components/FeedbackPage';
import { DepartmentsPage } from './components/DepartmentsPage';
import { MyRequestsPage } from './components/MyRequestsPage';
import { AuthPage } from './components/AuthPage';
import { UserProfilePage } from './components/UserProfilePage';
import { Toaster } from './components/ui/sonner';
import { DataInitializer } from './components/DataInitializer';

function AppContent() {
  const { user, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'resources' | 'feedback' | 'departments' | 'requests' | 'profile'>('dashboard');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
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
        return <Dashboard onNavigate={setCurrentPage} />;
      case 'resources':
        return <ResourcesPage />;
      case 'feedback':
        return <FeedbackPage />;
      case 'departments':
        return <DepartmentsPage />;
      case 'requests':
        return <MyRequestsPage />;
      case 'profile':
        return <UserProfilePage />;
      default:
        return <Dashboard onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderPage()}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <DataInitializer />
      <AppContent />
      <Toaster />
    </AuthProvider>
  );
}