"use client";

import { scrollToCotizar, type QuoteDestination } from "@/lib/quote";

export function PlanPageCta({
  destination,
}: {
  destination: QuoteDestination;
}) {
  return (
    <div className="flex flex-wrap gap-3 pt-2">
      <button
        type="button"
        onClick={() => scrollToCotizar(destination)}
        className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-brand-coral-500 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-coral-600"
      >
        Cotizar este plan
      </button>
      <a
        href="/#servicios"
        className="inline-flex items-center justify-center rounded-xl border border-stone-200 bg-white px-6 py-3.5 text-sm font-semibold text-stone-800 transition-colors hover:border-stone-300"
      >
        Comparar todos los planes
      </a>
    </div>
  );
}
