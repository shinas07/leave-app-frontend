import React, { useState, useEffect } from 'react';
import { FaCalendarPlus, FaHistory, FaCalendarAlt, FaClock, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from './sidebar';
import api from '../../service/api'; // Adjust the import based on your API setup
import { toast } from 'sonner';
import Cookies from 'js-cookie'; // Make sure to import js-cookie


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



  useEffect(() => {
    const fetchLeaveHistory = async () => {
      try {
        const token = Cookies.get('access_token'); // Get the token from cookies
        const response = await api.get('api/leave-history/', {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        });
        console.log(response.data)
        setLeaveHistory(response.data);
        console.log('cheking how data is stored',LeaveHistory)
      } catch (error) {
        console.error('Error fetching leave history:', error);
        toast.error('Failed to fetch leave history.');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaveHistory();
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

      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <StatCard
            title="Total Leaves"
            value={stats.totalLeaves}
            icon={<FaCalendarAlt />}
            color="blue"
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

        </div>

  <div>

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
                  {loading ? (
                    <tr>
                      <td colSpan="3">Loading...</td>
                    </tr>
                  ) : leaveHistory.length === 0 ? (
                    <tr>
                      <div className="text-center text-gray-300 mt-4">
                        <p className="text-lg text-center">No leave history found.</p>
                      </div>
                    </tr>
                  ) : (
                    leaveHistory.map((leave) => {
                      const startDate = new Date(leave.start_date);
                      const endDate = new Date(leave.end_date);
                      return (
                        <tr key={leave.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                            {leave.leave_type}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                            {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <StatusBadge status={leave.status} />
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
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



export default EmployeeDashboard;