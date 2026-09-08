import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Crest } from "@/components/Crest";
import { initials, POSITION_NAMES, type Player, type Team } from "@/lib/league";

type Props = {
  player: Player | null;
  team: Team;
  onClose: () => void;
};

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex-1 px-3 py-3 text-center">
      <p className="font-display text-3xl leading-none font-extrabold text-gold-bright">
        {value}
      </p>
      <p className="mt-1 text-[0.65rem] tracking-[0.18em] text-muted-foreground uppercase">
        {label}
      </p>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-surface/70 px-3 py-2">
      <p className="text-[0.6rem] tracking-[0.18em] text-muted-foreground uppercase">
        {label}
      </p>
      <p className="mt-0.5 truncate text-sm text-chalk">{value}</p>
    </div>
  );
}

export function PlayerModal({ player, team, onClose }: Props) {
  return (
    <Dialog open={Boolean(player)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto border-border bg-popover p-0 sm:max-w-lg">
        {player && (
          <div>
            <div
              className="flex items-center gap-4 border-b border-border p-5"
              style={{
                backgroundImage: `linear-gradient(120deg, ${player.position === "GK" ? team.color : team.color}33, transparent 70%)`,
              }}
            >
              <div
                className="grid h-20 w-20 shrink-0 place-items-center rounded-full border border-border"
                style={{ backgroundColor: team.color }}
              >
                <span className="font-display text-2xl font-extrabold text-chalk">
                  {initials(player.name)}
                </span>
              </div>
              <div className="min-w-0">
                <DialogTitle className="font-display truncate text-2xl font-extrabold text-chalk uppercase">
                  {player.name}
                </DialogTitle>
                <p className="mt-1 truncate text-sm text-muted-foreground">
                  {player.nationality_flag} {player.nationality} · {team.name}
                </p>
                <p className="font-display mt-1 text-xs tracking-[0.2em] text-gold uppercase">
                  No. {player.shirt_number} · {POSITION_NAMES[player.position]}
                </p>
              </div>
            </div>

            <div className="flex divide-x divide-border border-b border-border bg-surface/60">
              <Stat label="Apps" value={player.appearances} />
              <Stat label="Goals" value={player.goals} />
              {player.position === "GK" ? (
                <Stat label="Clean Sheets" value={player.clean_sheets} />
              ) : (
                <Stat label="Assists" value={player.assists} />
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 p-5 sm:grid-cols-3">
              <Info label="Position" value={POSITION_NAMES[player.position]} />
              <Info label="Age" value={`${player.age}`} />
              <Info label="Height" value={`${player.height_cm} cm`} />
              <Info label="Foot" value={player.preferred_foot} />
              <Info label="Nation" value={player.nationality} />
              <Info label="Club" value={team.name} />
            </div>

            <div className="flex items-start gap-4 border-t border-border px-5 py-5">
              <Crest abbrev={team.abbrev} color={team.color} size={32} className="shrink-0" />
              <p className="text-sm leading-relaxed text-muted-foreground">{player.bio}</p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
