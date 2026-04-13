"use client";

import { FormEvent, useState } from "react";
import { BenefitIcon } from "@/components/benefit-icon";
import { ContentSection } from "@/components/content-section";
import { HeroVisual } from "@/components/hero-visual";
import { getText, siteCopy, type Locale } from "@/lib/site-copy";

const WAITLIST_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbwbToC0g0G7V2mU25gzJzBWAdVH5CyjycaXTabTE-syv1FKDq69xCzTP9uFMhrDR7S0ug/exec";

const HERO_METRICS = [
  { es: "Claridad vocal", en: "Vocal clarity" },
  { es: "Más presencia", en: "More presence" },
  { es: "Perfiles cine", en: "Cinema presets" },
] as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function HomeView({ locale }: { locale: Locale }) {
  const copy = siteCopy.home;
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");
  const [openFaq, setOpenFaq] = useState(0);

  const scrollToLaunch = () => {
    document.getElementById("join-launch")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    if (!EMAIL_PATTERN.test(normalizedEmail)) {
      setStatus("error");
      setFeedback(getText(copy.signup.invalidEmail, locale));
      return;
    }

    setLoading(true);
    setStatus("idle");
    setFeedback("");

    try {
      const response = await fetch(WAITLIST_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify({ email: normalizedEmail }),
      });

      if (!response.ok) {
        throw new Error("Waitlist request failed");
      }

      setStatus("success");
      setFeedback(getText(copy.signup.success, locale));
      setEmail("");
    } catch {
      setStatus("error");
      setFeedback(getText(copy.signup.error, locale));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="mx-auto grid min-h-[calc(100svh-81px)] w-full max-w-7xl gap-16 px-5 py-14 sm:px-8 md:items-center md:py-18 lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)] lg:px-10">
          <div className="relative z-10 max-w-2xl">
            <div className="animate-rise space-y-8" style={{ animationDelay: "80ms" }}>
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
                className="rounded-full border border-cyan-300/12 bg-white/5 px-5 py-4 text-center text-sm font-semibold uppercase tracking-[0.18em] text-slate-100"
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
            <ul className="space-y-4">
              {copy.pro.features.map((feature) => (
                <li key={feature.es} className="flex items-start gap-3 text-slate-200">
                  <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-cyan-200 shadow-[0_0_18px_rgba(120,240,255,0.65)]" />
                  <span className="leading-7">{getText(feature, locale)}</span>
                </li>
              ))}
            </ul>
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
            <form onSubmit={handleSubmit} className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto]">
              <label className="space-y-3">
                <span className="text-sm uppercase tracking-[0.24em] text-slate-400">
                  {getText(copy.signup.inputLabel, locale)}
                </span>
                <input
                  type="email"
                  required
                  inputMode="email"
                  autoComplete="email"
                  value={email}
                  disabled={loading}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (status !== "idle") {
                      setStatus("idle");
                      setFeedback("");
                    }
                  }}
                  placeholder={getText(copy.signup.placeholder, locale)}
                  className="min-h-14 w-full rounded-full border border-white/10 bg-white/5 px-5 text-base text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-200/45 focus:bg-white/8"
                />
              </label>
              <button
                type="submit"
                disabled={loading}
                className="mt-auto inline-flex min-h-14 items-center justify-center rounded-full bg-linear-to-r from-cyan-300 to-blue-500 px-7 text-sm font-semibold uppercase tracking-[0.24em] text-slate-950 shadow-[0_18px_52px_rgba(25,139,255,0.28)] transition duration-200 hover:scale-[1.01] disabled:cursor-wait disabled:opacity-80 disabled:hover:scale-100"
              >
                {loading
                  ? getText(copy.signup.loading, locale)
                  : getText(copy.signup.button, locale)}
              </button>
            </form>

            <p
              aria-live="polite"
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
