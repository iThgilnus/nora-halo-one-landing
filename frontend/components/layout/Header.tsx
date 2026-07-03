"use client";

import { Menu, Moon, Sun, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { navItems } from "@/lib/product-data";
import { cn } from "@/lib/utils";

type Theme = "dark" | "light";
const themeKey = "nora-theme";
const themeEvent = "nora-theme-change";

function getThemeSnapshot(): Theme {
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

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const theme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const toggleTheme = () => {
    saveTheme(theme === "dark" ? "light" : "dark");
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/70 bg-page/88 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="#top"
          className="flex items-center gap-3 rounded-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime"
          onClick={closeMenu}
        >
          <span className="grid size-9 place-items-center rounded-card border border-line bg-panel text-sm font-extrabold text-lime">
            N
          </span>
          <span>
            <span className="block text-sm font-extrabold uppercase tracking-[0.22em] text-ink">
              NORA
            </span>
            <span className="block text-xs font-medium text-muted">
              Halo One
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-muted transition hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <button
            type="button"
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
            onClick={toggleTheme}
            className="grid size-11 place-items-center rounded-card border border-line bg-panel text-ink transition hover:border-lime hover:bg-panel-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link
            href="#consultation"
            className="inline-flex min-h-11 items-center justify-center rounded-card bg-orange px-4 text-sm font-bold text-white transition hover:bg-orange/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime"
          >
            Tư vấn ngay
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
            onClick={toggleTheme}
            className="grid size-11 place-items-center rounded-card border border-line bg-panel text-ink"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="grid size-11 place-items-center rounded-card border border-line bg-panel text-ink"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "fixed inset-x-0 top-[72px] z-40 origin-top border-b border-line bg-page px-4 pb-6 pt-3 shadow-[0_24px_60px_rgb(0_0_0_/_0.22)] transition lg:hidden",
          menuOpen
            ? "pointer-events-auto scale-y-100 opacity-100"
            : "pointer-events-none scale-y-95 opacity-0",
        )}
      >
        <nav className="flex flex-col gap-2" aria-label="Mobile">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className="rounded-card border border-line bg-panel px-4 py-4 text-base font-bold text-ink"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="#consultation"
            onClick={closeMenu}
            className="inline-flex min-h-12 items-center justify-center rounded-card bg-orange px-4 text-sm font-bold text-white mt-2 w-full"
          >
            Tư vấn ngay
          </Link>
        </nav>
      </div>
    </header>
  );
}
