import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ArrowRight, Calendar, MessageCircle, BookOpen, TrendingUp, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Badge } from './ui/badge';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import SpotlightCard from './SpotlightCard';
import Dock from './Dock';

interface DashboardProps {
  onNavigate: (page: 'dashboard' | 'resources' | 'feedback' | 'departments' | 'requests' | 'profile') => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const quickStats = [
    { label: 'Active Resources', value: '247', change: '+12', icon: BookOpen, color: 'text-[#0F172A]', bgColor: 'bg-[#F8F9FA]', borderColor: 'border-[#0F172A]' },
    { label: 'Open Feedback', value: '3', change: '-2', icon: MessageCircle, color: 'text-[#F59E0B]', bgColor: 'bg-[#FEF3C7]', borderColor: 'border-[#F59E0B]' },
    { label: 'Upcoming Events', value: '8', change: '+3', icon: Calendar, color: 'text-[#1E293B]', bgColor: 'bg-[#F1F5F9]', borderColor: 'border-[#1E293B]' },
    { label: 'Department Updates', value: '15', change: '+5', icon: TrendingUp, color: 'text-[#0F172A]', bgColor: 'bg-white', borderColor: 'border-[#E2E8F0]' },
  ];

  const recentAnnouncements = [
    { title: 'New Mental Health Resources', department: 'Student Wellness', time: '2 hours ago', priority: 'high' },
    { title: 'Career Fair Registration Open', department: 'Career Services', time: '5 hours ago', priority: 'medium' },
    { title: 'Library Hours Extended', department: 'Library Services', time: '1 day ago', priority: 'low' },
  ];

  const quickActions = [
    { label: 'Submit Feedback', action: () => onNavigate('feedback'), icon: MessageCircle, color: 'bg-[#0F172A]' },
    { label: 'Browse Resources', action: () => onNavigate('resources'), icon: BookOpen, color: 'bg-[#F59E0B]' },
    { label: 'Contact Department', action: () => onNavigate('departments'), icon: ArrowRight, color: 'bg-[#1E293B]' },
  ];

