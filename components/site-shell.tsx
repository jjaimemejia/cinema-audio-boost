"use client";

import Link from "next/link";
import { FormEvent, startTransition, useState } from "react";
import {
  type InfoPageKey,
  type Locale,
  getText,
  infoPages,
  siteCopy,
} from "@/lib/site-copy";

type SitePage = "home" | InfoPageKey;
type FormStatus = "idle" | "success" | "error";

const NAV_ROUTES = [
  { key: "home", href: "/" },
  { key: "privacy", href: "/privacy" },
  { key: "support", href: "/support" },
] as const;

const WAITLIST_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbwbToC0g0G7V2mU25gzJzBWAdVH5CyjycaXTabTE-syv1FKDq69xCzTP9uFMhrDR7S0ug/exec";

const HERO_METRICS = [
  { es: "Claridad vocal", en: "Vocal clarity" },
  { es: "Más presencia", en: "More presence" },
  { es: "Perfiles cine", en: "Cinema presets" },
] as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function SiteShell({ page }: { page: SitePage }) {
  const [locale, setLocale] = useState<Locale>("es");

  return (
    <div className="ambient-shell min-h-screen overflow-x-hidden">
      <div className="pointer-events-none absolute inset-0 hero-grid opacity-40" />
      <SiteHeader locale={locale} onLocaleChange={setLocale} page={page} />
      <main className="relative z-10">
        {page === "home" ? (
          <HomeView locale={locale} />
        ) : (
          <InfoView locale={locale} page={page} />
        )}
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}

function SiteHeader({
  locale,
  onLocaleChange,
  page,
}: {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
  page: SitePage;
}) {
  const header = siteCopy.header;

  return (
    <header className="sticky top-0 z-30 border-b border-white/8 bg-[#040814]/72 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-5 py-4 sm:px-8 lg:px-10">
        <Link href="/" className="flex items-center gap-3">
          <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-cyan-300/25 bg-cyan-300/8 shadow-[0_0_32px_rgba(120,240,255,0.14)]">
            <span className="absolute h-6 w-6 rounded-full border border-cyan-200/40 animate-pulse-ring" />
            <span className="h-2.5 w-2.5 rounded-full bg-cyan-200 shadow-[0_0_20px_rgba(120,240,255,0.8)]" />
          </span>
          <div>
            <p className="font-display text-sm uppercase tracking-[0.32em] text-cyan-200/78">
              Cinema Audio Boost
            </p>
            <p className="text-sm text-slate-300">
              {getText(header.prelaunch, locale)}
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <nav className="flex items-center gap-5 text-sm text-slate-300">
            {NAV_ROUTES.map((item) => {
              const isActive =
                item.key === page || (page === "home" && item.key === "home");

              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`transition-colors hover:text-white ${
                    isActive ? "text-white" : ""
                  }`}
                >
                  {getText(header.nav[item.key], locale)}
                </Link>
              );
            })}
          </nav>

          <LocaleSwitch locale={locale} onLocaleChange={onLocaleChange} />

          <Link
            href={page === "home" ? "#join-launch" : "/#join-launch"}
            className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:border-cyan-200/60 hover:bg-cyan-300/16"
          >
            {getText(header.launchCta, locale)}
          </Link>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <LocaleSwitch locale={locale} onLocaleChange={onLocaleChange} compact />
          <Link
            href={page === "home" ? "#join-launch" : "/#join-launch"}
            className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100"
          >
            {locale === "es" ? "Lanz." : "Launch"}
          </Link>
        </div>
      </div>
    </header>
  );
}

function LocaleSwitch({
  locale,
  onLocaleChange,
  compact = false,
}: {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
  compact?: boolean;
}) {
  const labels = siteCopy.header.locale;

  return (
    <div
      className={`flex items-center rounded-full border border-white/10 bg-white/5 p-1 ${
        compact ? "gap-1" : "gap-1.5"
      }`}
      aria-label={getText(labels.label, locale)}
    >
      {(["es", "en"] as const).map((nextLocale) => {
        const active = nextLocale === locale;

        return (
          <button
            key={nextLocale}
            type="button"
            aria-pressed={active}
            onClick={() => startTransition(() => onLocaleChange(nextLocale))}
            className={