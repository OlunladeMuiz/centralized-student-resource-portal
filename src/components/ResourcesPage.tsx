import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Search, Download, ExternalLink, FileText, Video, Link as LinkIcon, BookOpen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

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
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-900 mb-2">Resource Library</h1>
        <p className="text-gray-600">Access guides, templates, and tools from all campus departments</p>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search resources by title, department, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Department Tabs */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="w-full justify-start flex-wrap h-auto gap-2">
          {departments.map(dept => (
            <TabsTrigger key={dept.id} value={dept.id} className="gap-2">
              {dept.name}
              <Badge variant="secondary">{dept.count}</Badge>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedCategory} className="mt-6">
          <div className="grid gap-4 md:grid-cols-2">
            {filteredResources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="mb-1">{resource.title}</CardTitle>
                          <CardDescription>{resource.department}</CardDescription>
                        </div>
                      </div>
                      <Badge variant="outline">{resource.type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{resource.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {resource.tags.map(tag => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">{resource.downloads.toLocaleString()} downloads</span>
                      <Button className="gap-2">
                        {resource.type === 'Link' ? (
                          <>
                            Open <ExternalLink className="w-4 h-4" />
                          </>
                        ) : (
                          <>
                            Download <Download className="w-4 h-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredResources.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-gray-900 mb-2">No resources found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
