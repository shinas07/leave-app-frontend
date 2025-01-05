import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCalendarCheck, FaUserClock, FaChartBar, FaMobileAlt, FaShieldAlt, FaCheckCircle, FaHistory, FaCalendarPlus, FaClipboardCheck, FaClock, FaListAlt, FaEnvelope } from 'react-icons/fa';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="bg-gray-900 border-b border-gray-800 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <FaCalendarCheck className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold text-white">
                LeaveManager
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Animation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center animate-fadeIn">
          <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
            <span className="block">Smart Leave Management</span>
            <span className="block text-blue-400">Made Simple</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            A comprehensive solution for managing leave requests, approvals, and tracking - 
            all in one place.
          </p>
          <div className="mt-8">
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-4 text-lg font-medium rounded-lg text-white bg-blue-500 hover:bg-blue-600 
                         transform hover:scale-105 transition-all duration-300 shadow-2xl shadow-blue-500/20"
            >
              Get Started Now
            </button>
          </div>
        </div>
      </div>

      {/* Key Features Grid */}
      <div className="py-16 bg-gray-900/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Comprehensive Leave Management Solution
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<FaCalendarPlus />}
              title="Request Leave"
              description="Simple interface to apply for different types of leaves"
              color="blue"
            />
            <FeatureCard
              icon={<FaClipboardCheck />}
              title="Manager Approval"
              description="Efficient leave approval process by managers"
              color="green"
            />
            <FeatureCard
              icon={<FaClock />}
              title="Leave Status"
              description="Track your leave request status"
              color="purple"
            />
            <FeatureCard
              icon={<FaListAlt />}
              title="Leave Types"
              description="Annual, Sick, Personal, and more leave categories"
              color="yellow"
            />
            <FeatureCard
              icon={<FaHistory />}
              title="Leave History"
              description="View all your past and upcoming leave records"
              color="red"
            />
            <FeatureCard
              icon={<FaEnvelope />}
              title="Email Updates"
              description="Get notified when your leave status changes"
              color="indigo"
            />
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to streamline your leave management?</h2>
          <p className="text-gray-400 mb-8">Join organizations that trust LeaveManager for their leave management needs</p>
          <button
            onClick={() => navigate('/login')}
            className="px-8 py-3 text-lg font-medium rounded-lg text-white bg-gradient-to-r from-blue-500 to-blue-600 
                     hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300
                     shadow-2xl shadow-blue-500/20"
          >
            Start Managing Leaves →
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-400">
            © 2025 LeaveManager | Streamlining Leave Management
          </p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description, color }) => {
  const colorClasses = {
    blue: 'text-blue-400',
    green: 'text-green-400',
    purple: 'text-purple-400',
    yellow: 'text-yellow-400',
    red: 'text-red-400',
    indigo: 'text-indigo-400'
  };

  return (
    <div className="p-6 bg-gray-800/50 backdrop-blur rounded-lg border border-gray-700 
                    hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-105
                    shadow-2xl shadow-black/50">
      <div className={`text-2xl ${colorClasses[color]} mb-4`}>{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

export default LandingPage;