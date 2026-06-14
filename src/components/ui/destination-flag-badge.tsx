import { cn } from "@/lib/utils";

export type DestinationRegion = "chile" | "argentina";

const REGION_LABEL: Record<DestinationRegion, string> = {
  chile: "Destino nacional — Chile",
  argentina: "Destino internacional — Argentina",
};

const REGION_SHORT: Record<DestinationRegion, string> = {
  chile: "Nacional",
  argentina: "Internacional",
};

function ChileFlagIcon() {
  return (
    <svg
      viewBox="0 0 36 24"
      aria-hidden
      className="h-full w-full rounded-[3px]"
    >
      <rect width="36" height="12" fill="#ffffff" />
      <rect y="12" width="36" height="12" fill="#d52b1e" />
      <rect width="12" height="12" fill="#0039a6" />
      <path
        fill="#ffffff"
        d="M6 4.2l.9 2.7h2.8l-2.3 1.7.9 2.7L6 9.6 3.7 11.3l.9-2.7-2.3-1.7h2.8z"
      />
    </svg>
  );
}

function ArgentinaFlagIcon() {
  return (
    <svg
      viewBox="0 0 36 24"
      aria-hidden
      className="h-full w-full rounded-[3px]"
    >
      <rect width="36" height="8" fill="#74acdf" />
      <rect y="8" width="36" height="8" fill="#ffffff" />
      <rect y="16" width="36" height="8" fill="#74acdf" />
      <circle cx="18" cy="12" r="2.8" fill="#f6b40e" stroke="#85340a" strokeWidth="0.5" />
    </svg>
  );
}

interface DestinationFlagBadgeProps {
  region: DestinationRegion;
  className?: string;
}

export function DestinationFlagBadge({
  region,
  className,
}: DestinationFlagBadgeProps) {
  return (
    <div
      className={cn("pointer-events-none flex items-center gap-2", className)}
      title={REGION_LABEL[region]}
      aria-label={REGION_LABEL[region]}
    >
      <span className="hidden rounded-full border border-stone-200 bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-stone-500 shadow-[0_2px_8px_rgba(26,43,76,0.06)] sm:inline-flex">
        {REGION_SHORT[region]}
      </span>

      <div
        className={cn(
          "flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-stone-200 bg-white p-1.5",
          "shadow-[0_6px_20px_rgba(26,43,76,0.12)] ring-[3px] ring-white sm:h-[3.25rem] sm:w-[3.25rem]"
        )}
      >
        <div className="h-full w-full overflow-hidden rounded-full ring-1 ring-stone-100">
          {region === "chile" ? <ChileFlagIcon /> : <ArgentinaFlagIcon />}
        </div>
      </div>
    </div>
  );
}
