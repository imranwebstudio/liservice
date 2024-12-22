// import { Outlet } from "react-router-dom";
// import Nav from "../components/Nav";
import { useState } from "react";
import Sidebar from "../components/sidebar/sidebar";
import { Outlet } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { CgClose } from "react-icons/cg";

const Dashboard = () => {
    const [isOpen, setIsOpen] = useState(true)
    return (
        <div className={`grid gap-4 p-4  ${isOpen ? "grid-cols-[280px,_1fr]" : "grid-cols-[1fr]"}`}>

            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
            <div>
                <button onClick={() => setIsOpen(!isOpen)} className="sticky top-4 border text-xl rounded z-50 bg-white p-2">
                  {
                    isOpen ? <CgClose/> : <FiMenu/> 
                  }
                </button>
                <Outlet />

            </div>
        </div>
    );
};

export default Dashboard;
