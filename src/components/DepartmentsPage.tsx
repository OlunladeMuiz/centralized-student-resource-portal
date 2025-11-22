import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Search, Mail, Phone, MapPin, Clock, Users, ExternalLink } from 'lucide-react';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

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
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-900 mb-2">Department Directory</h1>
        <p className="text-gray-600">Find contact information and services for all campus departments</p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search departments by name or service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Departments Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {filteredDepartments.map((dept, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="mb-2">{dept.name}</CardTitle>
                  <CardDescription>{dept.description}</CardDescription>
                </div>
                <Badge variant={dept.available ? 'default' : 'secondary'}>
                  {dept.available ? 'Available' : 'Closed'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Contact Information */}
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Mail className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                  <a href={`mailto:${dept.contact}`} className="text-blue-600 hover:underline">
                    {dept.contact}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  <span className="text-gray-700">{dept.phone}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{dept.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  <span className="text-gray-700">{dept.hours}</span>
                </div>
              </div>

              {/* Services */}
              <div>
                <h4 className="text-gray-900 mb-2">Services Offered</h4>
                <div className="flex flex-wrap gap-2">
                  {dept.services.map(service => (
                    <Badge key={service} variant="secondary">{service}</Badge>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>{dept.staff} staff members</span>
                </div>
                <span className="text-gray-600">Response: {dept.responseTime}</span>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button className="flex-1 gap-2">
                  <Mail className="w-4 h-4" />
                  Contact
                </Button>
                <Button variant="outline" className="flex-1 gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Visit Page
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDepartments.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-gray-900 mb-2">No departments found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
