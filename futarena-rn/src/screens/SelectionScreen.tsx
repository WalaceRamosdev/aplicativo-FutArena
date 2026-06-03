import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, FlatList, Dimensions, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Team } from '../types';
import { getLeagueTeams, getLeagueName } from '../teams';
import { SoundManager } from '../sound';

const { width, height } = Dimensions.get('window');

// Componente para renderizar escudo com cores e iniciais de contingência
export const TeamShield = React.memo(function TeamShield({ team, size = 'md' }: { team: Team; size?: 'sm' | 'md' | 'lg' | 'xl' }) {
  const [imageError, setImageError] = useState(false);

  const sizeMap = {
    sm: { container: 36, border: 2, font: 10, img: 20 },
    md: { container: 52, border: 2.5, font: 14, img: 30 },
    lg: { container: 72, border: 3, font: 18, img: 44 },
    xl: { container: 92, border: 4, font: 22, img: 60 },
  };

  const currentSize = sizeMap[size];

  return (
    <LinearGradient
      colors={[team.primaryColor, team.secondaryColor]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[
        styles.shieldOuter,
        {
          width: currentSize.container,
          height: currentSize.container,
          borderRadius: currentSize.container / 2,
          borderWidth: currentSize.border,
          borderColor: team.secondaryColor === '#FFFFFF' ? '#CCCCCC' : team.secondaryColor,
        },
      ]}
    >
      <View
        style={[
          styles.shieldInner,
          {
            borderRadius: (currentSize.container - currentSize.border * 2) / 2,
            backgroundColor: team.primaryColor + 'dd',
          },
        ]}
      >
        {!imageError ? (
          <Image
            source={{ uri: team.badge }}
            style={{ width: currentSize.img, height: currentSize.img, resizeMode: 'contain' }}
            onError={() => setImageError(true)}
          />
        ) : (
          <Text
            style={[
              styles.shieldInitials,
              {
                fontSize: currentSize.font,
                color: team.secondaryColor === '#FFFFFF' ? '#000000' : '#FFFFFF',
              },
            ]}
          >
            {team.shortName}
          </Text>
        )}
      </View>
    </LinearGradient>
  );
});

// Helper para simular e calcular atributos determinísticos baseados no OVR do time
const getTeamAttributes = (overall: number, seed: string) => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const factorA = Math.abs(hash % 7);
  const factorB = Math.abs((hash >> 2) % 7);
  const factorC = Math.abs((hash >> 4) % 7);

  const ata = Math.min(99, Math.max(50, overall + factorA - 3));
  const mei = Math.min(99, Math.max(50, overall + factorB - 3));
  const def = Math.min(99, Math.max(50, overall + factorC - 3));
  const ent = Math.min(100, Math.max(40, 60 + Math.abs(hash % 38))); // Chemistry

  return { ata, mei, def, ent };
};

// Helper para converter OVR em classificação de estrelas táticas
const getTeamStars = (overall: number) => {
  if (overall >= 84) return '⭐⭐⭐⭐⭐';
  if (overall >= 79) return '⭐⭐⭐⭐★';
  if (overall >= 74) return '⭐⭐⭐⭐';
  if (overall >= 69) return '⭐⭐⭐★';
  return '⭐⭐⭐';
};

interface SelectionScreenProps {
  mode: 'quick' | 'arcade' | 'worldcup';
  onBack: () => void;
  onSelectTeams: (teams: Team[], leagueId: string) => void;
}

