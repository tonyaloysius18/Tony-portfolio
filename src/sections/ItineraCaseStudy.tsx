import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Database,
  Layers3,
  Route,
  Smartphone,
} from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

const SCREENS = [
  {
    src: "/projects/itinera/trip_home.jpg",
    label: "01 · Trip home",
    title: "Every journey in one place",
    description: "Upcoming and previous trips stay organised in one shared home.",
  },
  {
    src: "/projects/itinera/traveller.jpg",
    label: "02 · Travellers",
    title: "Keep the travel crew in sync",
    description: "Invite travellers and keep everyone connected to the shared trip.",
  },
  {
    src: "/projects/itinera/trip_detail.jpg",
    label: "03 · Itinerary",
    title: "Build the trip together",
    description: "A day-by-day plan keeps each stop in the right order for the group.",
  },
  {
    src: "/projects/itinera/calender.jpg",
    label: "04 · Calendar",
    title: "See the journey day by day",
    description: "Flights, trains and activities stay organised chronologically across the trip.",
  },
  {
    src: "/projects/itinera/checklist.jpg",
    label: "05 · Checklist",
    title: "Remember what to pack",
    description: "A trip checklist keeps documents, essentials and travel gear ready before departure.",
  },
  {
    src: "/projects/itinera/document.jpg",
    label: "06 · Documents",
    title: "Keep every ticket close",
    description: "Tickets and travel documents remain available inside their trip.",
  },
  {
    src: "/projects/itinera/expense.jpg",
    label: "07 · Expenses",
    title: "Split costs without friction",
    description: "Group expenses provide a clear balance for every traveller.",
  },
  {
    src: "/projects/itinera/currency.jpg",
    label: "08 · Currency",
    title: "Understand spending anywhere",
    description: "Convert currencies and keep international spending easier to understand while travelling.",
  },
];

const PRINCIPLES = [
  "One shared source of truth for the group",
  "Fast access to plans and documents while travelling",
  "Clear ownership and balances for shared expenses",
];

