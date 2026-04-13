"use client";

import { useState } from "react";
import { HomeView } from "@/components/home-view";
import { InfoView } from "@/components/info-view";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { type InfoPageKey, type Locale } from "@/lib/site-copy";

type SitePage = "home" | InfoPageKey;

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
