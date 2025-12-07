import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { BookOpen, CheckCircle, FileText, XCircle, ClipboardList } from 'lucide-react';
import { Button } from './ui/button';

type CoursePageProps = {
  section: 'registration' | 'view' | 'form' | 'drop' | 'dockets';
};

export function CoursePage({ section }: CoursePageProps) {
  const renderSection = () => {
    switch (section) {
      case 'registration':
        return <CourseRegistration />;
      case 'view':
        return <ViewRegisteredCourses />;
      case 'form':
        return <CourseForm />;
      case 'drop':
        return <DropCourses />;
      case 'dockets':
        return <ExaminationDockets />;
      default:
        return <CourseRegistration />;
    }
  };

  return (
    <div className="space-y-8">
      {renderSection()}
    </div>
  );
}

function CourseRegistration() {
  const availableCourses = [
    { code: 'CS301', name: 'Data Structures & Algorithms', credits: 3, instructor: 'Dr. Smith' },
    { code: 'CS302', name: 'Database Management Systems', credits: 4, instructor: 'Prof. Johnson' },
    { code: 'CS303', name: 'Operating Systems', credits: 3, instructor: 'Dr. Williams' },
    { code: 'CS304', name: 'Computer Networks', credits: 3, instructor: 'Prof. Brown' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="mb-3">Course Registration</h1>
      <p className="text-[#64748B] mb-8">Register for courses for the current semester</p>

      <div className="grid gap-4">
        {availableCourses.map((course, index) => (
          <motion.div
            key={course.code}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="border-2 border-[#0F172A] shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] transition-all">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-[#F59E0B]" />
                      {course.code} - {course.name}
                    </CardTitle>
                    <CardDescription className="mt-2">
                      <span className="text-[#0F172A]" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                        Instructor: {course.instructor} • Credits: {course.credits}
                      </span>
                    </CardDescription>
                  </div>
                  <Button className="bg-[#10B981] hover:bg-[#059669] text-white border-2 border-[#0F172A] shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                    Register
                  </Button>
                </div>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function ViewRegisteredCourses() {
  const registeredCourses = [
    { code: 'CS201', name: 'Software Engineering', credits: 4, status: 'Active', grade: '-' },
    { code: 'CS202', name: 'Web Development', credits: 3, status: 'Active', grade: '-' },
    { code: 'CS203', name: 'Mobile App Development', credits: 3, status: 'Active', grade: '-' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="mb-3">Registered Courses</h1>
      <p className="text-[#64748B] mb-8">View all your currently registered courses</p>

      <div className="bg-white border-4 border-[#0F172A] rounded-xl shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#0F172A] text-white">
            <tr>
              <th className="px-6 py-4 text-left" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Course Code</th>
              <th className="px-6 py-4 text-left" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Course Name</th>
              <th className="px-6 py-4 text-left" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Credits</th>
              <th className="px-6 py-4 text-left" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {registeredCourses.map((course, index) => (
              <motion.tr
                key={course.code}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="border-b-2 border-[#E2E8F0] hover:bg-[#F8F9FA] transition-colors"
              >
                <td className="px-6 py-4" style={{ fontFamily: 'var(--font-mono)' }}>{course.code}</td>
                <td className="px-6 py-4">{course.name}</td>
                <td className="px-6 py-4">{course.credits}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-[#10B981] text-white rounded-full border-2 border-[#0F172A]" style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                    {course.status}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

function CourseForm() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="mb-3">Course Form</h1>
      <p className="text-[#64748B] mb-8">Download and submit course registration forms</p>

      <Card className="border-4 border-[#0F172A] shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
        <CardHeader>
          <CardTitle>Available Forms</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {['Course Registration Form', 'Course Amendment Form', 'Add/Drop Form'].map((form, index) => (
            <motion.div
              key={form}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 border-2 border-[#0F172A] rounded-lg bg-[#F8F9FA] hover:shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] transition-all"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-[#F59E0B]" />
                <span style={{ fontFamily: 'var(--font-body)' }}>{form}</span>
              </div>
              <Button className="bg-[#0F172A] hover:bg-[#1E293B] text-white border-2 border-[#F59E0B] shadow-[2px_2px_0px_0px_rgba(245,158,11,1)]">
                Download
              </Button>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}

function DropCourses() {
  const droppableCourses = [
    { code: 'CS201', name: 'Software Engineering', credits: 4 },
    { code: 'CS202', name: 'Web Development', credits: 3 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="mb-3">Drop Courses</h1>
      <p className="text-[#64748B] mb-8">Remove courses from your current registration</p>

      <div className="grid gap-4">
        {droppableCourses.map((course, index) => (
          <motion.div
            key={course.code}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-2 border-[#EF4444] shadow-[4px_4px_0px_0px_rgba(239,68,68,1)] hover:shadow-[6px_6px_0px_0px_rgba(239,68,68,1)] transition-all">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <XCircle className="w-5 h-5 text-[#EF4444]" />
                      {course.code} - {course.name}
                    </CardTitle>
                    <CardDescription className="mt-2">
                      Credits: {course.credits}
                    </CardDescription>
                  </div>
                  <Button className="bg-[#EF4444] hover:bg-[#DC2626] text-white border-2 border-[#0F172A] shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                    Drop Course
                  </Button>
                </div>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function ExaminationDockets() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="mb-3">Examination Dockets</h1>
      <p className="text-[#64748B] mb-8">View and download your examination dockets</p>

      <Card className="border-4 border-[#0F172A] shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardList className="w-6 h-6 text-[#F59E0B]" />
            Current Semester Docket
          </CardTitle>
          <CardDescription>Semester 1, 2024/2025 Academic Year</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-6 border-2 border-[#0F172A] rounded-lg bg-[#F8F9FA]">
              <p className="mb-4" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>
                Your examination docket contains your exam schedule, seat numbers, and important instructions.
              </p>
              <Button className="bg-[#F59E0B] hover:bg-[#D97706] text-white border-2 border-[#0F172A] shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
                Download Docket
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
