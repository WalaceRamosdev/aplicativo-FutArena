import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, FlatList, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Team, Standings, RoundMatch } from '../types';
import { TeamShield } from './SelectionScreen';
import { findTeamById, getLeagueName } from '../teams';
import { SoundManager } from '../sound';

interface ArcadeDashboardScreenProps {
  userTeam: Team;
  currentRound: number;
  totalRounds: number;
  currentLeague: string;
  standings: Standings;
  schedule: RoundMatch[][];
  coins: number;
  overallBoosts: number;
  onBack: () => void;
  onPlayMatch: () => void;
  onAutoSimulateRound: () => void;
  onUpgradeTeam: () => void;
}

export default function ArcadeDashboardScreen({
  userTeam,
  currentRound,
  totalRounds,
  currentLeague,
  standings,
  schedule,
  coins,
  overallBoosts,
  onBack,
  onPlayMatch,
  onAutoSimulateRound,
  onUpgradeTeam,
}: ArcadeDashboardScreenProps) {
  const [activeTab, setActiveTab] = useState<'next' | 'standings'>('next');

  const upgradeCost = 100 + overallBoosts * 50;
  const currentOvr = Math.min(99, userTeam.overall + overallBoosts);

  // Encontra os jogos da rodada atual
  const roundMatches = schedule[currentRound] || [];

  // Encontra a partida do usuário
  const userMatch = roundMatches.find(
    m => m.home === userTeam.id || m.away === userTeam.id
  );

  const opponentId = userMatch
    ? userMatch.home === userTeam.id
      ? userMatch.away
      : userMatch.home
    : '';
  const opponent = findTeamById(opponentId);

  // Mapeia e ordena classificação
  const sortedStandings = Object.entries(standings)
    .map(([id, stats]) => {
      const team = findTeamById(id);
      return {
        id,
        name: team ? team.name : 'Sem nome',
        shortName: team ? team.shortName : '???',
        badge: team ? team.badge : '',
        primaryColor: team ? team.primaryColor : '#000000',
        secondaryColor: team ? team.secondaryColor : '#FFFFFF',
        overall: team ? team.overall : 75,
        ...stats,
      };
    })
    .sort((a, b) => {
      if (b.p !== a.p) return b.p - a.p;
      if (b.sg !== a.sg) return b.sg - a.sg;
      return b.gp - a.gp;
    });

  const userPosition = sortedStandings.findIndex(t => t.id === userTeam.id) + 1;

  const handlePressPlay = () => {
    SoundManager.playClick();
    onPlayMatch();
  };

  // Computa a dificuldade do confronto de forma dinâmica baseado na diferença de OVR
  const opponentOverall = opponent ? opponent.overall : 75;
  const ovrDiff = currentOvr - opponentOverall;
  let difficultyText = 'EQUILIBRADO ⚖️';
  let difficultyColor = '#FFD700';
  if (ovrDiff > 5) {
    difficultyText = 'FAVORITO 👍';
    difficultyColor = '#00FF66';
  } else if (ovrDiff < -5) {
    difficultyText = 'DESAFIO MÁXIMO 🔥';
    difficultyColor = '#FF007F';
  } else if (ovrDiff < 0) {
    difficultyText = 'JOGO DIFÍCIL ⚠️';
    difficultyColor = '#FF8A00';
  } else if (ovrDiff > 0) {
    difficultyText = 'LIGEIRO FAVORITISMO 📈';
    difficultyColor = '#00E5FF';
  }

  const handlePressSimulate = () => {
    SoundManager.playClick();
    onAutoSimulateRound();
  };

  const handlePressUpgrade = () => {
    SoundManager.playClick();
    onUpgradeTeam();
  };

  return (
    <LinearGradient
      colors={['#060814', '#020308']}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor="#060814" />

      {/* Dynamic Header Banner reflecting team secondary color */}
      <LinearGradient
        colors={[userTeam.primaryColor + '20', 'rgba(6, 8, 20, 0.95)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.headerBanner}
      >
        <View style={styles.topRow}>
          <TouchableOpacity style={styles.backButton} onPress={onBack} activeOpacity={0.7}>
            <Text style={styles.backText}>🚪 Sair</Text>
          </TouchableOpacity>
          <Text style={styles.leagueNameText}>🏆 {getLeagueName(currentLeague).toUpperCase()}</Text>
          <View style={styles.coinBadge}>
            <Text style={styles.coinIcon}>🪙</Text>
            <Text style={styles.coinCountText}>{coins}</Text>
          </View>
        </View>

        <View style={styles.profileRow}>
          <View style={[styles.shieldContainer, { shadowColor: userTeam.primaryColor }]}>
            <TeamShield team={userTeam} size="lg" />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileTeamName}>{userTeam.name}</Text>
            <View style={styles.profileSubRow}>
              <LinearGradient
                colors={['#FFD700', '#FFA000']}
                style={styles.ovrPill}
              >
                <Text style={styles.ovrText}>OVR {currentOvr}</Text>
              </LinearGradient>
              <Text style={styles.positionText}>Classificação: <Text style={styles.positionBold}>{userPosition}º lugar</Text></Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Upgrade Option Panel */}
      <View style={styles.upgradePanel}>
        <LinearGradient
          colors={['rgba(0, 229, 255, 0.05)', 'rgba(0, 229, 255, 0.01)']}
          style={StyleSheet.absoluteFillObject}
        />
        <View style={styles.upgradeDetails}>
          <View style={styles.upgradeHeaderRow}>
            <Text style={styles.upgradeTitle}>💻 LABORATÓRIO TÁTICO</Text>
            <View style={styles.upgradeLevelBadge}>
              <Text style={styles.upgradeLevelText}>NÍVEL {overallBoosts}</Text>
            </View>
          </View>
          <Text style={styles.upgradeSubtitle}>Melhore a precisão e aceleração física na arena (+1 OVR)</Text>
        </View>
        <TouchableOpacity
          style={[styles.upgradeBtn, (coins < upgradeCost || currentOvr >= 99) && styles.upgradeBtnDisabled]}
          disabled={coins < upgradeCost || currentOvr >= 99}
          onPress={handlePressUpgrade}
          activeOpacity={0.8}
        >
          {coins >= upgradeCost && currentOvr < 99 ? (
            <LinearGradient
              colors={['#FFD700', '#FFA000']}
              style={styles.upgradeBtnGradient}
            >
              <Text style={styles.upgradeBtnText}>EVOLUIR</Text>
              <Text style={styles.upgradeCostText}>🪙 {upgradeCost}</Text>
            </LinearGradient>
          ) : (
            <View style={styles.upgradeBtnDisabledContent}>
              <Text style={styles.upgradeBtnTextDisabled}>{currentOvr >= 99 ? 'MÁXIMO' : 'MELHORAR'}</Text>
              <Text style={styles.upgradeCostTextDisabled}>🪙 {upgradeCost}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsRow}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'next' && styles.tabActive]}
          onPress={() => { SoundManager.playClick(); setActiveTab('next'); }}
          activeOpacity={0.7}
        >
          <Text style={[styles.tabText, activeTab === 'next' && styles.tabTextActive]}>PRÓXIMA RODADA</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'standings' && styles.tabActive]}
          onPress={() => { SoundManager.playClick(); setActiveTab('standings'); }}
          activeOpacity={0.7}
        >
          <Text style={[styles.tabText, activeTab === 'standings' && styles.tabTextActive]}>CLASSIFICAÇÃO</Text>
        </TouchableOpacity>
      </View>

      {/* Tab Contents */}
      {activeTab === 'next' ? (
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Main matchup card */}
          {opponent && (
            <View style={styles.matchupCard}>
              <View style={styles.roundNumBadge}>
                <Text style={styles.roundNumText}>RODADA {currentRound + 1} DE {totalRounds}</Text>
              </View>

              <View style={styles.matchupRow}>
                <View style={styles.teamMatchupBox}>
                  <TeamShield team={userTeam} size="lg" />
                  <Text style={styles.teamMatchupName} numberOfLines={1}>{userTeam.shortName}</Text>
                  <Text style={styles.matchupOvrText}>OVR {currentOvr}</Text>
                </View>

                <View style={styles.vsSeparatorContainer}>
                  <View style={styles.vsLine} />
                  <LinearGradient
                    colors={['rgba(255, 215, 0, 0.15)', 'rgba(255, 215, 0, 0.02)']}
                    style={styles.vsHexagon}
                  >
                    <Text style={styles.matchupVs}>VS</Text>
                  </LinearGradient>
                  <View style={styles.vsLine} />
                </View>

                <View style={styles.teamMatchupBox}>
                  <TeamShield team={opponent} size="lg" />
                  <Text style={styles.teamMatchupName} numberOfLines={1}>{opponent.shortName}</Text>
                  <Text style={styles.matchupOvrText}>OVR {opponent.overall}</Text>
                </View>
              </View>

              {/* Dificuldade e Análise de Confronto de Alta Performance */}
              <View style={[styles.difficultyRow, { borderColor: difficultyColor + '25' }]}>
                <LinearGradient
                  colors={[difficultyColor + '08', 'transparent']}
                  style={StyleSheet.absoluteFillObject}
                />
                <Text style={styles.difficultyLabel}>ESTIMATIVA DE CONFRONTO:</Text>
                <Text style={[styles.difficultyVal, { color: difficultyColor }]}>{difficultyText}</Text>
              </View>

              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.playButton} onPress={handlePressPlay} activeOpacity={0.85}>
                  <LinearGradient
                    colors={['#FFD700', '#FFA000']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.playButtonGradient}
                  >
                    <Text style={styles.playButtonText}>ENTRAR EM CAMPO ⚽</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity style={styles.simulateButton} onPress={handlePressSimulate} activeOpacity={0.7}>
                  <Text style={styles.simulateButtonText}>⚡ SIMULAR RODADA RAPIDAMENTE</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Other matches list */}
          <Text style={styles.subTitle}>OUTROS CONFRONTOS DA RODADA</Text>
          <View style={styles.otherMatchesContainer}>
            {roundMatches
              .filter(m => m.home !== userTeam.id && m.away !== userTeam.id)
              .map((m, idx) => {
                const homeTeam = findTeamById(m.home);
                const awayTeam = findTeamById(m.away);
                if (!homeTeam || !awayTeam) return null;

                return (
                  <View key={idx} style={styles.otherMatchRow}>
                    <Text style={styles.otherTeamNameHome}>{homeTeam.name}</Text>
                    <TeamShield team={homeTeam} size="sm" />
                    {m.played ? (
                      <View style={styles.scoreBadge}>
                        <Text style={styles.otherMatchScore}>
                          {m.scoreHome} - {m.scoreAway}
                        </Text>
                      </View>
                    ) : (
                      <Text style={styles.otherMatchVs}>vs</Text>
                    )}
                    <TeamShield team={awayTeam} size="sm" />
                    <Text style={styles.otherTeamNameAway}>{awayTeam.name}</Text>
                  </View>
                );
              })}
          </View>
        </ScrollView>
      ) : (
        /* Standings Leaderboard Table */
        <View style={styles.standingsContainer}>
          {/* Zone Legend Row de Alto Impacto Competitivo */}
          <View style={styles.legendRow}>
            <View style={styles.legendItem}>
              <View style={[styles.legendIndicatorDot, { backgroundColor: '#00FF66' }]} />
              <Text style={styles.legendText}>G4 (Champions Cup)</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendIndicatorDot, { backgroundColor: '#FF3B30' }]} />
              <Text style={styles.legendText}>Z4 (Rebaixamento)</Text>
            </View>
          </View>

          <View style={styles.tableHeader}>
            <Text style={[styles.colHeader, styles.colPos]}>#</Text>
            <Text style={[styles.colHeader, styles.colTeam]}>EQUIPE</Text>
            <Text style={[styles.colHeader, styles.colPoints]}>P</Text>
            <Text style={[styles.colHeader, styles.colPlayed]}>J</Text>
            <Text style={[styles.colHeader, styles.colWins]}>V</Text>
            <Text style={[styles.colHeader, styles.colSg]}>SG</Text>
          </View>

          <FlatList
            data={sortedStandings}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => {
              const isUser = item.id === userTeam.id;
              const isG4 = index < 4;
              const isZ4 = index >= sortedStandings.length - 4;

              return (
                <View style={[styles.tableRow, isUser && styles.tableRowUser]}>
                  {/* Indicator Color line representing tournament promo zones */}
                  <View
                    style={[
                      styles.indicatorBar,
                      isG4 && styles.indicatorG4,
                      isZ4 && styles.indicatorZ4,
                      isUser && styles.indicatorUser,
                    ]}
                  />

                  <Text style={[styles.colText, styles.colPos, isUser && styles.textBold, isG4 && !isUser && styles.textG4, isZ4 && !isUser && styles.textZ4]}>
                    {index + 1}
                  </Text>
                  <View style={[styles.colTeamLayout, styles.colTeam]}>
                    <TeamShield team={item as any} size="sm" />
                    <Text style={[styles.teamNameTextTable, isUser && styles.textBold, isUser && styles.textGold]} numberOfLines={1}>
                      {item.name}
                    </Text>
                  </View>
                  <Text style={[styles.colText, styles.colPoints, styles.textBold, isUser && styles.textGold]}>
                    {item.p}
                  </Text>
                  <Text style={[styles.colText, styles.colPlayed, isUser && styles.textBold]}>{item.j}</Text>
                  <Text style={[styles.colText, styles.colWins, isUser && styles.textBold]}>{item.v}</Text>
                  <Text style={[styles.colText, styles.colSg, isUser && styles.textBold, item.sg > 0 && styles.textPositiveSG, item.sg < 0 && styles.textNegativeSG]}>
                    {item.sg > 0 ? `+${item.sg}` : item.sg}
                  </Text>
                </View>
              );
            }}
          />
        </View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBanner: {
    paddingHorizontal: 20,
    paddingTop: 54,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 22,
  },
  backButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(22, 28, 54, 0.6)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  backText: {
    color: '#D2D9E5',
    fontSize: 12,
    fontWeight: '700',
  },
  leagueNameText: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 2,
    textShadowColor: 'rgba(255, 215, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  coinBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(22, 28, 54, 0.6)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#FFD700',
  },
  coinIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  coinCountText: {
    color: '#FFD700',
    fontSize: 13,
    fontWeight: '900',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shieldContainer: {
    borderRadius: 40,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  profileInfo: {
    marginLeft: 16,
    flex: 1,
  },
  profileTeamName: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
  },
  profileSubRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 12,
  },
  ovrPill: {
    borderRadius: 8,
    paddingVertical: 3,
    paddingHorizontal: 10,
  },
  ovrText: {
    color: '#000000',
    fontSize: 10,
    fontWeight: '900',
  },
  positionText: {
    color: '#A2A8C4',
    fontSize: 12,
    fontWeight: '600',
  },
  positionBold: {
    color: '#00E5FF',
    fontWeight: '800',
  },
  upgradePanel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(22, 28, 54, 0.45)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    marginHorizontal: 16,
    marginVertical: 14,
    borderRadius: 20,
    padding: 14,
  },
  upgradeDetails: {
    flex: 1,
    marginRight: 12,
  },
  upgradeTitle: {
    color: '#00E5FF',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1,
  },
  upgradeSubtitle: {
    color: '#A2A8C4',
    fontSize: 10,
    marginTop: 4,
    lineHeight: 14,
  },
  upgradeBtn: {
    borderRadius: 12,
    overflow: 'hidden',
    minWidth: 95,
  },
  upgradeBtnGradient: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  upgradeBtnDisabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  upgradeBtnDisabledContent: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  upgradeBtnText: {
    color: '#000000',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  upgradeBtnTextDisabled: {
    color: '#555A70',
    fontSize: 10,
    fontWeight: '900',
  },
  upgradeCostText: {
    color: '#000000',
    fontSize: 10,
    fontWeight: '900',
    marginTop: 2,
  },
  upgradeCostTextDisabled: {
    color: '#555A70',
    fontSize: 10,
    fontWeight: '900',
    marginTop: 2,
  },
  tabsRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
  },
  tabActive: {
    borderBottomWidth: 2.5,
    borderColor: '#FFD700',
  },
  tabText: {
    color: '#8E9AA8',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1,
  },
  tabTextActive: {
    color: '#FFD700',
  },
  scrollContent: {
    padding: 16,
  },
  matchupCard: {
    backgroundColor: 'rgba(22, 28, 54, 0.45)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 24,
    padding: 18,
    alignItems: 'center',
    marginBottom: 24,
  },
  roundNumBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    paddingVertical: 4,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.04)',
    marginBottom: 20,
  },
  roundNumText: {
    color: '#D2D9E5',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  matchupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 26,
  },
  teamMatchupBox: {
    alignItems: 'center',
    width: 90,
  },
  teamMatchupName: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
    marginTop: 8,
    textAlign: 'center',
  },
  matchupOvrText: {
    color: '#FFD700',
    fontSize: 11,
    fontWeight: '800',
    marginTop: 4,
  },
  vsSeparatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  vsLine: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    flex: 1,
    marginHorizontal: 12,
  },
  matchupVs: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: '900',
    textShadowColor: 'rgba(255, 215, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  actionButtons: {
    width: '100%',
    gap: 12,
  },
  playButton: {
    borderRadius: 14,
    overflow: 'hidden',
  },
  playButtonGradient: {
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButtonText: {
    color: '#000000',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  simulateButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  simulateButtonText: {
    color: '#D2D9E5',
    fontSize: 12,
    fontWeight: '800',
  },
  subTitle: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1.5,
    marginBottom: 12,
    marginLeft: 4,
  },
  otherMatchesContainer: {
    backgroundColor: 'rgba(22, 28, 54, 0.35)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    padding: 14,
    gap: 12,
    marginBottom: 20,
  },
  otherMatchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  otherTeamNameHome: {
    flex: 1,
    color: '#D2D9E5',
    fontSize: 12,
    fontWeight: '800',
    textAlign: 'right',
    marginRight: 12,
  },
  otherTeamNameAway: {
    flex: 1,
    color: '#D2D9E5',
    fontSize: 12,
    fontWeight: '800',
    textAlign: 'left',
    marginLeft: 12,
  },
  scoreBadge: {
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    borderRadius: 8,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.2)',
  },
  otherMatchScore: {
    color: '#FFD700',
    fontSize: 12,
    fontWeight: '900',
    width: 44,
    textAlign: 'center',
  },
  otherMatchVs: {
    color: '#555A70',
    fontSize: 12,
    width: 44,
    textAlign: 'center',
    fontWeight: '600',
  },
  standingsContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  colHeader: {
    color: '#8E9AA8',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.04)',
    position: 'relative',
  },
  tableRowUser: {
    backgroundColor: 'rgba(255, 215, 0, 0.03)',
  },
  indicatorBar: {
    position: 'absolute',
    left: -16,
    width: 3.5,
    height: '100%',
  },
  indicatorG4: {
    backgroundColor: '#00FF66',
  },
  indicatorZ4: {
    backgroundColor: '#FF3B30',
  },
  indicatorUser: {
    backgroundColor: '#FFD700',
  },
  colPos: {
    width: 30,
    textAlign: 'center',
  },
  colTeam: {
    flex: 1,
  },
  colTeamLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  teamNameTextTable: {
    color: '#D2D9E5',
    fontSize: 13,
    fontWeight: '700',
  },
  colPoints: {
    width: 36,
    textAlign: 'center',
  },
  colPlayed: {
    width: 32,
    textAlign: 'center',
  },
  colWins: {
    width: 32,
    textAlign: 'center',
  },
  colSg: {
    width: 40,
    textAlign: 'center',
  },
  colText: {
    color: '#A2A8C4',
    fontSize: 12,
  },
  textBold: {
    fontWeight: '900',
    color: '#FFFFFF',
  },
  textGold: {
    color: '#FFD700',
  },
  textG4: {
    color: '#00FF66',
    fontWeight: 'bold',
  },
  textZ4: {
    color: '#FF3B30',
    fontWeight: 'bold',
  },
  textPositiveSG: {
    color: '#00FF66',
  },
  textNegativeSG: {
    color: '#FF3B30',
  },
  upgradeHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  upgradeLevelBadge: {
    backgroundColor: 'rgba(0, 229, 255, 0.1)',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 255, 0.2)',
  },
  upgradeLevelText: {
    color: '#00E5FF',
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  vsHexagon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FFD700',
    shadowColor: '#FFD700',
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 3,
  },
  difficultyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.01)',
    marginBottom: 20,
    position: 'relative',
    overflow: 'hidden',
    gap: 8,
  },
  difficultyLabel: {
    color: '#8E9AA8',
    fontSize: 9.5,
    fontWeight: '900',
    letterSpacing: 1,
  },
  difficultyVal: {
    fontSize: 10.5,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.04)',
    marginBottom: 6,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendIndicatorDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  legendText: {
    color: '#8E9AA8',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});