export default function SelectionScreen({ mode, onBack, onSelectTeams }: SelectionScreenProps) {
  const [selectedLeague, setSelectedLeague] = useState('brasileirao');
  const [teamsList, setTeamsList] = useState<Team[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<Team[]>([]);

  const leagues = mode === 'worldcup'
    ? [{ id: 'worldcup', name: 'Copa do Mundo' }]
    : [
        { id: 'brasileirao', name: 'Brasileirão' },
        { id: 'libertadores', name: 'Libertadores' },
        { id: 'paulista', name: 'Paulistão' },
        { id: 'carioca', name: 'Cariocão' },
        { id: 'gaucho', name: 'Gauchão' },
        { id: 'mineiro', name: 'Mineiro' },
      ];

  useEffect(() => {
    if (mode === 'worldcup') {
      setSelectedLeague('worldcup');
    }
  }, [mode]);

  useEffect(() => {
    setTeamsList(getLeagueTeams(selectedLeague));
    if (mode !== 'quick') {
      setSelectedTeams([]);
    }
  }, [selectedLeague, mode]);

  const handleSelectTeam = (team: Team) => {
    SoundManager.playClick();
    const isSelected = selectedTeams.some(t => t.id === team.id);

    if (mode === 'quick') {
      if (isSelected) {
        setSelectedTeams(selectedTeams.filter(t => t.id !== team.id));
      } else if (selectedTeams.length < 2) {
        setSelectedTeams([...selectedTeams, team]);
      }
    } else {
      if (isSelected) {
        setSelectedTeams([]);
      } else {
        setSelectedTeams([team]);
      }
    }
  };

  const handleStartGame = () => {
    SoundManager.playClick();
    onSelectTeams(selectedTeams, selectedLeague);
  };

  const requiredCount = mode === 'quick' ? 2 : 1;
  const isStartDisabled = selectedTeams.length !== requiredCount;

  const getLeagueEmoji = (id: string) => {
    switch (id) {
      case 'brasileirao': return '🇧🇷 ';
      case 'libertadores': return '🏆 ';
      case 'paulista': return '👑 ';
      case 'carioca': return '🏖️ ';
      case 'gaucho': return '🧉 ';
      case 'mineiro': return '⛰️ ';
      case 'worldcup': return '🌍 ';
      default: return '⚽ ';
    }
  };

  // Render do Card Tático estilo Console (Hexagon, Stats, Estrelas)
  const renderConsoleCard = (team: Team | undefined, roleLabel: string) => {
    if (!team) {
      return (
        <View style={styles.consoleCardEmpty}>
          <View style={styles.hexBadgeEmpty}>
            <Text style={styles.hexBadgePlus}>+</Text>
          </View>
          <Text style={styles.roleLabelText}>{roleLabel}</Text>
          <Text style={styles.emptyPromptText}>Selecione um clube abaixo</Text>
        </View>
      );
    }

    const { ata, mei, def, ent } = getTeamAttributes(team.overall, team.id);
    const stars = getTeamStars(team.overall);

    return (
      <View style={styles.consoleCard}>
        <View style={[styles.hexBadge, { borderColor: team.primaryColor }]}>
          <View style={styles.hexBadgeGloss} />
          <TeamShield team={team} size="xl" />
        </View>

        {/* Stars */}
        <Text style={styles.starsText}>{stars}</Text>

        {/* Console Attributes Grid */}
        <View style={styles.consoleGrid}>
          <View style={styles.gridItem}>
            <Text style={styles.gridHeader}>ATA</Text>
            <View style={styles.gridPill}>
              <Text style={styles.gridValue}>{ata}</Text>
            </View>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.gridHeader}>MEI</Text>
            <View style={styles.gridPill}>
              <Text style={styles.gridValue}>{mei}</Text>
            </View>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.gridHeader}>DEF</Text>
            <View style={styles.gridPill}>
              <Text style={styles.gridValue}>{def}</Text>
            </View>
          </View>
        </View>

        {/* Chemistry Bar */}
        <View style={styles.chemistryContainer}>
          <View style={styles.chemistryLabelRow}>
            <Text style={styles.chemistryLabel}>ENT (Química)</Text>
            <Text style={styles.chemistryValue}>{ent}</Text>
          </View>
          <View style={styles.chemistryTrack}>
            <View style={[styles.chemistryFill, { width: `${ent}%` }]} />
          </View>
        </View>

        {/* Role & Name */}
        <View style={styles.cardHeaderBox}>
          <Text style={styles.roleLabelText}>{roleLabel}</Text>
          <Text style={styles.cardTeamName} numberOfLines={1}>{team.name.toUpperCase()}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#02040a" />

      {/* Stadium Perspective Background */}
      <View style={styles.stadiumBg}>
        <LinearGradient
          colors={['#02040a', '#060e22', '#052210']}
          style={StyleSheet.absoluteFillObject}
        />
        <View style={styles.floodlightBeamLeft} />
        <View style={styles.floodlightBeamRight} />
        
        {/* Perspective Pitch lines */}
        <View style={styles.perspectiveField}>
          <View style={styles.perspectiveCenterCircle} />
          <View style={styles.perspectiveLineLeft} />
          <View style={styles.perspectiveLineRight} />
        </View>
      </View>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack} activeOpacity={0.7}>
          <Text style={styles.backButtonText}>⬅ VOLTAR</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ESCOLHER TIME</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      {/* Main Console Draft Panel */}
      <View style={styles.draftSection}>
        {mode === 'quick' ? (
          <View style={styles.draftDualContainer}>
            {renderConsoleCard(selectedTeams[0], 'CLUBE DA CASA')}
            
            {/* Center "VS" Hexagon Separator */}
            <View style={styles.vsSeparatorContainer}>
              <View style={styles.vsHexagon}>
                <Text style={styles.vsText}>X</Text>
              </View>
            </View>

            {renderConsoleCard(selectedTeams[1], 'CLUBE VISITANTE')}
          </View>
        ) : (
          <View style={styles.draftDualContainer}>
            {renderConsoleCard(selectedTeams[0], 'SEU CLUBE')}
            
            <View style={styles.vsSeparatorContainer}>
              <View style={styles.vsHexagon}>
                <Text style={styles.vsText}>🏆</Text>
              </View>
            </View>

            {/* Glory Card */}
            <View style={styles.consoleCardGlory}>
              <View style={[styles.hexBadge, { borderColor: '#FFD700', shadowColor: '#FFD700' }]}>
                <View style={styles.hexBadgeGloss} />
                <Text style={styles.gloryTrophy}>🏆</Text>
              </View>
              <Text style={styles.gloryTitle}>BUSCA PELA GLÓRIA</Text>
              <Text style={styles.glorySubtitle}>Conquiste moedas, evolua seu elenco e erga a taça de campeão da liga!</Text>
            </View>
          </View>
        )}
      </View>

      {/* BOTTOM SECTION: Selection lists */}
      <View style={styles.selectionSection}>
        {/* League Horizontal Picker */}
        {mode !== 'worldcup' && (
          <View style={styles.leaguesWrapper}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.leaguesScroll}>
              {leagues.map((league) => {
                const isSelected = selectedLeague === league.id;
                return (
                  <TouchableOpacity
                    key={league.id}
                    style={[styles.leaguePill, isSelected && styles.leaguePillSelected]}
                    onPress={() => { SoundManager.playClick(); setSelectedLeague(league.id); }}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.leaguePillText, isSelected && styles.leaguePillTextSelected]}>
                      {getLeagueEmoji(league.id)}{league.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        )}

        {/* Teams List (Grid) */}
        <View style={styles.listWrapper}>
          <FlatList
            data={teamsList}
            keyExtractor={(item) => item.id}
            numColumns={3}
            columnWrapperStyle={styles.teamsListRow}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatListContent}
            removeClippedSubviews={true}
            initialNumToRender={12}
            maxToRenderPerBatch={12}
            windowSize={5}
            renderItem={({ item }) => {
              const isSelected = selectedTeams.some(t => t.id === item.id);
              return (
                <TouchableOpacity
                  style={[
                    styles.teamListItem,
                    isSelected && styles.teamListItemSelected
                  ]}
                  onPress={() => handleSelectTeam(item)}
                  activeOpacity={0.7}
                >
                  <TeamShield team={item} size="md" />
                  <Text style={[styles.teamListItemText, isSelected && styles.teamListItemTextSelected]} numberOfLines={1}>
                    {isSelected ? `◀ ${item.shortName} ▶` : item.shortName}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        {/* Confirm Button */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.startGameButton, isStartDisabled && styles.startGameButtonDisabled]}
            disabled={isStartDisabled}
            onPress={handleStartGame}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={isStartDisabled ? ['rgba(22, 28, 54, 0.4)', 'rgba(12, 16, 32, 0.4)'] : ['#FFD700', '#FFA000']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.startGameGradient}
            >
              <Text style={[styles.startGameText, isStartDisabled && styles.startGameTextDisabled]}>
                CONFIRMAR E AVANÇAR ➔
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#02040a',
  },
  stadiumBg: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  floodlightBeamLeft: {
    position: 'absolute',
    top: -50,
    left: '8%',
    width: 140,
    height: 380,
    backgroundColor: 'rgba(0, 229, 255, 0.05)',
    transform: [{ rotate: '20deg' }],
    borderRadius: 70,
  },
  floodlightBeamRight: {
    position: 'absolute',
    top: -50,
    right: '8%',
    width: 140,
    height: 380,
    backgroundColor: 'rgba(0, 229, 255, 0.05)',
    transform: [{ rotate: '-20deg' }],
    borderRadius: 70,
  },
  perspectiveField: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '42%',
    opacity: 0.14,
  },
  perspectiveCenterCircle: {
    position: 'absolute',
    bottom: -120,
    alignSelf: 'center',
    width: 320,
    height: 320,
    borderRadius: 160,
    borderWidth: 2.2,
    borderColor: '#00FF66',
  },
  perspectiveLineLeft: {
    position: 'absolute',
    bottom: 0,
    left: '10%',
    width: 2.2,
    height: '100%',
    backgroundColor: '#00FF66',
    transform: [{ rotate: '42deg' }],
  },
  perspectiveLineRight: {
    position: 'absolute',
    bottom: 0,
    right: '10%',
    width: 2.2,
    height: '100%',
    backgroundColor: '#00FF66',
    transform: [{ rotate: '-42deg' }],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 54,
    paddingBottom: 12,
    zIndex: 10,
  },
  backButton: {
    backgroundColor: 'rgba(22, 28, 54, 0.65)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  backButtonText: {
    color: '#D2D9E5',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.2,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 2,
  },
  headerPlaceholder: {
    width: 70,
  },
  draftSection: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    zIndex: 2,
  },
  draftDualContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '92%',
  },
  vsSeparatorContainer: {
    position: 'absolute',
    alignSelf: 'center',
    left: '50%',
    marginLeft: -22,
    zIndex: 10,
  },
  vsHexagon: {
    width: 44,
    height: 44,
    backgroundColor: '#0b0f19',
    borderWidth: 2,
    borderColor: '#FFD700',
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FFD700',
    shadowOpacity: 0.45,
    shadowRadius: 10,
    elevation: 8,
  },
  vsText: {
    color: '#FFD700',
    fontSize: 15,
    fontWeight: '900',
  },
  consoleCard: {
    width: '46%',
    backgroundColor: 'rgba(6, 9, 20, 0.72)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 24,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  consoleCardEmpty: {
    width: '46%',
    height: '75%',
    backgroundColor: 'rgba(6, 9, 20, 0.45)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.04)',
    borderStyle: 'dashed',
    borderRadius: 24,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hexBadgeEmpty: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  hexBadgePlus: {
    color: 'rgba(255, 255, 255, 0.3)',
    fontSize: 24,
    fontWeight: 'bold',
  },
  emptyPromptText: {
    color: '#5e6875',
    fontSize: 10,
    marginTop: 6,
    textAlign: 'center',
  },
  consoleCardGlory: {
    width: '46%',
    backgroundColor: 'rgba(255, 215, 0, 0.04)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 215, 0, 0.15)',
    borderRadius: 24,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gloryTrophy: {
    fontSize: 34,
  },
  gloryTitle: {
    color: '#FFD700',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1,
    marginTop: 10,
    textAlign: 'center',
  },
  glorySubtitle: {
    color: '#8E9AA8',
    fontSize: 9.5,
    marginTop: 6,
    textAlign: 'center',
    lineHeight: 13,
  },
  hexBadge: {
    width: 108,
    height: 108,
    backgroundColor: 'rgba(11, 16, 32, 0.65)',
    borderRadius: 22,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#00E5FF',
    shadowOpacity: 0.25,
    shadowRadius: 14,
    elevation: 8,
    overflow: 'hidden',
    marginBottom: 8,
  },
  hexBadgeGloss: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    transform: [{ skewY: '-15deg' }],
  },
  cardWatermarkContainer: {
    position: 'absolute',
    top: 20,
    bottom: 20,
    left: 10,
    right: 10,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.05,
    zIndex: 0,
  },
  cardWatermarkImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  hexBadgeWatermark: {
    position: 'absolute',
    width: 84,
    height: 84,
    opacity: 0.12,
    resizeMode: 'contain',
    zIndex: 0,
  },
  starsText: {
    color: '#FFD700',
    fontSize: 12,
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  consoleGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  gridItem: {
    alignItems: 'center',
    flex: 1,
  },
  gridHeader: {
    color: '#8E9AA8',
    fontSize: 8.5,
    fontWeight: '900',
    marginBottom: 3,
    letterSpacing: 0.5,
  },
  gridPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 8,
    paddingVertical: 3,
    paddingHorizontal: 8,
    minWidth: 32,
    alignItems: 'center',
  },
  gridValue: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900',
  },
  chemistryContainer: {
    width: '100%',
    marginBottom: 12,
  },
  chemistryLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  chemistryLabel: {
    color: '#8E9AA8',
    fontSize: 8,
    fontWeight: '900',
  },
  chemistryValue: {
    color: '#FFA000',
    fontSize: 8,
    fontWeight: '900',
  },
  chemistryTrack: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  chemistryFill: {
    height: '100%',
    backgroundColor: '#FFA000',
    borderRadius: 2,
  },
  cardHeaderBox: {
    alignItems: 'center',
    width: '100%',
    borderTopWidth: 1.2,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    paddingTop: 8,
  },
  roleLabelText: {
    color: '#8E9AA8',
    fontSize: 8.5,
    fontWeight: '900',
    letterSpacing: 1.2,
    marginBottom: 2,
  },
  cardTeamName: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  selectionSection: {
    height: '52%',
    backgroundColor: 'rgba(6, 8, 20, 0.88)',
    borderTopWidth: 1.8,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingTop: 16,
    zIndex: 3,
  },
  leaguesWrapper: {
    height: 48,
    marginBottom: 8,
  },
  leaguesScroll: {
    paddingHorizontal: 18,
    alignItems: 'center',
    gap: 10,
  },
  leaguePill: {
    backgroundColor: 'rgba(22, 28, 54, 0.5)',
    borderWidth: 1.2,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  leaguePillSelected: {
    borderColor: '#FFD700',
    backgroundColor: 'rgba(255, 215, 0, 0.08)',
  },
  leaguePillText: {
    color: '#8E9AA8',
    fontSize: 12,
    fontWeight: '800',
  },
  leaguePillTextSelected: {
    color: '#FFD700',
    fontWeight: '900',
  },
  listWrapper: {
    flex: 1,
    paddingHorizontal: 16,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  teamsListRow: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  teamListItem: {
    width: '31.5%',
    backgroundColor: 'rgba(22, 28, 54, 0.35)',
    borderWidth: 1.2,
    borderColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  teamListItemSelected: {
    borderColor: '#FFD700',
    backgroundColor: 'rgba(255, 215, 0, 0.12)',
    shadowColor: '#FFD700',
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 4,
  },
  teamListItemText: {
    color: '#8E9AA8',
    fontSize: 10,
    fontWeight: '800',
    marginTop: 6,
    textAlign: 'center',
  },
  teamListItemTextSelected: {
    color: '#FFD700',
    fontWeight: '900',
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    paddingTop: 10,
  },
  startGameButton: {
    width: '100%',
    borderRadius: 18,
    overflow: 'hidden',
    shadowColor: '#FFD700',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 8,
  },
  startGameButtonDisabled: {
    shadowOpacity: 0,
    elevation: 0,
  },
  startGameGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  startGameText: {
    color: '#000000',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 2,
  },
  startGameTextDisabled: {
    color: 'rgba(255, 255, 255, 0.25)',
  },
  shieldOuter: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  shieldInner: {
    width: '88%',
    height: '88%',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  shieldInitials: {
    fontWeight: '900',
  },
});
