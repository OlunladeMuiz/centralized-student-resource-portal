import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { MessageCircle, Clock, CheckCircle2, AlertCircle, Eye } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useAuth } from '../hooks/useAuth';
import { projectId } from '../utils/supabase/info';

export function MyRequestsPage() {
  const { accessToken } = useAuth();
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    fetchRequests();
  }, [accessToken]);

  const fetchRequests = async () => {
    if (!accessToken) return;

    try {
      setLoading(true);
      const serverUrl = `https://${projectId}.supabase.co/functions/make-server-336197dd`;
      const response = await fetch(`${serverUrl}/feedback`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setRequests(data.feedback || []);
      }
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-[#FEF3C7] text-[#F59E0B] border-[#F59E0B]';
      case 'in-progress': return 'bg-[#DBEAFE] text-[#0F172A] border-[#0F172A]';
      case 'resolved': return 'bg-[#D1FAE5] text-[#10B981] border-[#10B981]';
      case 'closed': return 'bg-[#F1F5F9] text-[#64748B] border-[#94A3B8]';
      default: return 'bg-[#F1F5F9] text-[#64748B] border-[#94A3B8]';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return Clock;
      case 'in-progress': return AlertCircle;
      case 'resolved': return CheckCircle2;
      case 'closed': return CheckCircle2;
      default: return Clock;
    }
  };

  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  const stats = [
    { label: 'Total Submissions', value: requests.length },
    { label: 'In Progress', value: requests.filter(r => r.status === 'in-progress').length },
    { label: 'Resolved', value: requests.filter(r => r.status === 'resolved').length },
    { label: 'Avg Response Time', value: '18 hours' },
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1 className="mb-3">My Requests</h1>
        <p className="opacity-70">Track and manage your feedback submissions across all departments</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat, index) => {
          const colorSchemes = [
            { bg: 'bg-primary', border: 'border-primary', shadow: 'shadow-[6px_6px_0px_0px_rgba(0,102,255,1)]', hover: 'hover:shadow-[8px_8px_0px_0px_rgba(0,102,255,1)]', text: 'text-primary' },
            { bg: 'bg-accent', border: 'border-accent', shadow: 'shadow-[6px_6px_0px_0px_rgba(6,255,165,1)]', hover: 'hover:shadow-[8px_8px_0px_0px_rgba(6,255,165,1)]', text: 'text-accent' },
            { bg: 'bg-secondary', border: 'border-secondary', shadow: 'shadow-[6px_6px_0px_0px_rgba(255,0,110,1)]', hover: 'hover:shadow-[8px_8px_0px_0px_rgba(255,0,110,1)]', text: 'text-secondary' },
            { bg: 'bg-[#FFD60A]', border: 'border-[#FFD60A]', shadow: 'shadow-[6px_6px_0px_0px_rgba(255,214,10,1)]', hover: 'hover:shadow-[8px_8px_0px_0px_rgba(255,214,10,1)]', text: 'text-[#FFD60A]' },
          ];
          const scheme = colorSchemes[index % colorSchemes.length];
          
          return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5, 
              delay: 0.1 + index * 0.05,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            <div className={`bg-card border-4 ${scheme.border} ${scheme.shadow} ${scheme.hover} hover:scale-105 transition-all text-center p-6`}>
              <p className={`${scheme.text} mb-2 uppercase tracking-wider`} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700 }}>{stat.label}</p>
              <p className={scheme.text} style={{ fontFamily: 'var(--font-display)', fontSize: '2rem' }}>{stat.value}</p>
            </div>
          </motion.div>
        );
        })}
      </div>

      {/* Requests List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <Tabs defaultValue="all">
          <div className="bg-secondary border-3 border-primary p-2 flex flex-wrap gap-1 sm:gap-2 mb-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 sm:px-4 py-2 sm:py-3 border-3 transition-all whitespace-nowrap text-xs sm:text-sm ${
                activeTab === 'all'
                  ? 'bg-accent text-primary border-primary shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]'
                  : 'bg-card border-primary/30 hover:border-accent'
              }`}
              style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}
            >
              All Requests
            </button>
            <button
              onClick={() => setActiveTab('pending')}
              className={`px-4 py-3 border-3 transition-all ${
                activeTab === 'pending'
                  ? 'bg-accent text-primary border-primary shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]'
                  : 'bg-card border-primary/30 hover:border-accent'
              }`}
              style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}
            >
              Pending
            </button>
            <button
              onClick={() => setActiveTab('in-progress')}
              className={`px-4 py-3 border-3 transition-all ${
                activeTab === 'in-progress'
                  ? 'bg-accent text-primary border-primary shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]'
                  : 'bg-card border-primary/30 hover:border-accent'
              }`}
              style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}
            >
              In Progress
            </button>
            <button
              onClick={() => setActiveTab('resolved')}
              className={`px-4 py-3 border-3 transition-all ${
                activeTab === 'resolved'
                  ? 'bg-accent text-primary border-primary shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]'
                  : 'bg-card border-primary/30 hover:border-accent'
              }`}
              style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}
            >
              Resolved
            </button>
          </div>

          <TabsContent value="all" className="space-y-4">
            {requests.map((request, index) => {
              const StatusIcon = getStatusIcon(request.status);
              return (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.05,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                >
                  <div className="bg-card border-4 border-primary shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] hover:shadow-[12px_12px_0px_0px_rgba(15,23,42,1)] hover:translate-y-[-4px] transition-all">
                    <div className="bg-secondary/10 border-b-4 border-primary p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="mb-2">{request.subject}</h3>
                          <p className="opacity-70 flex flex-wrap items-center gap-2" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>
                            <span>{request.department}</span>
                            <span>•</span>
                            <span>ID: {request.id}</span>
                            <span>•</span>
                            <span>Submitted {request.submittedDate}</span>
                          </p>
                        </div>
                        <div className="flex flex-col gap-2 items-end">
                          <span className={`${getStatusColor(request.status)} border-3 px-3 py-1 flex items-center gap-1 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]`} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' }}>
                            <StatusIcon className="w-3 h-3" />
                            {request.status.replace('-', ' ')}
                          </span>
                          <span className={`${getPriorityVariant(request.priority) === 'destructive' ? 'bg-secondary text-white border-secondary' : getPriorityVariant(request.priority) === 'default' ? 'bg-primary text-white border-primary' : 'bg-foreground/20 text-foreground border-foreground/30'} border-3 px-3 py-1 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]`} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' }}>
                            {request.priority}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 space-y-5">
                      <div>
                        <p className="opacity-80 mb-2" style={{ fontSize: '0.9375rem', lineHeight: 1.6 }}>{request.description}</p>
                        {request.response && (
                          <div className="mt-4 p-5 bg-accent/10 border-4 border-accent shadow-[4px_4px_0px_0px_rgba(6,255,165,1)]">
                            <div className="flex items-center gap-2 mb-3">
                              <MessageCircle className="w-5 h-5 text-accent" />
                              <span className="text-accent" style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem' }}>Department Response</span>
                            </div>
                            <p className="mb-2" style={{ fontSize: '0.9375rem', lineHeight: 1.6 }}>{request.response}</p>
                            <p className="opacity-70" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>Last updated: {request.lastUpdate}</p>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t-3 border-primary">
                        <div className="flex gap-4 opacity-70">
                          <span className="flex items-center gap-2" style={{ fontFamily: 'var(--font-mono)' }}>
                            <MessageCircle className="w-4 h-4" />
                            {request.updates} updates
                          </span>
                          <span className="px-3 py-1 bg-foreground/10 border-2 border-foreground/30" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 700 }}>{request.category}</span>
                        </div>
                        <button className="bg-primary text-white border-3 border-primary px-5 py-2 flex items-center gap-2 hover:translate-x-1 transition-all shadow-[4px_4px_0px_0px_rgba(6,255,165,1)] hover:shadow-[6px_6px_0px_0px_rgba(6,255,165,1)]" style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          <Eye className="w-4 h-4" />
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
        </TabsContent>

          <TabsContent value="pending">
            <div className="bg-card border-4 border-[#FFD60A] p-12 text-center shadow-[8px_8px_0px_0px_rgba(255,214,10,1)]">
              <Clock className="w-16 h-16 mx-auto mb-6 text-[#FFD60A]" />
              <h3 className="mb-3">Pending Requests</h3>
              <p className="opacity-70">Filter by pending status to see requests awaiting initial review</p>
            </div>
          </TabsContent>

          <TabsContent value="in-progress">
            <div className="bg-card border-4 border-primary p-12 text-center shadow-[8px_8px_0px_0px_rgba(0,102,255,1)]">
              <AlertCircle className="w-16 h-16 mx-auto mb-6 text-primary" />
              <h3 className="mb-3">In Progress Requests</h3>
              <p className="opacity-70">Filter by in-progress status to see active requests</p>
            </div>
          </TabsContent>

          <TabsContent value="resolved">
            <div className="bg-card border-4 border-accent p-12 text-center shadow-[8px_8px_0px_0px_rgba(6,255,165,1)]">
              <CheckCircle2 className="w-16 h-16 mx-auto mb-6 text-accent" />
              <h3 className="mb-3">Resolved Requests</h3>
              <p className="opacity-70">Filter by resolved status to see completed requests</p>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}