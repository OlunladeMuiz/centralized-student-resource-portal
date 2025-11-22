import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ArrowRight, Calendar, MessageCircle, BookOpen, TrendingUp, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Badge } from './ui/badge';
import { useAuth } from '../hooks/useAuth';

interface DashboardProps {
  onNavigate: (page: 'dashboard' | 'resources' | 'feedback' | 'departments' | 'requests' | 'profile') => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const { user } = useAuth();

  const quickStats = [
    { label: 'Active Resources', value: '247', change: '+12', icon: BookOpen, color: 'text-blue-600' },
    { label: 'Open Feedback', value: '3', change: '-2', icon: MessageCircle, color: 'text-green-600' },
    { label: 'Upcoming Events', value: '8', change: '+3', icon: Calendar, color: 'text-purple-600' },
    { label: 'Department Updates', value: '15', change: '+5', icon: TrendingUp, color: 'text-orange-600' },
  ];

  const recentAnnouncements = [
    { title: 'New Mental Health Resources', department: 'Student Wellness', time: '2 hours ago', priority: 'high' },
    { title: 'Career Fair Registration Open', department: 'Career Services', time: '5 hours ago', priority: 'medium' },
    { title: 'Library Hours Extended', department: 'Library Services', time: '1 day ago', priority: 'low' },
  ];

  const quickActions = [
    { label: 'Submit Feedback', action: () => onNavigate('feedback'), icon: MessageCircle, color: 'bg-blue-600' },
    { label: 'Browse Resources', action: () => onNavigate('resources'), icon: BookOpen, color: 'bg-green-600' },
    { label: 'Contact Department', action: () => onNavigate('departments'), icon: ArrowRight, color: 'bg-purple-600' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-gray-900 mb-2">Welcome back, {user?.name || 'Student'}!</h1>
        <p className="text-gray-600">Your centralized hub for all campus resources and communications</p>
      </div>

      {/* Alert */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>System Update</AlertTitle>
        <AlertDescription>
          New cross-department search feature now available! Find resources across all departments instantly.
        </AlertDescription>
      </Alert>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600">{stat.label}</p>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-gray-900">{stat.value}</span>
                      <span className={`${stat.color}`}>{stat.change}</span>
                    </div>
                  </div>
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Button
                  key={action.label}
                  onClick={action.action}
                  className={`w-full justify-start gap-3 ${action.color} hover:opacity-90`}
                >
                  <Icon className="w-4 h-4" />
                  {action.label}
                </Button>
              );
            })}
          </CardContent>
        </Card>

        {/* Recent Announcements */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Announcements</CardTitle>
            <CardDescription>Latest updates from all departments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAnnouncements.map((announcement, index) => (
                <div key={index} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-gray-900">{announcement.title}</h3>
                      <Badge variant={announcement.priority === 'high' ? 'destructive' : announcement.priority === 'medium' ? 'default' : 'secondary'}>
                        {announcement.priority}
                      </Badge>
                    </div>
                    <p className="text-gray-600">{announcement.department}</p>
                    <p className="text-gray-500 mt-1">{announcement.time}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* My Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>My Recent Activity</CardTitle>
          <CardDescription>Your recent interactions across the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
              <MessageCircle className="w-5 h-5 text-blue-600" />
              <div className="flex-1">
                <p className="text-gray-900">Submitted feedback to IT Services</p>
                <p className="text-gray-500">Regarding campus WiFi connectivity - 2 days ago</p>
              </div>
              <Badge variant="outline">Resolved</Badge>
            </div>
            <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
              <BookOpen className="w-5 h-5 text-green-600" />
              <div className="flex-1">
                <p className="text-gray-900">Downloaded study guide from Academic Support</p>
                <p className="text-gray-500">Time Management Strategies - 3 days ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
              <Calendar className="w-5 h-5 text-purple-600" />
              <div className="flex-1">
                <p className="text-gray-900">Registered for workshop</p>
                <p className="text-gray-500">Resume Building with Career Services - 5 days ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}