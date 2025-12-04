export enum SubscriptionStatus {
  ACTIVE = 'Active',
  PAUSED = 'Paused',
  STOPPED = 'Stopped'
}

export enum PaymentStatus {
  PAID = 'Paid',
  PENDING = 'Pending',
  OVERDUE = 'Overdue'
}

export enum DeliveryStatus {
  PENDING = 'Pending',
  OUT_FOR_DELIVERY = 'Out for Delivery',
  DELIVERED = 'Delivered',
  SKIPPED = 'Skipped',
  FAILED = 'Failed'
}

export interface Plan {
  id: string;
  name: string;
  type: 'Monthly' | 'Weekly' | 'Custom';
  price: number;
  mealsPerWeek: number;
  description: string; // e.g., "Full Thali - No Onion/Garlic option"
  isActive: boolean;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  area: string;
  address: string;
  planId: string;
  status: SubscriptionStatus;
  nextBillingDate: string;
  dueAmount: number;
  notes?: string;
}

export type AttendanceStatus = 'Present' | 'Absent';

export interface AttendanceRecord {
  date: string; // YYYY-MM-DD
  status: AttendanceStatus;
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  vehicleNo: string;
  assignedArea: string;
  isActive: boolean;
  attendance: {
    present: number; // days present this month
    totalDays: number; // working days passed
  };
  attendanceLog: AttendanceRecord[];
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  area: string;
  address: string;
  driverId: string | null;
  planName: string;
  status: DeliveryStatus;
  date: string;
  note?: string;
}

export interface Transaction {
  id: string;
  customerId: string;
  customerName: string;
  amount: number;
  date: string;
  mode: 'UPI' | 'Cash' | 'Bank Transfer';
  status: PaymentStatus;
}

export interface DriverSalary {
  driverId: string;
  driverName: string;
  month: string;
  daysWorked: number;
  totalDeliveries: number;
  baseSalary: number;
  incentives: number;
  deductions: number;
  netPayable: number;
  status: 'Paid' | 'Pending';
  payoutDate?: string;
}