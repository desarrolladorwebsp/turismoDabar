/** Spring orgánico estándar — sensación elástica y juvenil */
export const organicSpring = {
  type: "spring" as const,
  stiffness: 120,
  damping: 14,
};

export const organicSpringSoft = {
  type: "spring" as const,
  stiffness: 100,
  damping: 16,
};

export const fadeUpHidden = { opacity: 0, y: 28 };

export const fadeUpVisible = {
  opacity: 1,
  y: 0,
  transition: organicSpring,
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.12,
    },
  },
};

export const fadeUpItem = {
  hidden: fadeUpHidden,
  visible: fadeUpVisible,
};

export const fadeUpItemCustom = {
  hidden: fadeUpHidden,
  visible: (i: number) => ({
    ...fadeUpVisible,
    transition: { ...organicSpring, delay: i * 0.08 },
  }),
};
