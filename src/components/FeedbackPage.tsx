import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { useAuth } from '../hooks/useAuth';
import { projectId } from '../utils/supabase/info';
import { toast } from 'sonner';

export function FeedbackPage() {
  const { accessToken } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    department: '',
    category: '',
    subject: '',
    description: '',
    priority: 'medium',
    anonymous: false,
  });

  const departments = [
    'Academic Support',
    'Career Services',
    'Student Wellness',
    'Financial Aid',
    'Housing & Residence',
    'IT Services',
    'Library Services',
    'Campus Security',
    'Student Activities',
    'Food Services',
  ];

  const categories = [
    'Suggestion',
    'Issue/Problem',
    'Question',
    'Complaint',
    'Compliment',
    'Resource Request',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const serverUrl = `https://${projectId}.supabase.co/functions/make-server-336197dd`;
      const response = await fetch(`${serverUrl}/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }

      const data = await response.json();
      console.log('Feedback submitted:', data);
      
      setSubmitted(true);
      toast.success('Feedback submitted successfully!', {
        description: `Your request ID is ${data.feedback.id}`,
      });

      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          department: '',
          category: '',
          subject: '',
          description: '',
          priority: 'medium',
          anonymous: false,
        });
      }, 3000);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error('Failed to submit feedback', {
        description: 'Please try again later.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const recentFeedbackStats = [
    { label: 'Average Response Time', value: '24 hours' },
    { label: 'Resolution Rate', value: '94%' },
    { label: 'Total Feedback Submitted', value: '1,247' },
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1 className="mb-3">Submit Feedback</h1>
        <p className="opacity-70">Share your thoughts, report issues, or ask questions to any department</p>
      </motion.div>

      {submitted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="bg-accent/10 border-4 border-accent p-6 shadow-[8px_8px_0px_0px_rgba(6,255,165,1)]">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="h-8 w-8 text-accent flex-shrink-0" />
              <div>
                <h3 className="mb-2 text-accent">Feedback Submitted Successfully!</h3>
                <p className="opacity-80" style={{ fontSize: '0.9375rem', lineHeight: 1.6 }}>
                  Your feedback has been sent to the {formData.department} department. You'll receive a response within 24-48 hours.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="bg-card border-4 border-primary shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] hover:shadow-[12px_12px_0px_0px_rgba(15,23,42,1)] transition-all">
            <div className="bg-secondary border-b-4 border-primary p-6">
              <h3 className="mb-2 text-white">Feedback Form</h3>
              <p className="text-white/90" style={{ fontSize: '0.9375rem', fontFamily: 'var(--font-body)' }}>Help us improve by sharing your feedback</p>
            </div>
            <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="department">Department *</Label>
                  <Select
                    value={formData.department}
                    onValueChange={(value) => setFormData({ ...formData, department: value })}
                    required
                  >
                    <SelectTrigger id="department">
                      <SelectValue placeholder="Select a department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map(dept => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                    required
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  placeholder="Brief summary of your feedback"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Provide detailed information about your feedback..."
                  rows={6}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority Level</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value) => setFormData({ ...formData, priority: value })}
                >
                  <SelectTrigger id="priority">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low - General feedback</SelectItem>
                    <SelectItem value="medium">Medium - Moderate concern</SelectItem>
                    <SelectItem value="high">High - Urgent issue</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={formData.anonymous}
                  onChange={(e) => setFormData({ ...formData, anonymous: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-300"
                />
                <Label htmlFor="anonymous" className="cursor-pointer">
                  Submit anonymously (your identity will not be shared)
                </Label>
              </div>

              <button 
                type="submit" 
                disabled={submitting}
                className="w-full bg-primary text-white border-3 border-primary px-6 py-4 flex items-center justify-center gap-2 hover:translate-y-[-2px] transition-all shadow-[6px_6px_0px_0px_rgba(6,255,165,1)] hover:shadow-[8px_8px_0px_0px_rgba(6,255,165,1)] disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}
              >
                <Send className="w-5 h-5" />
                {submitting ? 'Submitting...' : 'Submit Feedback'}
              </button>
            </form>
          </div>
        </div>
        </motion.div>

        {/* Sidebar */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="bg-card border-4 border-accent shadow-[6px_6px_0px_0px_rgba(6,255,165,1)]">
            <div className="bg-accent border-b-4 border-accent p-6">
              <h3 className="text-primary">Why Your Feedback Matters</h3>
            </div>
            <div className="p-6 space-y-5">
              <div className="flex gap-3">
                <MessageSquare className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="mb-1" style={{ textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>Direct Communication</h4>
                  <p className="opacity-70" style={{ fontSize: '0.9375rem' }}>Your feedback goes directly to the relevant department</p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="mb-1" style={{ textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>Track Progress</h4>
                  <p className="opacity-70" style={{ fontSize: '0.9375rem' }}>Monitor the status of your submissions in real-time</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card border-4 border-[#FFD60A] shadow-[6px_6px_0px_0px_rgba(255,214,10,1)]">
            <div className="bg-[#FFD60A] border-b-4 border-[#FFD60A] p-6">
              <h3 className="text-primary">Feedback Statistics</h3>
            </div>
            <div className="p-6 space-y-4">
              {recentFeedbackStats.map((stat, index) => (
                <div key={index} className="flex justify-between items-center pb-3 border-b-3 border-primary/20 last:border-0 last:pb-0">
                  <span className="opacity-70" style={{ fontFamily: 'var(--font-mono)' }}>{stat.label}</span>
                  <span className="text-[#FFD60A]" style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem' }}>{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-secondary/10 border-4 border-secondary p-6 shadow-[6px_6px_0px_0px_rgba(255,0,110,1)]">
            <h3 className="mb-2 text-secondary">Need Immediate Help?</h3>
            <p className="opacity-80 mb-4" style={{ fontSize: '0.9375rem', lineHeight: 1.6 }}>For urgent matters, contact campus security or student services directly.</p>
            <button className="w-full bg-secondary text-white border-3 border-secondary px-5 py-3 flex items-center justify-center gap-2 hover:translate-y-[-2px] transition-all shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]" style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Emergency Contacts
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}