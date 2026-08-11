import { useLayoutEffect, useRef, useState } from "react";
import {
    AnimatePresence,
    motion,
    type MotionValue,
    useInView,
    useReducedMotion,
    useScroll,
    useSpring,
    useTransform,
} from "framer-motion";
import LiveProjectButton from "../components/LiveProjectButton";
import RevealHeading from "../components/RevealHeading";

interface Screenshot {
    src: string;
    label: string;
    caption: string;
}

interface Project {
    number: string;
    category: string;
    name: string;
    platform: string;
    description: string;
    technologies: string[];
    featureGraphic: string;
    screenshots: Screenshot[];
    comingSoon?: boolean;
}

const PROJECTS: Project[] = [
    {
        number: "01",
        category: "Personal product",
        name: "Itinera",
        platform: "Android & iOS",
        description:
            "Cross-platform travel app for shared itineraries, ticket storage, and trip expenses.",
        technologies: ["Kotlin Multiplatform", "Compose", "SwiftUI", "Firebase"],
        featureGraphic: "/projects/itinera/feature_graphic.jpg",
        screenshots: [
            {
                src: "/projects/itinera/trip_home.jpg",
                label: "All your trips",
                caption: "Upcoming and previous journeys in one shared home.",
            },
            {
                src: "/projects/itinera/expense.jpg",
                label: "Split costs",
                caption: "Group expenses with a clear balance for every traveller.",
            },
            {
                src: "/projects/itinera/document.jpg",
                label: "Every ticket",
                caption: "Tickets and travel documents remain available with the trip.",
            },
            {
                src: "/projects/itinera/trip_detail.jpg",
                label: "Build the itinerary",
                caption: "Day-by-day planning with every stop in the right order.",
            },
        ],
    },
    {
        number: "02",
        category: "Personal product",
        name: "Cathopedia",
        platform: "Android & iOS",
        description:
            "Catholic reference content is spread across disconnected books, websites, and single-purpose applications.",
        technologies: ["Kotlin Multiplatform", "Compose", "Ktor", "Firebase"],
        featureGraphic: "/projects/cathopedia/feature_graphic.jpg",
        comingSoon: true,
        screenshots: [
            {
                src: "/projects/cathopedia/dashboard.jpg",
                label: "The Church, in your pocket",
                caption: "A focused starting point for the complete content library.",
            },
            {
                src: "/projects/cathopedia/saints_popes.jpg",
                label: "Saints & popes",
                caption: "Connected biographies, feast days, and historical context.",
            },
            {
                src: "/projects/cathopedia/eucharistic_miracles.jpg",
                label: "Eucharistic miracles",
                caption: "Searchable records organised by place and period.",
            },
            {
                src: "/projects/cathopedia/sacred_places.jpg",
                label: "Sacred places",
                caption: "Churches and pilgrimage destinations gathered by location.",
            },
        ],
    },
];

const CARD_EASE = [0.16, 1, 0.3, 1] as const;

function ProjectsHeading({ id }: { id: string }) {
    const headingRef = useRef<HTMLDivElement>(null);
    const headingInView = useInView(headingRef, {
        amount: 0.15,
        margin: "0px 0px -5% 0px",
        once: true,
    });

    return (
        <div ref={headingRef} id={id}>
            {headingInView ? (
                <RevealHeading
                    text="Projects"
                    className="hero-heading text-center font-black uppercase leading-none tracking-[0.04em]"
                />
            ) : (
                <div
                    aria-hidden="true"
                    className="hero-heading invisible text-center font-black uppercase leading-none tracking-[0.04em]"
                >
                    Projects
                </div>
            )}
        </div>
    );
}

