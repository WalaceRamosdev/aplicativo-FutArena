// ==================== CONFIGURAÇÃO DE MÚSICA (Playlist) ====================
const PLAYLIST = [

    // IMPORTANTE: Certifique-se de que o arquivo mp3 esteja na pasta correta
    // ADICIONE NOVAS MÚSICAS AQUI:
    { title: "Mas que Nada", src: "/assets/musicas/Sérgio Mendes - Mas Que Nada 2011 Rio Versão.mp3" },
    { title: "Marcelo D2 Claudia - Desabafo", src: "/assets/musicas/Marcelo D2 Claudia - Desabafo.mp3" },
    { title: "Skank - é uma partida de Futebol", src: "/assets/musicas/Skank - É uma partida de futebol.mp3" },
    { title: "Tema do Brasileirão", src: "/assets/musicas/Tema do Brasileirão.mp3" },
    //{ title: "Send Them Off! - Bastille", src: "/assets/musicas/Send-Them-Off_-Bastille.mp3" },
    //{ title: "Supermassive Black Hole", src: "/assets/musicas/Supermassive-Black-Hole.mp3" },
    //{ title: "Doves-Black And White Town", src: "/assets/musicas/Doves-Black And White Town.mp3" },
];

// ==================== CONFIGURAÇÃO DOS TIMES ====================
// Times com overall baseado na classificação do Brasileirão 2025
// Overall: 99 (melhor) a 70 (mais fraco)
const brazilianTeams = [
  { id: "palmeiras", name: "Palmeiras", shortName: "PAL", badge: "https://upload.wikimedia.org/wikipedia/commons/1/10/Palmeiras_logo.svg", primaryColor: "#FFFFFF", secondaryColor: "#006437", overall: 85 },

  { id: "botafogo", name: "Botafogo", shortName: "BOT", badge: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Botafogo_de_Futebol_e_Regatas_logo.svg/1200px-Botafogo_de_Futebol_e_Regatas_logo.svg.png", primaryColor: "#FFFFFF", secondaryColor: "#000000", overall: 70 },

  { id: "flamengo", name: "Flamengo", shortName: "FLA", badge: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Flamengo_braz_logo.svg", primaryColor: "#FFFFFF", secondaryColor: "#E31D1A", overall: 92 },

  { id: "internacional", name: "Internacional", shortName: "INT", badge: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Escudo_do_Sport_Club_Internacional.svg/1200px-Escudo_do_Sport_Club_Internacional.svg.png", primaryColor: "#FFFFFF", secondaryColor: "#E31D1A", overall: 60 },

  { id: "saopaulo", name: "São Paulo", shortName: "SAO", badge: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Brasao_do_Sao_Paulo_Futebol_Clube.svg/1200px-Brasao_do_Sao_Paulo_Futebol_Clube.svg.png", primaryColor: "#FFFFFF", secondaryColor: "#FF0000", overall: 68 },

  { id: "corinthians", name: "Corinthians", shortName: "COR", badge: "https://upload.wikimedia.org/wikipedia/pt/b/b4/Corinthians_simbolo.png", primaryColor: "#FFFFFF", secondaryColor: "#000000", overall: 65 },

  { id: "bahia", name: "Bahia", shortName: "BAH", badge: "https://artevetorizada.com.br/wp-content/uploads/2022/04/bahia.png", primaryColor: "#FFFFFF", secondaryColor: "#005CAB", overall: 69 },

  { id: "cruzeiro", name: "Cruzeiro", shortName: "CRU", badge: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Cruzeiro_Esporte_Clube_%28logo%29.svg/2048px-Cruzeiro_Esporte_Clube_%28logo%29.svg.png", primaryColor: "#FFFFFF", secondaryColor: "#003DA5", overall: 85 },

  { id: "vasco", name: "Vasco", shortName: "VAS", badge: "https://upload.wikimedia.org/wikipedia/pt/thumb/8/8b/EscudoDoVascoDaGama.svg/960px-EscudoDoVascoDaGama.svg.png", primaryColor: "#FFFFFF", secondaryColor: "#000000", overall: 67 },

  { id: "gremio", name: "Grêmio", shortName: "GRE", badge: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Gremio_logo.svg/1718px-Gremio_logo.svg.png", primaryColor: "#FFFFFF", secondaryColor: "#0A5EB0", overall: 77 },

  { id: "atletico", name: "Atlético-MG", shortName: "CAM", badge: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Atletico_mineiro_galo.png/250px-Atletico_mineiro_galo.png", primaryColor: "#FFFFFF", secondaryColor: "#000000", overall: 71 },

  { id: "fluminense", name: "Fluminense", shortName: "FLU", badge: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Fluminense_FC_escudo.png/1200px-Fluminense_FC_escudo.png", primaryColor: "#FFFFFF", secondaryColor: "#7B0024", overall: 70 },

  { id: "bragantino", name: "Bragantino", shortName: "RBB", badge: "https://upload.wikimedia.org/wikipedia/pt/9/9e/RedBullBragantino.png", primaryColor: "#FFFFFF", secondaryColor: "#E31D1A", overall: 68 },

  { id: "vitoria", name: "Vitória", shortName: "VIT", badge: "https://upload.wikimedia.org/wikipedia/commons/5/58/Esporte_Clube_Vit%C3%B3ria.png", primaryColor: "#FFFFFF", secondaryColor: "#E31D1A", overall: 57 },

  { id: "athletico", name: "Athletico-PR", shortName: "CAP", badge: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Athletico_Paranaense_%28Logo_2019%29.svg/250px-Athletico_Paranaense_%28Logo_2019%29.svg.png", primaryColor: "#FFFFFF", secondaryColor: "#000000", overall: 59 },

  { id: "santos", name: "Santos", shortName: "SAN", badge: "https://upload.wikimedia.org/wikipedia/commons/1/15/Santos_Logo.png", primaryColor: "#FFFFFF", secondaryColor: "#000000", overall: 60 },

  { id: "mirassol", name: "Mirassol", shortName: "MIR", badge: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Mirassol_FC_logo.png", primaryColor: "#FFFFFF", secondaryColor: "#FFD700", overall: 65 },

  { id: "coritiba", name: "Coritiba", shortName: "CFC", badge: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Coritiba_FBC_%282011%29_-_PR.svg/960px-Coritiba_FBC_%282011%29_-_PR.svg.png", primaryColor: "#FFFFFF", secondaryColor: "#006B3F", overall: 60 },

  { id: "chapecoense", name: "Chapecoense", shortName: "CHA", badge: "https://upload.wikimedia.org/wikipedia/pt/b/bc/Escudo_de_2018_da_Chapecoense.png", primaryColor: "#FFFFFF", secondaryColor: "#006B3F", overall: 58 },

  { id: "remo", name: "Remo", shortName: "REM", badge: "https://www.clubedoremo.com.br/images/escudo-simbolo.png", primaryColor: "#FFFFFF", secondaryColor: "#161923", overall: 55 }
];


// ==================== IMAGENS DE FUNDO (Estádios Brasileiros) ====================
// Estádios icônicos do futebol brasileiro
const BG_IMAGES = [
    "https://static.vecteezy.com/ti/vetor-gratis/p1/15451551-a-bola-na-rede-de-futebol-conceito-de-de-gol-com-a-bandeira-do-brasil-banner-de-3d-com-efeito-de-desfoque-vetor.jpg",
];

/*
// ==================== COMENTÁRIOS DE IA ====================
const AICommentator = {
    comments: {
        winnerHumor: [
            "Nem o VAR salvaria o perdedor dessa!",
            "Que aula de futebol! O adversário só assistiu!",
            "Isso sim é futebol! O outro time só fez turismo!",
            "Amassou! Parecia jogo de videogame no modo fácil!",
            "Domínio absoluto! O rival precisa voltar pra escolinha!",
            "Show de bola! O adversário ainda está procurando a bola!",
            "Vitória merecida! O outro time só serviu de sparring!",
        ],
        loserCriticism: [
            "Perdeu feio, perdeu de montão. Vai treinar!",
            "Esse time precisa de um psicólogo urgente!",
            "Nem minha avó jogando de salto alto perderia assim!",
            "Time sem vergonha! Voltou pro vestiário de cabeça baixa!",
            "Futebol horroroso! Pareciam 11 cones em campo!",
            "Desempenho vergonhoso! O técnico deve estar arrependido!",
            "Esse time jogou como se não quisesse ganhar!",
        ],
        drawComments: [
            "Empate justo! Ninguém quis a vitória de verdade!",
            "Dois times medrosos. Empataram e foram felizes!",
            "Empate morno. Faltou raça dos dois lados!",
            "Um ponto pra cada. Melhor que perder, né?",
            "Jogo equilibrado! Ou seria mediocridade mútua?",
        ],
        goalReaction: [
            "GOOOOL! A torcida explode!",
            "GOLAÇO! Que pintura!",
            "ENTROU! Não tinha goleiro que segurasse!",
            "GOL! A rede balançou!",
            "É GOL! Que jogada sensacional!",
        ],
        closeGame: [
            "Jogo apertado! Decidido nos detalhes!",
            "Vitória suada! Foi na raça!",
            "Partida emocionante até o fim!",
        ]
    },

    generateMatchComment: (team1, team2, score1, score2) => {
        const isDraw = score1 === score2;
        const winner = score1 > score2 ? team1 : team2;
        const loser = score1 > score2 ? team2 : team1;
        const diff = Math.abs(score1 - score2);

        let comment = "";

        if (isDraw) {
            comment = AICommentator.comments.drawComments[Math.floor(Math.random() * AICommentator.comments.drawComments.length)];
        } else if (diff >= 3) {
            // Goleada
            const winnerComment = AICommentator.comments.winnerHumor[Math.floor(Math.random() * AICommentator.comments.winnerHumor.length)];
            const loserComment = AICommentator.comments.loserCriticism[Math.floor(Math.random() * AICommentator.comments.loserCriticism.length)];
            comment = `${winner.name}: ${winnerComment} | ${loser.name}: ${loserComment}`;
        } else if (diff === 1) {
            // Jogo apertado
            const closeComment = AICommentator.comments.closeGame[Math.floor(Math.random() * AICommentator.comments.closeGame.length)];
            comment = `${winner.name} vence! ${closeComment}`;
        } else {
            const winnerComment = AICommentator.comments.winnerHumor[Math.floor(Math.random() * AICommentator.comments.winnerHumor.length)];
            comment = `${winner.name}: ${winnerComment}`;
        }

        return comment;
    },

    getGoalReaction: () => {
        return AICommentator.comments.goalReaction[Math.floor(Math.random() * AICommentator.comments.goalReaction.length)];
    }
};
*/

// ==================== COMENTÁRIOS DE IA ULTRA CONTEXTUAIS ====================
const AICommentator = {
    lastCommentIndex: {},
    matchEvents: [], // Rastreia eventos durante a partida
    
    // Registra eventos durante a partida para comentários mais precisos
    registerEvent: (type, data) => {
        AICommentator.matchEvents.push({ type, data, time: Date.now() });
    },
    
    resetEvents: () => {
        AICommentator.matchEvents = [];
    },
    
    comments: {
        // Comentários baseados no placar específico
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
        },
        
        // Comentários sobre virada
        turnaround: [
            "QUE VIRADA ESPETACULAR! Começou perdendo e terminou vencendo!",
            "VIROU O JOGO! Buscou o resultado quando parecia perdido!",
            "Virada histórica! Caráter de campeão apareceu!",
            "Estava atrás no placar e buscou a virada! INCRÍVEL!",
            "Nunca desistiu! Virou o jogo e calou a torcida adversária!"
        ],
        
        // Comentários sobre goleada (4+ gols de diferença)
        blowout: [
            "MASSACRE! Passou o trator em cima do adversário!",
            "GOLEADA HISTÓRICA! Não teve piedade!",
            "HUMILHOU! O adversário vai querer esquecer esse jogo!",
            "ATROPELO TOTAL! Pareciam times de divisões diferentes!",
            "DESTRUIÇÃO! O placar não deixa dúvidas sobre quem mandou!"
        ],
        
        // Zebra (fraco vence forte)
        underdog: [
            "ZEBRA! O azarão venceu o favorito! Futebol é isso!",
            "SURPRESA! Ninguém acreditava nessa vitória!",
            "David derrubou Golias! Resultado surpreendente!",
            "O fraco venceu o forte! No futebol, tudo pode acontecer!"
        ],
        
        // Favorito perdeu
        favoriteLoser: [
            "O favorito tropeçou! Vexame inesperado!",
            "Subestimou o adversário e pagou caro!",
            "O poderoso caiu! Futebol não perdoa soberba!"
        ],
        
        // Clássico
        classico: [
            "CLÁSSICO É CLÁSSICO! Jogo de rivalidade eterna!",
            "Derby emocionante! A torcida vai falar disso por semanas!",
            "Rivalidade histórica em campo! Jogo pegado!",
            "Clássico épico! Momento para a história!"
        ],
        
        // Jogo com muitos gols (5+)
        highScoring: [
            "Chuva de gols! As defesas tiraram folga hoje!",
            "Jogo de muitos gols! Festival ofensivo!",
            "Partida eletrizante com gols em abundância!"
        ],
        
        // Jogo decidido no final (gol após min 80)
        lateGoal: [
            "Gol no final! Que emoção nos minutos finais!",
            "Decidiu nos acréscimos! Coração não aguenta!",
            "Gol salvador no fim do jogo! Torcida explodiu!"
        ],
        
        // Comentários sobre posição na tabela
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
        
        // Reações de gol contextuais
        goalReactions: {
            firstGoal: [
                "ABRE O PLACAR! Primeiro gol do jogo!",
                "SAIU O PRIMEIRO! A rede balançou!",
                "GOL! O placar finalmente foi aberto!"
            ],
            equalizer: [
                "EMPATE! A rede balançou e está tudo igual!",
                "EMPATOU O JOGO! Buscou a igualdade!",
                "GOL DE EMPATE! Está 1 a 1 novamente!"
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
        
        // Comentários genéricos de fallback
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
    },

    // Evita repetição pegando índice diferente do último
    getRandomComment: (category, subcategory = null) => {
        let arr;
        if (subcategory) {
            arr = AICommentator.comments[category]?.[subcategory];
        } else {
            arr = AICommentator.comments[category];
        }
        
        if (!arr || arr.length === 0) return "";
        
        const key = subcategory ? `${category}_${subcategory}` : category;
        if (!AICommentator.lastCommentIndex[key]) {
            AICommentator.lastCommentIndex[key] = -1;
        }
        
        let newIndex;
        let attempts = 0;
        do {
            newIndex = Math.floor(Math.random() * arr.length);
            attempts++;
        } while (newIndex === AICommentator.lastCommentIndex[key] && attempts < 5 && arr.length > 1);
        
        AICommentator.lastCommentIndex[key] = newIndex;
        return arr[newIndex];
    },

    // Gera comentário altamente contextual baseado em tudo que aconteceu
    generateMatchComment: (team1, team2, score1, score2, context = {}) => {
        const isDraw = score1 === score2;
        const winner = score1 > score2 ? team1 : team2;
        const loser = score1 > score2 ? team2 : team1;
        const winnerScore = Math.max(score1, score2);
        const loserScore = Math.min(score1, score2);
        const diff = winnerScore - loserScore;
        const totalGoals = score1 + score2;
        
        // Contexto do campeonato
        const { round, standings, userTeamId, wasTurnaround, hadLateGoal } = context;
        
        // Detectar zebra (time com OVR menor venceu time com OVR 10+ maior)
        const winnerTeam = brazilianTeams.find(t => t.id === winner.id);
        const loserTeam = brazilianTeams.find(t => t.id === loser.id);
        const winnerOvr = winnerTeam ? winnerTeam.overall : 75;
        const loserOvr = loserTeam ? loserTeam.overall : 75;
        const isUpset = loserOvr - winnerOvr >= 10;
        const isFavoriteLoser = winnerOvr - loserOvr >= 10;
        
        // Detectar clássico
        const classicos = [
            ['flamengo', 'fluminense'], ['flamengo', 'vasco'], ['flamengo', 'botafogo'],
            ['corinthians', 'palmeiras'], ['corinthians', 'saopaulo'], ['saopaulo', 'palmeiras'],
            ['gremio', 'internacional'], ['atletico', 'cruzeiro'], ['bahia', 'vitoria']
        ];
        const isClassico = classicos.some(pair => 
            (pair.includes(team1.id) && pair.includes(team2.id))
        );
        
        let comments = [];
        
        // 1. COMENTÁRIO PRINCIPAL BASEADO NO PLACAR ESPECÍFICO
        const scoreKey = `${winnerScore}-${loserScore}`;
        const reverseScoreKey = `${loserScore}-${winnerScore}`;
        
        if (AICommentator.comments.scoreSpecific[scoreKey]) {
            comments.push(AICommentator.getRandomComment('scoreSpecific', scoreKey));
        } else if (isDraw && AICommentator.comments.scoreSpecific[`${score1}-${score2}`]) {
            comments.push(AICommentator.getRandomComment('scoreSpecific', `${score1}-${score2}`));
        }
        
        // 2. CONTEXTO ESPECIAL (virada, goleada, zebra, etc.)
        if (wasTurnaround && !isDraw) {
            comments.push(AICommentator.getRandomComment('turnaround'));
        } else if (diff >= 4) {
            comments.push(AICommentator.getRandomComment('blowout'));
        } else if (isUpset && !isDraw) {
            comments.push(AICommentator.getRandomComment('underdog'));
        } else if (isFavoriteLoser && !isDraw) {
            comments.push(AICommentator.getRandomComment('favoriteLoser'));
        }
        
        // 3. CONTEXTO DE CLÁSSICO
        if (isClassico) {
            comments.push(AICommentator.getRandomComment('classico'));
        }
        
        // 4. JOGO COM MUITOS GOLS
        if (totalGoals >= 5 && comments.length < 2) {
            comments.push(AICommentator.getRandomComment('highScoring'));
        }
        
        // 5. GOL NO FINAL
        if (hadLateGoal && comments.length < 2) {
            comments.push(AICommentator.getRandomComment('lateGoal'));
        }
        
        // 6. CONTEXTO DE TABELA (posição no campeonato)
        if (standings && Object.keys(standings).length > 0) {
            const leaderboard = Object.entries(standings)
                .map(([id, stats]) => ({ id, ...stats }))
                .sort((a, b) => (b.p - a.p) || (b.sg - a.sg));
            
            const winnerPos = leaderboard.findIndex(t => t.id === winner.id) + 1;
            const loserPos = leaderboard.findIndex(t => t.id === loser.id) + 1;
            
            if (winnerPos === 1 && !isDraw && comments.length < 2) {
                comments.push(AICommentator.getRandomComment('leader'));
            } else if ((winnerPos >= 17 || loserPos >= 17) && comments.length < 2) {
                comments.push(AICommentator.getRandomComment('relegation'));
            }
        }
        
        // 7. FALLBACK - Comentário genérico se não tiver nada ainda
        if (comments.length === 0) {
            if (isDraw) {
                comments.push(AICommentator.getRandomComment('generic', 'draw'));
            } else {
                comments.push(AICommentator.getRandomComment('generic', 'win'));
            }
        }
        
        // 8. RESUMO DO JOGO - Adiciona informação sobre os times
        const matchSummary = `${team1.shortName} ${score1} x ${score2} ${team2.shortName}`;
        
        // Limitar a 2 comentários e formatar bonito
        const finalComments = comments.slice(0, 2);
        return finalComments.join(' ');
    },

    // Gera reação de gol contextual baseada no momento
    getGoalReaction: (scoringTeam, currentScore1, currentScore2, matchTime) => {
        const isTeam1 = scoringTeam === 1;
        const newScore1 = isTeam1 ? currentScore1 + 1 : currentScore1;
        const newScore2 = isTeam1 ? currentScore2 : currentScore2 + 1;
        
        const wasDrawn = currentScore1 === currentScore2;
        const wasLosing = isTeam1 ? currentScore1 < currentScore2 : currentScore2 < currentScore1;
        const wasWinning = isTeam1 ? currentScore1 > currentScore2 : currentScore2 > currentScore1;
        const isNowDrawn = newScore1 === newScore2;
        const isLateGame = matchTime >= 75;
        
        // Primeiro gol do jogo
        if (currentScore1 === 0 && currentScore2 === 0) {
            return AICommentator.getRandomComment('goalReactions', 'firstGoal');
        }
        
        // Gol de empate
        if (wasLosing && isNowDrawn) {
            if (isLateGame) {
                return AICommentator.getRandomComment('goalReactions', 'lateTie');
            }
            return AICommentator.getRandomComment('goalReactions', 'equalizer');
        }
        
        // Gol de virada (estava perdendo, agora está ganhando)
        if (wasLosing && !isNowDrawn) {
            return AICommentator.getRandomComment('goalReactions', 'goAhead');
        }
        
        // Gol para ampliar
        if (wasWinning) {
            return AICommentator.getRandomComment('goalReactions', 'extend');
        }
        
        // Gol para desempatar
        if (wasDrawn && !isNowDrawn) {
            return AICommentator.getRandomComment('goalReactions', 'goAhead');
        }
        
        // Gol de honra/consolo
        if (wasLosing) {
            return AICommentator.getRandomComment('goalReactions', 'consolation');
        }
        
        // Fallback
        return AICommentator.getRandomComment('goalReactions', 'firstGoal');
    }
};


// ==================== GERENCIADOR DE ÁUDIO ====================
class SoundManager {
  constructor() {
    this.sfxEnabled = true; // Efeitos sonoros
    this.musicEnabled = true; // Música de fundo
    this.allMuted = false; // Mudo geral
    this.ctx = null;
    this.crowdNode = null;
    this.crowdGain = null;

    // Player de Música
    this.bgmPlayer = new Audio();
    this.bgmPlayer.autoplay = true; // Tenta autoplay nativo
    this.bgmPlayer.loop = false; // Loop controlado manualmente para tocar playlist
    this.bgmPlayer.volume = 0.4; // Volume inicial da música
    this.currentTrackIndex = 0;
    
    // Ao terminar uma música, vai para a próxima (loop da playlist)
    this.bgmPlayer.addEventListener('ended', () => {
        if (!this.allMuted) this.playNext();
    });
  }

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  // --- Controle de Música ---
  loadTrack() {
    if (PLAYLIST.length === 0) return;
    const track = PLAYLIST[this.currentTrackIndex];
    const newSrc = new URL(track.src, document.baseURI).href;
    
    // Só recarrega se for diferente, para não interromper se já estiver tocando
    if (this.bgmPlayer.src !== newSrc) {
        this.bgmPlayer.src = track.src;
    }
    this.updatePlayerUI();
  }

  playMusic() {
    if (PLAYLIST.length === 0 || this.allMuted) return;
    this.musicEnabled = true;
    
    // Se não tiver src carregado, carrega
    if (!this.bgmPlayer.src || this.bgmPlayer.src === '') {
        this.loadTrack();
    }

    const playPromise = this.bgmPlayer.play();
    
    if (playPromise !== undefined) {
        playPromise.then(() => {
            this.updatePlayerUI();
        }).catch(error => {
            console.warn("Autoplay bloqueado pelo navegador. Aguardando interação do usuário.");
            this.updatePlayerUI(false); 
        });
    }
    // Garante que o player fique visível ao tentar tocar
    const playerBar = document.getElementById('music-player-bar');
    if(playerBar && !isPlaying) playerBar.classList.add('visible');
  }

  pauseMusic() {
    this.bgmPlayer.pause();
    this.updatePlayerUI();
  }

  togglePlayPause() {
    if (this.bgmPlayer.paused) {
        this.playMusic();
    } else {
        this.pauseMusic();
    }
  }

  playNext() {
    if (PLAYLIST.length === 0) return;
    this.currentTrackIndex = (this.currentTrackIndex + 1) % PLAYLIST.length;
    this.loadTrack();
    this.playMusic();
  }

  playPrev() {
    if (PLAYLIST.length === 0) return;
    this.currentTrackIndex = (this.currentTrackIndex - 1 + PLAYLIST.length) % PLAYLIST.length;
    this.loadTrack();
    this.playMusic();
  }

  updatePlayerUI(forcePausedState) {
      const trackNameEl = document.getElementById('music-track-name');
      const btnPlayPause = document.getElementById('btn-play-pause');
      const playerBar = document.getElementById('music-player-bar');
      
      if (PLAYLIST.length === 0) {
          if (trackNameEl) trackNameEl.textContent = "Sem músicas";
          return;
      }

      if (trackNameEl) {
          trackNameEl.textContent = PLAYLIST[this.currentTrackIndex].title;
      }

      if (btnPlayPause) {
          const isPlaying = forcePausedState !== undefined ? !forcePausedState : !this.bgmPlayer.paused;
          btnPlayPause.textContent = isPlaying ? "⏸" : "▶";
          btnPlayPause.title = isPlaying ? "Pausar" : "Tocar";
          
          if (playerBar) {
              if (isPlaying) playerBar.classList.add('is-playing');
              else playerBar.classList.remove('is-playing');
          }
      }
  }

  // Mudo geral (todos os sons)
  toggleAllSound() {
    this.allMuted = !this.allMuted;
    this.sfxEnabled = !this.allMuted;
    
    if (this.allMuted) {
        this.pauseMusic();
        this.stopCrowd();
        // Silenciar o player de música
        this.bgmPlayer.muted = true;
    } else {
        this.bgmPlayer.muted = false;
        if (!isPlaying) {
            this.playMusic();
        } else {
            // Se estiver durante a partida, reinicia a torcida
            this.startCrowd();
        }
    }
    
    return !this.allMuted;
  }

  // --- Controle de SFX ---
  toggleSfx() {
    this.sfxEnabled = !this.sfxEnabled;
    if(!this.sfxEnabled) {
        this.stopCrowd();
    } else if (typeof isPlaying !== 'undefined' && isPlaying) {
        this.startCrowd();
    }
    return this.sfxEnabled;
  }

  // --- Efeitos de Torcida ---
  createNoiseBuffer() {
    if (!this.ctx) return null;
    const bufferSize = this.ctx.sampleRate * 5; // 5 segundos de loop
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    // Pink Noise simples (1/f)
    let b0, b1, b2, b3, b4, b5, b6;
    b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0;
    for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        data[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        data[i] *= 0.11; // Compensar ganho
        b6 = white * 0.115926;
    }
    return buffer;
  }

  startCrowd() {
    if (!this.sfxEnabled || !this.ctx) return;
    if (this.crowdNode) return; // Já está tocando

    const buffer = this.createNoiseBuffer();
    this.crowdNode = this.ctx.createBufferSource();
    this.crowdNode.buffer = buffer;
    this.crowdNode.loop = true;

    // Filtro para parecer "estádio distante" (Lowpass)
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 800;
    
    this.crowdGain = this.ctx.createGain();
    this.crowdGain.gain.setValueAtTime(0.05, this.ctx.currentTime); // Volume base baixo

    this.crowdNode.connect(filter);
    filter.connect(this.crowdGain);
    this.crowdGain.connect(this.ctx.destination);
    
    this.crowdNode.start();
    
    // Iniciar variações dinâmicas da torcida
    this.startDynamicCrowd();
  }

  stopCrowd() {
    if (this.crowdNode) {
        try {
            this.crowdNode.stop();
        } catch(e) {}
        this.crowdNode = null;
        this.crowdGain = null;
    }
    this.stopDynamicCrowd();
  }

  // Sons dinâmicos de torcida durante a partida
  startDynamicCrowd() {
    if (this.dynamicCrowdInterval) return;
    
    this.dynamicCrowdInterval = setInterval(() => {
        if (!isPlaying || !this.sfxEnabled) return;
        
        // Chance aleatória de reações da torcida
        const rand = Math.random();
        
        if (rand < 0.15) {
            // Cântico da torcida (onda sonora)
            this.playCrowdChant();
        } else if (rand < 0.25) {
            // Reação de tensão
            this.playTensionReaction();
        } else if (rand < 0.35) {
            // Aplausos
            this.playApplause();
        }
    }, 3000);
  }

  stopDynamicCrowd() {
    if (this.dynamicCrowdInterval) {
        clearInterval(this.dynamicCrowdInterval);
        this.dynamicCrowdInterval = null;
    }
  }

  playCrowdChant() {
    if (!this.sfxEnabled || !this.ctx) return;
    
    // Simula cântico "olé olé olé"
    const notes = [440, 523.25, 440, 349.23]; // Notas do cântico
    const now = this.ctx.currentTime;
    
    notes.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.value = freq;
        
        gain.gain.setValueAtTime(0, now + i * 0.3);
        gain.gain.linearRampToValueAtTime(0.08, now + i * 0.3 + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.3 + 0.25);
        
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        
        osc.start(now + i * 0.3);
        osc.stop(now + i * 0.3 + 0.3);
    });
  }

  playTensionReaction() {
    if (!this.sfxEnabled || !this.ctx || !this.crowdGain) return;
    
    // Aumenta o volume brevemente (tensão)
    const now = this.ctx.currentTime;
    this.crowdGain.gain.cancelScheduledValues(now);
    this.crowdGain.gain.setValueAtTime(this.crowdGain.gain.value, now);
    this.crowdGain.gain.linearRampToValueAtTime(0.15, now + 0.3);
    this.crowdGain.gain.exponentialRampToValueAtTime(0.05, now + 1.5);
  }

  playApplause() {
    if (!this.sfxEnabled || !this.ctx) return;
    
    // Simula aplausos com ruído branco filtrado
    const duration = 0.8;
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.sin((i / bufferSize) * Math.PI);
    }
    
    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 3000;
    filter.Q.value = 0.5;
    
    const gain = this.ctx.createGain();
    gain.gain.value = 0.1;
    
    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    
    source.start();
  }

  surgeCrowd() {
      if (!this.sfxEnabled || !this.ctx || !this.crowdGain) return;
      const now = this.ctx.currentTime;
      this.crowdGain.gain.cancelScheduledValues(now);
      this.crowdGain.gain.setValueAtTime(this.crowdGain.gain.value, now);
      this.crowdGain.gain.linearRampToValueAtTime(0.4, now + 0.5); // Sobe
      this.crowdGain.gain.exponentialRampToValueAtTime(0.05, now + 4.0); // Desce suavemente
  }

  // --- Efeitos de Jogo ---
  playCollision() {
    if (!this.sfxEnabled || !this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(50, this.ctx.currentTime + 0.1);
    
    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.1);
  }

  playWhistle() {
    if (!this.sfxEnabled || !this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(2500, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(2000, this.ctx.currentTime + 0.1);
    osc.frequency.linearRampToValueAtTime(2500, this.ctx.currentTime + 0.2);
    
    const lfo = this.ctx.createOscillator();
    lfo.type = 'square';
    lfo.frequency.value = 50;
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.value = 1000;
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);
    lfo.start();
    lfo.stop(this.ctx.currentTime + 0.4);

    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.4);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.4);
  }

  playGoal() {
    if (!this.sfxEnabled || !this.ctx) return;
    this.surgeCrowd();
    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.value = freq;
      const startTime = now + (i * 0.1);
      const duration = 0.3;
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.2, startTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + duration);
    });
  }

  playVictorySound() {
    if (!this.sfxEnabled || !this.ctx) return;
    
    // Sequência de notas épicas (Fanfarra de Vitória)
    const now = this.ctx.currentTime;
    const fanfarra = [
        { freq: 523.25, duration: 0.2, delay: 0.0 }, // C5
        { freq: 659.25, duration: 0.2, delay: 0.2 }, // E5
        { freq: 783.99, duration: 0.3, delay: 0.4 }, // G5
        { freq: 1046.50, duration: 0.5, delay: 0.7 } // C6 (Oitava acima)
    ];

    fanfarra.forEach(note => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = 'square'; // Som mais "metálico" de fanfarra
        osc.frequency.value = note.freq;
        
        const startTime = now + note.delay;
        
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.3, startTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + note.duration);
        
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        
        osc.start(startTime);
        osc.stop(startTime + note.duration);
    });
    
    // Aumentar o volume da torcida para a celebração
    if (this.crowdGain) {
        this.crowdGain.gain.cancelScheduledValues(now);
        this.crowdGain.gain.setValueAtTime(this.crowdGain.gain.value, now);
        this.crowdGain.gain.linearRampToValueAtTime(0.8, now + 0.5); // Volume alto
        this.crowdGain.gain.linearRampToValueAtTime(0.5, now + 3.0); // Mantém alto por um tempo
    }
  }
}

const sfx = new SoundManager();

// ==================== DATA MANAGER (Persistência) ====================
const StorageManager = {
  getFavorite: () => localStorage.getItem('arena_favorite_team'),
  setFavorite: (id) => localStorage.setItem('arena_favorite_team', id),
  removeFavorite: () => localStorage.removeItem('arena_favorite_team'),
  
  getHistory: () => JSON.parse(localStorage.getItem('arena_match_history') || '[]'),
  addMatch: (match) => {
    const history = StorageManager.getHistory();
    history.unshift(match);
    if (history.length > 20) history.pop();
    localStorage.setItem('arena_match_history', JSON.stringify(history));
    StorageManager.updateStats(match);
  },
  clearHistory: () => localStorage.removeItem('arena_match_history'),
  
  getStats: () => JSON.parse(localStorage.getItem('arena_team_stats') || '{}'),
  updateStats: (match) => {
    const stats = StorageManager.getStats();
    const updateTeam = (id, scored, conceded) => {
        if (!stats[id]) stats[id] = { w: 0, d: 0, l: 0, gf: 0, ga: 0, m: 0 };
        stats[id].m++;
        stats[id].gf += scored;
        stats[id].ga += conceded;
        if (scored > conceded) stats[id].w++;
        else if (scored < conceded) stats[id].l++;
        else stats[id].d++;
    };
    updateTeam(match.team1, match.score1, match.score2);
    updateTeam(match.team2, match.score2, match.score1);
    localStorage.setItem('arena_team_stats', JSON.stringify(stats));
  },
  clearStats: () => localStorage.removeItem('arena_team_stats'),
  
  // ==================== ARCADE PROGRESS STORAGE ====================
  saveArcadeProgress: () => {
    const arcadeData = {
      userTeamId: ArcadeManager.userTeamId,
      currentRound: ArcadeManager.currentRound,
      schedule: ArcadeManager.schedule,
      standings: ArcadeManager.standings,
      coins: ArcadeManager.coins,
      overallBoosts: ArcadeManager.overallBoosts,
      savedAt: new Date().toISOString()
    };
    localStorage.setItem('arena_arcade_progress', JSON.stringify(arcadeData));
  },
  
  getArcadeProgress: () => {
    const data = localStorage.getItem('arena_arcade_progress');
    return data ? JSON.parse(data) : null;
  },
  
  hasArcadeProgress: () => {
    return localStorage.getItem('arena_arcade_progress') !== null;
  },
  
  clearArcadeProgress: () => {
    localStorage.removeItem('arena_arcade_progress');
  }
};

// ==================== ARCADE MANAGER (Lógica do Campeonato) ====================
const ArcadeManager = {
    userTeamId: null,
    currentRound: 0,
    schedule: [], // Array of rounds. Each round is array of matches {teamA, teamB}
    standings: {}, // { teamId: { p, j, v, e, d, gp, gc, sg } }
    coins: 0, // Sistema de moedas
    overallBoosts: {}, // { teamId: bonusOverall }

    init: (teamId) => {
        ArcadeManager.userTeamId = teamId;
        ArcadeManager.currentRound = 0;
        ArcadeManager.standings = {};
        ArcadeManager.coins = 0;
        ArcadeManager.overallBoosts = {};
        
        // Inicializa tabela
        brazilianTeams.forEach(t => {
            ArcadeManager.standings[t.id] = { p: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 };
            ArcadeManager.overallBoosts[t.id] = 0;
        });

        ArcadeManager.generateSeasonSchedule();
        
        // Salvar progresso inicial
        StorageManager.saveArcadeProgress();
    },

    // Carregar progresso salvo
    loadProgress: (savedData) => {
        ArcadeManager.userTeamId = savedData.userTeamId;
        ArcadeManager.currentRound = savedData.currentRound;
        ArcadeManager.schedule = savedData.schedule;
        ArcadeManager.standings = savedData.standings;
        ArcadeManager.coins = savedData.coins;
        ArcadeManager.overallBoosts = savedData.overallBoosts;
    },

    getTeamOverall: (teamId) => {
        const team = brazilianTeams.find(t => t.id === teamId);
        const baseOverall = team ? team.overall : 75;
        const boost = ArcadeManager.overallBoosts[teamId] || 0;
        return Math.min(99, baseOverall + boost);
    },

    addCoins: (amount) => {
        ArcadeManager.coins += amount;
        ArcadeManager.updateCoinsUI();
        // Salvar progresso após ganhar moedas
        StorageManager.saveArcadeProgress();
    },

    spendCoins: (amount) => {
        if (ArcadeManager.coins >= amount) {
            ArcadeManager.coins -= amount;
            ArcadeManager.updateCoinsUI();
            // Salvar progresso após gastar moedas
            StorageManager.saveArcadeProgress();
            return true;
        }
        return false;
    },

    upgradeTeam: () => {
        const cost = 100 + (ArcadeManager.overallBoosts[ArcadeManager.userTeamId] * 50);
        if (ArcadeManager.spendCoins(cost)) {
            ArcadeManager.overallBoosts[ArcadeManager.userTeamId]++;
            ArcadeManager.updateCoinsUI();
            // Salvar progresso após upgrade
            StorageManager.saveArcadeProgress();
            return true;
        }
        return false;
    },

    updateCoinsUI: () => {
        const coinsEl = document.getElementById('arcade-coins');
        const overallEl = document.getElementById('arcade-overall');
        const upgradeCostEl = document.getElementById('upgrade-cost');
        
        if (coinsEl) coinsEl.textContent = ArcadeManager.coins;
        if (overallEl) overallEl.textContent = ArcadeManager.getTeamOverall(ArcadeManager.userTeamId);
        if (upgradeCostEl) {
            const cost = 100 + (ArcadeManager.overallBoosts[ArcadeManager.userTeamId] * 50);
            upgradeCostEl.textContent = cost;
        }
    },

    generateSeasonSchedule: () => {
        const teams = brazilianTeams.map(t => t.id);
        const n = teams.length;
        const rounds = [];
        const matchesPerRound = n / 2;

        // Algoritmo Round Robin (Polígono) - Turno Único
        let roundTeams = [...teams];
        
        // Ida (19 rodadas para 20 times)
        for (let r = 0; r < n - 1; r++) {
            const roundMatches = [];
            for (let i = 0; i < matchesPerRound; i++) {
                // Alternar mando de campo baseado na rodada par/impar para equilibrar
                if (r % 2 === 0) {
                     roundMatches.push({ home: roundTeams[i], away: roundTeams[n - 1 - i] });
                } else {
                     roundMatches.push({ home: roundTeams[n - 1 - i], away: roundTeams[i] });
                }
            }
            rounds.push(roundMatches);
            // Rotacionar (exceto o primeiro elemento)
            roundTeams.splice(1, 0, roundTeams.pop());
        }

        // APENAS TURNO ÚNICO
        ArcadeManager.schedule = [...rounds];
    },

    getNextUserMatch: () => {
        if (ArcadeManager.currentRound >= ArcadeManager.schedule.length) return null;
        const round = ArcadeManager.schedule[ArcadeManager.currentRound];
        return round.find(m => m.home === ArcadeManager.userTeamId || m.away === ArcadeManager.userTeamId);
    },

    simulateRound: () => {
        // Simula os jogos que NÃO são do usuário na rodada atual
        const round = ArcadeManager.schedule[ArcadeManager.currentRound];
        round.forEach(match => {
            if (match.home !== ArcadeManager.userTeamId && match.away !== ArcadeManager.userTeamId) {
                // Lógica de simulação simples (RNG)
                // Peso leve para quem joga em casa (0-4 gols casa, 0-3 gols fora)
                const scoreHome = Math.floor(Math.random() * 5);
                const scoreAway = Math.floor(Math.random() * 4);
                ArcadeManager.updateStandings(match.home, match.away, scoreHome, scoreAway);
            }
        });
    },

    registerUserResult: (homeId, awayId, scoreHome, scoreAway) => {
        ArcadeManager.updateStandings(homeId, awayId, scoreHome, scoreAway);
        ArcadeManager.simulateRound(); // Simula o resto da rodada
        ArcadeManager.currentRound++;
        
        // Sistema de moedas - ganho baseado no resultado
        const userIsHome = homeId === ArcadeManager.userTeamId;
        const userScore = userIsHome ? scoreHome : scoreAway;
        const opponentScore = userIsHome ? scoreAway : scoreHome;
        
        let coinsEarned = 50; // Base por jogar
        if (userScore > opponentScore) {
            coinsEarned += 100; // Vitória
            coinsEarned += (userScore - opponentScore) * 20; // Bonus por gol de diferença
        } else if (userScore === opponentScore) {
            coinsEarned += 30; // Empate
        }
        coinsEarned += userScore * 10; // Bonus por gols marcados
        
        ArcadeManager.addCoins(coinsEarned);
        
        // Salvar progresso após cada rodada
        StorageManager.saveArcadeProgress();
    },

    updateStandings: (homeId, awayId, scoreHome, scoreAway) => {
        const update = (id, gf, ga) => {
            const s = ArcadeManager.standings[id];
            s.j++;
            s.gp += gf;
            s.gc += ga;
            s.sg = s.gp - s.gc;
            if (gf > ga) { s.v++; s.p += 3; }
            else if (gf === ga) { s.e++; s.p += 1; }
            else { s.d++; }
        };
        update(homeId, scoreHome, scoreAway);
        update(awayId, scoreAway, scoreHome);
    },

    getLeaderboard: () => {
        return Object.entries(ArcadeManager.standings).map(([id, stats]) => {
            const team = brazilianTeams.find(t => t.id === id);
            return { ...team, ...stats };
        }).sort((a, b) => {
            if (b.p !== a.p) return b.p - a.p;
            if (b.v !== a.v) return b.v - a.v;
            return b.sg - a.sg;
        });
    },
    
    // Verifica se há um campeão matemático
    checkChampion: () => {
        const leaderboard = ArcadeManager.getLeaderboard();
        const leader = leaderboard[0];
        const second = leaderboard[1];
        const remainingRounds = ArcadeManager.schedule.length - ArcadeManager.currentRound;
        const maxPointsPossible = second.p + (remainingRounds * 3);
        
        if (leader.p > maxPointsPossible) {
            // Limpar progresso quando houver campeão
            StorageManager.clearArcadeProgress();
            return leader;
        }
        if (remainingRounds === 0) {
            // Limpar progresso quando campeonato acabar
            StorageManager.clearArcadeProgress();
            return leader;
        }
        return null;
    }
};

// ==================== GAME STATE & FLOW ====================
let currentGameMode = 'quick'; // 'quick' | 'arcade'
let selectedTeams = []; // Usado para Quick
let team1 = null; // Instância real do jogo
let team2 = null;
let score1 = 0;
let score2 = 0;
let matchTime = 0
let isPlaying = false;
let animationId = null;
let startTime = 0;
let pausedTime = 0;
let rotation = 0;
let goalCooldown = false;
let hasFirstGoal = false;

// Game constants
const ARENA_SIZE = 400;
const SHIELD_SIZE = 35;
const GOAL_SIZE = 100;
const GOAL_DEPTH = 35;
const NORMAL_TIME = 90;
const EXTRA_TIME = 97;
const BASE_SPEED = 7;
const MAX_SPEED = 12;
const MIN_SPEED = 5;

let matchState = {
    minute: 0,
    advantageA: 1,
    advantageB: 1,
    blockGoals: false,
    events: []
};


// ==================== SISTEMA DE VELOCIDADE ====================
// Multiplicadores de velocidade (afetam apenas timing, não física)
const SPEED_SETTINGS = {
    slow: { matchDuration: 60000, rotationMult: 0.5, label: 'Lento' },      // 60s match
    normal: { matchDuration: 40000, rotationMult: 1.0, label: 'Normal' },   // 40s match
    fast: { matchDuration: 20000, rotationMult: 1.5, label: 'Rápido' }      // 20s match
};
let currentSpeed = 'normal';
let MATCH_DURATION_MS = SPEED_SETTINGS.normal.matchDuration;



// ==================== TUTORIAL SYSTEM (REFAZENDO) ====================
// ==================== EVENTOS DE PARTIDA ====================
const MatchEventManager = {
    EVENT_LOG_EL: document.getElementById('event-log'),
    EVENT_COOLDOWN_MS: 5000,
    lastEventTime: 0,
    
    EVENTS: [
        { type: 'card', weight: 0.15, text: (team) => `⚠️ Cartão Amarelo para ${team.shortName}!`, effect: (team) => { team.overall -= 2; } },
        { type: 'card', weight: 0.05, text: (team) => `🟥 Cartão Vermelho para ${team.shortName}!`, effect: (team) => { team.overall -= 5; } },
        { type: 'injury', weight: 0.1, text: (team) => `🤕 Lesão! ${team.shortName} joga com desvantagem.`, effect: (team) => { team.overall -= 3; } },
        { type: 'save', weight: 0.2, text: (team) => `🧤 Defesa Milagrosa de ${team.shortName}!`, effect: (team) => { team.overall += 1; } },
        { type: 'var', weight: 0.05, text: (team) => `❌ GOL ANULADO! VAR confirma impedimento contra ${team.shortName}.`, effect: (team) => { } },
        { type: 'nothing', weight: 0.45, text: () => `Jogo segue disputado no meio-campo.`, effect: () => { } }
    ],
    
    // Função para exibir o evento no log
    showMatchEvent: (text) => {
        if (!MatchEventManager.EVENT_LOG_EL) return;
        MatchEventManager.EVENT_LOG_EL.textContent = text;
        MatchEventManager.EVENT_LOG_EL.classList.add('visible');
        
        setTimeout(() => {
            MatchEventManager.EVENT_LOG_EL.classList.remove('visible');
        }, 3000);
    },
    
    // Função para disparar um evento
    triggerEvent: (elapsed) => {
        if (elapsed - MatchEventManager.lastEventTime < MatchEventManager.EVENT_COOLDOWN_MS) return;
        
        // Chance de evento (ajustável)
        if (Math.random() < 0.05) {
            MatchEventManager.lastEventTime = elapsed;
            
            const teamToAffect = Math.random() < 0.5 ? team1 : team2;
            
            // Selecionar evento baseado no peso
            let totalWeight = MatchEventManager.EVENTS.reduce((sum, event) => sum + event.weight, 0);
            let random = Math.random() * totalWeight;
            
            let selectedEvent = MatchEventManager.EVENTS.find(event => {
                random -= event.weight;
                return random <= 0;
            });
            
            if (selectedEvent && selectedEvent.type !== 'nothing') {
                // Aplicar efeito e mostrar
                selectedEvent.effect(teamToAffect);
                MatchEventManager.showMatchEvent(selectedEvent.text(teamToAffect));
            } else {
                // Mostrar evento 'nothing'
                MatchEventManager.showMatchEvent(MatchEventManager.EVENTS.find(e => e.type === 'nothing').text());
            }
        }
    }
};

const TutorialManager = {
    STORAGE_KEY: 'arena_tutorial_completed',
    currentStep: 1,
    
    hasCompleted: () => {
        return localStorage.getItem(TutorialManager.STORAGE_KEY) === 'true';
    },
    
    markCompleted: () => {
        localStorage.setItem(TutorialManager.STORAGE_KEY, 'true');
    },
    
    show: () => {
        if (TutorialManager.hasCompleted()) return;
        
        const overlay = document.getElementById('tutorial-overlay');
        if (overlay) {
            overlay.classList.remove('hidden');
            TutorialManager.currentStep = 1;
            TutorialManager.updateStep();
        }
    },
    
    hide: () => {
        const overlay = document.getElementById('tutorial-overlay');
        if (overlay) {
            overlay.classList.add('hidden');
        }
        TutorialManager.markCompleted();
    },
    
    nextStep: () => {
        const totalSteps = document.querySelectorAll('.tutorial-step').length;
        if (TutorialManager.currentStep < totalSteps) {
            TutorialManager.currentStep++;
            TutorialManager.updateStep();
        }
    },
    
    updateStep: () => {
        const steps = document.querySelectorAll('.tutorial-step');
        const dots = document.querySelectorAll('.progress-dot');
        
        steps.forEach(step => {
            const stepNum = parseInt(step.dataset.step);
            step.classList.toggle('hidden', stepNum !== TutorialManager.currentStep);
        });
        
        dots.forEach(dot => {
            const dotStep = parseInt(dot.dataset.step);
            dot.classList.toggle('active', dotStep === TutorialManager.currentStep);
        });
    },
    
    init: () => {
        // Event listeners para botões do tutorial
        document.querySelectorAll('.btn-tutorial-next').forEach(btn => {
            btn.addEventListener('click', TutorialManager.nextStep);
        });
        
        // Botões de finalizar (pode ter mais de um)
        const finishBtn = document.getElementById('btn-tutorial-finish');
        if (finishBtn) {
            finishBtn.addEventListener('click', TutorialManager.hide);
        }
        
        const finishBtnAlt = document.getElementById('btn-tutorial-finish-alt');
        if (finishBtnAlt) {
            finishBtnAlt.addEventListener('click', TutorialManager.hide);
        }
        
        const skipBtn = document.getElementById('btn-tutorial-skip');
        if (skipBtn) {
            skipBtn.addEventListener('click', TutorialManager.hide);
        }
        
        // Permitir clicar nos dots para navegar
        document.querySelectorAll('.progress-dot').forEach(dot => {
            dot.addEventListener('click', () => {
                const stepNum = parseInt(dot.dataset.step);
                if (stepNum) {
                    TutorialManager.currentStep = stepNum;
                    TutorialManager.updateStep();
                }
            });
        });
    }
};

// ==================== AUTO SIMULATION SYSTEM ====================
const AutoSimulator = {
    isSimulating: false,
    
    showOverlay: (status) => {
        const overlay = document.getElementById('auto-sim-overlay');
        const statusEl = document.getElementById('auto-sim-status');
        if (overlay) overlay.classList.remove('hidden');
        if (statusEl) statusEl.textContent = status || 'Processando partidas...';
    },
    
    hideOverlay: () => {
        const overlay = document.getElementById('auto-sim-overlay');
        if (overlay) overlay.classList.add('hidden');
    },
    
    simulateUserMatch: () => {
        return new Promise((resolve) => {
            const userMatch = ArcadeManager.getNextUserMatch();
            if (!userMatch) {
                resolve(null);
                return;
            }
            
            const homeTeam = brazilianTeams.find(t => t.id === userMatch.home);
            const awayTeam = brazilianTeams.find(t => t.id === userMatch.away);
            
            const homeOverall = ArcadeManager.getTeamOverall(userMatch.home);
            const awayOverall = ArcadeManager.getTeamOverall(userMatch.away);
            
            // Simular resultado baseado em overall
            const overallDiff = homeOverall - awayOverall;
            const homeAdvantage = 0.15; // 15% vantagem casa
            
            // Cálculo de gols com influência do overall
            let homeGoals = Math.floor(Math.random() * 4);
            let awayGoals = Math.floor(Math.random() * 3);
            
            // Ajuste baseado em overall
            if (overallDiff > 10) {
                homeGoals += Math.random() < 0.5 ? 1 : 0;
            } else if (overallDiff < -10) {
                awayGoals += Math.random() < 0.5 ? 1 : 0;
            }
            
            // Vantagem de jogar em casa
            if (Math.random() < homeAdvantage) {
                homeGoals += 1;
            }
            
            resolve({
                home: homeTeam,
                away: awayTeam,
                homeGoals,
                awayGoals
            });
        });
    },
    
    runAutoSimulation: async () => {
        if (AutoSimulator.isSimulating) return;
        if (currentGameMode !== 'arcade') return;
        
        AutoSimulator.isSimulating = true;
        AutoSimulator.showOverlay('Simulando sua partida...');
        
        // Simular partida do usuário
        await new Promise(r => setTimeout(r, 800)); // Delay para UX
        
        const result = await AutoSimulator.simulateUserMatch();
        
        if (result) {
            AutoSimulator.showOverlay(`${result.home.shortName} ${result.homeGoals} x ${result.awayGoals} ${result.away.shortName}`);
            
            await new Promise(r => setTimeout(r, 1000));
            
            // Registrar resultado
            ArcadeManager.registerUserResult(result.home.id, result.away.id, result.homeGoals, result.awayGoals);
            
            AutoSimulator.showOverlay('Atualizando tabela...');
            await new Promise(r => setTimeout(r, 600));
        }
        
        AutoSimulator.hideOverlay();
        AutoSimulator.isSimulating = false;
        
        // Verificar campeão
        const champion = ArcadeManager.checkChampion();
        if (champion) {
            showChampionScreen(champion);
        } else {
            updateArcadeDashboard();
        }
    }
};

// ==================== CONTEXTUAL ANIMATIONS ====================
const AnimationEffects = {
    // Tremida na arena ao marcar gol
    shakeArena: () => {
        const arena = document.getElementById('arena');
        if (arena) {
            arena.classList.add('goal-scored');
            setTimeout(() => arena.classList.remove('goal-scored'), 400);
        }
    },
    
    // Flash no placar ao mudar
    flashScore: (teamNum) => {
        const scoreEl = document.getElementById(`score${teamNum}`);
        if (scoreEl) {
            scoreEl.classList.add('score-pulse');
            setTimeout(() => scoreEl.classList.remove('score-pulse'), 300);
        }
    },
    
    // Flash de virada (quando um time vira o placar)
    flashTurnaround: () => {
        const scoreboard = document.querySelector('.scoreboard');
        if (scoreboard) {
            scoreboard.classList.add('turnaround-flash');
            setTimeout(() => scoreboard.classList.remove('turnaround-flash'), 800);
        }
    },
    
    // Efeito de campeão
    glowChampion: () => {
        const shieldContainer = document.getElementById('champion-shield-container');
        if (shieldContainer) {
            shieldContainer.classList.add('champion-glow');
        }
    },
    
    // Brilho no escudo do time que marcou
    glowScorer: (teamNum) => {
        const shield = document.getElementById(`game-shield${teamNum}`);
        if (shield) {
            shield.classList.add('shield-glow');
            setTimeout(() => shield.classList.remove('shield-glow'), 1600);
        }
    }
};

// Shield states
let shield1 = { x: 0, y: 0, vx: 0, vy: 0, angle: 0, vRot: 0 };
let shield2 = { x: 0, y: 0, vx: 0, vy: 0, angle: 0, vRot: 0 };

// ==================== DOM ELEMENTS ====================
const mainMenu = document.getElementById('main-menu');
const btnModeQuick = document.getElementById('btn-mode-quick');
const btnModeArcade = document.getElementById('btn-mode-arcade');

const selectionScreen = document.getElementById('selection-screen');
const selectionTitle = document.getElementById('selection-title');
const selectionSubtitle = document.getElementById('selection-subtitle');
const vsSeparator = document.getElementById('vs-separator');
const btnBackMenu = document.getElementById('btn-back-menu');

const arcadeDashboard = document.getElementById('arcade-dashboard');
const arcadeUserTeamName = document.getElementById('arcade-user-team');
const currentRoundNum = document.getElementById('current-round-num');
const arcadeHomeShield = document.getElementById('arcade-home-shield');
const arcadeAwayShield = document.getElementById('arcade-away-shield');
const arcadeHomeName = document.getElementById('arcade-home-name');
const arcadeAwayName = document.getElementById('arcade-away-name');
const btnPlayRound = document.getElementById('btn-play-round');
const arcadeStandingsList = document.getElementById('arcade-standings-list');
const btnQuitArcade = document.getElementById('btn-quit-arcade');

const championScreen = document.getElementById('champion-screen');
const championShieldContainer = document.getElementById('champion-shield-container');
const championName = document.getElementById('champion-name');
const championDetails = document.getElementById('champion-details');
const btnFinishArcade = document.getElementById('btn-finish-arcade');

const matchScreen = document.getElementById('match-screen');
const teamsGrid = document.getElementById('teams-grid');
const slot1 = document.getElementById('slot1');
const slot2 = document.getElementById('slot2');
const btnStart = document.getElementById('btn-start');
const btnBack = document.getElementById('btn-back');
const btnNextAction = document.getElementById('btn-next-action'); // Antigo play-again
const scoreboardShield1 = document.getElementById('scoreboard-shield1');
const scoreboardShield2 = document.getElementById('scoreboard-shield2');
const score1El = document.getElementById('score1');
const score2El = document.getElementById('score2');
const matchTimeEl = document.getElementById('match-time');
const arena = document.getElementById('arena');
const arenaLines = document.getElementById('arena-lines');
const goalZone = document.getElementById('goal-zone');
const goalBurst = document.getElementById('goal-burst');
const gameShield1 = document.getElementById('game-shield1');
const gameShield2 = document.getElementById('game-shield2');
const goalOverlay = document.getElementById('goal-overlay');
const goalShield = document.getElementById('goal-shield');
const goalTeamName = document.getElementById('goal-team-name');
const resultOverlay = document.getElementById('result-overlay');
const resultTitle = document.getElementById('result-title');
const resultDisplay = document.getElementById('result-display');
const finalScore = document.getElementById('final-score');
const bgSlideshow = document.getElementById('bg-slideshow');
const startMatchMessage = document.getElementById('match-start-message');

const btnToggleSound = document.getElementById('btn-toggle-sound');
const btnPrevMusic = document.getElementById('btn-prev-music');
const btnPlayPauseMusic = document.getElementById('btn-play-pause');
const btnNextMusic = document.getElementById('btn-next-music');

const btnShowHistory = document.getElementById('btn-show-history') || document.getElementById('btn-show-history-top');
const historyOverlay = document.getElementById('history-overlay');
const historyList = document.getElementById('history-list');
const btnCloseHistory = document.getElementById('btn-close-history');
const btnClearHistory = document.getElementById('btn-clear-history');

const btnShowStats = document.getElementById('btn-show-stats') || document.getElementById('btn-show-stats-top');
const statsOverlay = document.getElementById('stats-overlay');
const statsList = document.getElementById('stats-list');
const btnCloseStats = document.getElementById('btn-close-stats');
const btnResetStats = document.getElementById('btn-reset-stats');


/// ==================== SOUND MANAGER ========================
let currentBgIndex = 0;
function startBgSlideshow() {
    if (!bgSlideshow) return;
    setInterval(() => {
        currentBgIndex = (currentBgIndex + 1) % BG_IMAGES.length;
        bgSlideshow.style.backgroundImage = `url('${BG_IMAGES[currentBgIndex]}')`;
    }, 6000);
}

// ==================== MENU & NAVIGATION ====================

// Função para transição suave entre telas
function smoothTransition(hideElement, showElement, callback) {
    hideElement.style.opacity = '0';
    hideElement.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
        hideElement.classList.add('hidden');
        hideElement.style.opacity = '';
        hideElement.style.transform = '';
        
        showElement.classList.remove('hidden');
        showElement.style.opacity = '0';
        showElement.style.transform = 'translateY(20px)';
        
        // Força reflow para a animação funcionar
        showElement.offsetHeight;
        
        showElement.style.opacity = '1';
        showElement.style.transform = 'translateY(0)';
        
        if (callback) callback();
    }, 300);
}

// Verifica e mostra opção de continuar campeonato
function checkSavedArcadeProgress() {
    const continueContainer = document.getElementById('continue-arcade-container');
    const continueInfo = document.getElementById('continue-info');
    
    if (StorageManager.hasArcadeProgress()) {
        const savedData = StorageManager.getArcadeProgress();
        const userTeam = brazilianTeams.find(t => t.id === savedData.userTeamId);
        
        if (userTeam && savedData.currentRound < savedData.schedule.length) {
            continueContainer.classList.remove('hidden');
            continueInfo.textContent = `Rodada ${savedData.currentRound + 1}/${savedData.schedule.length} com ${userTeam.name}`;
        } else {
            continueContainer.classList.add('hidden');
            StorageManager.clearArcadeProgress();
        }
    } else {
        continueContainer.classList.add('hidden');
    }
}

// Continuar campeonato salvo
function continueSavedArcade() {
    const savedData = StorageManager.getArcadeProgress();
    if (!savedData) return;
    
    currentGameMode = 'arcade';
    ArcadeManager.loadProgress(savedData);
    
    const userTeam = brazilianTeams.find(t => t.id === ArcadeManager.userTeamId);
    
    smoothTransition(mainMenu, arcadeDashboard, () => {
        arcadeUserTeamName.textContent = userTeam.name;
        updateArcadeHeaderBg(userTeam);
        updateArcadeDashboard();
    });
}

// Event listeners para continuar/deletar save
const btnContinueArcade = document.getElementById('btn-continue-arcade');
const btnDeleteSave = document.getElementById('btn-delete-save');

if (btnContinueArcade) {
    btnContinueArcade.addEventListener('click', continueSavedArcade);
}

if (btnDeleteSave) {
    btnDeleteSave.addEventListener('click', () => {
        if (confirm('Deseja apagar o progresso salvo? Esta ação não pode ser desfeita.')) {
            StorageManager.clearArcadeProgress();
            checkSavedArcadeProgress();
        }
    });
}

btnModeQuick.addEventListener('click', () => {
    currentGameMode = 'quick';
    
    // UI Reset for Quick Mode
    selectionTitle.innerHTML = "SELECIONE <span>OS TIMES</span>";
    selectionSubtitle.innerText = "Escolha dois times para o duelo";
    vsSeparator.classList.remove('hidden');
    slot2.classList.remove('hidden');
    btnStart.innerText = "JOGAR AGORA";
    
    smoothTransition(mainMenu, selectionScreen, initTeamSelection);
});

btnModeArcade.addEventListener('click', () => {
    currentGameMode = 'arcade';
    
    // UI Setup for Arcade Mode
    selectionTitle.innerHTML = "ESCOLHA <span>SEU TIME</span>";
    selectionSubtitle.innerText = "Quem você levará ao título?";
    vsSeparator.classList.add('hidden');
    slot2.classList.add('hidden'); // Esconde slot 2
    btnStart.innerText = "INICIAR CAMPANHA";
    
    smoothTransition(mainMenu, selectionScreen, initTeamSelection);
});

btnBackMenu.addEventListener('click', () => {
    selectedTeams = [];
    smoothTransition(selectionScreen, mainMenu, checkSavedArcadeProgress);
});

btnQuitArcade.addEventListener('click', () => {
    if(confirm("Sair do campeonato? Seu progresso será salvo automaticamente.")) {
        StorageManager.saveArcadeProgress();
        smoothTransition(arcadeDashboard, mainMenu, () => {
            sfx.stopCrowd();
            checkSavedArcadeProgress();
        });
    }
});

btnFinishArcade.addEventListener('click', () => {
    smoothTransition(championScreen, mainMenu, checkSavedArcadeProgress);
});

// ==================== HELPERS ====================
function createShield(team, size = 'md') {
  const sizeMap = { sm: 48, md: 64, lg: 80, xl: 120, xxl: 160 };
  const s = sizeMap[size];

  const shield = document.createElement('div');
  shield.className = `shield shield-${size}`;
  shield.style.background = `linear-gradient(135deg, ${team.primaryColor} 0%, ${team.primaryColor}dd 50%, ${team.secondaryColor} 100%)`;
  shield.style.border = `3px solid ${team.secondaryColor}`;
  shield.style.width = `${s}px`;
  shield.style.height = `${s}px`;

  const inner = document.createElement('div');
  inner.className = 'shield-inner';
  inner.style.background = `linear-gradient(180deg, ${team.primaryColor}ee 0%, ${team.primaryColor} 100%)`;

  const img = document.createElement('img');
  img.src = team.badge;
  img.alt = team.name;
  img.className = 'shield-img';

  inner.appendChild(img);
  shield.appendChild(inner);

  return shield;
}

function triggerConfetti(team, container = goalOverlay) {
  const colors = [team.primaryColor, team.secondaryColor, '#ffffff', '#FFD700'];
  for (let i = 0; i < 60; i++) {
    const el = document.createElement('div');
    el.classList.add('confetti');
    const left = Math.random() * 100;
    const animDuration = 2 + Math.random() * 1.5;
    const animDelay = Math.random() * 0.5;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = 8 + Math.random() * 8;
    el.style.left = `${left}%`;
    el.style.backgroundColor = color;
    el.style.width = `${size}px`;
    el.style.height = `${size}px`;
    el.style.animation = `confetti-fall ${animDuration}s linear ${animDelay}s forwards`;
    if (Math.random() > 0.5) el.style.borderRadius = '50%';
    container.appendChild(el);
  }
}

function clearConfetti() {
  const particles = document.querySelectorAll('.confetti');
  particles.forEach(p => p.remove());
}

// ==================== TEAM SELECTION ====================
function initTeamSelection() {
  teamsGrid.innerHTML = '';
  selectedTeams = [];
  
  sfx.loadTrack();
  sfx.playMusic();

  updateSlots();
  updateStartButton();

  brazilianTeams.forEach(team => {
    const card = document.createElement('div');
    card.className = 'team-card';
    card.dataset.teamId = team.id;
    if (selectedTeams.find(t => t.id === team.id)) card.classList.add('selected');

    const shield = createShield(team, 'md');
    const name = document.createElement('span');
    name.className = 'team-card-name';
    name.textContent = team.name;

    card.appendChild(shield);
    card.appendChild(name);
    card.addEventListener('click', () => selectTeam(team, card));
    teamsGrid.appendChild(card);
  });
  updateCardStates();
}

function selectTeam(team, card) {
  if (card.classList.contains('disabled')) return;
  sfx.init();

  const isSelected = selectedTeams.some(t => t.id === team.id);
  const maxSelection = currentGameMode === 'quick' ? 2 : 1;

  if (isSelected) {
    selectedTeams = selectedTeams.filter(t => t.id !== team.id);
    card.classList.remove('selected');
  } else if (selectedTeams.length < maxSelection) {
    selectedTeams.push(team);
    card.classList.add('selected');
  }
  
  updateSlots();
  updateStartButton();
  updateCardStates();
}

function updateSlots() {
  if(currentGameMode === 'quick') {
      slot1.innerHTML = selectedTeams[0] ? '' : 'Time Casa';
      slot2.innerHTML = selectedTeams[1] ? '' : 'Time Visitante';
      if (selectedTeams[0]) { slot1.classList.add('filled'); slot1.appendChild(createShield(selectedTeams[0], 'lg')); } else slot1.classList.remove('filled');
      if (selectedTeams[1]) { slot2.classList.add('filled'); slot2.appendChild(createShield(selectedTeams[1], 'lg')); } else slot2.classList.remove('filled');
  } else {
      // Arcade - Slot único
      slot1.innerHTML = selectedTeams[0] ? '' : 'Seu Time';
      if (selectedTeams[0]) { slot1.classList.add('filled'); slot1.appendChild(createShield(selectedTeams[0], 'lg')); } else slot1.classList.remove('filled');
  }
}

function updateStartButton() {
  const required = currentGameMode === 'quick' ? 2 : 1;
  btnStart.disabled = selectedTeams.length !== required;
}

function updateCardStates() {
  const maxSelection = currentGameMode === 'quick' ? 2 : 1;
  const cards = teamsGrid.querySelectorAll('.team-card');
  cards.forEach(card => {
    const isSelected = selectedTeams.some(t => t.id === card.dataset.teamId);
    if (!isSelected && selectedTeams.length >= maxSelection) card.classList.add('disabled');
    else card.classList.remove('disabled');
  });
}

// ==================== ARCADE LOGIC ====================
btnStart.addEventListener('click', () => {
    if(currentGameMode === 'quick') {
        team1 = selectedTeams[0];
        team2 = selectedTeams[1];
        startMatch();
    } else {
        startArcadeCampaign();
    }
});

function startArcadeCampaign() {
    selectionScreen.classList.add('hidden');
    arcadeDashboard.classList.remove('hidden');
    
    const userTeam = selectedTeams[0];
    ArcadeManager.init(userTeam.id);
    
    arcadeUserTeamName.textContent = userTeam.name;
    
    // Adicionar escudo no fundo do header
    updateArcadeHeaderBg(userTeam);
    
    updateArcadeDashboard();
}

// Função para atualizar o fundo do header com o escudo do time
function updateArcadeHeaderBg(team) {
    const headerBg = document.getElementById('arcade-team-header-bg');
    if (headerBg && team) {
        headerBg.style.backgroundImage = `url('${team.badge}')`;
        headerBg.style.opacity = '1';
    }
}

function updateArcadeDashboard() {
    currentRoundNum.textContent = (ArcadeManager.currentRound + 1) + "/" + ArcadeManager.schedule.length;
    
    // Atualiza UI de moedas e overall
    ArcadeManager.updateCoinsUI();
    
    // Atualiza tabela
    const leaderboard = ArcadeManager.getLeaderboard();
    arcadeStandingsList.innerHTML = '';
    leaderboard.forEach((t, index) => {
        const row = document.createElement('tr');
        if(t.id === ArcadeManager.userTeamId) row.classList.add('user-row');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <span class="stats-shield-wrapper">${createShield(t, 'sm').outerHTML}</span>
                    <span>${t.shortName}</span>
                </div>
            </td>
            <td><strong>${t.p}</strong></td>
            <td>${t.j}</td>
            <td>${t.v}</td>
            <td>${t.sg}</td>
        `;
        arcadeStandingsList.appendChild(row);
    });

    // Próximo Jogo
    const nextMatch = ArcadeManager.getNextUserMatch();
    if(nextMatch) {
        const t1 = brazilianTeams.find(t => t.id === nextMatch.home);
        const t2 = brazilianTeams.find(t => t.id === nextMatch.away);
        
        arcadeHomeShield.innerHTML = '';
        arcadeHomeShield.appendChild(createShield(t1, 'lg'));
        document.getElementById('arcade-home-name').textContent = t1.name;
        document.getElementById('arcade-home-overall').textContent = `OVR: ${ArcadeManager.getTeamOverall(t1.id)}`;
        
        arcadeAwayShield.innerHTML = '';
        arcadeAwayShield.appendChild(createShield(t2, 'lg'));
        document.getElementById('arcade-away-name').textContent = t2.name;
        document.getElementById('arcade-away-overall').textContent = `OVR: ${ArcadeManager.getTeamOverall(t2.id)}`;
        
        // Preparar global vars para a partida
        team1 = t1;
        team2 = t2;
    } else {
        // Campeonato acabou
    }
    
    // Atualizar botão de upgrade
    const btnUpgrade = document.getElementById('btn-upgrade-team');
    if (btnUpgrade) {
        const cost = 100 + (ArcadeManager.overallBoosts[ArcadeManager.userTeamId] * 50);
        btnUpgrade.disabled = ArcadeManager.coins < cost || ArcadeManager.getTeamOverall(ArcadeManager.userTeamId) >= 99;
    }
}

btnPlayRound.addEventListener('click', () => {
    arcadeDashboard.classList.add('hidden');
    startMatch();
});

function showChampionScreen(championTeam) {
    arcadeDashboard.classList.add('hidden');
    matchScreen.classList.add('hidden');
    resultOverlay.classList.add('hidden');
    
    championScreen.classList.remove('hidden');
    championName.textContent = championTeam.name;
    championShieldContainer.innerHTML = '';
    championShieldContainer.appendChild(createShield(championTeam, 'xxl'));
    championDetails.textContent = `${ArcadeManager.currentRound} Jogos • ${championTeam.p} Pontos`;
    
    // ANIMAÇÃO DE CAMPEÃO
    AnimationEffects.glowChampion();
    
    // Novo: Efeito de explosão de confetes e som de vitória
    triggerConfetti(championTeam, championScreen);
    sfx.playVictorySound(); // Nova função de som de vitória
    
    // Novo: Adicionar um efeito visual de explosão de fogos de artifício (se implementado)
    // Se não houver uma função específica de fogos de artifício, o confetti já ajuda.
    
    // Tocar música de vitória ou algo épico (usamos o padrão por enquanto)
}


// ==================== MATCH LOGIC ====================
function startMatch() {
  sfx.init();
  sfx.pauseMusic();
  
  // Esconder player durante a partida
  const playerBar = document.getElementById('music-player-bar');
  if(playerBar) playerBar.classList.remove('visible');

  // Reset Vars
  score1 = 0;
  score2 = 0;
  matchTime = 0;
  rotation = 0;
  startTime = 0;
  pausedTime = 0;
  goalCooldown = false;
  hasFirstGoal = false;
  isPlaying = false; 

  selectionScreen.classList.add('hidden');
  resultOverlay.classList.add('hidden');
  matchScreen.classList.remove('hidden');

  if(startMatchMessage) startMatchMessage.classList.remove('hidden');

  scoreboardShield1.innerHTML = '';
  scoreboardShield2.innerHTML = '';
  scoreboardShield1.appendChild(createShield(team1, 'md'));
  scoreboardShield2.appendChild(createShield(team2, 'md'));

  setupGameShield(gameShield1, team1);
  setupGameShield(gameShield2, team2);

  resetPositions();
  updateScoreboard();

  arenaLines.style.transform = `rotate(${rotation}deg)`;
  goalBurst.classList.remove('active');

  setTimeout(() => {
    if(startMatchMessage) startMatchMessage.classList.add('hidden');
    sfx.playWhistle();
    sfx.startCrowd();
    isPlaying = true;
    animationId = requestAnimationFrame(gameLoop);
  }, 2000);
}

function setupGameShield(el, team) {
  el.innerHTML = '';
  el.style.width = `${SHIELD_SIZE}px`;
  el.style.height = `${SHIELD_SIZE}px`;
  el.style.background = `linear-gradient(135deg, ${team.primaryColor}, ${team.secondaryColor})`;
  el.appendChild(createShield(team, 'sm'));
}

function resetPositions() {
  const margin = 60;
  const rangeY = ARENA_SIZE - (margin * 2);
  const rangeX = (ARENA_SIZE / 2) - margin - 20;

  shield1 = {
    x: margin + Math.random() * rangeX,
    y: margin + Math.random() * rangeY,
    vx: BASE_SPEED + Math.random() * 2,
    vy: (Math.random() - 0.5) * BASE_SPEED,
    angle: 0,
    vRot: 0
  };

  shield2 = {
    x: (ARENA_SIZE / 2) + 20 + Math.random() * rangeX,
    y: margin + Math.random() * rangeY,
    vx: -BASE_SPEED - Math.random() * 2,
    vy: (Math.random() - 0.5) * BASE_SPEED,
    angle: 0,
    vRot: 0
  };

  updateShieldPositions();
  goalCooldown = false;
}

function updateShieldPositions() {
  gameShield1.style.transform = `translate(${shield1.x - SHIELD_SIZE / 2}px, ${shield1.y - SHIELD_SIZE / 2}px)`;
  gameShield1.style.left = '0';
  gameShield1.style.top = '0';
  gameShield2.style.transform = `translate(${shield2.x - SHIELD_SIZE / 2}px, ${shield2.y - SHIELD_SIZE / 2}px)`;
  gameShield2.style.left = '0';
  gameShield2.style.top = '0';
}

function updateScoreboard() {
  score1El.textContent = score1;
  score2El.textContent = score2;
  matchTimeEl.textContent = `${matchTime}'`;
}

function gameLoop(timestamp) {
  if (!isPlaying) return;

  if (startTime === 0) startTime = timestamp - pausedTime;
  const elapsed = timestamp - startTime;
  const maxTime = (score1 === score2 && matchTime >= NORMAL_TIME && currentGameMode === 'quick') ? EXTRA_TIME : NORMAL_TIME;
  // No Arcade não tem prorrogação (empate é empate)
  
  matchTime = Math.min(Math.floor((elapsed / MATCH_DURATION_MS) * NORMAL_TIME), maxTime);
  updateScoreboard();

  // Fim de jogo
  if (matchTime >= maxTime && (currentGameMode === 'arcade' || score1 !== score2 || maxTime === EXTRA_TIME)) {
    endMatch();
    return;
  }

  // Rotação com multiplicador de velocidade
  const rotationSpeed = 0.72 * SPEED_SETTINGS[currentSpeed].rotationMult;
  if (hasFirstGoal) rotation = (rotation + rotationSpeed) % 360;
  arenaLines.style.transform = `rotate(${rotation}deg)`;
  
  updateShield(shield1, rotation);
  updateShield(shield2, rotation);
  
  // Aplica influência do overall dos times
  applyOverallBoost();

  // Tenta disparar um evento de partida
  MatchEventManager.triggerEvent(elapsed);

  if (checkCollision(shield1, shield2)) {
    handleCollision(shield1, shield2);
    sfx.playCollision();
  }

  if (!goalCooldown) {
    if (checkGoal(shield1, rotation)) { scoreGoal(team1, 1, elapsed); return; }
    if (checkGoal(shield2, rotation)) { scoreGoal(team2, 2, elapsed); return; }
  }

  updateShieldPositions();
  animationId = requestAnimationFrame(gameLoop);
}

function updateShield(shield, currentRotation) {
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
  const inGoalWidth = Math.abs(rx) < (halfGoalWidth - radius * 0.5);
  
  let effectiveMaxDist = arenaRadius - radius;
  if (inGoalWidth && ry > 0) effectiveMaxDist = arenaRadius + GOAL_DEPTH - radius;

  const distFromCenter = Math.sqrt(dx * dx + dy * dy);

  if (distFromCenter > effectiveMaxDist) {
    const nx = dx / distFromCenter;
    const ny = dy / distFromCenter;

    shield.x = centerX + nx * effectiveMaxDist;
    shield.y = centerY + ny * effectiveMaxDist;

    const dot = shield.vx * nx + shield.vy * ny;
    shield.vx -= 2 * dot * nx;
    shield.vy -= 2 * dot * ny;

    shield.vx += (Math.random() - 0.5) * 1.5;
    shield.vy += (Math.random() - 0.5) * 1.5;
  }

  const speed = Math.sqrt(shield.vx * shield.vx + shield.vy * shield.vy);
  if (speed > MAX_SPEED) {
    shield.vx = (shield.vx / speed) * MAX_SPEED;
    shield.vy = (shield.vy / speed) * MAX_SPEED;
  } else if (speed < MIN_SPEED) {
    shield.vx = (shield.vx / speed) * MIN_SPEED;
    shield.vy = (shield.vy / speed) * MIN_SPEED;
  }
}

function checkCollision(s1, s2) {
  const dx = s1.x - s2.x;
  const dy = s1.y - s2.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance < SHIELD_SIZE;
}

function handleCollision(s1, s2) {
  const dx = s2.x - s1.x;
  const dy = s2.y - s1.y;
  const distSq = dx * dx + dy * dy;
  const distance = Math.sqrt(distSq);

  if (distance === 0 || distance > SHIELD_SIZE) return;

  const nx = dx / distance;
  const ny = dy / distance;
  const dvx = s1.vx - s2.vx;
  const dvy = s1.vy - s2.vy;
  const velNormal = dvx * nx + dvy * ny;

  if (velNormal <= 0) return;

  let restitution = 0.8;
  if (Math.abs(velNormal) < 3) restitution = 0.95;
  else if (Math.abs(velNormal) > 10) restitution = 0.6;
  restitution += (Math.random() * 0.1 - 0.05);

  const j = -(1 + restitution) * velNormal;
  const impulse = j / 2;

  s1.vx += impulse * nx;
  s1.vy += impulse * ny;
  s2.vx -= impulse * nx;
  s2.vy -= impulse * ny;

  const percent = 0.5;
  const slop = 0.05;
  const penetration = SHIELD_SIZE - distance;

  if (penetration > slop) {
    const correctionMag = (penetration * percent);
    const cx = nx * correctionMag;
    const cy = ny * correctionMag;
    s1.x -= cx;
    s1.y -= cy;
    s2.x += cx;
    s2.y += cy;
  }
}

function checkGoal(shield, currentRotation) {
  const cx = ARENA_SIZE / 2;
  const cy = ARENA_SIZE / 2;
  let dx = shield.x - cx;
  let dy = shield.y - cy;
  const rad = -currentRotation * Math.PI / 180;
  const rx = dx * Math.cos(rad) - dy * Math.sin(rad);
  const ry = dx * Math.sin(rad) + dy * Math.cos(rad);
  const halfGoalWidth = GOAL_SIZE / 2;
  const shieldRadius = SHIELD_SIZE / 2;
  if (Math.abs(rx) > (halfGoalWidth - shieldRadius * 0.5)) return false;
  const arenaRadius = ARENA_SIZE / 2;
  if (ry > (arenaRadius + 5)) return true;
  return false;
}

// ==================== SISTEMA DE INFLUÊNCIA DO OVERALL ====================
// O overall influencia a velocidade e direção do escudo
// Times com overall maior têm vantagem sutil (mais chances de ir em direção ao gol)
function getOverallInfluence(teamId) {
    // No modo arcade, usa o overall com boost
    if (currentGameMode === 'arcade') {
        return ArcadeManager.getTeamOverall(teamId);
    }
    // No modo rápido, usa o overall base
    const team = brazilianTeams.find(t => t.id === teamId);
    return team ? team.overall : 75;
}

// Aplica influência do overall na física do jogo
function applyOverallBoost() {
    if (!isPlaying) return;
    
    const overall1 = getOverallInfluence(team1.id);
    const overall2 = getOverallInfluence(team2.id);
    
    // Diferença de overall (máximo ~30 pontos de diferença)
    const overallDiff = overall1 - overall2;
    
    // Fator de influência baseado na diferença (sutil, não exagerado)
    // Cada 10 pontos de diferença = ~5% de chance extra
    const influenceFactor = overallDiff * 0.005;
    
    // Chance aleatória de aplicar boost (não toda hora, para manter aleatoriedade)
    if (Math.random() < 0.15) { // 15% de chance por frame de aplicar influência
        
        // Calcula direção para o gol adversário
        const goalCenterX = ARENA_SIZE / 2;
        const goalCenterY = ARENA_SIZE + 20; // Gol fica "abaixo" considerando rotação
        
        // Time 1 (overall maior = mais chance de ir para o gol)
        if (influenceFactor > 0 && Math.random() < Math.abs(influenceFactor)) {
            // Pequeno impulso na direção do gol
            const dx1 = goalCenterX - shield1.x;
            const dy1 = goalCenterY - shield1.y;
            const dist1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
            if (dist1 > 0) {
                shield1.vx += (dx1 / dist1) * 0.3;
                shield1.vy += (dy1 / dist1) * 0.3;
            }
        }
        
        // Time 2 (overall maior = mais chance de ir para o gol)  
        if (influenceFactor < 0 && Math.random() < Math.abs(influenceFactor)) {
            const dx2 = goalCenterX - shield2.x;
            const dy2 = goalCenterY - shield2.y;
            const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
            if (dist2 > 0) {
                shield2.vx += (dx2 / dist2) * 0.3;
                shield2.vy += (dy2 / dist2) * 0.3;
            }
        }
    }
}



function scoreGoal(team, teamNum, elapsed) {
  // Detectar virada de placar ANTES de incrementar
  const wasLeading1 = score1 > score2;
  const wasLeading2 = score2 > score1;
  const wasTied = score1 === score2;
  
  // Salvar placar anterior para comentário contextual
  const prevScore1 = score1;
  const prevScore2 = score2;
  
  sfx.playGoal();
  goalBurst.classList.add('active');
  goalCooldown = true;
  isPlaying = false;
  hasFirstGoal = true;
  if (teamNum === 1) score1++; else score2++;
  pausedTime = elapsed;
  startTime = 0;
  
  // Registrar evento para comentário de IA
  const matchTimeNow = Math.floor((elapsed / MATCH_DURATION_MS) * NORMAL_TIME);
  AICommentator.registerEvent('goal', {
      team: teamNum,
      time: matchTimeNow,
      score1: score1,
      score2: score2,
      wasLateGame: matchTimeNow >= 75
  });
  
  // ANIMAÇÕES CONTEXTUAIS
  AnimationEffects.shakeArena();
  AnimationEffects.flashScore(teamNum);
  AnimationEffects.glowScorer(teamNum);
  
  // Detectar virada
  const isLeading1 = score1 > score2;
  const isLeading2 = score2 > score1;
  const wasTurnaround = (wasLeading1 && isLeading2) || (wasLeading2 && isLeading1);
  if (wasTurnaround) {
      AnimationEffects.flashTurnaround();
      AICommentator.registerEvent('turnaround', { team: teamNum });
  }
  
  showGoalOverlay(team, teamNum, prevScore1, prevScore2, matchTimeNow);
}

function showGoalOverlay(team, teamNum, prevScore1, prevScore2, matchTimeNow) {
  goalShield.innerHTML = '';
  goalShield.appendChild(createShield(team, 'xl'));
  goalTeamName.textContent = team.name;
  
  // Adicionar reação do comentarista CONTEXTUAL
  const goalReaction = document.getElementById('goal-reaction');
  if (goalReaction) {
      // Usar o novo método contextual
      const reaction = AICommentator.getGoalReaction(teamNum, prevScore1, prevScore2, matchTimeNow);
      goalReaction.textContent = reaction;
  }
  
  // Adicionar fogos de artifício
  triggerFireworks(team);
  triggerConfetti(team);
  
  goalOverlay.classList.remove('hidden');

  setTimeout(() => {
    goalOverlay.classList.add('fade-out');
    setTimeout(() => {
      goalOverlay.classList.add('hidden');
      goalOverlay.classList.remove('fade-out');
      clearConfetti();
      clearFireworks();
      goalBurst.classList.remove('active');
      resetPositions();
      updateScoreboard();
      isPlaying = true;
      animationId = requestAnimationFrame(gameLoop);
    }, 300);
  }, 2500);
}

function triggerFireworks(team) {
  const container = document.getElementById('fireworks-container');
  if (!container) return;
  
  const colors = [team.primaryColor, team.secondaryColor, '#ffd700', '#ff4444', '#00ff88'];
  
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const firework = document.createElement('div');
      firework.className = 'firework';
      firework.style.left = `${20 + Math.random() * 60}%`;
      firework.style.top = `${20 + Math.random() * 60}%`;
      firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      firework.style.boxShadow = `0 0 10px ${firework.style.backgroundColor}`;
      container.appendChild(firework);
      
      // Criar faíscas
      for (let j = 0; j < 8; j++) {
        const spark = document.createElement('div');
        spark.className = 'spark';
        spark.style.left = firework.style.left;
        spark.style.top = firework.style.top;
        spark.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        const angle = (j / 8) * Math.PI * 2;
        const distance = 30 + Math.random() * 30;
        spark.style.setProperty('--tx', `${Math.cos(angle) * distance}px`);
        spark.style.setProperty('--ty', `${Math.sin(angle) * distance}px`);
        container.appendChild(spark);
      }
    }, i * 100);
  }
}

