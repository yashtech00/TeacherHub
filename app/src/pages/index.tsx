"use client"
import React, { useState } from 'react';
import { TeacherDashboard } from '../components/TeacherDashboard';
import { TeacherList } from '../components/TeacherList';
import { AddTeacherModal } from '../components/AddTeacherModal';
import { PaymentDashboard } from '../components/PaymentDashboard';
import { Navigation } from '../components/Navigation';
import { Search, Plus, Users, BarChart3, Calendar, Settings, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Teacher } from '@/app/types/type';



const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'teachers', label: 'Teachers', icon: Users },
    { id: 'payments', label: 'Payments', icon: CreditCard },
  ];

  const mockTeachers: Teacher[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@school.edu',
      subject: 'Mathematics',
      grade: '9-12',
      experience: 8,
      status: 'active',
      classes: ['Algebra II', 'Calculus', 'Statistics'],
      performance: {
        rating: 4.8,
        studentsCount: 145,
        attendance: 96
      },
      payment: {
        salary: 65000,
        paymentStatus: 'paid',
        lastPayment: '2024-01-01',
        paymentMethod: 'bank',
        bonuses: 2500
      }
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael.chen@school.edu',
      subject: 'Science',
      grade: '6-8',
      experience: 12,
      status: 'active',
      classes: ['Biology', 'Chemistry', 'Physics'],
      performance: {
        rating: 4.9,
        studentsCount: 120,
        attendance: 98
      },
      payment: {
        salary: 72000,
        paymentStatus: 'pending',
        lastPayment: '2023-12-01',
        paymentMethod: 'bank',
        bonuses: 3000
      }
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@school.edu',
      subject: 'English',
      grade: '9-11',
      experience: 6,
      status: 'on-leave',
      classes: ['Literature', 'Creative Writing'],
      performance: {
        rating: 4.7,
        studentsCount: 95,
        attendance: 94
      },
      payment: {
        salary: 58000,
        paymentStatus: 'overdue',
        lastPayment: '2023-11-15',
        paymentMethod: 'check',
        bonuses: 1800
      }
    }
  ];

  const [teachers, setTeachers] = useState<Teacher[]>(mockTeachers);

  const handleAddTeacher = (newTeacher: Omit<Teacher, 'id'>) => {
    const teacher: Teacher = {
      ...newTeacher,
      id: Date.now().toString(),
    };
    setTeachers(prev => [...prev, teacher]);
    setIsAddModalOpen(false);
  };

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    teacher.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="flex">
        <Navigation 
          items={navigationItems}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        
        <main className="flex-1 lg:ml-64">
          {/* Header */}
          <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-40">
            <div className="px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                <div className="flex-1 max-w-2xl">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Search teachers, subjects, or emails..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50/50 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all duration-200"
                    />
                  </div>
                </div>
                
                <Button
                  onClick={() => setIsAddModalOpen(true)}
                  className="ml-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
                >
                  <Plus className="h-5 w-5" />
                  <span className="hidden sm:inline">Add Teacher</span>
                </Button>
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="px-4 sm:px-6 lg:px-8 py-6">
            {activeTab === 'dashboard' && (
              <TeacherDashboard teachers={filteredTeachers} />
            )}
            
            {activeTab === 'teachers' && (
              <TeacherList 
                teachers={filteredTeachers}
                onEditTeacher={(teacher) => console.log('Edit:', teacher)}
                onDeleteTeacher={(id) => {
                  setTeachers(prev => prev.filter(t => t.id !== id));
                }}
              />
            )}

            {activeTab === 'payments' && (
              <PaymentDashboard teachers={filteredTeachers} />
            )}
            
            {activeTab === 'schedule' && (
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Schedule Management</h3>
                <p className="text-gray-600">Schedule management features coming soon...</p>
              </div>
            )}
            
            {activeTab === 'settings' && (
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                <Settings className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">System Settings</h3>
                <p className="text-gray-600">Settings panel coming soon...</p>
              </div>
            )}
          </div>
        </main>
      </div>

      <AddTeacherModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddTeacher}
      />
    </div>
  );
};

export default Index;
