import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Modal, StatusBar, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SoundManager } from '../sound';

const { width } = Dimensions.get('window');

interface MenuScreenProps {
  onStartGameMode: (mode: 'quick' | 'arcade' | 'worldcup') => void;
  onContinueArcade: () => void;
  onViewStats: () => void;
  onViewHistory: () => void;
  hasSavedProgress: boolean;
  savedProgressInfo: string;
  onDeleteSavedProgress: () => Promise<void>;
}

export default function MenuScreen({
  onStartGameMode,
  onContinueArcade,
  onViewStats,
  onViewHistory,
  hasSavedProgress,
  savedProgressInfo,
  onDeleteSavedProgress,
}: MenuScreenProps) {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [showResetConfirmModal, setShowResetConfirmModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<{ title: string; artist: string } | null>(null);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  useEffect(() => {
    SoundManager.init().then(() => {
      setSoundEnabled(SoundManager.getSoundEnabled());

      // Registra listener de faixa tocando
      SoundManager.setOnTrackChange((track) => {
        setCurrentTrack(track);
        setIsPlayingMusic(SoundManager.isMusicPlaying());
      });

      // Inicializa a faixa atual e estado
      setCurrentTrack(SoundManager.getCurrentTrack());
      setIsPlayingMusic(SoundManager.isMusicPlaying());

      // Inicia música automaticamente se o áudio estiver ativado e a música desligada
      if (SoundManager.getSoundEnabled() && !SoundManager.isMusicPlaying()) {
        SoundManager.playMusic().then(() => {
          setIsPlayingMusic(SoundManager.isMusicPlaying());
        }).catch(() => {});
      }
    });
  }, []);

  const handlePressReset = () => {
    SoundManager.playClick();
    setShowResetConfirmModal(true);
  };

  const handleConfirmReset = async () => {
    SoundManager.playWhistle();
    await onDeleteSavedProgress();
    setShowResetConfirmModal(false);
  };

  const handleTogglePlayMusic = () => {
    SoundManager.playClick();
    if (isPlayingMusic) {
      SoundManager.pauseMusic();
      setIsPlayingMusic(false);
    } else {
      SoundManager.playMusic();
      setIsPlayingMusic(true);
    }
  };

  const handleNextTrack = () => {
    SoundManager.playClick();
    SoundManager.nextTrack().then(() => {
      setCurrentTrack(SoundManager.getCurrentTrack());
      setIsPlayingMusic(true);
    });
  };

  const handlePrevTrack = () => {
    SoundManager.playClick();
    SoundManager.previousTrack().then(() => {
      setCurrentTrack(SoundManager.getCurrentTrack());
      setIsPlayingMusic(true);
    });
  };

  const handleToggleSound = async () => {
    const enabled = await SoundManager.toggleSound();
    setSoundEnabled(enabled);
    SoundManager.playClick();
  };

  const handlePressMode = (mode: 'quick' | 'arcade' | 'worldcup') => {
    SoundManager.playClick();
    onStartGameMode(mode);
  };

  return (
    <LinearGradient
      colors={['#04050d', '#0b0c16', '#020308']}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor="#04050d" />

      {/* Ambient background glows */}
      <View style={styles.glowTopLeft} />
      <View style={styles.glowBottomRight} />
      <View style={styles.glowCenterGreen} />

      {/* Background Stadium Grid & Kickoff Circle */}
      <View style={styles.bgPitchOverlay}>
        <View style={styles.bgCenterLine} />
        <View style={styles.bgCenterCircle} />
        <View style={styles.bgCenterSpot} />
      </View>

      {/* Top Bar with Settings & Info */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.iconButton} onPress={() => { SoundManager.playClick(); setShowSettingsModal(true); }} activeOpacity={0.7}>
          <Text style={styles.iconText}>⚙️</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton} onPress={() => { SoundManager.playClick(); setShowRulesModal(true); }} activeOpacity={0.7}>
          <Text style={styles.iconText}>📖</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Logo and Brand Section */}
        <View style={styles.brandContainer}>
          <Text style={styles.brandSubtitle}>SIMULADOR DE FUTEBOL EM ARENA</Text>
          <View style={styles.logoRow}>
            <Text style={styles.brandTitle}>FUT<Text style={styles.goldText}>ARENA</Text></Text>
          </View>
          <View style={styles.logoGlowUnderline} />
          
          <View style={styles.badgeSuffix}>
            <LinearGradient
              colors={['#FFD700', '#FFA000']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.badgeGradient}
            >
              <Text style={styles.badgeText}>🔥 ULTIMATE EDITION 2026</Text>
            </LinearGradient>
          </View>
        </View>

        {/* Buttons List */}
        <View style={styles.buttonContainer}>
          {hasSavedProgress && (
            <View style={styles.continueRow}>
              <TouchableOpacity style={styles.continueButton} onPress={onContinueArcade} activeOpacity={0.85}>
                <LinearGradient
                  colors={['#FFD700', '#FFA000']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.gradientButton}
                >
                  <View style={styles.continueContent}>
                    <Text style={styles.continueButtonText}>🏆 CONTINUAR CAMPEONATO</Text>
                    <Text style={styles.continueInfoText}>{savedProgressInfo}</Text>
                  </View>
                  <Text style={styles.arrowRightBlack}>➔</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity style={styles.resetButton} onPress={handlePressReset} activeOpacity={0.8}>
                <LinearGradient
                  colors={['#FF3B30', '#8B0000']}
                  style={styles.resetButtonGradient}
                >
                  <Text style={styles.resetIconText}>🗑️</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}

          {/* MODE: QUICK MATCH */}
          <TouchableOpacity style={styles.modeButton} onPress={() => handlePressMode('quick')} activeOpacity={0.8}>
            <LinearGradient
              colors={['rgba(0, 229, 255, 0.08)', 'rgba(22, 28, 54, 0.45)']}
              style={[styles.gradientButtonBorder, styles.borderCyan]}
            >
              <View style={styles.modeInfo}>
                <View style={styles.modeTitleRow}>
                  <Text style={styles.modeButtonText}>🎮 PARTIDA RÁPIDA</Text>
                  <View style={[styles.pillBadge, { backgroundColor: 'rgba(0, 229, 255, 0.15)' }]}>
                    <Text style={[styles.pillBadgeText, { color: '#00E5FF' }]}>AMISTOSO</Text>
                  </View>
                </View>
                <Text style={styles.modeDescText}>Duelo rápido de 1 contra 1. Escolha qualquer clube, ajuste a dificuldade e entre em campo instantaneamente!</Text>
              </View>
              <Text style={styles.arrowRightGold}>➔</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* MODE: CHAMPIONSHIP */}
          <TouchableOpacity style={styles.modeButton} onPress={() => handlePressMode('arcade')} activeOpacity={0.8}>
            <LinearGradient
              colors={['rgba(255, 215, 0, 0.08)', 'rgba(22, 28, 54, 0.45)']}
              style={[styles.gradientButtonBorder, styles.borderGold]}
            >
              <View style={styles.modeInfo}>
                <View style={styles.modeTitleRow}>
                  <Text style={styles.modeButtonText}>🏆 MODO CAMPEONATO</Text>
                  <View style={[styles.pillBadge, { backgroundColor: 'rgba(255, 215, 0, 0.15)' }]}>
                    <Text style={[styles.pillBadgeText, { color: '#FFD700' }]}>CARREIRA</Text>
                  </View>
                </View>
                <Text style={styles.modeDescText}>Gerencie seu clube, dispute pontos corridos, conquiste moedas e faça upgrades táticos de OVR para ser o grande campeão!</Text>
              </View>
              <Text style={styles.arrowRightGold}>➔</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* MODE: WORLD CUP */}
          <TouchableOpacity style={styles.modeButton} onPress={() => handlePressMode('worldcup')} activeOpacity={0.8}>
            <LinearGradient
              colors={['rgba(0, 255, 102, 0.08)', 'rgba(22, 28, 54, 0.45)']}
              style={[styles.gradientButtonBorder, styles.borderGreen]}
            >
              <View style={styles.modeInfo}>
                <View style={styles.modeTitleRow}>
                  <Text style={styles.modeButtonText}>🌍 COPA DO MUNDO</Text>
                  <View style={[styles.pillBadge, { backgroundColor: 'rgba(0, 255, 102, 0.15)' }]}>
                    <Text style={[styles.pillBadgeText, { color: '#00FF66' }]}>MUNDIAL</Text>
                  </View>
                </View>
                <Text style={styles.modeDescText}>Assuma o comando de uma seleção nacional e passe pelas fases de grupos e mata-mata em busca da glória mundial definitiva!</Text>
              </View>
              <Text style={styles.arrowRightGold}>➔</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Secondary controls */}
        <View style={styles.statsContainer}>
          <TouchableOpacity style={styles.statsButton} onPress={onViewStats} activeOpacity={0.7}>
            <Text style={styles.statsButtonText}>📊 Estatísticas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.statsButton} onPress={onViewHistory} activeOpacity={0.7}>
            <Text style={styles.statsButtonText}>🕒 Histórico</Text>
          </TouchableOpacity>
        </View>

        {/* FutArena Jukebox / Soundtrack Player */}
        <View style={styles.jukeboxContainer}>
          <LinearGradient
            colors={['rgba(255, 215, 0, 0.05)', 'rgba(11, 12, 22, 0.95)', 'rgba(0, 229, 255, 0.02)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.jukeboxCard}
          >
            <View style={styles.jukeboxHeader}>
              <Text style={styles.jukeboxTitle}>🎵 FUTARENA JUKEBOX</Text>
              <Text style={styles.jukeboxSubtitle}>TRILHA SONORA OFICIAL</Text>
            </View>

            <View style={styles.jukeboxTrackRow}>
              {/* Album Art / Vinyl Disc Wrapper */}
              <View style={[styles.vinylContainer, isPlayingMusic && { borderColor: '#00E5FF', shadowColor: '#00E5FF' }]}>
                <Text style={styles.vinylDisk}>💿</Text>
              </View>

              <View style={styles.trackInfo}>
                <Text style={styles.trackTitleText} numberOfLines={1}>
                  {currentTrack ? currentTrack.title : 'Nenhuma faixa'}
                </Text>
                <Text style={styles.trackArtistText} numberOfLines={1}>
                  {currentTrack ? currentTrack.artist : 'Selecione para tocar'}
                </Text>
              </View>

              <View style={styles.jukeboxControls}>
                <TouchableOpacity style={styles.controlBtn} onPress={handlePrevTrack} activeOpacity={0.7}>
                  <Text style={styles.controlBtnText}>«</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.controlBtn, styles.playPauseBtn]} onPress={handleTogglePlayMusic} activeOpacity={0.7}>
                  <Text style={[styles.controlBtnText, styles.playPauseBtnText]}>
                    {isPlayingMusic ? '❚❚' : '▶'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.controlBtn} onPress={handleNextTrack} activeOpacity={0.7}>
                  <Text style={styles.controlBtnText}>»</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Visualizador de Ondas de Áudio Neon */}
            <View style={styles.waveContainer}>
              {[8, 12, 6, 14, 10, 4, 12, 8, 14, 6, 10, 8, 12, 4, 14, 8, 10, 6, 12, 8, 10, 6, 14, 8, 12, 4, 10].map((h, i) => (
                <View
                  key={i}
                  style={[
                    styles.waveBar,
                    { height: isPlayingMusic ? h + (i % 2 === 0 ? 2 : -2) : 3 },
                    isPlayingMusic && (i % 3 === 0 || i % 5 === 0) && styles.waveBarActive
                  ]}
                />
              ))}
            </View>
          </LinearGradient>
        </View>
      </ScrollView>

      {/* Audio Settings Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showSettingsModal}
        onRequestClose={() => setShowSettingsModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.settingsModalCard}>
            <LinearGradient
              colors={['#101426', '#05070F']}
              style={styles.settingsModalGradient}
            >
              {/* Modal Header */}
              <View style={styles.settingsHeader}>
                <Text style={styles.settingsTitle}>⚙️ CONFIGURAÇÕES DE ÁUDIO</Text>
                <Text style={styles.settingsSubtitle}>FUTARENA ULTIMATE EDITION</Text>
              </View>

              {/* Setting Option: Game SFX */}
              <View style={styles.settingRow}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>Efeitos Sonoros (SFX)</Text>
                  <Text style={styles.settingDesc}>Apito do juiz, colisões de escudos e sons da torcida.</Text>
                </View>
                <TouchableOpacity
                  style={[
                    styles.toggleSwitchContainer,
                    soundEnabled ? styles.toggleSwitchOn : styles.toggleSwitchOff
                  ]}
                  onPress={handleToggleSound}
                  activeOpacity={0.8}
                >
                  <View
                    style={[
                      styles.toggleSwitchPin,
                      soundEnabled ? styles.toggleSwitchPinOn : styles.toggleSwitchPinOff
                    ]}
                  />
                </TouchableOpacity>
              </View>

              {/* Setting Option: Background Music */}
              <View style={styles.settingRow}>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>Música de Fundo (Soundtrack)</Text>
                  <Text style={styles.settingDesc}>Trilha sonora do Jukebox nas telas de menu.</Text>
                </View>
                <TouchableOpacity
                  style={[
                    styles.toggleSwitchContainer,
                    isPlayingMusic ? styles.toggleSwitchOn : styles.toggleSwitchOff
                  ]}
                  onPress={handleTogglePlayMusic}
                  activeOpacity={0.8}
                >
                  <View
                    style={[
                      styles.toggleSwitchPin,
                      isPlayingMusic ? styles.toggleSwitchPinOn : styles.toggleSwitchPinOff
                    ]}
                  />
                </TouchableOpacity>
              </View>

              {/* Divider */}
              <View style={styles.settingsDivider} />

              {/* Credits & App version */}
              <View style={styles.creditsBox}>
                <Text style={styles.creditsText}>Versão 2026.1 - Estilo Retro Arcade</Text>
                <Text style={styles.creditsSubtext}>Desenvolvido com Expo & React Native</Text>
              </View>

              {/* Close Button */}
              <TouchableOpacity
                style={styles.closeModalButton}
                onPress={() => { SoundManager.playClick(); setShowSettingsModal(false); }}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#FFD700', '#FFA000']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.closeModalGradient}
                >
                  <Text style={styles.closeModalText}>SALVAR E FECHAR</Text>
                </LinearGradient>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </Modal>

      {/* Rules / Guide Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showRulesModal}
        onRequestClose={() => setShowRulesModal(false)}
      >
        <View style={styles.modalOverlay}>
          <LinearGradient
            colors={['#0F1326', '#060814']}
            style={styles.modalContent}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>📖 TÁTICA & REGRAS DO JOGO</Text>
              <View style={styles.modalHeaderLine} />
            </View>

            <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={false}>
              <View style={styles.ruleSection}>
                <Text style={styles.ruleTitle}>⚽ Arena Circular de Alta Energia</Text>
                <Text style={styles.ruleText}>
                  A partida acontece em um gramado circular eletrizante! Os escudos colidem de forma ultra elástica, ganhando velocidade a cada rebote na trave ou nas tabelas da arena.
                </Text>
              </View>

              <View style={styles.ruleSection}>
                <Text style={styles.ruleTitle}>🔄 O Gol Giratório Tático</Text>
                <Text style={styles.ruleText}>
                  A linha de fundo e as traves giram continuamente ao redor da arena! Marcar exige o timing ideal: espere o gol se aproximar e direcione o escudo com precisão cirúrgica.
                </Text>
              </View>

              <View style={styles.ruleSection}>
                <Text style={styles.ruleTitle}>💪 Força do Overall (OVR)</Text>
                <Text style={styles.ruleText}>
                  O nível de habilidade (OVR) do seu time aplica forças de empuxo inteligentes que auxiliam a direcionar a bola para o fundo da rede. Mas cuidado: a física caótica garante zebras espetaculares!
                </Text>
              </View>

              <View style={styles.ruleSection}>
                <Text style={styles.ruleTitle}>🪙 Upgrades e Carreira</Text>
                <Text style={styles.ruleText}>
                  Dispute partidas no Modo Campeonato para encher o cofre de moedas. Invista em melhorias de OVR na tela de gerenciamento para enfrentar os clubes gigantes da Série A!
                </Text>
              </View>
            </ScrollView>

            <TouchableOpacity
              style={styles.closeModalButton}
              activeOpacity={0.8}
              onPress={() => { SoundManager.playClick(); setShowRulesModal(false); }}
            >
              <LinearGradient
                colors={['#FFD700', '#FFA000']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.closeModalGradient}
              >
                <Text style={styles.closeModalText}>ENTENDIDO, PROFESSOR!</Text>
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </Modal>

      {/* Modal de Confirmação de Reset de Campeonato de Alto Risco */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showResetConfirmModal}
        onRequestClose={() => setShowResetConfirmModal(false)}
      >
        <View style={styles.modalOverlay}>
          <LinearGradient
            colors={['#1F0F12', '#0A0304']}
            style={[styles.modalContent, { borderColor: 'rgba(255, 59, 48, 0.3)' }]}
          >
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: '#FF3B30' }]}>⚠️ ZERAR CAMPEONATO?</Text>
              <View style={[styles.modalHeaderLine, { backgroundColor: '#FF3B30' }]} />
            </View>

            <Text style={styles.resetModalDesc}>
              Esta ação é IRREVERSÍVEL! Todo o seu progresso da liga atual, moedas acumuladas e evoluções de OVR no Laboratório Tático serão deletados definitivamente.
            </Text>

            <View style={styles.resetModalBtnRow}>
              <TouchableOpacity
                style={styles.resetCancelBtn}
                onPress={() => { SoundManager.playClick(); setShowResetConfirmModal(false); }}
                activeOpacity={0.8}
              >
                <Text style={styles.resetCancelBtnText}>CANCELAR</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.resetConfirmBtn}
                onPress={handleConfirmReset}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#FF3B30', '#C00000']}
                  style={styles.resetConfirmBtnGradient}
                >
                  <Text style={styles.resetConfirmBtnText}>APAGAR TUDO 🗑️</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  glowTopLeft: {
    position: 'absolute',
    top: -100,
    left: -100,
    width: 350,
    height: 350,
    borderRadius: 175,
    backgroundColor: 'rgba(0, 229, 255, 0.12)',
  },
  glowBottomRight: {
    position: 'absolute',
    bottom: -150,
    right: -100,
    width: 350,
    height: 350,
    borderRadius: 175,
    backgroundColor: 'rgba(255, 215, 0, 0.08)',
  },
  glowCenterGreen: {
    position: 'absolute',
    top: '40%',
    alignSelf: 'center',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(0, 255, 102, 0.05)',
  },
  bgPitchOverlay: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    height: 320,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.08,
    zIndex: 0,
  },
  bgCenterLine: {
    position: 'absolute',
    width: '100%',
    height: 2,
    backgroundColor: '#00FF66',
  },
  bgCenterCircle: {
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 2,
    borderColor: '#00FF66',
    backgroundColor: 'transparent',
  },
  bgCenterSpot: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#00FF66',
    shadowColor: '#00FF66',
    shadowOpacity: 0.8,
    shadowRadius: 7,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 40,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 54,
    paddingBottom: 10,
    zIndex: 10,
  },
  iconButton: {
    backgroundColor: 'rgba(22, 28, 54, 0.55)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 16,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  iconText: {
    fontSize: 20,
  },
  brandContainer: {
    alignItems: 'center',
    marginBottom: 38,
    zIndex: 2,
  },
  brandSubtitle: {
    color: '#00E5FF',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 4.5,
    marginBottom: 8,
    opacity: 0.9,
    textShadowColor: 'rgba(0, 229, 255, 0.4)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandTitle: {
    color: '#FFFFFF',
    fontSize: 54,
    fontWeight: '900',
    letterSpacing: 3,
    textShadowColor: 'rgba(255, 255, 255, 0.1)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 10,
  },
  goldText: {
    color: '#FFD700',
    textShadowColor: 'rgba(255, 215, 0, 0.3)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 12,
  },
  logoGlowUnderline: {
    width: 140,
    height: 3,
    backgroundColor: '#FFD700',
    borderRadius: 2,
    marginTop: -2,
    shadowColor: '#FFD700',
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 6,
  },
  badgeSuffix: {
    borderRadius: 22,
    marginTop: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  badgeGradient: {
    paddingVertical: 6,
    paddingHorizontal: 18,
  },
  badgeText: {
    color: '#000000',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 2,
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
    marginBottom: 36,
    zIndex: 2,
  },
  continueButton: {
    flex: 1,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#FFD700',
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 15,
    elevation: 8,
  },
  gradientButton: {
    paddingVertical: 22,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  continueContent: {
    flex: 1,
  },
  continueButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1,
  },
  continueInfoText: {
    color: 'rgba(0, 0, 0, 0.8)',
    fontSize: 12,
    fontWeight: '800',
    marginTop: 4,
  },
  arrowRightBlack: {
    color: '#000000',
    fontSize: 20,
    fontWeight: '900',
    marginLeft: 12,
  },
  modeButton: {
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: 'rgba(22, 28, 54, 0.25)',
  },
  borderCyan: {
    borderWidth: 1.5,
    borderColor: 'rgba(0, 229, 255, 0.15)',
  },
  borderGold: {
    borderWidth: 1.5,
    borderColor: 'rgba(255, 215, 0, 0.15)',
  },
  borderGreen: {
    borderWidth: 1.5,
    borderColor: 'rgba(0, 255, 102, 0.15)',
  },
  gradientButtonBorder: {
    paddingVertical: 20,
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modeInfo: {
    flex: 1,
    marginRight: 10,
  },
  modeTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  modeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  pillBadge: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  pillBadgeText: {
    fontSize: 8.5,
    fontWeight: '900',
    letterSpacing: 1,
  },
  modeDescText: {
    color: '#A2A8C4',
    fontSize: 11.5,
    marginTop: 8,
    lineHeight: 16,
  },
  arrowRightGold: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: '900',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    zIndex: 2,
  },
  statsButton: {
    flex: 1,
    paddingVertical: 16,
    backgroundColor: 'rgba(22, 28, 54, 0.45)',
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  statsButtonText: {
    color: '#E2E8F0',
    fontSize: 14,
    fontWeight: '800',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(2, 3, 8, 0.93)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    width: '100%',
    maxHeight: '85%',
    borderWidth: 1.8,
    borderColor: 'rgba(255, 215, 0, 0.25)',
    borderRadius: 32,
    padding: 24,
    shadowColor: '#FFD700',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 22,
  },
  modalTitle: {
    color: '#FFD700',
    fontSize: 19,
    fontWeight: '900',
    letterSpacing: 1.5,
    textAlign: 'center',
  },
  modalHeaderLine: {
    width: 60,
    height: 3,
    backgroundColor: '#FFD700',
    borderRadius: 1.5,
    marginTop: 8,
  },
  modalScroll: {
    flexGrow: 0,
    marginBottom: 24,
  },
  ruleSection: {
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.04)',
  },
  ruleTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
    marginBottom: 6,
  },
  ruleText: {
    color: '#B0B7D6',
    fontSize: 12.5,
    lineHeight: 19,
  },
  closeModalButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  closeModalGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  closeModalText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 2,
  },
  continueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: 12,
  },
  resetButton: {
    width: 62,
    height: 76,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 59, 48, 0.4)',
    shadowColor: '#FF3B30',
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 15,
    elevation: 8,
  },
  resetButtonGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetIconText: {
    fontSize: 22,
  },
  resetModalDesc: {
    color: '#D2D9E5',
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 18,
  },
  resetModalBtnRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
    marginTop: 10,
  },
  resetCancelBtn: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 14,
  },
  resetCancelBtnText: {
    color: '#A2A8C4',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
  },
  resetConfirmBtn: {
    flex: 1,
    borderRadius: 14,
    overflow: 'hidden',
  },
  resetConfirmBtnGradient: {
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetConfirmBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1,
  },
  jukeboxContainer: {
    width: '100%',
    marginTop: 26,
    marginBottom: 8,
    zIndex: 5,
  },
  jukeboxCard: {
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 215, 0, 0.22)',
    padding: 18,
    shadowColor: '#FFD700',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 20,
    elevation: 8,
  },
  jukeboxHeader: {
    marginBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
    paddingBottom: 8,
  },
  jukeboxTitle: {
    color: '#FFD700',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 2.5,
  },
  jukeboxSubtitle: {
    color: '#A2A8C4',
    fontSize: 8.5,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginTop: 3,
  },
  jukeboxTrackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  vinylContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#0A0C16',
    borderWidth: 2,
    borderColor: '#FFD700',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FFD700',
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 4,
  },
  vinylDisk: {
    fontSize: 24,
  },
  trackInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  trackTitleText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    textShadowColor: 'rgba(255, 255, 255, 0.15)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  trackArtistText: {
    color: '#00E5FF',
    fontSize: 10.5,
    fontWeight: '800',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginTop: 3,
    textShadowColor: 'rgba(0, 229, 255, 0.25)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  jukeboxControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  controlBtn: {
    backgroundColor: 'rgba(22, 28, 54, 0.65)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 14,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlBtnText: {
    color: '#FFD700',
    fontSize: 15,
    fontWeight: '800',
  },
  playPauseBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFD700',
    borderColor: '#FFFFFF',
    borderWidth: 2,
    shadowColor: '#FFD700',
    shadowOpacity: 0.6,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },
  playPauseBtnText: {
    color: '#05070f',
    fontSize: 16,
    fontWeight: '900',
  },
  waveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
    height: 14,
    paddingHorizontal: 4,
  },
  waveBar: {
    width: 3,
    backgroundColor: 'rgba(0, 229, 255, 0.25)',
    borderRadius: 1.5,
  },
  waveBarActive: {
    backgroundColor: '#FFD700',
    shadowColor: '#FFD700',
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  settingsModalCard: {
    width: '88%',
    borderRadius: 28,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 215, 0, 0.25)',
    shadowColor: '#FFD700',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 25,
    elevation: 10,
  },
  settingsModalGradient: {
    padding: 24,
  },
  settingsHeader: {
    alignItems: 'center',
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
    paddingBottom: 14,
  },
  settingsTitle: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 2,
  },
  settingsSubtitle: {
    color: '#A2A8C4',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginTop: 4,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.04)',
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingLabel: {
    color: '#FFFFFF',
    fontSize: 13.5,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  settingDesc: {
    color: '#8A91B4',
    fontSize: 10,
    marginTop: 4,
    lineHeight: 14,
  },
  toggleSwitchContainer: {
    width: 48,
    height: 26,
    borderRadius: 13,
    padding: 3,
    justifyContent: 'center',
  },
  toggleSwitchOn: {
    backgroundColor: '#00E5FF',
    shadowColor: '#00E5FF',
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  toggleSwitchOff: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  toggleSwitchPin: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleSwitchPinOn: {
    alignSelf: 'flex-end',
  },
  toggleSwitchPinOff: {
    alignSelf: 'flex-start',
  },
  settingsDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    marginVertical: 18,
  },
  creditsBox: {
    alignItems: 'center',
    marginBottom: 20,
  },
  creditsText: {
    color: '#FFD700',
    fontSize: 10.5,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  creditsSubtext: {
    color: '#6A7194',
    fontSize: 9,
    marginTop: 2,
  },
});
