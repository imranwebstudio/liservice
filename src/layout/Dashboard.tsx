import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div>
                <Sidebar />
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
