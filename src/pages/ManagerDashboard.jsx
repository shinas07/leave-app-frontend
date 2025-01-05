import React, { useState, useEffect } from 'react';
import { FaUserClock, FaCheckCircle, FaTimesCircle, FaCalendarAlt, FaChartBar, FaUsers } from 'react-icons/fa';
import Sidebar from './Layout';

const ManagerDashboard = () => {
  // State management for different data
  const [stats, setStats] = useState({
    totalRequests: 0,
    pendingRequests: 0,
    approvedRequests: 0,
    rejectedRequests: 0,
    totalEmployees: 0
  });
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data when component mounts
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data - replace with actual API calls
      setStats({
        totalRequests: 25,
        pendingRequests: 5,
        approvedRequests: 15,
        rejectedRequests: 5,
        totalEmployees: 10
      });

      setLeaveRequests([
        {
          id: 1,
          employeeName: 'John Doe',
          leaveType: 'Annual Leave',
          startDate: '2024-03-20',
          endDate: '2024-03-22',
          status: 'pending',
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

  // Handle leave request actions
  const handleLeaveAction = async (requestId, action) => {
    try {
      // Add your API call here
      console.log(`${action} request ${requestId}`);
      
      // Update local state
      setLeaveRequests(prevRequests =>
        prevRequests.map(request =>
          request.id === requestId
            ? { ...request, status: action }
            : request
        )
      );
    } catch (error) {
      console.error(`Error ${action} request:`, error);
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
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-white">Manager Dashboard</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Requests"
            value={stats.totalRequests}
            icon={<FaUserClock />}
            color="blue"
          />
          <StatCard
            title="Pending"
            value={stats.pendingRequests}
            icon={<FaCalendarAlt />}
            color="yellow"
          />
          <StatCard
            title="Approved"
            value={stats.approvedRequests}
            icon={<FaCheckCircle />}
            color="green"
          />
          <StatCard
            title="Rejected"
            value={stats.rejectedRequests}
            icon={<FaTimesCircle />}
            color="red"
          />
        </div>

        {/* Leave Requests Table */}
        <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-700">
            <h2 className="text-xl font-semibold text-white">Recent Leave Requests</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Leave Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {leaveRequests.map((request) => (
                  <tr key={request.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                      {request.employeeName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                      {request.leaveType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                      {new Date(request.startDate).toLocaleDateString()} - 
                      {new Date(request.endDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={request.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {request.status === 'pending' && (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleLeaveAction(request.id, 'approved')}
                            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleLeaveAction(request.id, 'rejected')}
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
    </Sidebar>
  );
};

// Reusable Components
const StatCard = ({ title, value, icon, color }) => {
  const colorClasses = {
    blue: 'bg-blue-500',
    yellow: 'bg-yellow-500',
    green: 'bg-green-500',
    red: 'bg-red-500'
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

export default ManagerDashboard;