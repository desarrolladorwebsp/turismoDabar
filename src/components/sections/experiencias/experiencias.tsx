"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Quotes, Info } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { organicSpring, staggerContainer, fadeUpItem } from "@/lib/motion";
import { SectionBackdrop } from "@/components/ui/section-backdrop";

interface Experience {
  id: number;
  destination: string;
  image: string;
  description: string;
  author: string;
  date: string;
  gridClass: string;
}

const EXPERIENCES: Experience[] = [
  {
    id: 1,
    destination: "Huilo Huilo",
    image: "/images/servicios/sur-chile-premium.png",
    description:
      "Jornada entre bosques nativos y cascadas del sur. Caminata guiada, almuerzo en lodge y tarde de integración grupal junto al lago.",
    author: "Centro de Padres Colegio San Javier",
    date: "Noviembre 2025",
    gridClass: "md:col-span-2 md:row-span-1",
  },
  {
    id: 2,
    destination: "Bariloche",
    image: "/images/servicios/bariloche-premium.png",
    description:
      "Día completo en la Patagonia argentina: Circuito Chico, chocolate artesanal y paseo en catamarán por el Lago Nahuel Huapi al atardecer.",
    author: "Delegación Cuarto Medio",
    date: "Octubre 2025",
    gridClass: "md:col-span-1 md:row-span-2 h-full",
  },
  {
    id: 3,
    destination: "Valdivia",
    image: "/images/servicios/sur-chile-experiencia.png",
    description:
      "Recorrido por el río Calle-Calle, mercado fluvial y visita al Fuerte Niebla. Tarde libre en el costanera con cena grupal de mariscos.",
    author: "Escuela de Lenguaje",
    date: "Septiembre 2025",
    gridClass: "md:col-span-1 md:row-span-1",
  },
  {
    id: 4,
    destination: "Torres del Paine",
    image: "/images/hero/patagonia-group.png",
    description:
      "Trekking de medio día con vistas a las torres, charla de conservación ambiental y picnic en mirador con los estudiantes.",
    author: "Liceo Bicentenario",
    date: "Noviembre 2025",
    gridClass: "md:col-span-1 md:row-span-1",
  },
  {
    id: 5,
    destination: "San Pedro de Atacama",
    image: "/images/hero/atacama-group.png",
    description:
      "Amanecer en el Valle de la Luna, baño en termas de Puritama y observación astronómica nocturna con guía local.",
    author: "Colegio Alemán",
    date: "Octubre 2025",
    gridClass: "md:col-span-1 md:row-span-1",
  },
  {
    id: 6,
    destination: "Pucón",
    image: "/images/hero/vineyard-group.png",
    description:
      "Ascenso al Volcán Villarrica con guías certificados, tarde de canopy en el bosque nativo y cena de cierre en el hotel.",
    author: "Colegio Montserrat",
    date: "Diciembre 2025",
    gridClass: "md:col-span-2 md:row-span-1",
  },
];

