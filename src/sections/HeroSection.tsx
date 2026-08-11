import { ArrowUpRight, ArrowDown } from "lucide-react";
import FadeIn from "../components/FadeIn";
import Magnet from "../components/Magnet";

const NAV_LINKS = ["About", "Services", "Projects"];

const PORTRAIT_URL = "/portrait.png";

export default function HeroSection() {
  return (
      <section
          className="relative flex min-h-[100svh] flex-col"
          style={{ overflowX: "clip" }}
      >
        <FadeIn
            as="nav"
            delay={0}
            y={-20}
            className="flex items-center justify-between px-6 md:px-10 py-5 md:py-6 border-b border-[#D7E2EA]/15"
        >
          <a href="#" className="font-black text-lg md:text-xl text-[#D7E2EA] tracking-tight">
            TA.
          </a>

          <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map((link, i) => (
                <span key={link} className="flex items-center gap-8">
              <a
                  href={`#${link.toLowerCase()}`}
                  className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm hover:opacity-70 transition-opacity duration-200"
              >
                {link}
              </a>
                  {i < NAV_LINKS.length - 1 && (
                      <span className="w-1 h-1 rounded-full bg-[#D7E2EA]/50" />
                  )}
            </span>
            ))}
          </div>

          <a
              href="#contact"
              className="border border-[#D7E2EA]/40 text-[#D7E2EA] uppercase tracking-wider text-xs sm:text-sm font-medium px-4 py-2 sm:px-5 sm:py-2.5 rounded-md hover:border-[#D7E2EA] transition-colors"
          >
            Contact
          </a>
        </FadeIn>

        <div className="relative flex min-h-0 flex-1 items-center justify-center px-6">
          <div
              className="pointer-events-none absolute left-1/2 top-1/2 h-[clamp(360px,min(55vw,70svh),680px)] w-[clamp(360px,min(55vw,70svh),680px)] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(215,226,234,0.16) 0%, rgba(215,226,234,0) 70%)",
              }}
          />

          <FadeIn
              delay={0.15}
              y={40}
              className="absolute inset-x-0 top-[clamp(1rem,4svh,2.5rem)] z-20"
          >
            <h1
                className="hero-heading mx-6 md:mx-10 text-center uppercase leading-none whitespace-nowrap"
                style={{
                  fontFamily: '"Black Ops One", sans-serif',
                  fontSize: "clamp(2.5rem, min(14.5vw, 18svh), 190px)",
                  letterSpacing: "-0.015em",
                }}
            >
              hi, i&apos;m tony.
            </h1>
          </FadeIn>

          <FadeIn
              delay={0.4}
              y={30}
              className="absolute bottom-0 left-1/2 z-30 w-[clamp(195px,min(26vw,33svh),375px)] -translate-x-1/2"
          >
            <Magnet
                padding={150}
                strength={3}
                activeTransition="transform 0.3s ease-out"
                inactiveTransition="transform 0.6s ease-in-out"
            >
              <img
                  src={PORTRAIT_URL}
                  alt="Tony Aloysius"
                  className="w-full h-auto select-none pointer-events-none"
                  draggable={false}
              />
            </Magnet>
          </FadeIn>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 px-6 md:px-10 pb-8 md:pb-10">
          <FadeIn delay={0.5} y={20} className="flex flex-col gap-4">
            <p
                className="text-[#D7E2EA] font-light max-w-sm"
                style={{ fontSize: "clamp(0.95rem, 1.6vw, 1.15rem)" }}
            >
              Mobile app developer crafting fast, reliable Android and iOS experiences.
            </p>
            <p className="text-[#D7E2EA]/50 uppercase tracking-widest text-xs">
              Kotlin Multiplatform · Compose · REST API · Ktor
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-1">
              <a
                  href="#projects"
                  className="inline-flex items-center gap-2 bg-[#D7E2EA] text-[#0C0C0C] rounded-md px-6 py-3 uppercase tracking-wide text-xs sm:text-sm font-semibold hover:bg-white transition-colors"
              >
                View my work
                <ArrowUpRight size={16} strokeWidth={2.5} />
              </a>
            </div>
            <div className="flex items-center gap-2 text-[#D7E2EA]/70 text-xs sm:text-sm mt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Available for selected projects
            </div>
          </FadeIn>

          <FadeIn
              delay={0.6}
              y={20}
              className="flex flex-col items-start md:items-end gap-3 text-[#D7E2EA]/60 text-xs sm:text-sm"
          >
            <span>Based in France · Working worldwide</span>
            <span className="flex items-center gap-2 uppercase tracking-widest">
            Scroll to explore
            <ArrowDown size={14} />
          </span>
          </FadeIn>
        </div>
      </section>
  );
}