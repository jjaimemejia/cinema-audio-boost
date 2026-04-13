import type { ReactNode } from "react";
import { getText, type Locale, type LocalizedText } from "@/lib/site-copy";

export function ContentSection({
  eyebrow,
  title,
  intro,
  locale,
  children,
}: {
  eyebrow: LocalizedText;
  title: LocalizedText;
  intro: LocalizedText;
  locale: Locale;
  children: ReactNode;
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
