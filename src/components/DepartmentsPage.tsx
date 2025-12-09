import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Search, Mail, Phone, MapPin, Clock, Users, ExternalLink } from 'lucide-react';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import SpotlightCard from './SpotlightCard';

export function DepartmentsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const departments = [
    {
      name: 'Academic Support',
      description: 'Tutoring, study skills, and academic advising services',
      contact: 'academic@university.edu',
      phone: '(555) 123-4501',
      location: 'Building A, Room 201',
      hours: 'Mon-Fri: 8am-6pm',
      services: ['Tutoring', 'Writing Center', 'Study Groups', 'Academic Advising'],
      staff: 12,
      responseTime: '24 hours',
      available: true,
    },
    {
      name: 'Career Services',
      description: 'Career counseling, resume reviews, and job placement assistance',
      contact: 'careers@university.edu',
      phone: '(555) 123-4502',
      location: 'Building B, Room 105',
      hours: 'Mon-Fri: 9am-5pm',
      services: ['Resume Reviews', 'Mock Interviews', 'Job Board', 'Career Fairs'],
      staff: 8,
      responseTime: '48 hours',
      available: true,
    },
    {
      name: 'Student Wellness',
      description: 'Mental health, counseling, and wellness programs',
      contact: 'wellness@university.edu',
      phone: '(555) 123-4503',
      location: 'Health Center, 2nd Floor',
      hours: 'Mon-Fri: 8am-8pm, Sat: 10am-4pm',
      services: ['Counseling', 'Workshops', 'Crisis Support', 'Wellness Programs'],
      staff: 15,
      responseTime: '12 hours',
      available: true,
    },
    {
      name: 'Financial Aid',
      description: 'Scholarships, grants, loans, and financial planning',
      contact: 'finaid@university.edu',
      phone: '(555) 123-4504',
      location: 'Administration Building, Room 110',
      hours: 'Mon-Fri: 8am-4pm',
      services: ['FAFSA Help', 'Scholarships', 'Loan Counseling', 'Emergency Aid'],
      staff: 10,
      responseTime: '48 hours',
      available: true,
    },
    {
      name: 'Housing & Residence',
      description: 'On-campus housing, roommate matching, and residential life',
      contact: 'housing@university.edu',
      phone: '(555) 123-4505',
      location: 'Residence Hall Office',
      hours: 'Mon-Fri: 9am-5pm',
      services: ['Room Assignments', 'Maintenance', 'Community Programs', 'Move-in Support'],
      staff: 20,
      responseTime: '24 hours',
      available: true,
    },
    {
      name: 'IT Services',
      description: 'Technical support, software access, and network services',
      contact: 'helpdesk@university.edu',
      phone: '(555) 123-4506',
      location: 'Technology Center',
      hours: '24/7 Support Available',
      services: ['Help Desk', 'Software Access', 'WiFi Support', 'Email Services'],
      staff: 18,
      responseTime: '4 hours',
      available: true,
    },
    {
      name: 'Library Services',
      description: 'Research assistance, study spaces, and resource access',
      contact: 'library@university.edu',
      phone: '(555) 123-4507',
      location: 'Main Library',
      hours: 'Mon-Thu: 7am-12am, Fri-Sun: 8am-10pm',
      services: ['Research Help', 'Study Rooms', 'Inter-library Loan', 'Archives'],
      staff: 25,
      responseTime: '24 hours',
      available: true,
    },
    {
      name: 'Student Activities',
      description: 'Clubs, organizations, events, and campus engagement',
      contact: 'activities@university.edu',
      phone: '(555) 123-4508',
      location: 'Student Union, 3rd Floor',
      hours: 'Mon-Fri: 9am-6pm',
      services: ['Club Registration', 'Event Planning', 'Leadership Programs', 'Campus Events'],
      staff: 6,
      responseTime: '48 hours',
      available: true,
    },
  ];

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dept.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dept.services.some(service => service.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6 sm:space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1 className="mb-2 sm:mb-3 text-2xl sm:text-4xl">Department Directory</h1>
        <p className="opacity-70 text-sm sm:text-base">Find contact information and services for all campus departments</p>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="bg-card border-3 sm:border-4 border-primary p-4 sm:p-6 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] sm:shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
          <div className="relative">
            <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-accent" />
            <Input
              placeholder="Search departments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 sm:pl-12 h-11 sm:h-14 border-2 sm:border-3 border-primary bg-input-background focus:border-accent focus:shadow-[2px_2px_0px_0px_rgba(6,255,165,1)] sm:focus:shadow-[4px_4px_0px_0px_rgba(6,255,165,1)] transition-all text-sm sm:text-base"
            />
          </div>
        </div>
      </motion.div>

      {/* Departments Grid */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
        {filteredDepartments.map((dept, index) => {
          const colorSchemes = [
            { bg: 'bg-[#0F172A]', border: 'border-[#0F172A]', shadow: 'shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]', hover: 'hover:shadow-[12px_12px_0px_0px_rgba(15,23,42,1)]' },
            { bg: 'bg-[#F59E0B]', border: 'border-[#F59E0B]', shadow: 'shadow-[8px_8px_0px_0px_rgba(245,158,11,1)]', hover: 'hover:shadow-[12px_12px_0px_0px_rgba(245,158,11,1)]' },
            { bg: 'bg-[#1E293B]', border: 'border-[#1E293B]', shadow: 'shadow-[8px_8px_0px_0px_rgba(30,41,59,1)]', hover: 'hover:shadow-[12px_12px_0px_0px_rgba(30,41,59,1)]' },
            { bg: 'bg-[#0F172A]', border: 'border-[#0F172A]', shadow: 'shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]', hover: 'hover:shadow-[12px_12px_0px_0px_rgba(15,23,42,1)]' },
            { bg: 'bg-[#F59E0B]', border: 'border-[#F59E0B]', shadow: 'shadow-[8px_8px_0px_0px_rgba(245,158,11,1)]', hover: 'hover:shadow-[12px_12px_0px_0px_rgba(245,158,11,1)]' },
          ];
          const scheme = colorSchemes[index % colorSchemes.length];
          
          return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5, 
              delay: 0.2 + index * 0.05,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            <SpotlightCard 
              className={`p-0 ${scheme.shadow} ${scheme.hover} hover:translate-y-[-2px] sm:hover:translate-y-[-4px] transition-all h-full`}
              spotlightColor="rgba(245, 158, 11, 0.2)"
            >
              <div className={`${scheme.bg} border-b-2 sm:border-b-4 ${scheme.border} p-4 sm:p-6`}>
                <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4">
                  <div className="flex-1">
                    <h3 className="mb-1 sm:mb-2 text-white text-lg sm:text-xl line-clamp-2">{dept.name}</h3>
                    <p className="text-white/90 text-xs sm:text-sm" style={{ fontSize: 'clamp(0.875rem, 1.5vw, 0.9375rem)', fontFamily: 'var(--font-body)' }}>{dept.description}</p>
                  </div>
                  <span className={`px-2 sm:px-3 py-1 bg-white ${scheme.border} border border-sm:border-3 text-[#0F172A] text-xs sm:text-sm flex-shrink-0`} style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.65rem, 1.5vw, 0.7rem)', fontWeight: 700, textTransform: 'uppercase' }}>
                    {dept.available ? 'Available' : 'Closed'}
                  </span>
                </div>
              </div>
              <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
                {/* Contact Information */}
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <Mail className="w-4 sm:w-5 h-4 sm:h-5 text-[#F59E0B] mt-1 flex-shrink-0" />
                    <a href={`mailto:${dept.contact}`} className="text-[#F59E0B] hover:underline text-xs sm:text-sm break-all" style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)' }}>
                      {dept.contact}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Phone className="w-4 sm:w-5 h-4 sm:h-5 text-[#64748B] flex-shrink-0" />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)' }}>{dept.phone}</span>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-3">
                    <MapPin className="w-4 sm:w-5 h-4 sm:h-5 text-[#64748B] mt-1 flex-shrink-0" />
                    <span style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)' }}>{dept.location}</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Clock className="w-4 sm:w-5 h-4 sm:h-5 text-[#64748B] flex-shrink-0" />
                    <span style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)' }}>{dept.hours}</span>
                  </div>
                </div>

                {/* Services */}
                <div className="pt-2 sm:pt-3">
                  <h4 className="mb-2 sm:mb-3 text-xs sm:text-sm" style={{ textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>Services Offered</h4>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {dept.services.map(service => (
                      <span 
                        key={service} 
                        className="px-2 sm:px-3 py-1 bg-[#FEF3C7] border border-sm:border-2 border-[#F59E0B] text-[#0F172A] text-xs sm:text-sm"
                        style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.65rem, 1.5vw, 0.7rem)', fontWeight: 700 }}
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between pt-4 border-t-3 border-[#0F172A]">
                  <div className="flex items-center gap-2 opacity-70">
                    <Users className="w-4 h-4" />
                    <span style={{ fontFamily: 'var(--font-mono)' }}>{dept.staff} staff</span>
                  </div>
                  <span className="opacity-70" style={{ fontFamily: 'var(--font-mono)' }}>Response: {dept.responseTime}</span>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <button className={`flex-1 ${scheme.bg} text-white border-3 ${scheme.border} px-5 py-3 flex items-center justify-center gap-2 hover:translate-x-1 transition-all shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]`} style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    <Mail className="w-4 h-4" />
                    Contact
                  </button>
                  <button className="flex-1 bg-[#FAFAF9] border-3 border-[#0F172A] px-5 py-3 flex items-center justify-center gap-2 hover:translate-x-1 transition-all shadow-[4px_4px_0px_0px_rgba(245,158,11,1)] hover:shadow-[6px_6px_0px_0px_rgba(245,158,11,1)]" style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    <ExternalLink className="w-4 h-4" />
                    Visit
                  </button>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        );
        })}
      </div>

      {filteredDepartments.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-card border-4 border-primary p-12 text-center shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
            <Search className="w-16 h-16 mx-auto mb-6 opacity-30" />
            <h3 className="mb-3">No departments found</h3>
            <p className="opacity-70">Try adjusting your search criteria</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}