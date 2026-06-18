"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SernaturBadge } from "@/components/ui/sernatur-badge";
import { scrollToCotizar } from "@/lib/quote";
import { organicSpring, staggerContainer, fadeUpItem } from "@/lib/motion";

const IMAGES = [
  {
    src: "/images/hero/grupo-gira-playa.jpg",
    alt: "Grupo de estudiantes en gira de estudio posando en playa de arena volcánica con lago y montañas al fondo",
  },
  {
    src: "/images/hero/rafting-rapidos.jpg",
    alt: "Grupo de estudiantes haciendo rafting en rápidos con cascadas y equipo de seguridad",
  },
  {
    src: "/images/hero/grupo-rafting.jpg",
    alt: "Grupo de estudiantes con cascos y chalecos de rafting posando en plena naturaleza",
  },
] as const;

const CAROUSEL_INTERVAL_MS = 6500;

const containerVariants = staggerContainer;
const itemVariants = fadeUpItem;

function HeroCarousel({ currentIndex }: { currentIndex: number }) {
  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          opacity: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
          scale: organicSpring,
        }}
        className="absolute inset-0 will-change-transform"
      >
        <Image
          src={IMAGES[currentIndex].src}
          alt={IMAGES[currentIndex].alt}
          fill
          priority={currentIndex === 0}
          className="pointer-events-none select-none object-cover object-center"
          sizes="100vw"
        />
      </motion.div>
    </AnimatePresence>
  );
}

function HeroOverlay() {
  return (
    <>
      <div
        className="absolute inset-0 z-[1] bg-gradient-to-r from-brand-blue-950/95 via-brand-blue-950/78 via-45% to-brand-blue-950/15 to-85%"
        aria-hidden
      />
      <div
        className="absolute inset-0 z-[1] bg-gradient-to-t from-brand-blue-950/65 via-brand-blue-950/10 to-brand-blue-950/25 md:from-brand-blue-950/40 md:via-transparent md:to-transparent"
        aria-hidden
      />
      {/* Brillo cálido muy sutil — sin animación */}
      <div
        className="absolute -right-12 top-[15%] z-[1] h-48 w-48 rounded-full bg-brand-sun-300/10 blur-3xl md:h-56 md:w-56"
        aria-hidden
      />
    </>
  );
}

function HeroContent() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative z-10 flex w-full flex-col justify-center px-6 pb-20 pt-28 sm:px-10 sm:pb-24 sm:pt-32 md:px-16 lg:px-24 xl:px-28"
    >
      <div className="w-full max-w-xl text-left">
        <motion.div
          variants={itemVariants}
          className="mb-6 w-full max-w-[260px] sm:mb-8 sm:max-w-[320px] lg:max-w-[380px]"
        >
          <Image
            src="/images/logo-turismo-dabar.png"
            alt="Turismo Dabar — Logo Oficial"
            width={380}
            height={106}
            className="h-auto w-full object-contain object-left select-none drop-shadow-[0_2px_12px_rgba(0,0,0,0.25)]"
            priority
          />
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="font-[family-name:var(--font-outfit)] text-[1.75rem] font-extrabold leading-[1.12] tracking-tight text-[#fbfaf7] sm:text-[2rem] md:text-4xl lg:text-[2.75rem]"
        >
          La Gira de Estudios que recordarán{" "}
          <span className="text-brand-sun-200">para toda la vida.</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-4 max-w-[44ch] text-sm leading-relaxed text-stone-200/90 sm:mt-5 sm:text-base md:max-w-[52ch] md:text-lg"
        >
          Programas 100% todo incluido a Bariloche (Terrestre y Aéreo) y el Sur de
          Chile. Todos nuestros viajes incluyen Rafting, pensión completa, buses
          exclusivos, cobertura médica y soporte 24/7 en ruta.
        </motion.p>

        <motion.div variants={itemVariants} className="mt-5 sm:mt-6">
          <SernaturBadge variant="hero" />
        </motion.div>

        <motion.div variants={itemVariants} className="mt-7 sm:mt-8">
          <Button
            variant="primary"
            className="border border-brand-coral-600/30 px-8 py-3.5 text-base shadow-none"
            onClick={() => scrollToCotizar()}
          >
            Cotizar Viaje Grupal
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}

function CarouselIndicators({
  currentIndex,
  onSelect,
}: {
  currentIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="absolute bottom-6 left-6 z-20 flex gap-2 sm:bottom-8 sm:left-10 md:left-16 lg:left-24">
      {IMAGES.map((_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => onSelect(index)}
          className="group flex h-6 w-2.5 cursor-pointer items-center justify-center"
          aria-label={`Ir a la imagen ${index + 1}`}
          aria-current={index === currentIndex ? "true" : undefined}
        >
          <motion.div
            layout
            transition={organicSpring}
            className={`h-2 rounded-full border border-white/15 ${
              index === currentIndex
                ? "w-7 bg-brand-coral-500"
                : "w-2 bg-white/40 group-hover:bg-white/60"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
    }, CAROUSEL_INTERVAL_MS);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="relative min-h-[100dvh] w-full overflow-x-hidden select-none"
      aria-label="Hero principal — Turismo Dabar"
    >
      {/* Capa de fondo — cubre todo el alto de la sección (crece con el contenido) */}
      <div className="absolute inset-0 overflow-hidden">
        <HeroCarousel currentIndex={currentIndex} />
        <HeroOverlay />
      </div>

      {/* Contenido — min 1 pantalla, crece si el texto no cabe */}
      <div className="relative z-10 flex min-h-[100dvh] flex-col">
        <HeroContent />
      </div>

      <CarouselIndicators
        currentIndex={currentIndex}
        onSelect={setCurrentIndex}
      />
    </section>
  );
}
