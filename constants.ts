import { Customer, Driver, Order, Plan, SubscriptionStatus, DeliveryStatus, Transaction, DriverSalary, PaymentStatus } from './types';

export const HYDERABAD_AREAS = [
  'Gachibowli',
  'Madhapur',
  'Kukatpally',
  'Jubilee Hills',
  'Banjara Hills',
  'Kondapur',
  'Manikonda'
];

export const PLANS: Plan[] = [
  {
    id: 'P001',
    name: 'Standard Brahmin Thali',
    type: 'Monthly',
    price: 3500,
    mealsPerWeek: 6,
    description: 'Rice, Dal, Fry, Sambhar, Curd (Pure Veg)',
    isActive: true
  },
  {
    id: 'P002',
    name: 'Premium Vantillu Special',
    type: 'Monthly',
    price: 4500,
    mealsPerWeek: 6,
    description: 'Standard + Sweet + Roti + Special Curry',
    isActive: true
  },
  {
    id: 'P003',
    name: 'Millet Health Box',
    type: 'Weekly',
    price: 1200,
    mealsPerWeek: 5,
    description: 'Millet Rice, Leafy Curry, Buttermilk',
    isActive: true
  }
];

export const CUSTOMERS: Customer[] = [
  {
    id: 'C1001',
    name: 'Srinivas Rao',
    phone: '9876543210',
    area: 'Kukatpally',
    address: 'Flat 302, Sai Residency, KPHB Phase 1',
    planId: 'P001',
    status: SubscriptionStatus.ACTIVE,
    nextBillingDate: '2023-11-01',
    dueAmount: 0,
    notes: 'No Garlic on Saturdays'
  },
  {
    id: 'C1002',
    name: 'Lakshmi Priya',
    phone: '9898989898',
    area: 'Gachibowli',
    address: 'Villa 45, My Home Avatar',
    planId: 'P002',
    status: SubscriptionStatus.ACTIVE,
    nextBillingDate: '2023-11-05',
    dueAmount: 4500,
    notes: 'Deliver before 12:30 PM'
  },
  {
    id: 'C1003',
    name: 'Venkatesh Iyer',
    phone: '9123456789',
    area: 'Madhapur',
    address: 'H.No 1-98, Ayyappa Society',
    planId: 'P001',
    status: SubscriptionStatus.PAUSED,
    nextBillingDate: '2023-11-10',
    dueAmount: 0,
    notes: 'Out of station till 30th'
  },
  {
    id: 'C1004',
    name: 'Ananya Reddy',
    phone: '8887776665',
    area: 'Jubilee Hills',
    address: 'Plot 55, Road No 10',
    planId: 'P003',
    status: SubscriptionStatus.ACTIVE,
    nextBillingDate: '2023-10-28',
    dueAmount: 1200,
    notes: ''
  }
];

export const DRIVERS: Driver[] = [
  {
    id: 'D001',
    name: 'Ramesh Kumar',
    phone: '7778889991',
    vehicleNo: 'TS07 HK 1234',
    assignedArea: 'Kukatpally',
    isActive: true,
    attendance: { present: 22, totalDays: 24 },
    attendanceLog: []
  },
  {
    id: 'D002',
    name: 'Mallesh Yadav',
    phone: '6665554443',
    vehicleNo: 'TS08 GH 5678',
    assignedArea: 'Gachibowli',
    isActive: true,
    attendance: { present: 24, totalDays: 24 },
    attendanceLog: []
  },
  {
    id: 'D003',
    name: 'Krishna Murthy',
    phone: '9990001112',
    vehicleNo: 'TS09 JJ 9090',
    assignedArea: 'Madhapur',
    isActive: true,
    attendance: { present: 20, totalDays: 24 },
    attendanceLog: []
  }
];

export const ORDERS: Order[] = [
  {
    id: 'ORD-001',
    customerId: 'C1001',
    customerName: 'Srinivas Rao',
    area: 'Kukatpally',
    address: 'Flat 302, Sai Residency, KPHB Phase 1',
    driverId: 'D001',
    planName: 'Standard Brahmin Thali',
    status: DeliveryStatus.DELIVERED,
    date: new Date().toISOString().split('T')[0],
  },
  {
    id: 'ORD-002',
    customerId: 'C1002',
    customerName: 'Lakshmi Priya',
    area: 'Gachibowli',
    address: 'Villa 45, My Home Avatar',
    driverId: 'D002',
    planName: 'Premium Vantillu Special',
    status: DeliveryStatus.OUT_FOR_DELIVERY,
    date: new Date().toISOString().split('T')[0],
    note: 'Leave at security'
  },
  {
    id: 'ORD-003',
    customerId: 'C1004',
    customerName: 'Ananya Reddy',
    area: 'Jubilee Hills',
    address: 'Plot 55, Road No 10',
    driverId: null, // Unassigned example
    planName: 'Millet Health Box',
    status: DeliveryStatus.PENDING,
    date: new Date().toISOString().split('T')[0],
  }
];

export const TRANSACTIONS: Transaction[] = [
  { id: 'TXN001', customerId: 'C1001', customerName: 'Srinivas Rao', amount: 3500, date: '2023-10-01', mode: 'UPI', status: PaymentStatus.PAID },
  { id: 'TXN002', customerId: 'C1002', customerName: 'Lakshmi Priya', amount: 4500, date: '2023-10-05', mode: 'Bank Transfer', status: PaymentStatus.PAID },
  { id: 'TXN003', customerId: 'C1004', customerName: 'Ananya Reddy', amount: 1200, date: '2023-10-21', mode: 'UPI', status: PaymentStatus.PENDING },
];

export const SALARIES: DriverSalary[] = [
  { driverId: 'D001', driverName: 'Ramesh Kumar', month: 'September', daysWorked: 25, totalDeliveries: 450, baseSalary: 12000, incentives: 2000, deductions: 0, netPayable: 14000, status: 'Paid', payoutDate: '2023-10-05' },
  { driverId: 'D002', driverName: 'Mallesh Yadav', month: 'September', daysWorked: 26, totalDeliveries: 500, baseSalary: 12000, incentives: 2500, deductions: 500, netPayable: 14000, status: 'Pending' },
];