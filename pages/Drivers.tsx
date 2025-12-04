import React, { useState } from 'react';
import { SALARIES } from '../constants';
import { Phone, MapPin, Download, Edit2, Plus, Calendar, Check, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Driver, AttendanceStatus } from '../types';

interface DriversProps {
  drivers: Driver[];
  setDrivers: React.Dispatch<React.SetStateAction<Driver[]>>;
  onEdit: (driver: Driver) => void;
  onAdd: () => void;
  onUpdateAttendance: (driverId: string, date: string, status: AttendanceStatus) => void;
}

const Drivers: React.FC<DriversProps> = ({ drivers, setDrivers, onEdit, onAdd, onUpdateAttendance }) => {
  const [activeTab, setActiveTab] = useState<'List' | 'Attendance' | 'Salaries'>('List');
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);

  const handleDateChange = (days: number) => {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() + days);
    setSelectedDate(date.toISOString().split('T')[0]);
  };

  const getAttendanceStatus = (driver: Driver, date: string): AttendanceStatus | null => {
    const record = driver.attendanceLog.find(log => log.date === date);
    return record ? record.status : null;
  };

  return (
    <div className="space-y-6">
       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-stone-200 pb-2">
         <div className="flex gap-4 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            <button 
              onClick={() => setActiveTab('List')}
              className={`px-4 py-2 font-medium text-sm transition-colors whitespace-nowrap ${activeTab === 'List' ? 'text-saffron-600 border-b-2 border-saffron-600' : 'text-stone-500 hover:text-stone-700'}`}
            >
              Drivers List
            </button>
            <button 
              onClick={() => setActiveTab('Attendance')}
              className={`px-4 py-2 font-medium text-sm transition-colors whitespace-nowrap ${activeTab === 'Attendance' ? 'text-saffron-600 border-b-2 border-saffron-600' : 'text-stone-500 hover:text-stone-700'}`}
            >
              Daily Attendance
            </button>
            <button 
              onClick={() => setActiveTab('Salaries')}
              className={`px-4 py-2 font-medium text-sm transition-colors whitespace-nowrap ${activeTab === 'Salaries' ? 'text-saffron-600 border-b-2 border-saffron-600' : 'text-stone-500 hover:text-stone-700'}`}
            >
              Salary & Payouts
            </button>
         </div>
         {activeTab === 'List' && (
            <button onClick={onAdd} className="bg-saffron-600 hover:bg-saffron-700 text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 transition-colors">
              <Plus size={16} /> Add Driver
            </button>
         )}
      </div>

      {activeTab === 'List' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {drivers.map(driver => (
            <div key={driver.id} className="bg-white rounded-xl shadow-sm border border-stone-100 p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-lg font-bold text-stone-600">
                    {driver.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-800">{driver.name}</h3>
                    <span className="text-xs text-stone-500">{driver.vehicleNo}</span>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${driver.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {driver.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-stone-600 gap-3">
                  <Phone size={16} className="text-stone-400" />
                  {driver.phone}
                </div>
                <div className="flex items-center text-sm text-stone-600 gap-3">
                  <MapPin size={16} className="text-stone-400" />
                  Route: {driver.assignedArea}
                </div>
              </div>

              <div className="bg-orange-50 rounded-lg p-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-stone-600">Attendance (This Month)</span>
                  <span className="font-bold text-saffron-700">{driver.attendance.present}/{driver.attendance.totalDays} Days</span>
                </div>
                <div className="w-full bg-orange-200 rounded-full h-2">
                  <div 
                    className="bg-saffron-500 h-2 rounded-full" 
                    style={{ width: driver.attendance.totalDays > 0 ? `${(driver.attendance.present / driver.attendance.totalDays) * 100}%` : '0%' }}
                  ></div>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                 <button className="flex-1 border border-stone-200 text-stone-600 py-2 rounded-lg text-sm font-medium hover:bg-stone-50">View Documents</button>
                 <button onClick={() => onEdit(driver)} className="flex-1 bg-stone-800 text-white py-2 rounded-lg text-sm font-medium hover:bg-stone-900 flex items-center justify-center gap-2">
                   <Edit2 size={14} /> Edit
                 </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'Attendance' && (
        <div className="space-y-6 animate-fade-in">
          {/* Date Picker Card */}
          <div className="bg-white rounded-xl shadow-sm border border-stone-100 p-4 flex flex-col md:flex-row justify-between items-center gap-4">
             <div className="flex items-center gap-2">
               <div className="p-2 bg-orange-50 rounded-lg text-saffron-600">
                 <Calendar size={20} />
               </div>
               <div>
                 <h3 className="font-bold text-stone-800">Attendance Log</h3>
                 <p className="text-xs text-stone-500">Mark presence for lunch box delivery staff</p>
               </div>
             </div>
             <div className="flex items-center gap-4 bg-stone-50 p-1.5 rounded-lg border border-stone-200">
                <button onClick={() => handleDateChange(-1)} className="p-1 hover:bg-white rounded shadow-sm text-stone-600 transition-colors">
                  <ChevronLeft size={20} />
                </button>
                <input 
                  type="date" 
                  value={selectedDate} 
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="bg-transparent border-none text-sm font-semibold text-stone-800 focus:outline-none"
                />
                <button onClick={() => handleDateChange(1)} className="p-1 hover:bg-white rounded shadow-sm text-stone-600 transition-colors">
                  <ChevronRight size={20} />
                </button>
             </div>
          </div>

          {/* Drivers List for Attendance */}
          <div className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-stone-50 text-stone-600 text-sm">
                <tr>
                  <th className="p-4">Driver Name</th>
                  <th className="p-4">Assigned Area</th>
                  <th className="p-4">Status ({new Date(selectedDate).toLocaleDateString()})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-sm">
                {drivers.filter(d => d.isActive).map(driver => {
                  const status = getAttendanceStatus(driver, selectedDate);
                  return (
                    <tr key={driver.id} className="hover:bg-stone-50 transition-colors">
                      <td className="p-4">
                        <div className="font-medium text-stone-800">{driver.name}</div>
                        <div className="text-xs text-stone-400">{driver.phone}</div>
                      </td>
                      <td className="p-4">
                        <span className="bg-stone-100 text-stone-600 px-2 py-1 rounded text-xs">{driver.assignedArea}</span>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => onUpdateAttendance(driver.id, selectedDate, 'Present')}
                            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                              status === 'Present' 
                                ? 'bg-green-600 text-white border-green-600 shadow-sm' 
                                : 'bg-white text-stone-500 border-stone-200 hover:border-green-300 hover:text-green-600'
                            }`}
                          >
                            <Check size={14} /> Present
                          </button>
                          <button 
                            onClick={() => onUpdateAttendance(driver.id, selectedDate, 'Absent')}
                            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                              status === 'Absent' 
                                ? 'bg-red-600 text-white border-red-600 shadow-sm' 
                                : 'bg-white text-stone-500 border-stone-200 hover:border-red-300 hover:text-red-600'
                            }`}
                          >
                            <X size={14} /> Absent
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {drivers.filter(d => d.isActive).length === 0 && (
              <div className="p-8 text-center text-stone-500">
                No active drivers found.
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'Salaries' && (
        <div className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden animate-fade-in">
           <div className="p-4 flex justify-between items-center border-b border-stone-100">
              <h3 className="font-bold text-stone-800">September 2023 Payouts</h3>
              <button className="flex items-center gap-2 text-sm text-saffron-600 font-medium hover:bg-orange-50 px-3 py-1.5 rounded-lg transition-colors">
                <Download size={16} /> Export Report
              </button>
           </div>
           <div className="overflow-x-auto">
             <table className="w-full text-left">
               <thead className="bg-stone-50 text-stone-600 text-xs uppercase font-semibold">
                 <tr>
                   <th className="p-4">Driver</th>
                   <th className="p-4">Days Worked</th>
                   <th className="p-4">Deliveries</th>
                   <th className="p-4">Base Salary</th>
                   <th className="p-4">Incentives</th>
                   <th className="p-4">Deductions</th>
                   <th className="p-4">Net Payable</th>
                   <th className="p-4">Status</th>
                   <th className="p-4">Action</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-stone-100 text-sm">
                 {SALARIES.map((salary, idx) => (
                   <tr key={idx} className="hover:bg-stone-50">
                     <td className="p-4 font-medium text-stone-800">{salary.driverName}</td>
                     <td className="p-4 text-stone-600">{salary.daysWorked}</td>
                     <td className="p-4 text-stone-600">{salary.totalDeliveries}</td>
                     <td className="p-4 text-stone-600">₹{salary.baseSalary}</td>
                     <td className="p-4 text-green-600">+₹{salary.incentives}</td>
                     <td className="p-4 text-red-600">-₹{salary.deductions}</td>
                     <td className="p-4 font-bold text-stone-800">₹{salary.netPayable}</td>
                     <td className="p-4">
                       <span className={`px-2 py-1 rounded text-xs font-semibold ${salary.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                         {salary.status}
                       </span>
                     </td>
                     <td className="p-4">
                       {salary.status === 'Pending' && (
                         <button className="text-saffron-600 font-medium hover:underline">Mark Paid</button>
                       )}
                       {salary.status === 'Paid' && (
                         <span className="text-stone-400 text-xs">{salary.payoutDate}</span>
                       )}
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>
      )}
    </div>
  );
};

export default Drivers;