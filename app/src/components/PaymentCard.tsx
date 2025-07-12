
import React from 'react';
import { Teacher } from '@/app/types/type';
import { 
  CreditCard, 
  DollarSign, 
  Calendar, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Award
} from 'lucide-react';
import { Button } from '../components/ui/button';

interface PaymentCardProps {
  teacher: Teacher;
  onProcessPayment: () => void;
}

export const PaymentCard: React.FC<PaymentCardProps> = ({ teacher, onProcessPayment }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-50 text-green-700 border-green-200';
      case 'pending': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'overdue': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'overdue': return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const monthlySalary = Math.round(teacher.payment.salary / 12);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100/50">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-white font-semibold">
            {teacher.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{teacher.name}</h3>
            <p className="text-sm text-gray-600">{teacher.subject}</p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${getStatusColor(teacher.payment.paymentStatus)}`}>
          {getStatusIcon(teacher.payment.paymentStatus)}
          {teacher.payment.paymentStatus.charAt(0).toUpperCase() + teacher.payment.paymentStatus.slice(1)}
        </div>
      </div>

      {/* Payment Details */}
      <div className="space-y-4">
        {/* Salary */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-gray-700">Monthly Salary</span>
          </div>
          <span className="font-bold text-gray-900">${monthlySalary.toLocaleString()}</span>
        </div>

        {/* Bonuses */}
        {teacher.payment.bonuses > 0 && (
          <div className="flex items-center justify-between p-3 bg-purple-50 rounded-xl">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium text-gray-700">Bonuses</span>
            </div>
            <span className="font-bold text-purple-700">${teacher.payment.bonuses.toLocaleString()}</span>
          </div>
        )}

        {/* Payment Method */}
        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Payment Method</span>
          </div>
          <span className="font-medium text-blue-700 capitalize">{teacher.payment.paymentMethod}</span>
        </div>

        {/* Last Payment */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Last Payment</span>
          </div>
          <span className="font-medium text-gray-700">{formatDate(teacher.payment.lastPayment)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex gap-2">
        <Button
          onClick={onProcessPayment}
          className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
          disabled={teacher.payment.paymentStatus === 'paid'}
        >
          {teacher.payment.paymentStatus === 'paid' ? 'Payment Complete' : 'Process Payment'}
        </Button>
        
      </div>
    </div>
  );
};
