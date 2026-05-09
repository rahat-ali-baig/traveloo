"use client";

import { CSSProperties, useEffect, useState } from "react";

const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};

const ScrollVisionPanel = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const section = document.getElementById("travel-hero");
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrollableDistance = Math.max(rect.height - window.innerHeight, 1);
      const nextProgress = clamp(-rect.top / scrollableDistance, 0, 1);

      setProgress(nextProgress);
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  const reveal = clamp((progress - 0.34) / 0.42, 0, 1);
  const easedReveal = reveal * reveal * (3 - 2 * reveal);

  const panelStyle = {
    opacity: easedReveal,
    transform: `translateY(${(1 - easedReveal) * 28}px)`,
  } satisfies CSSProperties;

  return (
    <aside
      className="pointer-events-auto absolute bottom-24 left-6 right-6 z-20 border-l border-[#1A3D2B]/30 pl-5 transition-[opacity,transform] duration-150 ease-out sm:bottom-auto sm:left-auto sm:right-10 sm:top-28 sm:max-w-sm lg:right-16 lg:top-32 lg:max-w-md"
      style={panelStyle}
    >
      <p className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-[#2E6B47]">
        About Safarly
      </p>
      <h2 className="mt-3 font-playfair text-4xl font-semibold leading-none text-black sm:text-5xl">
        Our vision is travel that feels personal, quiet, and unforgettable.
      </h2>
      <p className="mt-5 font-sans text-base leading-7 text-black/65">
        We design journeys around feeling, pace, and place, pairing rare
        landscapes with human stories so every route feels made for you.
      </p>
    </aside>
  );
};

export default ScrollVisionPanel;
