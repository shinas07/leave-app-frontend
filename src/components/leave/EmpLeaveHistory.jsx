import React, { useEffect, useState } from 'react';
import api from '../../service/api';
import { toast } from 'sonner';

const LeaveHistory = () => {
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaveHistory = async () => {
      try {
        const response = await api.get('/api/leave/history/'); // Adjust the endpoint as needed
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
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Leave History</h1>
      {leaveHistory.length === 0 ? (
        <p>No leave history found.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="border px-4 py-2">Leave Type</th>
              <th className="border px-4 py-2">Start Date</th>
              <th className="border px-4 py-2">End Date</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {leaveHistory.map((leave) => (
              <tr key={leave.id}>
                <td className="border px-4 py-2">{leave.leave_type}</td>
                <td className="border px-4 py-2">{new Date(leave.start_date).toLocaleDateString()}</td>
                <td className="border px-4 py-2">{new Date(leave.end_date).toLocaleDateString()}</td>
                <td className="border px-4 py-2">{leave.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LeaveHistory;