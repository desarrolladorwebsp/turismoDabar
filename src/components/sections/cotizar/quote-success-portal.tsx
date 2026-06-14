"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence } from "framer-motion";
import { QuoteSuccessModal } from "@/components/sections/cotizar/quote-success-modal";

interface QuoteSuccessPortalProps {
  open: boolean;
  onClose: () => void;
}

export function QuoteSuccessPortal({ open, onClose }: QuoteSuccessPortalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence mode="wait">
      {open ? (
        <QuoteSuccessModal key="quote-success-modal" onClose={onClose} />
      ) : null}
    </AnimatePresence>,
    document.body
  );
}
