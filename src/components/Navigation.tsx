import { Home, BookOpen, MessageSquare, Building2, FileText, Bell, User, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useAuth } from '../hooks/useAuth';
import { useNotifications } from '../hooks/useNotifications';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover';

interface NavigationProps {
  currentPage: 'dashboard' | 'resources' | 'feedback' | 'departments' | 'requests' | 'profile';
  onNavigate: (page: 'dashboard' | 'resources' | 'feedback' | 'departments' | 'requests' | 'profile') => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const { user, signOut } = useAuth();
  const { notifications, unreadCount, markAsRead } = useNotifications();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: Home },
    { id: 'resources' as const, label: 'Resources', icon: BookOpen },
    { id: 'departments' as const, label: 'Departments', icon: Building2 },
    { id: 'feedback' as const, label: 'Feedback', icon: MessageSquare },
    { id: 'requests' as const, label: 'My Requests', icon: FileText },
  ];

  const handleNotificationClick = (notification: any) => {
    markAsRead(notification.id);
    if (notification.link) {
      onNavigate(notification.link as any);
    }
  };

  return (
    <nav className="bg-[#0F172A] border-b border-[#334155] sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <div className="flex items-center gap-4 sm:gap-8 flex-1">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-[#F59E0B] to-[#D97706] rounded-lg flex items-center justify-center transform hover:scale-110 transition-all duration-300 shadow-lg">
                <span className="text-white" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.125rem, 3vw, 1.5rem)' }}>S</span>
              </div>
              <span className="text-white hidden sm:inline" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(0.875rem, 2vw, 1.25rem)' }}>Student Hub</span>
            </div>
            
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`px-3 lg:px-4 py-2 rounded-lg transition-all duration-300 whitespace-nowrap ${
                      isActive 
                        ? 'bg-[#F59E0B] text-white shadow-md hover:shadow-lg' 
                        : 'bg-transparent text-[#94A3B8] hover:bg-[#1E293B] hover:text-white'
                    }`}
                    style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.75rem sm:0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}
                  >
                    <Icon className="w-4 h-4 inline-block mr-1 lg:mr-2" />
                    <span className="hidden lg:inline">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Notifications */}
            <Popover>
              <PopoverTrigger asChild>
                <button className="relative w-10 sm:w-11 h-10 sm:h-11 bg-[#1E293B] rounded-lg hover:bg-[#334155] transition-all duration-300 flex items-center justify-center group">
                  <Bell className="w-4 sm:w-5 h-4 sm:h-5 text-[#94A3B8] group-hover:text-[#F59E0B]" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-[#F59E0B] rounded-full text-white shadow-lg" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700 }}>
                      {unreadCount}
                    </span>
                  )}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-white border border-[#E2E8F0] rounded-lg shadow-xl" align="end">
                <div className="space-y-3">
                  <h4 className="mb-4">Notifications</h4>
                  {notifications.length === 0 ? (
                    <p className="text-center py-6 text-[#64748B]" style={{ fontFamily: 'var(--font-mono)' }}>No notifications</p>
                  ) : (
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {notifications.slice(0, 5).map((notification) => (
                        <div
                          key={notification.id}
                          onClick={() => handleNotificationClick(notification)}
                          className={`p-3 sm:p-4 rounded-lg cursor-pointer transition-all duration-300 hover:translate-x-1 ${
                            notification.read ? 'bg-[#F8F9FA] border border-[#E2E8F0]' : 'bg-[#FEF3C7] border border-[#F59E0B]'
                          }`}
                        >
                          <div className="flex items-start gap-2 sm:gap-3">
                            <Bell className="w-4 sm:w-5 h-4 sm:h-5 mt-1 flex-shrink-0 text-[#F59E0B]" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm sm:text-base" style={{ fontFamily: 'var(--font-body)', fontWeight: 600 }}>{notification.title}</p>
                              <p className="mt-1 text-[#64748B] text-xs sm:text-sm" style={{ fontSize: 'clamp(0.75rem, 1vw, 0.875rem)' }}>{notification.message}</p>
                              <p className="mt-2 text-[#94A3B8]" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                                {new Date(notification.timestamp).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </PopoverContent>
            </Popover>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-10 sm:w-11 h-10 sm:h-11 bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-lg border border-[#F59E0B] hover:shadow-lg transition-all duration-300 flex items-center justify-center group">
                  <User className="w-4 sm:w-5 h-4 sm:h-5 text-[#F59E0B]" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white border border-[#E2E8F0] rounded-lg shadow-xl min-w-[200px]">
                <DropdownMenuLabel>
                  <div>
                    <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600 }}>{user?.name || 'Student'}</p>
                    <p className="text-[#64748B] text-xs sm:text-sm" style={{ fontFamily: 'var(--font-mono)' }}>{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-[#E2E8F0]" />
                <DropdownMenuItem onClick={() => onNavigate('profile')} className="hover:bg-[#F8F9FA] transition-all duration-200 cursor-pointer">
                  <User className="w-4 h-4 mr-2 text-[#0F172A]" />
                  My Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onNavigate('requests')} className="hover:bg-[#F8F9FA] transition-all duration-200 cursor-pointer">
                  <FileText className="w-4 h-4 mr-2 text-[#0F172A]" />
                  My Requests
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-[#E2E8F0]" />
                <DropdownMenuItem onClick={signOut} className="hover:bg-[#FEE2E2] text-[#DC2626] transition-all duration-200 cursor-pointer">
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile navigation */}
        <div className="md:hidden flex items-center gap-2 pb-4 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-3 py-2 rounded-lg flex-shrink-0 flex items-center gap-2 transition-all duration-300 ${
                  isActive 
                    ? 'bg-[#F59E0B] text-white' 
                    : 'bg-transparent text-[#94A3B8] hover:bg-[#1E293B]'
                }`}
                style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase' }}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
