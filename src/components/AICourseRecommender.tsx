import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Sparkles, TrendingUp, Users, Star, Clock, BookOpen, Target, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface Course {
  id: string;
  code: string;
  name: string;
  credits: number;
  instructor: string;
  matchScore: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  rating: number;
  enrolled: number;
  reasons: string[];
  prerequisites: string[];
  outcomes: string[];
}

export function AICourseRecommender() {
  const [recommendations, setRecommendations] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  useEffect(() => {
    // Simulate AI recommendation engine
    setTimeout(() => {
      setRecommendations([
        {
          id: '1',
          code: 'CS401',
          name: 'Advanced Machine Learning',
          credits: 4,
          instructor: 'Dr. Sarah Chen',
          matchScore: 96,
          difficulty: 'Hard',
          rating: 4.8,
          enrolled: 45,
          reasons: [
            'Aligns with your AI/ML career goals',
            '89% of students with similar profile succeeded',
            'Builds on your CS301 knowledge',
            'High employer demand (+34% job postings)'
          ],
          prerequisites: ['CS301: Data Structures', 'MATH202: Linear Algebra'],
          outcomes: ['Build neural networks from scratch', 'Deploy ML models to production', 'Work with PyTorch & TensorFlow']
        },
        {
          id: '2',
          code: 'CS405',
          name: 'Distributed Systems',
          credits: 4,
          instructor: 'Prof. Michael Zhang',
          matchScore: 92,
          difficulty: 'Hard',
          rating: 4.7,
          enrolled: 38,
          reasons: [
            'Complements your backend development skills',
            'Required for senior engineering roles',
            'Project-based learning matches your style',
            '92% placement rate in top companies'
          ],
          prerequisites: ['CS301: Data Structures', 'CS305: Operating Systems'],
          outcomes: ['Design scalable architectures', 'Master microservices', 'Implement distributed algorithms']
        },
        {
          id: '3',
          code: 'CS420',
          name: 'Natural Language Processing',
          credits: 3,
          instructor: 'Dr. Emily Rodriguez',
          matchScore: 89,
          difficulty: 'Medium',
          rating: 4.9,
          enrolled: 52,
          reasons: [
            'Hot field with 150% job growth',
            'Your math skills give you an advantage',
            'Build GPT-style models hands-on',
            'Alumni work at OpenAI, Google, Meta'
          ],
          prerequisites: ['CS301: Data Structures', 'MATH301: Probability'],
          outcomes: ['Build chatbots & LLMs', 'Master transformer architecture', 'Fine-tune GPT models']
        },
        {
          id: '4',
          code: 'CS410',
          name: 'Computer Vision',
          credits: 4,
          instructor: 'Dr. James Lee',
          matchScore: 87,
          difficulty: 'Hard',
          rating: 4.6,
          enrolled: 41,
          reasons: [
            'Pairs perfectly with ML course',
            'High salary premium ($15k average)',
            'Work with cutting-edge AI',
            'Strong industry partnerships'
          ],
          prerequisites: ['CS301: Data Structures', 'MATH202: Linear Algebra'],
          outcomes: ['Build image recognition systems', 'Master CNNs & object detection', 'Deploy computer vision apps']
        },
        {
          id: '5',
          code: 'CS450',
          name: 'Cloud Computing & DevOps',
          credits: 3,
          instructor: 'Prof. Lisa Kumar',
          matchScore: 84,
          difficulty: 'Medium',
          rating: 4.8,
          enrolled: 67,
          reasons: [
            'Essential for modern development',
            'Hands-on with AWS, Docker, K8s',
            '100% job placement historically',
            'Industry-recognized certifications'
          ],
          prerequisites: ['CS301: Data Structures'],
          outcomes: ['Master AWS & Azure', 'Build CI/CD pipelines', 'Deploy containerized apps']
        },
        {
          id: '6',
          code: 'BUS310',
          name: 'Tech Entrepreneurship',
          credits: 3,
          instructor: 'Prof. David Park',
          matchScore: 78,
          difficulty: 'Easy',
          rating: 4.7,
          enrolled: 89,
          reasons: [
            'Balance technical courses with business',
            'Build your startup idea',
            'Network with VCs and founders',
            'Previous students raised $2M+ funding'
          ],
          prerequisites: [],
          outcomes: ['Validate startup ideas', 'Build business models', 'Pitch to investors']
        }
      ]);
      setIsLoading(false);
    }, 1800);
  }, []);

  if (isLoading) {
    return (
      <Card className="p-12 border-4 border-[#0F172A] text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="w-16 h-16 text-[#F59E0B] mx-auto mb-4" />
        </motion.div>
        <h3 className="font-bold text-xl mb-2">AI Analyzing Your Profile...</h3>
        <p className="text-gray-600 mb-6">Processing academic history, career goals, and student data</p>
        <div className="space-y-2 max-w-md mx-auto text-sm text-left">
          {[
            'Analyzing your completed courses',
            'Comparing with 10,000+ student profiles',
            'Calculating success probabilities',
            'Matching with career trajectories',
            'Ranking by predicted outcomes'
          ].map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.3 }}
              className="bg-gray-100 p-2 rounded"
            >
              ✓ {step}
            </motion.div>
          ))}
        </div>
      </Card>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Hard': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getMatchColor = (score: number) => {
    if (score >= 90) return 'from-green-500 to-emerald-500';
    if (score >= 80) return 'from-blue-500 to-cyan-500';
    if (score >= 70) return 'from-yellow-500 to-orange-500';
    return 'from-gray-500 to-slate-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6 border-4 border-[#0F172A] bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-[#F59E0B] to-[#EF4444] rounded-xl">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-2xl">AI Course Recommender</h2>
              <p className="text-sm text-gray-600">Personalized suggestions using collaborative filtering & ML</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-[#F59E0B]">{recommendations.length}</div>
            <div className="text-sm text-gray-600">Smart Matches</div>
          </div>
        </div>

        {/* Algorithm Info */}
        <div className="mt-4 grid grid-cols-3 gap-3">
          <div className="bg-white border-2 border-purple-300 rounded-lg p-3 text-center">
            <Target className="w-5 h-5 text-purple-600 mx-auto mb-1" />
            <div className="text-xs text-gray-600">Collaborative Filtering</div>
          </div>
          <div className="bg-white border-2 border-blue-300 rounded-lg p-3 text-center">
            <TrendingUp className="w-5 h-5 text-blue-600 mx-auto mb-1" />
            <div className="text-xs text-gray-600">Success Prediction</div>
          </div>
          <div className="bg-white border-2 border-orange-300 rounded-lg p-3 text-center">
            <Zap className="w-5 h-5 text-orange-600 mx-auto mb-1" />
            <div className="text-xs text-gray-600">Real-time Ranking</div>
          </div>
        </div>
      </Card>

      {/* Recommendations Grid */}
      <div className="grid grid-cols-2 gap-6">
        {recommendations.map((course, idx) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card className="p-6 border-4 border-[#0F172A] hover:shadow-xl transition-all cursor-pointer h-full">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="border-2 border-[#0F172A] font-bold">{course.code}</Badge>
                    <Badge className={`border-2 ${getDifficultyColor(course.difficulty)}`}>
                      {course.difficulty}
                    </Badge>
                  </div>
                  <h3 className="font-bold text-lg mb-1">{course.name}</h3>
                  <p className="text-sm text-gray-600">{course.instructor}</p>
                </div>
                
                {/* Match Score */}
                <div className="relative">
                  <motion.div
                    className={`w-20 h-20 rounded-full bg-gradient-to-br ${getMatchColor(course.matchScore)} flex items-center justify-center`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="text-center text-white">
                      <div className="text-2xl font-bold">{course.matchScore}</div>
                      <div className="text-xs">Match</div>
                    </div>
                  </motion.div>
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 opacity-30 blur-lg"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center bg-gray-50 border-2 border-gray-200 rounded-lg p-2">
                  <Star className="w-4 h-4 text-yellow-500 mx-auto mb-1" />
                  <div className="text-sm font-bold">{course.rating}</div>
                  <div className="text-xs text-gray-600">Rating</div>
                </div>
                <div className="text-center bg-gray-50 border-2 border-gray-200 rounded-lg p-2">
                  <Users className="w-4 h-4 text-blue-500 mx-auto mb-1" />
                  <div className="text-sm font-bold">{course.enrolled}</div>
                  <div className="text-xs text-gray-600">Enrolled</div>
                </div>
                <div className="text-center bg-gray-50 border-2 border-gray-200 rounded-lg p-2">
                  <Clock className="w-4 h-4 text-purple-500 mx-auto mb-1" />
                  <div className="text-sm font-bold">{course.credits}</div>
                  <div className="text-xs text-gray-600">Credits</div>
                </div>
              </div>

              {/* AI Reasons */}
              <div className="mb-4">
                <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#F59E0B]" />
                  Why AI Recommends This:
                </h4>
                <ul className="space-y-1">
                  {course.reasons.slice(0, 3).map((reason, i) => (
                    <li key={i} className="text-xs text-gray-700 flex items-start gap-2">
                      <span className="text-green-600 font-bold mt-0.5">✓</span>
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  onClick={() => setSelectedCourse(course)}
                  className="flex-1 bg-gradient-to-r from-[#F59E0B] to-[#EF4444] text-white border-2 border-[#0F172A]"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  View Details
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-[#0F172A]"
                >
                  <Star className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Course Details Modal */}
      {selectedCourse && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-6"
          onClick={() => setSelectedCourse(null)}
        >
          <motion.div
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white border-4 border-[#0F172A] rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="border-2 border-[#0F172A] font-bold text-lg px-3 py-1">
                    {selectedCourse.code}
                  </Badge>
                  <Badge className={`border-2 ${getDifficultyColor(selectedCourse.difficulty)}`}>
                    {selectedCourse.difficulty}
                  </Badge>
                </div>
                <h2 className="text-3xl font-bold mb-2">{selectedCourse.name}</h2>
                <p className="text-gray-600">{selectedCourse.instructor} • {selectedCourse.credits} Credits</p>
              </div>
              <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${getMatchColor(selectedCourse.matchScore)} flex items-center justify-center text-white`}>
                <div className="text-center">
                  <div className="text-3xl font-bold">{selectedCourse.matchScore}</div>
                  <div className="text-xs">Match</div>
                </div>
              </div>
            </div>

            {/* Prerequisites */}
            <div className="mb-6">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                Prerequisites
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedCourse.prerequisites.map((prereq, i) => (
                  <span key={i} className="bg-blue-50 border-2 border-blue-300 text-blue-800 px-3 py-1 rounded-lg text-sm">
                    {prereq}
                  </span>
                ))}
              </div>
            </div>

            {/* Learning Outcomes */}
            <div className="mb-6">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                What You'll Learn
              </h3>
              <ul className="space-y-2">
                {selectedCourse.outcomes.map((outcome, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-green-600 font-bold mt-0.5">✓</span>
                    <span className="text-gray-700">{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* AI Insights */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-300 rounded-lg p-4 mb-6">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#F59E0B]" />
                AI Recommendation Insights
              </h3>
              <ul className="space-y-2">
                {selectedCourse.reasons.map((reason, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-purple-600 font-bold mt-0.5">•</span>
                    <span className="text-gray-700">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button className="flex-1 bg-gradient-to-r from-[#F59E0B] to-[#EF4444] text-white border-2 border-[#0F172A] text-lg py-6">
                <BookOpen className="w-5 h-5 mr-2" />
                Register for This Course
              </Button>
              <Button
                variant="outline"
                onClick={() => setSelectedCourse(null)}
                className="border-2 border-[#0F172A]"
              >
                Close
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