function clearFireworks() {
  const container = document.getElementById('fireworks-container');
  if (container) container.innerHTML = '';
}

function endMatch() {
  isPlaying = false;
  sfx.playWhistle();
  sfx.stopCrowd();
  if (animationId) cancelAnimationFrame(animationId);

  // Lógica específica por modo
  if (currentGameMode === 'quick') {
      const matchData = {
        team1: team1.id, team1Name: team1.shortName,
        team2: team2.id, team2Name: team2.shortName,
        score1: score1, score2: score2,
        date: new Date().toLocaleString()
      };
      StorageManager.addMatch(matchData);
      showResultOverlay();
  } else {
      // ARCADE
      ArcadeManager.registerUserResult(team1.id, team2.id, score1, score2);
      showResultOverlay();
  }
}

function showResultOverlay() {
  const isDraw = score1 === score2;
  const winner = score1 > score2 ? team1 : team2;

  resultTitle.textContent = isDraw ? 'EMPATE!' : 'VENCEDOR';
  resultTitle.className = isDraw ? 'result-title' : 'result-title winner';

  resultDisplay.innerHTML = '';
  finalScore.innerHTML = '';

  if (isDraw) {
    const container = document.createElement('div');
    container.className = 'result-teams';
    container.appendChild(createShield(team1, 'lg'));
    const eq = document.createElement('span');
    eq.className = 'equals';
    eq.textContent = 'X';
    container.appendChild(eq);
    container.appendChild(createShield(team2, 'lg'));
    resultDisplay.appendChild(container);
  } else {
    const winnerWrapper = document.createElement('div');
    winnerWrapper.className = 'winner-solo-display';
    const bigShield = createShield(winner, 'xxl');
    bigShield.classList.add('winner-highlight');
    winnerWrapper.appendChild(bigShield);
    const name = document.createElement('h3');
    name.textContent = winner.name;
    name.style.marginTop = '15px';
    name.style.color = 'var(--accent-gold)';
    name.style.fontFamily = 'var(--font-display)';
    name.style.fontSize = '2rem';
    winnerWrapper.appendChild(name);
    resultDisplay.appendChild(winnerWrapper);
  }

  const scoreText = document.createElement('div');
  scoreText.className = 'final-score-large';
  scoreText.textContent = `${score1} - ${score2}`;
  finalScore.appendChild(scoreText);

  // Comentário do narrador IA com contexto completo
  const matchEvents = AICommentator.matchEvents;
  const hadTurnaround = matchEvents.some(e => e.type === 'turnaround');
  const hadLateGoal = matchEvents.some(e => e.type === 'goal' && e.data.wasLateGame);
  
  const context = {
      round: currentGameMode === 'arcade' ? ArcadeManager.currentRound : undefined,
      standings: currentGameMode === 'arcade' ? ArcadeManager.standings : undefined,
      userTeamId: currentGameMode === 'arcade' ? ArcadeManager.userTeamId : undefined,
      wasTurnaround: hadTurnaround,
      hadLateGoal: hadLateGoal
  };
  
  const aiComment = AICommentator.generateMatchComment(team1, team2, score1, score2, context);
  const commentEl = document.createElement('div');
  commentEl.className = 'ai-comment';
  commentEl.innerHTML = `<span class="comment-icon">🎙️</span> ${aiComment}`;
  finalScore.appendChild(commentEl);
  
  // Limpar eventos para próxima partida
  AICommentator.resetEvents();

  // Mostrar moedas ganhas no modo arcade
  if (currentGameMode === 'arcade') {
      const userIsHome = team1.id === ArcadeManager.userTeamId;
      const userScore = userIsHome ? score1 : score2;
      const opponentScore = userIsHome ? score2 : score1;
      
      let coinsEarned = 50;
      if (userScore > opponentScore) {
          coinsEarned += 100 + (userScore - opponentScore) * 20;
      } else if (userScore === opponentScore) {
          coinsEarned += 30;
      }
      coinsEarned += userScore * 10;
      
      const coinsEl = document.createElement('div');
      coinsEl.className = 'coins-earned';
      coinsEl.innerHTML = `<span class="coin-icon">🪙</span> +${coinsEarned} moedas`;
      finalScore.appendChild(coinsEl);
  }

  // Configurar botões
  const btnBackMenuResult = document.getElementById('btn-back-menu-result');
  
  if (currentGameMode === 'quick') {
      btnNextAction.innerText = "Revanche";
      btnNextAction.onclick = startMatch;
      if(btnBackMenuResult) btnBackMenuResult.classList.remove('hidden');
  } else {
      btnNextAction.innerText = "Voltar ao Campeonato";
      if(btnBackMenuResult) btnBackMenuResult.classList.add('hidden');
      btnNextAction.onclick = () => {
          resultOverlay.classList.add('hidden');
          matchScreen.classList.add('hidden');
          
          const champion = ArcadeManager.checkChampion();
          
          // Mostrar player ao voltar
          const playerBar = document.getElementById('music-player-bar');
          if(playerBar && !sfx.allMuted) {
              playerBar.classList.add('visible');
              sfx.playMusic();
          }

          if (champion) {
              showChampionScreen(champion);
          } else {
              arcadeDashboard.classList.remove('hidden');
              updateArcadeDashboard();
          }
      };
  }

  resultOverlay.classList.remove('hidden');
}

