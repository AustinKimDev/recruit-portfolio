"use client";

import { useEffect } from "react";

export function InteractionBurst() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const interactive = target.closest("a, button, [role='tab']");
      if (!interactive) return;

      const burst = document.createElement("span");
      burst.className = "interaction-burst";
      burst.style.left = `${event.clientX}px`;
      burst.style.top = `${event.clientY}px`;

      for (let i = 0; i < 10; i += 1) {
        const particle = document.createElement("i");
        const angle = (Math.PI * 2 * i) / 10;
        const distance = 22 + Math.random() * 30;
        particle.style.setProperty("--dx", `${Math.cos(angle) * distance}px`);
        particle.style.setProperty("--dy", `${Math.sin(angle) * distance}px`);
        particle.style.setProperty("--delay", `${i * 8}ms`);
        burst.appendChild(particle);
      }

      document.body.appendChild(burst);
      window.setTimeout(() => burst.remove(), 720);
    };

    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    return () => window.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  return null;
}
