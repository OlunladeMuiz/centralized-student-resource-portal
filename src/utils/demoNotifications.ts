import { projectId } from './supabase/info';

export async function createSampleNotifications(userId: string, accessToken: string) {
  const serverUrl = `https://${projectId}.supabase.co/functions/make-server-336197dd`;
  
  const sampleNotifications = [
    {
      id: `notif-${Date.now()}-1`,
      title: 'Feedback Response Received',
      message: 'IT Services has responded to your WiFi connectivity issue',
      type: 'info' as const,
      read: false,
      timestamp: new Date().toISOString(),
      link: 'requests',
    },
    {
      id: `notif-${Date.now()}-2`,
      title: 'New Resource Available',
      message: 'Career Services has uploaded new resume templates',
      type: 'success' as const,
      read: false,
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      link: 'resources',
    },
    {
      id: `notif-${Date.now()}-3`,
      title: 'Upcoming Event',
      message: 'Career Fair registration closes in 2 days',
      type: 'warning' as const,
      read: false,
      timestamp: new Date(Date.now() - 7200000).toISOString(),
    },
  ];

  try {
    // In a real implementation, this would call the backend
    // For now, we'll just log it
    console.log('Sample notifications would be created:', sampleNotifications);
    return sampleNotifications;
  } catch (error) {
    console.error('Error creating sample notifications:', error);
    return [];
  }
}
