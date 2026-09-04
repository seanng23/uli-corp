/**
 * Seconds a Typewriter heading takes to finish typing. Plain module (no "use client") so
 * server components can compute the delay for copy that should follow the heading.
 */
export function typeDuration(text: string, speed = 0.035, startDelay = 0): number {
  return startDelay + text.replace(/\n/g, " ").length * speed;
}
