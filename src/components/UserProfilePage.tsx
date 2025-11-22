import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useAuth } from '../hooks/useAuth';
import { User, Mail, Calendar, LogOut, Save } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { Avatar, AvatarFallback } from './ui/avatar';

export function UserProfilePage() {
  const { user, profile, signOut, refreshProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: '',
    studentId: '',
    major: '',
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || user?.name || '',
        phone: (profile as any).phone || '',
        studentId: (profile as any).studentId || '',
        major: (profile as any).major || '',
      });
    }
  }, [profile, user]);

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    try {
      // In a real app, this would call the backend to update the profile
      setMessage('Profile updated successfully!');
      setEditing(false);
      await refreshProfile();
    } catch (error) {
      setMessage('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const getInitials = (name?: string) => {
    if (!name) return '??';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-gray-900 mb-2">My Profile</h1>
        <p className="text-gray-600">Manage your account information and preferences</p>
      </div>

      {message && (
        <Alert>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="w-24 h-24 mb-4">
                <AvatarFallback className="bg-blue-600 text-white text-2xl">
                  {getInitials(user?.name)}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-gray-900 mb-1">{user?.name || 'Student'}</h2>
              <p className="text-gray-600 mb-4">{user?.email}</p>
              
              <div className="w-full space-y-2 mt-4">
                <div className="flex items-center gap-2 text-gray-600 justify-center">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'Recently'}</span>
                </div>
                {profile?.notificationCount !== undefined && (
                  <div className="flex items-center gap-2 text-gray-600 justify-center">
                    <Mail className="w-4 h-4" />
                    <span>{profile.notificationCount} unread notifications</span>
                  </div>
                )}
              </div>

              <Button 
                variant="outline" 
                className="w-full mt-6 gap-2"
                onClick={handleSignOut}
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Profile Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </div>
              {!editing && (
                <Button onClick={() => setEditing(true)}>Edit Profile</Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={!editing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  value={user?.email || ''}
                  disabled
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="studentId">Student ID</Label>
                <Input
                  id="studentId"
                  value={formData.studentId}
                  onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                  disabled={!editing}
                  placeholder="Enter your student ID"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  disabled={!editing}
                  placeholder="(555) 123-4567"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="major">Major / Field of Study</Label>
                <Input
                  id="major"
                  value={formData.major}
                  onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                  disabled={!editing}
                  placeholder="e.g., Computer Science"
                />
              </div>
            </div>

            {editing && (
              <div className="flex gap-2 pt-4">
                <Button onClick={handleSave} disabled={saving} className="gap-2">
                  <Save className="w-4 h-4" />
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
                <Button variant="outline" onClick={() => setEditing(false)} disabled={saving}>
                  Cancel
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Activity Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Activity Summary</CardTitle>
          <CardDescription>Your engagement with the Student Hub</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-900 mb-1">12</p>
              <p className="text-blue-700">Feedback Submitted</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-green-900 mb-1">28</p>
              <p className="text-green-700">Resources Downloaded</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-purple-900 mb-1">5</p>
              <p className="text-purple-700">Events Registered</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <p className="text-orange-900 mb-1">94%</p>
              <p className="text-orange-700">Response Rate</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
