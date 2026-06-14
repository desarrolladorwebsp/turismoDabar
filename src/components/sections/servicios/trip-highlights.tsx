import { Check } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface TripHighlightsProps {
  items: string[];
  className?: string;
}

export function TripHighlights({ items, className }: TripHighlightsProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-stone-200/80 bg-[#fbfaf7]/80 px-4 py-3.5",
        className
      )}
    >
      <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-blue-700">
        Destacados del viaje
      </p>
      <ul
        className={cn(
          "grid gap-1.5",
          items.length > 5 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"
        )}
      >
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2 text-xs leading-snug text-stone-700"
          >
            <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-coral-50 ring-1 ring-brand-coral-100">
              <Check
                size={10}
                weight="bold"
                className="text-brand-coral-500"
              />
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
