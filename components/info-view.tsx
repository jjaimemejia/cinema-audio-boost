import Link from "next/link";
import { getText, infoPages, type InfoPageKey, type Locale } from "@/lib/site-copy";

export function InfoView({
  locale,
  page,
}: {
  locale: Locale;
  page: InfoPageKey;
}) {
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
