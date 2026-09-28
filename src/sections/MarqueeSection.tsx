import { useLayoutEffect, useRef, useState } from "react";
import { motion, type MotionValue, useScroll, useTransform } from "framer-motion";
import { MARQUEE_ROW_ONE, MARQUEE_ROW_TWO } from "../data/techStack";

const ROW1_TRIPLED = [...MARQUEE_ROW_ONE, ...MARQUEE_ROW_ONE, ...MARQUEE_ROW_ONE];
const ROW2_TRIPLED = [...MARQUEE_ROW_TWO, ...MARQUEE_ROW_TWO, ...MARQUEE_ROW_TWO];

function MarqueeRow({ items, x }: { items: string[]; x: MotionValue<number> }) {
  return (
    <motion.div className="flex gap-3" style={{ x, willChange: "transform" }}>
      {items.map((item, i) => (
        <div
          key={i}
          className="flex-none px-6 py-4 sm:px-8 sm:py-5 rounded-2xl border border-[#D7E2EA]/15 text-[#D7E2EA] uppercase tracking-widest text-sm sm:text-base font-medium whitespace-nowrap"
        >
          {item}
        </div>
      ))}
    </motion.div>
  );
}

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [sectionTop, setSectionTop] = useState(0);
  const { scrollY } = useScroll();

  useLayoutEffect(() => {
    function measure() {
      const el = sectionRef.current;
      if (!el) return;
      setSectionTop(el.getBoundingClientRect().top + window.scrollY);
    }

    measure();
    window.addEventListener("resize", measure, { passive: true });
    return () => window.removeEventListener("resize", measure);
  }, []);

  const offset = useTransform(
    scrollY,
    (value) => (value - sectionTop + window.innerHeight) * 0.3 - 200,
  );
  const offsetInverse = useTransform(offset, (value) => -value);

  return (
    <section
      ref={sectionRef}
      className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden"
    >
      <div className="flex flex-col gap-3">
        <MarqueeRow items={ROW1_TRIPLED} x={offset} />
        <MarqueeRow items={ROW2_TRIPLED} x={offsetInverse} />
      </div>
    </section>
  );
}
