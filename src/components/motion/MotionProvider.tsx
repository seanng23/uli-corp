"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Site-wide motion defaults: honour the visitor's reduced-motion setting for every
 * framer-motion animation (transforms are skipped, opacity still settles).
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
