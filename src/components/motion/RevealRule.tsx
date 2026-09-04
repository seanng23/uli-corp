"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";

type Props = {
  /** Line texture. Omit to render a plain element styled by className (e.g. a CSS border). */
  src?: string;
  className?: string;
  style?: CSSProperties;
  /** Soft fade-in as the line enters view. On site-wide (approved on the homepage first); pass false for a static line. */
  animate?: boolean;
  delay?: number;
  duration?: number;
};

const EASE_OUT_QUART = [0.25, 1, 0.5, 1] as const;

/**
 * The site's ruled lines fade in softly as they enter the viewport (`animate={false}` for a static line).
 * Reduced-motion users always get the static line.
 */
export default function RevealRule({ src, className, style, animate = true, delay = 0, duration = 1 }: Props) {
  const reduceMotion = useReducedMotion();
  if (!animate || reduceMotion) {
    if (!src) return <div aria-hidden="true" className={className} style={style} />;
    return <img src={src} alt="" aria-hidden="true" className={className} style={style} />;
  }
  const shared = {
    className,
    style,
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration, delay, ease: EASE_OUT_QUART },
  } as const;
  if (!src) return <motion.div aria-hidden="true" {...shared} />;
  return <motion.img src={src} alt="" aria-hidden="true" {...shared} />;
}
