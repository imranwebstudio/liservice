import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Nav from "../components/Nav";

const Dashboard = () => {
    return (
        <div className="flex gap-6">
            <div className="z-10 w-[20%] h-screen">
                <div className="absolute w-full z-30">
                    <Nav />
                </div>
                <div className="mt-20">
                    <Sidebar />
                </div>

            </div>
            <div className="z-0 w-[76%] mt-28">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
