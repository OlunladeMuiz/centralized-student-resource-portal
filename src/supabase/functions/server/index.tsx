import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'npm:@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';

const app = new Hono();

app.use('*', cors());
app.use('*', logger(console.log));

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

// Helper to verify user
async function verifyUser(request: Request) {
  const accessToken = request.headers.get('Authorization')?.split(' ')[1];
  if (!accessToken) {
    return null;
  }
  const { data: { user }, error } = await supabase.auth.getUser(accessToken);
  if (error || !user) {
    return null;
  }
  return user;
}

// ============ AUTH ROUTES ============

// Sign up
app.post('/make-server-336197dd/auth/signup', async (c) => {
  try {
    const { email, password, name } = await c.req.json();
    
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      email_confirm: true, // Auto-confirm since email server not configured
    });

    if (error) {
      console.log('Signup error:', error);
      return c.json({ error: error.message }, 400);
    }

    // Store user profile
    await kv.set(`user:${data.user.id}`, {
      id: data.user.id,
      email: data.user.email,
      name,
      createdAt: new Date().toISOString(),
      notificationCount: 0,
    });

    return c.json({ user: data.user });
  } catch (error) {
    console.log('Signup exception:', error);
    return c.json({ error: 'Internal server error during signup' }, 500);
  }
});

// Sign in
app.post('/make-server-336197dd/auth/signin', async (c) => {
  try {
    const { email, password } = await c.req.json();
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log('Signin error:', error);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ session: data.session, user: data.user });
  } catch (error) {
    console.log('Signin exception:', error);
    return c.json({ error: 'Internal server error during signin' }, 500);
  }
});

