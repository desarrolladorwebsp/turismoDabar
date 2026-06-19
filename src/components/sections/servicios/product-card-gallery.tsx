"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { organicSpring } from "@/lib/motion";
import type { TravelProductImage } from "@/lib/travel-products";

interface ProductCardGalleryProps {
  images: TravelProductImage[];
  className?: string;
}

export function ProductCardGallery({
  images,
  className,
}: ProductCardGalleryProps) {
  const [index, setIndex] = useState(0);
  const total = images.length;
  const current = images[index];

  const goTo = useCallback(
    (next: number) => {
      setIndex((next + total) % total);
    },
    [total],
  );

  if (!current) {
    return null;
  }

  return (
    <div
      className={cn(
        "group/gallery relative aspect-[16/10] w-full overflow-hidden rounded-t-2xl bg-stone-100",
        className,
      )}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={current.src}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={current.src}
            alt={current.alt}
            fill
            priority={index === 0}
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>
      </AnimatePresence>

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-blue-950/60 via-transparent to-transparent"
        aria-hidden
      />

      {total > 1 && (
        <>
          <button
            type="button"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              goTo(index - 1);
            }}
            className="absolute left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-brand-blue-950/65 text-white shadow-sm backdrop-blur-sm transition-all duration-200 hover:bg-brand-blue-950/80 focus:outline-none focus:ring-2 focus:ring-white/40 sm:left-3 sm:h-10 sm:w-10"
            aria-label="Foto anterior"
          >
            <CaretLeft size={18} weight="bold" />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              goTo(index + 1);
            }}
            className="absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-brand-blue-950/65 text-white shadow-sm backdrop-blur-sm transition-all duration-200 hover:bg-brand-blue-950/80 focus:outline-none focus:ring-2 focus:ring-white/40 sm:right-3 sm:h-10 sm:w-10"
            aria-label="Foto siguiente"
          >
            <CaretRight size={18} weight="bold" />
          </button>

          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
            {images.map((image, dotIndex) => (
              <button
                key={image.src}
                type="button"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  setIndex(dotIndex);
                }}
                className="flex h-5 w-5 cursor-pointer items-center justify-center"
                aria-label={`Ver foto ${dotIndex + 1} de ${total}`}
                aria-current={dotIndex === index ? "true" : undefined}
              >
                <motion.span
                  layout
                  transition={organicSpring}
                  className={cn(
                    "block rounded-full bg-white transition-all",
                    dotIndex === index
                      ? "h-2 w-5"
                      : "h-2 w-2 opacity-60 hover:opacity-90",
                  )}
                />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
