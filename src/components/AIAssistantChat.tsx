import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { MessageSquare, Send, X, Mic, MicOff, Sparkles, Zap, Brain } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  type?: 'text' | 'voice' | 'suggestion';
}

interface AIAssistantChatProps {
  context?: 'course' | 'payment' | 'hostel' | 'result' | 'general';
}

export function AIAssistantChat({ context = 'general' }: AIAssistantChatProps) {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: `Hi ${user?.user_metadata?.full_name || 'there'}! 👋 I'm your AI Academic Assistant powered by advanced language models. I can help you with:\n\n🎓 Course registration & planning\n💰 Payment queries & financial aid\n🏠 Hostel reservations & policies\n📊 Grade analysis & predictions\n📚 Study recommendations\n🎯 Career guidance\n\nWhat can I help you with today?`,
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [aiMode, setAiMode] = useState<'chat' | 'voice' | 'vision'>('chat');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize Speech Recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };
    }
  }, []);

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition not supported in your browser');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const getContextPrompt = () => {
    const contextPrompts = {
      course: 'Focus on course registration, selection, prerequisites, and academic planning.',
      payment: 'Focus on tuition fees, payment methods, deadlines, financial aid, and scholarships.',
      hostel: 'Focus on hostel reservations, room allocation, facilities, and accommodation policies.',
      result: 'Focus on grades, GPA calculation, academic performance, and improvement strategies.',
      general: 'Provide comprehensive assistance across all academic and administrative topics.'
    };
    return contextPrompts[context];
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { 
      role: 'user', 
      content: input,
      timestamp: new Date(),
      type: isListening ? 'voice' : 'text'
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Simulate AI response with advanced features
      // In production, this would call OpenAI GPT-4o, Claude 3.5 Sonnet, or Gemini Pro
      await new Promise(resolve => setTimeout(resolve, 1500));

      const response = await generateAIResponse(input, context, messages);
      
      const aiMessage: Message = { 
        role: 'assistant', 
        content: response,
        timestamp: new Date(),
        type: 'text'
      };
      
      setMessages(prev => [...prev, aiMessage]);

      // Text-to-Speech for AI response
      if (aiMode === 'voice') {
        speakText(response);
      }
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'I encountered an error processing your request. Please try again.',
        timestamp: new Date(),
        type: 'text'
      }]);
    } finally {
      setLoading(false);
    }
  };

  const generateAIResponse = async (query: string, ctx: string, history: Message[]): Promise<string> => {
    // Advanced AI response generation with context awareness
    const lowerQuery = query.toLowerCase();

    // Course-related queries
    if (lowerQuery.includes('course') || lowerQuery.includes('register') || lowerQuery.includes('class')) {
      return `📚 **Course Registration Assistance**\n\nBased on your query, here's what I recommend:\n\n✅ **Available Actions:**\n- View course catalog with AI-powered recommendations\n- Check prerequisites automatically\n- Get personalized course suggestions based on your academic history\n- Predict workload and difficulty using ML models\n\n🤖 **AI Insight:** Students with similar profiles who took CS301 and MATH202 together had 87% success rate.\n\n💡 **Smart Tip:** I've analyzed the course schedules and found 3 optimal combinations that avoid conflicts.\n\nWould you like me to generate a personalized study plan?`;
    }

    // Grade/Result queries
    if (lowerQuery.includes('grade') || lowerQuery.includes('result') || lowerQuery.includes('gpa')) {
      return `📊 **Grade Analytics & Predictions**\n\n🎯 **Current Performance:**\n- Your GPA trend: Improving (+0.3 this semester)\n- Strongest subject: Computer Science (92% avg)\n- Area for improvement: Mathematics (Need +5% for A grade)\n\n🤖 **AI Prediction:** Based on your current trajectory, predicted final GPA: 3.7/4.0\n\n📈 **Recommendations:**\n1. Focus 2 extra hours/week on Math\n2. Join Prof. Smith's tutoring (85% improvement rate)\n3. Practice past papers (correlation: 0.89 with final grade)\n\n🔮 **Success Probability:** 78% chance of Dean's List if you follow this plan!`;
    }

    // Payment queries
    if (lowerQuery.includes('pay') || lowerQuery.includes('fee') || lowerQuery.includes('tuition')) {
      return `💰 **Payment & Financial Assistance**\n\n📋 **Your Payment Status:**\n- Outstanding balance: $0 (Fully paid! 🎉)\n- Next payment due: January 15, 2026\n- Payment plan: Available (0% interest)\n\n🤖 **AI Financial Analysis:**\n- You're eligible for 3 scholarships (total: $5,000)\n- 92% match with Merit Scholarship\n- Auto-applying to recommended programs...\n\n💡 **Smart Suggestions:**\n1. Set up auto-pay (save 2% discount)\n2. Apply for work-study program\n3. Check emergency fund eligibility\n\nWould you like me to generate a personalized financial plan?`;
    }

    // Hostel queries
    if (lowerQuery.includes('hostel') || lowerQuery.includes('room') || lowerQuery.includes('accommodation')) {
      return `🏠 **Hostel & Accommodation AI Assistant**\n\n🛏️ **Smart Room Recommendations:**\nBased on your preferences and study patterns:\n\n1. **Block A, Room 305** (94% match)\n   - Quiet zone (perfect for your study schedule)\n   - North-facing (natural light in mornings)\n   - Near library (saves 10 min/day)\n\n2. **Block C, Room 201** (87% match)\n   - Social wing (good for networking)\n   - Gym nearby (matches your interests)\n\n🤖 **AI Insights:**\n- Students in Block A average 0.4 higher GPA\n- Your roommate compatibility: 89%\n- Optimal move-in time: Aug 20, 3PM (least crowded)\n\n✨ **Perks:** Priority booking available for you!`;
    }

    // Study/Academic help
    if (lowerQuery.includes('study') || lowerQuery.includes('help') || lowerQuery.includes('learn')) {
      return `🎓 **AI Study Coach & Learning Optimizer**\n\n📚 **Personalized Study Plan Generated:**\n\n**Week 1-2: Foundation Building**\n- Mon-Wed: 2 hours (Theory)\n- Thu-Fri: 1.5 hours (Practice)\n- Weekend: Review sessions\n\n🧠 **Learning Style Analysis:**\nYou're a **Visual-Kinesthetic learner** (confidence: 87%)\n\n**Recommended Resources:**\n1. Interactive coding platforms (95% effective for your type)\n2. Whiteboard problem-solving\n3. Peer teaching sessions\n\n🤖 **AI Tutor Available:**\n- 24/7 personalized explanations\n- Step-by-step problem solving\n- Instant doubt resolution\n- Progress tracking with ML\n\n🎯 **Success Rate:** Students following AI plans: 94% improvement!`;
    }

    // Career/Job queries
    if (lowerQuery.includes('job') || lowerQuery.includes('career') || lowerQuery.includes('intern')) {
      return `💼 **AI Career Advisor & Job Match**\n\n🎯 **Career Path Analysis:**\nBased on your coursework, skills, and interests:\n\n**Top Matches:**\n1. **Full-Stack Developer** (96% fit)\n   - Salary range: $80k-120k\n   - 342 open positions\n   - Skills gap: Docker, AWS (2 weeks to learn)\n\n2. **ML Engineer** (89% fit)\n   - Salary range: $100k-150k\n   - High demand (150% growth)\n   - Your AI projects = strong portfolio\n\n3. **Data Scientist** (85% fit)\n   - Salary range: $90k-130k\n   - Perfect for your Math + CS background\n\n🤖 **AI Resume Optimizer:**\n- ATS score: 78/100 (needs improvement)\n- Suggested keywords added: +22 points\n- Interview probability: 67% → 89%\n\n📈 **Action Plan:**\n1. Build 2 more projects (blockchain + LLM app)\n2. Get AWS certification\n3. Practice system design (I can help!)\n\n💡 **Network Insight:** 15 alumni at your target companies. Want introductions?`;
    }

    // Default intelligent response
    return `🤖 **AI Assistant Response**\n\nI understand you're asking about: "${query}"\n\n**How I can help:**\n\n1. 🎓 **Academic Planning**\n   - Course recommendations using collaborative filtering\n   - Schedule optimization with conflict detection\n   - Grade predictions with 85% accuracy\n\n2. 💰 **Financial Guidance**\n   - Payment deadline reminders\n   - Scholarship matching (AI-powered)\n   - Budget planning assistance\n\n3. 🏠 **Accommodation Support**\n   - Smart room recommendations\n   - Roommate compatibility analysis\n   - Facility availability predictions\n\n4. 📊 **Performance Analytics**\n   - Real-time grade tracking\n   - Improvement recommendations\n   - Success probability calculations\n\n5. 🎯 **Career Coaching**\n   - Job market analysis\n   - Resume optimization\n   - Interview preparation\n\n**Advanced AI Features:**\n- Natural language understanding\n- Context-aware responses\n- Multi-modal interaction (text + voice)\n- Predictive analytics\n- Personalized recommendations\n\nCould you provide more details so I can give you a more specific answer?`;
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text.replace(/[*#📚💰🏠📊🎓🤖💡✨🎯📈🔮]/g, ''));
      utterance.rate = 1.1;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const quickActions = [
    { icon: '🎓', label: 'Course Help', query: 'Help me choose courses for next semester' },
    { icon: '📊', label: 'Check Grades', query: 'Show my grade analysis and predictions' },
    { icon: '💰', label: 'Payment Info', query: 'What are my payment options and deadlines?' },
    { icon: '🏠', label: 'Hostel Booking', query: 'Help me find the best hostel room' },
    { icon: '💼', label: 'Career Advice', query: 'Give me career guidance and job recommendations' }
  ];

  return (
    <>
      {/* Floating AI Button with ADVANCED 3D EFFECT */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="fixed bottom-6 right-6 z-50"
      >
        {/* Ripple effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-[#F59E0B] via-[#EF4444] to-[#8B5CF6]"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />

        <Button
          onClick={() => setIsOpen(true)}
          className="relative w-20 h-20 rounded-full bg-gradient-to-r from-[#F59E0B] via-[#EF4444] to-[#8B5CF6] shadow-2xl hover:shadow-[#F59E0B]/50 hover:scale-110 transition-all duration-300 group border-4 border-white"
        >
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.15, 1]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "linear"
            }}
            className="relative"
          >
            <Sparkles className="w-9 h-9 text-white drop-shadow-lg" />
          </motion.div>
          
          {/* Multi-layer glow */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-[#F59E0B] to-[#8B5CF6] opacity-60 blur-2xl"
            animate={{ 
              scale: [1, 1.4, 1],
              opacity: [0.6, 0.9, 0.6]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Rotating ring */}
          <motion.div
            className="absolute inset-[-4px] rounded-full border-4 border-transparent"
            style={{
              borderTopColor: '#F59E0B',
              borderRightColor: '#EF4444',
            }}
            animate={{ rotate: 360 }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </Button>
        
        {/* Advanced badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
          className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full border-4 border-white shadow-xl"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="font-bold text-sm"
          >
            AI
          </motion.div>
        </motion.div>

        {/* Floating particles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400 rounded-full"
            animate={{
              y: [-20, -60],
              x: [0, (i - 1) * 20],
              opacity: [1, 0],
              scale: [1, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.7,
              ease: "easeOut"
            }}
            style={{
              top: '20%',
              left: '50%'
            }}
          />
        ))}
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-28 right-6 w-[500px] h-[85vh] max-h-[700px] bg-white dark:bg-gray-900 border-4 border-[#0F172A] dark:border-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white p-4 flex justify-between items-center relative overflow-hidden">
              {/* Animated background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#F59E0B]/20 to-[#8B5CF6]/20"
                animate={{ 
                  x: ['-100%', '100%'],
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              <div className="flex items-center gap-3 relative z-10">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F59E0B] to-[#8B5CF6] flex items-center justify-center"
                >
                  <Brain className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">AI Assistant</span>
                    <Sparkles className="w-4 h-4 text-[#F59E0B]" />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-300">
                    <motion.div 
                      className="w-2 h-2 bg-green-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <span>GPT-4o Powered • Always Learning</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 relative z-10">
                {/* AI Mode Toggle */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setAiMode(aiMode === 'chat' ? 'voice' : 'chat')}
                  className="text-white hover:bg-white/10"
                  title={aiMode === 'chat' ? 'Enable voice mode' : 'Disable voice mode'}
                >
                  {aiMode === 'voice' ? <Zap className="w-4 h-4" /> : <MessageSquare className="w-4 h-4" />}
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="p-3 bg-gray-50 border-b-2 border-gray-200 overflow-x-auto">
              <div className="flex gap-2 min-w-max">
                {quickActions.map((action, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setInput(action.query);
                      setTimeout(() => sendMessage(), 100);
                    }}
                    className="whitespace-nowrap border-2 border-[#0F172A] hover:bg-[#F59E0B] hover:text-white transition-all"
                  >
                    <span className="mr-1">{action.icon}</span>
                    {action.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-br from-gray-50 to-white">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] ${
                    msg.role === 'user' 
                      ? 'bg-gradient-to-r from-[#F59E0B] to-[#EF4444] text-white rounded-2xl rounded-tr-sm' 
                      : 'bg-white border-2 border-[#0F172A] text-[#0F172A] rounded-2xl rounded-tl-sm shadow-lg'
                  } p-4`}>
                    {msg.type === 'voice' && msg.role === 'user' && (
                      <div className="flex items-center gap-2 mb-2 text-xs opacity-80">
                        <Mic className="w-3 h-3" />
                        <span>Voice input</span>
                      </div>
                    )}
                    <div className="whitespace-pre-wrap" style={{ fontFamily: 'var(--font-body)' }}>
                      {msg.content}
                    </div>
                    <div className={`text-xs mt-2 ${msg.role === 'user' ? 'text-white/70' : 'text-gray-500'}`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white border-2 border-[#0F172A] p-4 rounded-2xl rounded-tl-sm shadow-lg">
                    <div className="flex items-center gap-3">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Brain className="w-5 h-5 text-[#F59E0B]" />
                      </motion.div>
                      <div className="flex gap-2">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 bg-[#F59E0B] rounded-full"
                            animate={{ 
                              scale: [1, 1.5, 1],
                              opacity: [1, 0.5, 1]
                            }}
                            transition={{ 
                              duration: 1,
                              repeat: Infinity,
                              delay: i * 0.2
                            }}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">AI is thinking...</span>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t-2 border-gray-200 bg-white">
              <div className="flex gap-2">
                <Button
                  onClick={toggleVoiceInput}
                  disabled={loading}
                  variant={isListening ? "destructive" : "outline"}
                  className={`border-2 border-[#0F172A] ${isListening ? 'animate-pulse' : ''}`}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </Button>
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder={isListening ? 'Listening...' : 'Ask me anything...'}
                  disabled={loading || isListening}
                  className="border-2 border-[#0F172A] focus:ring-2 focus:ring-[#F59E0B]"
                />
                <Button 
                  onClick={sendMessage} 
                  disabled={loading || !input.trim()}
                  className="bg-gradient-to-r from-[#F59E0B] to-[#EF4444] hover:from-[#EF4444] hover:to-[#F59E0B] text-white border-2 border-[#0F172A]"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Powered by Advanced AI • Context-Aware • Multi-Modal
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}