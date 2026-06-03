import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import MenuScreen from './src/screens/MenuScreen';
import SelectionScreen from './src/screens/SelectionScreen';
import ArcadeDashboardScreen from './src/screens/ArcadeDashboardScreen';
import MatchScreen from './src/screens/MatchScreen';
import ResultScreen from './src/screens/ResultScreen';
import ChampionScreen from './src/screens/ChampionScreen';
import StatsScreen from './src/screens/StatsScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import { Team, Standings, RoundMatch } from './src/types';
import {
  generateLeagueSchedule,
  initializeStandings,
  updateStandingsWithResult,
  simulateCpuMatch,
} from './src/tournament';
import { StorageManager } from './src/storage';
import { findTeamById, getLeagueTeams } from './src/teams';
import { SoundManager } from './src/sound';

type Screen =
  | 'menu'
  | 'selection'
  | 'arcade_dashboard'
  | 'match'
  | 'result'
  | 'champion'
  | 'history'
  | 'stats';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('menu');
  const [gameMode, setGameMode] = useState<'quick' | 'arcade' | 'worldcup'>('quick');

  // Seleções e Partida Ativa
  const [selectedTeams, setSelectedTeams] = useState<Team[]>([]);
  const [userTeam, setUserTeam] = useState<Team | null>(null);
  const [activeMatch, setActiveMatch] = useState<{
    team1: Team;
    team2: Team;
    team1Ovr: number;
    team2Ovr: number;
  } | null>(null);

  // Campeonato / Campanha State
  const [currentLeague, setCurrentLeague] = useState('brasileirao');
  const [currentRound, setCurrentRound] = useState(0);
  const [schedule, setSchedule] = useState<RoundMatch[][]>([]);
  const [standings, setStandings] = useState<Standings>({});
  const [coins, setCoins] = useState(150); // Moedas iniciais de incentivo
  const [overallBoosts, setOverallBoosts] = useState<Record<string, number>>({});

  // Partida Concluída Result State
  const [matchResult, setMatchResult] = useState<{
    score1: number;
    score2: number;
    wasTurnaround: boolean;
    hadLateGoal: boolean;
  } | null>(null);

  // Campanha Salva Info
  const [hasSavedProgress, setHasSavedProgress] = useState(false);
  const [savedProgressInfo, setSavedProgressInfo] = useState('');

  // 1. Carrega salvamentos ao iniciar
  useEffect(() => {
    SoundManager.init();
    checkSavedCampaign();
  }, []);

  const checkSavedCampaign = async () => {
    try {
      const saved = await StorageManager.getArcadeProgress();
      if (saved) {
        const team = findTeamById(saved.userTeamId);
        if (team && saved.currentRound < saved.schedule.length) {
          setHasSavedProgress(true);
          setSavedProgressInfo(
            `Rodada ${saved.currentRound + 1}/${saved.schedule.length} com ${team.name}`
          );
        } else {
          setHasSavedProgress(false);
          await StorageManager.clearArcadeProgress();
        }
      } else {
        setHasSavedProgress(false);
      }
    } catch (error) {
      if (__DEV__) console.warn("StorageManager error during startup checkSavedCampaign:", error);
      setHasSavedProgress(false);
    }
  };

  // 2. Transições e Seleções de Modos
  const handleStartGameMode = (mode: 'quick' | 'arcade' | 'worldcup') => {
    setGameMode(mode);
    setSelectedTeams([]);
    setCurrentScreen('selection');
  };

  const handleContinueArcade = async () => {
    const saved = await StorageManager.getArcadeProgress();
    if (saved) {
      const team = findTeamById(saved.userTeamId);
      if (team) {
        setGameMode(saved.currentLeague === 'worldcup' ? 'worldcup' : 'arcade');
        setUserTeam(team);
        setCurrentLeague(saved.currentLeague);
        setCurrentRound(saved.currentRound);
        setSchedule(saved.schedule);
        setStandings(saved.standings);
        setCoins(saved.coins);
        setOverallBoosts(saved.overallBoosts);
        setCurrentScreen('arcade_dashboard');
      }
    }
  };

  const handleSelectTeams = async (teams: Team[], leagueId: string) => {
    if (gameMode === 'quick') {
      // Partida rápida inicia imediatamente
      setActiveMatch({
        team1: teams[0],
        team2: teams[1],
        team1Ovr: teams[0].overall,
        team2Ovr: teams[1].overall,
      });
      setCurrentScreen('match');
    } else {
      // Modos Campeonato ou Copa do Mundo geram nova tabela
      const team = teams[0];
      setUserTeam(team);

      const leagueTeams = getLeagueTeams(leagueId);
      const teamIds = leagueTeams.map(t => t.id);

      const newSchedule = generateLeagueSchedule(teamIds);
      const newStandings = initializeStandings(teamIds);
      const initialBoosts: Record<string, number> = {};
      teamIds.forEach(id => {
        initialBoosts[id] = 0;
      });

      setCurrentLeague(leagueId);
      setCurrentRound(0);
      setSchedule(newSchedule);
      setStandings(newStandings);
      setCoins(150);
      setOverallBoosts(initialBoosts);

      // Salva imediatamente no banco local
      await StorageManager.saveArcadeProgress({
        userTeamId: team.id,
        currentRound: 0,
        currentLeague: leagueId,
        schedule: newSchedule,
        standings: newStandings,
        coins: 150,
        overallBoosts: initialBoosts,
      });

      setHasSavedProgress(true);
      setSavedProgressInfo(`Rodada 1/${newSchedule.length} com ${team.name}`);
      setCurrentScreen('arcade_dashboard');
    }
  };

  // 3. Melhorar OVR do time
  const handleUpgradeTeam = async () => {
    if (!userTeam) return;
    const currentBoost = overallBoosts[userTeam.id] || 0;
    const cost = 100 + currentBoost * 50;

    if (coins >= cost) {
      const newCoins = coins - cost;
      const newBoosts = {
        ...overallBoosts,
        [userTeam.id]: currentBoost + 1,
      };

      setCoins(newCoins);
      setOverallBoosts(newBoosts);

      await StorageManager.saveArcadeProgress({
        userTeamId: userTeam.id,
        currentRound,
        currentLeague,
        schedule,
        standings,
        coins: newCoins,
        overallBoosts: newBoosts,
      });
      SoundManager.playWhistle();
    }
  };

  // 4. Iniciar rodada manual
  const handlePlayMatch = () => {
    if (!userTeam) return;
    const roundMatches = schedule[currentRound] || [];
    const userMatch = roundMatches.find(
      m => m.home === userTeam.id || m.away === userTeam.id
    );

    if (userMatch) {
      const isHome = userMatch.home === userTeam.id;
      const opponentId = isHome ? userMatch.away : userMatch.home;
      const opponent = findTeamById(opponentId);

      if (opponent) {
        const userBoost = overallBoosts[userTeam.id] || 0;
        const oppBoost = overallBoosts[opponent.id] || 0;

        setActiveMatch({
          team1: isHome ? userTeam : opponent,
          team2: isHome ? opponent : userTeam,
          team1Ovr: isHome ? userTeam.overall + userBoost : opponent.overall + oppBoost,
          team2Ovr: isHome ? opponent.overall + oppBoost : userTeam.overall + userBoost,
        });
        setCurrentScreen('match');
      }
    }
  };

  // 5. Simular CPU Automaticamente
  const handleAutoSimulateRound = async () => {
    if (!userTeam) return;
    const roundMatches = schedule[currentRound] || [];
    let updatedStandings = { ...standings };
    const updatedSchedule = [...schedule];

    let userScoreHome = 0;
    let userScoreAway = 0;
    let userMatchDetails: RoundMatch | null = null;

    // Simula todas as partidas da rodada de forma virtual
    const simulatedMatches = roundMatches.map(m => {
      const homeTeam = findTeamById(m.home);
      const awayTeam = findTeamById(m.away);
      if (!homeTeam || !awayTeam) return m;

      const homeBoost = overallBoosts[m.home] || 0;
      const awayBoost = overallBoosts[m.away] || 0;

      const { homeGoals, awayGoals } = simulateCpuMatch(
        homeTeam.overall + homeBoost,
        awayTeam.overall + awayBoost
      );

      updatedStandings = updateStandingsWithResult(
        updatedStandings,
        m.home,
        m.away,
        homeGoals,
        awayGoals
      );

      if (m.home === userTeam.id || m.away === userTeam.id) {
        userScoreHome = homeGoals;
        userScoreAway = awayGoals;
        userMatchDetails = { ...m, played: true, scoreHome: homeGoals, scoreAway: awayGoals };
      }

      return {
        ...m,
        played: true,
        scoreHome: homeGoals,
        scoreAway: awayGoals,
      };
    });

    updatedSchedule[currentRound] = simulatedMatches;

    // Calcula moedas ganhas pelo jogador na simulação rápida
    const isHome = userMatchDetails
      ? (userMatchDetails as RoundMatch).home === userTeam.id
      : true;
    const userGoals = isHome ? userScoreHome : userScoreAway;
    const oppGoals = isHome ? userScoreAway : userScoreHome;

    let earnedCoins = 50; // base
    if (userGoals > oppGoals) earnedCoins += 100 + (userGoals - oppGoals) * 20;
    else if (userGoals === oppGoals) earnedCoins += 30;
    earnedCoins += userGoals * 10;

    const newCoins = coins + earnedCoins;

    setStandings(updatedStandings);
    setSchedule(updatedSchedule);
    setCoins(newCoins);

    // Salva progresso da simulação
    const nextRound = currentRound + 1;
    setCurrentRound(nextRound);

    await StorageManager.saveArcadeProgress({
      userTeamId: userTeam.id,
      currentRound: nextRound,
      currentLeague,
      schedule: updatedSchedule,
      standings: updatedStandings,
      coins: newCoins,
      overallBoosts,
    });

    // Registra partida no histórico geral
    const oppId = isHome
      ? (userMatchDetails as any).away
      : (userMatchDetails as any).home;
    const opponent = findTeamById(oppId);
    await StorageManager.addMatch({
      team1: userTeam.id,
      team1Name: userTeam.shortName,
      team2: opponent ? opponent.id : 'CPU',
      team2Name: opponent ? opponent.shortName : 'CPU',
      score1: userGoals,
      score2: oppGoals,
      date: new Date().toLocaleString(),
    });

    // Checa campeão
    if (nextRound >= schedule.length) {
      handleCheckChampion(updatedStandings);
    } else {
      setSavedProgressInfo(`Rodada ${nextRound + 1}/${schedule.length} com ${userTeam.name}`);
      // Mostra overlay de simulação rápida informando moedas
      setMatchResult({
        score1: userScoreHome,
        score2: userScoreAway,
        wasTurnaround: false,
        hadLateGoal: false,
      });
      // Força time1 e time2 temporários para a tela de resultado
      const opponent = findTeamById(isHome ? roundMatches.find(m => m.home === userTeam.id)?.away || '' : roundMatches.find(m => m.away === userTeam.id)?.home || '');
      if (opponent) {
        setActiveMatch({
          team1: isHome ? userTeam : opponent,
          team2: isHome ? opponent : userTeam,
          team1Ovr: userTeam.overall,
          team2Ovr: opponent.overall,
        });
      }
      setCurrentScreen('result');
    }
  };

  // 6. Conclusão da partida manual
  const handleMatchFinish = async (
    score1: number,
    score2: number,
    logs: string[],
    wasTurnaround: boolean,
    hadLateGoal: boolean
  ) => {
    if (!activeMatch) return;

    setMatchResult({ score1, score2, wasTurnaround, hadLateGoal });

    if (gameMode === 'quick') {
      // Registra no histórico global
      await StorageManager.addMatch({
        team1: activeMatch.team1.id,
        team1Name: activeMatch.team1.shortName,
        team2: activeMatch.team2.id,
        team2Name: activeMatch.team2.shortName,
        score1,
        score2,
        date: new Date().toLocaleString(),
      });
      setCurrentScreen('result');
    } else {
      // Modo Campanha: Registra partida do jogador + simula o restante da rodada
      if (!userTeam) return;
      let updatedStandings = { ...standings };
      const updatedSchedule = [...schedule];
      const roundMatches = schedule[currentRound] || [];

      const simulatedMatches = roundMatches.map(m => {
        const isUserMatch = m.home === userTeam.id || m.away === userTeam.id;

        if (isUserMatch) {
          // Atualiza com o placar manual jogado
          updatedStandings = updateStandingsWithResult(
            updatedStandings,
            m.home,
            m.away,
            score1,
            score2
          );
          return {
            ...m,
            played: true,
            scoreHome: score1,
            scoreAway: score2,
          };
        } else {
          // Simula CPU adversários em background
          const homeTeam = findTeamById(m.home);
          const awayTeam = findTeamById(m.away);
          const homeBoost = overallBoosts[m.home] || 0;
          const awayBoost = overallBoosts[m.away] || 0;

          if (homeTeam && awayTeam) {
            const { homeGoals, awayGoals } = simulateCpuMatch(
              homeTeam.overall + homeBoost,
              awayTeam.overall + awayBoost
            );
            updatedStandings = updateStandingsWithResult(
              updatedStandings,
              m.home,
              m.away,
              homeGoals,
              awayGoals
            );
            return {
              ...m,
              played: true,
              scoreHome: homeGoals,
              scoreAway: awayGoals,
            };
          }
          return m;
        }
      });

      updatedSchedule[currentRound] = simulatedMatches;

      // Incrementa moedas do jogador
      const isHome = roundMatches.find(m => m.home === userTeam.id) !== undefined;
      const userGoals = isHome ? score1 : score2;
      const oppGoals = isHome ? score2 : score1;

      let earnedCoins = 50; // taxa base
      if (userGoals > oppGoals) earnedCoins += 100 + (userGoals - oppGoals) * 20;
      else if (userGoals === oppGoals) earnedCoins += 30;
      earnedCoins += userGoals * 10;

      const newCoins = coins + earnedCoins;

      setStandings(updatedStandings);
      setSchedule(updatedSchedule);
      setCoins(newCoins);

      // Registra partida no histórico global
      const oppId = isHome
        ? roundMatches.find(m => m.home === userTeam.id)?.away || ''
        : roundMatches.find(m => m.away === userTeam.id)?.home || '';
      const opponent = findTeamById(oppId);
      await StorageManager.addMatch({
        team1: userTeam.id,
        team1Name: userTeam.shortName,
        team2: opponent ? opponent.id : 'CPU',
        team2Name: opponent ? opponent.shortName : 'CPU',
        score1: userGoals,
        score2: oppGoals,
        date: new Date().toLocaleString(),
      });

      // Salva no AsyncStorage
      const nextRound = currentRound + 1;
      await StorageManager.saveArcadeProgress({
        userTeamId: userTeam.id,
        currentRound: nextRound,
        currentLeague,
        schedule: updatedSchedule,
        standings: updatedStandings,
        coins: newCoins,
        overallBoosts,
      });

      setCurrentScreen('result');
    }
  };

  // 7. Avança Rodada ou Encerra no Resultado
  const handleResultNext = async () => {
    if (gameMode === 'quick') {
      // Revanche reinicia a partida rápida
      if (activeMatch) {
        setMatchResult(null);
        setCurrentScreen('match');
      }
    } else {
      // Avança a rodada no campeonato
      const nextRound = currentRound + 1;
      setCurrentRound(nextRound);

      if (nextRound >= schedule.length) {
        handleCheckChampion(standings);
      } else {
        if (userTeam) {
          setSavedProgressInfo(`Rodada ${nextRound + 1}/${schedule.length} com ${userTeam.name}`);
        }
        setCurrentScreen('arcade_dashboard');
      }
    }
  };

  const handleCheckChampion = (finalStandings: Standings) => {
    // Determina o primeiro colocado da tabela
    const sorted = Object.entries(finalStandings)
      .map(([id, stats]) => ({ id, ...stats }))
      .sort((a, b) => b.p - a.p || b.sg - a.sg);

    const winnerId = sorted[0].id;
    const winnerTeam = findTeamById(winnerId);

    if (winnerTeam) {
      setUserTeam(winnerTeam);
      // Apaga o campeonato do storage pois foi finalizado
      StorageManager.clearArcadeProgress().then(() => {
        setHasSavedProgress(false);
        setCurrentScreen('champion');
      });
    }
  };

  const handleFinishCampaign = () => {
    setCurrentScreen('menu');
  };

  // Nav auxiliares
  const handleBackToMenu = () => {
    SoundManager.playClick();
    checkSavedCampaign();
    setCurrentScreen('menu');
  };

  // 8. Renderizador de Telas Rígido
  return (
    <View style={styles.appContainer}>
      {currentScreen === 'menu' && (
        <MenuScreen
          onStartGameMode={handleStartGameMode}
          onContinueArcade={handleContinueArcade}
          onViewStats={() => setCurrentScreen('stats')}
          onViewHistory={() => setCurrentScreen('history')}
          hasSavedProgress={hasSavedProgress}
          savedProgressInfo={savedProgressInfo}
          onDeleteSavedProgress={async () => {
            await StorageManager.clearArcadeProgress();
            setHasSavedProgress(false);
            setSavedProgressInfo('');
          }}
        />
      )}

      {currentScreen === 'selection' && (
        <SelectionScreen
          mode={gameMode}
          onBack={handleBackToMenu}
          onSelectTeams={handleSelectTeams}
        />
      )}

      {currentScreen === 'arcade_dashboard' && userTeam && (
        <ArcadeDashboardScreen
          userTeam={userTeam}
          currentRound={currentRound}
          totalRounds={schedule.length}
          currentLeague={currentLeague}
          standings={standings}
          schedule={schedule}
          coins={coins}
          overallBoosts={overallBoosts[userTeam.id] || 0}
          onBack={handleBackToMenu}
          onPlayMatch={handlePlayMatch}
          onAutoSimulateRound={handleAutoSimulateRound}
          onUpgradeTeam={handleUpgradeTeam}
        />
      )}

      {currentScreen === 'match' && activeMatch && (
        <MatchScreen
          team1={activeMatch.team1}
          team2={activeMatch.team2}
          team1Ovr={activeMatch.team1Ovr}
          team2Ovr={activeMatch.team2Ovr}
          gameSpeed="normal"
          onMatchFinish={handleMatchFinish}
          onCancel={handleBackToMenu}
        />
      )}

      {currentScreen === 'result' && activeMatch && matchResult && (
        <ResultScreen
          mode={gameMode}
          team1={activeMatch.team1}
          team2={activeMatch.team2}
          score1={matchResult.score1}
          score2={matchResult.score2}
          wasTurnaround={matchResult.wasTurnaround}
          hadLateGoal={matchResult.hadLateGoal}
          standings={standings}
          userTeamId={userTeam?.id}
          onNextAction={handleResultNext}
          onBackMenu={handleBackToMenu}
        />
      )}

      {currentScreen === 'champion' && userTeam && (
        <ChampionScreen
          championTeam={userTeam}
          totalPoints={standings[userTeam.id]?.p || 0}
          totalGames={standings[userTeam.id]?.j || 0}
          onFinish={handleFinishCampaign}
        />
      )}

      {currentScreen === 'stats' && <StatsScreen onBack={handleBackToMenu} />}

      {currentScreen === 'history' && <HistoryScreen onBack={handleBackToMenu} />}
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
});
