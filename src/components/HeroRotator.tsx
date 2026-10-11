"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Photo = { src: string; alt: string; position?: string };

/**
 * Crossfades through the homepage hero photos. The first photo is rendered
 * immediately; the rest load lazily and only start cycling once the page is
 * interactive. Visitors who prefer reduced motion see the first photo only.
 */
export default function HeroRotator({
  photos,
  interval = 6500,
}: {
  photos: Photo[];
  interval?: number;
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (photos.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(
      () => setCurrent((i) => (i + 1) % photos.length),
      interval,
    );
    return () => clearInterval(id);
  }, [photos.length, interval]);

  return (
    <>
      {photos.map((p, i) => (
        <Image
          key={p.src}
          src={p.src}
          // Decorative rotation: only the visible photo is announced.
          alt={i === current ? p.alt : ""}
          aria-hidden={i === current ? undefined : true}
          fill
          priority={i === 0}
          sizes="(min-width: 1024px) 62vw, 100vw"
          className={`object-cover transition-opacity duration-[1400ms] ease-in-out ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
          style={{ objectPosition: p.position ?? "center" }}
        />
      ))}
    </>
  );
}
