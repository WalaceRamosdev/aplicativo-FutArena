import { Team } from './types';
import { findTeamById } from './teams';

export interface CommentatorContext {
  round?: number;
  standings?: any;
  userTeamId?: string;
  wasTurnaround?: boolean;
  hadLateGoal?: boolean;
}

export interface LiveEvent {
  type: string;
  text: string;
  time: number;
  effect?: (teams: { t1Ovr: number; t2Ovr: number }) => { t1Ovr: number; t2Ovr: number };
}

// Eventos que ocorrem durante o meio de campo
export const MATCH_EVENTS = [
  { type: 'card', weight: 0.15, text: (team: Team) => `⚠️ Cartão Amarelo para ${team.shortName}! Falta tática.`, overallEffect: -2 },
  { type: 'card', weight: 0.05, text: (team: Team) => `🟥 Cartão Vermelho para ${team.shortName}! Entrada violenta!`, overallEffect: -5 },
  { type: 'injury', weight: 0.1, text: (team: Team) => `🤕 Lesão! Jogador importante do ${team.shortName} sai de maca.`, overallEffect: -3 },
  { type: 'save', weight: 0.2, text: (team: Team) => `🧤 Defesa Milagrosa do goleiro do ${team.shortName}! Espalma pra fora!`, overallEffect: 1 },
  { type: 'var', weight: 0.05, text: (team: Team) => `❌ GOL ANULADO! O VAR confirma impedimento contra o ${team.shortName}.`, overallEffect: 0 },
  { type: 'nothing', weight: 0.45, text: () => `Jogo segue muito disputado e truncado no meio-campo.`, overallEffect: 0 }
];

