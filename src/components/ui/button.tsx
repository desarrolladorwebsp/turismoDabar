"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart" | "style"> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  showIcon?: boolean;
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant = "primary", showIcon = true, icon, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
        className={cn(
          "group relative inline-flex items-center justify-center rounded-xl font-semibold tracking-tight transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] focus:outline-none focus:ring-2 focus:ring-brand-blue-400/50 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
          // ── Primary: Terracota CTA de Conversión ──
          variant === "primary" && "bg-brand-coral-500 text-white hover:bg-brand-coral-600",
          // ── Secondary: Blue Institucional ──
          variant === "secondary" && "bg-brand-blue-600 text-white hover:bg-brand-blue-700",
          // ── Outline: Borde azul, fondo transparente ──
          variant === "outline" && "border-2 border-brand-blue-600 bg-transparent text-brand-blue-600 hover:bg-brand-blue-50",
          // ── Ghost: Para uso sobre fondos oscuros (Hero/Navbar) ──
          variant === "ghost" && "border border-white/20 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm",
          // Ajustar padding para centrar y encajar el círculo del icono
          showIcon ? "pl-7 pr-2.5 py-2.5" : "px-7 py-3.5",
          className
        )}
        {...props}
      >
        <span className="mr-3.5 text-sm md:text-base font-semibold">{children}</span>
        
        {showIcon && (
          <div className={cn(
            "flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-300",
            variant === "primary" && "bg-white/20",
            variant === "secondary" && "bg-white/15",
            variant === "outline" && "bg-brand-blue-600/10",
            variant === "ghost" && "bg-white/15"
          )}>
            <div className="transform transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-105">
              {icon || (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              )}
            </div>
          </div>
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
