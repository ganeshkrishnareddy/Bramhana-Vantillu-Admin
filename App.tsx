import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  UtensilsCrossed, 
  Truck, 
  Wallet, 
  Settings as SettingsIcon, 
  Menu, 
  Bell,
  LogOut,
  Plus,
  Edit2,
  Trash2
} from 'lucide-react';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Drivers from './pages/Drivers';
import { CUSTOMERS, PLANS, TRANSACTIONS, DRIVERS, ORDERS, HYDERABAD_AREAS } from './constants';
import { Plan, Customer, SubscriptionStatus, Order, Driver, DeliveryStatus, AttendanceStatus } from './types';
import { GenericModal } from './components/GenericModal';

// --- Sub-Views (Refactored to accept props) ---

const CustomersView: React.FC<{ 
  customers: Customer[], 
  plans: Plan[],
  onEdit: (c: Customer) => void,
  onAdd: () => void,
  onDelete: (id: string) => void 
}> = ({ customers, plans, onEdit, onAdd, onDelete }) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-bold text-stone-800">Customers</h2>
      <button onClick={onAdd} className="bg-saffron-600 hover:bg-saffron-700 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors">
        <Plus size={16} /> Add Customer
      </button>
    </div>
    <div className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-stone-50 text-stone-600 text-sm">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Plan</th>
              <th className="p-4">Area</th>
              <th className="p-4">Status</th>
              <th className="p-4">Due Amount</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 text-sm">
            {customers.map(c => (
              <tr key={c.id} className="hover:bg-stone-50">
                <td className="p-4">
                  <div className="font-medium">{c.name}</div>
                  <div className="text-xs text-stone-400">{c.phone}</div>
                </td>
                <td className="p-4">{plans.find(p => p.id === c.planId)?.name || 'Unknown Plan'}</td>
                <td className="p-4">{c.area}</td>
                <td className="p-4">
                   <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                     c.status === 'Active' ? 'bg-green-100 text-green-700' : 
                     c.status === 'Paused' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                   }`}>
                     {c.status}
                   </span>
                </td>
                <td className="p-4">
                  {c.dueAmount > 0 ? <span className="text-red-500 font-medium">₹{c.dueAmount}</span> : <span className="text-green-500">Paid</span>}
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => onEdit(c)} className="text-stone-500 hover:text-saffron-600 p-1">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => onDelete(c.id)} className="text-stone-400 hover:text-red-600 p-1">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const PlansView: React.FC<{
  plans: Plan[],
  onEdit: (p: Plan) => void,
  onAdd: () => void,
  onDelete: (id: string) => void
}> = ({ plans, onEdit, onAdd, onDelete }) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-bold text-stone-800">Subscription Plans (Lunch Box)</h2>
      <button onClick={onAdd} className="bg-saffron-600 hover:bg-saffron-700 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors">
        <Plus size={16} /> Create Plan
      </button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {plans.map(plan => (
        <div key={plan.id} className="bg-white p-6 rounded-xl border border-stone-100 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <UtensilsCrossed size={64} className="text-saffron-600" />
          </div>
          <h3 className="font-bold text-lg text-stone-800">{plan.name}</h3>
          <div className="flex items-baseline gap-1 mt-2 mb-4">
             <span className="text-2xl font-bold text-saffron-600">₹{plan.price}</span>
             <span className="text-sm text-stone-500">/ {plan.type}</span>
          </div>
          <ul className="space-y-2 mb-6">
            <li className="text-sm text-stone-600 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
              {plan.mealsPerWeek} Meals per week
            </li>
            <li className="text-sm text-stone-600 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
              Pure Veg / Brahmin Style
            </li>
            <li className="text-sm text-stone-500 italic mt-2 text-xs border-t pt-2">
              "{plan.description}"
            </li>
          </ul>
          <div className="flex gap-2">
            <button onClick={() => onEdit(plan)} className="flex-1 py-2 border border-stone-200 rounded-lg text-sm font-medium hover:bg-stone-50 flex items-center justify-center gap-2">
              <Edit2 size={14} /> Edit
            </button>
            <button onClick={() => onDelete(plan.id)} className="p-2 border border-stone-200 text-red-500 rounded-lg hover:bg-red-50">
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const FinancesView = () => (
  <div className="space-y-6">
     <h2 className="text-xl font-bold text-stone-800">Finances & Revenue</h2>
     <div className="bg-white rounded-xl shadow-sm border border-stone-100">
        <div className="p-4 border-b border-stone-100">
          <h3 className="font-semibold text-stone-700">Recent Transactions</h3>
        </div>
        <table className="w-full text-left">
          <thead className="bg-stone-50 text-stone-600 text-sm">
            <tr>
              <th className="p-4">Date</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Mode</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 text-sm">
            {TRANSACTIONS.map(t => (
               <tr key={t.id} className="hover:bg-stone-50">
                 <td className="p-4 text-stone-500">{t.date}</td>
                 <td className="p-4 font-medium">{t.customerName}</td>
                 <td className="p-4 text-stone-500">{t.mode}</td>
                 <td className="p-4 font-bold text-stone-800">₹{t.amount}</td>
                 <td className="p-4">
                   <span className={`px-2 py-1 rounded-full text-xs font-semibold ${t.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                     {t.status}
                   </span>
                 </td>
               </tr>
            ))}
          </tbody>
        </table>
     </div>
  </div>
);

