import React, { useState, useEffect } from 'react';
import { FaCalendarPlus, FaHistory, FaCalendarAlt, FaClock, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from './sidebar';

const calendarStyles = `
  /* Calendar Container */
  .react-calendar {
    width: 100%;
    background: #1f2937;
    border: 1px solid #374151;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    font-family: inherit;
    line-height: 1.125em;
  }

  /* Navigation Buttons */
  .react-calendar__navigation button {
    color: #fff;
    min-width: 44px;
    background: none;
    font-size: 16px;
    margin-top: 8px;
  }

  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #374151;
    border-radius: 0.375rem;
  }

  .react-calendar__navigation button[disabled] {
    background-color: #374151;
    border-radius: 0.375rem;
  }

  /* Calendar Grid */
  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 0.75rem;
    color: #9CA3AF;
    padding: 8px 0;
  }

  .react-calendar__month-view__weekdays__weekday {
    padding: 0.5em;
  }

  .react-calendar__month-view__weekdays__weekday abbr {
    text-decoration: none;
  }

  /* Calendar Tiles */
  .react-calendar__tile {
    padding: 12px 6px;
    background: none;
    text-align: center;
    color: #fff;
    border-radius: 0.375rem;
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: #374151;
    border-radius: 0.375rem;
  }

  .react-calendar__tile--now {
    background: #3B82F6 !important;
    border-radius: 0.375rem;
  }

  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #2563EB !important;
    border-radius: 0.375rem;
  }

  .react-calendar__tile--active {
    background: #2563EB !important;
    border-radius: 0.375rem;
  }

  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: #1D4ED8 !important;
  }

  /* Leave Status Indicators */
  .leave-approved {
    background-color: rgba(34, 197, 94, 0.2) !important;
    border: 1px solid #22c55e;
  }

  .leave-pending {
    background-color: rgba(234, 179, 8, 0.2) !important;
    border: 1px solid #eab308;
  }

  .leave-rejected {
    background-color: rgba(239, 68, 68, 0.2) !important;
    border: 1px solid #ef4444;
  }
`;

const EmployeeDashboard = () => {
  // State management
  const [stats, setStats] = useState({
    totalLeaves: 0,
    pendingLeaves: 0,
    approvedLeaves: 0,
    rejectedLeaves: 0,
    remainingLeaves: 0
  });
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showLeaveForm, setShowLeaveForm] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Simulate API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStats({
        totalLeaves: 20,
        pendingLeaves: 2,
        approvedLeaves: 15,
        rejectedLeaves: 3,
        remainingLeaves: 10
      });

      setLeaveHistory([
        {
          id: 1,
          type: 'Annual Leave',
          startDate: '2024-03-20',
          endDate: '2024-03-22',
          status: 'approved',
          reason: 'Family vacation'
        },
        // Add more mock data
      ]);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  // Function to determine tile class based on leave status
  const getTileClassName = ({ date }) => {
    // Convert date to string format for comparison
    const dateStr = date.toISOString().split('T')[0];
    
    // Find if there's a leave on this date
    const leave = leaveHistory.find(leave => {
      const start = new Date(leave.startDate);
      const end = new Date(leave.endDate);
      return date >= start && date <= end;
    });

    if (leave) {
      return `leave-${leave.status}`;
    }
    return '';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <Sidebar>
      {/* Header */}
      <header className="bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">Employee Dashboard</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <StatCard
            title="Total Leaves"
            value={stats.totalLeaves}
            icon={<FaCalendarAlt />}
            color="blue"
          />
          <StatCard
            title="Pending"
            value={stats.pendingLeaves}
            icon={<FaClock />}
            color="yellow"
          />
          <StatCard
            title="Approved"
            value={stats.approvedLeaves}
            icon={<FaCheckCircle />}
            color="green"
          />
          <StatCard
            title="Rejected"
            value={stats.rejectedLeaves}
            icon={<FaTimesCircle />}
            color="red"
          />
          <StatCard
            title="Remaining"
            value={stats.remainingLeaves}
            icon={<FaHistory />}
            color="purple"
          />
        </div>

        {/* Calendar and History Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calendar View */}
          <div className="bg-gray-800 rounded-lg shadow-xl p-6">
            <style>{calendarStyles}</style>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white mb-4">Leave Calendar</h2>
              <div className="flex gap-4 mb-4">
                <LegendItem color="green" label="Approved" />
                <LegendItem color="yellow" label="Pending" />
                <LegendItem color="red" label="Rejected" />
              </div>
            </div>
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              tileClassName={getTileClassName}
              locale="en-US"
            />
          </div>

          {/* Leave History */}
          <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-700">
              <h2 className="text-xl font-semibold text-white">Leave History</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                      Duration
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {leaveHistory.map((leave) => (
                    <tr key={leave.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                        {leave.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                        {new Date(leave.startDate).toLocaleDateString()} - 
                        {new Date(leave.endDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={leave.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Leave Application Modal */}
      {showLeaveForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Apply for Leave</h2>
            {/* Add your leave application form here */}
            <button
              onClick={() => setShowLeaveForm(false)}
              className="mt-4 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Sidebar>
  );
};

// Reusable Components
const StatCard = ({ title, value, icon, color }) => {
  const colorClasses = {
    blue: 'bg-blue-500',
    yellow: 'bg-yellow-500',
    green: 'bg-green-500',
    red: 'bg-red-500',
    purple: 'bg-purple-500'
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-xl p-6">
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${colorClasses[color]} bg-opacity-75`}>
          {icon}
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-medium text-gray-300">{title}</h3>
          <p className="text-2xl font-semibold text-white">{value}</p>
        </div>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const statusClasses = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800'
  };

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusClasses[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

// Add this component for the calendar legend
const LegendItem = ({ color, label }) => {
  const colorClasses = {
    green: 'bg-green-500/20 border-green-500',
    yellow: 'bg-yellow-500/20 border-yellow-500',
    red: 'bg-red-500/20 border-red-500'
  };

  return (
    <div className="flex items-center">
      <div className={`w-4 h-4 rounded border ${colorClasses[color]} mr-2`}></div>
      <span className="text-sm text-gray-300">{label}</span>
    </div>
  );
};

export default EmployeeDashboard;