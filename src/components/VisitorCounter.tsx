import { Eye } from "lucide-react";
import { useEffect, useState } from "react";

const VISITOR_ID_KEY = "portfolio:visitor-id";

function getVisitorId() {
  const existingId = window.localStorage.getItem(VISITOR_ID_KEY);
  if (existingId) return existingId;

  const visitorId = crypto.randomUUID();
  window.localStorage.setItem(VISITOR_ID_KEY, visitorId);
  return visitorId;
}

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function registerVisit() {
      try {
        const response = await fetch("/api/visitor-count", {
          method: "POST",
          headers: {
            "x-visitor-id": getVisitorId(),
          },
          signal: controller.signal,
        });

        if (!response.ok) return;
        const payload = (await response.json()) as { count?: number };
        if (typeof payload.count === "number") setCount(payload.count);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }

    void registerVisit();
    return () => controller.abort();
  }, []);

  if (count === null) return null;

  return (
    <div
      className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#D7E2EA]/14 bg-[#D7E2EA]/[0.025] px-3.5 text-[10px] uppercase tracking-[0.12em] text-[#D7E2EA]/52 sm:text-[11px]"
      aria-label={`${count.toLocaleString()} unique visitors`}
      title="Unique visitors"
    >
      <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-[#B600A8]/12 text-[#D7E2EA]/72">
        <span className="absolute inset-0 animate-pulse rounded-full bg-[#B600A8]/8" aria-hidden="true" />
        <Eye className="relative h-3.5 w-3.5" aria-hidden="true" />
      </span>
      <span className="font-semibold tabular-nums text-[#D7E2EA]/82">
        {count.toLocaleString()}
      </span>
      <span>Visitors</span>
    </div>
  );
}
