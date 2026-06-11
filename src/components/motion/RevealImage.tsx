"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
};

/**
 * Slow, gentle fade-in for images. Acts as the positioned container, so it can
 * directly wrap a `fill` image: <RevealImage className="relative h-[440px]">…</RevealImage>.
 */
export default function RevealImage({
  children,
  className,
  delay = 0,
  duration = 1.3,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.03 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
