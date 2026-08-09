interface LiveProjectButtonProps {
  variant?: "light" | "dark";
}

export default function LiveProjectButton({ variant = "light" }: LiveProjectButtonProps) {
  const colors =
    variant === "dark"
      ? "border-[#0C0C0C] text-[#0C0C0C] hover:bg-[#0C0C0C]/5"
      : "border-[#D7E2EA] text-[#D7E2EA] hover:bg-[#D7E2EA]/10";

  return (
    <button
      type="button"
      className={`rounded-full border-2 font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base transition-colors ${colors}`}
    >
      Live Project
    </button>
  );
}