function TechIcon({ name, compact = false }: { name: string; compact?: boolean }) {
    const iconClass = compact
        ? "h-[clamp(11px,3cqw,20px)] w-[clamp(11px,3cqw,20px)] shrink-0"
        : "h-3.5 w-3.5 shrink-0";

    switch (name) {
        case "Kotlin Multiplatform":
            return (
                <svg aria-hidden="true" viewBox="0 0 24 24" className={iconClass}>
                    <path d="M3 3h18l-9 9 9 9H3V3Z" fill="#7F52FF" />
                    <path d="m3 21 9-9 4.6 4.6L12.2 21H3Z" fill="#C757BC" />
                    <path d="M3 3h18L12 12 3 3Z" fill="#00AFFF" />
                </svg>
            );
        case "Compose":
            return (
                <svg aria-hidden="true" viewBox="0 0 24 24" className={iconClass}>
                    <path d="m12 2 9 5v10l-9 5-9-5V7l9-5Z" fill="#4285F4" />
                    <path d="m12 6 5.5 3.1v5.8L12 18l-5.5-3.1V9.1L12 6Z" fill="#00C4B4" />
                    <path d="m12 9 3 1.7v2.6L12 15l-3-1.7v-2.6L12 9Z" fill="#E8F0FE" />
                </svg>
            );
        case "Ktor":
            return (
                <svg aria-hidden="true" viewBox="0 0 24 24" className={iconClass}>
                    <rect x="2" y="2" width="20" height="20" rx="5" fill="#111114" />
                    <path d="M2 17 17 2h5v5L7 22H2v-5Z" fill="#B125EA" />
                    <path d="M2 7 7 2h10L2 17V7Z" fill="#00E5FF" />
                    <path d="m11 12 5-5v10l-5-5Z" fill="white" />
                </svg>
            );
        case "SwiftUI":
            return (
                <svg aria-hidden="true" viewBox="0 0 24 24" className={iconClass}>
                    <rect x="2" y="2" width="20" height="20" rx="5" fill="#0A84FF" />
                    <path
                        d="M6 7.1c3.5 2.6 5.8 3.5 7.8 3.9-1.6-1.3-3-2.8-4.1-4.5 2.9 2.4 5.5 4.1 7.7 5 .4.2.8.5 1.1.8.3 3.2-1.2 5.4-3.6 6.7-1-1.7-2.3-2.6-4.1-3.1-1.8 1-4.2 1.1-6.2.1 1.6 0 3-.4 4.1-1.1-2.5-.8-4.8-2.5-6.8-4.1Z"
                        fill="white"
                    />
                </svg>
            );
        case "Firebase":
            return (
                <svg aria-hidden="true" viewBox="0 0 24 24" className={iconClass}>
                    <path d="m5 19 2.4-15 4.2 7.9L15 6l4 13-7 3-7-3Z" fill="#FFCA28" />
                    <path d="m5 19 6.6-7.1L15 6l-3 16-7-3Z" fill="#FFA000" />
                    <path d="m12 22 7-3-3.1-9.9L12 22Z" fill="#F57C00" />
                </svg>
            );
        default:
            return null;
    }
}

function TechPill({ name, compact = false }: { name: string; compact?: boolean }) {
    return (
        <span
            className={
                compact
                    ? "inline-flex min-w-0 items-center justify-center gap-[clamp(4px,1.2cqw,8px)] whitespace-nowrap rounded-md border border-[#D7E2EA]/15 bg-[#D7E2EA]/[0.025] px-[clamp(4px,1cqw,8px)] py-[clamp(5px,1.15cqw,9px)] text-[clamp(8px,2.25cqw,14px)] font-medium tracking-[0.02em] text-[#D7E2EA]/65"
                    : "inline-flex items-center gap-2 whitespace-nowrap rounded-md border border-[#D7E2EA]/15 bg-[#D7E2EA]/[0.025] px-2.5 py-1.5 text-[10px] font-medium tracking-[0.04em] text-[#D7E2EA]/65"
            }
        >
      <TechIcon name={name} compact={compact} />
      <span>{name}</span>
    </span>
    );
}

function AutoFitDescription({ text, mobile = false }: { text: string; mobile?: boolean }) {
    const paragraphRef = useRef<HTMLParagraphElement>(null);

    useLayoutEffect(() => {
        const element = paragraphRef.current;
        if (!element || mobile) return;

        let frame = 0;

        const fitText = () => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => {
                const maximumSize = window.matchMedia("(min-width: 1280px)").matches ? 20 : 18;
                const minimumSize = 10;
                const lineHeight = 1.55;
                let nextSize = maximumSize;

                element.style.height = `${maximumSize * lineHeight * 2}px`;
                element.style.fontSize = `${nextSize}px`;

                while (element.scrollHeight > element.clientHeight + 1 && nextSize > minimumSize) {
                    nextSize -= 0.5;
                    element.style.fontSize = `${nextSize}px`;
                }
            });
        };

        fitText();
        window.addEventListener("resize", fitText, { passive: true });
        void document.fonts?.ready.then(fitText);

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("resize", fitText);
        };
    }, [mobile, text]);

    return (
        <p
            ref={paragraphRef}
            className={
                mobile
                    ? "text-base leading-relaxed text-[#D7E2EA]/62"
                    : "h-14 w-full overflow-hidden text-lg leading-[1.55] text-[#D7E2EA]/62 xl:h-[3.875rem] xl:text-xl"
            }
        >
            {text}
        </p>
    );
}

