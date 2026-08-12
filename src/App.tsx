import { lazy, Suspense, useEffect, useState } from "react";

const PortfolioHome = lazy(() => import("./PortfolioHome"));
const ItineraCaseStudy = lazy(() => import("./sections/ItineraCaseStudy"));

function RouteLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#080909] text-[#D7E2EA]">
      <div className="flex flex-col items-center gap-4" role="status" aria-label="Loading page">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-[#D7E2EA]/15 border-t-[#B600A8]" />
        <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#D7E2EA]/50">
          Loading Itinera
        </span>
      </div>
    </div>
  );
}

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

    let attempts = 0;
    let frame = 0;
    const scrollToTarget = () => {
      const target = document.getElementById(targetId);
      if (!target && attempts < 60) {
        attempts += 1;
        frame = requestAnimationFrame(scrollToTarget);
        return;
      }

      if (hash === "#projects") {
        const savedPosition = sessionStorage.getItem("portfolio:projects-scroll-position");
        if (savedPosition !== null) {
          sessionStorage.removeItem("portfolio:projects-scroll-position");
          window.scrollTo({ top: Number(savedPosition), behavior: "auto" });
          return;
        }
      }

      target?.scrollIntoView();
    };
    frame = requestAnimationFrame(scrollToTarget);

    return () => cancelAnimationFrame(frame);
  }, [hash, isItineraCaseStudy]);

  if (isItineraCaseStudy) {
    return (
      <Suspense fallback={<RouteLoading />}>
        <ItineraCaseStudy />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<RouteLoading />}>
      <PortfolioHome />
    </Suspense>
  );
}

export default App;
