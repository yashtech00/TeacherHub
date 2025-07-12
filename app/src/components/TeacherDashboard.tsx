
import React from 'react';
import { Teacher } from '@/pages/Index';
import { Users, GraduationCap, TrendingUp, Clock, Star, Award, UserCheck, AlertCircle } from 'lucide-react';

interface TeacherDashboardProps {
  teachers: Teacher[];
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ teachers }) => {
  const totalTeachers = teachers.length;
  const activeTeachers = teachers.filter(t => t.status === 'active').length;
  const onLeaveTeachers = teachers.filter(t => t.status === 'on-leave').length;
  const avgRating = teachers.reduce((sum, t) => sum + t.performance.rating, 0) / teachers.length;
  const totalStudents = teachers.reduce((sum, t) => sum + t.performance.studentsCount, 0);
  const avgAttendance = teachers.reduce((sum, t) => sum + t.performance.attendance, 0) / teachers.length;

  const topPerformers = teachers
    .sort((a, b) => b.performance.rating - a.performance.rating)
    .slice(0, 3);

  const stats = [
    {
      label: 'Total Teachers',
      value: totalTeachers,
      icon: Users,
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
      change: '+2 this month'
    },
    {
      label: 'Active Teachers',
      value: activeTeachers,
      icon: UserCheck,
      color: 'bg-gradient-to-r from-green-500 to-green-600',
      change: `${Math.round((activeTeachers / totalTeachers) * 100)}% of total`
    },
    {
      label: 'Total Students',
      value: totalStudents,
      icon: GraduationCap,
      color: 'bg-gradient-to-r from-purple-500 to-purple-600',
      change: '+15 this semester'
    },
    {
      label: 'Avg Rating',
      value: avgRating.toFixed(1),
      icon: Star,
      color: 'bg-gradient-to-r from-yellow-500 to-orange-500',
      change: 'Excellent performance'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl p-8 text-white shadow-2xl">
        <h1 className="text-3xl font-bold mb-2">Teacher Management Dashboard</h1>
        <p className="text-blue-100 text-lg">
          Overview of your educational team and performance metrics
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100/50"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-xl shadow-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-green-600 font-medium">{stat.change}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Performers */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-2 rounded-lg">
              <Award className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Top Performers</h3>
          </div>
          
          <div className="space-y-4">
            {topPerformers.map((teacher, index) => (
              <div
                key={teacher.id}
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-xl border border-gray-100/50"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {teacher.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {teacher.name}
                  </p>
                  <p className="text-xs text-gray-600">{teacher.subject}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-semibold text-gray-900">
                    {teacher.performance.rating}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Status Overview */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-r from-green-500 to-teal-500 p-2 rounded-lg">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Status Overview</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-100">
              <div className="flex items-center gap-3">
                <UserCheck className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-900">Active Teachers</span>
              </div>
              <span className="text-2xl font-bold text-green-600">{activeTeachers}</span>
            </div>
            
            {onLeaveTeachers > 0 && (
              <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-xl border border-yellow-100">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-yellow-600" />
                  <span className="font-medium text-yellow-900">On Leave</span>
                </div>
                <span className="text-2xl font-bold text-yellow-600">{onLeaveTeachers}</span>
              </div>
            )}
            
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-100">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-900">Avg Attendance</span>
              </div>
              <span className="text-2xl font-bold text-blue-600">{avgAttendance.toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
