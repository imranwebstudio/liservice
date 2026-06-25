import "./home.css";
import { useTheme } from "../../utils/ThemeContext";
import HomeNav from "./components/HomeNav";
import HomeFooter from "./components/HomeFooter";
import HeroSection from "./sections/HeroSection";
import TickerSection from "./sections/TickerSection";
import ServicesPreviewSection from "./sections/ServicesPreviewSection";
import WhyUsSection from "./sections/WhyUsSection";
import HowItWorksSection from "./sections/HowItWorksSection";
import FaqSection from "./sections/FaqSection";
import CtaSection from "./sections/CtaSection";

const HomePage = () => {
  const { isDark } = useTheme();

  return (
    <div
      className={`home-page${isDark ? "" : " home-light"}`}
      style={{
        background: "var(--site-bg)",
        color: "var(--site-t0)",
        fontFamily: "'Inter', sans-serif",
        overflowX: "hidden",
        minHeight: "100vh",
        transition: "background 0.3s ease, color 0.3s ease",
      }}
    >
      <div id="whatsapp-widget">
        <a href="https://wa.link/oq18jw" target="_blank" rel="noreferrer">
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" />
        </a>
      </div>
      <HomeNav />
      <HeroSection />
      <TickerSection />
      <ServicesPreviewSection />
      <WhyUsSection />
      <HowItWorksSection />
      <FaqSection />
      <CtaSection />
      <HomeFooter />
    </div>
  );
};

export default HomePage;
