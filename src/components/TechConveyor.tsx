import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

interface TechConveyorProps {
    items: string[];
}

function TechPill({ item }: { item: string }) {
    return (
        <span className="shrink-0 whitespace-nowrap rounded-full border border-[#D7E2EA]/20 bg-[#0F0F10] px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#D7E2EA]/72">
            {item}
        </span>
    );
}

export default function TechConveyor({ items }: TechConveyorProps) {
    const reduceMotion = useReducedMotion();
    const containerRef = useRef<HTMLDivElement>(null);
    const sampleRef = useRef<HTMLDivElement>(null);
    const [repeatCount, setRepeatCount] = useState(3);

    useEffect(() => {
        const container = containerRef.current;
        const sample = sampleRef.current;

        if (!container || !sample || items.length === 0) {
            return;
        }

        const updateRepeatCount = () => {
            const singleSetWidth = sample.scrollWidth;

            if (singleSetWidth === 0) {
                return;
            }

            // Every animated group must be wider than the viewport. That keeps
            // the second identical group on-screen before the first one leaves.
            const requiredCopies = Math.max(
                2,
                Math.ceil(container.clientWidth / singleSetWidth) + 1,
            );

            setRepeatCount((current) =>
                current === requiredCopies ? current : requiredCopies,
            );
        };

        updateRepeatCount();

        const resizeObserver = new ResizeObserver(updateRepeatCount);
        resizeObserver.observe(container);
        resizeObserver.observe(sample);

        return () => resizeObserver.disconnect();
    }, [items]);

    const loopItems = useMemo(
        () =>
            Array.from({ length: repeatCount }, () => items).flat(),
        [items, repeatCount],
    );

    if (items.length === 0) {
        return null;
    }

    return (
        <div
            ref={containerRef}
            className="relative w-full overflow-hidden"
            style={{
                maskImage:
                    "linear-gradient(to right, transparent, black 3%, black 97%, transparent)",
                WebkitMaskImage:
                    "linear-gradient(to right, transparent, black 3%, black 97%, transparent)",
            }}
        >
            <div
                ref={sampleRef}
                aria-hidden="true"
                className="pointer-events-none absolute invisible flex w-max gap-3"
            >
                {items.map((item, index) => (
                    <TechPill key={`sample-${index}-${item}`} item={item} />
                ))}
            </div>

            {reduceMotion ? (
                <div className="flex w-max gap-3 overflow-x-auto py-1">
                    {loopItems.map((item, index) => (
                        <TechPill key={`static-${index}-${item}`} item={item} />
                    ))}
                </div>
            ) : (
                <motion.div
                    key={repeatCount}
                    aria-label={`Toolkit: ${items.join(", ")}`}
                    className="flex w-max py-1"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        duration: Math.max(28, loopItems.length * 1.6),
                        ease: "linear",
                        repeat: Infinity,
                    }}
                >
                    {[0, 1].map((groupIndex) => (
                        <div
                            key={groupIndex}
                            aria-hidden={groupIndex === 1}
                            className="flex shrink-0 gap-3 pr-3"
                        >
                            {loopItems.map((item, itemIndex) => (
                                <TechPill
                                    key={`${groupIndex}-${itemIndex}-${item}`}
                                    item={item}
                                />
                            ))}
                        </div>
                    ))}
                </motion.div>
            )}
        </div>
    );
}