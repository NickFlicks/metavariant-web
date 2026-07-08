/**
 * Organic curved section boundary (instead of a hard horizontal edge).
 * `fillClassName` should be a Tailwind text-color utility matching the
 * background color of the section that follows (the SVG uses fill="currentColor").
 */
export default function WaveDivider({ flip = false, fillClassName = "text-white" }) {
  return (
    <div
      className={`pointer-events-none relative -mb-px ${fillClassName}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 90"
        className={`h-14 w-full sm:h-20 ${flip ? "rotate-180" : ""}`}
        preserveAspectRatio="none"
      >
        <path
          d="M0,32 C220,90 420,0 720,26 C1020,52 1240,88 1440,36 L1440,90 L0,90 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
