import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Building2, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import LightPillarCSS from './LightPillarCSS';

export function AuthPage() {
  const { signIn, signUp } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('signin');
  const [signInData, setSignInData] = useState({ email: '', password: '' });
  const [signUpData, setSignUpData] = useState({ email: '', password: '', name: '', confirmPassword: '' });

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(signInData.email, signInData.password);
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (signUpData.password !== signUpData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (signUpData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await signUp(signUpData.email, signUpData.password, signUpData.name);
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to sign up';
      
      // Provide helpful message for duplicate email
      if (errorMessage.includes('already been registered') || errorMessage.includes('already exists')) {
        setError('This email is already registered. Please sign in instead or use a different email.');
      } else {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setError(''); // Clear error when switching tabs
  };

  return (
    <div className="min-h-screen flex overflow-hidden">
      {/* Left Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-12 bg-gradient-to-br from-[#FAFAF9] via-[#F8F9FA] to-[#F1F5F9] relative overflow-hidden">
        {/* Mobile Logo - Only shown on small screens */}
        <div className="lg:hidden absolute top-8 left-1/2 -translate-x-1/2">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#F59E0B] to-[#D97706] rounded-xl shadow-lg">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Decorative Elements - Simplified */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-30">
          <div className="absolute top-20 right-10 w-32 h-32 border-2 border-[#F59E0B]/30 rounded-lg rotate-12" />
          <div className="absolute bottom-20 left-10 w-40 h-40 border-2 border-[#0F172A]/20 rounded-lg -rotate-45" />
        </div>

        <motion.div 
          className="w-full max-w-md relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-white border-4 border-[#0F172A] rounded-2xl shadow-[12px_12px_0px_0px_rgba(15,23,42,1)] p-8 lg:p-10">
            <div className="mb-8">
              <h2 className="mb-2">Sign In</h2>
              <p className="text-[#64748B]" style={{ fontSize: '0.875rem' }}>
                Access your student portal
              </p>
            </div>

            <Tabs defaultValue="signin" onValueChange={handleTabChange}>
              <TabsList className="grid w-full grid-cols-2 bg-[#F1F5F9] rounded-lg p-1 h-auto mb-6 border-2 border-[#0F172A]">
                <TabsTrigger 
                  value="signin" 
                  className="data-[state=active]:bg-[#0F172A] data-[state=active]:text-white data-[state=active]:shadow-md rounded-md py-3 transition-all"
                  style={{ fontFamily: 'var(--font-body)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.875rem' }}
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger 
                  value="signup"
                  className="data-[state=active]:bg-[#0F172A] data-[state=active]:text-white data-[state=active]:shadow-md rounded-md py-3 transition-all"
                  style={{ fontFamily: 'var(--font-body)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.875rem' }}
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-5">
                  {error && (
                    <div className="bg-[#FEE2E2] border-l-4 border-[#DC2626] p-4 rounded-lg">
                      <p className="text-[#DC2626]" style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.875rem' }}>{error}</p>
                    </div>
                  )}

                  <div className="space-y-3">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="student@university.edu"
                      value={signInData.email}
                      onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                      required
                      className="border-2 border-[#0F172A] focus:border-[#F59E0B] h-12"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="signin-password">Password</Label>
                    <Input
                      id="signin-password"
                      type="password"
                      value={signInData.password}
                      onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                      required
                      className="border-2 border-[#0F172A] focus:border-[#F59E0B] h-12"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#0F172A] text-white rounded-lg h-12 border-2 border-[#0F172A] shadow-[4px_4px_0px_0px_rgba(245,158,11,1)] hover:shadow-[6px_6px_0px_0px_rgba(245,158,11,1)] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ fontFamily: 'var(--font-body)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}
                  >
                    {loading ? 'Signing in...' : 'Sign In'}
                  </button>

                  <div className="mt-6 p-5 bg-[#FEF3C7] border-l-4 border-[#F59E0B] rounded-lg">
                    <p className="mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem' }}>🚀 Quick Demo</p>
                    <p className="mb-3 text-[#64748B]" style={{ fontSize: '0.875rem' }}>Use these test credentials:</p>
                    <div className="space-y-1 mb-4" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>
                      <p>Email: <strong>demo@student.edu</strong></p>
                      <p>Password: <strong>demo123</strong></p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSignInData({ email: 'demo@student.edu', password: 'demo123' });
                      }}
                      className="w-full bg-[#F59E0B] text-white rounded-lg py-2.5 border-2 border-[#0F172A] shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] hover:shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:-translate-y-0.5 transition-all"
                      style={{ fontFamily: 'var(--font-body)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.875rem' }}
                    >
                      Auto-fill Demo
                    </button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-5">
                  {error && (
                    <div className="bg-[#FEE2E2] border-l-4 border-[#DC2626] p-4 rounded-lg">
                      <p className="text-[#DC2626]" style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.875rem' }}>{error}</p>
                    </div>
                  )}

                  <div className="space-y-3">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="John Doe"
                      value={signUpData.name}
                      onChange={(e) => setSignUpData({ ...signUpData, name: e.target.value })}
                      required
                      className="border-2 border-[#0F172A] focus:border-[#F59E0B] h-12"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="student@university.edu"
                      value={signUpData.email}
                      onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                      required
                      className="border-2 border-[#0F172A] focus:border-[#F59E0B] h-12"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="At least 6 characters"
                      value={signUpData.password}
                      onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                      required
                      className="border-2 border-[#0F172A] focus:border-[#F59E0B] h-12"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="signup-confirm">Confirm Password</Label>
                    <Input
                      id="signup-confirm"
                      type="password"
                      value={signUpData.confirmPassword}
                      onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
                      required
                      className="border-2 border-[#0F172A] focus:border-[#F59E0B] h-12"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#0F172A] text-white rounded-lg h-12 border-2 border-[#0F172A] shadow-[4px_4px_0px_0px_rgba(245,158,11,1)] hover:shadow-[6px_6px_0px_0px_rgba(245,158,11,1)] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ fontFamily: 'var(--font-body)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}
                  >
                    {loading ? 'Creating account...' : 'Create Account'}
                  </button>
                </form>
              </TabsContent>
            </Tabs>
          </div>

          <div className="mt-8 text-center">
            <p className="flex items-center justify-center gap-2 text-[#64748B]">
              <Building2 className="w-5 h-5" />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>University Student Services</span>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right Side - LightPillar Animation */}
      <motion.div 
        className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] items-center justify-center overflow-hidden"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* LightPillar Background */}
        <div className="absolute inset-0 w-full h-full">
          <LightPillarCSS
            topColor="#F59E0B"
            bottomColor="#0F172A"
            intensity={1.0}
            rotationSpeed={0.4}
            interactive={false}
            glowAmount={0.006}
            pillarWidth={2.0}
            pillarHeight={0.4}
            noiseIntensity={0.2}
            mixBlendMode="normal"
          />
        </div>

        {/* Overlay Content */}
        <div className="relative z-10 text-center px-12 max-w-lg">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="inline-flex items-center justify-center w-24 h-24 bg-[#F59E0B] rounded-2xl shadow-2xl mb-8 border-4 border-white/20">
              <GraduationCap className="w-14 h-14 text-white" />
            </div>
            <h1 className="text-white mb-6" style={{ fontSize: '3rem', lineHeight: '1.2' }}>
              Welcome to Student Hub
            </h1>
            <p className="text-white/80 text-xl mb-8" style={{ fontFamily: 'var(--font-body)' }}>
              Your centralized portal for all campus resources, feedback, and academic services
            </p>
            <div className="flex flex-col gap-4 text-white/70" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#F59E0B] rounded-full"></div>
                <span>Access all departments in one place</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#F59E0B] rounded-full"></div>
                <span>Submit and track feedback requests</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#F59E0B] rounded-full"></div>
                <span>Manage courses, results, and payments</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}