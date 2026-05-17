import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Team } from '../types';
import { TeamShield } from './SelectionScreen';
import { SoundManager } from '../sound';
import { AICommentator } from '../commentary';

interface ResultScreenProps {
  mode: 'quick' | 'arcade' | 'worldcup';
  team1: Team;
  team2: Team;
  score1: number;
  score2: number;
  wasTurnaround: boolean;
  hadLateGoal: boolean;
  standings?: any;
  userTeamId?: string;
  onNextAction: () => void; // Revanche ou Voltar ao Campeonato
  onBackMenu: () => void;
}

export default function ResultScreen({
  mode,
  team1,
  team2,
  score1,
  score2,
  wasTurnaround,
  hadLateGoal,
  standings,
  userTeamId,
  onNextAction,
  onBackMenu,
}: ResultScreenProps) {
  const isDraw = score1 === score2;
  const winner = score1 > score2 ? team1 : team2;
  const loser = score1 > score2 ? team2 : team1;

  // Calcula moedas recebidas (somente no campeonato)
  const getCoinsEarned = () => {
    if (mode !== 'arcade' || !userTeamId) return 0;
    const userIsHome = team1.id === userTeamId;
    const userScore = userIsHome ? score1 : score2;
    const opponentScore = userIsHome ? score2 : score1;

    let coins = 50; // taxa de participação
    if (userScore > opponentScore) {
      coins += 100 + (userScore - opponentScore) * 20; // bônus de vitória + saldo de gols
    } else if (userScore === opponentScore) {
      coins += 30; // bônus de empate
    }
    coins += userScore * 10; // bônus por gols marcados
    return coins;
  };

  const coinsEarned = getCoinsEarned();

  // Gera comentário contextualmente rico da IA
  const context = {
    standings,
    userTeamId,
    wasTurnaround,
    hadLateGoal,
  };
  const matchComment = AICommentator.generateMatchComment(team1, team2, score1, score2, context);

  return (
    <LinearGradient
      colors={['#060814', '#020308']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.overTitle}>APITO FINAL ⏱️</Text>
        <Text style={[styles.title, isDraw ? styles.titleDraw : styles.titleWinner]}>
          {isDraw ? 'EMPATE!' : 'VENCEDOR DA PARTIDA'}
        </Text>

        {/* Visual Display */}
        <View style={styles.displayContainer}>
          {isDraw ? (
            <View style={styles.drawRow}>
              <TeamShield team={team1} size="lg" />
              <Text style={styles.vsText}>X</Text>
              <TeamShield team={team2} size="lg" />
            </View>
          ) : (
            <View style={styles.winnerBox}>
              <View style={[styles.glowingWrapper, { shadowColor: winner.primaryColor }]}>
                <TeamShield team={winner} size="xl" />
              </View>
              <Text style={styles.winnerNameText}>{winner.name}</Text>
              <Text style={styles.winnerSubText}>Parabéns pela vitória na FutArena!</Text>
            </View>
          )}
        </View>

        {/* Large Score */}
        <View style={styles.scoreCard}>
          <Text style={styles.scoreText}>
            {score1} <Text style={styles.scoreHyphen}>-</Text> {score2}
          </Text>
          <View style={styles.scoreDetailsRow}>
            <Text style={styles.scoreDetailNameHome} numberOfLines={1}>{team1.name}</Text>
            <Text style={styles.scoreDetailVs}>x</Text>
            <Text style={styles.scoreDetailNameAway} numberOfLines={1}>{team2.name}</Text>
          </View>
        </View>

        {/* AI Commentator Baloon */}
        <View style={styles.commentaryCard}>
          <Text style={styles.commentaryIcon}>🎙️ ANÁLISE DO NARRADOR IA</Text>
          <Text style={styles.commentaryText}>"{matchComment}"</Text>
        </View>

        {/* Coins Rewards (Arcade Only) */}
        {mode === 'arcade' && coinsEarned > 0 && (
          <View style={styles.coinsCard}>
            <Text style={styles.coinsTitle}>RECOMPENSAS DE CAMPANHA 🪙</Text>
            <Text style={styles.coinsEarnedText}>+{coinsEarned} moedas</Text>
            <Text style={styles.coinsSubText}>Use suas moedas no CT de Treinamento para elevar o OVR de seus craques!</Text>
          </View>
        )}

        {/* Actions buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.primaryButton} onPress={onNextAction} activeOpacity={0.85}>
            <LinearGradient
              colors={['#FFD700', '#FFA000']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.primaryButtonGradient}
            >
              <Text style={styles.primaryButtonText}>
                {mode === 'quick' ? '⚽ DISPUTAR REVANCHE' : '🏆 VOLTAR AO CAMPEONATO'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={onBackMenu} activeOpacity={0.7}>
            <Text style={styles.secondaryButtonText}>🚪 Voltar ao Menu Principal</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 64,
    paddingBottom: 40,
    alignItems: 'center',
  },
  overTitle: {
    color: '#A2A8C4',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 2,
    marginBottom: 6,
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: 1.5,
    marginBottom: 24,
    textAlign: 'center',
  },
  titleDraw: {
    color: '#D2D9E5',
  },
  titleWinner: {
    color: '#FFD700',
  },
  displayContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  drawRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    backgroundColor: 'rgba(22, 28, 54, 0.45)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 24,
    padding: 20,
  },
  vsText: {
    color: '#FFD700',
    fontSize: 22,
    fontWeight: '900',
  },
  winnerBox: {
    alignItems: 'center',
  },
  glowingWrapper: {
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 12,
    backgroundColor: '#060814',
    borderRadius: 60,
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  winnerNameText: {
    color: '#FFD700',
    fontSize: 24,
    fontWeight: '900',
    marginTop: 18,
    textAlign: 'center',
  },
  winnerSubText: {
    color: '#A2A8C4',
    fontSize: 12,
    marginTop: 4,
    fontWeight: '600',
  },
  scoreCard: {
    backgroundColor: 'rgba(22, 28, 54, 0.45)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 24,
    paddingVertical: 20,
    paddingHorizontal: 32,
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
  },
  scoreText: {
    color: '#FFFFFF',
    fontSize: 42,
    fontWeight: '900',
    letterSpacing: 2,
  },
  scoreHyphen: {
    color: 'rgba(255, 255, 255, 0.25)',
  },
  scoreDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    gap: 12,
    width: '100%',
  },
  scoreDetailNameHome: {
    color: '#D2D9E5',
    fontSize: 13,
    fontWeight: '800',
    textAlign: 'right',
    flex: 1,
  },
  scoreDetailVs: {
    color: '#A2A8C4',
    fontSize: 12,
    fontWeight: '800',
  },
  scoreDetailNameAway: {
    color: '#D2D9E5',
    fontSize: 13,
    fontWeight: '800',
    textAlign: 'left',
    flex: 1,
  },
  commentaryCard: {
    backgroundColor: 'rgba(22, 28, 54, 0.35)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 20,
    padding: 16,
    width: '100%',
    marginBottom: 16,
  },
  commentaryIcon: {
    color: '#FFD700',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  commentaryText: {
    color: '#D2D9E5',
    fontSize: 13,
    lineHeight: 20,
    fontStyle: 'italic',
    fontWeight: '600',
  },
  coinsCard: {
    backgroundColor: 'rgba(0, 255, 102, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 102, 0.15)',
    borderRadius: 20,
    padding: 16,
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
  },
  coinsTitle: {
    color: '#00FF66',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  coinsEarnedText: {
    color: '#FFD700',
    fontSize: 24,
    fontWeight: '900',
    marginTop: 6,
  },
  coinsSubText: {
    color: '#A2A8C4',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 14,
    fontWeight: '500',
  },
  actionsContainer: {
    width: '100%',
    gap: 12,
  },
  primaryButton: {
    borderRadius: 14,
    overflow: 'hidden',
  },
  primaryButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#000000',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1,
  },
  secondaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: '#D2D9E5',
    fontSize: 13,
    fontWeight: '800',
  },
});
