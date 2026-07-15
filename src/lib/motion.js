/**
 * Shared Framer Motion tokens. Keeping these in one place mirrors the design
 * tokens in tailwind.config.js (colors, shadows, keyframes): one vocabulary
 * for motion, reused by every component instead of hand-rolled transitions.
 */

// Matches the cubic-bezier already used by the CSS pop/tiltIn/rise keyframes
// in tailwind.config.js, so JS-driven and CSS-driven motion feel the same.
export const EASE_OUT = [0.16, 1, 0.3, 1];

export const DURATION = {
  fast: 0.2,
  base: 0.4,
  slow: 0.7,
  page: 0.45,
};

// Default viewport options for scroll-triggered animation: fires once, a
// little before the element is fully in view.
export const VIEWPORT = { once: true, margin: "-80px 0px -80px 0px" };

/** Fade + slide up. The workhorse used by <Reveal>. */
export function fadeUpVariant(delaySeconds = 0) {
  return {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: DURATION.slow, ease: EASE_OUT, delay: delaySeconds },
    },
  };
}

/** Scale + fade pop, for content that swaps in response to user interaction. */
export const popVariant = {
  hidden: { opacity: 0, scale: 0.96, y: 6 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: DURATION.base, ease: EASE_OUT } },
  exit: { opacity: 0, scale: 0.98, y: -4, transition: { duration: 0.15, ease: EASE_OUT } },
};

/** Parent wrapper for staggered children (badges, list rows, grid cards). */
export function staggerContainer(stagger = 0.08, delayChildren = 0) {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  };
}

/** Child item for staggerContainer. */
export const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE_OUT } },
};

/** Whole-page enter/exit for route transitions. */
export const pageVariant = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: DURATION.page, ease: EASE_OUT } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.25, ease: EASE_OUT } },
};

/** Standard hover/tap for buttons and clickable cards. */
export const tapHover = {
  whileHover: { y: -2, transition: { duration: DURATION.fast, ease: EASE_OUT } },
  whileTap: { scale: 0.97, transition: { duration: 0.1 } },
};
