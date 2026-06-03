import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StorageManager } from '../storage';
import { findTeamById, brazilianTeams, paulistaTeams, cariocaTeams, gauchoTeams, mineiroTeams, paranaenseTeams, libertadoresTeams, internationalTeams } from '../teams';
import { TeamShield } from './SelectionScreen';
import { SoundManager } from '../sound';

interface StatsScreenProps {
  onBack: () => void;
}

interface DisplayStat {
  id: string;
  name: string;
  shortName: string;
  badge: string;
  primaryColor: string;
  secondaryColor: string;
  pts: number;
  m: number;
  w: number;
  d: number;
  l: number;
  gf: number;
}

export default function StatsScreen({ onBack }: StatsScreenProps) {
  const [statsList, setStatsList] = useState<DisplayStat[]>([]);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const stats = await StorageManager.getStats();
    // Mapeia todos os times que possuem estatísticas registradas
    const list: DisplayStat[] = [];
    
    // Varre todos os times disponíveis de todas as ligas
    const allTeams = [...new Map([
      ...brazilianTeams,
      ...paulistaTeams,
      ...cariocaTeams,
      ...gauchoTeams,
      ...mineiroTeams,
      ...paranaenseTeams,
      ...libertadoresTeams,
      ...internationalTeams,
    ].map(team => [team.id, team])).values()];
    allTeams.forEach(team => {
      const s = stats[team.id];
      if (s && s.m > 0) {
        list.push({
          id: team.id,
          name: team.name,
          shortName: team.shortName,
          badge: team.badge,
          primaryColor: team.primaryColor,
          secondaryColor: team.secondaryColor,
          pts: s.w * 3 + s.d,
          m: s.m,
          w: s.w,
          d: s.d,
          l: s.l,
          gf: s.gf,
        });
      }
    });

    // Ordena por Pontos > Vitórias > Gols Pro
    list.sort((a, b) => {
      if (b.pts !== a.pts) return b.pts - a.pts;
      if (b.w !== a.w) return b.w - a.w;
      return b.gf - a.gf;
    });

    setStatsList(list);
  };

  const handleResetStats = () => {
    SoundManager.playClick();
    Alert.alert(
      '⚠️ ZERAR ESTATÍSTICAS',
      'Deseja realmente apagar o histórico de estatísticas de todos os times? Esta ação é irreversível.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Zerar',
          style: 'destructive',
          onPress: async () => {
            await StorageManager.clearStats();
            loadStats();
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
        <Text style={styles.headerTitle}>LIDERANÇA GERAL</Text>
        <TouchableOpacity style={styles.resetBtn} onPress={handleResetStats} activeOpacity={0.7}>
          <Text style={styles.resetBtnText}>🧹 Limpar</Text>
        </TouchableOpacity>
      </View>

      {/* Subtitle details */}
      <Text style={styles.subtitle}>Estatísticas acumuladas de partidas rápidas disputadas</Text>

      {/* Table Headers */}
      <View style={styles.tableHeader}>
        <Text style={[styles.colHeader, styles.colPos]}>#</Text>
        <Text style={[styles.colHeader, styles.colTeam]}>EQUIPE</Text>
        <Text style={[styles.colHeader, styles.colPoints]}>PTS</Text>
        <Text style={[styles.colHeader, styles.colPlayed]}>J</Text>
        <Text style={[styles.colHeader, styles.colWins]}>V</Text>
        <Text style={[styles.colHeader, styles.colGf]}>GP</Text>
      </View>

      {/* Stats list */}
      {statsList.length > 0 ? (
        <FlatList
          data={statsList}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          initialNumToRender={15}
          maxToRenderPerBatch={10}
          windowSize={5}
          renderItem={({ item, index }) => (
            <View style={styles.tableRow}>
              <Text style={styles.colPosText}>{index + 1}</Text>
              <View style={[styles.colTeamLayout, styles.colTeam]}>
                <TeamShield team={item as any} size="sm" />
                <Text style={styles.teamNameText} numberOfLines={1}>{item.name}</Text>
              </View>
              <Text style={[styles.colText, styles.colPoints, styles.textBold, styles.textGold]}>{item.pts}</Text>
              <Text style={[styles.colText, styles.colPlayed]}>{item.m}</Text>
              <Text style={[styles.colText, styles.colWins]}>{item.w}</Text>
              <Text style={[styles.colText, styles.colGf]}>{item.gf}</Text>
            </View>
          )}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconBox}>
            <Text style={styles.emptyIcon}>📊</Text>
          </View>
          <Text style={styles.emptyText}>Nenhuma estatística registrada</Text>
          <Text style={styles.emptySubText}>Dispute confrontos no modo Partida Rápida para preencher o placar geral da arena!</Text>
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
  resetBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(255, 59, 48, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 59, 48, 0.2)',
    borderRadius: 10,
  },
  resetBtnText: {
    color: '#FF3B30',
    fontSize: 12,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#A2A8C4',
    fontSize: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    backgroundColor: 'rgba(22, 28, 54, 0.3)',
    paddingHorizontal: 16,
  },
  colHeader: {
    color: '#8E9AA8',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.04)',
  },
  colPosText: {
    width: 30,
    color: '#00E5FF',
    fontSize: 13,
    fontWeight: '900',
    textAlign: 'center',
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
  teamNameText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  colPoints: {
    width: 40,
    textAlign: 'center',
  },
  colPlayed: {
    width: 36,
    textAlign: 'center',
  },
  colWins: {
    width: 36,
    textAlign: 'center',
  },
  colGf: {
    width: 40,
    textAlign: 'center',
  },
  colText: {
    color: '#A2A8C4',
    fontSize: 13,
  },
  textBold: {
    fontWeight: '900',
    color: '#FFFFFF',
  },
  textGold: {
    color: '#FFD700',
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
