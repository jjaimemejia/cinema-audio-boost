import { getText, siteCopy, type Locale } from "@/lib/site-copy";

export function HeroVisual({ locale }: { locale: Locale }) {
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
                  style={{ height, animationDelay: `${index * 140}ms` }}
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
