"use client";

import dynamic from "next/dynamic";

function MapSkeleton() {
  return (
    <section id="map" className="mx-auto max-w-6xl px-6 py-20">
      <div className="h-[560px] animate-pulse rounded-lg" style={{ backgroundColor: "var(--bg-secondary)" }} />
    </section>
  );
}

const PortfolioMap = dynamic(
  () => import("./portfolio-map").then((m) => ({ default: m.PortfolioMap })),
  {
    ssr: false,
    loading: () => <MapSkeleton />,
  }
);

export function PortfolioMapShell() {
  return <PortfolioMap />;
}