const ARCHITECTURE = [
  {
    icon: Layers3,
    eyebrow: "Shared foundation",
    title: "Kotlin Multiplatform",
    description: "Shared product logic keeps the core experience consistent across Android and iOS.",
  },
  {
    icon: Smartphone,
    eyebrow: "Platform experience",
    title: "Compose + SwiftUI",
    description: "Each interface keeps the interaction patterns and integrations users expect from its platform.",
  },
  {
    icon: Database,
    eyebrow: "Connected product",
    title: "Firebase",
    description: "Trips, documents and group expenses stay connected for the people travelling together.",
  },
];

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 32 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.72, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export default function ItineraCaseStudy() {
  const [activeScreen, setActiveScreen] = useState(0);
  const [hoveredScreen, setHoveredScreen] = useState<number | null>(null);
  const wheelLockedRef = useRef(false);
  const pointerStartXRef = useRef<number | null>(null);
  const tabListRef = useRef<HTMLDivElement>(null);
  const reduceMotion = Boolean(useReducedMotion());
  const previewIndex = hoveredScreen ?? activeScreen;
  const screen = SCREENS[previewIndex];
  const relativePosition = (index: number) => {
    let difference = index - previewIndex;
    if (difference > SCREENS.length / 2) difference -= SCREENS.length;
    if (difference < -SCREENS.length / 2) difference += SCREENS.length;
    return difference;
  };

  const previewScreen = (index: number) => {
    if (index === previewIndex) return;
    setHoveredScreen(index);
  };

  const selectScreen = (index: number) => {
    setHoveredScreen(null);
    setActiveScreen(index);
  };

  const clearPreview = () => {
    setHoveredScreen(null);
  };

  const moveCarousel = (direction: number) => {
    setHoveredScreen(null);
    setActiveScreen((current) => (current + direction + SCREENS.length) % SCREENS.length);
  };

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Itinera Case Study — Tony Aloysius";
    window.scrollTo({ top: 0, behavior: "auto" });
    return () => {
      document.title = previousTitle;
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(min-width: 1024px)").matches) return;
    const activeTab = tabListRef.current?.querySelector<HTMLElement>(
      `[role="tab"][data-screen-index="${activeScreen}"]`,
    );
    activeTab?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeScreen, reduceMotion]);

  return (
    <main className="min-h-screen overflow-x-clip bg-[#080909] text-[#D7E2EA]">
      <nav className="sticky top-0 z-50 border-b border-[#D7E2EA]/10 bg-[#080909]/88 px-4 py-3 backdrop-blur-xl sm:px-6 lg:px-10">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4">
          <a
            href="#projects"
            className="group inline-flex min-h-11 items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-[#D7E2EA]/68 transition-colors hover:text-[#D7E2EA]"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to projects
          </a>
          <span className="hidden text-xs uppercase tracking-[0.18em] text-[#D7E2EA]/40 sm:block">
            Product case study · 01
          </span>
        </div>
      </nav>

      <section className="relative px-4 pb-16 pt-12 sm:px-6 sm:pb-24 sm:pt-20 lg:px-10">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[760px] -translate-x-1/2 rounded-full bg-[#7621B0]/12 blur-[130px]" />
        <div className="relative mx-auto max-w-[1500px]">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-end"
          >
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#B600A8] sm:text-sm">
                Personal product · Android & iOS
              </p>
              <h1 className="mt-5 text-[clamp(4rem,12vw,9rem)] font-black uppercase leading-[0.82] tracking-[0.035em]">
                Itinera
              </h1>
              <p className="mt-7 max-w-xl text-lg font-light leading-relaxed text-[#D7E2EA]/66 sm:text-xl">
                A cross-platform travel companion for shared itineraries, ticket storage and group expenses.
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {['Kotlin Multiplatform', 'Compose', 'SwiftUI', 'Firebase'].map((item) => (
                  <span key={item} className="rounded-full border border-[#D7E2EA]/18 px-3 py-2 text-[10px] uppercase tracking-[0.12em] text-[#D7E2EA]/62 sm:text-xs">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-[26px] border border-[#D7E2EA]/18 bg-[#0C0C0C] shadow-[0_36px_110px_rgba(0,0,0,0.5)] sm:rounded-[36px]">
              <img src="/projects/itinera/feature_graphic.jpg" alt="Itinera product banner" className="block h-auto w-full" />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-[#D7E2EA]/10 bg-[#0C0C0C] px-4 py-16 sm:px-6 sm:py-24 lg:px-10">
        <Reveal className="mx-auto grid max-w-[1300px] gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-[#B600A8]">The challenge</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.035em] sm:text-5xl">
              Group travel creates scattered information.
            </h2>
          </div>
          <div>
            <p className="text-lg font-light leading-relaxed text-[#D7E2EA]/66 sm:text-2xl sm:leading-relaxed">
              Plans live in messages, tickets stay in different inboxes, and shared costs are remembered by different people. Itinera brings those essential parts of a trip into one focused product.
            </p>
            <ul className="mt-9 grid gap-3">
              {PRINCIPLES.map((principle) => (
                <li key={principle} className="flex items-center gap-3 border-t border-[#D7E2EA]/12 py-4 text-sm text-[#D7E2EA]/76 sm:text-base">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-[#9A4DCC]" />
                  {principle}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-28 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <Reveal className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-[#B600A8]">Explore the product</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-5xl">One trip, one continuous flow.</h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-[#D7E2EA]/55 sm:text-base">
              Select each stage to move through the core journey.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 lg:grid-cols-[0.7fr_1.3fr] lg:gap-8">
            <div
              ref={tabListRef}
              className="order-2 flex snap-x snap-mandatory gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:order-1 lg:grid lg:overflow-visible lg:pb-0"
              role="tablist"
              aria-label="Itinera product flow"
              onMouseLeave={clearPreview}
              onBlurCapture={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                  clearPreview();
                }
              }}
            >
              {SCREENS.map((item, index) => (
                <button
                  key={item.src}
                  type="button"
                  role="tab"
                  data-screen-index={index}
                  aria-selected={activeScreen === index}
                  onClick={() => selectScreen(index)}
                  onMouseEnter={() => previewScreen(index)}
                  onFocus={() => previewScreen(index)}
                  className={`min-h-16 min-w-[158px] snap-center rounded-[18px] border px-4 py-3 text-left transition-[border-color,background-color,transform,opacity] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9A4DCC] lg:min-w-0 lg:px-5 lg:py-3.5 ${
                    previewIndex === index
                      ? "translate-x-1 border-[#9A4DCC]/75 bg-[#7621B0]/14 opacity-100 shadow-[0_12px_42px_rgba(118,33,176,0.2)]"
                      : hoveredScreen !== null
                        ? "scale-[0.985] border-[#D7E2EA]/8 bg-[#D7E2EA]/[0.01] opacity-30"
                        : "border-[#D7E2EA]/12 bg-[#D7E2EA]/[0.018] opacity-100 hover:border-[#D7E2EA]/28"
                  }`}
                >
                  <span className="text-[10px] uppercase tracking-[0.16em] text-[#D7E2EA]/42">{item.label}</span>
                  <span className="mt-1 block text-base font-medium text-[#D7E2EA] sm:text-lg">{item.title}</span>
                </button>
              ))}
            </div>

            <div
              className="relative order-1 h-[min(52svh,480px)] min-h-[380px] cursor-grab touch-pan-y overflow-hidden rounded-[26px] border border-[#D7E2EA]/16 bg-[#0C0C0C] p-4 active:cursor-grabbing sm:min-h-[620px] sm:h-auto sm:p-6 lg:order-2"
              aria-live="polite"
              onWheel={(event) => {
                const horizontalGesture = Math.abs(event.deltaX) > Math.abs(event.deltaY);
                if (window.matchMedia("(max-width: 1023px)").matches && !horizontalGesture) return;
                const delta = horizontalGesture ? event.deltaX : event.deltaY;
                if (Math.abs(delta) < 18 || wheelLockedRef.current) return;
                event.preventDefault();
                wheelLockedRef.current = true;
                moveCarousel(delta > 0 ? 1 : -1);
                window.setTimeout(() => {
                  wheelLockedRef.current = false;
                }, 760);
              }}
              onPointerDown={(event) => {
                if (event.pointerType === "mouse" && event.button !== 0) return;
                pointerStartXRef.current = event.clientX;
              }}
              onPointerUp={(event) => {
                if (pointerStartXRef.current === null) return;
                const distance = event.clientX - pointerStartXRef.current;
                pointerStartXRef.current = null;
                if (Math.abs(distance) >= 52) moveCarousel(distance < 0 ? 1 : -1);
              }}
              onPointerCancel={() => {
                pointerStartXRef.current = null;
              }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(118,33,176,0.1),transparent_62%)]" />
              <div className="pointer-events-none absolute inset-x-[22%] top-[18%] h-[48%] rounded-full bg-[#7621B0]/5 blur-[90px]" />
              <span className="absolute left-1/2 top-5 z-30 -translate-x-1/2 whitespace-nowrap rounded-full border border-[#9A4DCC]/40 bg-[#7621B0]/12 px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-[#D7E2EA]/68">
                {screen.label}
              </span>

              <div
                className="absolute inset-x-3 bottom-[104px] top-12 sm:inset-x-6 sm:bottom-[118px] sm:top-14"
                style={{ perspective: "1100px", transformStyle: "preserve-3d" }}
              >
                {SCREENS.map((item, index) => {
                  const position = relativePosition(index);
                  const distance = Math.abs(position);
                  const isActive = position === 0;
                  const opacity = distance === 0 ? 1 : distance === 1 ? 0.72 : distance === 2 ? 0.4 : distance === 3 ? 0.18 : 0;

                  return (
                    <button
                      key={item.src}
                      type="button"
                      aria-label={isActive ? `${item.title}, current screen` : `Show ${item.title}`}
                      aria-pressed={isActive}
                      tabIndex={distance <= 2 ? 0 : -1}
                      onClick={() => selectScreen(index)}
                      className="absolute left-1/2 top-1/2 h-[68%] w-[42%] max-w-[270px] overflow-hidden rounded-[18px] border border-[#D7E2EA]/18 bg-[#080909] p-0 shadow-[0_24px_70px_rgba(0,0,0,0.55)] outline-none focus-visible:ring-2 focus-visible:ring-[#9A4DCC] sm:h-[78%] sm:w-[32%] lg:w-[29%]"
                      style={{
                        transform: `translate(-50%, -50%) translateX(calc(${position} * clamp(82px, 11vw, 150px))) translateZ(${-distance * 72}px) rotateY(${position * -34}deg) scale(${isActive ? 1 : Math.max(0.72, 0.88 - distance * 0.04)})`,
                        opacity,
                        zIndex: 20 - distance,
                        filter: `brightness(${isActive ? 1 : Math.max(0.46, 0.78 - distance * 0.1)})`,
                        pointerEvents: opacity === 0 ? "none" : "auto",
                        transition: reduceMotion
                          ? "none"
                          : "transform 780ms cubic-bezier(0.16, 1, 0.3, 1), opacity 520ms ease, filter 520ms ease",
                        transformStyle: "preserve-3d",
                      }}
                    >
                      <img src={item.src} alt="" draggable={false} className="h-full w-full select-none object-cover" />
                    </button>
                  );
                })}
              </div>

              <div className="absolute inset-x-4 bottom-5 z-30 text-center sm:inset-x-8 sm:bottom-6">
                <h3 className="text-lg font-semibold text-[#D7E2EA] sm:text-xl">{screen.title}</h3>
                <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-[#D7E2EA]/58 sm:text-base">{screen.description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#D7E2EA]/10 bg-[#0C0C0C] px-4 py-16 sm:px-6 sm:py-24 lg:px-10">
        <div className="mx-auto max-w-[1300px]">
          <Reveal>
            <div className="flex items-center gap-3 text-[#B600A8]">
              <Route className="h-5 w-5" />
              <p className="text-xs uppercase tracking-[0.22em]">Technical direction</p>
            </div>
            <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-[-0.035em] sm:text-5xl">
              Shared where it creates leverage. Native where it shapes the experience.
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {ARCHITECTURE.map((item, index) => (
              <Reveal key={item.title}>
                <article className="h-full rounded-[24px] border border-[#D7E2EA]/14 bg-[#D7E2EA]/[0.018] p-6 sm:p-8">
                  <item.icon className="h-6 w-6 text-[#9A4DCC]" />
                  <p className="mt-8 text-[10px] uppercase tracking-[0.18em] text-[#D7E2EA]/42">0{index + 1} · {item.eyebrow}</p>
                  <h3 className="mt-2 text-xl font-semibold sm:text-2xl">{item.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-[#D7E2EA]/58 sm:text-base">{item.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 sm:py-32 lg:px-10">
        <Reveal className="mx-auto max-w-[1100px] rounded-[30px] border border-[#D7E2EA]/18 bg-[linear-gradient(135deg,rgba(182,0,168,0.12),rgba(118,33,176,0.16))] p-7 text-center sm:rounded-[42px] sm:p-14">
          <p className="text-xs uppercase tracking-[0.22em] text-[#D7E2EA]/48">Have a mobile product in mind?</p>
          <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-semibold tracking-[-0.04em] sm:text-6xl">Let’s turn the idea into a focused product.</h2>
          <a href="#contact" className="mt-9 inline-flex min-h-14 items-center gap-3 rounded-full bg-[#D7E2EA] px-7 text-sm font-semibold uppercase tracking-[0.12em] text-[#080909] transition-transform hover:-translate-y-1">
            Start a conversation
            <ArrowUpRight className="h-5 w-5" />
          </a>
        </Reveal>
      </section>
    </main>
  );
}
