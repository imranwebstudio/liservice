import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../layout/Home";
import Register from "../pages/Register";
import ServiceCards from "../pages/service/Service";
import Dashboard from "../layout/Dashboard";
import AddServices from "../pages/dashboard/adminDashboard/AddServices";
import SingleOrder from "../pages/dashboard/userDashboard/SingleOrder";
import AddBalance from "../pages/dashboard/userDashboard/AddBalance";

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
            }
        ]
    },
    {
        path: "/dashboard",
        element: <Dashboard/>,
        children: [
            {
                path: "addService",
                element: <AddServices/>
            },
            {
                path: "manageOrders",
                element: <div>Manage Orders</div>
            },
            {
                path: "orderHistory",
                element: <div>Order History</div>
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