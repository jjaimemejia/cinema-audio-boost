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
type FormStatus = "idle" | "submitting" | "success" | "error";

const NAV_ROUTES = [
  { key: "home", href: "/" },
  { key: "privacy", href: "/privacy" },
  { key: "support", href: "/support" },
] as const;

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
            className={`rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] transition ${
              active
                ? "bg-cyan-200 text-slate-950 shadow-[0_0_26px_rgba(120,240,255,0.35)]"
                : "text-slate-300 hover:text-white"
            }`}
          >
            {getText(labels[nextLocale], locale)}
          </button>
        );
      })}
    </div>
  );
}

function HomeView({ locale }: { locale: Locale }) {
  const copy = siteCopy.home;
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedback, setFeedback] = useState("");
  const [openFaq, setOpenFaq] = useState(0);

  const scrollToLaunch = () => {
    const target = document.getElementById("join-launch");
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!EMAIL_PATTERN.test(email)) {
      setStatus("error");
      setFeedback(getText(copy.signup.invalidEmail, locale));
      return;
    }

    setStatus("submitting");
    setFeedback("");

    window.setTimeout(() => {
      setStatus("success");
      setFeedback(getText(copy.signup.success, locale));
      setEmail("");
    }, 650);
  };

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="mx-auto grid min-h-[calc(100svh-81px)] w-full max-w-7xl gap-16 px-5 py-14 sm:px-8 md:items-center md:py-18 lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)] lg:px-10">
          <div className="relative z-10 max-w-2xl">
            <div
              className="animate-rise space-y-8"
              style={{ animationDelay: "80ms" }}
            >
              <div className="inline-flex items-center gap-3 rounded-full border border-cyan-300/15 bg-cyan-300/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-100/88">
                <span className="h-2 w-2 rounded-full bg-cyan-200 shadow-[0_0_16px_rgba(120,240,255,0.85)]" />
                {getText(copy.hero.badge, locale)}
              </div>

              <div className="space-y-5">
                <p className="font-display text-[clamp(2.7rem,7vw,5.6rem)] leading-none tracking-[-0.06em] text-white">
                  Cinema Audio Boost
                </p>
                <h1 className="max-w-3xl text-balance font-display text-[clamp(2.3rem,5.6vw,4.8rem)] leading-[0.94] tracking-[-0.05em] text-slate-100">
                  {getText(copy.hero.title, locale)}
                </h1>
                <p className="max-w-xl text-balance text-lg leading-8 text-slate-300 sm:text-xl">
                  {getText(copy.hero.subtitle, locale)}
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <span className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/12 bg-white/8 px-7 text-sm font-semibold uppercase tracking-[0.24em] text-slate-200">
                  {getText(copy.hero.primaryCta, locale)}
                </span>
                <button
                  type="button"
                  onClick={scrollToLaunch}
                  className="inline-flex min-h-14 items-center justify-center rounded-full bg-linear-to-r from-cyan-300 to-blue-500 px-7 text-sm font-semibold uppercase tracking-[0.24em] text-slate-950 shadow-[0_18px_60px_rgba(25,139,255,0.32)] transition hover:scale-[1.01] hover:shadow-[0_24px_78px_rgba(25,139,255,0.38)]"
                >
                  {getText(copy.hero.secondaryCta, locale)}
                </button>
              </div>

              <p className="max-w-lg text-sm leading-7 text-slate-400">
                {getText(copy.hero.note, locale)}
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                {HERO_METRICS.map((item) => (
                  <div
                    key={item.es}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200"
                  >
                    {getText(item, locale)}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <HeroVisual locale={locale} />
        </div>
      </section>

      <section className="section-divider">
        <ContentSection
          eyebrow={copy.benefits.eyebrow}
          title={copy.benefits.title}
          intro={copy.benefits.intro}
          locale={locale}
        >
          <div className="grid gap-4 md:grid-cols-2">
            {copy.benefits.items.map((benefit) => (
              <div
                key={benefit.key}
                className="panel-sheen rounded-[2rem] border border-white/10 bg-[var(--surface)] p-6 shadow-[0_18px_60px_rgba(2,6,23,0.36)]"
              >
                <BenefitIcon icon={benefit.key} />
                <h3 className="mt-6 font-display text-2xl text-white">
                  {getText(benefit.title, locale)}
                </h3>
                <p className="mt-3 max-w-md leading-7 text-slate-300">
                  {getText(benefit.description, locale)}
                </p>
              </div>
            ))}
          </div>
        </ContentSection>
      </section>

      <section className="section-divider">
        <ContentSection
          eyebrow={copy.platforms.eyebrow}
          title={copy.platforms.title}
          intro={copy.platforms.intro}
          locale={locale}
        >
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {copy.platforms.items.map((platform) => (
              <div
                key={platform}
                className="rounded-full border border-cyan-300/12 bg-white/5 px-5 py-4 text-center text-sm font-semibold tracking-[0.18em] text-slate-100 uppercase"
              >
                {platform}
              </div>
            ))}
          </div>
        </ContentSection>
      </section>

      <section className="section-divider">
        <ContentSection
          eyebrow={copy.howItWorks.eyebrow}
          title={copy.howItWorks.title}
          intro={copy.howItWorks.intro}
          locale={locale}
        >
          <div className="grid gap-5 lg:grid-cols-3">
            {copy.howItWorks.steps.map((step, index) => (
              <div
                key={step.number}
                className="rounded-[2rem] border border-white/10 bg-[var(--surface)] p-6"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-cyan-200/18 bg-cyan-300/10 font-display text-lg text-cyan-100">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 font-display text-2xl text-white">
                  {getText(step.title, locale)}
                </h3>
                <p className="mt-3 leading-7 text-slate-300">
                  {getText(step.description, locale)}
                </p>
              </div>
            ))}
          </div>
        </ContentSection>
      </section>

      <section className="section-divider">
        <ContentSection
          eyebrow={copy.presets.eyebrow}
          title={copy.presets.title}
          intro={copy.presets.intro}
          locale={locale}
        >
          <div className="grid gap-5 xl:grid-cols-3">
            {copy.presets.items.map((preset) => (
              <div
                key={preset.name}
                className="rounded-[2.2rem] border border-white/10 bg-linear-to-b from-white/8 to-white/3 p-7"
              >
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-100/76">
                  Preset
                </p>
                <h3 className="mt-4 font-display text-[2rem] text-white">
                  {preset.name}
                </h3>
                <p className="mt-4 leading-7 text-slate-300">
                  {getText(preset.description, locale)}
                </p>
              </div>
            ))}
          </div>
        </ContentSection>
      </section>

      <section className="section-divider">
        <ContentSection
          eyebrow={copy.pro.eyebrow}
          title={copy.pro.title}
          intro={copy.pro.intro}
          locale={locale}
        >
          <div className="grid gap-8 rounded-[2.5rem] border border-cyan-200/14 bg-linear-to-r from-[#07101d] via-[#09162a] to-[#06101a] p-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div>
              <ul className="space-y-4">
                {copy.pro.features.map((feature) => (
                  <li
                    key={feature.es}
                    className="flex items-start gap-3 text-slate-200"
                  >
                    <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-cyan-200 shadow-[0_0_18px_rgba(120,240,255,0.65)]" />
                    <span className="leading-7">{getText(feature, locale)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <span className="inline-flex min-h-14 items-center justify-center rounded-full border border-cyan-300/22 bg-cyan-300/10 px-7 text-sm font-semibold uppercase tracking-[0.24em] text-cyan-100">
              {getText(copy.pro.cta, locale)}
            </span>
          </div>
        </ContentSection>
      </section>

      <section id="join-launch" className="section-divider scroll-mt-28">
        <ContentSection
          eyebrow={copy.signup.eyebrow}
          title={copy.signup.title}
          intro={copy.signup.intro}
          locale={locale}
        >
          <div className="rounded-[2.4rem] border border-cyan-200/14 bg-[var(--surface-strong)] p-7 shadow-[0_22px_70px_rgba(2,6,23,0.44)] md:p-9">
            <form
              onSubmit={handleSubmit}
              className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto]"
            >
              <label className="space-y-3">
                <span className="text-sm uppercase tracking-[0.24em] text-slate-400">
                  {getText(copy.signup.inputLabel, locale)}
                </span>
                <input
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (status !== "idle") {
                      setStatus("idle");
                      setFeedback("");
                    }
                  }}
                  placeholder={getText(copy.signup.placeholder, locale)}
                  className="min-h-14 w-full rounded-full border border-white/10 bg-white/5 px-5 text-base text-white outline-none ring-0 transition placeholder:text-slate-500 focus:border-cyan-200/45 focus:bg-white/8"
                />
              </label>
              <button
                type="submit"
                disabled={status === "submitting"}
                className="mt-auto inline-flex min-h-14 items-center justify-center rounded-full bg-linear-to-r from-cyan-300 to-blue-500 px-7 text-sm font-semibold uppercase tracking-[0.24em] text-slate-950 shadow-[0_18px_52px_rgba(25,139,255,0.28)] transition hover:scale-[1.01] disabled:cursor-wait disabled:opacity-80"
              >
                {status === "submitting"
                  ? getText(copy.signup.loading, locale)
                  : getText(copy.signup.button, locale)}
              </button>
            </form>

            <p
              className={`mt-4 min-h-6 text-sm ${
                status === "error" ? "text-rose-300" : "text-cyan-100/82"
              }`}
            >
              {feedback}
            </p>
          </div>
        </ContentSection>
      </section>

      <section className="section-divider pb-20">
        <ContentSection
          eyebrow={copy.faq.eyebrow}
          title={copy.faq.title}
          intro={copy.faq.intro}
          locale={locale}
        >
          <div className="space-y-4">
            {copy.faq.items.map((item, index) => {
              const expanded = openFaq === index;
              return (
                <div
                  key={item.question.es}
                  className="rounded-[1.8rem] border border-white/10 bg-[var(--surface)] px-6 py-5"
                >
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-6 text-left"
                    onClick={() => setOpenFaq(expanded ? -1 : index)}
                    aria-expanded={expanded}
                  >
                    <span className="font-display text-xl text-white">
                      {getText(item.question, locale)}
                    </span>
                    <span className="text-2xl text-cyan-100/82">
                      {expanded ? "−" : "+"}
                    </span>
                  </button>
                  {expanded ? (
                    <p className="mt-4 max-w-3xl leading-7 text-slate-300">
                      {getText(item.answer, locale)}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </ContentSection>
      </section>
    </>
  );
}

function HeroVisual({ locale }: { locale: Locale }) {
  const copy = siteCopy.home.hero.visual;

  return (
    <div className="relative flex items-center justify-center">
      <div className="pointer-events-none absolute inset-x-8 top-1/2 h-44 -translate-y-1/2 rounded-full bg-cyan-300/12 blur-3xl" />
      <div className="panel-sheen relative w-full max-w-[34rem] overflow-hidden rounded-[2.8rem] border border-cyan-200/12 bg-linear-to-b from-white/8 via-[#07111f]/92 to-[#050b16] p-6 shadow-[0_26px_90px_rgba(4,8,20,0.78)] sm:p-8">
        <div className="grid gap-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.26em] text-cyan-100/78">
                {getText(copy.eyebrow, locale)}
              </p>
              <p className="mt-3 max-w-xs font-display text-3xl leading-tight text-white">
                {getText(copy.title, locale)}
              </p>
            </div>
            <span className="rounded-full border border-cyan-200/18 bg-cyan-300/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100">
              {getText(copy.status, locale)}
            </span>
          </div>

          <div className="relative h-[22rem] overflow-hidden rounded-[2rem] border border-white/8 bg-[radial-gradient(circle_at_center,rgba(25,139,255,0.18),transparent_45%),linear-gradient(180deg,#07101c_0%,#03070f_100%)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,240,255,0.08),transparent_60%)]" />
            <div className="absolute left-1/2 top-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/16 animate-pulse-ring" />
            <div
              className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-300/22 animate-pulse-ring"
              style={{ animationDelay: "0.9s" }}
            />
            <div className="absolute bottom-8 left-0 right-0 flex items-end justify-center gap-3 px-8">
              {[48, 82, 66, 104, 78, 92, 58].map((height, index) => (
                <span
                  key={height}
                  className="animate-bars w-5 rounded-full bg-linear-to-t from-blue-500 to-cyan-200 shadow-[0_0_24px_rgba(120,240,255,0.26)]"
                  style={{
                    height,
                    animationDelay: `${index * 140}ms`,
                  }}
                />
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {copy.metrics.map((metric) => (
              <div
                key={metric.label.es}
                className="rounded-[1.4rem] border border-white/8 bg-white/5 px-4 py-4"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  {getText(metric.label, locale)}
                </p>
                <p className="mt-2 font-display text-2xl text-white">
                  {getText(metric.value, locale)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ContentSection({
  eyebrow,
  title,
  intro,
  locale,
  children,
}: {
  eyebrow: { es: string; en: string };
  title: { es: string; en: string };
  intro: { es: string; en: string };
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
      <div className="mb-10 max-w-3xl space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-100/76">
          {getText(eyebrow, locale)}
        </p>
        <h2 className="text-balance font-display text-[clamp(2rem,4vw,3.4rem)] leading-[1.02] tracking-[-0.05em] text-white">
          {getText(title, locale)}
        </h2>
        <p className="max-w-2xl text-lg leading-8 text-slate-300">
          {getText(intro, locale)}
        </p>
      </div>
      {children}
    </section>
  );
}

function InfoView({ locale, page }: { locale: Locale; page: InfoPageKey }) {
  const content = infoPages[page];

  return (
    <section className="mx-auto w-full max-w-5xl px-5 py-16 sm:px-8 lg:px-10">
      <div className="rounded-[2.6rem] border border-white/10 bg-[var(--surface-strong)] p-8 shadow-[0_24px_80px_rgba(3,7,18,0.48)] md:p-10">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-100/72">
          {getText(content.eyebrow, locale)}
        </p>
        <h1 className="mt-4 text-balance font-display text-[clamp(2.4rem,6vw,4.4rem)] leading-[0.96] tracking-[-0.05em] text-white">
          {getText(content.title, locale)}
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
          {getText(content.intro, locale)}
        </p>

        <div className="mt-12 grid gap-5">
          {content.sections.map((section) => (
            <article
              key={section.title.es}
              className="rounded-[2rem] border border-white/8 bg-white/4 p-6"
            >
              <h2 className="font-display text-2xl text-white">
                {getText(section.title, locale)}
              </h2>
              <p className="mt-4 leading-8 text-slate-300">
                {getText(section.body, locale)}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          {content.actions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className={`inline-flex min-h-13 items-center justify-center rounded-full px-6 text-sm font-semibold uppercase tracking-[0.24em] transition ${
                action.variant === "primary"
                  ? "bg-linear-to-r from-cyan-300 to-blue-500 text-slate-950 shadow-[0_18px_48px_rgba(25,139,255,0.28)] hover:scale-[1.01]"
                  : "border border-white/12 bg-white/6 text-slate-100 hover:border-cyan-200/34 hover:bg-white/10"
              }`}
            >
              {getText(action.label, locale)}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function SiteFooter({ locale }: { locale: Locale }) {
  const footer = siteCopy.footer;

  return (
    <footer className="relative z-10 border-t border-white/8 bg-[#040814]/88">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 py-8 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div>
          <p className="font-display text-xl text-white">Cinema Audio Boost</p>
          <p className="mt-2 max-w-xl text-sm leading-7 text-slate-400">
            {getText(footer.note, locale)}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-5 text-sm text-slate-300">
          <Link href="/privacy" className="transition hover:text-white">
            {getText(footer.privacy, locale)}
          </Link>
          <Link href="/support" className="transition hover:text-white">
            {getText(footer.support, locale)}
          </Link>
          <span className="text-slate-500">
            {getText(footer.legal, locale)}
          </span>
        </div>
      </div>
    </footer>
  );
}

function BenefitIcon({
  icon,
}: {
  icon: "dialogue" | "volume" | "cinema" | "platforms";
}) {
  const commonClassName =
    "h-14 w-14 rounded-2xl border border-cyan-200/16 bg-cyan-300/10 p-3 text-cyan-100";

  switch (icon) {
    case "dialogue":
      return (
        <div className={commonClassName}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-full w-full">
            <path d="M5 7.5h14M5 12h9M5 16.5h6" strokeWidth="1.7" strokeLinecap="round" />
            <path d="M4 4h16v13H8l-4 3V4Z" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
        </div>
      );
    case "volume":
      return (
        <div className={commonClassName}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-full w-full">
            <path d="M5 10h4l5-4v12l-5-4H5z" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M17 9c1.2 1 2 2.6 2 4s-.8 3-2 4" strokeWidth="1.7" strokeLinecap="round" />
            <path d="M19.5 6.5A8.4 8.4 0 0 1 22 13a8.4 8.4 0 0 1-2.5 6.5" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
        </div>
      );
    case "cinema":
      return (
        <div className={commonClassName}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-full w-full">
            <rect x="4" y="5" width="16" height="14" rx="2.5" strokeWidth="1.5" />
            <path d="M8 5v14M16 5v14M4 9h16M4 15h16" strokeWidth="1.5" />
          </svg>
        </div>
      );
    case "platforms":
      return (
        <div className={commonClassName}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-full w-full">
            <path d="M4 7.5h16M7 4v3.5M17 4v3.5" strokeWidth="1.5" strokeLinecap="round" />
            <rect x="4" y="7" width="16" height="12" rx="2.5" strokeWidth="1.5" />
            <path d="M8 12h3v3H8zM13 12h3v3h-3z" strokeWidth="1.5" />
          </svg>
        </div>
      );
  }
}
