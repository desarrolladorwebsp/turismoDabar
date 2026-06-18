"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { scrollToCotizar } from "@/lib/quote";

const NAV_ITEMS = [
  { label: "Inicio", href: "#" },
  { label: "Planes", href: "/planes" },
  { label: "Experiencias", href: "#experiencias" },
  { label: "Cotizar", href: "#cotizar" },
] as const;

function handleNavItemClick(
  href: string,
  onNavigate?: () => void
) {
  return (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (href === "#cotizar") {
      event.preventDefault();
      onNavigate?.();
      scrollToCotizar();
    } else if (href === "#") {
      event.preventDefault();
      onNavigate?.();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      onNavigate?.();
    }
  };
}

const SCROLL_THRESHOLD = 8;

/** Interpolación lineal para transiciones de color en scroll */
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/** Curva suave 0→1 para evitar saltos bruscos de contraste */
function smoothstep(t: number) {
  const clamped = Math.min(Math.max(t, 0), 1);
  return clamped * clamped * (3 - 2 * clamped);
}

function getHeroScrollThreshold() {
  if (typeof window === "undefined") return 520;
  return window.innerHeight * 0.68;
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  /** true = sobre el Hero (textos claros); false = secciones claras (textos oscuros) */
  const [isOverHero, setIsOverHero] = useState(true);

  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);
  const heroThresholdRef = useRef(getHeroScrollThreshold());

  const refreshHeroThreshold = useCallback(() => {
    heroThresholdRef.current = getHeroScrollThreshold();
    setIsOverHero(window.scrollY < heroThresholdRef.current);
  }, []);

  useEffect(() => {
    refreshHeroThreshold();
    window.addEventListener("resize", refreshHeroThreshold);
    return () => window.removeEventListener("resize", refreshHeroThreshold);
  }, [refreshHeroThreshold]);

  /* ── Ocultar al bajar · Mostrar al subir ── */
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsOverHero(latest < heroThresholdRef.current);

    if (latest < 40) {
      setIsHidden(false);
      lastScrollY.current = latest;
      return;
    }

    const diff = latest - lastScrollY.current;
    if (Math.abs(diff) > SCROLL_THRESHOLD) {
      setIsHidden(diff > 0);
      lastScrollY.current = latest;
    }
  });

  /* ── Fondo y borde: navy glass (Hero) → crema esmerilada (scroll) ── */
  const backgroundColor = useTransform(scrollY, (y) => {
    const threshold = heroThresholdRef.current;
    const t = smoothstep(y / threshold);

    return `rgba(${Math.round(lerp(7, 251, t))}, ${Math.round(lerp(26, 250, t))}, ${Math.round(lerp(48, 247, t))}, ${lerp(0.42, 0.88, t).toFixed(2)})`;
  });

  const borderColor = useTransform(scrollY, (y) => {
    const threshold = heroThresholdRef.current;
    const t = smoothstep(y / threshold);

    return `rgba(${Math.round(lerp(255, 28, t))}, ${Math.round(lerp(255, 25, t))}, ${Math.round(lerp(255, 23, t))}, ${lerp(0.14, 0.1, t).toFixed(2)})`;
  });

  const backdropBlur = useTransform(scrollY, (y) => {
    const t = smoothstep(y / heroThresholdRef.current);
    return `blur(${lerp(6, 16, t).toFixed(1)}px)`;
  });

  const navShadow = useTransform(scrollY, (y) => {
    const t = smoothstep(y / heroThresholdRef.current);
    const alpha = lerp(0.08, 0.04, t);
    return `0 4px 24px rgba(0,0,0,${alpha.toFixed(3)})`;
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100dvh";
    } else {
      document.body.style.overflow = "";
      document.body.style.height = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.height = "";
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  /** En Hero: textos crema; en scroll: textos oscuros sobre fondo claro */
  const useLightNavText = isOverHero && !isOpen;

  const linkClassName = cn(
    "text-sm font-semibold tracking-tight transition-colors duration-300 cursor-pointer",
    useLightNavText
      ? "text-stone-100 hover:text-white"
      : "text-stone-700 hover:text-brand-blue-700"
  );

  const hamburgerLineClass = cn(
    "h-[2px] w-5 rounded-full origin-center transition-colors duration-300",
    useLightNavText ? "bg-stone-100" : "bg-brand-blue-800"
  );

  const lineSpring = {
    type: "spring" as const,
    stiffness: 380,
    damping: 26,
  };

  const lineTopVariants = {
    closed: { rotate: 0, y: 0 },
    opened: { rotate: 45, y: 5 },
  };
  const lineMiddleVariants = {
    closed: { opacity: 1, scale: 1 },
    opened: { opacity: 0, scale: 0 },
  };
  const lineBottomVariants = {
    closed: { rotate: 0, y: 0 },
    opened: { rotate: -45, y: -5 },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const menuContainerVariants = {
    hidden: { x: "100%" },
    visible: {
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 320,
        damping: 32,
      },
    },
    exit: {
      x: "100%",
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 36,
      },
    },
  };

  const navListVariants = {
    visible: {
      transition: { staggerChildren: 0.08, delayChildren: 0.12 },
    },
  };

  const navLinkVariants = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 280,
        damping: 24,
      },
    },
  };

  /** En móvil con menú abierto, ocultamos la isla flotante para no duplicar barra */
  const hideFloatingNav = (isHidden && !isOpen) || isOpen;

  return (
    <>
      <motion.nav
        animate={{ y: hideFloatingNav ? -120 : 0 }}
        transition={{
          type: "spring",
          stiffness: 380,
          damping: 32,
        }}
        style={{
          backgroundColor,
          borderColor,
          backdropFilter: backdropBlur,
          boxShadow: navShadow,
        }}
        aria-hidden={isOpen}
        className="fixed top-4 left-1/2 z-50 flex h-16 w-[92%] max-w-7xl -translate-x-1/2 items-center justify-between rounded-2xl border px-5 md:px-8"
      >
        {/* Logotipo — invertido sobre Hero para máximo contraste */}
        <a href="#" className="z-50 flex cursor-pointer items-center py-1">
          <Image
            src="/images/logo-turismo-dabar.png"
            alt="Turismo Dabar — Giras de Estudio y Viajes Grupales"
            width={180}
            height={50}
            className={cn(
              "h-10 w-auto object-contain select-none transition-all duration-300 hover:scale-[1.02] sm:h-11 md:h-12",
              useLightNavText && "brightness-0 invert drop-shadow-[0_1px_6px_rgba(0,0,0,0.35)]"
            )}
            priority
          />
        </a>

        {/* Navegación Desktop */}
        <div className="hidden items-center gap-8 md:flex lg:gap-10">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={handleNavItemClick(item.href)}
              className={linkClassName}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* CTA Desktop — terracota legible en ambos modos */}
        <div className="hidden items-center md:flex">
          <Button
            variant="primary"
            className="border border-brand-coral-600/25 px-5 py-2 text-sm shadow-none"
            onClick={() => scrollToCotizar()}
          >
            Cotizar Ahora
          </Button>
        </div>

        {/* Hamburguesa — alto contraste según contexto */}
        <button
          type="button"
          onClick={toggleMenu}
          className={cn(
            "z-50 flex h-10 w-10 cursor-pointer flex-col items-center justify-center rounded-xl border transition-colors duration-300 focus:outline-none md:hidden",
            useLightNavText
              ? "border-white/25 bg-white/10 hover:bg-white/18"
              : "border-brand-blue-200 bg-brand-blue-50 hover:bg-brand-blue-100"
          )}
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isOpen}
        >
          <div className="flex w-5 flex-col justify-center gap-1">
            <motion.span
              variants={lineTopVariants}
              animate={isOpen ? "opened" : "closed"}
              transition={lineSpring}
              className={hamburgerLineClass}
            />
            <motion.span
              variants={lineMiddleVariants}
              animate={isOpen ? "opened" : "closed"}
              transition={lineSpring}
              className={hamburgerLineClass}
            />
            <motion.span
              variants={lineBottomVariants}
              animate={isOpen ? "opened" : "closed"}
              transition={lineSpring}
              className={hamburgerLineClass}
            />
          </div>
        </button>
      </motion.nav>

      {/* Menú Móvil — por encima de la isla flotante (z-50) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[60] flex flex-col md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
          >
            {/* Backdrop — tap para cerrar */}
            <button
              type="button"
              className="absolute inset-0 bg-brand-blue-950/55 backdrop-blur-sm"
              aria-label="Cerrar menú"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              variants={menuContainerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative z-10 ml-auto flex h-full w-[88%] max-w-sm flex-col border-l border-stone-200 bg-[#fbfaf7] shadow-none"
            >
              {/* Cabecera del drawer — reemplaza la barra flotante */}
              <div className="flex h-16 shrink-0 items-center justify-between border-b border-stone-200 px-5">
                <a
                  href="#"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center py-1"
                >
                  <Image
                    src="/images/logo-turismo-dabar.png"
                    alt="Turismo Dabar"
                    width={160}
                    height={44}
                    className="h-9 w-auto object-contain select-none"
                  />
                </a>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-brand-blue-200 bg-brand-blue-50 transition-colors duration-200 hover:bg-brand-blue-100 focus:outline-none"
                  aria-label="Cerrar menú"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    className="text-brand-blue-800"
                    aria-hidden
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              <motion.div
                variants={navListVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-1 flex-col gap-8 overflow-y-auto px-6 py-8"
              >
                {NAV_ITEMS.map((item) => (
                  <motion.div key={item.label} variants={navLinkVariants}>
                    <a
                      href={item.href}
                      onClick={handleNavItemClick(item.href, () => setIsOpen(false))}
                      className="block border-b border-stone-200/80 pb-3 text-2xl font-bold text-stone-800 transition-colors duration-200 hover:text-brand-blue-700"
                    >
                      {item.label}
                    </a>
                  </motion.div>
                ))}
              </motion.div>

              <div className="shrink-0 border-t border-stone-200 px-6 py-5">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 24,
                    delay: 0.35,
                  }}
                >
                  <Button
                    variant="primary"
                    className="w-full border border-brand-coral-600/25 py-4 text-center shadow-none"
                    onClick={() => {
                      setIsOpen(false);
                      scrollToCotizar();
                    }}
                  >
                    Cotizar Ahora
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
