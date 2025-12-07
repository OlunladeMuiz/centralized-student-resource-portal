import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Award, TrendingUp, Download } from 'lucide-react';
import { Button } from './ui/button';

export function ResultPage() {
  const semesters = [
    {
      name: 'Semester 1, 2023/2024',
      gpa: 3.75,
      courses: [
        { code: 'CS201', name: 'Software Engineering', grade: 'A', points: 4.0 },
        { code: 'CS202', name: 'Web Development', grade: 'A-', points: 3.7 },
        { code: 'CS203', name: 'Mobile App Development', grade: 'B+', points: 3.3 },
        { code: 'CS204', name: 'Computer Graphics', grade: 'A', points: 4.0 },
      ]
    },
    {
      name: 'Semester 2, 2022/2023',
      gpa: 3.55,
      courses: [
        { code: 'CS101', name: 'Introduction to Programming', grade: 'A-', points: 3.7 },
        { code: 'CS102', name: 'Data Structures', grade: 'B+', points: 3.3 },
        { code: 'CS103', name: 'Discrete Mathematics', grade: 'B', points: 3.0 },
        { code: 'CS104', name: 'Computer Architecture', grade: 'A', points: 4.0 },
      ]
    }
  ];

  const cumulativeGPA = 3.65;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <div>
        <h1 className="mb-3">My Results</h1>
        <p className="text-[#64748B] mb-8">View your academic performance and grades</p>
      </div>

      {/* Cumulative GPA Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="border-4 border-[#F59E0B] shadow-[8px_8px_0px_0px_rgba(245,158,11,1)] bg-gradient-to-br from-[#FEF3C7] to-white">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-[#F59E0B]" />
                <span>Cumulative GPA</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-[#10B981]" />
                <span className="text-5xl" style={{ fontFamily: 'var(--font-display)' }}>{cumulativeGPA.toFixed(2)}</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[#64748B]" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>
              Based on all completed semesters • Dean&apos;s List Status
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Semester Results */}
      <div className="space-y-6">
        {semesters.map((semester, semIndex) => (
          <motion.div
            key={semester.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + semIndex * 0.1 }}
          >
            <Card className="border-4 border-[#0F172A] shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="mb-2">{semester.name}</CardTitle>
                    <p className="text-[#64748B]" style={{ fontSize: '0.875rem' }}>
                      Semester GPA: <span className="text-[#F59E0B]" style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{semester.gpa.toFixed(2)}</span>
                    </p>
                  </div>
                  <Button className="bg-[#0F172A] hover:bg-[#1E293B] text-white border-2 border-[#F59E0B] shadow-[2px_2px_0px_0px_rgba(245,158,11,1)]">
                    <Download className="w-4 h-4 mr-2" />
                    Download Transcript
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-hidden rounded-lg border-2 border-[#0F172A]">
                  <table className="w-full">
                    <thead className="bg-[#0F172A] text-white">
                      <tr>
                        <th className="px-6 py-3 text-left" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Course Code</th>
                        <th className="px-6 py-3 text-left" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Course Name</th>
                        <th className="px-6 py-3 text-center" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Grade</th>
                        <th className="px-6 py-3 text-center" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Points</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {semester.courses.map((course, index) => (
                        <motion.tr
                          key={course.code}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 + semIndex * 0.1 + index * 0.05 }}
                          className="border-b-2 border-[#E2E8F0] hover:bg-[#F8F9FA] transition-colors"
                        >
                          <td className="px-6 py-4" style={{ fontFamily: 'var(--font-mono)' }}>{course.code}</td>
                          <td className="px-6 py-4">{course.name}</td>
                          <td className="px-6 py-4 text-center">
                            <span className={`px-4 py-1 rounded-full border-2 border-[#0F172A] inline-block ${
                              course.grade.startsWith('A') ? 'bg-[#10B981] text-white' :
                              course.grade.startsWith('B') ? 'bg-[#F59E0B] text-white' :
                              'bg-[#64748B] text-white'
                            }`} style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                              {course.grade}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center" style={{ fontFamily: 'var(--font-mono)' }}>{course.points.toFixed(1)}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Grade Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <Card className="border-2 border-[#E2E8F0] shadow-[4px_4px_0px_0px_rgba(226,232,240,1)]">
          <CardHeader>
            <CardTitle style={{ fontSize: '1rem' }}>Grading Scale</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>
              <div>A: 4.0 (90-100%)</div>
              <div>A-: 3.7 (85-89%)</div>
              <div>B+: 3.3 (80-84%)</div>
              <div>B: 3.0 (75-79%)</div>
              <div>B-: 2.7 (70-74%)</div>
              <div>C+: 2.3 (65-69%)</div>
              <div>C: 2.0 (60-64%)</div>
              <div>F: 0.0 (&lt; 60%)</div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}