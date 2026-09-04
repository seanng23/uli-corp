"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";

type Props = {
  /** Line texture to draw. Omit to draw a plain element styled by className (e.g. a CSS border). */
  src?: string;
  className?: string;
  style?: CSSProperties;
  /** Horizontal rules draw left to right, vertical rules top to bottom. Inferred from the file name when omitted. */
  orientation?: "horizontal" | "vertical";
  delay?: number;
  duration?: number;
};

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/**
 * The site's ruled lines draw themselves in as they scroll into view, like a pen stroke,
 * instead of sitting static. The line is fully laid out from the start (clip-path only),
 * so nothing shifts; reduced-motion users get the finished line immediately.
 */
export default function RevealRule({ src, className, style, orientation, delay = 0, duration = 1.1 }: Props) {
  const reduceMotion = useReducedMotion();
  const vertical = orientation === "vertical" || (orientation === undefined && !!src && src.includes("vertical"));
  const hidden = vertical ? "inset(0 0 100% 0)" : "inset(0 100% 0 0)";
  const shared = {
    className,
    style,
    initial: reduceMotion ? false : { clipPath: hidden },
    whileInView: { clipPath: "inset(0 0 0 0)" },
    viewport: { once: true, margin: "-40px" },
    transition: { duration, delay, ease: EASE_OUT_EXPO },
  } as const;
  if (!src) return <motion.div aria-hidden="true" {...shared} />;
  return <motion.img src={src} alt="" aria-hidden="true" {...shared} />;
}