function usePrefersHover() {
  const [prefersHover, setPrefersHover] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setPrefersHover(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return prefersHover;
}

function ExperienceCard({
  item,
  className,
}: {
  item: Experience;
  className?: string;
}) {
  const [isActive, setIsActive] = useState(false);
  const prefersHover = usePrefersHover();

  return (
    <motion.div
      variants={fadeUpItem}
      className={cn(
        "relative rounded-[2rem] border border-stone-200/60 bg-stone-200/50 p-2 shadow-[inset_0_1.5px_2px_rgba(0,0,0,0.02)] select-none",
        className
      )}
    >
      <motion.div
        className="relative h-full w-full cursor-pointer overflow-hidden rounded-[1.65rem] border border-slate-900/10 bg-white"
        onHoverStart={() => prefersHover && setIsActive(true)}
        onHoverEnd={() => prefersHover && setIsActive(false)}
        onTap={() => !prefersHover && setIsActive((prev) => !prev)}
        whileTap={prefersHover ? undefined : { scale: 0.985 }}
        transition={organicSpring}
        role="button"
        tabIndex={0}
        aria-expanded={isActive}
        aria-label={`Experiencia en ${item.destination}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsActive((prev) => !prev);
          }
        }}
      >
        <Image
          src={item.image}
          alt={`Experiencia en ${item.destination}`}
          fill
          className={cn(
            "object-cover transition-transform duration-700",
            isActive ? "scale-[1.04]" : "scale-100"
          )}
          sizes="(max-width: 768px) 85vw, 50vw"
          priority={item.id <= 3}
        />

        <div
          className={cn(
            "pointer-events-none absolute inset-0 bg-gradient-to-t transition-all duration-500",
            isActive
              ? "from-black/95 via-black/65 to-black/20"
              : "from-black/85 via-black/35 to-transparent"
          )}
        />

        <div className="absolute inset-x-0 bottom-0 overflow-hidden px-5 pb-5 pt-16 sm:px-6 sm:pb-6">
          <motion.div
            animate={{ y: isActive ? -10 : 0 }}
            transition={organicSpring}
          >
            <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.15em] text-brand-sun-300">
              Destino Conectado
            </span>
            <h3 className="font-sans text-xl font-bold leading-tight tracking-tight text-white sm:text-2xl lg:text-3xl">
              {item.destination}
            </h3>
          </motion.div>

          <AnimatePresence initial={false}>
            {isActive && (
              <motion.div
                key="description"
                initial={{ opacity: 0, height: 0, y: 12 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: 8 }}
                transition={organicSpring}
                className="overflow-hidden"
              >
                <p className="mt-3 text-sm leading-relaxed text-stone-100/90 sm:text-[0.925rem]">
                  {item.description}
                </p>
                <p className="mt-2.5 border-t border-white/10 pt-2.5 text-[11px] text-stone-300/80 sm:text-xs">
                  {item.author} · {item.date}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Experiencias() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragLimit, setDragLimit] = useState(0);

  useEffect(() => {
    const updateLimit = () => {
      if (containerRef.current) {
        const scrollWidth = containerRef.current.scrollWidth;
        const clientWidth = containerRef.current.clientWidth;
        setDragLimit(Math.max(0, scrollWidth - clientWidth));
      }
    };

    const timer = setTimeout(updateLimit, 150);
    window.addEventListener("resize", updateLimit);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateLimit);
    };
  }, []);

  return (
    <section
      id="experiencias"
      className="relative w-full overflow-hidden border-b border-stone-200/40 bg-white py-20 md:py-28 lg:py-32"
    >
      <SectionBackdrop variant="experiencias" />

      <div className="relative mx-auto w-full max-w-7xl px-5 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={organicSpring}
          className="mx-auto mb-12 max-w-2xl text-center md:mb-20"
        >
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-brand-sun-50 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-sun-700 ring-1 ring-brand-sun-200">
            <Quotes size={13} weight="fill" />
            Experiencias Dabar
          </span>

          <h2 className="mb-4 text-3xl font-bold leading-[1.1] tracking-tight text-stone-900 sm:text-4xl md:text-[2.75rem]">
            Giras que <span className="text-brand-blue-600">Dejan Huella</span>
          </h2>

          <p className="mx-auto max-w-[50ch] text-base leading-relaxed text-stone-500 md:text-lg">
            Colegios, delegaciones y centros de padres comparten la magia de
            viajar con nosotros. Descubre sus vivencias.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="hidden w-full auto-rows-[250px] grid-cols-3 gap-6 md:grid lg:auto-rows-[290px] lg:gap-8"
        >
          {EXPERIENCES.map((item) => (
            <ExperienceCard key={item.id} item={item} className={item.gridClass} />
          ))}
        </motion.div>

        {/* Slider móvil — sin scroll horizontal accidental */}
        <div className="relative -mx-5 block w-[calc(100%+2.5rem)] overflow-hidden py-2 md:hidden">
          <div ref={containerRef} className="w-full overflow-hidden">
            <motion.div
              drag="x"
              dragConstraints={{ right: 0, left: -dragLimit }}
              dragElastic={0.06}
              dragTransition={{ bounceStiffness: 380, bounceDamping: 28 }}
              whileDrag={{ cursor: "grabbing" }}
              className="flex w-max cursor-grab gap-4 pl-5 pr-5 active:cursor-grabbing"
            >
              {EXPERIENCES.map((item) => (
                <ExperienceCard
                  key={item.id}
                  item={item}
                  className="w-[calc(100vw-2.5rem)] max-w-[340px] shrink-0 aspect-[4/5] sm:w-[72vw]"
                />
              ))}
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...organicSpring, delay: 0.15 }}
          className="mt-10 flex select-none items-center justify-center gap-2 px-2 text-xs font-medium text-stone-400 md:mt-12 md:text-sm"
        >
          <Info size={16} className="shrink-0 text-brand-blue-500" />
          <span className="hidden md:inline">
            Pasa el mouse sobre una tarjeta para leer la experiencia del día
          </span>
          <span className="inline text-center md:hidden">
            Desliza para ver más destinos y pulsa una tarjeta para leer la
            experiencia
          </span>
        </motion.div>
      </div>
    </section>
  );
}
