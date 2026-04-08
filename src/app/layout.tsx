import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "김지동 | 프론트엔드 개발자",
  description:
    "React/Next.js 프론트엔드 개발자. GIS 플랫폼 20+개 구축, AI 도구 적극 활용.",
  openGraph: {
    title: "김지동 | 프론트엔드 개발자",
    description:
      "React/Next.js 프론트엔드 개발자. GIS 플랫폼 20+개 구축, AI 도구 적극 활용.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="dark scroll-smooth">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap"
        />
      </head>
      <body className="bg-zinc-950 text-zinc-100 antialiased">{children}</body>
    </html>
  );
}
