import { useRef } from "react";
import { type MotionValue, useScroll } from "framer-motion";
import { AppWindow, Boxes, Download, Layers3, PackageCheck } from "lucide-react";
import AnimatedText from "../components/AnimatedText";
import FadeIn from "../components/FadeIn";
import ProofCell from "../components/ProofCell";
import RevealHeading from "../components/RevealHeading";
import ScrollDrift from "../components/ScrollDrift";
import TechConveyor from "../components/TechConveyor";
import { ABOUT_TECHNOLOGIES } from "../data/techStack";

const ABOUT_TEXT =
    "I build focused mobile products with Kotlin Multiplatform, sharing the right code while keeping every screen fast and native-feeling. From product structure and Compose UI to REST integrations, testing, and store delivery, I take ideas through the full release cycle.";

const PROOF_ITEMS = [
  { value: "02", label: "Products built", icon: PackageCheck },
  { value: "Android + iOS", label: "Platforms delivered", icon: AppWindow },
  { value: "01", label: "Shared KMP codebase", icon: Layers3 },
  { value: "End to end", label: "Product delivery", icon: Boxes },
];

const DECORATIONS = [
  {
    src: "/about/crescent.png",
    side: "left" as const,
    slotClassName: "top-[clamp(2.5rem,5svh,4rem)]",
    sizeClassName: "w-[clamp(56px,72cqw,190px)] opacity-85",
    x: -140,
    delay: 0.1,
    parallax: { name: "crescent", range: [-5, 5] as [number, number] },
  },
  {
    src: "/about/code-brackets.svg",
    side: "left" as const,
    slotClassName: "bottom-[clamp(9rem,20svh,13rem)]",
    sizeClassName: "w-[clamp(56px,72cqw,170px)] opacity-80",
    x: -140,
    delay: 0.25,
  },
  {
    src: "/about/phone.svg",
    side: "right" as const,
    slotClassName: "top-[clamp(2.5rem,5svh,4rem)]",
    sizeClassName: "w-[clamp(50px,68cqw,145px)] opacity-85",
    x: 140,
    delay: 0.15,
  },
  {
    src: "/about/cursor.png",
    side: "right" as const,
    slotClassName: "bottom-[clamp(9rem,20svh,13rem)]",
    sizeClassName: "w-[clamp(56px,72cqw,175px)] opacity-85",
    x: 140,
    delay: 0.3,
    parallax: { name: "cursor", range: [10, -10] as [number, number] },
  },
];

function DecorationRail({
                          side,
                          progress,
                        }: {
  side: "left" | "right";
  progress: MotionValue<number>;
}) {
  return (
      <div className="relative [container-type:inline-size]">
        {DECORATIONS.filter((decoration) => decoration.side === side).map((decoration) => (
            <div
                key={decoration.src}
                className={`absolute inset-x-0 flex justify-center ${decoration.slotClassName}`}
            >
              <FadeIn
                  delay={decoration.delay}
                  x={decoration.x}
                  y={0}
                  duration={0.9}
                  className={decoration.sizeClassName}
                  once={false}
              >
                {decoration.parallax ? (
                    <ScrollDrift
                        progress={progress}
                        range={decoration.parallax.range}
                        name={decoration.parallax.name}
                    >
                      <img src={decoration.src} alt="" className="h-auto w-full" />
                    </ScrollDrift>
                ) : (
                    <img src={decoration.src} alt="" className="h-auto w-full" />
                )}
              </FadeIn>
            </div>
        ))}
      </div>
  );
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
      <section
          ref={sectionRef}
          id="about"
          className="relative overflow-hidden px-5 pt-12 pb-8 sm:px-8 sm:pt-14 sm:pb-10 md:px-10 md:pt-16 md:pb-12"
      >
        <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 grid grid-cols-[minmax(1.25rem,1fr)_minmax(0,72rem)_minmax(1.25rem,1fr)] sm:grid-cols-[minmax(2rem,1fr)_minmax(0,72rem)_minmax(2rem,1fr)] md:grid-cols-[minmax(2.5rem,1fr)_minmax(0,72rem)_minmax(2.5rem,1fr)]"
        >
          <DecorationRail side="left" progress={scrollYProgress} />
          <div />
          <DecorationRail side="right" progress={scrollYProgress} />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl">
          <RevealHeading
              text="About me"
              className="hero-heading text-center font-black uppercase leading-none tracking-[0.04em] [word-spacing:0.3em]"
          />

          <div className="mt-14 grid items-start gap-12 md:mt-20 md:grid-cols-[1.08fr_0.92fr] md:gap-16">
            <div className="max-w-xl">
              <FadeIn y={10} duration={0.55} once={false}>
                <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-[#D7E2EA]/65">
                  Independent mobile app developer · France
                </p>
              </FadeIn>

              <AnimatedText
                  text={ABOUT_TEXT}
                  className="space-y-3 text-left font-normal leading-[1.55] text-[#D7E2EA]"
                  style={{ fontSize: "clamp(1.1rem, 2vw, 1.45rem)" }}
              />

              <FadeIn
                  delay={0.28}
                  y={10}
                  duration={0.55}
                  className="mt-8 flex flex-wrap gap-3"
                  once={false}
              >
                <a
                    href="/resume-tony-aloysius.pdf"
                    download="Tony-Aloysius-Resume.pdf"
                    className="inline-flex items-center gap-2 rounded-md bg-[#D7E2EA] px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[#0C0C0C] transition-colors hover:bg-white sm:text-sm"
                >
                  <Download size={16} strokeWidth={2.4} />
                  Download CV
                </a>
              </FadeIn>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {PROOF_ITEMS.map((item, index) => (
                  <ProofCell key={item.label} {...item} index={index} once={false} />
              ))}
            </div>
          </div>
        </div>

        <FadeIn
            delay={0.15}
            y={10}
            className="relative z-10 mt-12 w-full sm:mt-14 md:mt-16"
            once={false}
        >
          <div className="mb-5 flex items-center justify-between gap-4">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#D7E2EA]/65">
            Toolkit
          </span>
            <span className="text-xs text-[#D7E2EA]/45">Built for thoughtful mobile products</span>
          </div>

          <div className="w-full overflow-hidden">
            <TechConveyor items={ABOUT_TECHNOLOGIES} />
          </div>
        </FadeIn>
      </section>
  );
}