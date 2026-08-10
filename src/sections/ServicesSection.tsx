import {
    AnimatePresence,
    motion,
    useInView,
    useMotionValueEvent,
    useScroll,
    useSpring,
    useTransform,
    type MotionValue,
} from "framer-motion";
import { LayoutGrid, PenTool, Plug, Rocket, Share2, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import CrossPlatformDiagram from "../components/CrossPlatformDiagram";
import RevealHeading from "../components/RevealHeading";

interface Service {
    id: string;
    number: string;
    name: string;
    summary: string;
    detail: string;
    scope: string[];
    icon: LucideIcon;
    visual?: "kmp";
}

const SERVICES: Service[] = [
    {
        id: "app-development",
        number: "01",
        name: "App Design & Development",
        summary:
            "End-to-end product work—from the first sketch to the shipped app—so the product that launches matches the one you imagined.",
        detail:
            "I turn an early idea into a buildable product by defining the core flow, testing the interaction, establishing the app architecture, and carrying it through to a production release. Design and engineering stay in the same loop, so important decisions survive implementation.",
        scope: ["Product definition and user flows", "Interface prototypes and design system", "Production Android and iOS delivery"],
        icon: PenTool,
    },
    {
        id: "cross-platform-engineering",
        number: "02",
        name: "Cross-Platform Engineering",
        summary:
            "One shared Kotlin Multiplatform codebase powering native Android and iOS apps, instead of building and maintaining the same product twice.",
        detail:
            "A Kotlin Multiplatform core can hold domain rules, networking, persistence, and tests in one place. Android and iOS still keep the platform integrations and native behavior that matter, reducing duplicate work without flattening either experience.",
        scope: ["Shared domain and data layers", "Platform-specific integrations", "Common tests and release-safe architecture"],
        icon: Share2,
        visual: "kmp",
    },
    {
        id: "api-backend-integration",
        number: "03",
        name: "API & Backend Integration",
        summary:
            "Connecting apps to REST APIs, third-party services, and cloud backends through reliable, well-tested data layers.",
        detail:
            "I connect the app to authentication, REST endpoints, payments, notifications, or other services using typed models and testable repositories. Sync, loading, errors, and offline conditions are treated as product states—not afterthoughts.",
        scope: ["REST APIs and authentication", "Resilient sync and local persistence", "Third-party SDK integration"],
        icon: Plug,
    },
    {
        id: "store-launch-maintenance",
        number: "04",
        name: "App Store Launch & Maintenance",
        summary: "Store submissions, version updates, and steady iteration after launch—not just a final code handoff.",
        detail:
            "Release work includes signing, internal testing, store metadata, review fixes, versioning, and production monitoring. The result is a repeatable delivery path for future releases rather than a one-off upload that is difficult to maintain.",
        scope: ["TestFlight and internal testing tracks", "App Store and Play Console delivery", "Versioning, monitoring, and updates"],
        icon: Rocket,
    },
    {
        id: "mobile-ui-ux",
        number: "05",
        name: "UI/UX for Mobile",
        summary: "Clear, native-feeling interfaces shaped around platform conventions, accessibility, and everyday usability.",
        detail:
            "Interfaces begin with the user’s flow and resolve into accessible, production-ready screens. Hierarchy, touch targets, motion, responsive layout, and platform behavior are checked across real device sizes before the experience is considered finished.",
        scope: ["User flows and interaction design", "Accessible mobile components", "Responsive and platform-aware behavior"],
        icon: LayoutGrid,
    },
];

const SEQUENCE_END = 0.94;
const PILE_READY_AT = 0.99;

function ServiceHeader({
                           service,
                           titleId = `services-${service.id}-title`,
                       }: {
    service: Service;
    titleId?: string;
}) {
    return (
        <div className="grid grid-cols-[minmax(104px,auto)_minmax(0,1fr)] items-center gap-5 sm:grid-cols-[minmax(140px,auto)_minmax(0,1fr)] sm:gap-7">
            <div className="flex items-center gap-4 sm:gap-5">
                <span className="rounded-2xl border border-[#B600A8]/40 bg-[#B600A8]/10 p-3 sm:p-3.5">
                    <service.icon
                        size={22}
                        aria-hidden="true"
                        strokeWidth={2}
                        className="text-[#B600A8]"
                    />
                </span>
                <span
                    aria-hidden="true"
                    className="font-black leading-none text-[#D7E2EA]/42"
                    style={{ fontSize: "clamp(2.25rem, 5.25vw, 4.75rem)" }}
                >
                    {service.number}
                </span>
            </div>

            <div className="min-w-0">
                <h3
                    id={titleId}
                    className="text-base font-semibold uppercase tracking-[0.16em] text-[#D7E2EA] sm:text-lg"
                >
                    {service.name}
                </h3>
                <p className="mt-2 line-clamp-2 max-w-3xl text-base font-light leading-relaxed text-[#D7E2EA]/60">
                    {service.summary}
                </p>
            </div>
        </div>
    );
}

function ServiceDetails({ service }: { service: Service }) {
    return (
        <div
            className={`grid gap-6 text-left ${
                service.visual === "kmp"
                    ? "md:grid-cols-[minmax(0,0.85fr)_minmax(380px,1.15fr)] md:items-center"
                    : "grid-cols-1"
            }`}
        >
            <div className="flex min-h-0 flex-col justify-center text-left">
                <p className="max-w-3xl text-base leading-relaxed text-[#D7E2EA]/78 sm:text-lg">
                    {service.detail}
                </p>

                <div className="mt-6">
                    <span className="text-sm font-medium uppercase tracking-[0.2em] text-[#D7E2EA]/45">
                        Scope
                    </span>
                    <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#D7E2EA]/60 sm:text-base">
                        {service.scope.map((item) => (
                            <li key={item} className="flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#7621B0]" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {service.visual === "kmp" && (
                <div className="hidden min-h-[320px] w-full max-w-[560px] items-center justify-center justify-self-end self-center rounded-3xl border border-[#D7E2EA]/12 bg-[#D7E2EA]/[0.018] p-5 md:flex">
                    <div className="w-full [&_svg]:h-auto [&_svg]:w-full">
                        <CrossPlatformDiagram />
                    </div>
                </div>
            )}
        </div>
    );
}

function CatalogCard({
                         service,
                         index,
                         total,
                         scrollProgress,
                         pileReady,
                         hoveredId,
                         onHover,
                         onOpen,
                     }: {
    service: Service;
    index: number;
    total: number;
    scrollProgress: MotionValue<number>;
    pileReady: boolean;
    hoveredId: string | null;
    onHover: (id: string | null) => void;
    onOpen: (service: Service) => void;
}) {
    const segment = SEQUENCE_END / total;
    const transitionDuration = segment * 0.4;
    const cardStart = index * segment;
    const isLast = index === total - 1;
    const holdEnd = isLast ? 0.96 : cardStart + segment - transitionDuration;
    const cardEnd = isLast ? PILE_READY_AT : (index + 1) * segment;

    const expansion = useTransform(
        scrollProgress,
        index === 0
            ? [0, holdEnd, cardEnd]
            : [cardStart - transitionDuration, cardStart, holdEnd, cardEnd],
        index === 0 ? [1, 1, 0] : [0, 1, 1, 0],
        { clamp: true },
    );
    const detailRows = useTransform(expansion, [0, 1], ["0fr", "1fr"]);
    const detailOpacity = useTransform(
        expansion,
        [0, 0.18, 0.55, 1],
        [0, 0, 0.75, 1],
    );
    const detailY = useTransform(expansion, [0, 1], [26, 0]);
    const detailScale = useTransform(expansion, [0, 1], [0.985, 1]);
    const detailFilter = useTransform(
        expansion,
        [0, 0.45, 1],
        ["blur(8px)", "blur(3px)", "blur(0px)"],
    );

    const isHovered = hoveredId === service.id;
    const isDimmed = pileReady && hoveredId !== null && !isHovered;

    const openCard = () => {
        if (pileReady) {
            onOpen(service);
        }
    };

    return (
        <motion.li
            className="relative will-change-[transform,opacity,filter]"
            style={{ zIndex: isHovered ? total + 2 : index + 1 }}
            initial={{ opacity: 0, y: 72, scale: 0.96, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: false, amount: 0.15, margin: "0px 0px -5% 0px" }}
            transition={{
                duration: 0.82,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
            }}
        >
            <motion.div
                animate={{
                    opacity: isDimmed ? 0.3 : 1,
                    scale: pileReady && isHovered ? 1.018 : 1,
                    y: pileReady && isHovered ? -7 : 0,
                }}
                transition={{ type: "spring", stiffness: 320, damping: 28 }}
                onHoverStart={() => pileReady && onHover(service.id)}
                onHoverEnd={() => onHover(null)}
            >
                <article
                    role="button"
                    tabIndex={pileReady ? 0 : -1}
                    aria-disabled={!pileReady}
                    aria-labelledby={`services-${service.id}-title`}
                    onClick={openCard}
                    onFocus={() => pileReady && onHover(service.id)}
                    onBlur={() => onHover(null)}
                    onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            openCard();
                        }
                    }}
                    className={`relative overflow-hidden rounded-[22px] border bg-[#0F0F10] p-5 text-left shadow-[0_12px_36px_rgba(0,0,0,0.18)] transition-[border-color,background-color,box-shadow] duration-300 sm:p-6 ${
                        pileReady
                            ? "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B600A8]/75 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0C0C0C]"
                            : "cursor-default"
                    } ${
                        pileReady && isHovered
                            ? "border-[#B600A8]/75 bg-[#131014] shadow-[0_18px_52px_rgba(182,0,168,0.18)]"
                            : "border-[#D7E2EA]/18"
                    }`}
                >
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-[#B600A8]/0 via-[#7621B0]/70 to-[#657FC0]/0"
                />

                    <ServiceHeader service={service} />

                    <motion.div
                        aria-hidden={pileReady}
                        className="grid"
                        style={{ gridTemplateRows: detailRows }}
                    >
                        <motion.div
                            className="min-h-0 overflow-hidden"
                            style={{
                                opacity: detailOpacity,
                                y: detailY,
                                scale: detailScale,
                                filter: detailFilter,
                                transformOrigin: "50% 0%",
                            }}
                        >
                            <div className="pt-6">
                                <ServiceDetails service={service} />
                            </div>
                        </motion.div>
                    </motion.div>
                </article>
            </motion.div>
        </motion.li>
    );
}

function ExpandedService({
                             service,
                             onClose,
                         }: {
    service: Service;
    onClose: () => void;
}) {
    const titleId = `services-${service.id}-dialog-title`;

    return (
        <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#070707]/92 p-4 backdrop-blur-md sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <button
                type="button"
                aria-label="Close service details"
                onClick={onClose}
                className="absolute right-5 top-5 z-10 rounded-full border border-[#D7E2EA]/20 bg-[#111]/90 p-3 text-[#D7E2EA] transition-colors hover:border-[#B600A8]/70 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B600A8]/75 sm:right-8 sm:top-8"
            >
                <X size={20} />
            </button>

            <motion.article
                role="button"
                tabIndex={0}
                aria-label={`Close ${service.name} details`}
                onClick={(event) => {
                    event.stopPropagation();
                    onClose();
                }}
                onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        onClose();
                    }
                }}
                className="relative max-h-[calc(100vh-2rem)] w-full max-w-6xl cursor-pointer overflow-y-auto rounded-[28px] border border-[#B600A8]/55 bg-[#0F0F10] p-5 text-left shadow-[0_30px_100px_rgba(0,0,0,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B600A8]/75 sm:max-h-[calc(100vh-4rem)] sm:p-8 md:p-10"
                initial={{ opacity: 0, scale: 0.94, y: 28 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 18 }}
                transition={{ type: "spring", stiffness: 260, damping: 28 }}
            >
                <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-[#B600A8]/0 via-[#B600A8] to-[#657FC0]/0" />
                <ServiceHeader service={service} titleId={titleId} />
                <div className="pt-8">
                    <ServiceDetails service={service} />
                </div>
            </motion.article>
        </motion.div>
    );
}

