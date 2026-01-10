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

console.log("Narration Patch Applied Successfully!");
