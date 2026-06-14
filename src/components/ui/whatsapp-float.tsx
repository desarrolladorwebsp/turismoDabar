"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WhatsappLogo } from "@phosphor-icons/react";
import { WHATSAPP_URL } from "@/lib/contact";
import { organicSpring } from "@/lib/motion";

const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hola Turismo Dabar, me gustaría recibir información sobre sus giras de estudio."
);

const WHATSAPP_HREF = `${WHATSAPP_URL}?text=${WHATSAPP_MESSAGE}`;

export function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.75 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.85 }}
          transition={{ ...organicSpring, delay: 0.05 }}
          className="fixed bottom-5 right-5 z-50 flex items-center gap-3 sm:bottom-6 sm:right-6"
          style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <AnimatePresence>
            {showTooltip && (
              <motion.span
                initial={{ opacity: 0, x: 12, scale: 0.92 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 8, scale: 0.95 }}
                transition={organicSpring}
                className="pointer-events-none hidden rounded-xl border border-stone-200/80 bg-white px-3.5 py-2 text-xs font-semibold tracking-tight text-stone-800 shadow-[0_4px_20px_rgba(26,43,76,0.08)] sm:block"
              >
                ¿Hablamos por WhatsApp?
              </motion.span>
            )}
          </AnimatePresence>

          <div className="relative">
            <motion.span
              aria-hidden
              className="absolute inset-0 rounded-full bg-[#25D366]"
              animate={{ scale: [1, 1.35, 1], opacity: [0.45, 0, 0.45] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.span
              aria-hidden
              className="absolute inset-0 rounded-full bg-[#25D366]/30"
              animate={{ scale: [1, 1.55, 1], opacity: [0.35, 0, 0.35] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />

            <motion.a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contactar por WhatsApp a Turismo Dabar"
              initial={{ rotate: -8 }}
              animate={{ rotate: 0 }}
              whileHover={{ scale: 1.08, rotate: 2 }}
              whileTap={{ scale: 0.92 }}
              transition={organicSpring}
              className="relative flex h-14 w-14 items-center justify-center rounded-full border border-[#1fa855]/40 bg-[#25D366] text-white shadow-[0_6px_24px_rgba(37,211,102,0.35)] sm:h-[3.75rem] sm:w-[3.75rem]"
            >
              <motion.span
                animate={{ y: [0, -2, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <WhatsappLogo size={30} weight="fill" />
              </motion.span>
            </motion.a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
