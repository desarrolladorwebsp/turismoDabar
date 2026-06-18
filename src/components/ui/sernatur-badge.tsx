import Image from "next/image";
import { cn } from "@/lib/utils";

export const SERNATUR_REGISTRY_URL =
  "https://serviciosturisticos.sernatur.cl/49803-dabar-group-spa";

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
      <a
        href={SERNATUR_REGISTRY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "group rounded-lg bg-white shadow-sm ring-1 transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-brand-blue-400/40",
          isHero
            ? "w-fit shrink-0 px-3 py-2 ring-white/15"
            : "flex w-full items-center justify-center px-4 py-3.5 ring-stone-200 sm:px-5 sm:py-4",
        )}
        aria-label="Ver registro de Dabar Group SPA en el buscador oficial de SERNATUR"
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
      </a>

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
              de Chile.{" "}
              <a
                href={SERNATUR_REGISTRY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-brand-sun-200 underline underline-offset-2 transition-colors hover:text-brand-sun-100"
              >
                Ver registro oficial
              </a>
            </>
          ) : (
            <>
              Empresa registrada en el buscador oficial de SERNATUR.{" "}
              <a
                href={SERNATUR_REGISTRY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-brand-blue-700 underline underline-offset-2 transition-colors hover:text-brand-blue-800"
              >
                Ver ficha Dabar Group SPA
              </a>
            </>
          )}
        </p>
      )}
    </div>
  );
}
