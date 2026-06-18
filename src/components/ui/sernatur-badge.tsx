import Image from "next/image";
import { cn } from "@/lib/utils";

interface SernaturBadgeProps {
  variant?: "hero" | "panel";
  className?: string;
  showCaption?: boolean;
}

export function SernaturBadge({
  variant = "hero",
  className,
  showCaption = true,
}: SernaturBadgeProps) {
  const isHero = variant === "hero";

  return (
    <div
      className={cn(
        isHero ? "flex items-center gap-3" : "flex w-full flex-col items-center gap-3 text-center",
        className,
      )}
      aria-label="Certificación SERNATUR"
    >
      <div
        className={cn(
          "rounded-lg bg-white shadow-sm ring-1",
          isHero
            ? "w-fit shrink-0 px-3 py-2 ring-white/15"
            : "flex w-full items-center justify-center px-4 py-3.5 ring-stone-200 sm:px-5 sm:py-4",
        )}
      >
        <Image
          src="/images/hero/sernatur.png"
          alt="SERNATUR — Servicio Nacional de Turismo, Gobierno de Chile"
          width={isHero ? 220 : 480}
          height={isHero ? 52 : 112}
          className={cn(
            "object-contain",
            isHero
              ? "h-7 w-auto max-w-[200px] object-left sm:h-8 sm:max-w-[220px]"
              : "h-auto w-full max-h-12 object-center sm:max-h-14 md:max-h-16",
          )}
        />
      </div>

      {showCaption && (
        <p
          className={cn(
            "leading-snug",
            isHero
              ? "max-w-[22ch] text-[11px] text-stone-300/90 sm:text-xs"
              : "w-full text-center text-xs leading-relaxed text-stone-500",
          )}
        >
          {isHero ? (
            <>
              Estamos certificado ante el{" "}
              <span className="text-stone-200">
                Servicio Nacional de Turismo
              </span>{" "}
              de Chile.
            </>
          ) : (
            <>Empresa registrada en el buscador oficial de SERNATUR.</>
          )}
        </p>
      )}
    </div>
  );
}
