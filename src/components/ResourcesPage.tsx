import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Search, Download, ExternalLink, FileText, Video, Link as LinkIcon, BookOpen, Filter, SortAsc } from 'lucide-react';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { motion } from 'framer-motion';
import SpotlightCard from './SpotlightCard';
import Dock from './Dock';

export function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const departments = [
    { id: 'all', name: 'All Departments', count: 247 },
    { id: 'academic', name: 'Academic Support', count: 45 },
    { id: 'career', name: 'Career Services', count: 38 },
    { id: 'wellness', name: 'Student Wellness', count: 52 },
    { id: 'financial', name: 'Financial Aid', count: 31 },
    { id: 'housing', name: 'Housing & Residence', count: 28 },
    { id: 'it', name: 'IT Services', count: 25 },
    { id: 'library', name: 'Library Services', count: 28 },
  ];

  const resources = [
    {
      title: 'Academic Writing Guide',
      department: 'Academic Support',
      type: 'PDF',
      downloads: 1243,
      description: 'Comprehensive guide covering essay structure, citations, and research methods',
      tags: ['Writing', 'Research', 'APA'],
      icon: FileText,
    },
    {
      title: 'Resume Templates 2024',
      department: 'Career Services',
      type: 'Download',
      downloads: 892,
      description: 'Professional resume templates for various industries and career levels',
      tags: ['Career', 'Resume', 'Templates'],
      icon: Download,
    },
    {
      title: 'Stress Management Workshop',
      department: 'Student Wellness',
      type: 'Video',
      downloads: 567,
      description: 'Recorded session on mindfulness techniques and stress reduction strategies',
      tags: ['Wellness', 'Mental Health', 'Workshop'],
      icon: Video,
    },
    {
      title: 'FAFSA Application Guide',
      department: 'Financial Aid',
      type: 'PDF',
      downloads: 1156,
      description: 'Step-by-step instructions for completing your financial aid application',
      tags: ['Financial Aid', 'FAFSA', 'Guide'],
      icon: FileText,
    },
    {
      title: 'Study Room Booking System',
      department: 'Library Services',
      type: 'Link',
      downloads: 2341,
      description: 'Reserve individual or group study rooms in the library',
      tags: ['Library', 'Study Space', 'Booking'],
      icon: LinkIcon,
    },
    {
      title: 'Time Management Strategies',
      department: 'Academic Support',
      type: 'PDF',
      downloads: 789,
      description: 'Effective techniques for balancing coursework, activities, and personal time',
      tags: ['Productivity', 'Study Skills', 'Planning'],
      icon: BookOpen,
    },
    {
      title: 'Campus WiFi Setup Guide',
      department: 'IT Services',
      type: 'PDF',
      downloads: 456,
      description: 'Instructions for connecting to the secure campus network',
      tags: ['Technology', 'WiFi', 'Setup'],
      icon: FileText,
    },
    {
      title: 'Interview Preparation Checklist',
      department: 'Career Services',
      type: 'Download',
      downloads: 634,
      description: 'Essential tips and common questions for job interview success',
      tags: ['Career', 'Interview', 'Preparation'],
      icon: Download,
    },
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || resource.department === departments.find(d => d.id === selectedCategory)?.name;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 pb-32">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1 className="mb-3">Resource Library</h1>
        <p className="opacity-70">Access guides, templates, and tools from all campus departments</p>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="bg-card border-4 border-primary p-6 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent" />
            <Input
              placeholder="Search resources by title, department, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 border-3 border-primary bg-input-background focus:border-accent focus:shadow-[4px_4px_0px_0px_rgba(6,182,212,1)] transition-all"
            />
          </div>
        </div>
      </motion.div>

      {/* Department Tabs */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="bg-secondary border-3 border-primary p-2 flex flex-wrap gap-2">
            {departments.map(dept => (
              <button
                key={dept.id}
                onClick={() => setSelectedCategory(dept.id)}
                className={`px-4 py-3 border-3 transition-all ${
                  selectedCategory === dept.id
                    ? 'bg-accent text-primary border-primary shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]'
                    : 'bg-card border-primary/30 hover:border-accent'
                }`}
                style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}
              >
                {dept.name}
                <span className="ml-2 px-2 py-1 bg-primary text-primary-foreground border-2 border-primary inline-block" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}>
                  {dept.count}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        <TabsContent value={selectedCategory} className="mt-8">
          <div className="grid gap-6 md:grid-cols-2">
            {filteredResources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.3 + index * 0.05,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                >
                  <SpotlightCard 
                    className="p-6 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(15,23,42,1)] transition-all h-full"
                    spotlightColor="rgba(245, 158, 11, 0.2)"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 bg-[#F59E0B] border-3 border-[#0F172A] flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="mb-2">{resource.title}</h3>
                          <p className="opacity-70" style={{ fontSize: '0.875rem' }}>{resource.department}</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-[#FEF3C7] border-2 border-[#F59E0B]" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' }}>
                        {resource.type}
                      </span>
                    </div>
                    
                    <p className="mb-5" style={{ fontSize: '0.9375rem', lineHeight: 1.6 }}>{resource.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-5">
                      {resource.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-[#FEF3C7] border-2 border-[#F59E0B] text-[#0F172A]" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 700 }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t-3 border-[#0F172A]">
                      <span className="opacity-70" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>
                        {resource.downloads.toLocaleString()} downloads
                      </span>
                      <button className="bg-[#0F172A] text-white border-3 border-[#0F172A] px-5 py-3 flex items-center gap-2 hover:translate-x-1 transition-all shadow-[4px_4px_0px_0px_rgba(245,158,11,1)] hover:shadow-[6px_6px_0px_0px_rgba(245,158,11,1)]" style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {resource.type === 'Link' ? (
                          <>
                            Open <ExternalLink className="w-4 h-4" />
                          </>
                        ) : (
                          <>
                            Download <Download className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </div>

          {filteredResources.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-card border-4 border-primary p-12 text-center shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
                <BookOpen className="w-16 h-16 mx-auto mb-6 opacity-30" />
                <h3 className="mb-3">No resources found</h3>
                <p className="opacity-70">Try adjusting your search or filter criteria</p>
              </div>
            </motion.div>
          )}
        </TabsContent>
      </Tabs>

      {/* Quick Filter Dock */}
      <Dock
        items={[
          {
            icon: <FileText className="w-6 h-6" />,
            label: 'PDFs Only',
            onClick: () => {
              // Filter to PDFs
              setSearchQuery('PDF');
            }
          },
          {
            icon: <Video className="w-6 h-6" />,
            label: 'Videos',
            onClick: () => {
              setSearchQuery('Video');
            }
          },
          {
            icon: <Download className="w-6 h-6" />,
            label: 'Downloads',
            onClick: () => {
              setSearchQuery('Download');
            }
          },
          {
            icon: <BookOpen className="w-6 h-6" />,
            label: 'Clear Filter',
            onClick: () => {
              setSearchQuery('');
              setSelectedCategory('all');
            }
          }
        ]}
        panelHeight={68}
        magnification={75}
      />
    </div>
  );
}