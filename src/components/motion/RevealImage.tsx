"use client";

import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
};

const EASE_OUT_QUART = [0.25, 1, 0.5, 1] as const;

/**
 * Photo reveal: a slow, quiet fade-in with the image settling from a slight zoom to rest.
 * Acts as the positioned container, so it can directly wrap a `fill` image:
 * <RevealImage className="relative h-[440px]">…</RevealImage>.
 */
export default function RevealImage({ children, className, delay = 0, duration = 1.3 }: Props) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, scale: 1.02 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration, delay, ease: EASE_OUT_QUART }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
