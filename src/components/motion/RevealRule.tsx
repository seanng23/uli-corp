"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";

type Props = {
  /** Line texture. Omit to render a plain element styled by className (e.g. a CSS border). */
  src?: string;
  className?: string;
  style?: CSSProperties;
  /** Opt in to the soft fade-in. Off by default so pages outside the homepage keep static lines. */
  animate?: boolean;
  delay?: number;
  duration?: number;
};

const EASE_OUT_QUART = [0.25, 1, 0.5, 1] as const;

/**
 * The site's ruled lines. With `animate`, the line fades in softly as it enters the viewport;
 * without it, it renders as a plain static line. Reduced-motion users always get the static line.
 */
export default function RevealRule({ src, className, style, animate = false, delay = 0, duration = 1 }: Props) {
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
