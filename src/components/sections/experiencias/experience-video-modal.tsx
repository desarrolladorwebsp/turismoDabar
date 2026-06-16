"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "@phosphor-icons/react";
import { organicSpring } from "@/lib/motion";
import type { ExperienceGalleryItem } from "@/components/sections/experiencias/experience-gallery-data";

interface ExperienceVideoModalProps {
  item: ExperienceGalleryItem | null;
  onClose: () => void;
}

export function ExperienceVideoModal({
  item,
  onClose,
}: ExperienceVideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!item) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [item]);

  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [item, onClose]);

  useEffect(() => {
    if (item && videoRef.current) {
      videoRef.current.currentTime = 0;
      void videoRef.current.play().catch(() => undefined);
    }
  }, [item]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {item ? (
        <motion.div
          key={item.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/95 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`Reproducir video: ${item.title}`}
          onClick={onClose}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6 sm:top-6"
            aria-label="Cerrar video"
          >
            <X size={20} weight="bold" />
          </button>

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={organicSpring}
            className="relative z-10 w-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_24px_80px_rgba(0,0,0,0.55)]">
              <video
                ref={videoRef}
                src={item.src}
                poster={item.poster}
                controls
                playsInline
                className="max-h-[78dvh] w-full bg-black object-contain"
              />
            </div>

            <div className="mt-4 text-center sm:mt-5">
              <p className="text-lg font-semibold tracking-tight text-white sm:text-xl">
                {item.title}
              </p>
              <p className="mt-1 text-sm text-stone-400">{item.caption}</p>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}
