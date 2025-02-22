import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import ForgetPassword from "../pages/ForgetPassword";
import Dashboard from "../pages/Dashboard"

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children:[
            {path: "/login" , element:<Login />},
            {path: "/forget-password" , element:<ForgetPassword />},
            {path: "/dashboard" , element:<Dashboard />},
        ]
    }
])

const Routes : React.FC = ()=>{
    return <RouterProvider router={router} />
}

export default Routes