function backToSelection() {
  isPlaying = false;
  sfx.stopCrowd();
  if (animationId) cancelAnimationFrame(animationId);
  
  matchScreen.classList.add('hidden');
  resultOverlay.classList.add('hidden');
  
  // Mostrar player ao voltar
  const playerBar = document.getElementById('music-player-bar');
  if(playerBar && !sfx.allMuted) {
      playerBar.classList.add('visible');
      sfx.playMusic();
  }
  
  if (currentGameMode === 'quick') {
      selectionScreen.classList.remove('hidden');
      initTeamSelection(); 
  } else {
      arcadeDashboard.classList.remove('hidden');
      // Salvar progresso ao voltar para o dashboard
      StorageManager.saveArcadeProgress();
  }
}

// ==================== COMMON UI & LISTENERS ====================
btnBack.addEventListener('click', () => {
    isPlaying = false;
    sfx.stopCrowd();
    if (animationId) cancelAnimationFrame(animationId);
    
    matchScreen.classList.add('hidden');
    resultOverlay.classList.add('hidden');
    
    // Mostrar player ao voltar
    const playerBar = document.getElementById('music-player-bar');
    if(playerBar && !sfx.allMuted) {
        playerBar.classList.add('visible');
        sfx.playMusic();
    }
    
    if (currentGameMode === 'quick') {
        // No modo partida rápida, volta para o menu principal
        mainMenu.classList.remove('hidden');
        checkSavedArcadeProgress();
    } else {
        // No modo arcade, volta para o dashboard
        arcadeDashboard.classList.remove('hidden');
        StorageManager.saveArcadeProgress();
    }
});

