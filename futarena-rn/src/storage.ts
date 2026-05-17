import AsyncStorage from '@react-native-async-storage/async-storage';
import { MatchData, Standings } from './types';

const KEYS = {
  FAVORITE_TEAM: 'arena_favorite_team',
  MATCH_HISTORY: 'arena_match_history',
  TEAM_STATS: 'arena_team_stats',
  ARCADE_PROGRESS: 'arena_arcade_progress',
  WORLDCUP_PROGRESS: 'arena_worldcup_progress',
  SOUND_ENABLED: 'arena_sound_enabled',
};

export const StorageManager = {
  getFavorite: async (): Promise<string | null> => {
    return await AsyncStorage.getItem(KEYS.FAVORITE_TEAM);
  },

  setFavorite: async (id: string): Promise<void> => {
    await AsyncStorage.setItem(KEYS.FAVORITE_TEAM, id);
  },

  getHistory: async (): Promise<MatchData[]> => {
    const data = await AsyncStorage.getItem(KEYS.MATCH_HISTORY);
    return data ? JSON.parse(data) : [];
  },

  addMatch: async (match: MatchData): Promise<MatchData[]> => {
    const history = await StorageManager.getHistory();
    history.unshift(match);
    if (history.length > 20) history.pop();
    await AsyncStorage.setItem(KEYS.MATCH_HISTORY, JSON.stringify(history));
    await StorageManager.updateStats(match);
    return history;
  },

  clearHistory: async (): Promise<void> => {
    await AsyncStorage.removeItem(KEYS.MATCH_HISTORY);
  },

  getStats: async (): Promise<Record<string, { w: number; d: number; l: number; gf: number; ga: number; m: number }>> => {
    const data = await AsyncStorage.getItem(KEYS.TEAM_STATS);
    return data ? JSON.parse(data) : {};
  },

  updateStats: async (match: MatchData): Promise<void> => {
    const stats = await StorageManager.getStats();
    
    const updateTeam = (id: string, scored: number, conceded: number) => {
      if (!stats[id]) {
        stats[id] = { w: 0, d: 0, l: 0, gf: 0, ga: 0, m: 0 };
      }
      stats[id].m++;
      stats[id].gf += scored;
      stats[id].ga += conceded;
      if (scored > conceded) stats[id].w++;
      else if (scored < conceded) stats[id].l++;
      else stats[id].d++;
    };

    updateTeam(match.team1, match.score1, match.score2);
    updateTeam(match.team2, match.score2, match.score1);

    await AsyncStorage.setItem(KEYS.TEAM_STATS, JSON.stringify(stats));
  },

  clearStats: async (): Promise<void> => {
    await AsyncStorage.removeItem(KEYS.TEAM_STATS);
  },

  // ==================== ARCADE PROGRESS STORAGE ====================
  saveArcadeProgress: async (arcadeData: {
    userTeamId: string;
    currentRound: number;
    currentLeague: string;
    schedule: any[];
    standings: Standings;
    coins: number;
    overallBoosts: Record<string, number>;
  }): Promise<void> => {
    const data = {
      ...arcadeData,
      savedAt: new Date().toISOString()
    };
    await AsyncStorage.setItem(KEYS.ARCADE_PROGRESS, JSON.stringify(data));
  },

  getArcadeProgress: async (): Promise<any | null> => {
    const data = await AsyncStorage.getItem(KEYS.ARCADE_PROGRESS);
    return data ? JSON.parse(data) : null;
  },

  hasArcadeProgress: async (): Promise<boolean> => {
    const data = await AsyncStorage.getItem(KEYS.ARCADE_PROGRESS);
    return data !== null;
  },

  clearArcadeProgress: async (): Promise<void> => {
    await AsyncStorage.removeItem(KEYS.ARCADE_PROGRESS);
  },

  // ==================== WORLD CUP PROGRESS STORAGE ====================
  saveWorldCupProgress: async (wcData: {
    userTeamId: string;
    currentStage: string;
    bracket: any;
  }): Promise<void> => {
    const data = {
      ...wcData,
      savedAt: new Date().toISOString()
    };
    await AsyncStorage.setItem(KEYS.WORLDCUP_PROGRESS, JSON.stringify(data));
  },

  getWorldCupProgress: async (): Promise<any | null> => {
    const data = await AsyncStorage.getItem(KEYS.WORLDCUP_PROGRESS);
    return data ? JSON.parse(data) : null;
  },

  hasWorldCupProgress: async (): Promise<boolean> => {
    const data = await AsyncStorage.getItem(KEYS.WORLDCUP_PROGRESS);
    return data !== null;
  },

  clearWorldCupProgress: async (): Promise<void> => {
    await AsyncStorage.removeItem(KEYS.WORLDCUP_PROGRESS);
  },

  // ==================== SOUND SETTINGS ====================
  getSoundEnabled: async (): Promise<boolean> => {
    const data = await AsyncStorage.getItem(KEYS.SOUND_ENABLED);
    return data !== 'false'; // Default is true
  },

  setSoundEnabled: async (enabled: boolean): Promise<void> => {
    await AsyncStorage.setItem(KEYS.SOUND_ENABLED, String(enabled));
  }
};
