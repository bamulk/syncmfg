// gtag.js global, present only when GoogleAnalytics.tsx has loaded it.
export {};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
