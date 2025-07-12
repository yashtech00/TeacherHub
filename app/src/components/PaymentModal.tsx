
import React, { useState } from 'react';
import { Teacher } from '@/pages/Index';
import { 
  X, 
  CreditCard, 
  DollarSign, 
  Calendar, 
  User,
  Check,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  teacher: Teacher | null;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, teacher }) => {
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'bank' | 'check' | 'digital'>('bank');
  const [paymentType, setPaymentType] = useState<'salary' | 'bonus'>('salary');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  React.useEffect(() => {
    if (teacher && isOpen) {
      const defaultAmount = paymentType === 'salary' 
        ? Math.round(teacher.payment.salary / 12)
        : 0;
      setPaymentAmount(defaultAmount.toString());
      setPaymentMethod(teacher.payment.paymentMethod);
      setIsSuccess(false);
    }
  }, [teacher, isOpen, paymentType]);

  const handleProcessPayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setIsSuccess(true);
    
    // Auto close after success
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2000);
  };

  if (!isOpen || !teacher) return null;

  if (isSuccess) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Payment Successful!</h3>
          <p className="text-gray-600">
            ${paymentAmount} has been processed for {teacher.name}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Process Payment</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Teacher Info */}
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-white font-semibold">
              {teacher.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{teacher.name}</h3>
              <p className="text-sm text-gray-600">{teacher.subject} • {teacher.grade}</p>
            </div>
          </div>

          {/* Payment Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setPaymentType('salary')}
                className={`p-3 rounded-xl border-2 transition-all ${
                  paymentType === 'salary'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <DollarSign className="h-5 w-5 mx-auto mb-1" />
                <span className="text-sm font-medium">Salary</span>
              </button>
              <button
                onClick={() => setPaymentType('bonus')}
                className={`p-3 rounded-xl border-2 transition-all ${
                  paymentType === 'bonus'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <User className="h-5 w-5 mx-auto mb-1" />
                <span className="text-sm font-medium">Bonus</span>
              </button>
            </div>
          </div>

          {/* Payment Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Amount
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="number"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                className="pl-10"
                placeholder="Enter amount"
              />
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Method
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value as typeof paymentMethod)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300"
            >
              <option value="bank">Bank Transfer</option>
              <option value="check">Check</option>
              <option value="digital">Digital Wallet</option>
            </select>
          </div>

          {/* Payment Summary */}
          <div className="bg-blue-50 rounded-xl p-4">
            <h4 className="font-medium text-blue-900 mb-3">Payment Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-blue-700">Recipient:</span>
                <span className="font-medium text-blue-900">{teacher.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Type:</span>
                <span className="font-medium text-blue-900 capitalize">{paymentType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Method:</span>
                <span className="font-medium text-blue-900 capitalize">{paymentMethod}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold">
                <span className="text-blue-700">Total:</span>
                <span className="text-blue-900">${Number(paymentAmount).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
            disabled={isProcessing}
          >
            Cancel
          </Button>
          <Button
            onClick={handleProcessPayment}
            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
            disabled={isProcessing || !paymentAmount}
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing...
              </div>
            ) : (
              'Process Payment'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
