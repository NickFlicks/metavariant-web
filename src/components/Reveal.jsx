import { motion } from "framer-motion";
import { fadeUpVariant, VIEWPORT } from "../lib/motion.js";

/**
 * Fades + slides children into place the first time they scroll into view.
 * Wrap any block-level content: <Reveal><section>...</section></Reveal>
 *
 * `delay` is in milliseconds to match the old CSS-transition-delay API this
 * replaced, so every existing call site (Home.jsx, Docs.jsx) keeps working
 * unchanged. Respects prefers-reduced-motion via the app-level MotionConfig.
 */
export default function Reveal({ children, className = "", delay = 0, as = "div" }) {
  const MotionTag = motion[as] ?? motion.div;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={fadeUpVariant(delay / 1000)}
    >
      {children}
    </MotionTag>
  );
}
