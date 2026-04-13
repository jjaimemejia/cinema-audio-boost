import Link from "next/link";
import { getText, siteCopy, type Locale } from "@/lib/site-copy";

export function SiteFooter({ locale }: { locale: Locale }) {
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
          <span className="text-slate-500">{getText(footer.legal, locale)}</span>
        </div>
      </div>
    </footer>
  );
}
