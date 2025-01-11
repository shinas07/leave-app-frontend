import { createBrowserRouter } from "react-router-dom";
import Login from "../components/auth/Login";
import ManagerDashboard from "../pages/ManagerPages/ManagerDashboard";
import LandingPage from "../pages/LandingPage";
import EmployeeDashboard from "../pages/EmployeePages/EmployeeDashboard";
import LeaveApplicationForm from "../components/leave/EmpLeaveApplicationPage";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import LeaveHistory from "../components/leave/EmpLeaveHistory";
import CreateEmployee from "../pages/ManagerPages/CreateEmployee";
import LeaveRequests from "../pages/ManagerPages/LeaveRequests";
import AllEmployees from "../pages/ManagerPages/AllEmployees";

const ProtectedRoute = ({ element }) => {
    const { user} = useAuth()
  
    if (user) {
      // Redirect based on user role
      return user.user_type === 'manager' ? <Navigate to="/manager/dashboard" /> : <Navigate to="/employee/dashboard" />;
    }

    return element;
  };


const route = createBrowserRouter([
    {
        path:'/',
        element:<LandingPage/>,
    },
    {
        path:'/login',
        element: <ProtectedRoute element={<Login />} />
    },
 
    {
        path:'/employee/dashboard',
        element:<EmployeeDashboard/>
    },
    {
        path:'/employee/leave-form',
        element:<LeaveApplicationForm/>
    },
    {
        path: '/employee/leave-history', // Add route for Leave History
        element: <LeaveHistory />
    },
    {
        path:'/manager/dashboard',
        element:<ManagerDashboard/>,
    },
    {
        path: '/manager/add-employee', // Add route for Create Employee
        element:<CreateEmployee/>
    },
    {
        path:'/manager/leave-requests',
        element:<LeaveRequests/>
    },
    {
        path:'/manager/employees',
        element:<AllEmployees/>
    }
])


export default route