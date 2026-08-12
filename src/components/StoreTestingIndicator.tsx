export default function StoreTestingIndicator({ compact = false }: { compact?: boolean }) {
  return (
    <div
      aria-label="Itinera is availabe for the App Store and Google Play"
      className={`inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-[#B600A8]/35 bg-[#B600A8]/8 text-[#D7E2EA]/72 ${
        compact
          ? "px-2.5 py-1.5 text-[8px] uppercase tracking-[0.1em] md:text-[9px]"
          : "px-4 py-2.5 text-[10px] uppercase tracking-[0.13em] sm:text-xs"
      }`}
    >
      <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#B600A8] opacity-45" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#B600A8]" />
      </span>
      <span className="font-semibold text-[#D7E2EA]">Available</span>
      <span aria-hidden="true" className="text-[#D7E2EA]/28">•</span>
      <span>App Store &amp; Google Play</span>
    </div>
  );
}
