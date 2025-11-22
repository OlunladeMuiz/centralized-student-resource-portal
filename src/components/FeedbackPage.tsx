import { useState } from 'react';
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
      const serverUrl = `https://${projectId}.supabase.co/functions/v1/make-server-336197dd`;
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
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-900 mb-2">Submit Feedback</h1>
        <p className="text-gray-600">Share your thoughts, report issues, or ask questions to any department</p>
      </div>

      {submitted && (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-900">Feedback Submitted Successfully!</AlertTitle>
          <AlertDescription className="text-green-800">
            Your feedback has been sent to the {formData.department} department. You'll receive a response within 24-48 hours.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Feedback Form</CardTitle>
            <CardDescription>Help us improve by sharing your feedback</CardDescription>
          </CardHeader>
          <CardContent>
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

              <Button type="submit" className="w-full gap-2" disabled={submitting}>
                <Send className="w-4 h-4" />
                Submit Feedback
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Why Your Feedback Matters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <MessageSquare className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-gray-900 mb-1">Direct Communication</h3>
                  <p className="text-gray-600">Your feedback goes directly to the relevant department</p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-gray-900 mb-1">Track Progress</h3>
                  <p className="text-gray-600">Monitor the status of your submissions in real-time</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Feedback Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentFeedbackStats.map((stat, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-600">{stat.label}</span>
                  <span className="text-gray-900">{stat.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-blue-900 mb-2">Need Immediate Help?</h3>
              <p className="text-blue-800 mb-4">For urgent matters, contact campus security or student services directly.</p>
              <Button variant="outline" className="w-full border-blue-300 text-blue-900 hover:bg-blue-100">
                Emergency Contacts
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}