function ProjectSummary({
                            project,
                            mobile = false,
                            showEyebrow = true,
                        }: {
    project: Project;
    mobile?: boolean;
    showEyebrow?: boolean;
}) {
    return (
        <div
            className={`flex h-full min-w-0 flex-col ${
                mobile ? "gap-5" : "justify-between gap-3"
            }`}
            style={mobile ? undefined : { containerType: "inline-size" }}
        >
            {showEyebrow && (
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#D7E2EA]/55 md:text-xs xl:text-[13px]">
                    {project.category} · {project.platform}
                </p>
            )}

            <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-4 md:gap-5 xl:gap-6">
        <span
            className="font-black leading-none text-[#D7E2EA]"
            style={{
                fontSize: mobile ? "clamp(3.5rem, 17vw, 5.5rem)" : "clamp(4.75rem, 7vw, 7.5rem)",
            }}
        >
          {project.number}
        </span>

                <div className="grid h-full w-fit max-w-full min-w-0 grid-rows-[auto_minmax(0,1fr)_auto] py-1">
                    <h3
                        id={`project-${project.number}-title`}
                        className="whitespace-nowrap text-3xl font-semibold uppercase leading-none tracking-[0.035em] text-[#D7E2EA] md:text-4xl xl:text-5xl"
                    >
                        {project.name}
                    </h3>

                    <div className="row-start-3 flex w-full items-center">
                        {project.comingSoon ? (
                            <span className="inline-flex h-[34px] w-full items-center justify-center whitespace-nowrap rounded-full border border-[#D7E2EA]/28 px-3 text-[8px] font-semibold uppercase tracking-[0.11em] text-[#D7E2EA]/65 md:h-10 md:px-3.5 md:text-[9px] xl:text-[10px]">
                Cooking now • Serving late 2026
              </span>
                        ) : (
                            <div className="inline-flex h-[34px] w-full shrink-0 items-center md:h-10 [&>*]:!inline-flex [&>*]:!h-[34px] md:[&>*]:!h-10 [&>*]:!w-full [&>*]:!items-center [&>*]:!justify-center [&>*]:!whitespace-nowrap [&>*]:!rounded-full [&>*]:!border-[#D7E2EA]/28 [&>*]:!bg-transparent [&>*]:!px-3 md:[&>*]:!px-3.5 [&>*]:!py-0 [&>*]:!text-[9px] [&>*]:!tracking-[0.12em] md:[&>*]:!text-[10px] xl:[&>*]:!text-[11px]">
                                <LiveProjectButton />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <AutoFitDescription text={project.description} mobile={mobile} />

            <div
                className={`w-full gap-1.5 md:gap-2.5 ${
                    mobile
                        ? "flex flex-wrap justify-start"
                        : "flex flex-nowrap items-center justify-start gap-[clamp(6px,1.2cqw,10px)]"
                }`}
            >
                {project.technologies.map((technology) => (
                    <TechPill key={technology} name={technology} compact={!mobile} />
                ))}
            </div>
        </div>
    );
}

function AnimatedScreenshot({
                                screenshot,
                                index,
                                projectIndex,
                                progress,
                                reduceMotion,
                                isActive,
                                isDimmed,
                                onActivate,
                            }: {
    screenshot: Screenshot;
    index: number;
    projectIndex: number;
    progress: MotionValue<number>;
    reduceMotion: boolean;
    isActive: boolean;
    isDimmed: boolean;
    onActivate: () => void;
}) {
    const entryStart = (projectIndex === 0 ? 0.12 : 0.57) + index * 0.012;
    const settleAt = entryStart + 0.09;
    const entryOffset = 64 + index * 24;
    const entryRotation = (index % 2 === 0 ? -1 : 1) * (1.25 + index * 0.15);

    const y = useTransform(
        progress,
        projectIndex === 0
            ? [entryStart, settleAt, 0.54 + index * 0.005, 0.66]
            : [entryStart, settleAt, 1],
        projectIndex === 0
            ? [entryOffset, 0, index % 2 === 0 ? -8 : -14, -72 - index * 7]
            : [entryOffset, 0, index % 2 === 0 ? -8 : -14],
        { clamp: true },
    );
    const opacity = useTransform(
        progress,
        projectIndex === 0
            ? [entryStart, settleAt, 0.57, 0.66]
            : [entryStart, settleAt],
        projectIndex === 0 ? [0, 1, 1, 0] : [0, 1],
        { clamp: true },
    );
    const rotate = useTransform(
        progress,
        [entryStart, settleAt],
        [entryRotation, 0],
        { clamp: true },
    );
    return (
        <motion.div
            className="relative col-span-2 min-h-0"
            onMouseEnter={onActivate}
            style={
                reduceMotion
                    ? { zIndex: isActive ? 40 : 1 }
                    : { y, opacity, rotate, zIndex: isActive ? 40 : 1 }
            }
        >
            <motion.figure
                tabIndex={0}
                className="relative h-full overflow-hidden rounded-[18px] border border-[#D7E2EA]/14 bg-[#101113] outline-none focus-visible:ring-2 focus-visible:ring-[#8AA7FF]/75 lg:rounded-[22px]"
                onFocus={onActivate}
                animate={
                    {
                        scale: reduceMotion || !isDimmed ? 1 : 0.985,
                        opacity: isActive ? 0.08 : isDimmed ? 0.38 : 1,
                    }
                }
                transition={
                    reduceMotion
                        ? { duration: 0.18 }
                        : { duration: 0.32, ease: CARD_EASE }
                }
            >
                <img
                    src={screenshot.src}
                    alt={screenshot.label}
                    className="h-full w-full object-cover object-top"
                />
            </motion.figure>
        </motion.div>
    );
}

function RaisedScreenshotPreview({
                                     screenshot,
                                     index,
                                     reduceMotion,
                                 }: {
    screenshot: Screenshot;
    index: number;
    reduceMotion: boolean;
}) {
    const horizontalCenter = `${12.5 + index * 25}%`;
    const [aspectRatio, setAspectRatio] = useState(9 / 16);

    return (
        <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute z-50 flex -translate-x-1/2 items-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={
                reduceMotion
                    ? { duration: 0.18 }
                    : { duration: 0.24, ease: CARD_EASE }
            }
            style={{
                // Anchor the raised card above its own slot. The clamp keeps the
                // first and fourth previews safely inside the project-card border.
                left: `clamp(174px, ${horizontalCenter}, calc(100% - 174px))`,
                top: "clamp(24px, 4svh, 38px)",
                bottom: "clamp(24px, 4svh, 38px)",
            }}
        >
            <motion.figure
                layout="size"
                className="relative max-h-full origin-bottom overflow-hidden rounded-[20px] border border-[#D7E2EA]/60 bg-[#080909] shadow-[0_34px_100px_rgba(0,0,0,0.82)] lg:rounded-[24px]"
                style={{
                    width: "clamp(220px, min(17vw, 34svh), 300px)",
                    aspectRatio,
                }}
                initial={reduceMotion ? false : { y: 72, scale: 0.94 }}
                animate={reduceMotion ? undefined : { y: 0, scale: 1 }}
                exit={reduceMotion ? undefined : { y: 30, scale: 0.975 }}
                transition={
                    reduceMotion
                        ? undefined
                        : {
                            type: "spring",
                            stiffness: 150,
                            damping: 23,
                            mass: 0.9,
                            restDelta: 0.001,
                            restSpeed: 0.001,
                        }
                }
            >
                <img
                    src={screenshot.src}
                    alt=""
                    className="h-full w-full object-contain object-center"
                    onLoad={(event) => {
                        const image = event.currentTarget;
                        if (image.naturalWidth > 0 && image.naturalHeight > 0) {
                            setAspectRatio(image.naturalWidth / image.naturalHeight);
                        }
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-transparent to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 px-4 pb-4 lg:px-5 lg:pb-5">
          <span className="block text-sm font-semibold text-white lg:text-base">
            {screenshot.label}
          </span>
                    <span className="mt-1 block max-w-sm text-[11px] leading-relaxed text-white/68 lg:text-xs">
            {screenshot.caption}
          </span>
                </figcaption>
            </motion.figure>
        </motion.div>
    );
}

function DesktopProjectCard({
                                project,
                                index,
                                progress,
                                reduceMotion,
                            }: {
    project: Project;
    index: number;
    progress: MotionValue<number>;
    reduceMotion: boolean;
}) {
    const [activeScreenshot, setActiveScreenshot] = useState<number | null>(null);
    const cardY = useTransform(
        progress,
        index === 0 ? [0.025, 0.14, 0.52, 0.78] : [0.44, 0.68, 1],
        index === 0 ? [130, 0, 0, -72] : [240, 0, 0],
        { clamp: true },
    );
    const cardScale = useTransform(
        progress,
        index === 0 ? [0.14, 0.46, 0.72] : [0.44, 0.68],
        index === 0 ? [1, 1, 0.965] : [0.975, 1],
        { clamp: true },
    );
    const cardOpacity = useTransform(
        progress,
        index === 0 ? [0.025, 0.12, 0.64, 0.78] : [0.44, 0.66],
        index === 0 ? [0, 1, 1, 0] : [0, 1],
        { clamp: true },
    );
    const bannerY = useTransform(
        progress,
        index === 0 ? [0.07, 0.2] : [0.49, 0.69],
        [56, 0],
        { clamp: true },
    );
    const bannerOpacity = useTransform(
        progress,
        index === 0 ? [0.07, 0.19] : [0.49, 0.68],
        [0, 1],
        { clamp: true },
    );
    const zIndex = useTransform(progress, (latest) => {
        if (index === 0) {
            return latest < 0.76 ? 20 : 5;
        }
        return latest < 0.76 ? 10 : 30;
    });

    return (
        <motion.article
            aria-labelledby={`project-${project.number}-title`}
            className="absolute inset-x-0 top-[clamp(12rem,24svh,15.5rem)] h-[min(72svh,700px)] origin-top overflow-hidden rounded-[30px] border border-[#D7E2EA]/28 bg-[#0C0C0C] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.48)] will-change-[transform,opacity] lg:rounded-[38px] lg:p-6 xl:p-8"
            style={
                reduceMotion
                    ? { zIndex: index + 1 }
                    : { y: cardY, scale: cardScale, opacity: cardOpacity, zIndex }
            }
        >
            <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-[#657FC0]/10 via-[#D7E2EA]/80 to-[#B600A8]/20" />

            <div className="grid h-full grid-rows-[auto_minmax(0,1fr)] gap-5 lg:gap-6">
                <div className="grid min-h-0 grid-cols-8 grid-rows-[auto_auto] gap-x-4 gap-y-3 lg:gap-x-5">
                    <p className="col-span-3 text-xs font-medium uppercase tracking-[0.18em] text-[#D7E2EA]/55 xl:text-[13px]">
                        {project.category} · {project.platform}
                    </p>

                    <div className="col-span-3 row-start-2 min-h-0">
                        <ProjectSummary project={project} showEyebrow={false} />
                    </div>

                    <motion.div
                        className="col-span-5 row-start-2 flex min-h-0 items-start justify-center"
                        style={reduceMotion ? undefined : { y: bannerY, opacity: bannerOpacity }}
                        transition={{ duration: 0.7, ease: CARD_EASE }}
                    >
                        <img
                            src={project.featureGraphic}
                            alt={`${project.name} feature banner`}
                            className="block h-auto max-h-full w-full rounded-[22px] border border-[#D7E2EA]/14 bg-[#0B1010] object-contain lg:rounded-[28px]"
                        />
                    </motion.div>
                </div>

                <div
                    className="grid min-h-0 grid-cols-8 gap-4 lg:gap-5"
                    onMouseLeave={() => setActiveScreenshot(null)}
                    onBlurCapture={(event) => {
                        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                            setActiveScreenshot(null);
                        }
                    }}
                >
                    {project.screenshots.map((screenshot, screenshotIndex) => (
                        <AnimatedScreenshot
                            key={screenshot.src}
                            screenshot={screenshot}
                            index={screenshotIndex}
                            projectIndex={index}
                            progress={progress}
                            reduceMotion={reduceMotion}
                            isActive={activeScreenshot === screenshotIndex}
                            isDimmed={activeScreenshot !== null && activeScreenshot !== screenshotIndex}
                            onActivate={() => setActiveScreenshot(screenshotIndex)}
                        />
                    ))}
                </div>
            </div>

            <AnimatePresence initial={false} mode="popLayout">
                {activeScreenshot !== null && (
                    <RaisedScreenshotPreview
                        key={project.screenshots[activeScreenshot].src}
                        screenshot={project.screenshots[activeScreenshot]}
                        index={activeScreenshot}
                        reduceMotion={reduceMotion}
                    />
                )}
            </AnimatePresence>
        </motion.article>
    );
}

function MobileProjectCard({ project }: { project: Project }) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 42 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.12 }}
            transition={{ duration: 0.8, ease: CARD_EASE }}
            className="rounded-[28px] border border-[#D7E2EA]/22 bg-[#0C0C0C] p-4"
        >
            <ProjectSummary project={project} mobile />

            <div className="mt-5 flex items-center justify-center">
                <img
                    src={project.featureGraphic}
                    alt={`${project.name} feature banner`}
                    className="block h-auto max-w-full rounded-[22px] border border-[#D7E2EA]/14 bg-[#0B1010] object-contain"
                />
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3">
                {project.screenshots.map((screenshot) => (
                    <motion.figure
                        key={screenshot.src}
                        whileHover={{ y: -8 }}
                        className="group relative aspect-[3/4] overflow-hidden rounded-[18px] border border-[#D7E2EA]/14"
                    >
                        <img
                            src={screenshot.src}
                            alt={screenshot.label}
                            className="h-full w-full object-cover object-top"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-transparent" />
                        <figcaption className="absolute inset-x-0 bottom-0 p-3">
                            <span className="block text-sm font-semibold text-white">{screenshot.label}</span>
                            <span className="mt-1 block text-[10px] leading-relaxed text-white/60">
                {screenshot.caption}
              </span>
                        </figcaption>
                    </motion.figure>
                ))}
            </div>
        </motion.article>
    );
}

