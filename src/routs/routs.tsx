import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import ForgetPassword from "../pages/ForgetPassword";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import Details from "../pages/Details";
import Blogs from "../pages/Blogs";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: "true", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/forget-password", element: <ForgetPassword /> },
      {
        element: <PrivateRoute />,
        children: [{ path: "/dashboard", element: <Dashboard /> }],
      },
      { path: "/details", element: <Details /> },
      { path: "/blogs", element: <Blogs /> },
    ],
  },
]);

const Routes: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
