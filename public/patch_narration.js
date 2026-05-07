// Patch para injetar a narração sem modificar o script.js gigante que está com problemas de encoding

// 1. Hook no startMatch
// Salvamos a referência original, mas precisamos ter cuidado com a execução
const originalStartMatch = startMatch;
startMatch = function (teamA, teamB) {
    // Executa a função original
    originalStartMatch(teamA, teamB);

    // Injeta a inicialização do narrador
    // Usamos setTimeout para garantir que as variáveis globais team1/team2 já foram definidas
    setTimeout(() => {
        if (typeof Narrator !== 'undefined' && typeof team1 !== 'undefined' && typeof team2 !== 'undefined') {
            Narrator.init(team1.name, team2.name);
        }
    }, 100);
};

// 2. Hook no scoreGoal
const originalScoreGoal = scoreGoal;
scoreGoal = function (team, teamNum, elapsed) {
    originalScoreGoal(team, teamNum, elapsed);

    if (typeof Narrator !== 'undefined') {
        // Recalcular tempo ou pegar global se possível. 
        // Em script.js: matchTime = Math.min(...)
        const timeNow = typeof matchTime !== 'undefined' ? matchTime : 0;
        Narrator.registerGoal(team.name, timeNow);
    }
};

// 3. Hook no gameLoop
// Esse é delicado. A função original chama requestAnimationFrame(gameLoop) no final.
// Ao redefinir gameLoop globalmente, a chamada recursiva deve pegar essa nova versão.
const originalGameLoop = gameLoop;
gameLoop = function (timestamp) {
    originalGameLoop(timestamp);

    if (isPlaying && typeof Narrator !== 'undefined' && typeof team1 !== 'undefined' && typeof team2 !== 'undefined') {
        // Usamos variáveis globais que o originalGameLoop atualizou
        Narrator.generateContextualComment(matchTime, team1.name, team2.name);
    }
};

// 4. Hook no endMatch
const originalEndMatch = endMatch;
endMatch = function () {
    originalEndMatch();

    // Comentário final no sidebar (Narrator)
    if (typeof Narrator !== 'undefined' && NarrationDatabase.end) {
        const endText = NarrationDatabase.end[Math.floor(Math.random() * NarrationDatabase.end.length)];
        Narrator.addComment('system', '90\'', endText);
    }

    // Comentário final da IA no modal de resultados!
    setTimeout(async () => {
        const commentEl = document.querySelector('#result-overlay .ai-comment');
        if (!commentEl) return;

        const originalHtml = commentEl.innerHTML;
        commentEl.innerHTML = `<span class="comment-icon">🎙️</span> <em>Galvão Bueno está preparando a análise final...</em>`;

        try {
            const s1 = typeof score1 !== 'undefined' ? score1 : 0;
            const s2 = typeof score2 !== 'undefined' ? score2 : 0;
            const t1Name = typeof team1 !== 'undefined' ? team1.name : 'Casa';
            const t2Name = typeof team2 !== 'undefined' ? team2.name : 'Visitante';

            const res = await fetch('/api/narrate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    time: '90',
                    team1: t1Name,
                    team2: t2Name,
                    category: 'end',
                    score: `${s1} : ${s2}`,
                    lastComments: []
                })
            });

            if (res.ok) {
                const data = await res.json();
                if (data.narration) {
                    commentEl.innerHTML = `<span class="comment-icon">💬</span> ${data.narration}`;
                    return;
                }
            }
        } catch (err) {
            console.warn('Erro ao gerar análise final com IA:', err);
        }

        // Restaura original em caso de falha ou sem chave
        commentEl.innerHTML = originalHtml;
    }, 100);
};

console.log("Narration Patch Applied Successfully!");
