// ==================== DATA SERVICE (Gestão de Dados - Tópico 1) ====================
// Gerencia pré-carregamento de imagens e cache de badges
// Implementa lazy loading: só carrega badges dos times necessários

const DataService = {
    _badgeCache: {},
    _pendingLoads: {},
    _preloadedLists: new Set(),
    _allTeamsCache: null,
    _loading: null,

    // Carrega todos os times do JSON
    async loadAll() {
        if (this._allTeamsCache) return this._allTeamsCache;
        if (this._loading) return this._loading;

        this._loading = fetch('data/teams.json')
            .then(res => {
                if (!res.ok) throw new Error('Falha ao carregar times: ' + res.status);
                return res.json();
            })
            .then(data => {
                this._allTeamsCache = data;
                this._loading = null;
                console.log('[DataService] Dados carregados com sucesso.');
                return data;
            })
            .catch(err => {
                console.error('[DataService] Erro no DataService:', err);
                this._loading = null;
                throw err;
            });

        return this._loading;
    },

    // Pré-carrega badge de UM time (retorna Promise)
    preloadBadge(team) {
        if (!team || !team.badge) return Promise.resolve(null);
        if (this._badgeCache[team.id]) return Promise.resolve(this._badgeCache[team.id]);
        if (this._pendingLoads[team.id]) return this._pendingLoads[team.id];

        this._pendingLoads[team.id] = new Promise((resolve) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => {
                this._badgeCache[team.id] = img;
                delete this._pendingLoads[team.id];
                resolve(img);
            };
            img.onerror = () => {
                delete this._pendingLoads[team.id];
                resolve(null);
            };
            img.src = team.badge;
        });
        return this._pendingLoads[team.id];
    },

    // Pré-carrega badges dos 2 times da partida (prioritário)
    preloadMatchBadges(team1, team2) {
        const promises = [];
        if (team1) promises.push(this.preloadBadge(team1));
        if (team2) promises.push(this.preloadBadge(team2));
        return Promise.all(promises);
    },

    // Pré-carrega badges de uma lista inteira (background, baixa prioridade)
    preloadListBadges(teams, listName) {
        if (!teams || this._preloadedLists.has(listName)) return;
        this._preloadedLists.add(listName);

        // Carrega em lotes de 4 para não sobrecarregar a rede
        let index = 0;
        const batchSize = 4;
        const loadBatch = () => {
            const batch = teams.slice(index, index + batchSize);
            if (batch.length === 0) return;
            batch.forEach(t => this.preloadBadge(t));
            index += batchSize;
            // Próximo lote com delay de 200ms
            if (index < teams.length) {
                setTimeout(loadBatch, 200);
            }
        };
        // Inicia após 500ms para não competir com carregamento inicial
        setTimeout(loadBatch, 500);
    },

    // Retorna imagem cacheada (ou null)
    getCachedBadge(teamId) {
        return this._badgeCache[teamId] || null;
    },

    // Retorna estatísticas do cache
    getStats() {
        return {
            cached: Object.keys(this._badgeCache).length,
            pending: Object.keys(this._pendingLoads).length,
            lists: this._preloadedLists.size
        };
    }
};

window.DataService = DataService;
