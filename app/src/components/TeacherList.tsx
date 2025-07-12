
import React from 'react';
import { Teacher } from '@/pages/Index';
import { Mail, Users, Star, MoreVertical, Edit3, Trash2, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TeacherListProps {
  teachers: Teacher[];
  onEditTeacher: (teacher: Teacher) => void;
  onDeleteTeacher: (id: string) => void;
}

export const TeacherList: React.FC<TeacherListProps> = ({ 
  teachers, 
  onEditTeacher, 
  onDeleteTeacher 
}) => {
  const getStatusColor = (status: Teacher['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'on-leave':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'inactive':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: Teacher['status']) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'on-leave':
        return 'On Leave';
      case 'inactive':
        return 'Inactive';
      default:
        return 'Unknown';
    }
  };

  if (teachers.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
        <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No teachers found</h3>
        <p className="text-gray-600">Try adjusting your search criteria or add a new teacher.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Teachers Directory</h2>
        <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
          {teachers.length} teacher{teachers.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {teachers.map((teacher) => (
          <div
            key={teacher.id}
            className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100/50 overflow-hidden"
          >
            {/* Card Header */}
            <div className="p-6 pb-0">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-lg">
                    {teacher.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{teacher.name}</h3>
                    <div className={cn(
                      "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border",
                      getStatusColor(teacher.status)
                    )}>
                      {getStatusText(teacher.status)}
                    </div>
                  </div>
                </div>
                
                <div className="relative group/menu">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Subject & Grade */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">{teacher.subject}</span>
                  <span className="text-xs text-gray-500">• Grade {teacher.grade}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>{teacher.experience} years experience</span>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="px-6 pb-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-semibold text-gray-900">
                      {teacher.performance.rating}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">Rating</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Users className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-semibold text-gray-900">
                      {teacher.performance.studentsCount}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">Students</p>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-gray-900 mb-1">
                    {teacher.performance.attendance}%
                  </div>
                  <p className="text-xs text-gray-500">Attendance</p>
                </div>
              </div>
            </div>

            {/* Classes */}
            <div className="px-6 pb-4">
              <div className="flex flex-wrap gap-2">
                {teacher.classes.slice(0, 2).map((className, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-medium border border-blue-100"
                  >
                    {className}
                  </span>
                ))}
                {teacher.classes.length > 2 && (
                  <span className="inline-flex items-center px-2 py-1 rounded-md bg-gray-50 text-gray-600 text-xs font-medium border border-gray-100">
                    +{teacher.classes.length - 2} more
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="px-6 pb-6 pt-2 border-t border-gray-50">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                  onClick={() => window.open(`mailto:${teacher.email}`)}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Contact
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1 text-gray-600 hover:text-green-600 hover:bg-green-50"
                  onClick={() => onEditTeacher(teacher)}
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-red-600 hover:bg-red-50"
                  onClick={() => onDeleteTeacher(teacher.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
