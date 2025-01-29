import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserTie, FaSignOutAlt, FaUsers, FaLock, FaEnvelope, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {  toast } from 'sonner';
import api from '../../service/api';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { user, loading, login} = useAuth()
 

  const [selectedRole, setSelectedRole] = useState('employee');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const isManager = selectedRole === 'manager';


  useEffect(() => {
    if (user) {
      if (user.user_type === 'manager') {
        navigate('/manager/dashboard');
      } else {
        navigate('/employee/dashboard');
      }
    }
  }, [user, navigate]);


const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await login(formData.email, formData.password, selectedRole);
      if (response.success) {
        toast.success('Login successful!');
        navigate(selectedRole === 'manager' ? '/manager/dashboard' : '/employee/dashboard');
      } else {
        toast.error(response.error || 'An error occurred. Please try again later.');
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleManagerSignUp = () => {
    // Navigate to the manager sign-up page
    navigate('/manager/signup'); // Update with your actual route for manager sign-up
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
        
        {/* Decorative Elements - Darker overlay */}
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

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          {/* Role Selector */}
          <div className="bg-gray-900/30 p-1 rounded-xl mb-8 backdrop-blur-xl border border-gray-800">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setSelectedRole('employee')}
                className={`flex items-center justify-center px-6 py-3 rounded-lg transition-all
                           ${selectedRole === 'employee'
                             ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30'
                             : 'text-gray-400 hover:text-white'
                           }`}
              >
                <FaUsers className="mr-2" />
                Employee
              </button>
              <button
                onClick={() => setSelectedRole('manager')}
                className={`flex items-center justify-center px-6 py-3 rounded-lg transition-all
                           ${selectedRole === 'manager'
                             ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30'
                             : 'text-gray-400 hover:text-white'
                           }`}
              >
                <FaUserTie className="mr-2" />
                Manager
              </button>
            </div>
          </div>

          {/* Login Form */}
          <div className="bg-gray-900/30 p-8 rounded-2xl backdrop-blur-xl border border-gray-800 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
              <p className="text-gray-400">
                Sign in as {selectedRole === 'manager' ? 'a manager' : 'an employee'}
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
                    Signing in...
                  </span>
                ) : (
                  'Sign in'
                )}
              </button>
                {/* Conditionally render manager sign-up link */}
        {isManager && (
          <div className="mt-4 text-center">
            <span className="text-sm text-gray-400">Don't have an account? </span>
            <button
              onClick={handleManagerSignUp}
              className="text-blue-500 hover:underline"
            >
              Sign up as Manager
            </button>
          </div>
        )}

            {/* Employee-created text */}
            {selectedRole === 'employee' && (
          <div className="mt-4 text-center text-gray-400">
            <p className="text-sm">Employee created by Manager</p>
          </div>
        )}


            </form>
          </div>
          <div className="mt-4 text-center">
          <Link 
            to="/" 
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

export default Login;