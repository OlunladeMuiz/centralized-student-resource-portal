import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { TrendingUp, TrendingDown, Target, Brain, Zap, Award, AlertTriangle, CheckCircle2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Area, AreaChart } from 'recharts';

interface Prediction {
  metric: string;
  current: number;
  predicted: number;
  confidence: number;
  trend: 'up' | 'down' | 'stable';
  recommendation: string;
}

export function AIPredictiveAnalytics() {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(true);

  useEffect(() => {
    // Simulate ML model processing
    setTimeout(() => {
      setPredictions([
        {
          metric: 'Final GPA',
          current: 3.5,
          predicted: 3.7,
          confidence: 0.87,
          trend: 'up',
          recommendation: 'Maintain current study schedule. Focus 2 extra hours on Math to reach 3.8.'
        },
        {
          metric: 'Course Success Rate',
          current: 85,
          predicted: 92,
          confidence: 0.91,
          trend: 'up',
          recommendation: 'Excellent trajectory! Attend Prof. Smith\'s office hours for +5% boost.'
        },
        {
          metric: 'Graduation Timeline',
          current: 4.0,
          predicted: 3.8,
          confidence: 0.78,
          trend: 'up',
          recommendation: 'Take 1 summer course to graduate early. Saves $8,000 in tuition.'
        },
        {
          metric: 'Job Placement Probability',
          current: 72,
          predicted: 89,
          confidence: 0.84,
          trend: 'up',
          recommendation: 'Build 2 more projects. Your AI portfolio increases placement by 23%.'
        }
      ]);
      setIsAnalyzing(false);
    }, 2000);
  }, []);

  // Sample data for charts
  const gpaHistoryData = [
    { semester: 'Fall 22', actual: 3.2, predicted: 3.2 },
    { semester: 'Spring 23', actual: 3.4, predicted: 3.3 },
    { semester: 'Fall 23', actual: 3.5, predicted: 3.5 },
    { semester: 'Spring 24', actual: 3.5, predicted: 3.6 },
    { semester: 'Fall 24', actual: 0, predicted: 3.7 },
    { semester: 'Spring 25', actual: 0, predicted: 3.8 },
  ];

  const performanceRadarData = [
    { subject: 'Programming', score: 92, benchmark: 75 },
    { subject: 'Mathematics', score: 78, benchmark: 70 },
    { subject: 'Databases', score: 88, benchmark: 72 },
    { subject: 'Algorithms', score: 85, benchmark: 68 },
    { subject: 'System Design', score: 80, benchmark: 65 },
    { subject: 'Communication', score: 90, benchmark: 80 },
  ];

  const weeklyStudyData = [
    { week: 'Week 1', hours: 12, optimal: 15, outcome: 85 },
    { week: 'Week 2', hours: 18, optimal: 15, outcome: 92 },
    { week: 'Week 3', hours: 14, optimal: 16, outcome: 88 },
    { week: 'Week 4', hours: 20, optimal: 15, outcome: 95 },
    { week: 'Week 5', hours: 16, optimal: 17, outcome: 90 },
    { week: 'Week 6', hours: 15, optimal: 15, outcome: 89 },
  ];

  const riskFactors = [
    { factor: 'Course Load', risk: 'Medium', score: 65, suggestion: 'Consider dropping 1 course if workload exceeds 20hrs/week' },
    { factor: 'Attendance Rate', risk: 'Low', score: 92, suggestion: 'Excellent! Keep attending all lectures.' },
    { factor: 'Assignment Completion', risk: 'Low', score: 95, suggestion: 'Outstanding consistency. AI predicts 98% final score.' },
    { factor: 'Study Pattern', risk: 'Medium', score: 72, suggestion: 'Inconsistent. Set fixed study blocks for better outcomes.' },
  ];

  if (isAnalyzing) {
    return (
      <Card className="p-12 border-4 border-[#0F172A] shadow-xl text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Brain className="w-16 h-16 text-[#F59E0B] mx-auto mb-4" />
        </motion.div>
        <h3 className="font-bold text-xl mb-2">AI Analyzing Your Data...</h3>
        <p className="text-gray-600 mb-6">Processing 1,247 data points with machine learning models</p>
        <div className="space-y-2 max-w-md mx-auto">
          {['Training neural networks', 'Analyzing patterns', 'Generating predictions', 'Calculating probabilities'].map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.3 }}
              className="text-sm text-left bg-gray-100 p-2 rounded"
            >
              ✓ {step}
            </motion.div>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6 border-4 border-[#0F172A] bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-[#8B5CF6] to-[#3B82F6] rounded-xl">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-2xl">AI Predictive Analytics Dashboard</h2>
              <p className="text-sm text-gray-600">Machine learning powered insights & predictions</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white border-2 border-[#0F172A] px-4 py-2 rounded-lg">
            <Sparkles className="w-5 h-5 text-[#F59E0B]" />
            <div className="text-left">
              <div className="text-xs text-gray-600">Model Accuracy</div>
              <div className="font-bold text-lg">94.3%</div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-4">
          {predictions.map((pred, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white border-2 border-[#0F172A] rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">{pred.metric}</span>
                {pred.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4 text-green-600" />
                ) : pred.trend === 'down' ? (
                  <TrendingDown className="w-4 h-4 text-red-600" />
                ) : (
                  <Target className="w-4 h-4 text-blue-600" />
                )}
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">{pred.predicted}</span>
                <span className="text-sm text-gray-500">from {pred.current}</span>
              </div>
              <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pred.confidence * 100}%` }}
                  transition={{ delay: 0.5 + idx * 0.1, duration: 0.8 }}
                  className="h-full bg-gradient-to-r from-[#F59E0B] to-[#EF4444]"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">{(pred.confidence * 100).toFixed(0)}% confidence</p>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* GPA Prediction Chart */}
      <Card className="p-6 border-4 border-[#0F172A]">
        <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-green-600" />
          GPA Trajectory & Predictions
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={gpaHistoryData}>
            <defs>
              <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="semester" />
            <YAxis domain={[0, 4]} />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="actual" stroke="#F59E0B" fillOpacity={1} fill="url(#colorActual)" name="Actual GPA" />
            <Area type="monotone" dataKey="predicted" stroke="#8B5CF6" strokeDasharray="5 5" fillOpacity={1} fill="url(#colorPredicted)" name="AI Predicted" />
          </AreaChart>
        </ResponsiveContainer>
        <div className="mt-4 p-4 bg-green-50 border-2 border-green-500 rounded-lg">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600 mt-1" />
            <div>
              <h4 className="font-bold text-green-900 mb-1">AI Insight</h4>
              <p className="text-sm text-green-800">
                Your GPA shows consistent improvement. ML model predicts 3.8 GPA by Spring 2025 (87% confidence). 
                This puts you in top 15% of your cohort and significantly improves graduate school acceptance probability.
              </p>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-6">
        {/* Performance Radar */}
        <Card className="p-6 border-4 border-[#0F172A]">
          <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
            <Target className="w-6 h-6 text-blue-600" />
            Skills Performance Analysis
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={performanceRadarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar name="Your Score" dataKey="score" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} />
              <Radar name="Class Average" dataKey="benchmark" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.3} />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
          <p className="text-sm text-gray-600 mt-2">
            🎯 <strong>Strengths:</strong> Programming, Communication<br/>
            ⚠️ <strong>Focus Area:</strong> Mathematics (need +14 points for optimization)
          </p>
        </Card>

        {/* Study Optimization */}
        <Card className="p-6 border-4 border-[#0F172A]">
          <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
            <Zap className="w-6 h-6 text-yellow-600" />
            Study Time Optimization
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyStudyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="hours" fill="#F59E0B" name="Actual Hours" />
              <Bar dataKey="optimal" fill="#8B5CF6" name="AI Optimal" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 p-3 bg-purple-50 border-2 border-purple-500 rounded-lg">
            <p className="text-sm">
              <strong>🤖 AI Recommendation:</strong> Maintain 15-17 hours/week for optimal performance. 
              You over-studied in Week 4 (20hrs) with diminishing returns. Smart scheduling can improve efficiency by 23%.
            </p>
          </div>
        </Card>
      </div>

      {/* Risk Assessment */}
      <Card className="p-6 border-4 border-[#0F172A]">
        <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-orange-600" />
          AI Risk Assessment & Interventions
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {riskFactors.map((risk, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`border-2 rounded-lg p-4 ${
                risk.risk === 'Low' ? 'border-green-500 bg-green-50' :
                risk.risk === 'Medium' ? 'border-yellow-500 bg-yellow-50' :
                'border-red-500 bg-red-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold">{risk.factor}</h4>
                <span className={`px-2 py-1 rounded text-xs font-bold ${
                  risk.risk === 'Low' ? 'bg-green-200 text-green-800' :
                  risk.risk === 'Medium' ? 'bg-yellow-200 text-yellow-800' :
                  'bg-red-200 text-red-800'
                }`}>
                  {risk.risk} Risk
                </span>
              </div>
              <div className="mb-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${
                    risk.risk === 'Low' ? 'bg-green-500' :
                    risk.risk === 'Medium' ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                  style={{ width: `${risk.score}%` }}
                />
              </div>
              <p className="text-sm text-gray-700">{risk.suggestion}</p>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Personalized Recommendations */}
      <Card className="p-6 border-4 border-[#0F172A] bg-gradient-to-br from-blue-50 to-purple-50">
        <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
          <Award className="w-6 h-6 text-[#F59E0B]" />
          AI-Generated Action Plan
        </h3>
        <div className="space-y-3">
          {predictions.map((pred, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.15 }}
              className="bg-white border-2 border-[#0F172A] rounded-lg p-4 flex items-start gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F59E0B] to-[#EF4444] flex items-center justify-center text-white font-bold flex-shrink-0">
                {idx + 1}
              </div>
              <div className="flex-1">
                <h4 className="font-bold mb-1">{pred.metric}</h4>
                <p className="text-sm text-gray-700">{pred.recommendation}</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                  <span>Impact: {pred.trend === 'up' ? 'High' : 'Medium'}</span>
                  <span>•</span>
                  <span>Confidence: {(pred.confidence * 100).toFixed(0)}%</span>
                  <span>•</span>
                  <span>Expected gain: +{((pred.predicted - pred.current)).toFixed(1)}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <Button className="w-full mt-4 bg-gradient-to-r from-[#F59E0B] to-[#EF4444] text-white border-2 border-[#0F172A]">
          <Sparkles className="w-4 h-4 mr-2" />
          Generate Detailed Study Plan with AI
        </Button>
      </Card>
    </div>
  );
}
