/**
 * Simplified state silhouettes, used as watermarks on the homepage location
 * cards. Generated from rough boundary coordinates — decorative, not a map.
 * To add a state, add an entry here keyed by its postal code.
 */
export const stateShapes: Record<string, { viewBox: string; d: string }> = {
  "NV": {
    "viewBox": "0 0 67.5 100.0",
    "d": "M0.0 0.0 L67.5 0.0 L67.4 83.0 L66.2 85.3 L63.8 83.7 L59.6 84.3 L60.2 90.7 L60.8 100.0 L0.0 42.9 Z"
  },
  "CA": {
    "viewBox": "0 0 87.1 100.0",
    "d": "M1.3 0.0 L37.1 0.0 L37.1 31.7 L82.9 73.9 L83.4 77.6 L87.1 81.7 L84.6 84.2 L82.1 90.8 L83.7 94.7 L82.1 98.0 L61.6 100.0 L60.3 94.5 L50.7 87.2 L49.7 84.2 L43.8 82.9 L33.1 79.7 L31.7 78.4 L31.7 72.4 L21.0 57.0 L20.1 53.2 L16.7 50.7 L15.8 44.6 L11.6 42.2 L5.5 32.5 L4.6 23.2 L0.0 18.4 L2.1 10.8 Z"
  },
  "IL": {
    "viewBox": "0 0 55.8 100.0",
    "d": "M12.1 0.0 L51.7 0.4 L55.5 14.5 L55.5 57.1 L54.1 61.7 L55.8 68.2 L49.1 77.4 L48.7 85.2 L48.1 90.6 L42.4 98.4 L33.2 100.0 L27.9 94.6 L27.7 87.2 L18.5 70.7 L15.9 64.7 L11.7 58.0 L1.3 45.4 L0.0 41.8 L1.3 38.5 L7.8 28.2 L6.1 21.3 L16.3 15.6 L18.8 7.4 Z"
  },
  "OH": {
    "viewBox": "0 0 92.3 100.0",
    "d": "M0.0 7.9 L29.4 7.0 L39.0 10.7 L45.1 14.9 L60.5 12.9 L66.9 13.5 L76.8 6.2 L92.3 0.0 L92.3 37.6 L89.0 39.6 L90.5 48.6 L84.7 62.6 L77.2 72.8 L65.9 78.1 L65.6 85.7 L56.2 94.9 L47.8 100.0 L42.3 90.7 L24.7 94.1 L12.7 88.8 L0.0 80.9 Z"
  }
};

export function StateShape({
  state,
  className,
}: {
  state: string;
  className?: string;
}) {
  const shape = stateShapes[state];
  if (!shape) return null;
  return (
    <svg
      viewBox={shape.viewBox}
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d={shape.d} />
    </svg>
  );
}
