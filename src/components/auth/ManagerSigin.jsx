import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserTie, FaSignOutAlt, FaLock, FaEnvelope, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import api from '../../service/api';  // Assuming this is your API service
import { useAuth } from '../../context/AuthContext';

const ManagerSignUp = () => {
  const navigate = useNavigate();
  const { user, loading, register } = useAuth();  // Assuming you have a register function for signing up

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',  // For confirming password
  });
  const [isLoading, setIsLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Password validation
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\S).{6,}$/;

    if (!passwordRegex.test(formData.password)) {
      toast.error("Password must be at least 6 characters, include one uppercase, one lowercase letter, and no whitespace.");
      setIsLoading(false);
      return;
    }

    // Email validation regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Invalid email address.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await register(formData.email, formData.password, 'manager');
      if (response.success) {
        toast.success('Sign-up successful!');
        navigate('/login');
      } else {
        toast.error(response.error || 'An error occurred. Please try again later.');
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex">
      {/* Left Panel - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gray-900 via-black-900 to-gray-900 
                      p-12 flex-col justify-between relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-5xl font-bold text-white mb-6">
            Leave Management System
          </h1>
          <p className="text-xl text-gray-300">
            Streamline your leave requests and approvals with our comprehensive management system
          </p>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-blue-900/30 to-black/50" />
        <div className="absolute inset-0 backdrop-blur-3xl" />
        
        {/* Feature List */}
        <div className="relative z-10">
          <h3 className="text-2xl font-semibold text-white mb-4">Key Features</h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-center">
              <FaArrowRight className="mr-2 text-blue-400" /> Easy Leave Application
            </li>
            <li className="flex items-center">
              <FaArrowRight className="mr-2 text-blue-400" /> Quick Approval Process
            </li>
            <li className="flex items-center">
              <FaArrowRight className="mr-2 text-blue-400" /> Real-time Status Updates
            </li>
          </ul>
        </div>
      </div>

      {/* Right Panel - Sign-Up Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          {/* Role Selector - Only Manager */}
          <div className="bg-gray-900/30 p-1 rounded-xl mb-8 backdrop-blur-xl border border-gray-800">
            <div className="grid grid-cols-1 gap-2">
              <button
                className="flex items-center justify-center px-6 py-3 rounded-lg transition-all
                           bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30"
              >
                <FaUserTie className="mr-2" />
                Manager
              </button>
            </div>
          </div>

          {/* Sign-Up Form */}
          <div className="bg-gray-900/30 p-8 rounded-2xl backdrop-blur-xl border border-gray-800 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Create Your Account</h2>
              <p className="text-gray-400">
                Sign up as a manager
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-300">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="block w-full pl-10 pr-4 py-3 border border-gray-700 rounded-lg
                             bg-gray-800/50 text-white placeholder-gray-400
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                             transition-all duration-300"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-300">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="block w-full pl-10 pr-4 py-3 border border-gray-700 rounded-lg
                             bg-gray-800/50 text-white placeholder-gray-400
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                             transition-all duration-300"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-300">Confirm Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    className="block w-full pl-10 pr-4 py-3 border border-gray-700 rounded-lg
                             bg-gray-800/50 text-white placeholder-gray-400
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                             transition-all duration-300"
                    placeholder="Confirm your password"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-lg text-white text-lg font-semibold
                         bg-gradient-to-r from-blue-500 to-blue-600
                         hover:from-blue-600 hover:to-blue-700
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                         transform hover:scale-105 transition-all duration-300
                         disabled:opacity-50 disabled:cursor-not-allowed
                         shadow-lg shadow-blue-500/30"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing up...
                  </span>
                ) : (
                  'Sign up'
                )}
              </button>
            </form>
          </div>
          <div className="mt-4 text-center">
            <Link
              to="/login"
              className="text-gray-400 hover:text-white text-sm flex items-center justify-center gap-2"
            >
              <FaSignOutAlt className="w-4 h-4" />
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerSignUp;
