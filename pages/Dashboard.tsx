import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Users, IndianRupee, Truck, AlertCircle } from 'lucide-react';
import { Customer, Order } from '../types';

interface DashboardProps {
  customers: Customer[];
  orders: Order[];
}

const data = [
  { name: 'Jan', revenue: 40000 },
  { name: 'Feb', revenue: 45000 },
  { name: 'Mar', revenue: 42000 },
  { name: 'Apr', revenue: 48000 },
  { name: 'May', revenue: 55000 },
  { name: 'Jun', revenue: 60000 },
];

const planData = [
  { name: 'Standard Thali', value: 45 },
  { name: 'Premium Special', value: 30 },
  { name: 'Millet Box', value: 25 },
];

const COLORS = ['#ea580c', '#f97316', '#fb923c']; // Saffron shades

const StatCard = ({ title, value, icon: Icon, subtext, alert }: any) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100 flex items-start justify-between">
    <div>
      <p className="text-stone-500 text-sm font-medium">{title}</p>
      <h3 className="text-2xl font-bold text-stone-800 mt-1">{value}</h3>
      {subtext && <p className={`text-xs mt-1 ${alert ? 'text-red-500 font-semibold' : 'text-green-600'}`}>{subtext}</p>}
    </div>
    <div className="p-3 bg-orange-50 rounded-lg">
      <Icon className="w-6 h-6 text-saffron-600" />
    </div>
  </div>
);

const Dashboard: React.FC<DashboardProps> = ({ customers, orders }) => {
  const activeCustomers = customers.filter(c => c.status === 'Active').length;
  const pendingDeliveries = orders.filter(o => o.status === 'Pending').length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Active Customers" 
          value={activeCustomers} 
          icon={Users} 
          subtext={`Total: ${customers.length}`} 
        />
        <StatCard 
          title="Monthly Revenue (MRR)" 
          value="₹1,45,000" 
          icon={IndianRupee} 
          subtext="Target: ₹1.5L" 
        />
        <StatCard 
          title="Today's Deliveries" 
          value={orders.length} 
          icon={Truck} 
          subtext={`${pendingDeliveries} Pending`} 
          alert={pendingDeliveries > 0}
        />
        <StatCard 
          title="Pending Payments" 
          value="₹24,500" 
          icon={AlertCircle} 
          subtext="5 Customers Overdue" 
          alert
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100 lg:col-span-2">
          <h3 className="text-lg font-bold text-stone-800 mb-4">Revenue Growth</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ea580c" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#ea580c" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f4" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `₹${value/1000}k`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Revenue']}
                />
                <Area type="monotone" dataKey="revenue" stroke="#ea580c" fillOpacity={1} fill="url(#colorRev)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100">
          <h3 className="text-lg font-bold text-stone-800 mb-4">Plan Distribution</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={planData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {planData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;