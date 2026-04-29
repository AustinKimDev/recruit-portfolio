"use client";

import { useRef, useState, useCallback, useEffect } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  maxTilt?: number;
}

const FLAT_TRANSFORM = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";

export function TiltCard({ children, className = "", style, maxTilt = 0 }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  // Whether device supports hover (true = desktop pointer, false = touch)
  const [canHover, setCanHover] = useState(false);

  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({
    transform: FLAT_TRANSFORM,
    transition: "transform 0.4s ease",
    willChange: "transform",
  });
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({
    opacity: 0,
    transition: "opacity 0.4s ease",
  });

  // Detect hover capability once on mount (avoids SSR mismatch)
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const frame = requestAnimationFrame(() => setCanHover(mq.matches));
    const handler = (e: MediaQueryListEvent) => setCanHover(e.matches);
    mq.addEventListener("change", handler);
    return () => {
      cancelAnimationFrame(frame);
      mq.removeEventListener("change", handler);
    };
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!canHover || maxTilt <= 0) return;
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const mouseX = e.clientX - (rect.left + rect.width / 2);
      const mouseY = e.clientY - (rect.top + rect.height / 2);

      const rotateY = (mouseX / (rect.width / 2)) * maxTilt;
      const rotateX = -(mouseY / (rect.height / 2)) * maxTilt;

      const glareX = ((e.clientX - rect.left) / rect.width) * 100;
      const glareY = ((e.clientY - rect.top) / rect.height) * 100;

      setTiltStyle({
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`,
        transition: "transform 0.1s ease",
        willChange: "transform",
      });
      setGlareStyle({
        opacity: 1,
        background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.08) 0%, transparent 60%)`,
        transition: "opacity 0.1s ease",
      });
    },
    [canHover, maxTilt],
  );

  const handleMouseLeave = useCallback(() => {
    if (!canHover || maxTilt <= 0) return;
    setTiltStyle({
      transform: FLAT_TRANSFORM,
      transition: "transform 0.4s ease",
      willChange: "transform",
    });
    setGlareStyle({
      opacity: 0,
      transition: "opacity 0.4s ease",
    });
  }, [canHover, maxTilt]);

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      style={{ ...style, ...tiltStyle }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glare overlay — pointer-events-none so clicks pass through */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 rounded-xl"
        style={glareStyle}
      />
      {children}
    </div>
  );
}
