import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Crest } from "@/components/Crest";
import { teamsQuery, type Team } from "@/lib/league";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Premier League Table — The Table" },
      {
        name: "description",
        content:
          "Live-updating Premier League standings: rank, played, wins, draws, losses and points for all 20 clubs.",
      },
      { property: "og:title", content: "Premier League Table — The Table" },
      {
        property: "og:description",
        content: "All 20 clubs ranked, with Champions League and relegation zones marked.",
      },
    ],
  }),
  component: LeagueTablePage,
});

function zoneOf(rank: number) {
  if (rank <= 4) return "ucl" as const;
  if (rank >= 18) return "rel" as const;
  return null;
}

function Row({ team, onOpen }: { team: Team; onOpen: (t: Team) => void }) {
  const zone = zoneOf(team.rank);
  return (
    <tr
      onClick={() => onOpen(team)}
      className="group cursor-pointer border-b border-border/60 transition-colors last:border-0 hover:bg-accent/60"
    >
      <td className="py-3 pl-3 sm:pl-4">
        <div className="flex items-center gap-3">
          <span
            className="h-8 w-[3px] shrink-0 rounded-full"
            style={{
              backgroundColor:
                zone === "ucl"
                  ? "var(--ucl)"
                  : zone === "rel"
                    ? "var(--relegation)"
                    : "transparent",
            }}
          />
          <span className="font-display w-5 text-base font-bold text-chalk tabular-nums">
            {team.rank}
          </span>
        </div>
      </td>
      <td className="py-3">
        <div className="flex min-w-0 items-center gap-3">
          <Crest abbrev={team.abbrev} color={team.color} size={26} className="shrink-0" />
          <span className="truncate text-sm font-medium text-chalk transition-colors group-hover:text-gold sm:text-[0.95rem]">
            <span className="sm:hidden">{team.abbrev}</span>
            <span className="hidden sm:inline">{team.name}</span>
          </span>
        </div>
      </td>
      <td className="px-2 text-center text-sm text-muted-foreground tabular-nums">
        {team.played}
      </td>
      <td className="px-2 text-center text-sm text-muted-foreground tabular-nums">
        {team.wins}
      </td>
      <td className="px-2 text-center text-sm text-muted-foreground tabular-nums">
        {team.draws}
      </td>
      <td className="px-2 text-center text-sm text-muted-foreground tabular-nums">
        {team.losses}
      </td>
      <td className="font-display pr-3 text-right text-base font-extrabold text-gold-bright tabular-nums sm:pr-4">
        {team.points}
      </td>
    </tr>
  );
}

function LeagueTablePage() {
  const { data: teams, isPending, error } = useQuery(teamsQuery);
  const navigate = useNavigate();

  const open = (team: Team) =>
    navigate({ to: "/squads/$abbrev", params: { abbrev: team.abbrev.toLowerCase() } });

  return (
    <section>
      <div className="mb-5 flex flex-wrap items-center gap-x-6 gap-y-2">
        <h2 className="font-display text-xl font-extrabold tracking-[0.12em] text-chalk uppercase">
          Standings
        </h2>
        <div className="flex flex-wrap items-center gap-4 text-[0.68rem] tracking-[0.14em] text-muted-foreground uppercase">
          <span className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-sm bg-ucl" /> Champions League
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-sm bg-relegation" /> Relegation
          </span>
        </div>
      </div>

      <div className="card-night overflow-hidden rounded-xl hover:translate-y-0 hover:border-border hover:shadow-[var(--shadow-card)]">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-border bg-surface/80">
              <th className="py-3 pl-3 text-left text-[0.62rem] tracking-[0.2em] text-muted-foreground uppercase sm:pl-4">
                #
              </th>
              <th className="py-3 text-left text-[0.62rem] tracking-[0.2em] text-muted-foreground uppercase">
                Club
              </th>
              {["P", "W", "D", "L"].map((h) => (
                <th
                  key={h}
                  className="w-10 px-2 py-3 text-center text-[0.62rem] tracking-[0.2em] text-muted-foreground uppercase"
                >
                  {h}
                </th>
              ))}
              <th className="w-14 py-3 pr-3 text-right text-[0.62rem] tracking-[0.2em] text-gold uppercase sm:pr-4">
                Pts
              </th>
            </tr>
          </thead>
          <tbody>
            {isPending &&
              Array.from({ length: 20 }).map((_, i) => (
                <tr key={i} className="border-b border-border/60">
                  <td colSpan={7} className="h-[49px]">
                    <div className="mx-4 h-4 animate-pulse rounded bg-surface-raised" />
                  </td>
                </tr>
              ))}
            {teams?.map((team) => <Row key={team.id} team={team} onOpen={open} />)}
          </tbody>
        </table>
      </div>
      {error && (
        <p className="mt-4 text-sm text-destructive">The standings could not be loaded.</p>
      )}
    </section>
  );
}
