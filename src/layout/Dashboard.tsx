import { useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import { CgClose } from "react-icons/cg";
import { FiMenu } from "react-icons/fi";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseSidebar = () => {
      if (isOpen) setIsOpen(false);
  };

  return (
      <div className="relative">
          {/* Backdrop */}
          {isOpen && (
              <div
                  onClick={handleCloseSidebar}
                  className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
              ></div>
          )}
          
          <div id="whatsapp-widget">
          <a href="https://api.whatsapp.com/message/FI3L5HOJSGYBA1" target="_blank">
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" />
          </a>
        </div>

          <div className={`grid gap-4 p-4 ${isOpen ? "grid-cols-[280px,_1fr]" : "grid-cols-[1fr]"} lg:grid-cols-[280px,_1fr]`}>
              {/* Sidebar */}
              <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
              
              <div>
                  {/* Toggle Button */}
                  <button
                      onClick={() => setIsOpen(!isOpen)}
                      className={`lg:hidden sticky top-4   border text-xl rounded z-50 bg-white p-2 ${isOpen ? "left-[19rem]" : "left-4"}`}
                  >
                      {isOpen ? <CgClose /> : <FiMenu />}
                  </button>
                  
                  {/* Main Content */}
                  <br />
                  <br />
                  <Outlet />
              </div>
          </div>
      </div>
  );
};

export default Dashboard;
