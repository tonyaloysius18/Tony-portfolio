import { motion, useReducedMotion } from "framer-motion";
import type { ElementType, ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
  as?: ElementType;
  once?: boolean;
}

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export default function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className,
  as = "div",
  once = true,
}: FadeInProps) {
  const MotionTag = motion.create(as);
  const reduceMotion = useReducedMotion();

  return (
    <MotionTag
      className={className}
      initial={reduceMotion ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "50px", amount: 0 }}
      transition={{
        delay: reduceMotion ? 0 : delay,
        duration: reduceMotion ? 0 : duration,
        ease: EASE,
      }}
    >
      {children}
    </MotionTag>
  );
}