export const COMMENTS = {
  scoreSpecific: {
    '1-0': [
      "Vitória magra, mas 3 pontos é 3 pontos!",
      "Placar apertado! Um gol de diferença foi suficiente.",
      "Vitória por 1x0 clássica! Eficiência pura.",
      "Ganhou de 1 a 0, agora é segurar o resultado!"
    ],
    '2-0': [
      "Duas vezes na rede! Vitória segura e merecida.",
      "2 a 0 é um placar tranquilo. Time dominante!",
      "Dois gols de vantagem! Jogo controlado do início ao fim."
    ],
    '2-1': [
      "2 a 1! Jogo disputado até o final!",
      "Placar de 2 a 1 mostra que o jogo foi equilibrado.",
      "Venceu por 2 a 1, mas suou a camisa!"
    ],
    '3-0': [
      "3 a 0! Atropelo total no adversário!",
      "Três gols sem resposta! Domínio absoluto.",
      "Passou o carro! 3 a 0 sem piedade."
    ],
    '3-1': [
      "3 a 1! Vitória convincente mesmo com gol de honra.",
      "Goleou por 3 a 1! O gol adversário foi só consolo."
    ],
    '3-2': [
      "3 a 2! Que jogo emocionante! Muitos gols!",
      "Placar de 3 a 2 - partida de tirar o fôlego!",
      "Cinco gols nessa partida! Espetáculo total!"
    ],
    '0-0': [
      "0 a 0! Defesas impecáveis dos dois lados.",
      "Empate sem gols. Faltou caprichar na finalização!",
      "Ninguém balançou a rede! Jogo travado."
    ],
    '1-1': [
      "1 a 1! Empate justo, cada um fez o seu.",
      "Placar de 1 a 1 - equilíbrio total em campo.",
      "Um gol pra cada. Justiça feita!"
    ],
    '2-2': [
      "2 a 2! Quatro gols e emoção do início ao fim!",
      "Empate em 2 a 2 - ninguém quis perder!",
      "Dois pra cada lado! Jogo aberto demais."
    ]
  } as Record<string, string[]>,

  turnaround: [
    "QUE VIRADA ESPETACULAR! Começou perdendo e terminou vencendo!",
    "VIROU O JOGO! Buscou o resultado quando parecia perdido!",
    "Virada histórica! Caráter de campeão apareceu!",
    "Estava atrás no placar e buscou a virada! INCRÍVEL!",
    "Nunca desistiu! Virou o jogo e calou a torcida adversária!"
  ],

  blowout: [
    "MASSACRE! Passou o trator em cima do adversário!",
    "GOLEADA HISTÓRICA! Não teve piedade!",
    "HUMILHOU! O adversário vai querer esquecer esse jogo!",
    "ATROPELO TOTAL! Pareciam times de divisões diferentes!",
    "DESTRUIÇÃO! O placar não deixa dúvidas sobre quem mandou!"
  ],

  underdog: [
    "ZEBRA! O azarão venceu o favorito! Futebol é isso!",
    "SURPRESA! Ninguém acreditava nessa vitória!",
    "David derrubou Golias! Resultado surpreendente!",
    "O fraco venceu o forte! No futebol, tudo pode acontecer!"
  ],

  favoriteLoser: [
    "O favorito tropeçou! Vexame inesperado!",
    "Subestimou o adversário e pagou caro!",
    "O poderoso caiu! Futebol não perdoa soberba!"
  ],

  classico: [
    "CLÁSSICO É CLÁSSICO! Jogo de rivalidade eterna!",
    "Derby emocionante! A torcida vai falar disso por semanas!",
    "Rivalidade histórica em campo! Jogo pegado!",
    "Clássico épico! Momento para a história!"
  ],

  highScoring: [
    "Chuva de gols! As defesas tiraram folga hoje!",
    "Jogo de muitos gols! Festival ofensivo!",
    "Partida eletrizante com gols em abundância!"
  ],

  lateGoal: [
    "Gol no final! Que emoção nos minutos finais!",
    "Decidiu nos acréscimos! Coração não aguenta!",
    "Gol salvador no fim do jogo! Torcida explodiu!"
  ],

  leader: [
    "Líder isolado! Caminhando firme para o título!",
    "No topo da tabela! Ritmo de campeão!",
    "Liderança mantida! Segue na ponta!"
  ],

  relegation: [
    "Jogo de desespero na zona de rebaixamento!",
    "Briga contra o descenso! Cada ponto vale ouro!",
    "Zona da degola! Tensão máxima!"
  ],

  goalReactions: {
    firstGoal: [
      "ABRE O PLACAR! Primeiro gol do jogo!",
      "SAIU O PRIMEIRO! A rede balançou!",
      "GOL! O placar finalmente foi aberto!"
    ],
    equalizer: [
      "EMPATE! A rede balançou e está tudo igual!",
      "EMPATOU O JOGO! Buscou a igualdade!",
      "GOL DE EMPATE! Está tudo igual novamente!"
    ],
    goAhead: [
      "VIROU! Agora está na frente do placar!",
      "GOL DA VIRADA! Passou à frente!",
      "DESEMPATE! Saiu na frente!"
    ],
    extend: [
      "AMPLIA! Aumentou a vantagem no placar!",
      "MAIS UM! A diferença só aumenta!",
      "GOL! O placar fica ainda mais elástico!"
    ],
    consolation: [
      "GOL DE HONRA! Diminuiu a diferença!",
      "DESCONTOU! Ainda tem jogo!",
      "GOL! Ainda dá tempo de buscar!"
    ],
    lateTie: [
      "EMPATE NO FIM! Arrancou um ponto!",
      "EMPATOU NOS ACRÉSCIMOS! Que emoção!",
      "GOL SALVADOR! Escapou da derrota!"
    ]
  },

  generic: {
    win: [
      "Vitória merecida! Mandou bem em campo!",
      "Ganhou e convenceu! Parabéns ao vencedor!",
      "Três pontos no bolso! Resultado positivo!"
    ],
    loss: [
      "Perdeu, mas a luta continua!",
      "Resultado negativo, mas cabeça erguida!",
      "Não foi dessa vez. Próximo jogo é outra história!"
    ],
    draw: [
      "Empate! Um ponto dividido para cada.",
      "Ninguém saiu vencedor. Empate justo!",
      "Dividiu os pontos! Resultado equilibrado."
    ]
  }
};

const lastCommentIndex: Record<string, number> = {};

function getRandomComment(category: keyof typeof COMMENTS, subcategory?: string): string {
  let arr: string[] = [];
  if (subcategory) {
    const cat = COMMENTS[category] as any;
    arr = cat?.[subcategory] || [];
  } else {
    arr = COMMENTS[category] as string[];
  }

  if (!arr || arr.length === 0) return "";

  const key = subcategory ? `${category}_${subcategory}` : category;
  if (lastCommentIndex[key] === undefined) {
    lastCommentIndex[key] = -1;
  }

  let newIndex;
  let attempts = 0;
  do {
    newIndex = Math.floor(Math.random() * arr.length);
    attempts++;
  } while (newIndex === lastCommentIndex[key] && attempts < 5 && arr.length > 1);

  lastCommentIndex[key] = newIndex;
  return arr[newIndex];
}

