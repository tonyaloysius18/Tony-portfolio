import { motion, useReducedMotion, useTransform, type MotionValue } from "framer-motion";
import type { ReactNode } from "react";

interface ScrollDriftProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  className?: string;
  name?: string;
}

export default function ScrollDrift({
  children,
  progress,
  range,
  className,
  name,
}: ScrollDriftProps) {
  const reduceMotion = useReducedMotion();
  const y = useTransform(progress, [0, 1], reduceMotion ? [0, 0] : range);

  return (
    <motion.div className={className} style={{ y }} data-parallax={name}>
      {children}
    </motion.div>
  );
}
