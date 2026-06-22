import "./home.css";

import HomeNav from "./components/HomeNav";
import HomeFooter from "./components/HomeFooter";
import HeroSection from "./sections/HeroSection";
import TickerSection from "./sections/TickerSection";
import WhyUsSection from "./sections/WhyUsSection";
import HowItWorksSection from "./sections/HowItWorksSection";
import FaqSection from "./sections/FaqSection";
import CtaSection from "./sections/CtaSection";

const HomePage = () => (
  <div
    className="home-page"
    style={{
      background: "#070b09",
      color: "#f3fbf5",
      fontFamily: "'Inter', sans-serif",
      overflowX: "hidden",
      minHeight: "100vh",
    }}
  >
    <div id="whatsapp-widget">
      <a
        href="https://wa.link/oq18jw"
        target="_blank"
        rel="noreferrer"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
        />
      </a>
    </div>
    <HomeNav />
    <HeroSection />
    <TickerSection />
    <WhyUsSection />
    <HowItWorksSection />
    <FaqSection />
    <CtaSection />
    <HomeFooter />
  </div>
);

export default HomePage;
