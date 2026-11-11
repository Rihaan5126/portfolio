"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { navLinks, profile } from "@/lib/data";
import { useActiveSection } from "@/hooks/useActiveSection";
import { CloseIcon, MenuIcon } from "@/components/ui/Icons";
import { Monogram } from "./Monogram";
import { ThemeToggle } from "./ThemeToggle";

const sectionIds = navLinks.map((link) => link.href.slice(1));

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const activeId = useActiveSection(sectionIds);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <header className="bg-background/70 fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-[1280px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-10"
      >
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label={`${profile.name}, home`}
        >
          <Monogram size={34} />
          <span className="text-[1.05rem] font-semibold tracking-tight">
            {profile.name}
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const isActive = activeId === link.href.slice(1);
            return (
              <li key={link.href}>
                <Link
                  href={`/${link.href}`}
                  aria-current={isActive ? "location" : undefined}
                  className={`relative inline-flex rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                    isActive ? "text-foreground" : "text-muted hover:text-foreground"
                  }`}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-3.5 -bottom-0.5 h-px bg-[linear-gradient(90deg,var(--brand-from),var(--brand-to))] transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2.5">
          <Link href="/#contact" className="btn btn-primary btn-sm hidden sm:inline-flex">
            Let&rsquo;s talk
          </Link>
          <ThemeToggle />
          <button
            ref={toggleRef}
            type="button"
            className="text-foreground bg-surface/50 hover:border-cyan inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors lg:hidden"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        hidden={!isOpen}
        className="bg-background/95 border-t backdrop-blur-xl lg:hidden"
      >
        <ul className="mx-auto flex w-full max-w-[1280px] flex-col px-5 py-3 sm:px-8">
          {navLinks.map((link) => {
            const isActive = activeId === link.href.slice(1);
            return (
              <li key={link.href} className="border-b last:border-b-0">
                <Link
                  href={`/${link.href}`}
                  onClick={() => setIsOpen(false)}
                  aria-current={isActive ? "location" : undefined}
                  className={`flex items-center justify-between py-3.5 text-lg font-medium ${
                    isActive ? "text-cyan" : "text-foreground"
                  }`}
                >
                  {link.label}
                  <span aria-hidden="true" className="text-muted font-mono text-sm">
                    {link.href}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
