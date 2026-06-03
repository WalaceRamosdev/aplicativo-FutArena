import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions, Animated, Vibration, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Team } from '../types';
import { TeamShield } from './SelectionScreen';

const ScoreboardCrest = React.memo(function ScoreboardCrest({ team }: { team: Team }) {
  const [imageError, setImageError] = useState(false);

  if (!imageError && team.badge) {
    return (
      <Image
        source={{ uri: team.badge }}
        style={styles.scoreboardCrestImage}
        onError={() => setImageError(true)}
      />
    );
  }

  return (
    <Text style={styles.scoreboardCrestFallback}>
      {team.shortName}
    </Text>
  );
});
import { SoundManager } from '../sound';
import { MATCH_EVENTS, AICommentator } from '../commentary';

interface MatchScreenProps {
  team1: Team;
  team2: Team;
  team1Ovr: number; // com boosts aplicados
  team2Ovr: number;
  gameSpeed: 'normal' | 'fast' | 'turbo';
  onMatchFinish: (
    score1: number,
    score2: number,
    events: string[],
    wasTurnaround: boolean,
    hadLateGoal: boolean
  ) => void;
  onCancel: () => void;
}

const { width, height } = Dimensions.get('window');
const ARENA_SIZE = Math.min(width - 32, 360);
const SHIELD_SIZE = 40;
const GOAL_SIZE = 86;
const GOAL_DEPTH = 12;
const BASE_SPEED = 5.2;
const MIN_SPEED = 3.6;
const MAX_SPEED = 10.5;

interface ShieldState {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export default function MatchScreen({
  team1,
  team2,
  team1Ovr,
  team2Ovr,
  gameSpeed,
  onMatchFinish,
  onCancel,
}: MatchScreenProps) {
  // Estados para exibição
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [matchTime, setMatchTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [countdown, setCountdown] = useState('2');
  const [showGoalOverlay, setShowGoalOverlay] = useState(false);
  const [goalScorer, setGoalScorer] = useState<Team | null>(null);
  const [goalReactionText, setGoalReactionText] = useState('');
  const [logs, setLogs] = useState<string[]>([]);
  const [currentSpeedMult, setCurrentSpeedMult] = useState(1);

  // Refs de sincronização de estado contra stale closures
  const score1Ref = useRef(0);
  const score2Ref = useRef(0);
  const logsRef = useRef<string[]>([]);

  const shakeAnim = useRef(new Animated.Value(0)).current;

  // Animated values para updates 60fps sem re-render (roda na UI thread)
  const shield1X = useRef(new Animated.Value(50 - SHIELD_SIZE / 2)).current;
  const shield1Y = useRef(new Animated.Value(130 - SHIELD_SIZE / 2)).current;
  const shield2X = useRef(new Animated.Value(210 - SHIELD_SIZE / 2)).current;
  const shield2Y = useRef(new Animated.Value(130 - SHIELD_SIZE / 2)).current;
  const fieldRotAnim = useRef(new Animated.Value(0)).current;
  const fieldRotInterpolated = useRef(fieldRotAnim.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  })).current;
  const lastDisplayedMinRef = useRef(0);
  const particleFrameThrottle = useRef(0);

  // Refs de física para rodar fora das atualizações lentas de render
  const shield1Ref = useRef<ShieldState>({ x: 50, y: 130, vx: 0, vy: 0 });
  const shield2Ref = useRef<ShieldState>({ x: 210, y: 130, vx: 0, vy: 0 });
  const rotationRef = useRef(0);
  const gameTimeRef = useRef(0);
  const lastEventTimeRef = useRef(0);
  const hasFirstGoalRef = useRef(false);
  const isGoalCooldownRef = useRef(false);
  const goalTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const logScrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [extraTimeMinutes, setExtraTimeMinutes] = useState(0);
  const [isExtraTime, setIsExtraTime] = useState(false);
  const extraTimeMinutesRef = useRef(0);
  const extraTimeTriggeredRef = useRef(false);

  // Estados de Sobrecarga e Modo Supersônico (Inovação Arcade)
  const [energy, setEnergy] = useState(0);
  const [supersonicActive, setSupersonicActive] = useState(false);
  const energyRef = useRef(0);
  const supersonicActiveRef = useRef(false);
  const supersonicTimerRef = useRef(0);

  // Animação Explosiva de Gol (Partículas e Zoom Spring)
  const [renderParticles, setRenderParticles] = useState<any[]>([]);
  const particlesRef = useRef<any[]>([]);
  const goalScaleAnim = useRef(new Animated.Value(0.1)).current;

  const scrollRef = useRef<ScrollView>(null);

  // Configuração da duração do jogo baseada na velocidade
  const getMatchDuration = () => {
    switch (gameSpeed) {
      case 'fast': return 15000; // 15 segundos
      case 'turbo': return 8000; // 8 segundos
      default: return 28000; // 28 segundos
    }
  };

  const matchDuration = getMatchDuration();

