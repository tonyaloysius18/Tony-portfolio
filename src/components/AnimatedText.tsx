import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: CSSProperties;
}

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export default function AnimatedText({ text, className, style }: AnimatedTextProps) {
  const reduceMotion = useReducedMotion();
  const sentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) ?? [text];

  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "50px", amount: 0.2 }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: reduceMotion ? 0 : 0.08 },
        },
      }}
    >
      {sentences.map((sentence, index) => (
        <motion.span
          key={sentence}
          className="block"
          variants={{
            hidden: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: reduceMotion ? 0 : 0.55, ease: EASE },
            },
          }}
        >
          {sentence.trim()}
          {index < sentences.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </motion.div>
  );
}
