import React, { useState, useEffect, useDebugValue } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Home,
  LogOut,
  Moon,
  Settings,
  Sun,
  Users,
  Clock,
  BarChart3,
  Menu,
  X,
  User
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';

const Sidebar = ({ children }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  const userData = JSON.parse(localStorage.getItem('user')) || {};
  const userRole = userData.user_type || 'employee';
  const userEmail = userData.email || 'employee@example.com';
  const userName = userEmail ? userEmail.split('@')[0] : 'Employee';

  const navigationItems = {
    employee: [
      { path: '/employee/dashboard', name: 'Dashboard', icon: Home },
      { path: '/employee/leave-form', name: 'Apply Leave', icon: Calendar },
      { path: '/employee/leave-history', name: 'Leave History', icon: Clock },

    ],
  };

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      toast.success('Logout successfully.');
      navigate('/login'); 
    } else {
      toast.error('Logout failed.');
    }
  };

  return (
    <div className={`flex min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      {/* Mobile Menu Toggle */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 p-2 rounded-xl bg-white/10 
                   backdrop-blur-lg border border-white/20 text-white shadow-lg"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </motion.button>

      {/* Sidebar */}
      <motion.div
        initial={{ width: isExpanded ? 240 : 80 }}
        animate={{ width: isExpanded ? 240 : 80 }}
        transition={{ type: "spring", damping: 20, stiffness: 200 }}
        className={`fixed lg:static inset-y-0 left-0 z-40
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 transition-transform
          bg-white dark:bg-gray-900
          border-r border-gray-200 dark:border-gray-800
          flex flex-col
        `}
      >
        {/* Logo Section */}
        <div className="h-16 flex items-center justify-between px-4 border-b 
                      border-gray-200 dark:border-gray-800">
          <AnimatePresence mode="wait">
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 
                              to-purple-600 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-lg font-semibold bg-gradient-to-r from-blue-500 
                             to-purple-600 bg-clip-text text-transparent">
                  LeaveFlow
                </h1>
              </motion.div>
            )}
          </AnimatePresence>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 
                     transition-colors"
          >
            {isExpanded ? (
              <ChevronLeft className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            ) : (
              <ChevronRight className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            )}
          </motion.button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="px-3 space-y-1">
            {navigationItems[userRole].map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  relative flex items-center px-3 py-2.5 rounded-xl
                  transition-all duration-200 group
                  ${isActive 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }
                `}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                
                <AnimatePresence mode="wait">
                  {isExpanded && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="ml-3 font-medium"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>

                {item.badge && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute right-2 top-2 bg-red-500 text-white 
                             text-xs font-bold rounded-full w-5 h-5 flex 
                             items-center justify-center"
                  >
                    {item.badge}
                  </motion.div>
                )}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* User Profile Section */}
        <div className="border-t border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 
                        to-purple-600 flex items-center justify-center flex-shrink-0"
            >
              <User className="w-5 h-5 text-white" />
            </motion.div>

            <AnimatePresence mode="wait">
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="flex-1 min-w-0"
                >
                  <h2 className="text-sm font-semibold truncate dark:text-white">
                    {userName}
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {userEmail}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <div className="mt-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="flex items-center gap-2 p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
              >
                <LogOut className="w-5 h-5" />
                {isExpanded && <span>Logout</span>}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900">
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;