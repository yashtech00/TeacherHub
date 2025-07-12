
import React, { useState } from 'react';
import { Teacher } from '@/pages/Index';
import { X, User, Mail, BookOpen, GraduationCap, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AddTeacherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (teacher: Omit<Teacher, 'id'>) => void;
}

export const AddTeacherModal: React.FC<AddTeacherModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    grade: '',
    experience: 0,
    status: 'active' as Teacher['status'],
    classes: [] as string[],
    performance: {
      rating: 4.5,
      studentsCount: 0,
      attendance: 95,
    },
    payment: {
      salary: 50000,
      paymentStatus: 'pending' as const,
      lastPayment: new Date().toISOString().split('T')[0],
      paymentMethod: 'bank' as const,
      bonuses: 0,
    },
  });

  const [currentClass, setCurrentClass] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.grade.trim()) {
      newErrors.grade = 'Grade is required';
    }

    if (formData.experience < 0) {
      newErrors.experience = 'Experience must be a positive number';
    }

    if (formData.performance.studentsCount < 0) {
      newErrors.studentsCount = 'Student count must be a positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        grade: '',
        experience: 0,
        status: 'active',
        classes: [],
        performance: {
          rating: 4.5,
          studentsCount: 0,
          attendance: 95,
        },
        payment: {
          salary: 50000,
          paymentStatus: 'pending',
          lastPayment: new Date().toISOString().split('T')[0],
          paymentMethod: 'bank',
          bonuses: 0,
        },
      });
      setCurrentClass('');
      setErrors({});
    }
  };

  const addClass = () => {
    if (currentClass.trim() && !formData.classes.includes(currentClass.trim())) {
      setFormData(prev => ({
        ...prev,
        classes: [...prev.classes, currentClass.trim()]
      }));
      setCurrentClass('');
    }
  };

  const removeClass = (classToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      classes: prev.classes.filter(c => c !== classToRemove)
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Add New Teacher</h2>
              <p className="text-sm text-gray-600">Fill in the information below</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
              <User className="h-5 w-5 text-blue-500" />
              Basic Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all duration-200"
                  placeholder="Enter full name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all duration-200"
                  placeholder="teacher@school.edu"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-green-500" />
              Academic Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all duration-200"
                  placeholder="Mathematics"
                />
                {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Grade Level *
                </label>
                <input
                  type="text"
                  value={formData.grade}
                  onChange={(e) => setFormData(prev => ({ ...prev, grade: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all duration-200"
                  placeholder="9-12"
                />
                {errors.grade && <p className="text-red-500 text-sm mt-1">{errors.grade}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience (Years)
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.experience}
                  onChange={(e) => setFormData(prev => ({ ...prev, experience: parseInt(e.target.value) || 0 }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all duration-200"
                  placeholder="5"
                />
                {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
              </div>
            </div>
          </div>

          {/* Classes */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-purple-500" />
              Classes
            </h3>
            
            <div className="flex gap-2">
              <input
                type="text"
                value={currentClass}
                onChange={(e) => setCurrentClass(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all duration-200"
                placeholder="Add a class (e.g., Algebra II)"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addClass())}
              />
              <Button
                type="button"
                onClick={addClass}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors duration-200"
              >
                Add
              </Button>
            </div>

            {formData.classes.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.classes.map((className, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm border border-blue-100"
                  >
                    {className}
                    <button
                      type="button"
                      onClick={() => removeClass(className)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Performance Metrics */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
              <Users className="h-5 w-5 text-orange-500" />
              Initial Performance Data
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Students
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.performance.studentsCount}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    performance: {
                      ...prev.performance,
                      studentsCount: parseInt(e.target.value) || 0
                    }
                  }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all duration-200"
                  placeholder="30"
                />
                {errors.studentsCount && <p className="text-red-500 text-sm mt-1">{errors.studentsCount}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as Teacher['status'] }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all duration-200"
                >
                  <option value="active">Active</option>
                  <option value="on-leave">On Leave</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-xl transition-colors duration-200"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Add Teacher
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
