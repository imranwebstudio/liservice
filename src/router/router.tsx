import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../layout/Home";
import Register from "../pages/Register";
import ServiceCards from "../pages/service/Service";
import Dashboard from "../layout/Dashboard";
import AddServices from "../pages/dashboard/adminDashboard/AddServices";
import AboutUs from "../pages/aboutUs/AboutUs";
import ManageService from "../pages/dashboard/adminDashboard/ManageService";
import ManageUser from "../pages/dashboard/adminDashboard/ManageUser";
import ManageOrders from "../pages/dashboard/adminDashboard/ManageOrders";
import ManageRecharges from "../pages/dashboard/adminDashboard/ManageRecharge";
import UserProfile from "../pages/user/UserProfile";
import PrivateRoute from "../privetRoutes/PrivateRoute";
import ResetPassword from "../pages/user/ResetPassword";
import UserDashboard from "../pages/dashboard/userDashboard/UserDashboard";
import TermsAndConditions from "../pages/TermsAndConditions";

const router = createBrowserRouter([
    {
        path: "/terms",
        element: <TermsAndConditions />
    },
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/service",
                element: <ServiceCards />
            },
            {
                path: "/about",
                element: <AboutUs />
            },
            {
                path: '/profile',
                element: <UserProfile />
            },
            {
                path: "/reset-password/:token",
                element: <ResetPassword />
            }
        ]
    },
    {
        path: "/dashboard",
        children: [
            {
                index: true,
                element: <PrivateRoute><UserDashboard /></PrivateRoute>
            },
            {
                element: <PrivateRoute><Dashboard /></PrivateRoute>,
                children: [
                    {
                        path: "addService",
                        element: <AddServices />,
                    },
                    {
                        path: "manageOrders",
                        element: <ManageOrders />,
                    },
                    {
                        path: "manageServices",
                        element: <ManageService />,
                    },
                    {
                        path: "manageUsers",
                        element: <ManageUser />,
                    },
                    {
                        path: "manageRecharges",
                        element: <ManageRecharges />,
                    },
                ]
            }
        ]
    },
    {
        path: "/register",
        element: <Register />
    }
])

export default router