btnToggleSound.addEventListener('click', () => {
    const isEnabled = sfx.toggleAllSound();
    btnToggleSound.textContent = isEnabled ? '🔊' : '🔇';
    btnToggleSound.classList.toggle('muted', !isEnabled);
    if(isEnabled) sfx.init();
});

// Toggle do player de música (expandir/recolher)
const btnTogglePlayer = document.getElementById('btn-toggle-player');
if(btnTogglePlayer) {
    btnTogglePlayer.addEventListener('click', () => {
        const playerBar = document.getElementById('music-player-bar');
        if(playerBar) playerBar.classList.toggle('expanded');
    });
}

if(btnPlayPauseMusic) btnPlayPauseMusic.addEventListener('click', () => { sfx.init(); sfx.togglePlayPause(); });
if(btnNextMusic) btnNextMusic.addEventListener('click', () => { sfx.init(); sfx.playNext(); });
if(btnPrevMusic) btnPrevMusic.addEventListener('click', () => { sfx.init(); sfx.playPrev(); });

const unlockAudio = () => {
    sfx.init();
    if(sfx.musicEnabled && !sfx.allMuted && sfx.bgmPlayer.paused && !isPlaying) {
       sfx.playMusic(); 
    }
    document.removeEventListener('click', unlockAudio);
    document.removeEventListener('touchstart', unlockAudio);
    document.removeEventListener('keydown', unlockAudio);
};
document.addEventListener('click', unlockAudio);
document.addEventListener('touchstart', unlockAudio);
document.addEventListener('keydown', unlockAudio);

