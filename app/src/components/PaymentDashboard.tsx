
import React, { useState } from 'react';
import { Teacher } from '@/pages/Index';
import { PaymentCard } from '@/components/PaymentCard';
import { PaymentHistory } from '@/components/PaymentHistory';
import { PaymentModal } from '@/components/PaymentModal';
import { 
  CreditCard, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle, 
  Users, 
  Calendar,
  Filter,
  Download,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PaymentDashboardProps {
  teachers: Teacher[];
}

export const PaymentDashboard: React.FC<PaymentDashboardProps> = ({ teachers }) => {
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'all' | 'paid' | 'pending' | 'overdue'>('all');

  // Calculate payment statistics
  const totalSalaries = teachers.reduce((sum, t) => sum + t.payment.salary, 0);
  const totalBonuses = teachers.reduce((sum, t) => sum + t.payment.bonuses, 0);
  const paidTeachers = teachers.filter(t => t.payment.paymentStatus === 'paid').length;
  const pendingPayments = teachers.filter(t => t.payment.paymentStatus === 'pending').length;
  const overduePayments = teachers.filter(t => t.payment.paymentStatus === 'overdue').length;

  const stats = [
    {
      label: 'Total Monthly Payroll',
      value: `$${(totalSalaries / 12).toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-gradient-to-r from-green-500 to-emerald-600',
      change: '+2.5% from last month'
    },
    {
      label: 'Pending Payments',
      value: pendingPayments,
      icon: Clock,
      color: 'bg-gradient-to-r from-yellow-500 to-orange-500',
      change: `${pendingPayments} teachers awaiting payment`
    },
    {
      label: 'Overdue Payments',
      value: overduePayments,
      icon: AlertTriangle,
      color: 'bg-gradient-to-r from-red-500 to-pink-600',
      change: overduePayments > 0 ? 'Requires immediate attention' : 'All payments current'
    },
    {
      label: 'Total Bonuses',
      value: `$${totalBonuses.toLocaleString()}`,
      icon: TrendingUp,
      color: 'bg-gradient-to-r from-purple-500 to-indigo-600',
      change: 'Performance bonuses this year'
    }
  ];

  const filteredTeachers = teachers.filter(teacher => {
    if (filterStatus === 'all') return true;
    return teacher.payment.paymentStatus === filterStatus;
  });

  const handleProcessPayment = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setIsPaymentModalOpen(true);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl p-8 text-white shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Payment Management</h1>
            <p className="text-blue-100 text-lg">
              Manage teacher salaries, bonuses, and payment schedules
            </p>
          </div>
          <div className="flex gap-3 mt-4 sm:mt-0">
            <Button 
              variant="secondary"
              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button 
              variant="secondary"
              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Payments
            </Button>
          </div>
        </div>
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

      {/* Filters and Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex gap-2">
          {(['all', 'paid', 'pending', 'overdue'] as const).map((status) => (
            <Button
              key={status}
              variant={filterStatus === status ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus(status)}
              className={`capitalize ${
                filterStatus === status 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {status === 'all' ? 'All Teachers' : `${status} (${teachers.filter(t => t.payment.paymentStatus === status).length})`}
            </Button>
          ))}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>
      </div>

      {/* Payment Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTeachers.map((teacher) => (
          <PaymentCard
            key={teacher.id}
            teacher={teacher}
            onProcessPayment={() => handleProcessPayment(teacher)}
          />
        ))}
      </div>

      {/* Payment History */}
      <PaymentHistory teachers={teachers} />

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => {
          setIsPaymentModalOpen(false);
          setSelectedTeacher(null);
        }}
        teacher={selectedTeacher}
      />
    </div>
  );
};
