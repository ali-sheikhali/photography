import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import ForgetPassword from "../pages/ForgetPassword";
import Dashboard from "../pages/Dashboard"
import Home from "../pages/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children:[
            {path: "/login" , element:<Login />},
            {path: "/forget-password" , element:<ForgetPassword />},
            {path: "/dashboard" , element:<Dashboard />},
            {path: "/home" , element:<Home />},
        ]
    }
])

const Routes : React.FC = ()=>{
    return <RouterProvider router={router} />
}

export default Routes