import { StorageManager } from './storage';

// Playlist mockada sem carregar arquivos binários de música para evitar qualquer crash nativo no Android/iOS
const PLAYLIST = [
  {
    id: '1',
    title: 'Música Desativada (Modo de Segurança)',
    artist: 'FutArena 2026',
    file: null
  }
];

let isSoundEnabled = false;
let isMusicPlaying = false;
let currentTrackIndex = 0;
let onTrackChangeListener: ((track: typeof PLAYLIST[0]) => void) | null = null;

export const SoundManager = {
  init: async () => {
    try {
      isSoundEnabled = await StorageManager.getSoundEnabled();
    } catch (e) {
      isSoundEnabled = false;
    }
  },

  toggleSound: async (): Promise<boolean> => {
    isSoundEnabled = !isSoundEnabled;
    try {
      await StorageManager.setSoundEnabled(isSoundEnabled);
    } catch (e) {}
    return isSoundEnabled;
  },

  getSoundEnabled: () => isSoundEnabled,

  // --- Efeitos Sonoros (Mockados em modo de segurança) ---
  playWhistle: async () => {},
  playCollision: async () => {},
  playGoal: async () => {},
  playClick: async () => {},
  startCrowd: async () => {},
  stopCrowd: async () => {},

  // --- Controle de Música (Mockado em modo de segurança) ---
  getPlaylist: () => PLAYLIST,
  
  getCurrentTrack: () => PLAYLIST[currentTrackIndex],
  
  isMusicPlaying: () => isMusicPlaying,
  
  setOnTrackChange: (listener: (track: typeof PLAYLIST[0]) => void) => {
    onTrackChangeListener = listener;
    if (listener) {
      listener(PLAYLIST[0]);
    }
  },

  playMusic: async () => {
    isMusicPlaying = false;
    if (onTrackChangeListener) {
      onTrackChangeListener(PLAYLIST[0]);
    }
  },

  pauseMusic: async () => {
    isMusicPlaying = false;
  },

  loadAndPlayTrack: async (index: number) => {
    isMusicPlaying = false;
    if (onTrackChangeListener) {
      onTrackChangeListener(PLAYLIST[0]);
    }
  },

  nextTrack: async () => {},

  previousTrack: async () => {},

  stopMusic: async () => {
    isMusicPlaying = false;
  }
};
