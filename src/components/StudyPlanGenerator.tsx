import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Sparkles, Calendar, Clock, Target, TrendingUp, Download, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface StudyPlan {
  weeklySchedule: WeekDay[];
  goals: string[];
  resources: string[];
  milestones: Milestone[];
  estimatedGPA: number;
}

interface WeekDay {
  day: string;
  sessions: StudySession[];
}

interface StudySession {
  time: string;
  subject: string;
  activity: string;
  duration: string;
  priority: 'High' | 'Medium' | 'Low';
}

interface Milestone {
  week: number;
  goal: string;
  completed: boolean;
}

export function StudyPlanGenerator() {
  const [formData, setFormData] = useState({
    studyHoursPerDay: '',
    targetGPA: '',
    currentGPA: '',
    subjects: '',
    examDate: '',
    learningStyle: 'visual'
  });
  const [generating, setGenerating] = useState(false);
  const [studyPlan, setStudyPlan] = useState<StudyPlan | null>(null);

  const handleGenerate = async () => {
    if (!formData.studyHoursPerDay || !formData.targetGPA || !formData.subjects) {
      alert('Please fill in all required fields');
      return;
    }

    setGenerating(true);

    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 3000));

    const subjects = formData.subjects.split(',').map(s => s.trim());
    
    const generatedPlan: StudyPlan = {
      weeklySchedule: generateWeeklySchedule(subjects, parseInt(formData.studyHoursPerDay)),
      goals: generateGoals(subjects, formData.targetGPA),
      resources: generateResources(subjects, formData.learningStyle),
      milestones: generateMilestones(subjects),
      estimatedGPA: calculateEstimatedGPA(formData.currentGPA, formData.targetGPA)
    };

    setStudyPlan(generatedPlan);
    setGenerating(false);
  };

  const generateWeeklySchedule = (subjects: string[], hoursPerDay: number): WeekDay[] => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const timeSlots = ['9:00 AM', '2:00 PM', '7:00 PM'];
    
    return days.map((day, dayIdx) => {
      const isWeekend = dayIdx >= 5;
      const sessionsPerDay = isWeekend ? Math.min(2, Math.ceil(hoursPerDay / 2)) : Math.min(3, Math.ceil(hoursPerDay / 2));
      
      const sessions: StudySession[] = [];
      for (let i = 0; i < sessionsPerDay; i++) {
        const subject = subjects[Math.floor(Math.random() * subjects.length)];
        const activities = ['Theory Review', 'Practice Problems', 'Past Papers', 'Video Lectures', 'Group Study', 'Lab Work'];
        const activity = activities[Math.floor(Math.random() * activities.length)];
        const priorities: ('High' | 'Medium' | 'Low')[] = ['High', 'Medium', 'Low'];
        
        sessions.push({
          time: timeSlots[i],
          subject,
          activity,
          duration: `${Math.floor(hoursPerDay / sessionsPerDay * 60)} min`,
          priority: priorities[Math.floor(Math.random() * priorities.length)]
        });
      }
      
      return { day, sessions };
    });
  };

  const generateGoals = (subjects: string[], targetGPA: string): string[] => {
    return [
      `Achieve ${targetGPA} GPA by end of semester`,
      ...subjects.map(s => `Master core concepts in ${s}`),
      'Complete all assignments 2 days before deadline',
      'Attend 95% of classes',
      'Practice 50+ problems per subject',
      'Join study groups for collaborative learning'
    ];
  };

  const generateResources = (subjects: string[], learningStyle: string): string[] => {
    const resources = {
      visual: ['Khan Academy Videos', 'YouTube Tutorials', 'Mind Maps', 'Infographics', 'Flowcharts'],
      auditory: ['Podcasts', 'Audio Lectures', 'Study Group Discussions', 'Voice Notes', 'Recorded Lectures'],
      kinesthetic: ['Lab Practicals', 'Coding Exercises', 'Hands-on Projects', 'Interactive Simulations', 'Physical Models'],
      reading: ['Textbooks', 'Research Papers', 'Online Articles', 'Study Guides', 'Lecture Notes']
    };
    
    const baseResources = resources[learningStyle as keyof typeof resources] || resources.visual;
    
    return [
      ...baseResources.slice(0, 3),
      ...subjects.map(s => `${s} - Recommended Textbook`),
      'ChatGPT for instant explanations',
      'Stack Overflow for coding queries',
      'Quizlet for flashcards'
    ];
  };

  const generateMilestones = (subjects: string[]): Milestone[] => {
    return [
      { week: 1, goal: 'Complete Week 1 syllabus coverage', completed: false },
      { week: 2, goal: 'Finish first set of practice problems', completed: false },
      { week: 4, goal: `Mid-term preparation for ${subjects[0]}`, completed: false },
      { week: 6, goal: 'Complete 50% of course material', completed: false },
      { week: 8, goal: 'Start final exam preparation', completed: false },
      { week: 10, goal: 'Complete all past papers', completed: false },
      { week: 12, goal: 'Final revision and mock tests', completed: false }
    ];
  };

  const calculateEstimatedGPA = (current: string, target: string): number => {
    const currentGPA = parseFloat(current) || 3.0;
    const targetGPA = parseFloat(target) || 4.0;
    return Math.min(4.0, currentGPA + (targetGPA - currentGPA) * 0.7);
  };

  const downloadPlan = () => {
    if (!studyPlan) return;
    
    const content = `
# AI-Generated Study Plan
Generated on: ${new Date().toLocaleDateString()}

## Target GPA: ${formData.targetGPA}
## Estimated Achievement: ${studyPlan.estimatedGPA.toFixed(2)}

## Goals:
${studyPlan.goals.map((g, i) => `${i + 1}. ${g}`).join('\n')}

## Weekly Schedule:
${studyPlan.weeklySchedule.map(day => `
### ${day.day}
${day.sessions.map(s => `- ${s.time}: ${s.subject} - ${s.activity} (${s.duration}) [${s.priority} Priority]`).join('\n')}
`).join('\n')}

## Resources:
${studyPlan.resources.map((r, i) => `${i + 1}. ${r}`).join('\n')}

## Milestones:
${studyPlan.milestones.map(m => `Week ${m.week}: ${m.goal}`).join('\n')}
    `;

    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'AI-Study-Plan.md';
    a.click();
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Low': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Input Form */}
      <Card className="p-8 border-4 border-[#0F172A] dark:border-white shadow-2xl bg-gradient-to-br from-white via-purple-50/30 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="flex items-center gap-3 mb-6">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="p-4 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl shadow-xl"
          >
            <Sparkles className="w-8 h-8 text-white" />
          </motion.div>
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI Study Plan Generator
            </h2>
            <p className="text-gray-600 dark:text-gray-400">Create a personalized study schedule powered by machine learning</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <Label className="font-bold mb-2 block">Study Hours Per Day *</Label>
            <Input
              type="number"
              value={formData.studyHoursPerDay}
              onChange={(e) => setFormData({ ...formData, studyHoursPerDay: e.target.value })}
              placeholder="e.g., 4"
              className="border-2 border-[#0F172A] dark:border-white"
              min="1"
              max="16"
            />
          </div>

          <div>
            <Label className="font-bold mb-2 block">Target GPA *</Label>
            <Input
              type="number"
              value={formData.targetGPA}
              onChange={(e) => setFormData({ ...formData, targetGPA: e.target.value })}
              placeholder="e.g., 3.8"
              className="border-2 border-[#0F172A] dark:border-white"
              min="0"
              max="4"
              step="0.1"
            />
          </div>

          <div>
            <Label className="font-bold mb-2 block">Current GPA</Label>
            <Input
              type="number"
              value={formData.currentGPA}
              onChange={(e) => setFormData({ ...formData, currentGPA: e.target.value })}
              placeholder="e.g., 3.2"
              className="border-2 border-[#0F172A] dark:border-white"
              min="0"
              max="4"
              step="0.1"
            />
          </div>

          <div>
            <Label className="font-bold mb-2 block">Exam/Target Date</Label>
            <Input
              type="date"
              value={formData.examDate}
              onChange={(e) => setFormData({ ...formData, examDate: e.target.value })}
              className="border-2 border-[#0F172A] dark:border-white"
            />
          </div>

          <div className="col-span-2">
            <Label className="font-bold mb-2 block">Subjects (comma-separated) *</Label>
            <Input
              value={formData.subjects}
              onChange={(e) => setFormData({ ...formData, subjects: e.target.value })}
              placeholder="e.g., Mathematics, Physics, Computer Science"
              className="border-2 border-[#0F172A] dark:border-white"
            />
          </div>

          <div className="col-span-2">
            <Label className="font-bold mb-2 block">Learning Style</Label>
            <div className="grid grid-cols-4 gap-3">
              {['visual', 'auditory', 'kinesthetic', 'reading'].map((style) => (
                <button
                  key={style}
                  onClick={() => setFormData({ ...formData, learningStyle: style })}
                  className={`p-3 border-2 rounded-xl capitalize font-medium transition-all ${
                    formData.learningStyle === style
                      ? 'border-[#F59E0B] bg-[#F59E0B] text-white'
                      : 'border-[#0F172A] dark:border-white hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>
        </div>

        <Button
          onClick={handleGenerate}
          disabled={generating}
          className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-2 border-[#0F172A] dark:border-white text-lg py-6"
        >
          {generating ? (
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5" />
              </motion.div>
              <span>Generating AI Study Plan...</span>
            </div>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              Generate Study Plan with AI
            </>
          )}
        </Button>
      </Card>

      {/* Generated Plan */}
      <AnimatePresence>
        {studyPlan && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="space-y-6"
          >
            {/* Summary Stats */}
            <div className="grid grid-cols-4 gap-6">
              {[
                { icon: Target, label: 'Target GPA', value: formData.targetGPA, color: 'from-blue-500 to-cyan-500' },
                { icon: TrendingUp, label: 'Estimated GPA', value: studyPlan.estimatedGPA.toFixed(2), color: 'from-green-500 to-emerald-500' },
                { icon: Calendar, label: 'Weeks to Goal', value: '12', color: 'from-purple-500 to-pink-500' },
                { icon: Clock, label: 'Daily Hours', value: formData.studyHoursPerDay, color: 'from-orange-500 to-red-500' }
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="p-6 border-4 border-[#0F172A] dark:border-white text-center">
                    <div className={`w-16 h-16 mx-auto mb-3 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center`}>
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Weekly Schedule */}
            <Card className="p-8 border-4 border-[#0F172A] dark:border-white">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Weekly Study Schedule</h3>
                <div className="flex gap-3">
                  <Button onClick={downloadPlan} variant="outline" className="border-2 border-[#0F172A] dark:border-white">
                    <Download className="w-4 h-4 mr-2" />
                    Download Plan
                  </Button>
                  <Button variant="outline" className="border-2 border-[#0F172A] dark:border-white">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>

              <div className="space-y-6">
                {studyPlan.weeklySchedule.map((day, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="border-2 border-gray-200 dark:border-gray-700 rounded-xl p-4"
                  >
                    <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                      <div className="w-3 h-3 bg-[#F59E0B] rounded-full" />
                      {day.day}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {day.sessions.map((session, sIdx) => (
                        <div key={sIdx} className="border-2 border-[#0F172A] dark:border-white rounded-lg p-4 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-bold text-[#F59E0B]">{session.time}</span>
                            <span className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(session.priority)}`}>
                              {session.priority}
                            </span>
                          </div>
                          <div className="font-bold mb-1">{session.subject}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">{session.activity}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-500 mt-2">{session.duration}</div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Goals & Resources */}
            <div className="grid grid-cols-2 gap-6">
              <Card className="p-6 border-4 border-[#0F172A] dark:border-white">
                <h3 className="text-xl font-bold mb-4">🎯 Learning Goals</h3>
                <ul className="space-y-2">
                  {studyPlan.goals.map((goal, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start gap-2"
                    >
                      <span className="text-green-600 font-bold mt-1">✓</span>
                      <span>{goal}</span>
                    </motion.li>
                  ))}
                </ul>
              </Card>

              <Card className="p-6 border-4 border-[#0F172A] dark:border-white">
                <h3 className="text-xl font-bold mb-4">📚 Recommended Resources</h3>
                <ul className="space-y-2">
                  {studyPlan.resources.map((resource, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start gap-2"
                    >
                      <span className="text-blue-600 font-bold mt-1">•</span>
                      <span>{resource}</span>
                    </motion.li>
                  ))}
                </ul>
              </Card>
            </div>

            {/* Milestones */}
            <Card className="p-6 border-4 border-[#0F172A] dark:border-white">
              <h3 className="text-xl font-bold mb-4">🏆 Milestones & Progress</h3>
              <div className="space-y-3">
                {studyPlan.milestones.map((milestone, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg p-3"
                  >
                    <div className="font-bold text-[#F59E0B] min-w-[80px]">Week {milestone.week}</div>
                    <div className="flex-1">{milestone.goal}</div>
                    <input type="checkbox" className="w-5 h-5" />
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
