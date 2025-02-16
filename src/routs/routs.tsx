import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children:[
            {path: "/login" , element:<Login />}
        ]
    }
])

const Routes : React.FC = ()=>{
    return <RouterProvider router={router} />
}

export default Routes