import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface LiveProjectButtonProps {
  variant?: "light" | "dark";
}

export default function LiveProjectButton({ variant = "light" }: LiveProjectButtonProps) {
  const reduceMotion = Boolean(useReducedMotion());
  const colors =
    variant === "dark"
      ? "border-[#0C0C0C] text-[#0C0C0C] hover:bg-[#0C0C0C]/5"
      : "border-[#D7E2EA] text-[#D7E2EA] hover:bg-[#D7E2EA]/10";

  return (
    <motion.a
      href="#itinera-case-study"
      aria-label="Open the Itinera project case study"
      onClick={() => {
        sessionStorage.setItem("portfolio:projects-scroll-position", String(window.scrollY));
      }}
      animate={
        reduceMotion
          ? undefined
          : {
              scale: [1, 1.025, 1],
              boxShadow: [
                "0 0 0 rgba(182,0,168,0)",
                "0 0 24px rgba(182,0,168,0.24)",
                "0 0 0 rgba(182,0,168,0)",
              ],
            }
      }
      transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      whileHover={reduceMotion ? undefined : { scale: 1.045 }}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      className={`group relative overflow-hidden rounded-full border-2 px-8 py-3 text-sm font-medium uppercase tracking-widest transition-[color,background-color,border-color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B600A8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0C0C] sm:px-10 sm:py-3.5 sm:text-base ${colors}`}
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-[-45%] w-[35%] skew-x-[-22deg] bg-gradient-to-r from-transparent via-white/18 to-transparent transition-[left] duration-700 ease-out group-hover:left-[115%]"
      />
      <span className="relative z-10 inline-flex items-center justify-center gap-2.5">
        <span className="relative flex h-2 w-2">
          {!reduceMotion && (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#B600A8] opacity-55" />
          )}
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#B600A8]" />
        </span>
        Live Project
        <motion.span
          aria-hidden="true"
          animate={reduceMotion ? undefined : { x: [0, 3, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="inline-flex"
        >
          <ArrowUpRight className="h-4 w-4" />
        </motion.span>
      </span>
    </motion.a>
  );
}
