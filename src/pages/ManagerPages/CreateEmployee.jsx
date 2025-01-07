import React, { useState } from 'react';
import api from '../../service/api';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import ManagerTopBar from './ManagerTopBar';

const CreateEmployee = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    user_type: 'employee', // Default user type
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await api.post('/api/employees/', formData); // Adjust the endpoint as needed
      if (response.status === 201) {
        toast.success('Employee created successfully!');
        navigate('/manager/employees'); // Redirect to employee list or another page
      } else {
        toast.error(response.data.error || 'An error occurred. Please try again later.');
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ManagerTopBar /> {/* Include the ManagerTopBar */}
      <div className="flex-1 p-4">
        <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 shadow-sm">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Create Employee
            </h1>
          </div>
        </div>
        <div className="container mx-auto p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-white font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                placeholder="Enter employee name"
              />
            </div>
            <div>
              <label className="block text-sm text-white font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                placeholder="Enter employee email"
              />
            </div>
            <div>
              <label className="block text-sm text-white font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                placeholder="Enter employee password"
              />
            </div>
            <div>
              <label className="block text-sm text-white font-medium">User Type</label>
              <select
                name="user_type"
                value={formData.user_type}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
              >
                <option value="employee">Employee</option>
                <option value="manager">Manager</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="mt-4 w-full p-2 bg-blue-600 text-white rounded"
            >
              {isLoading ? 'Creating...' : 'Create Employee'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEmployee;