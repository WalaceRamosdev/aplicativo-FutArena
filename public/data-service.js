// ==================== DATA SERVICE (Gestão de Dados) ====================
const DataService = {
    _cache: {},
    _allTeamsCache: null,
    _badgeCache: {},
    _pendingLoads: {},
    _preloadedLists: new Set(),
    _loading: null,

    async loadAll() {
        if (this._allTeamsCache) return this._allTeamsCache;
        if (this._loading) return this._loading;

        this._loading = fetch('/data/teams.json')
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
                console.error('[DataService] Erro:', err);
                this._loading = null;
                throw err;
            });

        return this._loading;
    },

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

    preloadMatchBadges(team1, team2) {
        const promises = [];
        if (team1) promises.push(this.preloadBadge(team1));
        if (team2) promises.push(this.preloadBadge(team2));
        return Promise.all(promises);
    },

    preloadListBadges(teams, listName) {
        if (!teams || this._preloadedLists.has(listName)) return;
        this._preloadedLists.add(listName);

        let index = 0;
        const batchSize = 4;
        const loadBatch = () => {
            const batch = teams.slice(index, index + batchSize);
            if (batch.length === 0) return;
            batch.forEach(t => this.preloadBadge(t));
            index += batchSize;
            if (index < teams.length) setTimeout(loadBatch, 200);
        };
        setTimeout(loadBatch, 500);
    },

    getCachedBadge(teamId) {
        return this._badgeCache[teamId] || null;
    }
};

window.DataService = DataService;