function ServicesCatalog({ services }: { services: Service[] }) {
    const sequenceRef = useRef<HTMLDivElement>(null);
    const [pileReady, setPileReady] = useState(false);
    const [selectionReady, setSelectionReady] = useState(false);
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [selectedService, setSelectedService] = useState<Service | null>(null);

    const { scrollYProgress } = useScroll({
        target: sequenceRef,
        offset: ["start start", "end end"],
    });
    const finalCardStart = (SEQUENCE_END / services.length) * (services.length - 1);
    const condensedScrollProgress = useTransform(
        scrollYProgress,
        [0, 0.77, 0.84, 1],
        [0, finalCardStart, PILE_READY_AT, 1],
        { clamp: true },
    );
    const smoothScrollProgress = useSpring(condensedScrollProgress, {
        stiffness: 85,
        damping: 28,
        mass: 0.45,
        restDelta: 0.0005,
    });
    useMotionValueEvent(smoothScrollProgress, "change", (latest) => {
        const ready = latest >= PILE_READY_AT;
        setPileReady((current) => (current === ready ? current : ready));

        if (!ready) {
            setSelectionReady(false);
            setHoveredId(null);
        }
    });

    useEffect(() => {
        if (!selectedService) {
            return;
        }

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setSelectedService(null);
            }
        };

        window.addEventListener("keydown", closeOnEscape);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", closeOnEscape);
        };
    }, [selectedService]);

    return (
        <>
            <div
                ref={sequenceRef}
                className="relative"
                style={{ height: `${services.length * 74 + 100}vh` }}
            >
                <div className="sticky top-[1.5svh] min-h-[98.5svh] w-full">
                    <motion.div
                        layout
                        className={`w-full ${
                            pileReady
                                ? "flex min-h-[98.5svh] flex-col md:justify-center"
                                : ""
                        }`}
                        transition={{
                            layout: {
                                duration: 1.35,
                                ease: [0.16, 1, 0.3, 1],
                            },
                        }}
                    >
                        <motion.ol
                            layout="position"
                            className="relative space-y-2"
                            transition={{
                                layout: {
                                    duration: 1.35,
                                    ease: [0.16, 1, 0.3, 1],
                                },
                            }}
                            onLayoutAnimationStart={() => {
                                if (pileReady) {
                                    setSelectionReady(false);
                                }
                            }}
                            onLayoutAnimationComplete={() => {
                                if (pileReady) {
                                    setSelectionReady(true);
                                }
                            }}
                        >
                            {services.map((service, index) => (
                                <CatalogCard
                                    key={service.id}
                                    service={service}
                                    index={index}
                                    total={services.length}
                                    scrollProgress={smoothScrollProgress}
                                    pileReady={selectionReady}
                                    hoveredId={hoveredId}
                                    onHover={setHoveredId}
                                    onOpen={setSelectedService}
                                />
                            ))}
                        </motion.ol>

                        <motion.p
                            layout="position"
                            className="mt-4 text-center text-xs uppercase tracking-[0.16em] text-[#D7E2EA]/45"
                            animate={{ opacity: selectionReady ? 1 : 0 }}
                            transition={{
                                layout: {
                                    duration: 1.35,
                                    ease: [0.16, 1, 0.3, 1],
                                },
                                opacity: {
                                    duration: 0.55,
                                    delay: selectionReady ? 0.1 : 0,
                                },
                            }}
                        >
                            Select a card to view the complete service
                        </motion.p>
                    </motion.div>
                </div>
            </div>

            <AnimatePresence>
                {selectedService && (
                    <ExpandedService
                        service={selectedService}
                        onClose={() => setSelectedService(null)}
                    />
                )}
            </AnimatePresence>
        </>
    );
}

export default function ServicesSection() {
    const headingRef = useRef<HTMLDivElement>(null);
    const headingInView = useInView(headingRef, {
        amount: 0.15,
        margin: "0px 0px -5% 0px",
        once: true,
    });
    return (
        <section
            id="services"
            aria-labelledby="services-heading"
            className="relative isolate bg-[#0C0C0C] px-5 pb-12 pt-8 sm:px-8 sm:pb-16 sm:pt-10 md:px-10 md:pb-20 md:pt-12"
        >
            <div className="mx-auto max-w-6xl">
                <div className="relative z-30 pb-4 sm:pb-6 md:pb-8">
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
                </div>

                <ServicesCatalog services={SERVICES} />
            </div>

        </section>
    );
}