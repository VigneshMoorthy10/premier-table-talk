import { Link } from "@tanstack/react-router";

const TABS = [
  { to: "/", label: "League Table" },
  { to: "/fixtures", label: "Fixtures & Results" },
  { to: "/squads", label: "Squads" },
] as const;

export function SiteHeader() {
  return (
    <header className="border-b border-border/70 backdrop-blur-sm">
      <div className="mx-auto w-full max-w-6xl px-4 pt-8 pb-1 sm:px-6">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
          <div className="min-w-0">
            <p className="font-display text-[0.7rem] tracking-[0.42em] text-gold uppercase">
              Premier League
            </p>
            <Link to="/" className="block min-w-0">
              <h1 className="font-display truncate text-4xl leading-none font-extrabold text-chalk uppercase sm:text-5xl">
                The Table
              </h1>
            </Link>
          </div>
          <p className="hidden max-w-[16rem] text-right text-xs leading-relaxed text-muted-foreground sm:block">
            Standings, fixtures and every squad — under the floodlights.
          </p>
        </div>

        <nav className="mt-6 flex gap-1 overflow-x-auto">
          {TABS.map((tab) => (
            <Link
              key={tab.to}
              to={tab.to}
              activeOptions={{ exact: tab.to === "/" }}
              className="font-display shrink-0 border-b-2 border-transparent px-3 pb-3 text-[0.78rem] tracking-[0.16em] text-muted-foreground uppercase transition-colors hover:text-chalk"
              activeProps={{ className: "border-gold text-gold" }}
            >
              {tab.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
