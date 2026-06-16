"use client";

import { useState, useEffect, useRef, type CSSProperties } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Quotes, Info, Play } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { organicSpring, staggerContainer, fadeUpItem } from "@/lib/motion";
import { SectionBackdrop } from "@/components/ui/section-backdrop";
import {
  EXPERIENCE_GALLERY,
  EXPERIENCE_GRID_ROWS,
  type ExperienceGalleryItem,
} from "@/components/sections/experiencias/experience-gallery-data";
import { ExperienceVideoModal } from "@/components/sections/experiencias/experience-video-modal";

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

function GalleryCard({
  item,
  className,
  style,
  onPlayVideo,
}: {
  item: ExperienceGalleryItem;
  className?: string;
  style?: CSSProperties;
  onPlayVideo: (item: ExperienceGalleryItem) => void;
}) {
  const [isActive, setIsActive] = useState(false);
  const prefersHover = usePrefersHover();
  const isVideo = item.type === "video";
  const mediaSrc = isVideo ? item.poster ?? item.src : item.src;

  const handleActivate = () => {
    if (isVideo) {
      onPlayVideo(item);
      return;
    }
    if (!prefersHover) {
      setIsActive((prev) => !prev);
    }
  };

  return (
    <motion.div
      variants={fadeUpItem}
      style={style}
      className={cn(
        "relative rounded-[2rem] border border-stone-200/60 bg-stone-200/50 p-2 shadow-[inset_0_1.5px_2px_rgba(0,0,0,0.02)] select-none",
        className
      )}
    >
      <motion.div
        className="relative h-full min-h-[280px] w-full cursor-pointer overflow-hidden rounded-[1.65rem] border border-slate-900/10 bg-stone-900"
        onHoverStart={() => prefersHover && !isVideo && setIsActive(true)}
        onHoverEnd={() => prefersHover && !isVideo && setIsActive(false)}
        onClick={handleActivate}
        whileTap={{ scale: 0.985 }}
        transition={organicSpring}
        role="button"
        tabIndex={0}
        aria-expanded={!isVideo ? isActive : undefined}
        aria-label={
          isVideo
            ? `Reproducir video: ${item.title}`
            : `Experiencia: ${item.title}`
        }
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleActivate();
          }
        }}
      >
        <Image
          src={mediaSrc}
          alt={item.alt}
          fill
          className={cn(
            "object-cover transition-transform duration-700",
            isVideo ? "scale-100" : isActive ? "scale-[1.04]" : "scale-100"
          )}
          style={{ objectPosition: item.objectPosition }}
          sizes="(max-width: 768px) 85vw, 33vw"
          priority={item.mobileOrder <= 3}
        />

        {isVideo && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-black/45 text-white shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-sm transition-transform duration-300 group-hover:scale-105 sm:h-[4.5rem] sm:w-[4.5rem]">
              <Play size={28} weight="fill" className="ml-1" />
            </div>
          </div>
        )}

        <div
          className={cn(
            "pointer-events-none absolute inset-0 bg-gradient-to-t transition-all duration-500",
            isVideo
              ? "from-black/80 via-black/25 to-black/10"
              : isActive
                ? "from-black/95 via-black/65 to-black/20"
                : "from-black/85 via-black/35 to-transparent"
          )}
        />

        <div className="absolute inset-x-0 bottom-0 overflow-hidden px-5 pb-5 pt-16 sm:px-6 sm:pb-6">
          <motion.div
            animate={{ y: isActive && !isVideo ? -10 : 0 }}
            transition={organicSpring}
          >
            <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.15em] text-brand-sun-300">
              {isVideo ? "Ver video" : "Experiencia real"}
            </span>
            <h3 className="font-sans text-xl font-bold leading-tight tracking-tight text-white sm:text-2xl lg:text-[1.65rem]">
              {item.title}
            </h3>
          </motion.div>

          <AnimatePresence initial={false}>
            {((isActive && !isVideo) || isVideo) && (
              <motion.div
                key="description"
                initial={{ opacity: 0, height: 0, y: 12 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: 8 }}
                transition={organicSpring}
                className="overflow-hidden"
              >
                <p className="mt-3 text-sm leading-relaxed text-stone-100/90 sm:text-[0.925rem]">
                  {isVideo
                    ? "Toca para ver el momento en video con fondo oscuro."
                    : item.description}
                </p>
                <p className="mt-2.5 border-t border-white/10 pt-2.5 text-[11px] text-stone-300/80 sm:text-xs">
                  {item.caption}
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
  const [activeVideo, setActiveVideo] = useState<ExperienceGalleryItem | null>(
    null
  );

  const sortedMobile = [...EXPERIENCE_GALLERY].sort(
    (a, b) => a.mobileOrder - b.mobileOrder
  );

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
    <>
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
              Fotos y videos reales de nuestros viajes: rafting, cabalgatas,
              parques acuáticos y la energía de cada curso en ruta.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="hidden w-full grid-cols-3 gap-5 md:grid lg:gap-6"
            style={{
              gridTemplateRows: `repeat(${EXPERIENCE_GRID_ROWS}, minmax(220px, 1fr))`,
            }}
          >
            {EXPERIENCE_GALLERY.map((item) => (
              <GalleryCard
                key={item.id}
                item={item}
                style={{
                  gridColumn: `${item.grid.colStart} / span ${item.grid.colSpan}`,
                  gridRow: `${item.grid.rowStart} / span ${item.grid.rowSpan}`,
                }}
                onPlayVideo={setActiveVideo}
              />
            ))}
          </motion.div>

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
                {sortedMobile.map((item) => (
                  <GalleryCard
                    key={item.id}
                    item={item}
                    className="w-[calc(100vw-2.5rem)] max-w-[340px] shrink-0 aspect-[4/5] sm:w-[72vw]"
                    onPlayVideo={setActiveVideo}
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
              Pasa el mouse sobre una foto para leer más · Haz clic en los
              videos para reproducirlos
            </span>
            <span className="inline text-center md:hidden">
              Desliza la galería · Toca una foto para leer más o un video para
              verlo en pantalla completa
            </span>
          </motion.div>
        </div>
      </section>

      <ExperienceVideoModal
        item={activeVideo}
        onClose={() => setActiveVideo(null)}
      />
    </>
  );
}
