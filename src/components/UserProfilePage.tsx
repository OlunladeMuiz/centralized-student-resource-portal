import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
    <div className="space-y-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="mb-2">My Profile</h1>
        <p className="text-muted-foreground">Manage your account information and preferences</p>
      </motion.div>

      {message && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Alert className="border-4 border-accent shadow-[4px_4px_0px_0px_rgba(6,182,212,1)]">
            <AlertDescription className="font-mono">{message}</AlertDescription>
          </Alert>
        </motion.div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <motion.div
          className="lg:col-span-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="border-4 border-border shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] sticky top-6">
            <CardContent className="pt-8">
              <div className="flex flex-col items-center text-center">
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Avatar className="w-28 h-28 mb-6 border-4 border-border shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]">
                    <AvatarFallback className="bg-primary text-primary-foreground font-display text-3xl">
                      {getInitials(user?.name)}
                    </AvatarFallback>
                  </Avatar>
                </motion.div>
                <h2 className="font-display mb-2">{user?.name || 'Student'}</h2>
                <p className="text-muted-foreground font-mono mb-6">{user?.email}</p>
                
                <div className="w-full space-y-3 mt-4 p-4 bg-secondary/20 border-4 border-border">
                  <div className="flex items-center gap-2 text-muted-foreground justify-center">
                    <Calendar className="w-4 h-4" />
                    <span className="font-mono">Joined {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'Recently'}</span>
                  </div>
                  {profile?.notificationCount !== undefined && (
                    <div className="flex items-center gap-2 text-muted-foreground justify-center">
                      <Mail className="w-4 h-4" />
                      <span className="font-mono">{profile.notificationCount} unread notifications</span>
                    </div>
                  )}
                </div>

                <motion.div className="w-full mt-6" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    variant="outline" 
                    className="w-full gap-2 border-4 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] transition-all"
                    onClick={handleSignOut}
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Profile Information */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="border-4 border-border shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
            <CardHeader className="bg-secondary/20 border-b-4 border-border">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="font-display">Profile Information</CardTitle>
                  <CardDescription className="font-mono">Update your personal details</CardDescription>
                </div>
                {!editing && (
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      onClick={() => setEditing(true)}
                      className="shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] transition-all"
                    >
                      Edit Profile
                    </Button>
                  </motion.div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
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
                <div className="flex gap-3 pt-4">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      onClick={handleSave} 
                      disabled={saving} 
                      className="gap-2 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] transition-all"
                    >
                      <Save className="w-4 h-4" />
                      {saving ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      variant="outline" 
                      onClick={() => setEditing(false)} 
                      disabled={saving}
                      className="border-4 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] transition-all"
                    >
                      Cancel
                    </Button>
                  </motion.div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Activity Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="border-4 border-border shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
          <CardHeader className="bg-secondary/20 border-b-4 border-border">
            <CardTitle className="font-display">Activity Summary</CardTitle>
            <CardDescription className="font-mono">Your engagement with the Student Hub</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <motion.div
                className="text-center p-6 bg-accent/10 border-4 border-accent shadow-[4px_4px_0px_0px_rgba(6,182,212,1)]"
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <p className="font-display text-3xl text-accent mb-2">12</p>
                <p className="text-accent font-mono uppercase tracking-wider">Feedback Submitted</p>
              </motion.div>
              <motion.div
                className="text-center p-6 bg-[#10B981]/10 border-4 border-[#10B981] shadow-[4px_4px_0px_0px_#10B981]"
                whileHover={{ scale: 1.05, rotate: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <p className="font-display text-3xl text-[#10B981] mb-2">28</p>
                <p className="text-[#10B981] font-mono uppercase tracking-wider">Resources Downloaded</p>
              </motion.div>
              <motion.div
                className="text-center p-6 bg-[#8B5CF6]/10 border-4 border-[#8B5CF6] shadow-[4px_4px_0px_0px_#8B5CF6]"
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <p className="font-display text-3xl text-[#8B5CF6] mb-2">5</p>
                <p className="text-[#8B5CF6] font-mono uppercase tracking-wider">Events Registered</p>
              </motion.div>
              <motion.div
                className="text-center p-6 bg-[#F59E0B]/10 border-4 border-[#F59E0B] shadow-[4px_4px_0px_0px_#F59E0B]"
                whileHover={{ scale: 1.05, rotate: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <p className="font-display text-3xl text-[#F59E0B] mb-2">94%</p>
                <p className="text-[#F59E0B] font-mono uppercase tracking-wider">Response Rate</p>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
