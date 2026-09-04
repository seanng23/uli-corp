"use client";

import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
};

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/**
 * Photo reveal: the image wipes in from the left (a clip-path sweep, matching the way the
 * site's ruled lines draw themselves) while settling from a slight zoom to rest.
 * Acts as the positioned container, so it can directly wrap a `fill` image:
 * <RevealImage className="relative h-[440px]">…</RevealImage>.
 */
export default function RevealImage({ children, className, delay = 0, duration = 1.2 }: Props) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={reduceMotion ? false : { clipPath: "inset(0 100% 0 0)" }}
      whileInView={{ clipPath: "inset(0 0% 0 0)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration, delay, ease: EASE_OUT_EXPO }}
      className={`overflow-hidden ${className ?? ""}`}
    >
      <motion.div
        initial={reduceMotion ? false : { scale: 1.06 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: duration + 0.4, delay, ease: EASE_OUT_EXPO }}
        className="relative h-full w-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
