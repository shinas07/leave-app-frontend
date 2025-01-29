import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FaCalendar, FaInfoCircle, FaArrowLeft } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Sidebar from '../../pages/EmployeePages/sidebar';
import api from '../../service/api';
import { toast } from 'sonner';

const LeaveApplicationForm = () => {
  const navigate = useNavigate();
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    // fetchHolidays();
  }, []);

  // const fetchHolidays = async () => {
  //   try {
  //     const response = await fetch('/api/holidays/');
  //     const data = await response.json();
  //     setHolidays(data);
  //   } catch (error) {
  //     console.error('Error fetching holidays:', error);
  //   }
  // };

  const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0; // Only Sunday is considered weekend for leave calculation
  };
  
  const isHoliday = (date) => {
    return holidays.some(holiday => 
      new Date(holiday.date).toDateString() === date.toDateString()
    );
  };
  
  const calculateWorkingDays = (start, end) => {
    if (!start || !end) return 0;
      
    let workDays = 0;
    const currentDate = new Date(start);
    const endDate = new Date(end);
      
    // Set both dates to midnight to ensure proper date comparison
    currentDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);
      
    // Include both start and end dates in the calculation
    while (currentDate <= endDate) {
      // Only count as workday if it's not a Sunday and not a holiday
      if (!isWeekend(currentDate) && !isHoliday(currentDate)) {
        workDays++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
      
    return workDays;
  };
  // Dynamically calculate the duration when startDate or endDate changes
  useEffect(() => {
    const startDate = watch('startDate');
    const endDate = watch('endDate');
    if (startDate && endDate) {
      const workingDays = calculateWorkingDays(startDate, endDate);
      setDuration(workingDays);
      setValue('duration', workingDays);
    }
  }, [watch('startDate'), watch('endDate')]);

  const validateReason = (value) => {
    if (!value.trim()) {
      return 'Reason cannot be empty or just whitespace.';
    }
    if (value.length < 10) {
      return 'Reason must be at least 10 characters.';
    }
    return true; // Return true if validation passes
  };


  const formatDateToISO = (date) => {
    if (!date) return null;
    // Create a new date object using the local date values
    const localDate = new Date(date);
    const year = localDate.getFullYear();
    const month = String(localDate.getMonth() + 1).padStart(2, '0');
    const day = String(localDate.getDate()).padStart(2, '0');
    
    // Return in YYYY-MM-DD format
    return `${year}-${month}-${day}`;
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Get the selected dates from the form data
      const startDate = data.startDate;
      const endDate = data.endDate;

      // Create the payload with properly formatted dates
      const payload = {
        leave_type: data.leaveType,
        reason: data.reason,
        start_date: formatDateToISO(startDate),
        end_date: formatDateToISO(endDate),
        duration: duration
      };


      // Make the API call
      const response = await api.post('api/apply-leave/', payload);

      if (response.status === 201) {
        toast.success('Leave application submitted successfully!');
        navigate('/employee/leave-history');
      } else {
        const errorMessage = response.data?.error || 'Failed to submit leave application. Please try again.';
        toast.error(errorMessage);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'An error occurred while submitting the leave application.';
      toast.info(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  
  // const onSubmit = async (data) => {
  //   setLoading(true);

    
  //   try {
  //     const payload = {
  //       leave_type: data.leaveType,
  //       reason: data.reason,
  //       start_date: data.startDate.toISOString().split('T')[0],
  //       end_date: data.endDate.toISOString().split('T')[0],
  //       duration: duration
  //     };
  //     console.log(payload)
  //     // Make the API call with the Authorization header
  //     // const response = await api.post('api/apply-leave/', payload,);
  

  //     if (response.status === 201) {
  //       toast.success('Leave application submitted successfully!');
  //       navigate('/employee/leave-history')
  //     } else {
  //       // Handle error response from the backend
  //       const errorMessage = response.data.error || 'Failed to submit leave application. Please try again.';
  //       toast.error(errorMessage);
  //     }
  //   } catch (error) {
  //     // Check if the error response has a message
  //     if (error.response && error.response.data && error.response.data.error) {
  //       toast.info(error.response.data.error); // Show the error message from the backend
  //     } else {
  //       toast.error('An error occurred while submitting the leave application.');
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <Sidebar>
      <div className="p-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Apply for Leave</h1>
          <p className="text-gray-400 mt-2">Fill in the details below to submit your leave request</p>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-xl p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Leave Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Leave Type
                </label>
                <select
                  {...register('leaveType', { required: 'Leave type is required' })}
                  className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg
                           text-white focus:outline-none focus:ring-2 focus:ring-blue-500
                           transition-colors"
                >
                  <option value="">Select leave type</option>
                  <option value="annual">Annual Leave</option>
                  <option value="sick">Sick Leave</option>
                </select>
                {errors.leaveType && (
                  <p className="mt-1 text-sm text-red-500">{errors.leaveType.message}</p>
                )}
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Duration (Working Days)
                </label>
                <input
                  type="number"
                  value={duration}
                  readOnly
                  className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg
                           text-white focus:outline-none focus:ring-2 focus:ring-blue-500
                           transition-colors"
                />
              </div>
            </div>

            {/* Date Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Start Date
                </label>
                <div className="relative">
                  <DatePicker
                    selected={watch('startDate')}
                    onChange={(date) => setValue('startDate', date)}
                    className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg
                             text-white focus:outline-none focus:ring-2 focus:ring-blue-500
                             transition-colors"
                    dateFormat="MMMM d, yyyy"
                    minDate={new Date()}
                    placeholderText="Select start date"
                  />
                  <FaCalendar className="absolute right-3 top-3 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  End Date
                </label>
                <div className="relative">
                  <DatePicker
                    selected={watch('endDate')}
                    onChange={(date) => setValue('endDate', date)}
                    className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg
                             text-white focus:outline-none focus:ring-2 focus:ring-blue-500
                             transition-colors"
                    dateFormat="MMMM d, yyyy"
                    minDate={watch('startDate') || new Date()}
                    placeholderText="Select end date"
                  />
                  <FaCalendar className="absolute right-3 top-3 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Reason */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Reason for Leave
              </label>
              <textarea
            {...register('reason', {
              required: 'Reason is required',
              minLength: { value: 10, message: 'At least 10 characters required' },
              maxLength: { value: 150, message: 'Maximum 150 characters allowed' }
            })}
            className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg
                      text-white focus:outline-none focus:ring-2 focus:ring-blue-500
                      transition-colors"
            placeholder="Enter a short reason (max 150 characters)"
          />
          {errors.reason && (
            <p className="mt-1 text-sm text-red-500">{errors.reason.message}</p>
          )}

            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate('/employee/dashboard')}
                className="px-6 py-2.5 border border-gray-600 text-gray-300 rounded-lg
                         hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2
                         focus:ring-gray-500 flex items-center"
              >
                <FaArrowLeft className="mr-2" />
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-2.5 bg-blue-600 text-white rounded-lg
                         hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2
                         focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed
                         flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : 'Submit Leave Request'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Sidebar>
  );
};

export default LeaveApplicationForm;
