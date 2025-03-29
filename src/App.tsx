import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";

const App = () => {
  return (
    <div>
      <Nav />
      <div className="">
        <div id="whatsapp-widget">
          <a href="https://api.whatsapp.com/message/FI3L5HOJSGYBA1" target="_blank">
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" />
          </a>
        </div>

       

        <Outlet />
      </div>

    </div>
  );
};

export default App;
