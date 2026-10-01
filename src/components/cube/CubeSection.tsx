"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowIcon } from "../Icons";
import { Container, Eyebrow } from "../ui";

// three.js is ~200 KB; load it only in the browser, only for this section.
const CubeScene = dynamic(() => import("./CubeScene"), { ssr: false });

/* Captions paraphrase the client-approved History copy (Sept 26 deck). */
const STAGES = [
  {
    title: "Established manufacturers.",
    body: "Each with decades of specialized process knowledge, experienced people and long-standing customer relationships.",
  },
  {
    title: "Complementary capabilities.",
    body: "Molding, cutting, compounding and bonding, brought together to solve more problems for customers.",
  },
  {
    title: "One organization.",
    body: "One name, coordinated quality systems and a single point of contact, without losing the expertise behind each operation.",
  },
];

function supportsWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export default function CubeSection() {
  const section = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const bar = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(0);
  const [active, setActive] = useState(false);
  // "scroll" = the animated version; "static" = assembled logo, normal height
  const [mode, setMode] = useState<"pending" | "scroll" | "static">("pending");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Deferred a tick so the first client render matches the server's. A
    // timer rather than rAF: rAF never fires in a background tab, which would
    // leave the section stuck in its pre-hydration state.
    const id = setTimeout(
      () => setMode(reduced || !supportsWebGL() ? "static" : "scroll"),
      0,
    );
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    if (mode !== "scroll") return;
    const el = section.current;
    if (!el) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      const p = travel > 0 ? Math.min(1, Math.max(0, -rect.top / travel)) : 1;
      progress.current = p;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      setStage(p < 0.36 ? 0 : p < 0.74 ? 1 : 2);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), {
      rootMargin: "200px",
    });
    io.observe(el);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      io.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [mode]);

  const scrolling = mode === "scroll";
  const shown = scrolling ? stage : STAGES.length - 1;

  return (
    <section
      ref={section}
      aria-label="How SYNC came together"
      className={`relative bg-white ${scrolling ? "h-[320vh]" : ""}`}
    >
      <div
        className={
          scrolling
            ? "sticky top-0 flex h-screen items-center overflow-hidden pt-[72px] lg:pt-[108px]"
            : "py-20 sm:py-24"
        }
      >
        <Container>
          <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
            {/* Visual */}
            <div className="relative mx-auto aspect-square w-full max-w-[300px] sm:max-w-[420px] lg:order-2 lg:max-w-[560px]">
              {scrolling ? (
                // Drawn 1.5x larger than its layout box so pieces can fly in
                // from outside it without being clipped.
                <div className="pointer-events-none absolute -inset-[25%]">
                  <CubeScene progress={progress} active={active} />
                </div>
              ) : (
                <div className="flex h-full items-center justify-center">
                  <Image
                    src="/sync-mark.png"
                    alt=""
                    width={93}
                    height={104}
                    className="h-40 w-auto sm:h-56"
                  />
                </div>
              )}
            </div>

            {/* Captions */}
            <div className="lg:order-1">
              <Eyebrow>How SYNC came together</Eyebrow>
              <div className="relative mt-4 min-h-[210px] sm:min-h-[220px]">
                {STAGES.map((s, i) => (
                  <div
                    key={s.title}
                    aria-hidden={i !== shown}
                    className={`absolute inset-0 transition-all duration-500 ${
                      i === shown
                        ? "translate-y-0 opacity-100"
                        : i < shown
                          ? "pointer-events-none -translate-y-4 opacity-0"
                          : "pointer-events-none translate-y-4 opacity-0"
                    }`}
                  >
                    <h2 className="text-3xl font-bold leading-[1.1] text-navy sm:text-5xl">
                      {s.title}
                    </h2>
                    <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">
                      {s.body}
                    </p>
                    {i === STAGES.length - 1 && (
                      <Link
                        href="/about/history"
                        tabIndex={i === shown ? 0 : -1}
                        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue hover:gap-3"
                      >
                        Read our history
                        <ArrowIcon />
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              {scrolling && (
                <div className="mt-6 h-0.5 w-40 overflow-hidden rounded bg-line">
                  {/* Width is driven from the scroll handler via transform */}
                  <div
                    ref={bar}
                    className="h-full origin-left bg-blue"
                    style={{ transform: "scaleX(0)" }}
                  />
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
