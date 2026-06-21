import { Outlet, useLocation } from "react-router-dom";
import Nav from "./components/Nav";

const App = () => {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const isService = pathname === '/service';
  const hideNav = isHome || isService;

  return (
    <div>
      {!hideNav && <Nav />}
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
