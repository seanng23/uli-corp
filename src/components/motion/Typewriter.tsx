"use client";

import { motion, useInView } from "framer-motion";
import { Fragment, useRef, useState, useEffect } from "react";

type Props = {
  /** Text to type out. Use "\n" for line breaks. */
  text: string;
  className?: string;
  /** Seconds per character. */
  speed?: number;
  /** Seconds to wait before typing starts. */
  startDelay?: number;
};

/**
 * Types a string out character-by-character when scrolled into view.
 * Characters are grouped into whole words (each word is an unbreakable
 * inline-block), so the heading wraps normally — words never split mid-letter.
 * Reveal uses opacity per character (no layout shift).
 * Wrap it in the heading tag: <h2 className="..."><Typewriter text="..." /></h2>.
 */
export default function Typewriter({ text, className, speed = 0.035, startDelay = 0 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [typing, setTyping] = useState(false);

  const lines = text.split("\n");
  const totalChars = text.replace(/\n/g, "").length;
  const totalMs = (startDelay + totalChars * speed + 0.5) * 1000;

  useEffect(() => {
    if (!inView) return;
    setTyping(true);
    const t = setTimeout(() => setTyping(false), totalMs);
    return () => clearTimeout(t);
  }, [inView, totalMs]);

  // Running character index drives the per-character delay (left to right).
  let pos = 0;

  return (
    <span ref={ref} className={className} aria-label={text.replace(/\n/g, " ")}>
      {lines.map((line, li) => {
        const words = line.split(" ");
        return (
          <Fragment key={li}>
            {li > 0 && <br aria-hidden="true" />}
            {words.map((word, wi) => {
              const isLast = wi === words.length - 1;
              const wordSpan = (
                <span className="inline-block whitespace-nowrap" aria-hidden="true">
                  {Array.from(word).map((ch, ci) => {
                    const delay = startDelay + pos * speed;
                    pos++;
                    return (
                      <motion.span
                        key={ci}
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.001, delay }}
                      >
                        {ch}
                      </motion.span>
                    );
                  })}
                </span>
              );
              if (!isLast) pos++; // the space between words occupies a step too
              return (
                <Fragment key={wi}>
                  {wordSpan}
                  {!isLast && " "}
                </Fragment>
              );
            })}
          </Fragment>
        );
      })}
      {typing && (
        <motion.span
          aria-hidden="true"
          className="inline-block font-light"
          animate={{ opacity: [1, 1, 0, 0] }}
          transition={{ duration: 0.85, repeat: Infinity, ease: "linear" }}
          style={{ marginLeft: "0.04em" }}
        >
          |
        </motion.span>
      )}
    </span>
  );
}
