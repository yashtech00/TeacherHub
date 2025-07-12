
import React, { useState } from 'react';
import { Teacher } from '@/pages/Index';
import { 
  Calendar, 
  Download, 
  Filter, 
  Search,
  ChevronDown,
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PaymentHistoryProps {
  teachers: Teacher[];
}

export const PaymentHistory: React.FC<PaymentHistoryProps> = ({ teachers }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'amount' | 'name'>('date');

  // Mock payment history data
  const paymentHistory = teachers.flatMap(teacher => [
    {
      id: `${teacher.id}-1`,
      teacherName: teacher.name,
      amount: Math.round(teacher.payment.salary / 12),
      date: teacher.payment.lastPayment,
      status: teacher.payment.paymentStatus,
      type: 'salary',
      paymentMethod: teacher.payment.paymentMethod,
    },
    ...(teacher.payment.bonuses > 0 ? [{
      id: `${teacher.id}-bonus`,
      teacherName: teacher.name,
      amount: teacher.payment.bonuses,
      date: '2023-12-15',
      status: 'paid' as const,
      type: 'bonus',
      paymentMethod: teacher.payment.paymentMethod,
    }] : [])
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'overdue': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredHistory = paymentHistory
    .filter(payment => 
      payment.teacherName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'date': return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'amount': return b.amount - a.amount;
        case 'name': return a.teacherName.localeCompare(b.teacherName);
        default: return 0;
      }
    });

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100/50">
      {/* Header */}
      <div className="p-6 border-b border-gray-200/50">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Payment History</h3>
            <p className="text-gray-600 mt-1">Track all salary and bonus payments</p>
          </div>
          
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search payments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 text-sm"
              />
            </div>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 text-sm"
            >
              <option value="date">Sort by Date</option>
              <option value="amount">Sort by Amount</option>
              <option value="name">Sort by Name</option>
            </select>
            
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Payment List */}
      <div className="overflow-hidden">
        <div className="max-h-96 overflow-y-auto">
          {filteredHistory.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No payment history found</p>
            </div>
          ) : (
            <div className="space-y-0">
              {filteredHistory.map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between p-4 hover:bg-gray-50/50 transition-colors border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(payment.status)}
                    </div>
                    
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3">
                        <p className="font-medium text-gray-900">{payment.teacherName}</p>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                          {payment.status}
                        </span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium capitalize">
                          {payment.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                        <span>{new Date(payment.date).toLocaleDateString()}</span>
                        <span className="capitalize">{payment.paymentMethod}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-bold text-gray-900">${payment.amount.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
