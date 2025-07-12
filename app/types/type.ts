export interface Teacher {
  id: string;
  name: string;
  email: string;
  subject: string;
  grade: string;
  experience: number;
  avatar?: string;
  status: 'active' | 'on-leave' | 'inactive';
  classes: string[];
  performance: {
    rating: number;
    studentsCount: number;
    attendance: number;
  };
  payment: {
    salary: number;
    paymentStatus: 'paid' | 'pending' | 'overdue';
    lastPayment: string;
    paymentMethod: 'bank' | 'check' | 'digital';
    bonuses: number;
  };
}