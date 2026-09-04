"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { Fragment, useEffect, useRef, useState } from "react";

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
 * Every character is laid out from the start (hidden ones are transparent) so the heading never
 * shifts or re-wraps; words are unbreakable inline-blocks so they never split mid-letter.
 * The cursor is drawn inside the last revealed character, so it travels with the text
 * instead of waiting at the end of the sentence. It keeps blinking briefly once typing finishes.
 * Wrap it in the heading tag: <h2 className="..."><Typewriter text="..." /></h2>.
 */
export default function Typewriter({ text, className, speed = 0.035, startDelay = 0 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();

  const lines = text.split("\n");
  // Steps: one per character, plus one per space between words (a pause, nothing to draw).
  const totalSteps = text.replace(/\n/g, " ").length;

  const [step, setStep] = useState(0);
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setStep(totalSteps);
      return;
    }
    let interval: ReturnType<typeof setInterval> | undefined;
    let hide: ReturnType<typeof setTimeout> | undefined;
    const start = setTimeout(() => {
      setShowCursor(true);
      interval = setInterval(() => {
        setStep((current) => {
          if (current + 1 >= totalSteps) {
            clearInterval(interval);
            hide = setTimeout(() => setShowCursor(false), 900);
            return totalSteps;
          }
          return current + 1;
        });
      }, speed * 1000);
    }, startDelay * 1000);
    return () => {
      clearTimeout(start);
      clearTimeout(hide);
      clearInterval(interval);
    };
  }, [inView, reduceMotion, speed, startDelay, totalSteps]);

  // Steps that are spaces between words: nothing is drawn for them, so while one is the latest step
  // the cursor stays on the previous word's last letter.
  const spaceSteps = new Set<number>();
  {
    let i = 0;
    lines.forEach((line, li) => {
      if (li > 0) spaceSteps.add(i++);
      line.split(" ").forEach((word, wi, arr) => {
        i += word.length;
        if (wi < arr.length - 1) spaceSteps.add(i++);
      });
    });
  }
  // The cursor sits after the last revealed character; before typing starts it sits before the first.
  let cursorAfter = step - 1;
  while (cursorAfter > 0 && spaceSteps.has(cursorAfter)) cursorAfter--;

  // Running step index across lines and words (spaces count as a step).
  let pos = 0;

  const cursor = (atStart: boolean) => (
    <motion.span
      aria-hidden="true"
      className="absolute top-0 inline-block font-light"
      style={atStart ? { right: "100%", marginRight: "0.04em" } : { left: "100%", marginLeft: "0.04em" }}
      animate={{ opacity: [1, 1, 0, 0] }}
      transition={{ duration: 0.85, repeat: Infinity, ease: "linear" }}
    >
      |
    </motion.span>
  );

  return (
    <span ref={ref} className={className} aria-label={text.replace(/\n/g, " ")}>
      {lines.map((line, li) => {
        const words = line.split(" ");
        return (
          <Fragment key={li}>
            {li > 0 && <br aria-hidden="true" />}
            {li > 0 && (pos++, null)}
            {words.map((word, wi) => {
              const isLast = wi === words.length - 1;
              const wordSpan = (
                <span className="inline-block whitespace-nowrap" aria-hidden="true">
                  {Array.from(word).map((ch, ci) => {
                    const index = pos;
                    pos++;
                    const revealed = index < step;
                    const carriesCursor = showCursor && step > 0 && index === cursorAfter;
                    const leadsCursor = showCursor && step === 0 && index === 0;
                    return (
                      <span key={ci} className="relative">
                        <span style={{ opacity: revealed ? 1 : 0 }}>{ch}</span>
                        {(carriesCursor || leadsCursor) && cursor(leadsCursor)}
                      </span>
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
    </span>
  );
}
