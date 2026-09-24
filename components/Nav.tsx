"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

const links = [
  { href: "/", label: "Startseite" },
  { href: "/sportwagenvermietung", label: "Sportwagenvermietung" },
  { href: "/autoaufbereitung", label: "Autoaufbereitung" },
  { href: "/an-und-verkauf", label: "An- & Verkauf" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/95 backdrop-blur supports-[backdrop-filter]:bg-ink/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm transition-colors ${
                pathname === l.href
                  ? "text-gold"
                  : "text-silver/90 hover:text-white"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/termin-buchen"
            className="rounded-sm bg-gold px-5 py-2.5 text-sm font-semibold tracking-wide text-ink transition hover:bg-gold-light"
          >
            Termin anfragen
          </Link>
        </div>

        <button
          className="text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menü öffnen"
          aria-expanded={open}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            {open ? (
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-ink px-5 pb-5 md:hidden">
          <nav className="flex flex-col gap-4 pt-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`text-sm ${
                  pathname === l.href ? "text-gold" : "text-silver/90"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/termin-buchen"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-sm bg-gold px-5 py-3 text-center text-sm font-semibold text-ink"
            >
              Termin anfragen
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
