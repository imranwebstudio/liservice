import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Nav from "../components/Nav";

const Dashboard = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="z-10">
                <div className="absolute w-full z-30">
                    <Nav />
                </div>
                <div className="mt-16">
                    <Sidebar />
                </div>

            </div>
            <div className="z-0 mt-16">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