const SettingsView = () => (
  <div className="max-w-2xl bg-white p-8 rounded-xl shadow-sm border border-stone-100">
    <h2 className="text-xl font-bold text-stone-800 mb-6">System Settings</h2>
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">Delivery Zones (Hyderabad)</label>
        <div className="flex flex-wrap gap-2">
          {HYDERABAD_AREAS.slice(0,4).map(z => (
            <span key={z} className="bg-stone-100 px-3 py-1 rounded-full text-sm text-stone-600 flex items-center gap-1">
              {z}
            </span>
          ))}
          <button className="text-sm text-saffron-600 font-medium px-2">+ Add Zone</button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
           <label className="block text-sm font-medium text-stone-700 mb-1">Default GST (%)</label>
           <input type="number" className="w-full border border-stone-200 rounded-lg p-2" defaultValue={5} />
        </div>
        <div>
           <label className="block text-sm font-medium text-stone-700 mb-1">Working Days</label>
           <select className="w-full border border-stone-200 rounded-lg p-2">
             <option>Mon - Sat</option>
             <option>Mon - Sun</option>
             <option>Mon - Fri</option>
           </select>
        </div>
      </div>
      
      <button className="bg-stone-800 text-white px-6 py-2 rounded-lg font-medium hover:bg-stone-900">Save Changes</button>
    </div>
  </div>
);

// --- Main App Component ---

