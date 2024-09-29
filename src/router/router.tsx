import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../layout/Home";
import Register from "../pages/Register";
import ServiceCards from "../pages/service/Service";
import Dashboard from "../layout/Dashboard";
import AddServices from "../pages/dashboard/adminDashboard/AddServices";
import SingleOrder from "../pages/dashboard/userDashboard/SingleOrder";
import AddBalance from "../pages/dashboard/userDashboard/AddBalance";
import State from "../components/State";
import AboutUs from "../pages/aboutUs/AboutUs";
import OrderHistory from "../pages/dashboard/userDashboard/OrderHistory";
import PaymentPage from "../pages/dashboard/userDashboard/PaymentPage";
import RechargeHistory from "../pages/dashboard/userDashboard/RechargeHistory";
import ManageService from "../pages/dashboard/adminDashboard/ManageService";
import ManageUser from "../pages/dashboard/adminDashboard/ManageUser";
import ManageOrders from "../pages/dashboard/adminDashboard/ManageOrders";
import ManageRecharges from "../pages/dashboard/adminDashboard/ManageRecharge";

const router = createBrowserRouter([
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
                element: <AboutUs/>
            },
            {
                path: '/payment',
                element: <PaymentPage/>
            }
        ]
    },
    {
        path: "/dashboard",
        element: <Dashboard/>,
        children: [
            {
                index: true,
                element: <State/>
            },
            {
                path: "addService",
                element: <AddServices/>
            },
            {
                path: "manageOrders",
                element: <ManageOrders />
            },
            {
                path: "manageServices",
                element: <ManageService/>
            },
            {
                path: "manageUsers",
                element: <ManageUser/>
            },
            {
                path: "manageRecharges",
                element: <ManageRecharges/>
            },
            {
                path: "services",
                element: <ServiceCards/>
            },
            {
                path: "orderHistory",
                element: <OrderHistory/>
            },
            {
                path: "rechargeHistory",
                element: <RechargeHistory/>
            },
            {
                path: "singleOrder",
                element: <SingleOrder/>
            },
            {
                path: "addBalance",
                element: <AddBalance/>
            }
        ]
    }
    ,
    {
        path: "/register",
        element: <Register/>
    }
])

export default router