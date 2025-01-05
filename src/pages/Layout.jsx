import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaHome, 
  FaCalendarAlt, 
  FaUsers, 
  FaUserClock, 
  FaSignOutAlt, 
  FaUser,
  FaChartBar,
  FaBars,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaCog,
  FaBell
} from 'react-icons/fa';

// First, install required packages:
// npm install framer-motion @headlessui/react react-icons

const Sidebar = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [notifications] = useState(3); // Example notification count
  
  const userRole = localStorage.getItem('userRole') || 'employee';
  const userName = localStorage.getItem('userName') || 'User Name';

  const navigationItems = {
    employee: [
      {
        path: '/employee/dashboard',
        name: 'Dashboard',
        icon: <FaHome className="w-5 h-5" />
      },
      {
        path: '/employee/leave-form',
        name: 'Apply Leave',
        icon: <FaCalendarAlt className="w-5 h-5" />
      },
      {
        path: '/employee/history',
        name: 'Leave History',
        icon: <FaUserClock className="w-5 h-5" />
      }
    ],
    manager: [
      {
        path: '/manager/dashboard',
        name: 'Dashboard',
        icon: <FaHome className="w-5 h-5" />
      },
      {
        path: '/manager/requests',
        name: 'Leave Requests',
        icon: <FaUserClock className="w-5 h-5" />,
        badge: notifications
      },
      {
        path: '/manager/employees',
        name: 'Employees',
        icon: <FaUsers className="w-5 h-5" />
      },
      {
        path: '/manager/reports',
        name: 'Reports',
        icon: <FaChartBar className="w-5 h-5" />
      }
    ]
  };

  const sidebarVariants = {
    expanded: {
      width: "240px",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    collapsed: {
      width: "80px",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Mobile Menu Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        className="lg:hidden fixed top-4 right-4 z-50 p-2 rounded-md bg-gray-800 text-white"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </motion.button>

      {/* Sidebar */}
      <motion.div 
        initial="collapsed"
        animate={isExpanded ? "expanded" : "collapsed"}
        variants={sidebarVariants}
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0
          bg-gradient-to-b from-gray-900 to-gray-800 
          border-r border-gray-700/50
          min-h-screen flex-shrink-0 overflow-hidden
          shadow-xl
        `}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Logo Section */}
        <motion.div 
          className="h-16 flex items-center justify-center border-b border-gray-700/50"
          initial={false}
          animate={{ opacity: 1 }}
        >
          <AnimatePresence>
            {isExpanded ? (
              <motion.h1
                key="full-logo"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 
                         bg-clip-text text-transparent"
              >
                Leave Management
              </motion.h1>
            ) : (
              <motion.div
                key="icon-logo"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500"
              >
                <FaCalendarAlt className="w-6 h-6 text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Navigation Section */}
        <nav className="mt-6">
          <div className="space-y-2 px-3">
            {navigationItems[userRole].map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  relative flex items-center px-4 py-3 rounded-lg
                  transition-all duration-200 group
                  ${isActive 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' 
                    : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'}
                `}
              >
                <motion.span 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center"
                >
                  {item.icon}
                </motion.span>
                
                <AnimatePresence>
                  {isExpanded && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="ml-3"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Notification Badge */}
                {item.badge && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute right-3 top-3 bg-red-500 text-white text-xs 
                             font-bold rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    {item.badge}
                  </motion.div>
                )}

                {/* Tooltip */}
                {!isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="absolute left-full rounded-md px-3 py-2 ml-6 bg-gray-800 
                             text-sm text-white shadow-lg whitespace-nowrap z-50"
                  >
                    {item.name}
                  </motion.div>
                )}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* User Profile Section */}
        <motion.div 
          className="absolute bottom-20 left-0 right-0 border-t border-gray-700/50"
          animate={{ opacity: 1 }}
        >
          <div className="p-4">
            <div className="flex items-center space-x-3">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 
                          flex items-center justify-center flex-shrink-0 shadow-lg"
              >
                <FaUser className="text-white" />
              </motion.div>
              
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                  >
                    <h2 className="text-white font-medium">{userName}</h2>
                    <p className="text-sm text-gray-400 capitalize">{userRole}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Logout Button */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700/50"
          animate={{ opacity: 1 }}
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              localStorage.removeItem('userRole');
              localStorage.removeItem('token');
              navigate('/login');
            }}
            className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-300 
                     rounded-lg hover:bg-red-500 hover:text-white transition-colors
                     group"
          >
            <FaSignOutAlt className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" />
            <AnimatePresence>
              {isExpanded && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="ml-3"
                >
                  Logout
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default Sidebar;