export function BenefitIcon({
  icon,
}: {
  icon: "dialogue" | "volume" | "cinema" | "platforms";
}) {
  const className =
    "h-14 w-14 rounded-2xl border border-cyan-200/16 bg-cyan-300/10 p-3 text-cyan-100";

  if (icon === "dialogue") {
    return (
      <div className={className}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-full w-full">
          <path d="M5 7.5h14M5 12h9M5 16.5h6" strokeWidth="1.7" strokeLinecap="round" />
          <path d="M4 4h16v13H8l-4 3V4Z" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      </div>
    );
  }

  if (icon === "volume") {
    return (
      <div className={className}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-full w-full">
          <path d="M5 10h4l5-4v12l-5-4H5z" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M17 9c1.2 1 2 2.6 2 4s-.8 3-2 4" strokeWidth="1.7" strokeLinecap="round" />
          <path d="M19.5 6.5A8.4 8.4 0 0 1 22 13a8.4 8.4 0 0 1-2.5 6.5" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  if (icon === "cinema") {
    return (
      <div className={className}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-full w-full">
          <rect x="4" y="5" width="16" height="14" rx="2.5" strokeWidth="1.5" />
          <path d="M8 5v14M16 5v14M4 9h16M4 15h16" strokeWidth="1.5" />
        </svg>
      </div>
    );
  }

  return (
    <div className={className}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-full w-full">
        <path d="M4 7.5h16M7 4v3.5M17 4v3.5" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="4" y="7" width="16" height="12" rx="2.5" strokeWidth="1.5" />
        <path d="M8 12h3v3H8zM13 12h3v3h-3z" strokeWidth="1.5" />
      </svg>
    </div>
  );
}