  // 1. Contagem regressiva antes de iniciar
  useEffect(() => {
    SoundManager.init();
    score1Ref.current = 0;
    score2Ref.current = 0;
    logsRef.current = [];
    energyRef.current = 0;
    setEnergy(0);
    supersonicActiveRef.current = false;
    setSupersonicActive(false);
    supersonicTimerRef.current = 0;
    extraTimeMinutesRef.current = 0;
    setExtraTimeMinutes(0);
    setIsExtraTime(false);
    extraTimeTriggeredRef.current = false;
    let count = 2;
    const interval = setInterval(() => {
      count--;
      if (count === 1) {
        setCountdown('1');
        SoundManager.playClick();
      } else if (count === 0) {
        setCountdown('⚽ COMEÇOU!');
        SoundManager.playWhistle();
        SoundManager.startCrowd();
        Vibration.vibrate(250); // Vibração curta do apito inicial
        clearInterval(interval);
        setTimeout(() => {
          setCountdown('');
          setIsPlaying(true);
          resetPositions();
          addLog("0' ⏱️ Partida iniciada! Apita o árbitro!");
        }, 800);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
      SoundManager.stopCrowd();
      if (goalTimeoutRef.current) clearTimeout(goalTimeoutRef.current);
      if (logScrollTimeoutRef.current) clearTimeout(logScrollTimeoutRef.current);
    };
  }, []);

  // 2. Loop de Física principal a 60 FPS
  useEffect(() => {
    if (!isPlaying) return;

    let animId: number;
    let lastTime = Date.now();

    const physicsLoop = () => {
      const now = Date.now();
      const delta = (now - lastTime) * currentSpeedMult;
      lastTime = now;

      if (!isGoalCooldownRef.current) {
        // Atualiza relógio do jogo
        gameTimeRef.current += delta;

        // Se o tempo normal acabou e ainda não avaliamos acréscimos
        if (gameTimeRef.current >= matchDuration && !extraTimeTriggeredRef.current) {
          extraTimeTriggeredRef.current = true;

          // Adiciona acréscimos se estiver empatado no tempo normal
          if (score1Ref.current === score2Ref.current) {
            const extraMins = 3 + Math.floor(Math.random() * 3); // +3, +4 ou +5 minutos
            extraTimeMinutesRef.current = extraMins;
            setExtraTimeMinutes(extraMins);
            setIsExtraTime(true);

            addLog(`90' ⏱️ Fim do tempo normal regulamentar! Placar empatado! O árbitro indica +${extraMins} minutos de acréscimo! Pressão total!`);
            SoundManager.playWhistle();
            Vibration.vibrate(400); // Vibração longa de acréscimos
          } else {
            // Se houver um vencedor, encerra
            handleEndMatch();
            return;
          }
        }

        // Calcula a duração extra proporcional
        const extraDuration = matchDuration * (extraTimeMinutesRef.current / 90);
        const totalDurationWithExtra = matchDuration + extraDuration;

        // Fim de jogo real atingido (tempo normal + acréscimos)
        if (gameTimeRef.current >= totalDurationWithExtra) {
          handleEndMatch();
          return;
        }

        // Calcula os minutos exibidos na tela
        let currentMin = 90;
        if (gameTimeRef.current <= matchDuration) {
          currentMin = Math.floor((gameTimeRef.current / matchDuration) * 90);
        } else if (extraDuration > 0) {
          const progressInExtra = (gameTimeRef.current - matchDuration) / extraDuration;
          currentMin = 90 + Math.floor(progressInExtra * extraTimeMinutesRef.current);
        }
        
        const finalLimit = 90 + extraTimeMinutesRef.current;
        const displayMin = Math.min(finalLimit, currentMin);
        if (displayMin !== lastDisplayedMinRef.current) {
          lastDisplayedMinRef.current = displayMin;
          setMatchTime(displayMin);
        }

        // Roda rotação do campo se houver gol marcado
        if (hasFirstGoalRef.current) {
          rotationRef.current = (rotationRef.current + 0.85 * currentSpeedMult) % 360;
          fieldRotAnim.setValue(rotationRef.current);
        }

        // Atualiza física individual
        updateShieldPhysics(shield1Ref.current, rotationRef.current);
        updateShieldPhysics(shield2Ref.current, rotationRef.current);

        // Aplica boost de OVR (puxando shields em direção ao gol rotativo)
        applyOvrBoosts();

        // Checa colisões entre escudos
        if (checkShieldsCollision(shield1Ref.current, shield2Ref.current)) {
          bounceShields(shield1Ref.current, shield2Ref.current);
          SoundManager.playCollision();
        }

        // Checa golos
        if (checkGoalScored(shield1Ref.current, rotationRef.current)) {
          triggerGoal(1);
          animId = requestAnimationFrame(physicsLoop);
          return;
        }
        if (checkGoalScored(shield2Ref.current, rotationRef.current)) {
          triggerGoal(2);
          animId = requestAnimationFrame(physicsLoop);
          return;
        }

        // Atualiza posições na tela
        shield1X.setValue(shield1Ref.current.x - SHIELD_SIZE / 2);
        shield1Y.setValue(shield1Ref.current.y - SHIELD_SIZE / 2);
        shield2X.setValue(shield2Ref.current.x - SHIELD_SIZE / 2);
        shield2Y.setValue(shield2Ref.current.y - SHIELD_SIZE / 2);

        // Trigger de eventos de arbitragem aleatórios a cada 3.5 segundos virtuais
        if (gameTimeRef.current - lastEventTimeRef.current > 3500) {
          triggerRandomMatchEvent(currentMin);
          lastEventTimeRef.current = gameTimeRef.current;
        }
      }

      // Atualiza e processa partículas explosivas de celebração (throttled a cada 4 frames)
      if (particlesRef.current.length > 0) {
        particlesRef.current = particlesRef.current.map(p => {
          const newVx = p.vx * 0.94;
          const newVy = p.vy * 0.94 + 0.12;
          return {
            ...p,
            x: p.x + newVx,
            y: p.y + newVy,
            opacity: Math.max(0, p.opacity - 0.02),
            scale: Math.max(0, p.scale - 0.012),
          };
        }).filter(p => p.opacity > 0 && p.scale > 0);

        particleFrameThrottle.current++;
        if (particleFrameThrottle.current % 4 === 0) {
          setRenderParticles([...particlesRef.current]);
        }
      }

      animId = requestAnimationFrame(physicsLoop);
    };

    animId = requestAnimationFrame(physicsLoop);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, currentSpeedMult]);

  // Função auxiliar para tremer a tela ao fazer gol
  const triggerShake = () => {
    Vibration.vibrate([0, 150, 100, 250]); // Tremor tátil duplo forte no telefone

    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 8, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -8, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 5, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -5, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  };

  const addLog = (text: string) => {
    logsRef.current.push(text);
    setLogs([...logsRef.current]);
    if (logScrollTimeoutRef.current) clearTimeout(logScrollTimeoutRef.current);
    logScrollTimeoutRef.current = setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  // Posiciona os escudos em posições aleatórias e dinâmicas após um gol ou no início
  const resetPositions = () => {
    const centerX = ARENA_SIZE / 2;
    const centerY = ARENA_SIZE / 2;
    const arenaRadius = ARENA_SIZE / 2;
    
    // Raio máximo de spawn seguro para manter os escudos no campo
    const maxSpawnRadius = arenaRadius * 0.65; 

    let s1X = 0, s1Y = 0;
    let s2X = 0, s2Y = 0;
    let valid = false;

    // Tenta encontrar uma posição aleatória sem sobreposição em até 50 tentativas
    for (let attempt = 0; attempt < 50; attempt++) {
      // Coordenadas polares para o Shield 1
      const r1 = Math.random() * maxSpawnRadius;
      const angle1 = Math.random() * Math.PI * 2;
      s1X = centerX + r1 * Math.cos(angle1);
      s1Y = centerY + r1 * Math.sin(angle1);

      // Coordenadas polares para o Shield 2
      const r2 = Math.random() * maxSpawnRadius;
      const angle2 = Math.random() * Math.PI * 2;
      s2X = centerX + r2 * Math.cos(angle2);
      s2Y = centerY + r2 * Math.sin(angle2);

      // Calcula distância linear entre os dois pontos
      const dx = s1X - s2X;
      const dy = s1Y - s2Y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Garante uma distância inicial confortável (mínimo de 1.8x o diâmetro)
      if (distance > SHIELD_SIZE * 1.8) {
        valid = true;
        break;
      }
    }

    // Fallback matemático de segurança para evitar loops infinitos
    if (!valid) {
      s1X = centerX - 45 - Math.random() * 15;
      s1Y = centerY + (Math.random() - 0.5) * 30;
      s2X = centerX + 45 + Math.random() * 15;
      s2Y = centerY + (Math.random() - 0.5) * 30;
    }

    // Direções e velocidades de kickoff totalmente imprevisíveis
    shield1Ref.current = {
      x: s1X,
      y: s1Y,
      vx: (Math.random() > 0.5 ? 1 : -1) * (BASE_SPEED + Math.random() * 2),
      vy: (Math.random() - 0.5) * BASE_SPEED,
    };

    shield2Ref.current = {
      x: s2X,
      y: s2Y,
      vx: (Math.random() > 0.5 ? 1 : -1) * (BASE_SPEED + Math.random() * 2),
      vy: (Math.random() - 0.5) * BASE_SPEED,
    };

    shield1X.setValue(shield1Ref.current.x - SHIELD_SIZE / 2);
    shield1Y.setValue(shield1Ref.current.y - SHIELD_SIZE / 2);
    shield2X.setValue(shield2Ref.current.x - SHIELD_SIZE / 2);
    shield2Y.setValue(shield2Ref.current.y - SHIELD_SIZE / 2);
  };

  const updateShieldPhysics = (shield: ShieldState, currentRotation: number) => {
    const radius = SHIELD_SIZE / 2;
    const arenaRadius = ARENA_SIZE / 2;
    const centerX = arenaRadius;
    const centerY = arenaRadius;

    shield.x += shield.vx;
    shield.y += shield.vy;

    const dx = shield.x - centerX;
    const dy = shield.y - centerY;

    const rad = -currentRotation * Math.PI / 180;
    const rx = dx * Math.cos(rad) - dy * Math.sin(rad);
    const ry = dx * Math.sin(rad) + dy * Math.cos(rad);

    const halfGoalWidth = GOAL_SIZE / 2;
    const inGoalWidth = Math.abs(rx) < halfGoalWidth;

    let effectiveMaxDist = arenaRadius - radius;
    // Permite que entre no gol (parte de trás da trave)
    if (inGoalWidth && ry > 0) {
      effectiveMaxDist = arenaRadius + GOAL_DEPTH - radius;
    }

    const distFromCenter = Math.sqrt(dx * dx + dy * dy);

    if (distFromCenter > effectiveMaxDist) {
      const nx = dx / distFromCenter;
      const ny = dy / distFromCenter;

      shield.x = centerX + nx * effectiveMaxDist;
      shield.y = centerY + ny * effectiveMaxDist;

      // Inversão elástica de velocidade com 2% de ganho elástico
      const dot = shield.vx * nx + shield.vy * ny;
      shield.vx = (shield.vx - 2 * dot * nx) * 1.02;
      shield.vy = (shield.vy - 2 * dot * ny) * 1.02;

      // Adiciona pequeno desvio aleatório no ricochete
      shield.vx += (Math.random() - 0.5) * 1.2;
      shield.vy += (Math.random() - 0.5) * 1.2;
    }

    // Limitador de velocidade dinâmico baseado no Modo Supersônico
    const activeMaxSpeed = supersonicActiveRef.current ? MAX_SPEED * 1.55 : MAX_SPEED;
    const activeMinSpeed = supersonicActiveRef.current ? MIN_SPEED * 1.6 : MIN_SPEED;

    const speed = Math.sqrt(shield.vx * shield.vx + shield.vy * shield.vy);
    if (speed > activeMaxSpeed) {
      shield.vx = (shield.vx / speed) * activeMaxSpeed;
      shield.vy = (shield.vy / speed) * activeMaxSpeed;
    } else if (speed < activeMinSpeed) {
      shield.vx = (shield.vx / speed) * activeMinSpeed;
      shield.vy = (shield.vy / speed) * activeMinSpeed;
    }
  };

  const applyOvrBoosts = () => {
    // 15% de chance por frame de aplicar empuxo de inteligência física
    if (Math.random() < 0.15) {
      const goalCenterX = ARENA_SIZE / 2;
      const goalCenterY = ARENA_SIZE + 10; // Fica localizado no fundo

      const diff = team1Ovr - team2Ovr;
      const influenceFactor = diff * 0.006;

      // Time 1 OVR extra puxa na direção do gol
      if (influenceFactor > 0 && Math.random() < Math.abs(influenceFactor)) {
        const dx = goalCenterX - shield1Ref.current.x;
        const dy = goalCenterY - shield1Ref.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 0) {
          shield1Ref.current.vx += (dx / dist) * 0.28;
          shield1Ref.current.vy += (dy / dist) * 0.28;
        }
      }

      // Time 2 OVR extra puxa na direção do gol
      if (influenceFactor < 0 && Math.random() < Math.abs(influenceFactor)) {
        const dx = goalCenterX - shield2Ref.current.x;
        const dy = goalCenterY - shield2Ref.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 0) {
          shield2Ref.current.vx += (dx / dist) * 0.28;
          shield2Ref.current.vy += (dy / dist) * 0.28;
        }
      }
    }
  };

  const checkShieldsCollision = (s1: ShieldState, s2: ShieldState) => {
    const dx = s1.x - s2.x;
    const dy = s1.y - s2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < SHIELD_SIZE;
  };

  const bounceShields = (s1: ShieldState, s2: ShieldState) => {
    const dx = s2.x - s1.x;
    const dy = s2.y - s1.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance === 0) return;

    const nx = dx / distance;
    const ny = dy / distance;

    const dvx = s1.vx - s2.vx;
    const dvy = s1.vy - s2.vy;
    const velNormal = dvx * nx + dvy * ny;

    if (velNormal <= 0) return;

    let restitution = 1.02;
    const impulse = (-(1 + restitution) * velNormal) / 2;

    s1.vx += impulse * nx;
    s1.vy += impulse * ny;
    s2.vx -= impulse * nx;
    s2.vy -= impulse * ny;

    // Afasta os escudos para prevenir bugs de trancamento
    const overlap = SHIELD_SIZE - distance;
    const correction = overlap * 0.5;
    s1.x -= nx * correction;
    s1.y -= ny * correction;
    s2.x += nx * correction;
    s2.y += ny * correction;
  };

