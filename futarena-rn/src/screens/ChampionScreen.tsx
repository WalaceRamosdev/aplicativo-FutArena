import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Team } from '../types';
import { TeamShield } from './SelectionScreen';
import { SoundManager } from '../sound';

interface ChampionScreenProps {
  championTeam: Team;
  totalPoints: number;
  totalGames: number;
  onFinish: () => void;
}

const { width, height } = Dimensions.get('window');

interface Confetti {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  angleSpeed: number;
  color: string;
  width: number;
  height: number;
  rotation: number;
}

export default function ChampionScreen({
  championTeam,
  totalPoints,
  totalGames,
  onFinish,
}: ChampionScreenProps) {
  const [renderConfetti, setRenderConfetti] = React.useState<Confetti[]>([]);
  const confettiRef = React.useRef<Confetti[]>([]);

  // Animação de Flutuação do Troféu e Pulso do Escudo
  const trophyFloatAnim = React.useRef(new Animated.Value(0)).current;
  const shieldPulseAnim = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    // Loop de flutuação vertical do troféu
    Animated.loop(
      Animated.sequence([
        Animated.timing(trophyFloatAnim, {
          toValue: -15,
          duration: 1600,
          useNativeDriver: true,
        }),
        Animated.timing(trophyFloatAnim, {
          toValue: 0,
          duration: 1600,
          useNativeDriver: true,
        })
      ])
    ).start();

    // Loop de pulsação suave do escudo
    Animated.loop(
      Animated.sequence([
        Animated.timing(shieldPulseAnim, {
          toValue: 1.05,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shieldPulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        })
      ])
    ).start();

    // Loop a 60 FPS de chuva de confetes
    let animId: number;
    let frameCount = 0;

    const loop = () => {
      frameCount++;
      
      // Gera novo confete a cada 4 frames (capado em 75 para ótima performance)
      if (frameCount % 4 === 0 && confettiRef.current.length < 75) {
        confettiRef.current.push({
          id: Math.random().toString(),
          x: Math.random() * width,
          y: -15,
          vx: (Math.random() - 0.5) * 1.5,
          vy: 1.5 + Math.random() * 3.5,
          angle: Math.random() * Math.PI * 2,
          angleSpeed: 0.02 + Math.random() * 0.04,
          color: ['#FFD700', '#FFA000', '#00FF66', '#00E5FF', '#FF007F', '#CC00FF', '#FFFFFF'][Math.floor(Math.random() * 7)],
          width: 6 + Math.random() * 7,
          height: 8 + Math.random() * 10,
          rotation: Math.random() * 360,
        });
      }

      // Atualiza posições físicas e oscilações laterais
      confettiRef.current = confettiRef.current.map(c => {
        const nextAngle = c.angle + c.angleSpeed;
        return {
          ...c,
          x: c.x + c.vx + Math.sin(nextAngle) * 0.7,
          y: c.y + c.vy,
          angle: nextAngle,
          rotation: c.rotation + c.vy * 2.2,
        };
      }).filter(c => c.y < height + 20 && c.x > -20 && c.x < width + 20);

      setRenderConfetti([...confettiRef.current]);
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleFinish = () => {
    SoundManager.playClick();
    onFinish();
  };

  return (
    <LinearGradient
      colors={['#060814', '#020308']}
      style={styles.container}
    >
      {/* Soft Ambient glowing gold light simulation without web filters */}
      <View style={styles.ambientGlow} />

      {/* Chuva de Confetes interativa a 60 FPS */}
      {renderConfetti.map(c => (
        <View
          key={c.id}
          style={[
            styles.confettiItem,
            {
              left: c.x,
              top: c.y,
              width: c.width,
              height: c.height,
              backgroundColor: c.color,
              borderRadius: 2.5,
              transform: [{ rotate: `${c.rotation}deg` }]
            }
          ]}
        />
      ))}

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Animated.Text style={[styles.trophyEmoji, { transform: [{ translateY: trophyFloatAnim }] }]}>🏆</Animated.Text>
        <Text style={styles.superTitle}>PARABÉNS AO GRANDE</Text>
        <Text style={styles.title}>CAMPEÃO!</Text>

        <Animated.View style={[styles.shieldWrapper, { transform: [{ scale: shieldPulseAnim }] }]}>
          <View style={styles.glowingBorders}>
            <TeamShield team={championTeam} size="xl" />
          </View>
        </Animated.View>

        <Text style={styles.teamNameText}>{championTeam.name.toUpperCase()}</Text>
        <Text style={styles.statsDetailsText}>
          {totalGames} JOGOS DISPUTADOS • {totalPoints} PONTOS CONQUISTADOS
        </Text>

        <View style={styles.balloonSpeech}>
          <Text style={styles.balloonTitle}>👑 GLÓRIA ETERNA NA FUTARENA</Text>
          <Text style={styles.balloonText}>
            Seu clube superou todas as expectativas, dominou a tabela do campeonato e ergueu com mérito inquestionável a taça dourada da glória! A torcida faz a festa na arquibancada, celebrando o triunfo supremo!
          </Text>
        </View>

        <TouchableOpacity style={styles.finishBtn} onPress={handleFinish} activeOpacity={0.85}>
          <LinearGradient
            colors={['#FFD700', '#FFA000']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.finishBtnGradient}
          >
            <Text style={styles.finishBtnText}>ERGUER A TAÇA E FINALIZAR 🏆</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ambientGlow: {
    position: 'absolute',
    alignSelf: 'center',
    top: 50,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(255, 215, 0, 0.05)',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 40,
    alignItems: 'center',
  },
  trophyEmoji: {
    fontSize: 80,
    textShadowColor: 'rgba(255, 215, 0, 0.5)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 24,
    marginBottom: 20,
  },
  superTitle: {
    color: '#A2A8C4',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 3,
    marginBottom: 4,
  },
  title: {
    color: '#FFD700',
    fontSize: 34,
    fontWeight: '900',
    letterSpacing: 2,
    marginBottom: 32,
    textShadowColor: 'rgba(255, 215, 0, 0.25)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  shieldWrapper: {
    marginBottom: 24,
  },
  glowingBorders: {
    shadowColor: '#FFD700',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 20,
    elevation: 15,
    backgroundColor: '#060814',
    borderRadius: 60,
    padding: 10,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  teamNameText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 1.5,
  },
  statsDetailsText: {
    color: '#00E5FF',
    fontSize: 12,
    fontWeight: '900',
    marginTop: 8,
    letterSpacing: 1.5,
  },
  balloonSpeech: {
    backgroundColor: 'rgba(22, 28, 54, 0.45)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 24,
    padding: 20,
    marginTop: 32,
    width: '100%',
    marginBottom: 35,
  },
  balloonTitle: {
    color: '#FFD700',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  balloonText: {
    color: '#D2D9E5',
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '600',
  },
  finishBtn: {
    width: '100%',
    borderRadius: 14,
    overflow: 'hidden',
  },
  finishBtnGradient: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  finishBtnText: {
    color: '#000000',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  confettiItem: {
    position: 'absolute',
    zIndex: 99,
  },
});
