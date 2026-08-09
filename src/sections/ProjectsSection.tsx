import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import FadeIn from "../components/FadeIn";
import LiveProjectButton from "../components/LiveProjectButton";

interface Screenshot {
  src: string;
  label: string;
}

interface Project {
  number: string;
  category: string;
  name: string;
  description: string;
  featureGraphic: string;
  featureGraphicFit?: "cover" | "contain";
  screenshots: Screenshot[];
  comingSoon?: boolean;
  statusLabel?: string;
}

const PROJECTS: Project[] = [
  {
    number: "01",
    category: "Personal · Android & iOS",
    name: "Itinera",
    description: "Cross-platform travel app: shared itineraries, ticket wallet, trip expenses.",
    featureGraphic: "/projects/itinera/feature_graphic.jpg",
    screenshots: [
      { src: "/projects/itinera/trip_home.jpg", label: "All your trips" },
      { src: "/projects/itinera/expense.jpg", label: "Split costs" },
      { src: "/projects/itinera/document.jpg", label: "Every ticket" },
      { src: "/projects/itinera/trip_detail.jpg", label: "Build your itinerary" },
    ],
  },
  {
    number: "02",
    category: "Personal · Android & iOS",
    name: "Cathopedia",
    description:
      "Catholic companion app: Bible, prayers, saints, popes, churches, Marian apparitions and Eucharistic miracles in one searchable library.",
    comingSoon: true,
    statusLabel: "Cooking · Serving 2026",
    featureGraphic: "/projects/cathopedia/feature_graphic.jpg",
    featureGraphicFit: "contain",
    screenshots: [
      { src: "/projects/cathopedia/dashboard.jpg", label: "The Church, in your pocket" },
      { src: "/projects/cathopedia/saints_popes.jpg", label: "Saints & popes" },
      { src: "/projects/cathopedia/eucharistic_miracles.jpg", label: "Eucharistic miracles" },
      { src: "/projects/cathopedia/sacred_places.jpg", label: "Sacred places" },
    ],
  },
];

// Precomputed sticky offsets (base top-24/md:top-32 + index * 28px) as static
// classes so Tailwind's build-time scanner can pick them up.
const STICKY_TOP = ["top-24 md:top-32", "top-[124px] md:top-[156px]"];

const CARD_RADIUS = "rounded-[36px] sm:rounded-[44px] md:rounded-[52px]";
const INNER_RADIUS = "rounded-[20px] sm:rounded-[26px] md:rounded-[30px]";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const targetScale = 1 - (PROJECTS.length - 1 - index) * 0.03;

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div className="h-[85vh]">
      <div ref={cardRef} className={`sticky ${STICKY_TOP[index]}`}>
        <motion.div
          style={{ scale }}
          className={`${CARD_RADIUS} bg-[#0C0C0C] border-2 border-[#D7E2EA] p-4 sm:p-6 md:p-8`}
        >
          <div className="flex flex-col md:flex-row gap-5 sm:gap-6 md:gap-10">
            <div className="md:max-w-sm flex flex-col justify-between gap-5 sm:gap-6">
              <div className="flex items-start gap-4 sm:gap-5">
                <span
                  className="font-black text-[#D7E2EA] leading-none flex-none"
                  style={{ fontSize: "clamp(2.25rem, 6vw, 72px)" }}
                >
                  {project.number}
                </span>
                <div>
                  <div className="text-[#D7E2EA] opacity-60 uppercase tracking-widest text-xs sm:text-sm">
                    {project.category}
                  </div>
                  <div
                    className="text-[#D7E2EA] font-medium uppercase"
                    style={{ fontSize: "clamp(1.1rem, 2.4vw, 1.9rem)" }}
                  >
                    {project.name}
                  </div>
                  <p
                    className="text-[#D7E2EA]/60 font-light mt-1"
                    style={{ fontSize: "clamp(0.8rem, 1.3vw, 1rem)" }}
                  >
                    {project.description}
                  </p>
                </div>
              </div>

              {project.comingSoon ? (
                <span className="self-start rounded-full border-2 border-[#D7E2EA]/40 text-[#D7E2EA]/70 font-medium uppercase tracking-widest px-6 py-3 sm:px-7 sm:py-3 text-xs sm:text-sm whitespace-nowrap">
                  {project.statusLabel}
                </span>
              ) : (
                <div className="self-start">
                  <LiveProjectButton />
                </div>
              )}
            </div>

            <motion.div
              className={`${INNER_RADIUS} overflow-hidden border border-[#D7E2EA]/15 flex-1 min-w-0 h-[160px] sm:h-[190px] md:h-[210px] lg:h-[230px]`}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <img
                src={project.featureGraphic}
                alt={project.name}
                className={`w-full h-full object-left ${
                  project.featureGraphicFit === "contain" ? "object-contain" : "object-cover"
                }`}
              />
            </motion.div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mt-5 sm:mt-6 md:mt-8">
            {project.screenshots.map((shot, i) => (
              <FadeIn key={i} delay={i * 0.08} y={16} duration={0.5}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  className={`group relative overflow-hidden ${INNER_RADIUS} border border-[#D7E2EA]/15`}
                >
                  <img src={shot.src} alt={shot.label} className="w-full h-auto block" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="absolute left-3 bottom-3 right-3 text-white text-xs sm:text-sm font-medium opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    {shot.label}
                  </span>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative z-10 -mt-10 sm:-mt-12 md:-mt-14 bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 pt-20 pb-10"
    >
      <FadeIn>
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-16 sm:mb-20 md:mb-24"
          style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
        >
          Project
        </h2>
      </FadeIn>

      {PROJECTS.map((project, i) => (
        <ProjectCard key={project.number} project={project} index={i} />
      ))}
    </section>
  );
}
