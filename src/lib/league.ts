import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type Team = {
  id: string;
  name: string;
  abbrev: string;
  color: string;
  rank: number;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  points: number;
};

export type Match = {
  id: string;
  home_team_id: string;
  away_team_id: string;
  home_score: number | null;
  away_score: number | null;
  status: string;
  kickoff: string;
};

export type Player = {
  id: string;
  team_id: string;
  name: string;
  position: "GK" | "DF" | "MF" | "FW";
  shirt_number: number;
  nationality: string;
  nationality_flag: string;
  age: number;
  height_cm: number;
  preferred_foot: string;
  appearances: number;
  goals: number;
  assists: number;
  clean_sheets: number;
  bio: string;
};

export const teamsQuery = queryOptions({
  queryKey: ["teams"],
  queryFn: async (): Promise<Team[]> => {
    const { data, error } = await supabase
      .from("teams")
      .select("*")
      .order("rank", { ascending: true });
    if (error) throw error;
    return (data ?? []) as Team[];
  },
});

export const matchesQuery = queryOptions({
  queryKey: ["matches"],
  queryFn: async (): Promise<Match[]> => {
    const { data, error } = await supabase
      .from("matches")
      .select("*")
      .order("kickoff", { ascending: true });
    if (error) throw error;
    return (data ?? []) as Match[];
  },
});

export const playersQuery = (teamId: string | undefined) =>
  queryOptions({
    queryKey: ["players", teamId],
    enabled: Boolean(teamId),
    queryFn: async (): Promise<Player[]> => {
      const { data, error } = await supabase
        .from("players")
        .select("*")
        .eq("team_id", teamId!)
        .order("shirt_number", { ascending: true });
      if (error) throw error;
      return (data ?? []) as Player[];
    },
  });

export const POSITION_GROUPS = [
  { key: "GK", label: "Goalkeepers" },
  { key: "DF", label: "Defenders" },
  { key: "MF", label: "Midfielders" },
  { key: "FW", label: "Forwards" },
] as const;

export const POSITION_NAMES: Record<string, string> = {
  GK: "Goalkeeper",
  DF: "Defender",
  MF: "Midfielder",
  FW: "Forward",
};

export function initials(name: string) {
  const parts = name.split(" ").filter(Boolean);
  return ((parts[0]?.[0] ?? "") + (parts[parts.length - 1]?.[0] ?? "")).toUpperCase();
}

export function formatKickoff(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

export function formatKickoffTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
