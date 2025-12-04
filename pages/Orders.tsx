import React, { useState } from 'react';
import { Search, Filter, CheckCircle, XCircle, Truck, AlertTriangle } from 'lucide-react';
import { HYDERABAD_AREAS } from '../constants';
import { DeliveryStatus, Order, Driver } from '../types';

interface OrdersProps {
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  drivers: Driver[];
}

const Orders: React.FC<OrdersProps> = ({ orders, setOrders, drivers }) => {
  const [filterArea, setFilterArea] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const handleStatusChange = (orderId: string, newStatus: DeliveryStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  const filteredOrders = orders.filter(order => {
    const matchesArea = filterArea === 'All' || order.area === filterArea;
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          order.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesArea && matchesSearch;
  });

  const getStatusColor = (status: DeliveryStatus) => {
    switch(status) {
      case DeliveryStatus.DELIVERED: return 'bg-green-100 text-green-700 border-green-200';
      case DeliveryStatus.OUT_FOR_DELIVERY: return 'bg-blue-100 text-blue-700 border-blue-200';
      case DeliveryStatus.SKIPPED: return 'bg-gray-100 text-gray-700 border-gray-200';
      case DeliveryStatus.FAILED: return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-stone-800">Today's Deliveries</h2>
          <p className="text-stone-500 text-sm">Managing {filteredOrders.length} lunch boxes for {new Date().toLocaleDateString()}</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
           <button className="bg-saffron-600 hover:bg-saffron-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Auto Assign Drivers
           </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-stone-100 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 text-stone-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search customer or order ID..." 
            className="w-full pl-10 pr-4 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-saffron-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <div className="relative min-w-[200px]">
            <Filter className="absolute left-3 top-2.5 text-stone-400 w-5 h-5" />
            <select 
              className="w-full pl-10 pr-4 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-saffron-500 appearance-none bg-white"
              value={filterArea}
              onChange={(e) => setFilterArea(e.target.value)}
            >
              <option value="All">All Areas</option>
              {HYDERABAD_AREAS.map(area => <option key={area} value={area}>{area}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-stone-50 text-stone-600 font-medium text-sm">
              <tr>
                <th className="p-4">Order Details</th>
                <th className="p-4">Address</th>
                <th className="p-4">Driver</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredOrders.map(order => (
                <tr key={order.id} className="hover:bg-stone-50 transition-colors">
                  <td className="p-4">
                    <div className="font-semibold text-stone-800">{order.customerName}</div>
                    <div className="text-xs text-stone-500">{order.planName}</div>
                    {order.note && <div className="text-xs text-amber-600 mt-1 flex items-center gap-1"><AlertTriangle size={12}/> {order.note}</div>}
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-stone-700">{order.address}</div>
                    <div className="text-xs text-stone-500 bg-stone-100 inline-block px-2 py-0.5 rounded mt-1">{order.area}</div>
                  </td>
                  <td className="p-4">
                    {order.driverId ? (
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-saffron-100 flex items-center justify-center text-saffron-700 text-xs font-bold">
                          {drivers.find(d => d.id === order.driverId)?.name.charAt(0) || '?'}
                        </div>
                        <span className="text-sm text-stone-700">{drivers.find(d => d.id === order.driverId)?.name || 'Unknown Driver'}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-red-500 font-medium">Unassigned</span>
                    )}
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      {order.status !== DeliveryStatus.DELIVERED && (
                        <>
                          <button 
                            onClick={() => handleStatusChange(order.id, DeliveryStatus.DELIVERED)}
                            title="Mark Delivered"
                            className="p-2 rounded-lg text-green-600 hover:bg-green-50"
                          >
                            <CheckCircle size={18} />
                          </button>
                          <button 
                             onClick={() => handleStatusChange(order.id, DeliveryStatus.OUT_FOR_DELIVERY)}
                             title="Out for Delivery"
                             className="p-2 rounded-lg text-blue-600 hover:bg-blue-50"
                          >
                            <Truck size={18} />
                          </button>
                          <button 
                             onClick={() => handleStatusChange(order.id, DeliveryStatus.SKIPPED)}
                             title="Skip Order"
                             className="p-2 rounded-lg text-gray-400 hover:bg-gray-100"
                          >
                            <XCircle size={18} />
                          </button>
                        </>
                      )}
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
};

export default Orders;