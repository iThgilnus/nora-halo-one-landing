"use client";

import { Menu, Moon, Sun, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";
import styles from "./SiteHeader.module.scss";

type Theme = "dark" | "light";
const themeKey = "nora-theme";
const themeEvent = "nora-theme-change";

function getThemeSnapshot(): Theme {
  if (typeof window === "undefined") return "dark";
  return localStorage.getItem(themeKey) === "light" ? "light" : "dark";
}

function getServerThemeSnapshot(): Theme {
  return "dark";
}

function subscribeTheme(callback: () => void) {
  window.addEventListener(themeEvent, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(themeEvent, callback);
    window.removeEventListener("storage", callback);
  };
}

function saveTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  localStorage.setItem(themeKey, theme);
  window.dispatchEvent(new Event(themeEvent));
}

const navLinks = [
  { href: "#experience", label: "Cách hoạt động", id: "experience" },
  { href: "#technology", label: "Công nghệ", id: "technology" },
  { href: "#features", label: "Tính năng", id: "features" },
  { href: "#lifestyle", label: "Trải nghiệm", id: "lifestyle" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>("");
  const progressRef = useRef<HTMLDivElement>(null);

  const theme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getServerThemeSnapshot
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Scroll progress + scrolled state
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollY / docHeight : 0;

      setScrollProgress(progress);
      setScrolled(scrollY > window.innerHeight - 80);

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.id);
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveSection(id);
          });
        },
        { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const toggleTheme = () => saveTheme(theme === "dark" ? "light" : "dark");
  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={cn(
        styles.headerContainer,
        scrolled && styles.scrolled
      )}
    >
      {/* Scroll progress bar */}
      <div
        ref={progressRef}
        aria-hidden
        className={styles.progressBar}
        style={{ transform: `scaleX(${scrollProgress})`, willChange: "transform" }}
      />

      <div className={styles.innerContainer}>
        {/* Left: Logo */}
        <Link
          href="#top"
          className={styles.logoLink}
          onClick={closeMenu}
        >
          <span className={styles.logoBadge}>
            N
            <span className={styles.glowBg} />
          </span>
          <span className={styles.logoTextContainer}>
            <span className={styles.logoText}>
              NORA
            </span>
            <span className={styles.logoSub}>
              Halo One
            </span>
          </span>
        </Link>

        {/* Middle: Navigation with active underline sweep */}
        <nav className={styles.navContainer} aria-label="Main">
          {navLinks.map(({ href, label, id }) => {
            const isActive = activeSection === id;
            return (
              <Link
                key={id}
                href={href}
                className={cn(
                  styles.navLink,
                  isActive && styles.active
                )}
              >
                {label}
                {/* Animated underline */}
                <span className={styles.underlineSweep} />
              </Link>
            );
          })}
        </nav>

        {/* Right: Actions */}
        <div className={styles.actionsContainer}>
          <button
            type="button"
            aria-label={theme === "dark" ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối"}
            onClick={toggleTheme}
            className={styles.themeToggle}
          >
            <span className={cn(styles.sunIcon, theme === "dark" ? "opacity-100 rotate-0" : "opacity-0 rotate-90")}>
              <Sun size={17} />
            </span>
            <span className={cn(styles.moonIcon, theme === "light" ? "opacity-100 rotate-0" : "opacity-0 -rotate-90")}>
              <Moon size={17} />
            </span>
          </button>

          <Link
            href="#product-explorer"
            className={styles.ctaButton}
          >
            Khám phá sản phẩm
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className={styles.mobileControls}>
          <button
            type="button"
            aria-label={theme === "dark" ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối"}
            onClick={toggleTheme}
            className={styles.mobileToggle}
          >
            <span className={cn(styles.sunIcon, theme === "dark" ? "opacity-100 rotate-0" : "opacity-0 rotate-90")}>
              <Sun size={17} />
            </span>
            <span className={cn(styles.moonIcon, theme === "light" ? "opacity-100 rotate-0" : "opacity-0 -rotate-90")}>
              <Moon size={17} />
            </span>
          </button>
          <button
            type="button"
            aria-label={menuOpen ? "Đóng trình đơn" : "Mở trình đơn"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className={styles.mobileTrigger}
          >
            <span className={cn(styles.menuIcon, menuOpen ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100")}>
              <Menu size={19} />
            </span>
            <span className={cn(styles.closeIcon, menuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0")}>
              <X size={19} />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={cn(
          styles.mobileDrawer,
          menuOpen && styles.open
        )}
      >
        <nav className={styles.mobileNav} aria-label="Mobile">
          {navLinks.map(({ href, label, id }) => (
            <Link
              key={id}
              href={href}
              onClick={closeMenu}
              className={cn(
                styles.mobileNavLink,
                activeSection === id && styles.active
              )}
            >
              {label}
            </Link>
          ))}
          <Link
            href="#product-explorer"
            onClick={closeMenu}
            className={styles.mobileCta}
          >
            Khám phá sản phẩm
          </Link>
        </nav>
      </div>
    </header>
  );
}
