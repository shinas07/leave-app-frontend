import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../components/HomePage";
import Login from "../components/auth/Login";


const route = createBrowserRouter([
    {
        path:'/',
        element:<HomePage/>,
    },
    {
        path:'/login',
        element:<Login/>
    }
])


export default route