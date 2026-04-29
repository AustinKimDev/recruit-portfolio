"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./theme-toggle";
import { profile } from "@/data/profile";
import { useI18n } from "@/i18n/i18n-provider";

const NAV_LINKS = [
  { id: "about", labelKey: "about" },
  { id: "map", labelKey: "map" },
  { id: "experience", labelKey: "experience" },
  { id: "projects", labelKey: "projects" },
  { id: "skills", labelKey: "skills" },
  { id: "contact", labelKey: "contact" },
] as const;

type SectionId = (typeof NAV_LINKS)[number]["id"];

export function Navbar() {
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const { locale, toggleLocale, t } = useI18n();

  // Scroll spy via Intersection Observer
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.id);

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Pick the entry with the largest intersection ratio among visible ones
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;

        const topmost = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b
        );
        setActiveSection(topmost.target.id as SectionId);
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      }
    );

    const observer = observerRef.current;

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    if (!mobileOpen) return;

    const handleClick = (e: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node)
      ) {
        setMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [mobileOpen]);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  }, []);

  return (
    <AnimatePresence>
      <motion.header
        key="navbar"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg"
        style={{
          borderBottom: "1px solid var(--border)",
          backgroundColor: "color-mix(in srgb, var(--bg-primary) 80%, transparent)",
        }}
      >
          <nav
            aria-label="주요 내비게이션"
            className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3"
          >
            {/* Logo / Name */}
            <button
              onClick={() => scrollToSection("hero")}
              className="text-sm font-bold transition"
              style={{ color: "var(--text-primary)" }}
              aria-label="맨 위로 이동"
            >
              {t.profile.name}
            </button>

            {/* Desktop Links */}
            <ul className="hidden items-center gap-1 md:flex" role="list">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <li key={link.id}>
                    <button
                      onClick={() => scrollToSection(link.id)}
                      aria-current={isActive ? "location" : undefined}
                      className="relative px-3 py-2 text-sm transition-colors"
                      style={{ color: isActive ? "var(--accent-strong)" : "var(--text-muted)" }}
                    >
                      {t.nav[link.labelKey]}
                      {isActive && (
                        <motion.span
                          layoutId="active-underline"
                          className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-accent-strong"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Right side: theme toggle slot + hamburger */}
            <div className="flex items-center gap-3">
              <a
                href={profile.siteRepo}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden rounded-md px-3 py-2 text-xs font-semibold transition md:inline-flex"
                style={{
                  border: "1px solid var(--border)",
                  color: "var(--text-secondary)",
                }}
              >
                {t.nav.githubRepo}
              </a>
              <button
                type="button"
                onClick={toggleLocale}
                className="rounded-md px-3 py-2 font-mono text-xs font-semibold transition"
                style={{
                  border: "1px solid var(--border)",
                  color: "var(--text-secondary)",
                }}
                aria-label={locale === "ko" ? "Switch to English" : "한국어로 전환"}
              >
                {locale === "ko" ? "EN" : "KO"}
              </button>
              <ThemeToggle />

              {/* Hamburger (mobile only) */}
              <button
                className="flex flex-col justify-center gap-1.5 p-1 md:hidden"
                aria-label={mobileOpen ? "메뉴 닫기" : "메뉴 열기"}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                onClick={() => setMobileOpen((o) => !o)}
              >
                <motion.span
                  animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="block h-0.5 w-6"
                  style={{ backgroundColor: "var(--text-secondary)" }}
                />
                <motion.span
                  animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                  className="block h-0.5 w-6"
                  style={{ backgroundColor: "var(--text-secondary)" }}
                />
                <motion.span
                  animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="block h-0.5 w-6"
                  style={{ backgroundColor: "var(--text-secondary)" }}
                />
              </button>
            </div>
          </nav>

          {/* Mobile dropdown panel */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                id="mobile-menu"
                ref={mobileMenuRef}
                key="mobile-menu"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="overflow-hidden md:hidden"
                style={{ borderTop: "1px solid var(--border)" }}
              >
                <ul role="list" className="flex flex-col py-2">
                  {NAV_LINKS.map((link) => {
                    const isActive = activeSection === link.id;
                    return (
                      <li key={link.id}>
                        <button
                          onClick={() => scrollToSection(link.id)}
                          aria-current={isActive ? "location" : undefined}
                          className="w-full px-6 py-3 text-left text-base transition-colors"
                          style={{ color: isActive ? "var(--accent-strong)" : "var(--text-muted)" }}
                        >
                          {isActive && (
                            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-accent-strong align-middle" />
                          )}
                          {t.nav[link.labelKey]}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
      </motion.header>
    </AnimatePresence>
  );
}
