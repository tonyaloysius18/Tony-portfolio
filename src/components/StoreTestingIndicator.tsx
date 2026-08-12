export default function StoreTestingIndicator({ compact = false }: { compact?: boolean }) {
  const iconSize = compact ? "h-3 w-3" : "h-3.5 w-3.5";

  return (
    <div
      aria-label="Itinera is available for the App Store and Google Play"
      className={`inline-flex max-w-full flex-nowrap items-center gap-x-1.5 whitespace-nowrap rounded-full border border-[#B600A8]/35 bg-[#B600A8]/8 text-[#D7E2EA]/72 min-[380px]:gap-x-2 ${
        compact
          ? "px-2.5 py-1.5 text-[8px] uppercase tracking-[0.1em] md:text-[9px]"
          : "px-3 py-2.5 text-[8px] uppercase tracking-[0.08em] min-[380px]:px-4 min-[380px]:text-[9px] sm:text-xs sm:tracking-[0.13em]"
      }`}
    >
      <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#B600A8] opacity-45" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#B600A8]" />
      </span>
      <span className="font-semibold text-[#D7E2EA]">Available</span>
      <span aria-hidden="true" className="text-[#D7E2EA]/28">•</span>
      <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
        <svg
          aria-hidden="true"
          className={`${iconSize} shrink-0 text-[#D7E2EA]`}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.28-.07 2.2.7 2.97.75 1.15-.23 2.25-.89 3.47-.8 1.46.12 2.56.69 3.29 1.75-3.01 1.8-2.29 5.77.46 6.88-.55 1.45-1.27 2.88-2.19 4.39ZM12.03 7.25c-.15-2.16 1.61-3.95 3.62-4.12.28 2.5-2.27 4.37-3.62 4.12Z" />
        </svg>
        <span>App Store</span>
      </span>
      <span aria-hidden="true" className="text-[#D7E2EA]/28">+</span>
      <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
        <svg
          aria-hidden="true"
          className={`${iconSize} shrink-0`}
          viewBox="0 0 24 24"
        >
          <path fill="#00D7FE" d="M3.2 2.6c-.32.36-.5.9-.5 1.58v15.64c0 .68.18 1.22.5 1.58l.1.1L12.06 12v-.22L3.3 2.5l-.1.1Z" />
          <path fill="#FFCE00" d="m15 15.2-2.94-3.2v-.22L15 8.58l.08.05 3.48 1.98c.99.56.99 1.48 0 2.05l-3.48 1.98-.08.56Z" />
          <path fill="#FF3A44" d="M15.08 14.64 12.06 12 3.2 21.4c.5.56 1.34.63 2.28.1l9.6-6.86Z" />
          <path fill="#00F076" d="M15.08 8.63 5.48 2.17c-.94-.53-1.78-.46-2.28.43l8.86 9.4 3.02-3.37Z" />
        </svg>
        <span>Play Store</span>
      </span>
    </div>
  );
}
