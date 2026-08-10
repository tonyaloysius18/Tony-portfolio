import type { LucideIcon } from "lucide-react";
import FadeIn from "./FadeIn";

interface ProofCellProps {
  value: string;
  label: string;
  icon: LucideIcon;
  index: number;
  once?: boolean;
}

export default function ProofCell({ value, label, icon: Icon, index, once }: ProofCellProps) {
  return (
    <FadeIn delay={index * 0.12} y={10} duration={0.55} once={once}>
      <div
        className="group relative min-h-36 rounded-2xl border border-[#D7E2EA]/20 bg-[#D7E2EA]/[0.025] p-5 transition-colors duration-300 hover:border-[#D7E2EA]/80"
        data-proof-cell={label}
      >
        <Icon
          size={18}
          aria-hidden="true"
          className="absolute right-4 top-4 text-[#D7E2EA] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
        <span className="block pr-7 text-2xl font-bold leading-tight text-[#D7E2EA] sm:text-3xl">
          {value}
        </span>
        <span className="mt-5 block max-w-32 text-xs font-medium uppercase tracking-[0.16em] text-[#D7E2EA]/70">
          {label}
        </span>
      </div>
    </FadeIn>
  );
}