  return (
    <div className="space-y-8 pb-32">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1 
          className="mb-3" 
          style={{ 
            fontFamily: 'var(--font-mono)', 
            fontWeight: 700, 
            fontSize: '3rem', 
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            background: 'linear-gradient(135deg, #0F172A 0%, #F59E0B 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          Welcome back, {user?.name || 'Student'}!
        </h1>
        <p 
          className="text-[#64748B]" 
          style={{ 
            fontFamily: 'var(--font-body)', 
            fontWeight: 700, 
            fontSize: '1.25rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
          }}
        >
          Your centralized hub for all campus resources and communications
        </p>
      </motion.div>

      {/* Alert */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.01 }}
      >
        <div className="bg-gradient-to-r from-[#FEF3C7] to-[#FED7AA] border-l-4 border-[#F59E0B] p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
          <div className="flex gap-4">
            <AlertCircle className="h-6 w-6 flex-shrink-0 text-[#F59E0B]" />
            <div>
              <h4 className="mb-2 text-[#0F172A]">System Update</h4>
              <p className="text-[#1E293B]">New cross-department search feature now available! Find resources across all departments instantly.</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.2 + index * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
              whileHover={{ 
                scale: 1.02, 
                y: -4
              }}
            >
              <SpotlightCard className="p-6 cursor-pointer group">
                <div className="flex items-start justify-between mb-4">
                  <Icon className={`w-10 h-10 ${stat.color}`} />
                </div>
                <p className="uppercase tracking-wider text-[#64748B] mb-2" style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 700 }}>{stat.label}</p>
                <div className="flex items-baseline gap-3">
                  <span className="text-[#0F172A]" style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', lineHeight: 1 }}>{stat.value}</span>
                  <span className={`${stat.color}`} style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{stat.change}</span>
                </div>
              </SpotlightCard>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <motion.div
          className="lg:col-span-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="bg-white border-2 border-[#E2E8F0] rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
            <div className="mb-6">
              <h3 className="mb-2">Quick Actions</h3>
              <p className="text-[#64748B]" style={{ fontSize: '0.875rem' }}>Common tasks and shortcuts</p>
            </div>
            <div className="space-y-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <motion.button
                    key={action.label}
                    onClick={action.action}
                    className={`w-full ${action.color} text-white rounded-lg p-4 flex items-center gap-3 transition-all duration-300 shadow-md hover:shadow-lg group relative overflow-hidden`}
                    style={{ fontFamily: 'var(--font-body)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.875rem' }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon className="w-5 h-5 relative z-10" />
                    <span className="relative z-10">{action.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Recent Announcements */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="bg-white border-2 border-[#E2E8F0] rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
            <div className="mb-6">
              <h3 className="mb-2">Recent Announcements</h3>
              <p className="text-[#64748B]" style={{ fontSize: '0.875rem' }}>Latest updates from all departments</p>
            </div>
            <div className="space-y-4">
              {recentAnnouncements.map((announcement, index) => (
                <motion.div
                  key={index}
                  className={`flex items-start justify-between p-5 rounded-lg border-2 transition-all duration-300 cursor-pointer group ${
                    announcement.priority === 'high' ? 'bg-[#FEE2E2] border-[#DC2626] hover:shadow-md' :
                    announcement.priority === 'medium' ? 'bg-[#FEF3C7] border-[#F59E0B] hover:shadow-md' :
                    'bg-[#F1F5F9] border-[#94A3B8] hover:shadow-md'
                  }`}
                  whileHover={{ scale: 1.01 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 style={{ fontFamily: 'var(--font-body)', fontWeight: 600 }}>{announcement.title}</h4>
                      <span 
                        className={`px-3 py-1 rounded-full border ${
                          announcement.priority === 'high' ? 'bg-[#DC2626] text-white border-[#DC2626]' : 
                          announcement.priority === 'medium' ? 'bg-[#F59E0B] text-white border-[#F59E0B]' : 
                          'bg-[#64748B] text-white border-[#64748B]'
                        }`}
                        style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' }}
                      >
                        {announcement.priority}
                      </span>
                    </div>
                    <p className="text-[#64748B] mb-2">{announcement.department}</p>
                    <p className="text-[#94A3B8]" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>{announcement.time}</p>
                  </div>
                  <ArrowRight className={`w-6 h-6 flex-shrink-0 mt-1 ${
                    announcement.priority === 'high' ? 'text-[#DC2626]' :
                    announcement.priority === 'medium' ? 'text-[#F59E0B]' :
                    'text-[#64748B]'
                  }`} />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* My Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="bg-white border-2 border-[#E2E8F0] rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
          <div className="mb-6">
            <h3 className="mb-2">My Recent Activity</h3>
            <p className="text-[#64748B]" style={{ fontSize: '0.875rem' }}>Your recent interactions across the platform</p>
          </div>
          <div className="space-y-4">
            <motion.div 
              className="flex items-center gap-4 p-5 rounded-lg border-2 border-[#0F172A] bg-[#F8F9FA] hover:shadow-md transition-all duration-300 cursor-pointer group"
              whileHover={{ scale: 1.01 }}
            >
              <MessageCircle className="w-6 h-6 text-[#0F172A] flex-shrink-0" />
              <div className="flex-1">
                <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600 }}>Submitted feedback to IT Services</p>
                <p className="text-[#64748B] mt-1" style={{ fontSize: '0.875rem' }}>Regarding campus WiFi connectivity - 2 days ago</p>
              </div>
              <span className="px-4 py-2 bg-[#10B981] text-white rounded-full border border-[#10B981]" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' }}>
                Resolved
              </span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-4 p-5 rounded-lg border-2 border-[#F59E0B] bg-[#FEF3C7] hover:shadow-md transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.01 }}
            >
              <BookOpen className="w-6 h-6 text-[#F59E0B] flex-shrink-0" />
              <div className="flex-1">
                <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600 }}>Downloaded study guide from Academic Support</p>
                <p className="text-[#64748B] mt-1" style={{ fontSize: '0.875rem' }}>Time Management Strategies - 3 days ago</p>
              </div>
            </motion.div>
            <motion.div 
              className="flex items-center gap-4 p-5 rounded-lg border-2 border-[#1E293B] bg-[#F1F5F9] hover:shadow-md transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.01 }}
            >
              <Calendar className="w-6 h-6 text-[#1E293B] flex-shrink-0" />
              <div className="flex-1">
                <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600 }}>Registered for workshop</p>
                <p className="text-[#64748B] mt-1" style={{ fontSize: '0.875rem' }}>Resume Building with Career Services - 5 days ago</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions Dock */}
      <Dock
        items={quickActions.map((action) => {
          const Icon = action.icon;
          return {
            icon: <Icon className="w-6 h-6" />,
            label: action.label,
            onClick: action.action
          };
        })}
        panelHeight={68}
        magnification={75}
      />
    </div>
  );
}