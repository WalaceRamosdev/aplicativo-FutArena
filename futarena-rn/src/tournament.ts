import { Team, RoundMatch, Standings, StandingsStats } from './types';

// Algoritmo de Círculo (Round-Robin) para gerar tabela de jogos
export function generateLeagueSchedule(teamIds: string[]): RoundMatch[][] {
  const list = [...teamIds];
  if (list.length % 2 !== 0) {
    list.push('BYE'); // Salvaguarda para número ímpar
  }

  const n = list.length;
  const roundsCount = n - 1;
  const matchesPerRound = n / 2;
  const schedule: RoundMatch[][] = [];

  for (let r = 0; r < roundsCount; r++) {
    const roundMatches: RoundMatch[] = [];
    for (let m = 0; m < matchesPerRound; m++) {
      const homeIdx = (r + m) % (n - 1);
      let awayIdx = (r + n - 1 - m) % (n - 1);

      if (m === 0) {
        awayIdx = n - 1;
      }

      const home = list[homeIdx];
      const away = list[awayIdx];

      if (home !== 'BYE' && away !== 'BYE') {
        // Alterna mando de campo baseado na rodada
        if (r % 2 === 0) {
          roundMatches.push({ home, away, played: false });
        } else {
          roundMatches.push({ home: away, away: home, played: false });
        }
      }
    }
    schedule.push(roundMatches);
  }
  return schedule;
}

// Inicializa a classificação dos pontos corridos
export function initializeStandings(teamIds: string[]): Standings {
  const standings: Standings = {};
  teamIds.forEach(id => {
    standings[id] = {
      p: 0,
      j: 0,
      v: 0,
      e: 0,
      d: 0,
      gp: 0,
      gc: 0,
      sg: 0
    };
  });
  return standings;
}

// Atualiza a tabela após o resultado de um jogo
export function updateStandingsWithResult(
  standings: Standings,
  homeId: string,
  awayId: string,
  homeGoals: number,
  awayGoals: number
): Standings {
  const copy = { ...standings };

  if (!copy[homeId]) copy[homeId] = { p: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 };
  if (!copy[awayId]) copy[awayId] = { p: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 };

  const home = copy[homeId];
  const away = copy[awayId];

  home.j++;
  away.j++;

  home.gp += homeGoals;
  home.gc += awayGoals;
  home.sg = home.gp - home.gc;

  away.gp += awayGoals;
  away.gc += homeGoals;
  away.sg = away.gp - away.gc;

  if (homeGoals > awayGoals) {
    home.p += 3;
    home.v++;
    away.d++;
  } else if (homeGoals < awayGoals) {
    away.p += 3;
    away.v++;
    home.d++;
  } else {
    home.p += 1;
    away.p += 1;
    home.e++;
    away.e++;
  }

  return copy;
}

// Simulação automática sutil baseada em overall dos times
export function simulateCpuMatch(homeOvr: number, awayOvr: number): { homeGoals: number; awayGoals: number } {
  // Probabilidade básica de gols
  const baseHome = 1.3;
  const baseAway = 1.0;

  // Influência do OVR (diferença de overall)
  const diff = homeOvr - awayOvr;
  const ovrInfluence = diff * 0.03; // Cada ponto de OVR altera em 3% a expectativa de gols

  const homeExpectation = Math.max(0.2, baseHome + ovrInfluence);
  const awayExpectation = Math.max(0.2, baseAway - ovrInfluence);

  // Gols gerados por distribuição de Poisson simplificada
  const poissonRandom = (lambda: number) => {
    let L = Math.exp(-lambda);
    let k = 0;
    let p = 1.0;
    do {
      k++;
      p *= Math.random();
    } while (p > L && k < 10);
    return k - 1;
  };

  return {
    homeGoals: poissonRandom(homeExpectation),
    awayGoals: poissonRandom(awayExpectation)
  };
}
