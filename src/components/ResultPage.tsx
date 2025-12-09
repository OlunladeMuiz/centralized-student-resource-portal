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
        <h1 className="mb-2 sm:mb-3 text-2xl sm:text-4xl">My Results</h1>
        <p className="text-[#64748B] mb-6 sm:mb-8 text-sm sm:text-base">View your academic performance and grades</p>
      </div>

      {/* Cumulative GPA Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="border-3 sm:border-4 border-[#F59E0B] shadow-[4px_4px_0px_0px_rgba(245,158,11,1)] sm:shadow-[8px_8px_0px_0px_rgba(245,158,11,1)] bg-gradient-to-br from-[#FEF3C7] to-white">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
              <div className="flex items-center gap-2 sm:gap-3">
                <Award className="w-6 sm:w-8 h-6 sm:h-8 text-[#F59E0B] flex-shrink-0" />
                <span className="text-lg sm:text-2xl">Cumulative GPA</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <TrendingUp className="w-5 sm:w-6 h-5 sm:h-6 text-[#10B981] flex-shrink-0" />
                <span className="text-3xl sm:text-5xl" style={{ fontFamily: 'var(--font-display)' }}>{cumulativeGPA.toFixed(2)}</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <p className="text-[#64748B] text-xs sm:text-sm" style={{ fontFamily: 'var(--font-mono)' }}>
              Based on all completed semesters • Dean&apos;s List Status
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Semester Results */}
      <div className="space-y-4 sm:space-y-6">
        {semesters.map((semester, semIndex) => (
          <motion.div
            key={semester.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + semIndex * 0.1 }}
          >
            <Card className="border-3 sm:border-4 border-[#0F172A] shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] sm:shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
              <CardHeader className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-0">
                  <div>
                    <CardTitle className="mb-1 sm:mb-2 text-lg sm:text-2xl">{semester.name}</CardTitle>
                    <p className="text-[#64748B] text-xs sm:text-sm">
                      Semester GPA: <span className="text-[#F59E0B]" style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{semester.gpa.toFixed(2)}</span>
                    </p>
                  </div>
                  <Button className="bg-[#0F172A] hover:bg-[#1E293B] text-white border-2 border-[#F59E0B] shadow-[2px_2px_0px_0px_rgba(245,158,11,1)] px-3 sm:px-4 py-2 text-xs sm:text-sm whitespace-nowrap">
                    <Download className="w-3 sm:w-4 h-3 sm:h-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Download Transcript</span>
                    <span className="sm:hidden">Download</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0 overflow-x-auto">
                <div className="min-w-full rounded-lg border-2 border-[#0F172A]">
                  <table className="w-full text-xs sm:text-sm">
                    <thead className="bg-[#0F172A] text-white">
                      <tr>
                        <th className="px-2 sm:px-6 py-2 sm:py-3 text-left" style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.65rem, 1.5vw, 0.75rem)', textTransform: 'uppercase' }}>Code</th>
                        <th className="px-2 sm:px-6 py-2 sm:py-3 text-left" style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.65rem, 1.5vw, 0.75rem)', textTransform: 'uppercase' }}>Course</th>
                        <th className="px-2 sm:px-6 py-2 sm:py-3 text-center" style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.65rem, 1.5vw, 0.75rem)', textTransform: 'uppercase' }}>Grade</th>
                        <th className="px-2 sm:px-6 py-2 sm:py-3 text-center" style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.65rem, 1.5vw, 0.75rem)', textTransform: 'uppercase' }}>Points</th>
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
                          <td className="px-2 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm" style={{ fontFamily: 'var(--font-mono)' }}>{course.code}</td>
                          <td className="px-2 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm line-clamp-2">{course.name}</td>
                          <td className="px-2 sm:px-6 py-2 sm:py-4 text-center">
                            <span className={`px-2 sm:px-4 py-1 rounded-full border border-sm:border-2 border-[#0F172A] inline-block text-xs sm:text-sm ${
                              course.grade.startsWith('A') ? 'bg-[#10B981] text-white' :
                              course.grade.startsWith('B') ? 'bg-[#F59E0B] text-white' :
                              'bg-[#64748B] text-white'
                            }`} style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                              {course.grade}
                            </span>
                          </td>
                          <td className="px-2 sm:px-6 py-2 sm:py-4 text-center text-xs sm:text-sm" style={{ fontFamily: 'var(--font-mono)' }}>{course.points.toFixed(1)}</td>
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
        <Card className="border-2 border-[#E2E8F0] shadow-[2px_2px_0px_0px_rgba(226,232,240,1)] sm:shadow-[4px_4px_0px_0px_rgba(226,232,240,1)]">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1rem)' }}>Grading Scale</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4" style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)' }}>
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