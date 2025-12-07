import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { projectId } from '../utils/supabase/info';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  timestamp: string;
  link?: string;
}

export function useNotifications() {
  const { accessToken } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const serverUrl = `https://${projectId}.supabase.co/functions/make-server-336197dd`;

  const fetchNotifications = async () => {
    if (!accessToken) return;

    try {
      setLoading(true);
      const response = await fetch(`${serverUrl}/notifications`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setNotifications(data.notifications || []);
        const unread = (data.notifications || []).filter((n: Notification) => !n.read).length;
        setUnreadCount(unread);
      }
    } catch (error) {
      // Silently fail - notifications are not critical
      // console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId: string) => {
    if (!accessToken) return;

    try {
      const response = await fetch(`${serverUrl}/notifications/${notificationId}/read`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        await fetchNotifications();
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const fetchUnreadCount = async () => {
    if (!accessToken) return;

    try {
      const response = await fetch(`${serverUrl}/notifications/count`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUnreadCount(data.count || 0);
      }
    } catch (error) {
      // Silently fail - notifications are not critical
      // console.error('Error fetching notification count:', error);
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchNotifications();
      // Poll for new notifications every 30 seconds
      const interval = setInterval(fetchUnreadCount, 30000);
      return () => clearInterval(interval);
    }
  }, [accessToken]);

  return {
    notifications,
    unreadCount,
    loading,
    fetchNotifications,
    markAsRead,
  };
}