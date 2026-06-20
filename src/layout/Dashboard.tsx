import { useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import { CgClose } from "react-icons/cg";
import { FiMenu } from "react-icons/fi";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="min-h-screen bg-base-200/40 flex">
            {/* Mobile Backdrop */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
                />
            )}

            <div id="whatsapp-widget">
                <a href="https://api.whatsapp.com/message/FI3L5HOJSGYBA1" target="_blank" rel="noreferrer">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" />
                </a>
            </div>

            {/* Sidebar */}
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

            {/* Main Content */}
            <main className="flex-1 min-w-0 flex flex-col">
                {/* Mobile Top Bar */}
                <div className="lg:hidden sticky top-0 z-20 bg-base-100 border-b border-base-200 px-4 h-14 flex items-center gap-3 shadow-sm">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="btn btn-ghost btn-sm btn-square"
                        aria-label="Toggle sidebar"
                    >
                        {isOpen ? <CgClose className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
                    </button>
                    <span className="font-semibold text-sm tracking-tight">
                        Li Service <span className="text-primary">24</span>
                    </span>
                </div>

                <div className="flex-1 p-4 md:p-6">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
