import { useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import { CgClose } from "react-icons/cg";
import { FiMenu } from "react-icons/fi";
import { Outlet } from "react-router-dom";
import "../pages/dashboard/dashboard.css";

const Dashboard = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="d-layout">
            {/* Mobile Backdrop */}
            {isOpen && (
                <div
                    className="d-backdrop lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* WhatsApp Widget */}
            <div id="whatsapp-widget">
                <a href="https://wa.link/oq18jw" target="_blank" rel="noreferrer">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" />
                </a>
            </div>

            {/* Sidebar */}
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

            {/* Main Content */}
            <main className="d-main">
                {/* Mobile Top Bar */}
                <div className="d-topbar">
                    <button
                        className="d-hamburger"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle sidebar"
                    >
                        {isOpen ? <CgClose /> : <FiMenu />}
                    </button>
                    <div className="d-topbar-logo">
                        <div className="d-topbar-logo-mark">L</div>
                        <span>Li Service<span style={{ color: '#34d97e' }}>24</span></span>
                    </div>
                </div>

                <div className="d-content">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
