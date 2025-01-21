import React, { useEffect, useState } from 'react';
import api from '../../service/api';
import { toast } from 'sonner';
import Sidebar from '../../pages/EmployeePages/sidebar';

const LeaveHistory = () => {
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaveHistory = async () => {
      try {
        const response = await api.get('/api/leave-history/');
        setLeaveHistory(response.data);
      } catch (error) {
        toast.error('Failed to fetch leave history. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaveHistory();
  }, []);

  if (loading) {
    return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>);
  }

  return (
    <Sidebar>
    <div className="container mx-auto mt-6 p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-700">
          <h1 className="text-2xl font-bold text-white">Leave History</h1>
        </div>
        {leaveHistory.length === 0 ? (
          <div className="text-center text-gray-300 py-4">
            <p>No leave history found.</p>
            <p className="text-sm">It looks like you haven't taken any leave yet. Check back later!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-700 border border-gray-600">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="border px-4 py-2">Leave Type</th>
                  <th className="border px-4 py-2">Start Date</th>
                  <th className="border px-4 py-2">End Date</th>
                  <th className="border px-4 py-2">Status</th>
                  <th className="border px-4 py-2">Reason</th>
                </tr>
              </thead>
              <tbody>
                {leaveHistory.map((leave) => (
                  <tr key={leave.id} className="hover:bg-gray-600">
                    <td className="border px-4 py-2 text-white bg-gray-700">{leave.leave_type}</td>
                    <td className="border px-4 py-2 text-white bg-gray-700">{new Date(leave.start_date).toLocaleDateString('en-GB')}</td>
                    <td className="border px-4 py-2 text-white bg-gray-700">{new Date(leave.end_date).toLocaleDateString('en-GB')}</td>
                    <td className="border px-4 py-2 text-white bg-gray-700">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(leave.status)}`}>
                        {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                      </span>
                    </td>
                    <td className="border px-4 py-2 text-white bg-gray-700">
                      {leave.reason.length > 100 ? (
                        <div>
                          {leave.reason.substring(0, 300)}...
                          <button
                            className="text-blue-500 ml-1"
                          >
                            {/* Read more */}
                          </button>
                        </div>
                      ) : (
                        leave.reason
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
    </Sidebar>
  );
};

// Helper function to get status class
const getStatusClass = (status) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'approved':
      return 'bg-green-100 text-green-800';
    case 'rejected':
      return 'bg-red-100 text-red-800';
    default:
      return '';
  }
};

export default LeaveHistory;