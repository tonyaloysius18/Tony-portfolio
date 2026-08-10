import { useEffect, useRef, useState } from "react";
import { MARQUEE_ROW_ONE, MARQUEE_ROW_TWO } from "../data/techStack";

const ROW1_TRIPLED = [...MARQUEE_ROW_ONE, ...MARQUEE_ROW_ONE, ...MARQUEE_ROW_ONE];
const ROW2_TRIPLED = [...MARQUEE_ROW_TWO, ...MARQUEE_ROW_TWO, ...MARQUEE_ROW_TWO];

function MarqueeRow({ items, offset }: { items: string[]; offset: number }) {
  return (
    <div
      className="flex gap-3"
      style={{ transform: `translateX(${offset}px)`, willChange: "transform" }}
    >
      {items.map((item, i) => (
        <div
          key={i}
          className="flex-none px-6 py-4 sm:px-8 sm:py-5 rounded-2xl border border-[#D7E2EA]/15 text-[#D7E2EA] uppercase tracking-widest text-sm sm:text-base font-medium whitespace-nowrap"
        >
          {item}
        </div>
      ))}
    </div>
  );
}

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const el = sectionRef.current;
      if (!el) return;
      const sectionTop = el.getBoundingClientRect().top + window.scrollY;
      setOffset((window.scrollY - sectionTop + window.innerHeight) * 0.3);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden"
    >
      <div className="flex flex-col gap-3">
        <MarqueeRow items={ROW1_TRIPLED} offset={offset - 200} />
        <MarqueeRow items={ROW2_TRIPLED} offset={-(offset - 200)} />
      </div>
    </section>
  );
}
