import { useState, useEffect } from 'react';
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
      const serverUrl = `https://${projectId}.supabase.co/functions/v1/make-server-336197dd`;
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
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
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
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-900 mb-2">My Requests</h1>
        <p className="text-gray-600">Track and manage your feedback submissions across all departments</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <p className="text-gray-600 mb-1">{stat.label}</p>
              <p className="text-gray-900">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Requests List */}
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Requests</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6 space-y-4">
          {requests.map((request) => {
            const StatusIcon = getStatusIcon(request.status);
            return (
              <Card key={request.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle>{request.subject}</CardTitle>
                      </div>
                      <CardDescription className="flex flex-wrap items-center gap-2">
                        <span>{request.department}</span>
                        <span>•</span>
                        <span>ID: {request.id}</span>
                        <span>•</span>
                        <span>Submitted {request.submittedDate}</span>
                      </CardDescription>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      <Badge className={getStatusColor(request.status)}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {request.status.replace('-', ' ')}
                      </Badge>
                      <Badge variant={getPriorityVariant(request.priority)}>
                        {request.priority}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-gray-600 mb-2">{request.description}</p>
                    {request.response && (
                      <div className="mt-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
                        <div className="flex items-center gap-2 mb-2">
                          <MessageCircle className="w-4 h-4 text-blue-600" />
                          <span className="text-blue-900">Department Response</span>
                        </div>
                        <p className="text-blue-800">{request.response}</p>
                        <p className="text-blue-600 mt-2">Last updated: {request.lastUpdate}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex gap-4 text-gray-600">
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        {request.updates} updates
                      </span>
                      <Badge variant="outline">{request.category}</Badge>
                    </div>
                    <Button variant="outline" className="gap-2">
                      <Eye className="w-4 h-4" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="pending" className="mt-6">
          <Card>
            <CardContent className="py-8 text-center">
              <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-gray-900 mb-2">Pending Requests</h3>
              <p className="text-gray-600">Filter by pending status to see requests awaiting initial review</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="in-progress" className="mt-6">
          <Card>
            <CardContent className="py-8 text-center">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-gray-900 mb-2">In Progress Requests</h3>
              <p className="text-gray-600">Filter by in-progress status to see active requests</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resolved" className="mt-6">
          <Card>
            <CardContent className="py-8 text-center">
              <CheckCircle2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-gray-900 mb-2">Resolved Requests</h3>
              <p className="text-gray-600">Filter by resolved status to see completed requests</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}