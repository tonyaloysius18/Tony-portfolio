import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

interface RevealHeadingProps {
  text: string;
  className?: string;
}

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export default function RevealHeading({ text, className }: RevealHeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const isInView = useInView(containerRef, { once: false, margin: "50px" });

  return (
    <div ref={containerRef} className="overflow-hidden">
      <motion.h2
        className={className}
        style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
        initial={false}
        animate={{ y: reduceMotion || isInView ? 0 : "105%" }}
        transition={{ duration: reduceMotion ? 0 : 0.85, ease: EASE }}
      >
        {text}
      </motion.h2>
    </div>
  );
}
