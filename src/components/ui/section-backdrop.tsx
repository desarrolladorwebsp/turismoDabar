"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

type BackdropVariant = "servicios" | "experiencias" | "cotizar";

/** Textura papel — casi imperceptible */
function PaperGrain() {
  return (
    <div
      className="absolute inset-0 opacity-[0.022]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.45'/%3E%3C/svg%3E")`,
      }}
      aria-hidden
    />
  );
}

/** Curvas de nivel — estáticas, pocas líneas, muy suaves */
function TopoContours({
  className,
  stroke = "currentColor",
  lines = 4,
}: {
  className?: string;
  stroke?: string;
  lines?: number;
}) {
  return (
    <svg
      className={cn("absolute inset-0 h-full w-full", className)}
      viewBox="0 0 900 600"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden
    >
      {Array.from({ length: lines }).map((_, i) => (
        <ellipse
          key={i}
          cx={460 + i * 6}
          cy={340 - i * 32}
          rx={280 + i * 50}
          ry={150 + i * 28}
          stroke={stroke}
          strokeWidth="0.9"
          opacity={0.07 - i * 0.008}
        />
      ))}
    </svg>
  );
}

/** Acento de color en una esquina — sin animación */
function CornerTint({
  className,
  color,
}: {
  className?: string;
  color: string;
}) {
  return (
    <div
      className={cn("absolute", className)}
      style={{
        background: `radial-gradient(ellipse at center, ${color} 0%, transparent 72%)`,
      }}
      aria-hidden
    />
  );
}

/** Paisaje de fondo — visible, velo ligero para resaltar el formulario */
function FormBackgroundPhoto() {
  return (
    <div className="absolute inset-0" aria-hidden>
      <Image
        src="/images/servicios/bariloche-premium.png"
        alt=""
        fill
        priority={false}
        className="object-cover object-center saturate-[0.95] brightness-[0.9]"
        sizes="100vw"
      />
      {/* Velo único y suave — la foto se ve clara; el formulario blanco contrasta encima */}
      <div className="absolute inset-0 bg-[#fbfaf7]/30" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#fbfaf7]/40 via-[#fbfaf7]/22 to-[#fbfaf7]/38" />
    </div>
  );
}

export function SectionBackdrop({ variant }: { variant: BackdropVariant }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {variant !== "cotizar" && <PaperGrain />}

      {variant === "servicios" && (
        <>
          <CornerTint
            className="-bottom-32 -left-24 h-64 w-64"
            color="rgb(26 91 160 / 0.06)"
          />
          <TopoContours
            className="opacity-100"
            stroke="#1a5ba0"
            lines={4}
          />
        </>
      )}

      {variant === "experiencias" && (
        <>
          <CornerTint
            className="-right-20 -top-20 h-56 w-56"
            color="rgb(177 92 71 / 0.05)"
          />
          <TopoContours
            className="opacity-100"
            stroke="#9a4d3a"
            lines={3}
          />
        </>
      )}

      {variant === "cotizar" && <FormBackgroundPhoto />}
    </div>
  );
}