export default function ProjectsSection() {
    const sequenceRef = useRef<HTMLDivElement>(null);
    const reduceMotion = Boolean(useReducedMotion());

    const { scrollYProgress } = useScroll({
        target: sequenceRef,
        offset: ["start start", "end end"],
    });
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 70,
        damping: 26,
        mass: 0.65,
        restDelta: 0.0001,
    });

    return (
        <section
            id="projects"
            className="relative z-10 border-t border-[#D7E2EA]/10 bg-[#080909] px-4 pb-16 pt-16 text-[#D7E2EA] sm:px-6 md:px-8"
        >
            <div className="mx-auto max-w-[1500px] md:hidden">
                <div className="relative z-30 pb-4 sm:pb-6">
                    <ProjectsHeading id="projects-heading-mobile" />
                </div>

                <div className="mt-8 space-y-6">
                    {PROJECTS.map((project) => (
                        <MobileProjectCard key={project.number} project={project} />
                    ))}
                </div>
            </div>

            <div ref={sequenceRef} className="relative mx-auto hidden h-[355vh] max-w-[1500px] md:block">
                <div className="sticky top-0 h-[100svh] overflow-hidden">
                    <div className="relative h-full px-1 pt-8 lg:px-4">
                        <div className="relative z-30 mx-auto max-w-6xl pb-4 sm:pb-6 md:pb-8">
                            <ProjectsHeading id="projects-heading-desktop" />
                        </div>

                        {PROJECTS.map((project, index) => (
                            <DesktopProjectCard
                                key={project.number}
                                project={project}
                                index={index}
                                progress={smoothProgress}
                                reduceMotion={reduceMotion}
                            />
                        ))}

                        <div className="absolute right-[-3.25rem] top-1/2 hidden -translate-y-1/2 flex-col items-center gap-5 xl:flex">
              <span className="rotate-180 text-[11px] uppercase tracking-[0.2em] text-[#D7E2EA]/42 [writing-mode:vertical-rl]">
                Scroll to explore
              </span>
                            <span className="h-20 w-px bg-gradient-to-b from-[#D7E2EA]/35 to-[#7E70FF]" />
                            <motion.span
                                className="h-2 w-2 rounded-full bg-[#AAA0FF] shadow-[0_0_14px_#776BFF]"
                                animate={{ y: [0, 10, 0], opacity: [0.55, 1, 0.55] }}
                                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}