function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // --- Centralized State ---
  const [customers, setCustomers] = useState<Customer[]>(CUSTOMERS);
  const [plans, setPlans] = useState<Plan[]>(PLANS);
  const [drivers, setDrivers] = useState<Driver[]>(DRIVERS);
  const [orders, setOrders] = useState<Order[]>(ORDERS);

  // --- Modal State ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'customer' | 'plan' | 'driver' | null>(null);
  const [editingItem, setEditingItem] = useState<any>(null);

  // --- CRUD Handlers ---

  // Customers
  const handleEditCustomer = (customer: Customer) => {
    setModalType('customer');
    setEditingItem(customer);
    setIsModalOpen(true);
  };
  const handleAddCustomer = () => {
    setModalType('customer');
    setEditingItem(null); // null means new
    setIsModalOpen(true);
  };
  const handleDeleteCustomer = (id: string) => {
    if(window.confirm("Are you sure you want to delete this customer?")) {
      setCustomers(prev => prev.filter(c => c.id !== id));
    }
  };

  // Plans
  const handleEditPlan = (plan: Plan) => {
    setModalType('plan');
    setEditingItem(plan);
    setIsModalOpen(true);
  };
  const handleAddPlan = () => {
    setModalType('plan');
    setEditingItem(null);
    setIsModalOpen(true);
  };
  const handleDeletePlan = (id: string) => {
    if(window.confirm("Are you sure you want to delete this plan?")) {
      setPlans(prev => prev.filter(p => p.id !== id));
    }
  };

  // Drivers
  const handleEditDriver = (driver: Driver) => {
    setModalType('driver');
    setEditingItem(driver);
    setIsModalOpen(true);
  };
  const handleAddDriver = () => {
    setModalType('driver');
    setEditingItem(null);
    setIsModalOpen(true);
  };
  
  const handleDeleteDriver = (id: string) => {
     if(window.confirm("Delete this driver?")) {
        setDrivers(prev => prev.filter(d => d.id !== id));
     }
  };

  const handleUpdateAttendance = (driverId: string, date: string, status: AttendanceStatus) => {
    setDrivers(prev => prev.map(driver => {
      if (driver.id !== driverId) return driver;

      // Update Attendance Log
      const currentLog = driver.attendanceLog || [];
      const existingIndex = currentLog.findIndex(log => log.date === date);
      let newLog = [...currentLog];

      if (existingIndex >= 0) {
        newLog[existingIndex] = { date, status };
      } else {
        newLog.push({ date, status });
      }

      // Recalculate monthly summary (Current Month Only for simplicity)
      const currentMonth = new Date().getMonth();
      const presentCount = newLog.filter(l => new Date(l.date).getMonth() === currentMonth && l.status === 'Present').length;

      return {
        ...driver,
        attendanceLog: newLog,
        attendance: {
          ...driver.attendance,
          present: presentCount
        }
      };
    }));
  };

  // Save Logic (Generic-ish)
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    if (modalType === 'customer') {
      const newCustomer: Customer = {
        id: editingItem ? editingItem.id : `C${Date.now()}`,
        name: data.name as string,
        phone: data.phone as string,
        area: data.area as string,
        address: data.address as string,
        planId: data.planId as string,
        status: data.status as SubscriptionStatus,
        nextBillingDate: data.nextBillingDate as string,
        dueAmount: Number(data.dueAmount),
        notes: data.notes as string,
      };
      
      if (editingItem) {
        setCustomers(prev => prev.map(c => c.id === editingItem.id ? newCustomer : c));
      } else {
        setCustomers(prev => [...prev, newCustomer]);
      }
    } else if (modalType === 'plan') {
       const newPlan: Plan = {
         id: editingItem ? editingItem.id : `P${Date.now()}`,
         name: data.name as string,
         type: data.type as any,
         price: Number(data.price),
         mealsPerWeek: Number(data.mealsPerWeek),
         description: data.description as string,
         isActive: true
       };
       if(editingItem) {
         setPlans(prev => prev.map(p => p.id === editingItem.id ? newPlan : p));
       } else {
         setPlans(prev => [...prev, newPlan]);
       }
    } else if (modalType === 'driver') {
        const newDriver: Driver = {
          id: editingItem ? editingItem.id : `D${Date.now()}`,
          name: data.name as string,
          phone: data.phone as string,
          vehicleNo: data.vehicleNo as string,
          assignedArea: data.assignedArea as string,
          isActive: true, // Default to active
          attendance: editingItem ? editingItem.attendance : { present: 0, totalDays: 0 },
          attendanceLog: editingItem ? editingItem.attendanceLog : []
        };
        if(editingItem) {
          setDrivers(prev => prev.map(d => d.id === editingItem.id ? newDriver : d));
        } else {
          setDrivers(prev => [...prev, newDriver]);
        }
    }

    setIsModalOpen(false);
  };

  // --- View Rendering ---

  const renderContent = () => {
    switch(activeTab) {
      case 'Dashboard': return <Dashboard customers={customers} orders={orders} />;
      case 'Customers': return <CustomersView customers={customers} plans={plans} onEdit={handleEditCustomer} onAdd={handleAddCustomer} onDelete={handleDeleteCustomer} />;
      case 'Plans': return <PlansView plans={plans} onEdit={handleEditPlan} onAdd={handleAddPlan} onDelete={handleDeletePlan} />;
      case 'Orders': return <Orders orders={orders} setOrders={setOrders} drivers={drivers} />;
      case 'Drivers': return <Drivers drivers={drivers} setDrivers={setDrivers} onEdit={handleEditDriver} onAdd={handleAddDriver} onUpdateAttendance={handleUpdateAttendance} />;
      case 'Finances': return <FinancesView />;
      case 'Settings': return <SettingsView />;
      default: return <Dashboard customers={customers} orders={orders} />;
    }
  };

  const menuItems = [
    { id: 'Dashboard', icon: LayoutDashboard, label: 'Overview' },
    { id: 'Customers', icon: Users, label: 'Customers' },
    { id: 'Plans', icon: UtensilsCrossed, label: 'Subscription Plans' },
    { id: 'Orders', icon: Truck, label: 'Orders & Delivery' },
    { id: 'Drivers', icon: Users, label: 'Drivers & Salary' },
    { id: 'Finances', icon: Wallet, label: 'Finances' },
    { id: 'Settings', icon: SettingsIcon, label: 'Settings' },
  ];

  return (
    <div className="flex h-screen bg-stone-50 text-stone-800 font-sans overflow-hidden">
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-stone-200 transform transition-transform duration-200 ease-in-out
        md:relative md:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-16 flex items-center px-6 border-b border-stone-100">
          <div className="w-8 h-8 bg-saffron-600 rounded-lg flex items-center justify-center text-white mr-3">
            <UtensilsCrossed size={18} />
          </div>
          <div>
            <h1 className="font-bold text-stone-900 leading-tight">Bramhana Vantillu</h1>
            <p className="text-[10px] text-stone-500 tracking-wider uppercase">Admin Portal</p>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-orange-50 text-saffron-700' 
                    : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                }`}
              >
                <Icon size={20} className={isActive ? 'text-saffron-600' : 'text-stone-400'} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-stone-100">
           <button className="flex items-center gap-3 px-4 py-3 w-full text-stone-600 hover:text-red-600 text-sm font-medium transition-colors">
             <LogOut size={20} />
             Logout
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-stone-200 flex items-center justify-between px-4 md:px-8">
          <button 
            className="md:hidden p-2 text-stone-600 hover:bg-stone-100 rounded-lg"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
          
          <div className="hidden md:flex items-center text-stone-500 text-sm">
             <span className="font-medium text-stone-800">{new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>

          <div className="flex items-center gap-4">
             <button className="relative p-2 text-stone-500 hover:bg-stone-50 rounded-full transition-colors">
               <Bell size={20} />
               <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
             </button>
             <div className="flex items-center gap-3 pl-4 border-l border-stone-100">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-stone-800">Admin User</p>
                  <p className="text-xs text-stone-500">Manager</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-stone-200 overflow-hidden border-2 border-white shadow-sm">
                   <img src="https://picsum.photos/100/100" alt="Admin" className="w-full h-full object-cover" />
                </div>
             </div>
          </div>
        </header>

        {/* Scrollable View Area */}
        <div className="flex-1 overflow-auto p-4 md:p-8">
           <div className="max-w-7xl mx-auto">
              {renderContent()}
           </div>
        </div>
      </main>

      {/* Generic Modal for Forms */}
      <GenericModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingItem ? `Edit ${modalType}` : `Add New ${modalType}`}
        footer={
          <>
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-stone-600 hover:text-stone-800">Cancel</button>
            <button form="dynamic-form" type="submit" className="px-4 py-2 text-sm font-medium text-white bg-stone-800 rounded-lg hover:bg-stone-900">Save Changes</button>
          </>
        }
      >
        <form id="dynamic-form" onSubmit={handleSave} className="space-y-4">
          
          {/* CUSTOMER FORM */}
          {modalType === 'customer' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Name</label>
                  <input name="name" required defaultValue={editingItem?.name} className="w-full border border-stone-200 rounded-lg p-2 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Phone</label>
                  <input name="phone" required defaultValue={editingItem?.phone} className="w-full border border-stone-200 rounded-lg p-2 text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Address</label>
                <input name="address" required defaultValue={editingItem?.address} className="w-full border border-stone-200 rounded-lg p-2 text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Area</label>
                  <select name="area" defaultValue={editingItem?.area} className="w-full border border-stone-200 rounded-lg p-2 text-sm bg-white">
                    {HYDERABAD_AREAS.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Plan</label>
                  <select name="planId" defaultValue={editingItem?.planId} className="w-full border border-stone-200 rounded-lg p-2 text-sm bg-white">
                    {plans.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Status</label>
                  <select name="status" defaultValue={editingItem?.status} className="w-full border border-stone-200 rounded-lg p-2 text-sm bg-white">
                    <option value="Active">Active</option>
                    <option value="Paused">Paused</option>
                    <option value="Stopped">Stopped</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Due Amount (₹)</label>
                  <input name="dueAmount" type="number" defaultValue={editingItem?.dueAmount || 0} className="w-full border border-stone-200 rounded-lg p-2 text-sm" />
                </div>
              </div>
              <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Next Billing Date</label>
                  <input name="nextBillingDate" type="date" defaultValue={editingItem?.nextBillingDate} className="w-full border border-stone-200 rounded-lg p-2 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Notes</label>
                <textarea name="notes" defaultValue={editingItem?.notes} className="w-full border border-stone-200 rounded-lg p-2 text-sm" rows={2} />
              </div>
            </>
          )}

          {/* PLAN FORM */}
          {modalType === 'plan' && (
             <>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Plan Name</label>
                <input name="name" required defaultValue={editingItem?.name} className="w-full border border-stone-200 rounded-lg p-2 text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Type</label>
                  <select name="type" defaultValue={editingItem?.type} className="w-full border border-stone-200 rounded-lg p-2 text-sm bg-white">
                    <option value="Monthly">Monthly</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Custom">Custom</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Price (₹)</label>
                  <input name="price" type="number" required defaultValue={editingItem?.price} className="w-full border border-stone-200 rounded-lg p-2 text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Meals Per Week</label>
                <input name="mealsPerWeek" type="number" required defaultValue={editingItem?.mealsPerWeek} className="w-full border border-stone-200 rounded-lg p-2 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Description</label>
                <textarea name="description" defaultValue={editingItem?.description} className="w-full border border-stone-200 rounded-lg p-2 text-sm" rows={3} />
              </div>
             </>
          )}

          {/* DRIVER FORM */}
          {modalType === 'driver' && (
            <>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Driver Name</label>
                <input name="name" required defaultValue={editingItem?.name} className="w-full border border-stone-200 rounded-lg p-2 text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Phone</label>
                  <input name="phone" required defaultValue={editingItem?.phone} className="w-full border border-stone-200 rounded-lg p-2 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Vehicle No</label>
                  <input name="vehicleNo" required defaultValue={editingItem?.vehicleNo} className="w-full border border-stone-200 rounded-lg p-2 text-sm" />
                </div>
              </div>
              <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Assigned Area</label>
                  <select name="assignedArea" defaultValue={editingItem?.assignedArea} className="w-full border border-stone-200 rounded-lg p-2 text-sm bg-white">
                    {HYDERABAD_AREAS.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
            </>
          )}

        </form>
      </GenericModal>
    </div>
  );
}

export default App;