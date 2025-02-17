import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import ForgetPassword from "../pages/ForgetPassword";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children:[
            {path: "/login" , element:<Login />},
            {path: "/forget-password" , element:<ForgetPassword />},
        ]
    }
])

const Routes : React.FC = ()=>{
    return <RouterProvider router={router} />
}

export default Routes