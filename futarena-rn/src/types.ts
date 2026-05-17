export interface Team {
  id: string;
  name: string;
  shortName: string;
  badge: string;
  primaryColor: string;
  secondaryColor: string;
  overall: number;
}

export interface MatchData {
  team1: string;
  team1Name: string;
  team2: string;
  team2Name: string;
  score1: number;
  score2: number;
  date: string;
}

export interface StandingsStats {
  p: number; // pontos
  j: number; // jogos
  v: number; // vitorias
  e: number; // empates
  d: number; // derrotas
  gp: number; // gols pro
  gc: number; // gols contra
  sg: number; // saldo de gols
}

export interface Standings {
  [teamId: string]: StandingsStats;
}

export interface RoundMatch {
  home: string;
  away: string;
  played?: boolean;
  scoreHome?: number;
  scoreAway?: number;
}
