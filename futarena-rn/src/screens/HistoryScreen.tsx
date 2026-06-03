import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StorageManager } from '../storage';
import { findTeamById } from '../teams';
import { TeamShield } from './SelectionScreen';
import { MatchData } from '../types';
import { SoundManager } from '../sound';

interface HistoryScreenProps {
  onBack: () => void;
}

export default function HistoryScreen({ onBack }: HistoryScreenProps) {
  const [historyList, setHistoryList] = useState<MatchData[]>([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const list = await StorageManager.getHistory();
    setHistoryList(list);
  };

  const handleClearHistory = () => {
    SoundManager.playClick();
    Alert.alert(
      '⚠️ LIMPAR HISTÓRICO',
      'Tem certeza de que deseja excluir o histórico de partidas salvas? Isso não apagará as estatísticas dos times.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Limpar',
          style: 'destructive',
          onPress: async () => {
            await StorageManager.clearHistory();
            loadHistory();
            SoundManager.playWhistle();
          },
        },
      ]
    );
  };

  return (
    <LinearGradient
      colors={['#060814', '#020308']}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack} activeOpacity={0.7}>
          <Text style={styles.backButtonText}>⬅ Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>HISTÓRICO DE JOGOS</Text>
        <TouchableOpacity style={styles.clearBtn} onPress={handleClearHistory} activeOpacity={0.7}>
          <Text style={styles.clearBtnText}>🗑️ Limpar</Text>
        </TouchableOpacity>
      </View>

      {/* History scroll list */}
      {historyList.length > 0 ? (
        <FlatList
          data={historyList}
          keyExtractor={(item) => `${item.team1}-${item.team2}-${item.date}`}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          initialNumToRender={12}
          maxToRenderPerBatch={8}
          windowSize={5}
          renderItem={({ item }) => {
            const team1 = findTeamById(item.team1);
            const team2 = findTeamById(item.team2);
            if (!team1 || !team2) return null;

            const isWinner1 = item.score1 > item.score2;
            const isWinner2 = item.score2 > item.score1;

            return (
              <View style={styles.matchCard}>
                <View style={styles.matchDateRow}>
                  <Text style={styles.dateText}>📅 {item.date}</Text>
                </View>

                <View style={styles.matchDetailsRow}>
                  <View style={styles.teamColumnLeft}>
                    <Text style={[styles.teamName, isWinner1 && styles.winnerBold, isWinner1 && styles.textGold]} numberOfLines={1}>
                      {team1.name}
                    </Text>
                    <TeamShield team={team1} size="sm" />
                  </View>

                  <View style={styles.scoreBadge}>
                    <Text style={styles.scoreText}>
                      {item.score1} - {item.score2}
                    </Text>
                  </View>

                  <View style={styles.teamColumnRight}>
                    <TeamShield team={team2} size="sm" />
                    <Text style={[styles.teamName, isWinner2 && styles.winnerBold, isWinner2 && styles.textGold]} numberOfLines={1}>
                      {team2.name}
                    </Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconBox}>
            <Text style={styles.emptyIcon}>📅</Text>
          </View>
          <Text style={styles.emptyText}>Sem confrontos registrados</Text>
          <Text style={styles.emptySubText}>Suas partidas finalizadas no modo Partida Rápida aparecerão listadas cronologicamente neste painel!</Text>
        </View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 54,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(22, 28, 54, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 10,
  },
  backButtonText: {
    color: '#D2D9E5',
    fontSize: 12,
    fontWeight: '700',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  clearBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(255, 59, 48, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 59, 48, 0.2)',
    borderRadius: 10,
  },
  clearBtnText: {
    color: '#FF3B30',
    fontSize: 12,
    fontWeight: 'bold',
  },
  listContent: {
    padding: 16,
    paddingBottom: 24,
  },
  matchCard: {
    backgroundColor: 'rgba(22, 28, 54, 0.45)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  matchDateRow: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.03)',
    paddingBottom: 6,
  },
  dateText: {
    color: '#A2A8C4',
    fontSize: 10,
    fontWeight: '600',
  },
  matchDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  teamColumnLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
    justifyContent: 'flex-end',
  },
  teamColumnRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
    justifyContent: 'flex-start',
  },
  teamName: {
    color: '#D2D9E5',
    fontSize: 13,
    fontWeight: '600',
  },
  winnerBold: {
    color: '#FFFFFF',
    fontWeight: '900',
  },
  textGold: {
    color: '#FFD700',
  },
  scoreBadge: {
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.25)',
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginHorizontal: 10,
  },
  scoreText: {
    color: '#FFD700',
    fontSize: 13,
    fontWeight: '900',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingBottom: 80,
  },
  emptyIconBox: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(22, 28, 54, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: 20,
  },
  emptyIcon: {
    fontSize: 32,
  },
  emptyText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 8,
  },
  emptySubText: {
    color: '#A2A8C4',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
    fontWeight: '500',
  },
});
