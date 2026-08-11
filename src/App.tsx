import { useEffect, useState } from "react";
import HeroSection from "./sections/HeroSection";
import MarqueeSection from "./sections/MarqueeSection";
import AboutSection from "./sections/AboutSection";
import ServicesSection from "./sections/ServicesSection";
import ProjectsSection from "./sections/ProjectsSection";
import ContactSection from "./sections/ContactSection";
import ItineraCaseStudy from "./sections/ItineraCaseStudy";

function App() {
  const [hash, setHash] = useState(() => window.location.hash);

  useEffect(() => {
    const handleHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    if (hash === "#itinera-case-study") return;
    const targetId = hash.replace("#", "");
    if (!targetId) return;

    const frame = requestAnimationFrame(() => {
      if (hash === "#projects") {
        const savedPosition = sessionStorage.getItem("portfolio:projects-scroll-position");
        if (savedPosition !== null) {
          sessionStorage.removeItem("portfolio:projects-scroll-position");
          window.scrollTo({ top: Number(savedPosition), behavior: "auto" });
          return;
        }
      }

      document.getElementById(targetId)?.scrollIntoView();
    });

    return () => cancelAnimationFrame(frame);
  }, [hash]);

  if (hash === "#itinera-case-study") {
    return <ItineraCaseStudy />;
  }

  return (
    <div className="bg-[#0C0C0C]" style={{ overflowX: "clip" }}>
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
}

export default App;
