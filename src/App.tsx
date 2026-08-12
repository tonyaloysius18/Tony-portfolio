import { useEffect, useState } from "react";
import HeroSection from "./sections/HeroSection";
import MarqueeSection from "./sections/MarqueeSection";
import AboutSection from "./sections/AboutSection";
import ServicesSection from "./sections/ServicesSection";
import ProjectsSection from "./sections/ProjectsSection";
import ContactSection from "./sections/ContactSection";
import ItineraCaseStudy from "./sections/ItineraCaseStudy";

function App() {
  const [location, setLocation] = useState(() => ({
    pathname: window.location.pathname,
    hash: window.location.hash,
  }));
  const { pathname, hash } = location;
  const isItineraCaseStudy =
    pathname === "/itinera-case-study" || hash === "#itinera-case-study";

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    const handleLocationChange = () => {
      setLocation({ pathname: window.location.pathname, hash: window.location.hash });
    };
    window.addEventListener("hashchange", handleLocationChange);
    window.addEventListener("popstate", handleLocationChange);
    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
      window.removeEventListener("hashchange", handleLocationChange);
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []);

  useEffect(() => {
    if (isItineraCaseStudy) return;
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
  }, [hash, isItineraCaseStudy]);

  if (isItineraCaseStudy) {
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
