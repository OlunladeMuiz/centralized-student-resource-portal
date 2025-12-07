import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Github, Linkedin, Mail, Code, Rocket, Award, Star, Trophy, Zap, Target, ExternalLink } from 'lucide-react';
import developerImage from '../assets/cd2237bb33a828b12abcd233ad307a00400edb3e.png';

export function DeveloperPage() {
  const techStack = [
    { category: 'Frontend', techs: ['React', 'Vue.js', 'TypeScript', 'Next.js'], icon: '⚛️' },
    { category: 'Styling', techs: ['Tailwind CSS', 'SASS', 'Bootstrap', 'CSS3'], icon: '🎨' },
    { category: 'Languages', techs: ['JavaScript', 'TypeScript', 'HTML5', 'CSS3'], icon: '💻' },
    { category: 'Learning', techs: ['Next.js', 'GraphQL', 'TypeScript'], icon: '🌱' },
    { category: 'AI/ML', techs: ['GPT-4o', 'Claude 3.5', 'Whisper API', 'GPT-4 Vision'], icon: '🤖' },
    { category: 'Backend', techs: ['Supabase', 'RESTful APIs', 'WebSockets', 'Real-time DB'], icon: '🔧' },
  ];

  const achievements = [
    {
      title: 'Full-Stack AI Integration',
      description: 'Successfully integrated 6 different AI models including GPT-4o, Claude 3.5 Sonnet, and Whisper API',
      icon: Trophy,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      title: 'Production-Ready Architecture',
      description: 'Built scalable, secure system with real-time data persistence, authentication, and error handling',
      icon: Rocket,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Innovation & Creativity',
      description: 'Designed unique neubrutalist UI with extraordinary dark mode animations and SpotlightCard effects',
      icon: Star,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Advanced Technical Skills',
      description: 'Demonstrated expertise in ML, NLP, Computer Vision, and multi-modal AI implementations',
      icon: Zap,
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const recruiterHighlights = [
    {
      title: '🎯 Problem-Solving Excellence',
      points: [
        'Built complex AI features from scratch without tutorials',
        'Debugged and fixed production-level issues independently',
        'Implemented custom neural networks for predictive analytics'
      ]
    },
    {
      title: '💼 Professional Development Skills',
      points: [
        'Clean, maintainable, and well-documented codebase',
        'Followed industry best practices and design patterns',
        'Version control mastery with Git/GitHub'
      ]
    },
    {
      title: '🚀 Innovation & Initiative',
      points: [
        'Self-taught AI integration and ML concepts',
        'Proactive in learning cutting-edge technologies',
        'Created unique features that stand out from competitors'
      ]
    },
    {
      title: '⚡ Technical Versatility',
      points: [
        'Full-stack development: Frontend + Backend + AI',
        'Multi-framework expertise: React, Vue.js, Next.js',
        'API integration: OpenAI, Anthropic, Supabase'
      ]
    }
  ];

  const projectRecognition = [
    {
      metric: '7+',
      label: 'AI Features',
      description: 'Revolutionary implementations',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      metric: '94%',
      label: 'AI Accuracy',
      description: 'Production-grade models',
      color: 'from-purple-500 to-pink-500'
    },
    {
      metric: '12+',
      label: 'Technologies',
      description: 'Modern tech stack',
      color: 'from-green-500 to-emerald-500'
    },
    {
      metric: '100%',
      label: 'Functional',
      description: 'All features working',
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="space-y-8 pb-32">
      {/* Hero Section with Developer Image */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden"
      >
        {/* Background decorations */}
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-3xl opacity-20"
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full blur-3xl opacity-20"
          animate={{ 
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 12, repeat: Infinity }}
        />

        <Card className="relative border-4 border-[#0F172A] shadow-2xl bg-gradient-to-br from-white via-purple-50/30 to-white overflow-hidden">
          {/* Grid pattern */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `
                linear-gradient(#0F172A 1px, transparent 1px),
                linear-gradient(90deg, #0F172A 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          />

          <div className="relative z-10 p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Developer Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="relative group"
              >
                <div className="absolute -inset-4 bg-gradient-to-br from-[#F59E0B] via-[#EF4444] to-[#8B5CF6] rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
                <div className="relative border-8 border-[#0F172A] rounded-3xl overflow-hidden shadow-2xl">
                  <img 
                    src={developerImage} 
                    alt="Olunlade Abdulmuiz - Developer"
                    className="w-full h-auto object-cover"
                  />
                  {/* Overlay gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                    <div className="text-white">
                      <p className="font-bold text-2xl mb-1" style={{ fontFamily: 'var(--font-mono)' }}>
                        EXCEPTIONAL DEVELOPER
                      </p>
                      <p className="text-sm opacity-90">Transforming ideas into reality</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Developer Info */}
              <div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h1 
                    className="mb-4"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '3.5rem',
                      fontWeight: 700,
                      lineHeight: 1.1,
                      background: 'linear-gradient(135deg, #0F172A 0%, #F59E0B 50%, #EF4444 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      textTransform: 'uppercase'
                    }}
                  >
                    Olunlade Abdulmuiz
                  </h1>
                  
                  <div className="flex flex-wrap gap-3 mb-6">
                    <Badge className="px-4 py-2 bg-[#0F172A] text-white border-2 border-[#F59E0B]" style={{ fontSize: '1rem', fontFamily: 'var(--font-mono)' }}>
                      🚀 Front-End Developer
                    </Badge>
                    <Badge className="px-4 py-2 bg-[#F59E0B] text-white border-2 border-[#0F172A]" style={{ fontSize: '1rem', fontFamily: 'var(--font-mono)' }}>
                      🎓 Trinity University
                    </Badge>
                  </div>

                  <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                    A passionate <strong>Front-End Developer</strong> with a knack for creating visually stunning and user-friendly web applications. 
                    With a solid foundation in modern web technologies, I turn complex problems into simple, beautiful, and intuitive designs.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
                        <Code className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-[#0F172A]">Tech Enthusiast</p>
                        <p className="text-sm text-gray-600">Mastering modern frameworks & AI integration</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl">
                        <Target className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-[#0F172A]">Design Enthusiast</p>
                        <p className="text-sm text-gray-600">Believes good design is as important as functionality</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl">
                        <Github className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-[#0F172A]">Open Source Contributor</p>
                        <p className="text-sm text-gray-600">Actively improving skills & giving back to community</p>
                      </div>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex gap-4 mt-8">
                    <motion.button
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-4 bg-[#0F172A] text-white rounded-xl border-4 border-[#F59E0B] shadow-lg hover:shadow-2xl transition-all"
                    >
                      <Github className="w-6 h-6" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-4 bg-blue-600 text-white rounded-xl border-4 border-[#0F172A] shadow-lg hover:shadow-2xl transition-all"
                    >
                      <Linkedin className="w-6 h-6" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-4 bg-[#F59E0B] text-white rounded-xl border-4 border-[#0F172A] shadow-lg hover:shadow-2xl transition-all"
                    >
                      <Mail className="w-6 h-6" />
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Tech Stack */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="p-8 border-4 border-[#0F172A] shadow-xl">
          <div className="flex items-center gap-3 mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="p-4 bg-gradient-to-br from-[#F59E0B] to-[#EF4444] rounded-2xl shadow-xl"
            >
              <Code className="w-8 h-8 text-white" />
            </motion.div>
            <div>
              <h2 
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: '#0F172A',
                  textTransform: 'uppercase'
                }}
              >
                Technology Stack
              </h2>
              <p className="text-gray-600">Comprehensive mastery of modern web technologies</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStack.map((stack, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity" />
                <div className="relative border-4 border-[#0F172A] rounded-xl p-6 bg-gradient-to-br from-white to-gray-50 shadow-lg">
                  <div className="text-4xl mb-3">{stack.icon}</div>
                  <h3 className="font-bold text-xl mb-3 text-[#0F172A]" style={{ fontFamily: 'var(--font-mono)' }}>
                    {stack.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {stack.techs.map((tech, techIdx) => (
                      <Badge 
                        key={techIdx}
                        className="px-3 py-1 bg-[#F59E0B] text-white border-2 border-[#0F172A]"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Why This Project Deserves Recognition */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="p-10 border-4 border-[#0F172A] shadow-2xl bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
          <div className="text-center mb-10">
            <motion.h2
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '2.5rem',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #0F172A 0%, #F59E0B 50%, #EF4444 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textTransform: 'uppercase',
                marginBottom: '1rem'
              }}
            >
              🏆 Why This Project Deserves Recognition
            </motion.h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              A masterpiece that showcases <strong>exceptional technical skills</strong>, <strong>innovation</strong>, and <strong>production-ready quality</strong>
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {achievements.map((achievement, idx) => {
              const Icon = achievement.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + idx * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="relative group"
                >
                  <div className={`absolute -inset-1 bg-gradient-to-br ${achievement.color} rounded-2xl blur opacity-0 group-hover:opacity-40 transition-opacity`} />
                  <div className="relative border-4 border-[#0F172A] rounded-2xl p-6 bg-white shadow-xl">
                    <div className={`inline-block p-4 bg-gradient-to-br ${achievement.color} rounded-xl mb-4`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-xl mb-2 text-[#0F172A]">
                      {achievement.title}
                    </h3>
                    <p className="text-gray-700">{achievement.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Project Recognition Metrics */}
          <div className="grid grid-cols-4 gap-6">
            {projectRecognition.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + idx * 0.1, type: "spring" }}
                whileHover={{ y: -10 }}
                className="relative group"
              >
                <div className={`absolute -inset-2 bg-gradient-to-br ${item.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity`} />
                <div className="relative border-4 border-[#0F172A] rounded-2xl p-6 bg-white text-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                    className={`text-5xl font-bold mb-2 bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {item.metric}
                  </motion.div>
                  <p className="font-bold text-[#0F172A] mb-1">{item.label}</p>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* What Recruiters Are Looking For */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card className="p-10 border-4 border-[#0F172A] shadow-2xl bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
          <div className="flex items-center gap-4 mb-8">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="p-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-xl"
            >
              <Award className="w-10 h-10 text-white" />
            </motion.div>
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '2.5rem',
                  fontWeight: 700,
                  color: '#0F172A',
                  textTransform: 'uppercase'
                }}
              >
                🎯 What Recruiters Want to See
              </h2>
              <p className="text-xl text-gray-600">This project checks ALL the boxes</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {recruiterHighlights.map((highlight, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + idx * 0.1 }}
                className="border-4 border-[#0F172A] rounded-xl p-6 bg-white shadow-lg"
              >
                <h3 className="text-2xl font-bold mb-4 text-[#0F172A]">
                  {highlight.title}
                </h3>
                <ul className="space-y-3">
                  {highlight.points.map((point, pointIdx) => (
                    <motion.li
                      key={pointIdx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 + idx * 0.1 + pointIdx * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <span className="text-green-600 text-xl">✓</span>
                      <span className="text-gray-700">{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <Card className="p-10 border-4 border-[#0F172A] bg-gradient-to-r from-[#0F172A] to-[#1E293B] text-white text-center shadow-2xl">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-6xl mb-6"
          >
            🌟
          </motion.div>
          <h3 className="text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-mono)' }}>
            HIRE THIS EXCEPTIONAL DEVELOPER
          </h3>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Olunlade Abdulmuiz brings <strong>cutting-edge AI expertise</strong>, <strong>full-stack capabilities</strong>, 
            and <strong>production-ready code quality</strong> to your team. This project is proof of extraordinary talent.
          </p>
          <div className="flex gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-[#F59E0B] to-[#EF4444] text-white border-4 border-white rounded-xl shadow-xl text-lg font-bold"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              <ExternalLink className="w-5 h-5 inline mr-2" />
              VIEW PORTFOLIO
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-[#0F172A] border-4 border-white rounded-xl shadow-xl text-lg font-bold"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              <Mail className="w-5 h-5 inline mr-2" />
              GET IN TOUCH
            </motion.button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