  const checkGoalScored = (shield: ShieldState, currentRotation: number) => {
    const cx = ARENA_SIZE / 2;
    const cy = ARENA_SIZE / 2;
    const dx = shield.x - cx;
    const dy = shield.y - cy;

    const rad = -currentRotation * Math.PI / 180;
    const rx = dx * Math.cos(rad) - dy * Math.sin(rad);
    const ry = dx * Math.sin(rad) + dy * Math.cos(rad);

    const halfGoalWidth = GOAL_SIZE / 2;
    const shieldRadius = SHIELD_SIZE / 2;

    // Se estiver alinhado com a largura do gol e passar da linha de fundo
    if (Math.abs(rx) > halfGoalWidth) return false;
    return ry > ARENA_SIZE / 2 - shieldRadius - 4;
  };

  // 3. Ao marcar gol
  const triggerGoal = (teamScoredNum: number) => {
    isGoalCooldownRef.current = true;
    hasFirstGoalRef.current = true;
    SoundManager.playGoal();
    triggerShake();

    const scorer = teamScoredNum === 1 ? team1 : team2;
    
    if (teamScoredNum === 1) {
      score1Ref.current += 1;
      setScore1(score1Ref.current);
    } else {
      score2Ref.current += 1;
      setScore2(score2Ref.current);
    }

    const newScore1 = score1Ref.current;
    const newScore2 = score2Ref.current;

    setGoalScorer(scorer);

    // Obtém reação cômica e contextual do comentarista
    const currentMin = matchTime;
    const reaction = AICommentator.getGoalReaction(
      teamScoredNum,
      newScore1,
      newScore2,
      currentMin
    );
    setGoalReactionText(reaction);

    // Dispara a animação Spring de Zoom do Banner de Gol
    goalScaleAnim.setValue(0.1);
    Animated.spring(goalScaleAnim, {
      toValue: 1,
      friction: 4,
      tension: 45,
      useNativeDriver: true,
    }).start();

    // Sorteia explosão de 80 partículas neon saindo do centro da comemoração!
    const newParticles = [];
    const startX = width / 2;
    const startY = height / 2 - 40;

    for (let i = 0; i < 80; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 12;
      newParticles.push({
        id: Math.random().toString(),
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: ['#FF007F', '#00FF66', '#00E5FF', '#FFD700', '#CC00FF', '#FF5722'][Math.floor(Math.random() * 6)],
        size: 5 + Math.random() * 8,
        opacity: 1,
        scale: 1 + Math.random() * 1.5,
      });
    }
    particlesRef.current = newParticles;
    setRenderParticles(newParticles);

    setShowGoalOverlay(true);

    addLog(`${currentMin}' ⚽ GOL do ${scorer.shortName}! Rede balançou na Arena! Placar: ${newScore1} x ${newScore2}`);

    // Teleporta os escudos imediatamente para o centro do campo para evitar repetição infinita
    resetPositions();

    if (goalTimeoutRef.current) clearTimeout(goalTimeoutRef.current);
    goalTimeoutRef.current = setTimeout(() => {
      Animated.timing(goalScaleAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start(() => {
        setShowGoalOverlay(false);
        particlesRef.current = [];
        setRenderParticles([]);
        isGoalCooldownRef.current = false;
      });
    }, 2600);
  };

  // 4. Eventos secundários (cartões, VAR, saves)
  const triggerRandomMatchEvent = (minutes: number) => {
    // Escolhe baseado em pesos aleatórios
    const rand = Math.random();
    let cumulative = 0;
    let selectedEvent = MATCH_EVENTS[MATCH_EVENTS.length - 1]; // fallback normal match flow

    for (const ev of MATCH_EVENTS) {
      cumulative += ev.weight;
      if (rand < cumulative) {
        selectedEvent = ev;
        break;
      }
    }

    if (selectedEvent.type === 'nothing') return;

    // Sorteia o clube afetado
    const affectedTeam = Math.random() > 0.5 ? team1 : team2;
    const eventText = selectedEvent.text(affectedTeam);

    addLog(`${minutes}' ${eventText}`);

    // Se for cartão vermelho, altera força física
    if (selectedEvent.type === 'card' && eventText.includes('🟥')) {
      if (affectedTeam.id === team1.id) {
        shield1Ref.current.vx *= 0.65;
        shield1Ref.current.vy *= 0.65;
      } else {
        shield2Ref.current.vx *= 0.65;
        shield2Ref.current.vy *= 0.65;
      }
    }
  };

  // 5. Encerramento da partida
  const handleEndMatch = () => {
    setIsPlaying(false);
    SoundManager.playWhistle();
    SoundManager.stopCrowd();
    Vibration.vibrate([0, 150, 100, 150, 100, 450]); // Apito final triplo (curto, curto, longo)

    const finalScore1 = score1Ref.current;
    const finalScore2 = score2Ref.current;

    // Determina se houve virada
    let wasTurnaround = false;
    if (finalScore1 > finalScore2 && logsRef.current.some(l => l.includes(`GOL do ${team2.shortName}`) && l.includes('Placar: 0 x 1'))) {
      wasTurnaround = true;
    } else if (finalScore2 > finalScore1 && logsRef.current.some(l => l.includes(`GOL do ${team1.shortName}`) && l.includes('Placar: 1 x 0'))) {
      wasTurnaround = true;
    }

    const hadLateGoal = logsRef.current.some(l => {
      const match = l.match(/^(\d+)'/);
      return match && parseInt(match[1]) >= 80 && l.includes('⚽ GOL');
    });

    onMatchFinish(finalScore1, finalScore2, logsRef.current, wasTurnaround, hadLateGoal);
  };

  return (
    <Animated.View style={[styles.container, { transform: [{ translateX: shakeAnim }] }]}>
      {/* Space gradient background */}
      <LinearGradient
        colors={['#060814', '#020308']}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Top ambient lights */}
      <View style={styles.glowTop} />

      {/* Scoreboard panel (Slanted Glass TV Broadcast Scoreboard) */}
      <View style={styles.scoreboard}>
        {/* Neon Connecting Line behind */}
        <View style={styles.scoreConnectLine} />

        {/* Left Team (Slanted Purple Banner) */}
        <View style={styles.slantedBannerWrapper}>
          <LinearGradient
            colors={['rgba(123, 31, 162, 0.75)', 'rgba(74, 20, 140, 0.9)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.slantedBanner}
          >
            <View style={styles.slantedBannerContent}>
              <ScoreboardCrest team={team1} />
              <View style={styles.slantedOvrBadge}>
                <Text style={styles.slantedOvrText}>{team1Ovr}</Text>
              </View>
            </View>
          </LinearGradient>
          <Text style={styles.slantedTeamName} numberOfLines={1}>{team1.name.toUpperCase()}</Text>
        </View>

        {/* Center score box with circular time dial */}
        <View style={styles.centerScoreBox}>
          <Text style={styles.scoreText}>{score1}</Text>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <View style={styles.timeDialCircle}>
              <Text style={styles.timeDialText}>{matchTime}</Text>
            </View>
            {isExtraTime && (
              <Animated.View style={styles.extraTimeBadge}>
                <Text style={styles.extraTimeText}>+{extraTimeMinutes}</Text>
              </Animated.View>
            )}
          </View>
          <Text style={styles.scoreText}>{score2}</Text>
        </View>

        {/* Right Team (Slanted Blue Banner) */}
        <View style={styles.slantedBannerWrapper}>
          <LinearGradient
            colors={['rgba(0, 145, 234, 0.75)', 'rgba(0, 91, 150, 0.9)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.slantedBanner}
          >
            <View style={styles.slantedBannerContent}>
              <ScoreboardCrest team={team2} />
              <View style={styles.slantedOvrBadge}>
                <Text style={styles.slantedOvrText}>{team2Ovr}</Text>
              </View>
            </View>
          </LinearGradient>
          <Text style={styles.slantedTeamName} numberOfLines={1}>{team2.name.toUpperCase()}</Text>
        </View>
      </View>

      {/* Cyberpunk HUD Energy Bar */}
      <View style={styles.hudEnergyWrapper}>
        <View style={styles.hudEnergyLabelRow}>
          <Text style={styles.hudEnergyText}>{supersonicActive ? '⚡ ALERTA: MODO SUPERSÔNICO ATIVO!' : '⚡ ENERGIA DA ARENA'}</Text>
          <Text style={[styles.hudEnergyPercentText, supersonicActive && { color: '#FF007F' }]}>
            {supersonicActive ? '🚨 SOBRECARGA 🚨' : `${Math.round(energy)}%`}
          </Text>
        </View>
        <View style={styles.hudEnergyTrack}>
          <View
            style={[
              styles.hudEnergyFill,
              {
                width: `${energy}%`,
                backgroundColor: supersonicActive ? '#FF007F' : '#00FF66',
              },
            ]}
          />
        </View>
      </View>

      {/* Physics Field Container */}
      <View style={[styles.arenaContainer, supersonicActive && styles.arenaContainerSupersonic]}>
        <View style={styles.arenaBorder}>
          {/* Campo de Futebol Circular */}
          <View style={styles.fieldPitch}>
            {/* Linhas demarcatórias rotativas */}
            <Animated.View
              style={[
                styles.fieldLinesContainer,
                { transform: [{ rotate: fieldRotInterpolated }] },
              ]}
            >
              {/* Linha Central */}
              <View style={styles.centerLine} />
              {/* Círculo Central */}
              <View style={styles.centerCircle} />
              {/* Trave Net (Fica embaixo do campo) */}
              <View style={styles.goalBox}>
                <View style={styles.goalLine} />
              <View style={styles.goalNet} />
            </View>
            </Animated.View>

            {/* Escudos Bouncing com Animated (UI thread, sem re-render) */}
            <Animated.View style={[styles.shieldSprite, { transform: [{ translateX: shield1X }, { translateY: shield1Y }] }]}>
              <TeamShield team={team1} size="sm" />
            </Animated.View>

            <Animated.View style={[styles.shieldSprite, { transform: [{ translateX: shield2X }, { translateY: shield2Y }] }]}>
              <TeamShield team={team2} size="sm" />
            </Animated.View>
          </View>
        </View>
      </View>

      {/* Speed Controls bar */}
      <View style={styles.controlsRow}>
        <TouchableOpacity
          style={[styles.speedBtn, currentSpeedMult === 1 && styles.speedBtnActive]}
          onPress={() => { SoundManager.playClick(); setCurrentSpeedMult(1); }}
          activeOpacity={0.8}
        >
          {currentSpeedMult === 1 ? (
            <LinearGradient
              colors={['rgba(0, 229, 255, 0.25)', 'rgba(0, 229, 255, 0.08)']}
              style={styles.speedBtnGradient}
            >
              <Text style={[styles.speedBtnText, styles.speedBtnTextActive, { color: '#00E5FF' }]}>1x Normal</Text>
            </LinearGradient>
          ) : (
            <Text style={styles.speedBtnText}>1x</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.speedBtn, currentSpeedMult === 2 && styles.speedBtnActive]}
          onPress={() => { SoundManager.playClick(); setCurrentSpeedMult(2); }}
          activeOpacity={0.8}
        >
          {currentSpeedMult === 2 ? (
            <LinearGradient
              colors={['rgba(255, 215, 0, 0.25)', 'rgba(255, 215, 0, 0.08)']}
              style={styles.speedBtnGradient}
            >
              <Text style={[styles.speedBtnText, styles.speedBtnTextActive, { color: '#FFD700' }]}>2x Rápido</Text>
            </LinearGradient>
          ) : (
            <Text style={styles.speedBtnText}>2x</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.speedBtn, currentSpeedMult === 4 && styles.speedBtnActive]}
          onPress={() => { SoundManager.playClick(); setCurrentSpeedMult(4); }}
          activeOpacity={0.8}
        >
          {currentSpeedMult === 4 ? (
            <LinearGradient
              colors={['rgba(0, 255, 102, 0.25)', 'rgba(0, 255, 102, 0.08)']}
              style={styles.speedBtnGradient}
            >
              <Text style={[styles.speedBtnText, styles.speedBtnTextActive, { color: '#00FF66' }]}>4x Turbo</Text>
            </LinearGradient>
          ) : (
            <Text style={styles.speedBtnText}>4x Turbo</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Live Narration Scroll Feed */}
      <View style={styles.narrationFeed}>
        <View style={styles.narrationHeaderRow}>
          <Text style={styles.narrationHeader}>🎙️ COBERTURA EM TEMPO REAL</Text>
          <View style={styles.liveIndicator}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>AO VIVO</Text>
          </View>
        </View>
        <ScrollView ref={scrollRef} style={styles.narrationScroll} showsVerticalScrollIndicator={false}>
          {logs.map((log, index) => {
            const isGoal = log.includes('⚽ GOL');
            const isRedCard = log.includes('🟥');
            const isYellowCard = log.includes('🟨');

            return (
              <View
                key={index}
                style={[
                  styles.narrationRow,
                  isGoal && styles.narrationGoalRow,
                  isRedCard && styles.narrationRedRow,
                ]}
              >
                <Text
                  style={[
                    styles.narrationLog,
                    isGoal && styles.narrationGoalText,
                    isRedCard && { color: '#FF3B30', fontWeight: 'bold' },
                    isYellowCard && { color: '#FFCC00', fontWeight: 'bold' },
                  ]}
                >
                  {log}
                </Text>
              </View>
            );
          })}
        </ScrollView>
      </View>

      {/* Forfeit cancel button */}
      <TouchableOpacity style={styles.cancelBtn} onPress={onCancel} activeOpacity={0.8}>
        <Text style={styles.cancelBtnText}>🏳️ Abandonar Partida</Text>
      </TouchableOpacity>

      {/* Initial Countdown screen lock */}
      {countdown !== '' && (
        <View style={styles.countdownOverlay}>
          <LinearGradient
            colors={['#0F1326', '#060814']}
            style={styles.countdownBox}
          >
            <Text style={styles.countdownTitle}>FUTARENA 2026</Text>
            <View style={styles.countdownDivider} />
            <Text style={styles.countdownText}>{countdown}</Text>
          </LinearGradient>
        </View>
      )}

      {/* Goal Overlay Overlay */}
      {showGoalOverlay && goalScorer && (
        <View style={styles.goalOverlay}>
          <LinearGradient
            colors={['rgba(3, 6, 18, 0.97)', 'rgba(0, 0, 0, 0.99)']}
            style={StyleSheet.absoluteFillObject}
          />

          {/* Renderização de Partículas de Explosão a 60 FPS */}
          {renderParticles.map((p) => (
            <View
              key={p.id}
              style={[
                styles.goalParticle,
                {
                  left: p.x,
                  top: p.y,
                  width: p.size,
                  height: p.size,
                  borderRadius: p.size / 2,
                  backgroundColor: p.color,
                  opacity: p.opacity,
                  transform: [{ scale: p.scale }],
                },
              ]}
            />
          ))}

          <Animated.View style={[styles.goalModalContent, { transform: [{ scale: goalScaleAnim }] }]}>
            <Text style={styles.goalBannerTitle}>GOOOOOOL!!! ⚽</Text>
            <View style={[styles.goalShieldWrapper, { shadowColor: goalScorer.primaryColor }]}>
              <TeamShield team={goalScorer} size="xl" />
            </View>
            <Text style={styles.goalBannerTeamName}>{goalScorer.name.toUpperCase()}</Text>
            <View style={styles.commentaryBalloon}>
              <Text style={styles.commentaryText}>🎙️ "{goalReactionText}"</Text>
            </View>
          </Animated.View>
        </View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 54,
    paddingHorizontal: 16,
  },
  glowTop: {
    position: 'absolute',
    top: -100,
    alignSelf: 'center',
    width: width * 0.9,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(0, 255, 102, 0.04)',
  },
  scoreboard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 72,
    position: 'relative',
    marginBottom: 20,
    zIndex: 10,
  },
  scoreConnectLine: {
    position: 'absolute',
    top: 24,
    left: 40,
    right: 40,
    height: 2,
    backgroundColor: '#00E5FF',
    shadowColor: '#00E5FF',
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 4,
    zIndex: 1,
  },
  slantedBannerWrapper: {
    width: '32%',
    alignItems: 'center',
  },
  slantedBanner: {
    width: '100%',
    height: 48,
    borderWidth: 1.2,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 8,
    transform: [{ skewX: '-20deg' }],
    overflow: 'hidden',
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  slantedBannerContent: {
    transform: [{ skewX: '20deg' }],
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  slantedOvrBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
    borderRadius: 5,
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  slantedOvrText: {
    color: '#FFD700',
    fontSize: 9,
    fontWeight: '900',
  },
  slantedTeamName: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '900',
    marginTop: 6,
    textAlign: 'center',
    letterSpacing: 1,
    width: '100%',
  },
  centerScoreBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(3, 8, 20, 0.88)',
    borderWidth: 1.5,
    borderColor: 'rgba(0, 229, 255, 0.25)',
    borderRadius: 14,
    paddingVertical: 6,
    paddingHorizontal: 16,
    shadowColor: '#00E5FF',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
    zIndex: 3,
  },
  scoreText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  timeDialCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#02040a',
    borderWidth: 2,
    borderColor: '#00E5FF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#00E5FF',
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 4,
    marginHorizontal: 10,
  },
  timeDialText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
  },
  hudEnergyWrapper: {
    width: ARENA_SIZE + 24,
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  hudEnergyLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  hudEnergyText: {
    color: '#8E9AA8',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  hudEnergyPercentText: {
    color: '#00FF66',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
  },
  hudEnergyTrack: {
    width: '100%',
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 3,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.03)',
  },
  hudEnergyFill: {
    height: '100%',
    borderRadius: 3,
  },
  arenaContainerSupersonic: {
    borderColor: '#FF007F',
    shadowColor: '#FF007F',
    shadowOpacity: 0.55,
    shadowRadius: 28,
    elevation: 12,
  },
  arenaContainer: {
    width: ARENA_SIZE + 24,
    height: ARENA_SIZE + 24,
    backgroundColor: 'rgba(22, 28, 54, 0.25)',
    borderRadius: (ARENA_SIZE + 24) / 2,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#00FF66',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 24,
    elevation: 8,
    marginBottom: 16,
  },
  arenaBorder: {
    width: ARENA_SIZE + 6,
    height: ARENA_SIZE + 6,
    borderRadius: (ARENA_SIZE + 6) / 2,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
  },
  fieldPitch: {
    width: ARENA_SIZE,
    height: ARENA_SIZE,
    backgroundColor: '#07180D',
    borderRadius: ARENA_SIZE / 2,
    position: 'relative',
  },
  fieldLinesContainer: {
    width: ARENA_SIZE,
    height: ARENA_SIZE,
    borderRadius: ARENA_SIZE / 2,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerLine: {
    width: '100%',
    height: 1.5,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    position: 'absolute',
  },
  centerCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    position: 'absolute',
  },
  goalBox: {
    position: 'absolute',
    bottom: -1,
    width: GOAL_SIZE,
    height: GOAL_DEPTH + 10,
    alignItems: 'center',
  },
  goalLine: {
    width: GOAL_SIZE,
    height: 2,
    backgroundColor: '#FFFFFF',
  },
  goalNet: {
    width: GOAL_SIZE - 4,
    height: GOAL_DEPTH + 4,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  shieldSprite: {
    position: 'absolute',
    width: SHIELD_SIZE,
    height: SHIELD_SIZE,
  },
  controlsRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 10,
    marginBottom: 14,
  },
  speedBtn: {
    flex: 1,
    height: 40,
    backgroundColor: 'rgba(22, 28, 54, 0.45)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  speedBtnActive: {
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  speedBtnGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  speedBtnText: {
    color: '#8E9AA8',
    fontSize: 12,
    fontWeight: '800',
  },
  speedBtnTextActive: {
    fontWeight: '900',
  },
  narrationFeed: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(22, 28, 54, 0.45)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 20,
    padding: 14,
    marginBottom: 14,
  },
  narrationHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    paddingBottom: 8,
  },
  narrationHeader: {
    color: '#FFD700',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF3B30',
  },
  liveText: {
    color: '#FF3B30',
    fontSize: 8,
    fontWeight: '900',
  },
  narrationScroll: {
    flex: 1,
  },
  narrationRow: {
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.02)',
  },
  narrationGoalRow: {
    backgroundColor: 'rgba(0, 255, 102, 0.04)',
    borderColor: 'rgba(0, 255, 102, 0.1)',
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  narrationRedRow: {
    backgroundColor: 'rgba(255, 59, 48, 0.04)',
    borderColor: 'rgba(255, 59, 48, 0.1)',
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  narrationLog: {
    color: '#D2D9E5',
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '500',
  },
  narrationGoalText: {
    color: '#00FF66',
    fontWeight: '900',
  },
  cancelBtn: {
    width: '100%',
    paddingVertical: 14,
    backgroundColor: 'rgba(255, 59, 48, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 59, 48, 0.2)',
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 20,
  },
  cancelBtnText: {
    color: '#FF3B30',
    fontSize: 13,
    fontWeight: '800',
  },
  countdownOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(2, 3, 8, 0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  countdownBox: {
    width: '80%',
    padding: 30,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 215, 0, 0.15)',
    alignItems: 'center',
  },
  countdownTitle: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 4,
  },
  countdownDivider: {
    width: 40,
    height: 2,
    backgroundColor: '#FFD700',
    marginVertical: 16,
    borderRadius: 1,
  },
  countdownText: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '900',
    textAlign: 'center',
  },
  goalOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 200,
  },
  goalParticle: {
    position: 'absolute',
    zIndex: 201,
  },
  goalModalContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  goalShieldWrapper: {
    borderRadius: 60,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 15,
    backgroundColor: '#060814',
    padding: 10,
    marginBottom: 16,
  },
  goalBannerTitle: {
    color: '#FFD700',
    fontSize: 42,
    fontWeight: '900',
    marginBottom: 24,
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 6,
  },
  goalBannerTeamName: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: 1,
  },
  commentaryBalloon: {
    backgroundColor: 'rgba(22, 28, 54, 0.7)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 215, 0, 0.25)',
    borderRadius: 18,
    padding: 16,
    width: '85%',
    marginTop: 24,
    shadowColor: '#FFD700',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  commentaryText: {
    color: '#FFD700',
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 19,
    fontStyle: 'italic',
  },
  extraTimeBadge: {
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2.5,
    marginTop: 6,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    shadowColor: '#FF3B30',
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
    position: 'absolute',
    bottom: -22,
    zIndex: 10,
  },
  extraTimeText: {
    color: '#FFFFFF',
    fontSize: 9.5,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  scoreboardCrestImage: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
  },
  scoreboardCrestFallback: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900' as const,
    letterSpacing: 0.5,
  },
});
