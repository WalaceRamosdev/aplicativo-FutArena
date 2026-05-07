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
        this.commentInterval = 8000; // Intervalo saudável para evitar gargalos na API
        this.team1Name = 'CASA';
        this.team2Name = 'VISITANTE';
        this.recentComments = [];
        this.isFetching = false;
    }

    init(t1, t2) {
        this.team1Name = t1;
        this.team2Name = t2;
        this.feed = document.getElementById('narration-feed');
        if (this.feed) this.feed.innerHTML = '';
        this.recentComments = [];
        this.isFetching = false;

        // Frase inicial
        if (NarrationDatabase && NarrationDatabase.kickoff) {
            const text = NarrationDatabase.kickoff[Math.floor(Math.random() * NarrationDatabase.kickoff.length)].replace('{team1}', t1);
            this.addComment('system', '0\'', text);
            this.recentComments.push(text);
        }
    }

    addComment(type, time, text) {
        if (!this.feed) this.feed = document.getElementById('narration-feed');
        if (!this.feed) return;

        const item = document.createElement('div');
        item.className = `narration-item ${type}`;

        item.innerHTML = `<span class="narration-time animate-pop">${time}</span><p class="narration-text">${text}</p>`;

        this.feed.appendChild(item);
        
        // Garante o scroll automático suave tanto em navegadores normais quanto em flex-reverse
        setTimeout(() => {
            // Em column-reverse, definir scrollTop para 0 ou scrollHeight força o foco no novo item
            this.feed.scrollTop = 0;
            this.feed.scrollTop = this.feed.scrollHeight;
        }, 50);

        // Efeito de desvanecimento (Fade out) progressivo e destaque do comentário mais recente
        const comments = Array.from(this.feed.children);
        comments.reverse().forEach((el, idx) => {
            const textEl = el.querySelector('.narration-text');
            const timeEl = el.querySelector('.narration-time');
            
            if (idx === 0) {
                // Comentário mais recente: Destaque máximo
                el.style.opacity = '1';
                el.style.transform = 'scale(1.02)';
                el.style.background = 'rgba(255, 255, 255, 0.08)';
                if (textEl) {
                    textEl.style.color = '#ffffff';
                    textEl.style.fontWeight = '600';
                }
                if (timeEl) {
                    timeEl.style.color = 'var(--accent-green)';
                }
            } else if (idx === 1) {
                // Segundo mais recente: Começa a desvanecer
                el.style.opacity = '0.65';
                el.style.transform = 'scale(1)';
                el.style.background = 'rgba(255, 255, 255, 0.03)';
                if (textEl) {
                    textEl.style.color = '#cccccc';
                    textEl.style.fontWeight = 'normal';
                }
            } else if (idx === 2) {
                // Terceiro mais recente: Bem mais apagado
                el.style.opacity = '0.35';
                el.style.transform = 'scale(0.98)';
                el.style.background = 'rgba(255, 255, 255, 0.02)';
                if (textEl) {
                    textEl.style.color = '#999999';
                    textEl.style.fontWeight = 'normal';
                }
            } else if (idx === 3) {
                // Quarto mais recente: Quase sumindo
                el.style.opacity = '0.15';
                el.style.transform = 'scale(0.96)';
                el.style.background = 'rgba(255, 255, 255, 0.01)';
                if (textEl) {
                    textEl.style.color = '#777777';
                    textEl.style.fontWeight = 'normal';
                }
            } else {
                // Antigos: Praticamente invisíveis ou ocultados do fluxo visual para focar 100% no jogo
                el.style.opacity = '0.04';
                el.style.transform = 'scale(0.94)';
                el.style.background = 'transparent';
                if (textEl) {
                    textEl.style.color = '#555555';
                }
            }
        });

        if (this.feed.children.length > 5) {
            this.feed.firstElementChild.remove();
        }
    }

    getLocalComment(category) {
        const templates = NarrationDatabase[category] || NarrationDatabase.neutral;
        const template = templates[Math.floor(Math.random() * templates.length)];
        const activeTeam = Math.random() > 0.5 ? this.team1Name : this.team2Name;
        return template.replace(/{team}/g, activeTeam).replace('{team1}', this.team1Name);
    }

    async generateContextualComment(matchTime, team1Name, team2Name) {
        const now = Date.now();
        if (now - this.lastCommentTime < this.commentInterval) return;
        if (this.isFetching) return;

        if (team1Name) this.team1Name = team1Name;
        if (team2Name) this.team2Name = team2Name;

        this.lastCommentTime = now;

        const timeStr = matchTime + "'";
        const score1 = document.getElementById('score1')?.textContent || '0';
        const score2 = document.getElementById('score2')?.textContent || '0';
        const currentScore = `${score1} : ${score2}`;

        // Determinar categoria do lance aleatoriamente
        const rand = Math.random();
        let category = 'neutral';
        if (rand > 0.6) category = 'attack';
        else if (rand > 0.9) category = 'defense';

        this.isFetching = true;

        try {
            const res = await fetch('/api/narrate', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                time: matchTime,
                team1: this.team1Name,
                team2: this.team2Name,
                category: category,
                score: currentScore,
                lastComments: this.recentComments.slice(-3)
              })
            });

            if (res.ok) {
                const data = await res.json();
                if (data.narration) {
                    this.addComment('normal', timeStr, data.narration);
                    this.recentComments.push(data.narration);
                    if (this.recentComments.length > 5) this.recentComments.shift();
                    this.isFetching = false;
                    return;
                }
            }
        } catch (err) {
            console.warn('Erro ao chamar API de IA para comentários. Usando fallback local.', err);
        }

        // Fallback local se a API não estiver configurada ou falhar
        const localComment = this.getLocalComment(category);
        this.addComment('normal', timeStr, localComment);
        this.recentComments.push(localComment);
        this.isFetching = false;
    }

    async registerGoal(teamName, time) {
        const now = Date.now();
        this.lastCommentTime = now + 4000; // Bloqueia outros comentários temporariamente
        const timeStr = time + "'";
        const score1 = document.getElementById('score1')?.textContent || '0';
        const score2 = document.getElementById('score2')?.textContent || '0';
        const currentScore = `${score1} : ${score2}`;

        try {
            const res = await fetch('/api/narrate', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                time: time,
                team1: this.team1Name,
                team2: this.team2Name,
                category: 'goal',
                score: currentScore,
                lastComments: this.recentComments.slice(-3)
              })
            });

            if (res.ok) {
                const data = await res.json();
                if (data.narration) {
                    this.addComment('goal', timeStr, data.narration);
                    this.recentComments.push(data.narration);
                    return;
                }
            }
        } catch (err) {
            console.warn('Erro ao gerar narração de gol com IA:', err);
        }

        // Fallback local do Gol
        const templates = NarrationDatabase.goal;
        const template = templates[Math.floor(Math.random() * templates.length)];
        const text = template.replace(/{team}/g, teamName);
        this.addComment('goal', timeStr, text);
    }
}

// Instância global
const Narrator = new NarrationEngine();
