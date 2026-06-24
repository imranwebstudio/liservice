import { Outlet, useLocation } from "react-router-dom";
import HomeNav from "./pages/home/components/HomeNav";

const App = () => {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const isService = pathname === '/service';
  const hideNav = isHome || isService;

  return (
    <div>
      {!hideNav && <HomeNav />}
      <div>
        {!isHome && !isService && (
          <div id="whatsapp-widget">
            <a href="https://api.whatsapp.com/message/FI3L5HOJSGYBA1" target="_blank" rel="noreferrer">
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" />
            </a>
          </div>
        )}
        <Outlet />
      </div>
    </div>
  );
};

export default App;
