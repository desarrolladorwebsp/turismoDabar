"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  WhatsappLogo,
  CheckCircle,
  X,
  PaperPlaneTilt,
  Clock,
} from "@phosphor-icons/react";
import { WHATSAPP_URL, WHATSAPP_DISPLAY } from "@/lib/contact";
import { organicSpring } from "@/lib/motion";

const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hola Turismo Dabar, acabo de enviar una solicitud de cotización desde la web. ¿Podemos conversar?"
);

const WHATSAPP_HREF = `${WHATSAPP_URL}?text=${WHATSAPP_MESSAGE}`;

const contentVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { ...organicSpring, delay: 0.15 + i * 0.07 },
  }),
};

interface QuoteSuccessModalProps {
  onClose: () => void;
}

export function QuoteSuccessModal({ onClose }: QuoteSuccessModalProps) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[70] flex items-end justify-center p-4 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-success-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-brand-blue-950/55 backdrop-blur-[3px]"
        aria-label="Cerrar alerta"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, y: 48, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 28, scale: 0.97 }}
        transition={organicSpring}
        className="relative z-10 w-full max-w-[26rem] overflow-hidden rounded-2xl border border-stone-200 bg-[#fbfaf7] shadow-[0_28px_80px_rgba(26,43,76,0.22)] sm:max-w-md"
      >
        <div className="relative h-[5.5rem] overflow-hidden bg-gradient-to-br from-[#1a2b4c] via-brand-blue-900 to-brand-blue-800">
          <div
            className="absolute -right-6 -top-10 h-28 w-28 rounded-full bg-brand-sun-300/20 blur-2xl"
            aria-hidden
          />
          <div
            className="absolute -left-8 bottom-0 h-20 w-20 rounded-full bg-brand-coral-400/10 blur-xl"
            aria-hidden
          />
          <div
            className="absolute inset-x-0 bottom-0 h-px bg-white/10"
            aria-hidden
          />

          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
            aria-label="Cerrar"
          >
            <X size={16} weight="bold" />
          </button>

          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ ...organicSpring, delay: 0.12 }}
            className="absolute bottom-0 left-1/2 flex h-[4.25rem] w-[4.25rem] -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full border border-stone-200 bg-white shadow-[0_8px_28px_rgba(26,43,76,0.14)] ring-[3px] ring-[#fbfaf7]"
          >
            <CheckCircle
              size={36}
              weight="fill"
              className="text-brand-coral-500"
            />
          </motion.div>
        </div>

        <div className="px-6 pb-7 pt-12 text-center sm:px-8 sm:pb-8">
          <motion.span
            custom={0}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-1.5 rounded-full bg-brand-sun-50 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-sun-700 ring-1 ring-brand-sun-200"
          >
            <PaperPlaneTilt size={12} weight="fill" />
            Solicitud enviada
          </motion.span>

          <motion.h3
            id="quote-success-title"
            custom={1}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="mt-4 font-[family-name:var(--font-outfit)] text-[1.65rem] font-bold leading-tight tracking-tight text-stone-900 sm:text-[1.85rem]"
          >
            ¡Tu solicitud ha sido recibida!
          </motion.h3>

          <motion.p
            custom={2}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="mx-auto mt-3 max-w-[34ch] text-sm leading-relaxed text-stone-600 sm:text-[0.95rem]"
          >
            Gracias por confiar en Turismo Dabar. Revisaremos tu información y{" "}
            <span className="font-semibold text-brand-blue-800">
              te contactaremos lo más pronto posible
            </span>{" "}
            con una propuesta pensada para tu curso.
          </motion.p>

          <motion.div
            custom={3}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="mt-3 inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-3.5 py-1.5 text-xs text-stone-500"
          >
            <Clock size={14} weight="duotone" className="text-brand-blue-600" />
            Respondemos en horario comercial
          </motion.div>

          <motion.div
            custom={4}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="mt-7 rounded-2xl border border-stone-200 bg-white p-4 text-left sm:p-5"
          >
            <div className="flex items-start gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#25D366]/25 bg-[#25D366]/8">
                <WhatsappLogo
                  size={22}
                  weight="fill"
                  className="text-[#128C7E]"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold tracking-tight text-stone-900">
                  ¿Necesitas comunicarte con nosotros?
                </p>
                <p className="mt-1 text-xs leading-relaxed text-stone-500">
                  Si prefieres una respuesta inmediata, escríbenos por nuestro
                  WhatsApp comercial.
                </p>
                <p className="mt-2 text-sm font-semibold text-brand-blue-700">
                  {WHATSAPP_DISPLAY}
                </p>
              </div>
            </div>

            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex w-full items-center justify-center gap-2.5 rounded-xl border border-[#1fa855]/35 bg-[#25D366] px-5 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#20bd5a] focus:outline-none focus:ring-2 focus:ring-[#25D366]/40 focus:ring-offset-2"
            >
              <WhatsappLogo size={18} weight="fill" />
              Escribir por WhatsApp
            </a>
          </motion.div>

          <motion.button
            custom={5}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            type="button"
            onClick={onClose}
            className="mt-5 w-full py-2 text-sm font-medium text-stone-500 transition-colors hover:text-stone-800"
          >
            Entendido, gracias
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