export const AICommentator = {
  getGoalReaction: (scoringTeamNum: number, currentScore1: number, currentScore2: number, matchTime: number) => {
    const isTeam1 = scoringTeamNum === 1;
    const newScore1 = isTeam1 ? currentScore1 + 1 : currentScore1;
    const newScore2 = isTeam1 ? currentScore2 : currentScore2 + 1;

    const wasDrawn = currentScore1 === currentScore2;
    const wasLosing = isTeam1 ? currentScore1 < currentScore2 : currentScore2 < currentScore1;
    const wasWinning = isTeam1 ? currentScore1 > currentScore2 : currentScore2 > currentScore1;
    const isNowDrawn = newScore1 === newScore2;
    const isLateGame = matchTime >= 75;

    // Primeiro gol do jogo
    if (currentScore1 === 0 && currentScore2 === 0) {
      return getRandomComment('goalReactions', 'firstGoal');
    }

    // Gol de empate
    if (wasLosing && isNowDrawn) {
      if (isLateGame) {
        return getRandomComment('goalReactions', 'lateTie');
      }
      return getRandomComment('goalReactions', 'equalizer');
    }

    // Gol de virada (estava perdendo, agora está ganhando)
    if (wasLosing && !isNowDrawn) {
      return getRandomComment('goalReactions', 'goAhead');
    }

    // Gol para ampliar
    if (wasWinning) {
      return getRandomComment('goalReactions', 'extend');
    }

    // Gol para desempatar
    if (wasDrawn && !isNowDrawn) {
      return getRandomComment('goalReactions', 'goAhead');
    }

    // Gol de honra/consolo
    if (wasLosing) {
      return getRandomComment('goalReactions', 'consolation');
    }

    return getRandomComment('goalReactions', 'firstGoal');
  },

  generateMatchComment: (team1: Team, team2: Team, score1: number, score2: number, context: CommentatorContext = {}) => {
    const isDraw = score1 === score2;
    const winner = score1 > score2 ? team1 : team2;
    const loser = score1 > score2 ? team2 : team1;
    const winnerScore = Math.max(score1, score2);
    const loserScore = Math.min(score1, score2);
    const diff = winnerScore - loserScore;
    const totalGoals = score1 + score2;

    const { standings, wasTurnaround, hadLateGoal } = context;

    // Detectar zebra (time com OVR menor venceu time com OVR 10+ maior)
    const winnerOvr = winner.overall;
    const loserOvr = loser.overall;
    const isUpset = loserOvr - winnerOvr >= 10;
    const isFavoriteLoser = winnerOvr - loserOvr >= 10;

    // Detectar clássico
    const classicos = [
      ['flamengo', 'fluminense'], ['flamengo', 'vasco'], ['flamengo', 'botafogo'],
      ['corinthians', 'palmeiras'], ['corinthians', 'saopaulo'], ['saopaulo', 'palmeiras'],
      ['gremio', 'internacional'], ['atletico', 'cruzeiro'], ['bahia', 'vitoria']
    ];
    const isClassico = classicos.some(pair =>
      pair.includes(team1.id) && pair.includes(team2.id)
    );

    let comments: string[] = [];

    // 1. Placar Específico
    const scoreKey = `${winnerScore}-${loserScore}`;
    if (COMMENTS.scoreSpecific[scoreKey]) {
      comments.push(getRandomComment('scoreSpecific', scoreKey));
    } else if (isDraw && COMMENTS.scoreSpecific[`${score1}-${score2}`]) {
      comments.push(getRandomComment('scoreSpecific', `${score1}-${score2}`));
    }

    // 2. Contexto Especial
    if (wasTurnaround && !isDraw) {
      comments.push(getRandomComment('turnaround'));
    } else if (diff >= 4) {
      comments.push(getRandomComment('blowout'));
    } else if (isUpset && !isDraw) {
      comments.push(getRandomComment('underdog'));
    } else if (isFavoriteLoser && !isDraw) {
      comments.push(getRandomComment('favoriteLoser'));
    }

    // 3. Clássico
    if (isClassico) {
      comments.push(getRandomComment('classico'));
    }

    // 4. Jogo de muitos gols
    if (totalGoals >= 5 && comments.length < 2) {
      comments.push(getRandomComment('highScoring'));
    }

    // 5. Gol no final
    if (hadLateGoal && comments.length < 2) {
      comments.push(getRandomComment('lateGoal'));
    }

    // 6. Líder ou Rebaixamento
    if (standings && Object.keys(standings).length > 0 && comments.length < 2) {
      const leaderboard = Object.entries(standings)
        .map(([id, stats]: any) => ({ id, ...stats }))
        .sort((a, b) => (b.p - a.p) || (b.sg - a.sg));

      const winnerPos = leaderboard.findIndex((t: any) => t.id === winner.id) + 1;
      const loserPos = leaderboard.findIndex((t: any) => t.id === loser.id) + 1;

      if (winnerPos === 1 && !isDraw) {
        comments.push(getRandomComment('leader'));
      } else if (winnerPos >= 17 || loserPos >= 17) {
        comments.push(getRandomComment('relegation'));
      }
    }

    // Fallback
    if (comments.length === 0) {
      if (isDraw) {
        comments.push(getRandomComment('generic', 'draw'));
      } else {
        comments.push(getRandomComment('generic', 'win'));
      }
    }

    return comments.slice(0, 2).join(' ');
  }
};
