import {
    motion,
    useInView,
    useReducedMotion,
    useScroll,
    useSpring,
    useTransform,
} from "framer-motion";
import {
    ArrowUpRight,
    Code2,
    Compass,
    PenTool,
    Rocket,
    type LucideIcon,
} from "lucide-react";
import { useRef } from "react";
import CrossPlatformDiagram from "../components/CrossPlatformDiagram";
import RevealHeading from "../components/RevealHeading";

interface ProductStage {
    number: string;
    phase: string;
    title: string;
    description: string;
    deliverable: string;
    icon: LucideIcon;
}

const PRODUCT_STAGES: ProductStage[] = [
    {
        number: "01",
        phase: "Discover",
        title: "Shape the product",
        description:
            "Define the right problem, the essential user flow, and the smallest release worth building.",
        deliverable: "Roadmap + product prototype",
        icon: Compass,
    },
    {
        number: "02",
        phase: "Design",
        title: "Make it feel right",
        description:
            "Turn the product direction into accessible, native-feeling screens and a practical design system.",
        deliverable: "Testable interface",
        icon: PenTool,
    },
    {
        number: "03",
        phase: "Build",
        title: "Engineer once, natively",
        description:
            "Build the shared architecture, APIs, persistence, and platform integrations for Android and iOS.",
        deliverable: "Production-ready apps",
        icon: Code2,
    },
    {
        number: "04",
        phase: "Launch",
        title: "Ship and improve",
        description:
            "Handle store delivery, production monitoring, updates, and the next round of focused improvements.",
        deliverable: "Live product + release path",
        icon: Rocket,
    },
];

const EASE = [0.16, 1, 0.3, 1] as const;

function ProductStageCard({
    stage,
    index,
    reduceMotion,
}: {
    stage: ProductStage;
    index: number;
    reduceMotion: boolean;
}) {
    return (
        <motion.li
            className="group relative flex min-h-[290px] flex-col border-t border-[#D7E2EA]/16 px-1 pb-4 pt-7 sm:min-h-[310px] sm:px-5 lg:border-l lg:border-t-0 lg:px-6 lg:pb-6 lg:pt-8 first:lg:border-l-0"
            initial={reduceMotion ? false : { opacity: 0, y: 52, filter: "blur(8px)" }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, delay: index * 0.1, ease: EASE }}
        >
            <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#D7E2EA]/42">
                    {stage.number} · {stage.phase}
                </span>
                <span className="h-px w-8 bg-[#D7E2EA]/16 transition-colors duration-300 group-hover:bg-[#B600A8]/70" />
            </div>

            <div className="mt-9 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#B600A8]/35 bg-[#B600A8]/10 text-[#B600A8] transition-[transform,border-color,background-color] duration-300 group-hover:-translate-y-1 group-hover:border-[#B600A8]/70 group-hover:bg-[#B600A8]/15 sm:mt-11">
                <stage.icon size={21} strokeWidth={1.8} aria-hidden="true" />
            </div>

            <h3 className="mt-7 text-xl font-semibold tracking-[-0.025em] text-[#D7E2EA] sm:text-2xl">
                {stage.title}
            </h3>
            <p className="mt-3 text-base font-light leading-relaxed text-[#D7E2EA]/62">
                {stage.description}
            </p>

            <p className="mt-auto pt-8 text-sm text-[#D7E2EA]/82">
                <span className="mr-2 text-[#B600A8]" aria-hidden="true">●</span>
                {stage.deliverable}
            </p>
        </motion.li>
    );
}

