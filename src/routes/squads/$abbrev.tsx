import { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Crest } from "@/components/Crest";
import { PlayerModal } from "@/components/PlayerModal";
import {
  initials,
  playersQuery,
  POSITION_GROUPS,
  POSITION_NAMES,
  teamsQuery,
  type Player,
} from "@/lib/league";

export const Route = createFileRoute("/squads/$abbrev")({
  component: SquadPage,
});

function SquadPage() {
  const { abbrev } = Route.useParams();
  const { data: teams, isPending: teamsPending, error: teamsError } = useQuery(teamsQuery);
  const team = teams?.find((candidate) => candidate.abbrev.toLowerCase() === abbrev.toLowerCase());
  const {
    data: players,
    isPending: playersPending,
    error: playersError,
  } = useQuery(playersQuery(team?.id));
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  if (teamsPending) {
    return <SquadLoading />;
  }

  if (teamsError || !team) {
    return (
      <section className="py-10 text-center">
        <p className="text-sm text-destructive">
          {teamsError ? "The club details could not be loaded." : "This club could not be found."}
        </p>
        <Link to="/" className="mt-4 inline-block text-sm text-gold hover:text-gold-bright">
          Back to standings
        </Link>
      </section>
    );
  }

  return (
    <section>
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-xs tracking-[0.16em] text-muted-foreground uppercase transition-colors hover:text-gold"
      >
        <span aria-hidden="true">←</span> Back to standings
      </Link>

      <div className="card-night mt-5 flex flex-wrap items-center gap-4 rounded-xl p-5 sm:p-6">
        <Crest abbrev={team.abbrev} color={team.color} size={64} className="shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="text-[0.68rem] tracking-[0.2em] text-gold uppercase">Club squad</p>
          <h2 className="font-display mt-1 truncate text-3xl font-extrabold text-chalk uppercase sm:text-4xl">
            {team.name}
          </h2>
        </div>
        <dl className="flex gap-5 text-right text-sm tabular-nums sm:gap-7">
          <div>
            <dt className="text-[0.6rem] tracking-[0.16em] text-muted-foreground uppercase">
              Position
            </dt>
            <dd className="font-display mt-1 text-xl font-extrabold text-chalk">{team.rank}</dd>
          </div>
          <div>
            <dt className="text-[0.6rem] tracking-[0.16em] text-muted-foreground uppercase">
              Points
            </dt>
            <dd className="font-display mt-1 text-xl font-extrabold text-gold-bright">
              {team.points}
            </dd>
          </div>
          <div>
            <dt className="text-[0.6rem] tracking-[0.16em] text-muted-foreground uppercase">
              Record
            </dt>
            <dd className="font-display mt-1 text-xl font-extrabold text-chalk">
              {team.wins}-{team.draws}-{team.losses}
            </dd>
          </div>
        </dl>
      </div>

      {playersError && (
        <p className="mt-6 text-sm text-destructive">The squad could not be loaded.</p>
      )}
      {playersPending && <SquadLoading />}
      {players && (
        <div className="mt-8 space-y-8">
          {POSITION_GROUPS.map((group) => {
            const groupPlayers = players.filter((player) => player.position === group.key);
            if (!groupPlayers.length) return null;

            return (
              <div key={group.key}>
                <h3 className="font-display text-lg font-extrabold tracking-[0.14em] text-chalk uppercase">
                  {group.label}
                </h3>
                <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {groupPlayers.map((player) => (
                    <button
                      key={player.id}
                      type="button"
                      onClick={() => setSelectedPlayer(player)}
                      className="card-night flex w-full items-center gap-3 rounded-lg p-3 text-left"
                    >
                      <span className="font-display w-6 text-center text-lg font-extrabold text-gold tabular-nums">
                        {player.shirt_number}
                      </span>
                      <span
                        className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-xs font-bold text-chalk"
                        style={{ backgroundColor: team.color }}
                      >
                        {initials(player.name)}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold text-chalk">
                          {player.name}
                        </span>
                        <span className="mt-0.5 block text-xs text-muted-foreground">
                          {player.nationality_flag} {player.nationality} · {player.age}
                        </span>
                      </span>
                      <span className="text-[0.62rem] tracking-[0.12em] text-muted-foreground uppercase">
                        {POSITION_NAMES[player.position]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
          {!players.length && (
            <p className="text-sm text-muted-foreground">
              No squad members are available for this club yet.
            </p>
          )}
        </div>
      )}

      <PlayerModal player={selectedPlayer} team={team} onClose={() => setSelectedPlayer(null)} />
    </section>
  );
}

function SquadLoading() {
  return (
    <div className="mt-6 space-y-5">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="space-y-3">
          <div className="h-5 w-32 animate-pulse rounded bg-surface-raised" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((__, cardIndex) => (
              <div key={cardIndex} className="h-16 animate-pulse rounded-lg bg-surface" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
