import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

/**
 * Animates a number counting up from 0 to `value` the first time it scrolls
 * into view. Renders as an inline <span>; pass a `format` fn to add
 * suffixes/prefixes (e.g. commas, a trailing "+"). Uses Framer Motion's
 * imperative `animate()` so the easing matches the rest of the site's motion
 * tokens instead of a hand-rolled requestAnimationFrame loop.
 */
export default function CountUp({
  value,
  duration = 0.9,
  className = "",
  format = (n) => String(n),
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {format(display)}
    </span>
  );
}