export default function ServicesSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const headingInView = useInView(headingRef, {
        amount: 0.2,
        margin: "0px 0px -10% 0px",
        once: true,
    });
    const reduceMotion = useReducedMotion() ?? false;
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start 78%", "end 70%"],
    });
    const rawJourneyProgress = useTransform(scrollYProgress, [0.12, 0.64], [0, 1]);
    const journeyProgress = useSpring(rawJourneyProgress, {
        stiffness: 90,
        damping: 24,
        mass: 0.45,
    });
    const glowY = useTransform(scrollYProgress, [0, 1], [80, -80]);

    return (
        <section
            ref={sectionRef}
            id="services"
            aria-labelledby="services-heading"
            className="relative isolate overflow-hidden bg-[#0C0C0C] px-5 py-20 sm:px-8 sm:py-24 md:px-10 lg:py-32"
        >
            <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute right-[-18rem] top-[24rem] h-[38rem] w-[38rem] rounded-full bg-[#7621B0]/10 blur-[140px]"
                style={reduceMotion ? undefined : { y: glowY }}
            />

            <div className="relative mx-auto max-w-6xl">
                <div ref={headingRef} id="services-heading">
                    {headingInView ? (
                        <RevealHeading
                            text="Services"
                            className="hero-heading text-center font-black uppercase leading-none tracking-[0.04em]"
                        />
                    ) : (
                        <div
                            aria-hidden="true"
                            className="hero-heading invisible text-center font-black uppercase leading-none tracking-[0.04em]"
                        >
                            Services
                        </div>
                    )}
                </div>

                <motion.header
                    className="mx-auto mt-12 max-w-4xl text-center sm:mt-16"
                    initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                    whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.7, ease: EASE }}
                >
                    <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#B600A8] sm:text-sm">
                        From idea to App Store
                    </p>
                    <h2 className="mt-5 text-balance text-[clamp(2.35rem,6vw,5.75rem)] font-semibold leading-[0.96] tracking-[-0.055em] text-[#D7E2EA]">
                        One partner across the whole product journey.
                    </h2>
                    <p className="mx-auto mt-6 max-w-2xl text-base font-light leading-relaxed text-[#D7E2EA]/62 sm:text-lg">
                        Strategy, design, engineering, and release stay in one continuous loop—so the product that ships keeps the clarity of the original idea.
                    </p>
                </motion.header>

                <div className="relative mt-16 sm:mt-20">
                    <div
                        aria-hidden="true"
                        className="absolute left-0 right-0 top-0 hidden h-px bg-[#D7E2EA]/12 lg:block"
                    >
                        <motion.span
                            className="block h-full origin-left bg-gradient-to-r from-[#B600A8] via-[#7621B0] to-[#657FC0]"
                            style={{ scaleX: reduceMotion ? 1 : journeyProgress }}
                        />
                    </div>

                    <ol className="grid lg:grid-cols-4">
                        {PRODUCT_STAGES.map((stage, index) => (
                            <ProductStageCard
                                key={stage.phase}
                                stage={stage}
                                index={index}
                                reduceMotion={reduceMotion}
                            />
                        ))}
                    </ol>
                </div>

                <motion.article
                    className="relative mt-12 overflow-hidden rounded-[28px] border border-[#D7E2EA]/14 bg-[#101011] shadow-[0_28px_90px_rgba(0,0,0,0.28)] sm:mt-16"
                    initial={reduceMotion ? false : { opacity: 0, y: 54, scale: 0.985 }}
                    whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.85, ease: EASE }}
                >
                    <span
                        aria-hidden="true"
                        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-[#B600A8]/0 via-[#B600A8] to-[#657FC0]/0"
                    />

                    <div className="grid lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
                        <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-12">
                            <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#B600A8] sm:text-sm">
                                Specialist advantage
                            </p>
                            <h3 className="mt-5 max-w-xl text-3xl font-semibold leading-tight tracking-[-0.035em] text-[#D7E2EA] sm:text-4xl">
                                Kotlin Multiplatform, without compromise.
                            </h3>
                            <p className="mt-5 max-w-xl text-base font-light leading-relaxed text-[#D7E2EA]/65 sm:text-lg">
                                Share domain logic, networking, persistence, and tests while preserving the native integrations and behavior that make each platform feel right.
                            </p>

                            <ul className="mt-7 space-y-3 text-sm text-[#D7E2EA]/78 sm:text-base">
                                <li className="flex items-center gap-3">
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#B600A8]" />
                                    One reliable shared core
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#7621B0]" />
                                    Native platform integrations
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#657FC0]" />
                                    Less duplication, easier evolution
                                </li>
                            </ul>
                        </div>

                        <motion.div
                            className="relative flex min-h-[300px] items-center justify-center border-t border-[#D7E2EA]/12 bg-[#D7E2EA]/[0.018] p-1 sm:min-h-[420px] sm:p-9 lg:border-l lg:border-t-0"
                            initial={reduceMotion ? false : { opacity: 0, x: 36 }}
                            whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.35 }}
                            transition={{ duration: 0.8, delay: 0.12, ease: EASE }}
                        >
                            <div className="-mx-[6%] w-[112%] max-w-none sm:mx-0 sm:w-full sm:max-w-[590px] [&_svg]:h-auto [&_svg]:w-full">
                                <CrossPlatformDiagram />
                            </div>
                        </motion.div>
                    </div>
                </motion.article>

                <motion.div
                    className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-[#D7E2EA]/14 pt-8 sm:mt-16 sm:flex-row sm:items-center"
                    initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                    whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.65 }}
                    transition={{ duration: 0.65, ease: EASE }}
                >
                    <p className="max-w-lg text-lg font-light leading-relaxed text-[#D7E2EA]/72 sm:text-xl">
                        Not sure where your product fits in the journey? Start with where you are today.
                    </p>
                    <a
                        href="#contact"
                        className="group inline-flex min-h-11 items-center gap-3 border-b border-[#B600A8] pb-2 text-sm font-semibold uppercase tracking-[0.14em] text-[#D7E2EA] transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B600A8]/75 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0C0C0C]"
                    >
                        Tell me about your product
                        <ArrowUpRight
                            size={18}
                            aria-hidden="true"
                            className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                        />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
