import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef, type CSSProperties } from "react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: CSSProperties;
}

export default function AnimatedText({ text, className, style }: AnimatedTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.2"],
  });

  const words = text.split(" ");
  const totalChars = text.length;
  let charIndex = 0;

  return (
    <p ref={containerRef} className={className} style={style}>
      {words.map((word, wi) => {
        const wordStartIndex = charIndex;
        charIndex += word.length + 1;

        return (
          <span key={wi}>
            <span style={{ display: "inline-block", whiteSpace: "nowrap" }}>
              {word.split("").map((char, ci) => {
                const globalIndex = wordStartIndex + ci;
                const start = globalIndex / totalChars;
                const end = start + 1 / totalChars;
                return (
                  <Character key={ci} char={char} progress={scrollYProgress} range={[start, end]} />
                );
              })}
            </span>
            {wi < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </p>
  );
}

function Character({
  char,
  progress,
  range,
}: {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <span style={{ opacity: 0.2 }}>{char}</span>
      <motion.span style={{ position: "absolute", left: 0, top: 0, opacity }}>
        {char}
      </motion.span>
    </span>
  );
}
