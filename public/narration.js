// ==================== SISTEMA DE NARRAÇÃO AVANÇADO (SIDEBAR) ====================
const NarrationDatabase = {
    kickoff: [
        'Começa o espetáculo! A bola já está rolando na Arena!',
        'Apita o árbitro! Vamos para os 90 minutos de pura emoção.',
        'Autoriza o juiz! Começa a partida decisiva!',
        'Está valendo! A saída de bola é do {team1}.',
        'Tudo pronto! A bola rola no gramado sagrado.'
    ],
    neutral: [
        '{team} trabalha a bola no meio de campo.',
        'O jogo está muito estudado neste momento.',
        '{team} tenta encontrar espaços na defesa adversária.',
        'Muita disputa pela posse de bola no círculo central.',
        'A torcida do {team} faz barulho na arquibancada!',
        '{team} roda a bola com paciência.',
        'O técnico do {team} pede mais intensidade.',
        'Troca de passes envolvente do {team}.',
        'O jogo segue equilibrado, ninguém quer errar.',
        'Marcação forte do {team} na saída de bola.'
    ],
    attack: [
        'Lá vem o {team} com perigo!',
        'Olha a chance do {team}...',
        'Bola enfiada para o ataque do {team}!',
        '{team} pressiona e busca o primeiro gol!',
        'Que jogada individual do ataque do {team}!',
        'O {team} chega com muito volume de jogo.',
        'Perigo! A bola ronda a área do {team}.',
        'Chute perigoso do {team}!!! Passou perto!'
    ],
    defense: [
        'Corta a zaga do {team} na hora certa!',
        'A defesa do {team} afasta o perigo de qualquer maneira.',
        'Goleirão do {team} sai bem do gol e fica com ela.',
        'Desarme preciso da defesa do {team}.',
        'Bloqueio fundamental da zaga do {team}.',
        'A defesa do {team} está uma parede hoje.'
    ],
    goal: [
        'É GOOOOOOOOL!!! Do {team}!',
        'Está na rede! O {team} abre o placar!',
        'GOLAÇO! Uma pintura do {team} na Arena!',
        'Olho no lance... É caixa! Gol do {team}!',
        'Explode a torcida! Gol do {team}!',
        'Não perca a conta! Mais um do {team} para a alegria da galera!',
        'A rede balança! O {team} deixa sua marca!'
    ],
    end: [
        'Apita o árbitro! Fim de papo na Arena!',
        'Termina o jogo! Que partida tivemos hoje.',
        'Fim de jogo! O resultado está decretado.',
        'Acabou! Uma grande disputa dentro de campo.'
    ]
};

class NarrationEngine {
    constructor() {
        this.feed = document.getElementById('narration-feed');
        this.lastCommentTime = 0;
        this.commentInterval = 4000; // Comentários mais frequentes
        this.team1Name = 'CASA';
        this.team2Name = 'VISITANTE';
    }

    init(t1, t2) {
        this.team1Name = t1;
        this.team2Name = t2;
        this.feed = document.getElementById('narration-feed');
        if (this.feed) this.feed.innerHTML = '';

        // Frase inicial
        if (NarrationDatabase && NarrationDatabase.kickoff) {
            const text = NarrationDatabase.kickoff[Math.floor(Math.random() * NarrationDatabase.kickoff.length)].replace('{team1}', t1);
            this.addComment('system', '0\'', text);
        }
    }

    addComment(type, time, text) {
        if (!this.feed) this.feed = document.getElementById('narration-feed');
        if (!this.feed) return;

        const item = document.createElement('div');
        item.className = `narration-item ${type}`;

        item.innerHTML = `<span class="narration-time animate-pop">${time}</span><p class="narration-text">${text}</p>`;

        this.feed.appendChild(item);
        this.feed.scrollTop = this.feed.scrollHeight;

        if (this.feed.children.length > 50) {
            this.feed.firstElementChild.remove();
        }
    }

    generateContextualComment(matchTime, team1Name, team2Name) {
        const now = Date.now();
        // Aumentei o intervalo para não ficar spamando, mas com check aleatório
        if (now - this.lastCommentTime < this.commentInterval) return;

        // Atualizar nomes se necessário
        if (team1Name) this.team1Name = team1Name;
        if (team2Name) this.team2Name = team2Name;

        this.lastCommentTime = now;

        const timeStr = matchTime + "'";

        const rand = Math.random();
        let category = 'neutral';
        if (rand > 0.6) category = 'attack';
        else if (rand > 0.9) category = 'defense';

        const templates = NarrationDatabase[category];
        const template = templates[Math.floor(Math.random() * templates.length)];

        const activeTeam = Math.random() > 0.5 ? this.team1Name : this.team2Name;

        const finalComment = template.replace(/{team}/g, activeTeam);
        this.addComment('normal', timeStr, finalComment);
    }

    registerGoal(teamName, time) {
        const templates = NarrationDatabase.goal;
        const template = templates[Math.floor(Math.random() * templates.length)];
        const text = template.replace(/{team}/g, teamName);
        this.addComment('goal', time + "'", text);
        this.lastCommentTime = Date.now() + 3000;
    }
}

// Instância global
const Narrator = new NarrationEngine();
