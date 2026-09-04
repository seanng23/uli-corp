"use client";

import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/** Supporting copy settles into place. Pair the delay with the heading it follows (see typeDuration). */
export function FadeUp({ children, delay = 0, className }: Props) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: EASE_OUT_EXPO }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default FadeUp;
