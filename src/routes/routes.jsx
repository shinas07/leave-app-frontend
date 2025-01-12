import { createBrowserRouter, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Login from "../components/auth/Login";
import ManagerDashboard from "../pages/ManagerPages/ManagerDashboard";
import LandingPage from "../pages/LandingPage";
import EmployeeDashboard from "../pages/EmployeePages/EmployeeDashboard";
import LeaveApplicationForm from "../components/leave/EmpLeaveApplicationPage";
import LeaveHistory from "../components/leave/EmpLeaveHistory";
import CreateEmployee from "../pages/ManagerPages/CreateEmployee";
import LeaveRequests from "../pages/ManagerPages/LeaveRequests";
import AllEmployees from "../pages/ManagerPages/AllEmployees";
import ManagerSignUp from "../components/auth/ManagerSigin";

const ProtectedLoggedInRoute = ({ element }) => {
  const { user } = useAuth();
  
  if (user) {
    return user.user_type === 'manager' 
      ? <Navigate to="/manager/dashboard" /> 
      : <Navigate to="/employee/dashboard" />;
  }
  return element;
};

// Protected route for manager-only pages
const ProtectedManagerRoute = ({ element }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  if (user.user_type !== 'manager') {
    return <Navigate to="/employee/dashboard" />;
  }
  
  return element;
};

// Protected route for employee-only pages
const ProtectedEmployeeRoute = ({ element }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  if (user.user_type !== 'employee') {
    return <Navigate to="/manager/dashboard" />;
  }
  
  return element;
};

const route = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/manager/signup',
    element: <ProtectedLoggedInRoute element={<ManagerSignUp />} />,
  },
  {
    path: '/login',
    element: <ProtectedLoggedInRoute element={<Login />} />,
  },
  // Employee routes
  {
    path: '/employee/dashboard',
    element: <ProtectedEmployeeRoute element={<EmployeeDashboard />} />,
  },
  {
    path: '/employee/leave-form',
    element: <ProtectedEmployeeRoute element={<LeaveApplicationForm />} />,
  },
  {
    path: '/employee/leave-history',
    element: <ProtectedEmployeeRoute element={<LeaveHistory />} />,
  },
  // Manager routes
  {
    path: '/manager/dashboard',
    element: <ProtectedManagerRoute element={<ManagerDashboard />} />,
  },
  {
    path: '/manager/add-employee',
    element: <ProtectedManagerRoute element={<CreateEmployee />} />,
  },
  {
    path: '/manager/leave-requests',
    element: <ProtectedManagerRoute element={<LeaveRequests />} />,
  },
  {
    path: '/manager/employees',
    element: <ProtectedManagerRoute element={<AllEmployees />} />,
  },
]);

export default route;