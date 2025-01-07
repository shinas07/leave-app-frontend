import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaHome, FaCalendarAlt, FaUsers, FaChartBar, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';

const ManagerTopBar = () => {
  const { logout } = useAuth();
  const [selectedView, setSelectedView] = useState('overview');
  const navigate = useNavigate()

  const navigationItems = [
    { path: '/manager/dashboard', name: 'Dashboard' },
    { path: '/manager/leave-requests', name: 'Leave Requests' },
    { path: '/manager/employees', name: 'Employees' },
    { path: '/manager/add-employee', name: 'Add Employee' },
  ];

  const handleLogout = async () => {
    const response = await logout();
    if (response.success) {
      toast.success('Successfully logged out.');
      navigate('/');
    } else {
      toast.error(response.error);
    }
  };

  return (
    <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 shadow-sm">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Manager Dashboard
          </h1>
            <button
            onClick={handleLogout}
            className="flex items-center text-red-600 hover:text-red-800"
          >
            <FaSignOutAlt className="mr-1" />
            Logout
          </button>

        </div>
        
        {/* Tab Navigation */}
        <div className="flex space-x-6 mt-6">
          {navigationItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setSelectedView(item.name.toLowerCase())}
              className={({ isActive }) => `
                px-1 py-2 text-sm font-medium border-b-2 transition-colors
                ${isActive 
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
            >
              {item.icon}
              <span className="ml-2">{item.name}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManagerTopBar;