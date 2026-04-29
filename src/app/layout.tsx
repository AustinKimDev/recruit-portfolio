import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "maplibre-gl/dist/maplibre-gl.css";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { I18nProvider } from "@/i18n/i18n-provider";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "김지동 | Frontend Engineer",
  description:
    "지도/GIS, 데이터 시각화, 인증, 배포까지 다루는 React/Next.js 기반 프론트엔드 개발자 포트폴리오.",
  keywords: [
    "프론트엔드",
    "개발자",
    "React",
    "Next.js",
    "이력서",
    "포트폴리오",
  ],
  authors: [{ name: "김지동" }],
  openGraph: {
    title: "김지동 | Frontend Engineer",
    description: "지도/GIS와 데이터 집약형 제품을 다루는 프론트엔드 개발자 포트폴리오",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "김지동 | Frontend Engineer",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning className={jetbrainsMono.variable}>
      <head>
        {/* FOUC 방지: 페인트 전 테마 클래스 적용 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark');}else{document.documentElement.classList.remove('dark');}})()`,
          }}
        />
        {/* Pretendard: CDN 자체 호스팅 불가 → preconnect + font-display:swap 포함 stylesheet */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body
        className="antialiased"
        style={{
          backgroundColor: "var(--bg-primary)",
          color: "var(--text-primary)",
        }}
      >
        <ThemeProvider>
          <I18nProvider>{children}</I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