// Funções de renderização (mantidas para compatibilidade, mas não usadas diretamente)
function renderHistory() {
    const history = StorageManager.getHistory();
    if (!historyList) return;
    historyList.innerHTML = '';
    
    if (history.length === 0) {
        historyList.innerHTML = '<p style="padding: 20px; color: var(--text-secondary);">Nenhuma partida registrada</p>';
        return;
    }
    
    history.forEach(match => {
        const item = document.createElement('div');
        item.className = 'history-item';
        const winner1 = match.score1 > match.score2 ? 'winner' : '';
        const winner2 = match.score2 > match.score1 ? 'winner' : '';
        item.innerHTML = `
            <span class="history-team ${winner1}">${match.team1Name}</span>
            <span class="history-score">${match.score1} - ${match.score2}</span>
            <span class="history-team ${winner2}">${match.team2Name}</span>
        `;
        historyList.appendChild(item);
    });
}

function renderStats() {
    const stats = StorageManager.getStats();
    if (!statsList) return;
    statsList.innerHTML = '';
    
    const teamsWithStats = brazilianTeams.map(team => {
        const s = stats[team.id] || { w: 0, d: 0, l: 0, gf: 0, ga: 0, m: 0 };
        return {
            ...team,
            pts: (s.w * 3) + s.d,
            ...s
        };
    }).filter(t => t.m > 0).sort((a, b) => b.pts - a.pts);
    
    if (teamsWithStats.length === 0) {
        statsList.innerHTML = '<tr><td colspan="7" style="padding: 20px; text-align: center;">Nenhuma estatística registrada</td></tr>';
        return;
    }
    
    teamsWithStats.forEach(t => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td style="display: flex; align-items: center; gap: 10px; text-align: left;">
                <span class="stats-shield-wrapper">${createShield(t, 'sm').outerHTML}</span>
                <span>${t.shortName}</span>
            </td>
            <td><strong>${t.pts}</strong></td>
            <td>${t.m}</td>
            <td>${t.w}</td>
            <td>${t.d}</td>
            <td>${t.l}</td>
            <td>${t.gf}</td>
        `;
        statsList.appendChild(row);
    });
}

// Eventos para histórico e estatísticas (se os elementos existirem)
if(btnShowHistory) btnShowHistory.addEventListener('click', () => { renderHistory(); historyOverlay.classList.remove('hidden'); });
if(btnCloseHistory) btnCloseHistory.addEventListener('click', () => { historyOverlay.classList.add('hidden'); });
if(btnClearHistory) btnClearHistory.addEventListener('click', () => { if(confirm('Limpar?')) { StorageManager.clearHistory(); renderHistory(); } });

if(btnShowStats) btnShowStats.addEventListener('click', () => { renderStats(); statsOverlay.classList.remove('hidden'); });
if(btnCloseStats) btnCloseStats.addEventListener('click', () => { statsOverlay.classList.add('hidden'); });
if(btnResetStats) btnResetStats.addEventListener('click', () => { if(confirm('Zerar?')) { StorageManager.clearStats(); renderStats(); } });

// Botão de voltar ao menu no resultado (partida rápida)
const btnBackMenuResult = document.getElementById('btn-back-menu-result');
if(btnBackMenuResult) {
    btnBackMenuResult.addEventListener('click', () => {
        resultOverlay.classList.add('hidden');
        matchScreen.classList.add('hidden');
        mainMenu.classList.remove('hidden');
        
        // Mostrar player novamente
        const playerBar = document.getElementById('music-player-bar');
        if(playerBar && !sfx.allMuted) {
            playerBar.classList.add('visible');
            sfx.playMusic();
        }
        
        // Verificar progresso salvo
        checkSavedArcadeProgress();
    });
}

// Botão de upgrade do time
const btnUpgradeTeam = document.getElementById('btn-upgrade-team');
if (btnUpgradeTeam) {
    btnUpgradeTeam.addEventListener('click', () => {
        if (ArcadeManager.upgradeTeam()) {
            updateArcadeDashboard();
            // Feedback visual
            btnUpgradeTeam.textContent = '✅ Time Melhorado!';
            setTimeout(() => {
                const cost = 100 + (ArcadeManager.overallBoosts[ArcadeManager.userTeamId] * 50);
                btnUpgradeTeam.innerHTML = `⬆️ Melhorar Time (<span id="upgrade-cost">${cost}</span> 🪙)`;
            }, 1500);
        } else {
            btnUpgradeTeam.textContent = '❌ Moedas insuficientes!';
            setTimeout(() => {
                const cost = 100 + (ArcadeManager.overallBoosts[ArcadeManager.userTeamId] * 50);
                btnUpgradeTeam.innerHTML = `⬆️ Melhorar Time (<span id="upgrade-cost">${cost}</span> 🪙)`;
            }, 1500);
        }
    });
}

// ==================== MENU LATERAL E MODAL ====================
function initNavigation() {
    const sidebar = document.getElementById('mobile-sidebar');
    const btnMenuMobile = document.getElementById('btn-menu-mobile');
    const btnCloseSidebar = document.getElementById('btn-close-sidebar');
    const sidebarOverlay = sidebar?.querySelector('.sidebar-overlay');
    const infoModal = document.getElementById('info-modal');
    const btnCloseModal = document.getElementById('btn-close-modal');
    const modalOverlay = infoModal?.querySelector('.info-modal-overlay');
    
    // Abrir sidebar
    btnMenuMobile?.addEventListener('click', () => {
        sidebar?.classList.add('open');
    });
    
    // Fechar sidebar
    const closeSidebar = () => sidebar?.classList.remove('open');
    btnCloseSidebar?.addEventListener('click', closeSidebar);
    sidebarOverlay?.addEventListener('click', closeSidebar);
    
    // Fechar modal
    const closeModal = () => {
        infoModal?.classList.add('hidden');
        document.querySelectorAll('.info-section').forEach(s => s.classList.add('hidden'));
    };
    btnCloseModal?.addEventListener('click', closeModal);
    modalOverlay?.addEventListener('click', closeModal);
    
    // Links de navegação (header e sidebar)
    document.querySelectorAll('[data-section]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.dataset.section;
            openInfoModal(section);
            closeSidebar();
        });
    });
}

function openInfoModal(section) {
    const infoModal = document.getElementById('info-modal');
    const sectionEl = document.getElementById(`info-${section}`);
    
    if (infoModal && sectionEl) {
        // Esconder todas as seções
        document.querySelectorAll('.info-section').forEach(s => s.classList.add('hidden'));
        // Mostrar a seção selecionada
        sectionEl.classList.remove('hidden');
        // Mostrar o modal
        infoModal.classList.remove('hidden');
    }
}

// ==================== INICIALIZAÇÃO ====================
function initApp() {
  startBgSlideshow();
  checkSavedArcadeProgress();
  
  // Inicializar Tutorial
  TutorialManager.init();
  
  // Inicializar controles de velocidade
  initSpeedControls();
    
  // Inicializar botão de auto simulação
  initAutoSimulateButton();
  
  // Inicializar navegação (menu lateral e modal)
  initNavigation();
  
  // Adiciona transição suave a todas as telas
  document.querySelectorAll('.screen').forEach(screen => {
      screen.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  });
  
  // Mostrar tela inicial
  showScreen('menu');
  // O tutorial é chamado dentro de showScreen('menu') agora.
  // A chamada direta foi removida para evitar reexibição.
}

// Iniciar aplicação
document.addEventListener('DOMContentLoaded', initApp);

// ==================== SPEED CONTROLS ====================
function initSpeedControls() {
    const speedBtns = document.querySelectorAll('.speed-btn');
    speedBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const speed = btn.dataset.speed;
            setGameSpeed(speed);
            
            // Atualizar UI
            speedBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
}

function setGameSpeed(speed) {
    if (SPEED_SETTINGS[speed]) {
        currentSpeed = speed;
        MATCH_DURATION_MS = SPEED_SETTINGS[speed].matchDuration;
    }
}

// ==================== AUTO SIMULATE BUTTON ====================
function initAutoSimulateButton() {
    const btnAutoSim = document.getElementById('btn-auto-simulate');
    if (btnAutoSim) {
        btnAutoSim.addEventListener('click', () => {
            AutoSimulator.runAutoSimulation();
        });
    }
}