// Get current user profile
app.get('/make-server-336197dd/auth/me', async (c) => {
  try {
    const user = await verifyUser(c.req.raw);
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const profile = await kv.get(`user:${user.id}`);
    return c.json({ profile: profile || { id: user.id, email: user.email } });
  } catch (error) {
    console.log('Get user profile error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Update user profile
app.put('/make-server-336197dd/auth/profile', async (c) => {
  try {
    const user = await verifyUser(c.req.raw);
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const updates = await c.req.json();
    const currentProfile = await kv.get(`user:${user.id}`) || {};
    
    const updatedProfile = {
      ...currentProfile,
      ...updates,
      id: user.id,
      email: user.email,
      updatedAt: new Date().toISOString(),
    };

    await kv.set(`user:${user.id}`, updatedProfile);
    return c.json({ profile: updatedProfile });
  } catch (error) {
    console.log('Update profile error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// ============ FEEDBACK ROUTES ============

// Submit feedback
app.post('/make-server-336197dd/feedback', async (c) => {
  try {
    const user = await verifyUser(c.req.raw);
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const feedbackData = await c.req.json();
    const feedbackId = `REQ-${Date.now()}`;
    
    const feedback = {
      id: feedbackId,
      userId: feedbackData.anonymous ? 'anonymous' : user.id,
      userEmail: feedbackData.anonymous ? 'anonymous' : user.email,
      userName: feedbackData.anonymous ? 'Anonymous' : (user.user_metadata?.name || user.email),
      department: feedbackData.department,
      category: feedbackData.category,
      subject: feedbackData.subject,
      description: feedbackData.description,
      priority: feedbackData.priority,
      status: 'pending',
      submittedDate: new Date().toISOString(),
      lastUpdate: new Date().toISOString(),
      updates: [],
      responses: [],
    };

    await kv.set(`feedback:${feedbackId}`, feedback);
    
    // Add to user's feedback list if not anonymous
    if (!feedbackData.anonymous) {
      const userFeedback = await kv.get(`userFeedback:${user.id}`) || [];
      userFeedback.push(feedbackId);
      await kv.set(`userFeedback:${user.id}`, userFeedback);
    }

    return c.json({ feedback });
  } catch (error) {
    console.log('Submit feedback error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Get user's feedback submissions
app.get('/make-server-336197dd/feedback', async (c) => {
  try {
    const user = await verifyUser(c.req.raw);
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const feedbackIds = await kv.get(`userFeedback:${user.id}`) || [];
    const feedbackList = await Promise.all(
      feedbackIds.map(async (id: string) => await kv.get(`feedback:${id}`))
    );

    return c.json({ feedback: feedbackList.filter(Boolean) });
  } catch (error) {
    console.log('Get feedback error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Get specific feedback
app.get('/make-server-336197dd/feedback/:id', async (c) => {
  try {
    const user = await verifyUser(c.req.raw);
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const feedbackId = c.req.param('id');
    const feedback = await kv.get(`feedback:${feedbackId}`);
    
    if (!feedback) {
      return c.json({ error: 'Feedback not found' }, 404);
    }

    // Check if user owns this feedback
    if (feedback.userId !== user.id && feedback.userId !== 'anonymous') {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    return c.json({ feedback });
  } catch (error) {
    console.log('Get specific feedback error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// ============ NOTIFICATIONS ROUTES ============

// Get user notifications
app.get('/make-server-336197dd/notifications', async (c) => {
  try {
    const user = await verifyUser(c.req.raw);
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const notifications = await kv.get(`notifications:${user.id}`) || [];
    return c.json({ notifications });
  } catch (error) {
    console.log('Get notifications error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Mark notification as read
app.put('/make-server-336197dd/notifications/:id/read', async (c) => {
  try {
    const user = await verifyUser(c.req.raw);
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const notificationId = c.req.param('id');
    const notifications = await kv.get(`notifications:${user.id}`) || [];
    
    const updatedNotifications = notifications.map((n: any) => 
      n.id === notificationId ? { ...n, read: true } : n
    );

    await kv.set(`notifications:${user.id}`, updatedNotifications);
    
    // Update unread count
    const profile = await kv.get(`user:${user.id}`) || {};
    const unreadCount = updatedNotifications.filter((n: any) => !n.read).length;
    profile.notificationCount = unreadCount;
    await kv.set(`user:${user.id}`, profile);

    return c.json({ success: true });
  } catch (error) {
    console.log('Mark notification read error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Get notification count
app.get('/make-server-336197dd/notifications/count', async (c) => {
  try {
    const user = await verifyUser(c.req.raw);
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const notifications = await kv.get(`notifications:${user.id}`) || [];
    const unreadCount = notifications.filter((n: any) => !n.read).length;

    return c.json({ count: unreadCount });
  } catch (error) {
    console.log('Get notification count error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// ============ RESOURCES ROUTES ============

// Get all resources
app.get('/make-server-336197dd/resources', async (c) => {
  try {
    const resources = await kv.getByPrefix('resource:');
    return c.json({ resources: resources || [] });
  } catch (error) {
    console.log('Get resources error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Download/access resource (track downloads)
app.post('/make-server-336197dd/resources/:id/download', async (c) => {
  try {
    const user = await verifyUser(c.req.raw);
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const resourceId = c.req.param('id');
    const resource = await kv.get(`resource:${resourceId}`);
    
    if (!resource) {
      return c.json({ error: 'Resource not found' }, 404);
    }

    // Increment download count
    resource.downloads = (resource.downloads || 0) + 1;
    await kv.set(`resource:${resourceId}`, resource);

    return c.json({ resource });
  } catch (error) {
    console.log('Download resource error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// ============ DEPARTMENTS ROUTES ============

// Get all departments
app.get('/make-server-336197dd/departments', async (c) => {
  try {
    const departments = await kv.getByPrefix('department:');
    return c.json({ departments: departments || [] });
  } catch (error) {
    console.log('Get departments error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// ============ ANNOUNCEMENTS ROUTES ============

// Get recent announcements
app.get('/make-server-336197dd/announcements', async (c) => {
  try {
    const announcements = await kv.getByPrefix('announcement:');
    // Sort by timestamp, most recent first
    const sorted = (announcements || []).sort((a: any, b: any) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    return c.json({ announcements: sorted.slice(0, 10) });
  } catch (error) {
    console.log('Get announcements error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// ============ INITIALIZE SAMPLE DATA ============

app.post('/make-server-336197dd/init-data', async (c) => {
  try {
    // Initialize sample resources
    const sampleResources = [
      {
        id: 'res-1',
        title: 'Academic Writing Guide',
        department: 'Academic Support',
        type: 'PDF',
        downloads: 1243,
        description: 'Comprehensive guide covering essay structure, citations, and research methods',
        tags: ['Writing', 'Research', 'APA'],
      },
      {
        id: 'res-2',
        title: 'Resume Templates 2024',
        department: 'Career Services',
        type: 'Download',
        downloads: 892,
        description: 'Professional resume templates for various industries and career levels',
        tags: ['Career', 'Resume', 'Templates'],
      },
      {
        id: 'res-3',
        title: 'Stress Management Workshop',
        department: 'Student Wellness',
        type: 'Video',
        downloads: 567,
        description: 'Recorded session on mindfulness techniques and stress reduction strategies',
        tags: ['Wellness', 'Mental Health', 'Workshop'],
      },
    ];

    for (const resource of sampleResources) {
      await kv.set(`resource:${resource.id}`, resource);
    }

    // Initialize departments
    const sampleDepartments = [
      {
        id: 'dept-1',
        name: 'Academic Support',
        description: 'Tutoring, study skills, and academic advising services',
        contact: 'academic@university.edu',
        phone: '(555) 123-4501',
        location: 'Building A, Room 201',
        hours: 'Mon-Fri: 8am-6pm',
        services: ['Tutoring', 'Writing Center', 'Study Groups', 'Academic Advising'],
        staff: 12,
        responseTime: '24 hours',
        available: true,
      },
      {
        id: 'dept-2',
        name: 'Career Services',
        description: 'Career counseling, resume reviews, and job placement assistance',
        contact: 'careers@university.edu',
        phone: '(555) 123-4502',
        location: 'Building B, Room 105',
        hours: 'Mon-Fri: 9am-5pm',
        services: ['Resume Reviews', 'Mock Interviews', 'Job Board', 'Career Fairs'],
        staff: 8,
        responseTime: '48 hours',
        available: true,
      },
    ];

    for (const dept of sampleDepartments) {
      await kv.set(`department:${dept.id}`, dept);
    }

    return c.json({ success: true, message: 'Sample data initialized' });
  } catch (error) {
    console.log('Init data error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

Deno.serve(app.fetch);
