import { createBrowserRouter } from "react-router-dom";
import Login from "../components/auth/Login";
import ManagerDashboard from "../pages/ManagerDashboard";
import LandingPage from "../pages/LandingPage";
import EmployeeDashboard from "../pages/EmployeeDashboard";
import LeaveApplicationForm from "../components/leave/EmpLeaveApplicationPage";


const route = createBrowserRouter([
    {
        path:'/',
        element:<LandingPage/>,
    },
    {
        path:'/login',
        element:<Login/>
    },
    {
        path:'/manager/dashboard',
        element:<ManagerDashboard/>,
    },
    {
        path:'/employee/dashboard',
        element:<EmployeeDashboard/>
    },
    {
        path:'/employee/leave-form',
        element:<LeaveApplicationForm/>
    }
])


export default route