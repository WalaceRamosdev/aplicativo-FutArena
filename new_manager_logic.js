
const LeagueSystem = {
    // Defines rules and structure for each league
    configs: {
        'brasileirao': {
            name: 'Brasileirão',
            type: 'league', // Pure league
            rounds: 19,
            relegationCount: 4,
            libertadoresCount: 6
        },
        'paulista': {
            name: 'Paulistão',
            type: 'group_knockout',
            groups: 4,
            teamsPerGroup: 4,
            groupMatches: 12, // Play against other groups
            knockout: {
                quarters: { legs: 1 },
                semis: { legs: 1 },
                final: { legs: 2 }
            }
        },
        'carioca': {
            name: 'Cariocão',
            type: 'league_knockout', // League then knockout
            rounds: 11,
            knockout: {
            }
        },
        'gaucho': {
            name: 'Gauchão',
            type: 'cross_group',
            groups: 2,
            teamsPerGroup: 6,
            rounds: 6,
            knockout: {
                quarters: { legs: 2 },
                semis: { legs: 2 },
                final: { legs: 2 }
            }
        },
        'mineiro': {
            name: 'Mineiro',
            type: 'cross_group_mineiro',
            groups: 3,
            teamsPerGroup: 4,
            rounds: 8,
            knockout: {
                semis: { legs: 2 },
                final: { legs: 2 }
            }
        }

        // Helpes to generate groups for Paulista
        generatePaulistaGroups: (teams) => {
            // Randomize or Seed? Let's just distribute sequentially for now, or shuffle.
            // Shuffle to ensure variety if teams array is sorted by capability
            const shuffled = [...teams].sort(() => Math.random() - 0.5);
            const groups = { 'A': [], 'B': [], 'C': [], 'D': [] };
            const keys = ['A', 'B', 'C', 'D'];

            shuffled.forEach((team, index) => {
                groups[keys[index % 4]].push(team.id);
            });
            return groups;
        },

        // Paulista: playing against OTHER groups
        generatePaulistaSchedule: (groups) => {
            const schedule = [];
            const groupKeys = ['A', 'B', 'C', 'D'];
            // All teams
            let allTeams = [];
            groupKeys.forEach(k => allTeams = allTeams.concat(groups[k]));

            // We need 12 rounds. 
            // Logic: Team in A plays all in B, C, D.
            // There are 4 teams in B, 4 in C, 4 in D = 12 matches.

            // Let's create a matchmaking pool. 
            // For each round, we need to pair them up.
            // This is a bit complex to generate perfectly balanced rounds (Home/Away).
            // Simplification: Generate all pairings, then organize into rounds.

            let allMatches = [];

            groupKeys.forEach(g1 => {
                groups[g1].forEach(t1 => {
                    groupKeys.forEach(g2 => {
                        if (g1 === g2) return; // Don't play own group
                        groups[g2].forEach(t2 => {
                            // Check if match already exists (t1 vs t2 or t2 vs t1)
                            if (!allMatches.find(m => (m.home === t1 && m.away === t2) || (m.home === t2 && m.away === t1))) {
                                // Assign Home/Away randomly or balanced?
                                // Let's alternate based on index to try and balance
                                allMatches.push({ home: t1, away: t2 });
                            }
                        });
                    });
                });
            });

            // Now shuffle matches and try to pack into 12 rounds of 8 games (16 teams / 2).
            // This is the "Edge Colouring" problem.
            // Simple heuristic: 
            const rounds = Array.from({ length: 12 }, () => []);

            // Shuffle all matches
            allMatches.sort(() => Math.random() - 0.5);

            allMatches.forEach(match => {
                // Find first round where neither team is playing
                for (let i = 0; i < 12; i++) {
                    const round = rounds[i];
                    if (!round.find(m => m.home === match.home || m.away === match.home || m.home === match.away || m.away === match.away)) {
                        round.push(match);
                        return;
                    }
                }
            });

            // Fallback: If heuristic failed to perfectly pack (it happens), we just append overflow rounds or merge.
            // For simplicity in this codebase, we will just return the rounds that strictly have games.
            return rounds.filter(r => r.length > 0);
        },

        generateCariocaSchedule: (teams) => {
            // Single Round Robin
            // 12 Teams -> 11 Rounds.
            return []; // Consolidated in ArcadeManager logic for simplicity
        },

        generateGauchoGroups: (teams) => {
            // Defines the 2 groups based on user request
            const g1Ids = ['internacional', 'juventude', 'avenida', 'saojose', 'guarany', 'saoluiz'];
            const g2Ids = ['gremio', 'caxias', 'novohamburgo', 'monsoon', 'intersm', 'ypiranga'];

            const groups = { '1': [], '2': [] };
            teams.forEach(t => {
                if (g1Ids.includes(t.id)) groups['1'].push(t.id);
                else if (g2Ids.includes(t.id)) groups['2'].push(t.id);
                else {
                    // Fallback for any team not in list (shouldn't happen with correct data)
                    groups['2'].push(t.id);
                }
            });
            return groups;
        },

        generateMineiroGroups: (teams) => {
            // 3 Groups, Seeded Leaders
            const seeds = ['atletico', 'cruzeiro', 'america'];
            const others = teams.filter(t => !seeds.includes(t.id)).sort(() => Math.random() - 0.5);

            const groups = { 'A': [], 'B': [], 'C': [] };

            // Assign seeds
            if (seeds[0]) groups['A'].push(seeds[0]);
            if (seeds[1]) groups['B'].push(seeds[1]);
            if (seeds[2]) groups['C'].push(seeds[2]);

            // Distribute others (9 teams -> 3 per group)
            ['A', 'B', 'C'].forEach(g => {
                for (let i = 0; i < 3; i++) {
                    if (others.length > 0) groups[g].push(others.pop().id);
                }
            });
            return groups;
        },

        // Generic Cross Group Scheduler
        generateCrossGroupSchedule: (groups, groupPairs, numRounds) => {
            // groupPairs e.g. [['1', '2']] for Gaucho
            // or [['A', 'B'], ['A', 'C'], ['B', 'C']] for Mineiro? No, Mineiro is A vs (B+C).

            let allMatches = [];

            // Generate all valid matchups
            if (groupPairs === 'gaucho') {
                // Group 1 teams play checks against ALL Group 2 teams
                groups['1'].forEach(t1 => {
                    groups['2'].forEach(t2 => {
                        allMatches.push({ home: t1, away: t2 });
                    });
                });
            } else if (groupPairs === 'mineiro') {
                // Each team plays against all teams from OTHER groups
                const groupKeys = Object.keys(groups); // A, B, C

                groupKeys.forEach(g1 => {
                    groups[g1].forEach(t1 => {
                        groupKeys.forEach(g2 => {
                            if (g1 === g2) return;
                            groups[g2].forEach(t2 => {
                                // avoid duplicates (only add if we haven't added t2 vs t1)
                                if (!allMatches.find(m => (m.home === t1 && m.away === t2) || (m.home === t2 && m.away === t1))) {
                                    allMatches.push({ home: t1, away: t2 });
                                }
                            });
                        });
                    });
                });
            }

            // Now pack into rounds using a simple shuffler/packer
            allMatches.sort(() => Math.random() - 0.5);
            const rounds = Array.from({ length: numRounds }, () => []);

            allMatches.forEach(match => {
                // For each match, try to find a round where neither team matches
                for (let i = 0; i < numRounds; i++) {
                    const r = rounds[i];
                    if (!r.find(m => m.home === match.home || m.away === match.home || m.home === match.away || m.away === match.away)) {
                        r.push(match);
                        return;
                    }
                }
                // If full, just push to random round (fallback, technically imperfect schedule)
                rounds[Math.floor(Math.random() * numRounds)].push(match);
            });

            return rounds.filter(r => r.length > 0);
        }
    };

    const NewArcadeManager = {
        userTeamId: null,
        currentLeague: 'brasileirao',
        currentStage: 'regular', // 'regular' (groups/league), 'quarters', 'semis', 'final'

        // State
        leagueTeams: [],
        groups: null, // { 'A': [id, id], ... }
        schedule: [], // Array of rounds (Arrays of matches)
        currentRound: 0,
        standings: {},

        // Knockout State
        knockoutBracket: [], // Current knockout matches
        knockoutRoundIndex: 0, // 0 for first leg, 1 for second leg (if applicable)

        // Economy
        coins: 0,
        overallBoosts: {},

        init: (teamId, leagueType = 'brasileirao') => {
            NewArcadeManager.userTeamId = teamId;
            NewArcadeManager.currentLeague = leagueType;
            NewArcadeManager.currentStage = 'regular'; // Start at regular stage

            // Load Teams
            if (leagueType === 'paulista') NewArcadeManager.leagueTeams = [...paulistaTeams];
            else if (leagueType === 'carioca') NewArcadeManager.leagueTeams = [...cariocaTeams];
            else if (leagueType === 'gaucho') NewArcadeManager.leagueTeams = [...gauchoTeams];
            else if (leagueType === 'mineiro') NewArcadeManager.leagueTeams = [...mineiroTeams];
            else NewArcadeManager.leagueTeams = [...brazilianTeams];

            // Init Stats
            NewArcadeManager.standings = {};
            NewArcadeManager.overallBoosts = NewArcadeManager.overallBoosts || {}; // Keep boosts if reloading? No, usually reset for new campaign unless stored globally. 
            // Let's reset boosts for new campaign for balance. 
            NewArcadeManager.overallBoosts = {};

            NewArcadeManager.coins = 0;

            NewArcadeManager.leagueTeams.forEach(t => {
                NewArcadeManager.standings[t.id] = { p: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 };
                NewArcadeManager.overallBoosts[t.id] = 0;
            });

            // Init Structure
        } else if(leagueType === 'paulista') {
            NewArcadeManager.groups = LeagueSystem.generatePaulistaGroups(NewArcadeManager.leagueTeams);
NewArcadeManager.schedule = LeagueSystem.generatePaulistaSchedule(NewArcadeManager.groups);
        } else if (leagueType === 'gaucho') {
    NewArcadeManager.groups = LeagueSystem.generateGauchoGroups(NewArcadeManager.leagueTeams);
    NewArcadeManager.schedule = LeagueSystem.generateCrossGroupSchedule(NewArcadeManager.groups, 'gaucho', 6);
} else if (leagueType === 'mineiro') {
    NewArcadeManager.groups = LeagueSystem.generateMineiroGroups(NewArcadeManager.leagueTeams);
    NewArcadeManager.schedule = LeagueSystem.generateCrossGroupSchedule(NewArcadeManager.groups, 'mineiro', 8);
} else {
    // Brasileirao & Carioca (League format initially)
    NewArcadeManager.groups = null;
    if (leagueType === 'carioca') {
        NewArcadeManager.schedule = NewArcadeManager.generateRoundRobin(NewArcadeManager.leagueTeams, 1); // 1 Turn
    } else {
        NewArcadeManager.schedule = NewArcadeManager.generateRoundRobin(NewArcadeManager.leagueTeams, 1); // Brasileirao
    }
}

NewArcadeManager.currentRound = 0;
NewArcadeManager.knockoutBracket = [];
StorageManager.saveArcadeProgress();
    },

generateRoundRobin: (teamsList, turns = 1) => {
    const teams = teamsList.map(t => t.id);
    const n = teams.length;
    const rounds = [];
    const matchesPerRound = Math.floor(n / 2);
    let roundTeams = [...teams];

    for (let r = 0; r < n - 1; r++) {
        const roundMatches = [];
        for (let i = 0; i < matchesPerRound; i++) {
            if (r % 2 === 0) {
                roundMatches.push({ home: roundTeams[i], away: roundTeams[n - 1 - i] });
            } else {
                roundMatches.push({ home: roundTeams[n - 1 - i], away: roundTeams[i] });
            }
        }
        rounds.push(roundMatches);
        roundTeams.splice(1, 0, roundTeams.pop());
    }
    return [...rounds]; // Just 1 turn for now based on request
},

    // ... Core functions like loadProgress, addCoins, upgradeTeam (same as before) ...
    // Re-implementing simplified for patching:

    loadProgress: (savedData) => {
        Object.assign(NewArcadeManager, savedData);
        // Ensure league logic works
        if (NewArcadeManager.currentLeague === 'paulista') NewArcadeManager.leagueTeams = [...paulistaTeams];
        else if (NewArcadeManager.currentLeague === 'carioca') NewArcadeManager.leagueTeams = [...cariocaTeams];
        else if (NewArcadeManager.currentLeague === 'gaucho') NewArcadeManager.leagueTeams = [...gauchoTeams];
        else if (NewArcadeManager.currentLeague === 'mineiro') NewArcadeManager.leagueTeams = [...mineiroTeams];
        else NewArcadeManager.leagueTeams = [...brazilianTeams];
    },

        getTeamOverall: (teamId) => {
            // Helper to find team data
            const findTeam = (id) => paulistaTeams.find(t => t.id === id) || cariocaTeams.find(t => t.id === id) || gauchoTeams.find(t => t.id === id) || mineiroTeams.find(t => t.id === id) || brazilianTeams.find(t => t.id === id);
            const team = findTeam(teamId);
            const base = team ? team.overall : 70;
            const boost = NewArcadeManager.overallBoosts[teamId] || 0;
            return base + boost;
        },

            addCoins: (amount) => {
                NewArcadeManager.coins += amount;
                NewArcadeManager.updateCoinsUI();
                StorageManager.saveArcadeProgress();
            },

                spendCoins: (amount) => {
                    if (NewArcadeManager.coins >= amount) {
                        NewArcadeManager.coins -= amount;
                        NewArcadeManager.updateCoinsUI();
                        StorageManager.saveArcadeProgress();
                        return true;
                    }
                    return false;
                },

                    upgradeTeam: () => {
                        const cost = 100 + ((NewArcadeManager.overallBoosts[NewArcadeManager.userTeamId] || 0) * 50);
                        if (NewArcadeManager.spendCoins(cost)) {
                            NewArcadeManager.overallBoosts[NewArcadeManager.userTeamId] = (NewArcadeManager.overallBoosts[NewArcadeManager.userTeamId] || 0) + 1;
                            NewArcadeManager.updateCoinsUI();
                            StorageManager.saveArcadeProgress();
                            return true;
                        }
                        return false;
                    },

                        updateCoinsUI: () => {
                            const coinsEl = document.getElementById('arcade-coins');
                            const overallEl = document.getElementById('arcade-overall');
                            const upgradeCostEl = document.getElementById('upgrade-cost');

                            if (coinsEl) coinsEl.textContent = NewArcadeManager.coins;
                            if (overallEl) overallEl.textContent = NewArcadeManager.getTeamOverall(NewArcadeManager.userTeamId);
                            if (upgradeCostEl) {
                                const cost = 100 + ((NewArcadeManager.overallBoosts[NewArcadeManager.userTeamId] || 0) * 50);
                                upgradeCostEl.textContent = cost;
                            }
                        },

                            // ================== MATCH & STANDINGS ==================

                            getNextUserMatch: () => {
                                if (NewArcadeManager.currentStage === 'regular') {
                                    if (NewArcadeManager.currentRound >= NewArcadeManager.schedule.length) return null;
                                    const round = NewArcadeManager.schedule[NewArcadeManager.currentRound];
                                    return round.find(m => m.home === NewArcadeManager.userTeamId || m.away === NewArcadeManager.userTeamId);
                                } else {
                                    // Knockout Logic
                                    const match = NewArcadeManager.knockoutBracket.find(m =>
                                        (m.home === NewArcadeManager.userTeamId || m.away === NewArcadeManager.userTeamId) && !m.completed
                                    );
                                    return match;
                                }
                            },

                                registerUserResult: (homeId, awayId, scoreHome, scoreAway) => {
                                    if (NewArcadeManager.currentStage === 'regular') {
                                        NewArcadeManager.updateStandings(homeId, awayId, scoreHome, scoreAway);
                                        NewArcadeManager.simulateRound(); // Simulates others
                                        NewArcadeManager.currentRound++;

                                        // Economy logic...
                                        NewArcadeManager.processRewards(homeId, awayId, scoreHome, scoreAway);
                                        NewArcadeManager.checkPhaseTransition();
                                    } else {
                                        // Knockout
                                        NewArcadeManager.processKnockoutMatch(homeId, awayId, scoreHome, scoreAway);
                                        NewArcadeManager.processRewards(homeId, awayId, scoreHome, scoreAway);

                                        // Simulate other knockout matches
                                        NewArcadeManager.simulateKnockoutRound();
                                        NewArcadeManager.checkKnockoutTransition();
                                    }
                                    StorageManager.saveArcadeProgress();
                                },

                                    processRewards: (homeId, awayId, scoreHome, scoreAway) => {
                                        const userIsHome = homeId === NewArcadeManager.userTeamId;
                                        const userScore = userIsHome ? scoreHome : scoreAway;
                                        const oppScore = userIsHome ? scoreAway : scoreHome;
                                        let earned = 50; // base
                                        if (userScore > oppScore) earned += 150;
                                        else if (userScore == oppScore) earned += 50;
                                        earned += userScore * 10;
                                        NewArcadeManager.addCoins(earned);
                                    },

                                        simulateRound: () => {
                                            const round = NewArcadeManager.schedule[NewArcadeManager.currentRound];
                                            round.forEach(m => {
                                                if (m.home !== NewArcadeManager.userTeamId && m.away !== NewArcadeManager.userTeamId) {
                                                    // Sim Logic
                                                    const s1 = Math.floor(Math.random() * 5); // simple
                                                    const s2 = Math.floor(Math.random() * 4);
                                                    NewArcadeManager.updateStandings(m.home, m.away, s1, s2);
                                                }
                                            });
                                        },

                                            updateStandings: (homeId, awayId, s1, s2) => {
                                                const up = (id, f, a) => {
                                                    if (!NewArcadeManager.standings[id]) return;
                                                    const s = NewArcadeManager.standings[id];
                                                    s.j++; s.gp += f; s.gc += a; s.sg = s.gp - s.gc;
                                                    if (f > a) { s.v++; s.p += 3; }
                                                    else if (f == a) { s.e++; s.p += 1; }
                                                    else s.d++;
                                                };
                                                up(homeId, s1, s2);
                                                up(awayId, s2, s1);
                                            },

                                                // ================== PHASE TRANSITIONS ==================

                                                checkPhaseTransition: () => {
                                                    // Check if regular season is done
                                                    if (NewArcadeManager.currentRound < NewArcadeManager.schedule.length) return;

                                                    // Season Done. Check rules.
                                                    if (NewArcadeManager.currentLeague === 'paulista') {
                                                        NewArcadeManager.transitionToPaulistaKnockout();
                                                    } else if (NewArcadeManager.currentLeague === 'gaucho') {
                                                        NewArcadeManager.transitionToGauchoKnockout();
                                                    } else if (NewArcadeManager.currentLeague === 'mineiro') {
                                                        NewArcadeManager.transitionToMineiroKnockout();
                                                    } else if (NewArcadeManager.currentLeague === 'carioca') {
                                                        NewArcadeManager.transitionToCariocaKnockout();
                                                    } else {
                                                        // Brasileirao Ends
                                                        NewArcadeManager.finishSeason();
                                                    }
                                                },

                                                    getGroupStandings: (groupName) => {
                                                        // Returns sorted array of team stats for a specific group
                                                        const groupTeams = NewArcadeManager.groups[groupName];
                                                        return groupTeams.map(tid => ({ id: tid, ...NewArcadeManager.standings[tid] }))
                                                            .sort((a, b) => b.p - a.p || b.v - a.v || b.sg - a.sg);
                                                    },

                                                        transitionToPaulistaKnockout: () => {
                                                            // Top 2 of each group
                                                            const qfMatches = [];
                                                            ['A', 'B', 'C', 'D'].forEach(g => {
                                                                const table = NewArcadeManager.getGroupStandings(g);
                                                                // 1st vs 2nd
                                                                qfMatches.push({
                                                                    id: `QF-${g}`,
                                                                    home: table[0].id, // Better campaign usually home
                                                                    away: table[1].id,
                                                                    stage: 'quarters',
                                                                    completed: false
                                                                });
                                                            });

                                                            NewArcadeManager.knockoutBracket = qfMatches;
                                                            NewArcadeManager.currentStage = 'quarters';
                                                            alert("Fase de Grupos encerrada! Iniciando Quartas de Final.");
                                                        },

                                                            transitionToCariocaKnockout: () => {
                                                                // Top 4 General
                                                                const table = Object.entries(NewArcadeManager.standings)
                                                                    .map(([id, s]) => ({ id, ...s }))
                                                                    .sort((a, b) => b.p - a.p || b.v - a.v || b.sg - a.sg);

                                                                const semiMatches = [
                                                                    { home: table[0].id, away: table[3].id, stage: 'semis', leg: 1 }, // 1 vs 4
                                                                    { home: table[1].id, away: table[2].id, stage: 'semis', leg: 1 }  // 2 vs 3
                                                                ];
                                                                // Carioca Semis are 2 legs. We start with leg 1.
                                                                // We need to store that these are 2 legs.

                                                                NewArcadeManager.knockoutBracket = semiMatches.map(m => ({ ...m, totalLegs: 2, currentLeg: 1, aggHome: 0, aggAway: 0 }));
                                                                NewArcadeManager.currentStage = 'semis';
                                                                const leagueName = NewArcadeManager.currentLeague === 'carioca' ? 'Taça Guanabara' : 'Fase Classificatória';
                                                                alert(`${leagueName} encerrada! Iniciando Semifinais.`);
                                                            },

                                                                // ================== KNOCKOUT LOGIC ==================

                                                                processKnockoutMatch: (homeId, awayId, sHome, sAway) => {
                                                                    // Find match in bracket
                                                                    const match = NewArcadeManager.knockoutBracket.find(m => m.home === homeId && m.away === awayId && !m.completed);
                                                                    if (!match) return;

                                                                    match.homeScore = sHome;
                                                                    match.awayScore = sAway;
                                                                    match.completed = true;

                                                                    // If 2 legs, update aggregate
                                                                    if (match.totalLegs && match.totalLegs > 1) {
                                                                        match.aggHome = (match.aggHome || 0) + sHome;
                                                                        match.aggAway = (match.aggAway || 0) + sAway;

                                                                        if (match.currentLeg < match.totalLegs) {
                                                                            // Prepare Next Leg
                                                                            // Swap home/away for next leg logic if needed, but for simplicity let's just keep structure
                                                                            // Actually, usually 2nd leg home is the better seed. 
                                                                            // We will handle the "Next Round" generation after all matches in this leg are done.
                                                                        }
                                                                    }
                                                                },

                                                                    simulateKnockoutRound: () => {
                                                                        // Simulate other matches in bracket
                                                                        NewArcadeManager.knockoutBracket.forEach(m => {
                                                                            if (!m.completed && m.home !== NewArcadeManager.userTeamId && m.away !== NewArcadeManager.userTeamId) {
                                                                                // Sim
                                                                                const s1 = Math.floor(Math.random() * 3);
                                                                                const s2 = Math.floor(Math.random() * 3);
                                                                                m.homeScore = s1;
                                                                                m.awayScore = s2;
                                                                                m.completed = true;

                                                                                if (m.totalLegs > 1) {
                                                                                    m.aggHome = (m.aggHome || 0) + s1;
                                                                                    m.aggAway = (m.aggAway || 0) + s2;
                                                                                }
                                                                            }
                                                                        });
                                                                    },

                                                                        checkKnockoutTransition: () => {
                                                                            // Check if all matches in bracket are completed
                                                                            if (NewArcadeManager.knockoutBracket.some(m => !m.completed)) return;

                                                                            // All done. Next step?
                                                                            if (NewArcadeManager.currentLeague === 'paulista') {
                                                                                NewArcadeManager.advancePaulista();
                                                                            } else if (NewArcadeManager.currentLeague === 'gaucho') {
                                                                                NewArcadeManager.advanceGaucho();
                                                                            } else if (NewArcadeManager.currentLeague === 'mineiro') {
                                                                                NewArcadeManager.advanceMineiro();
                                                                            } else if (NewArcadeManager.currentLeague === 'carioca') {
                                                                                NewArcadeManager.advanceCarioca();
                                                                            }
                                                                        },

                                                                            advancePaulista: () => {
                                                                                if (NewArcadeManager.currentStage === 'quarters') {
                                                                                    // Generates Semis
                                                                                    // Simple logic: Winners advance.
                                                                                    const winners = NewArcadeManager.knockoutBracket.map(m => {
                                                                                        if (m.homeScore > m.awayScore) return m.home;
                                                                                        if (m.awayScore > m.homeScore) return m.away;
                                                                                        return Math.random() > 0.5 ? m.home : m.away; // Penalties sim
                                                                                    });

                                                                                    // Semis (Single Leg)
                                                                                    const semis = [
                                                                                        { home: winners[0], away: winners[1], stage: 'semis' },
                                                                                        { home: winners[2], away: winners[3], stage: 'semis' }
                                                                                    ];
                                                                                    NewArcadeManager.knockoutBracket = semis;
                                                                                    NewArcadeManager.currentStage = 'semis';
                                                                                    alert("Classificado para as Semifinais!");
                                                                                } else if (NewArcadeManager.currentStage === 'semis') {
                                                                                    // Generate Final (2 Legs)
                                                                                    const winners = NewArcadeManager.knockoutBracket.map(m => {
                                                                                        if (m.homeScore > m.awayScore) return m.home;
                                                                                        if (m.awayScore > m.homeScore) return m.away;
                                                                                        return Math.random() > 0.5 ? m.home : m.away;
                                                                                    });

                                                                                    const final = [
                                                                                        { home: winners[0], away: winners[1], stage: 'final', totalLegs: 2, currentLeg: 1 }
                                                                                    ];
                                                                                    NewArcadeManager.knockoutBracket = final;
                                                                                    NewArcadeManager.currentStage = 'final';
                                                                                    alert("Grande FINAL definida!");
                                                                                } else if (NewArcadeManager.currentStage === 'final') {
                                                                                    // Check legs
                                                                                    const match = NewArcadeManager.knockoutBracket[0];
                                                                                    if (match.currentLeg === 1) {
                                                                                        // prepare leg 2
                                                                                        match.currentLeg = 2;
                                                                                        match.completed = false;
                                                                                        // Swap home away
                                                                                        const temp = match.home; match.home = match.away; match.away = temp;
                                                                                        // Aggregates stay
                                                                                        alert("Fim do primeiro jogo da final! Preparando jogo de volta.");
                                                                                    } else {
                                                                                        // Finish
                                                                                        let championId = match.aggHome > match.aggAway ? match.home : match.away;
                                                                                        if (match.aggHome == match.aggAway) championId = match.home; // penalties sim (home wins for simplicity of code)

                                                                                        const champion = NewArcadeManager.leagueTeams.find(t => t.id === championId);
                                                                                        showChampionScreen(champion);
                                                                                    }
                                                                                }
                                                                            },

                                                                                advanceCarioca: () => {
                                                                                    if (NewArcadeManager.currentStage === 'semis') {
                                                                                        // Check legs
                                                                                        const pending = NewArcadeManager.knockoutBracket.some(m => m.currentLeg < 2);
                                                                                        if (pending) {
                                                                                            // Setup Leg 2
                                                                                            NewArcadeManager.knockoutBracket.forEach(m => {
                                                                                                m.currentLeg = 2;
                                                                                                m.completed = false;
                                                                                                const temp = m.home; m.home = m.away; m.away = temp;
                                                                                            });
                                                                                            alert("Rodada de volta das semifinais!");
                                                                                            return;
                                                                                        }

                                                                                        // Both legs done. Identify winners.
                                                                                        // Advantage rule: Draw goes to better campaign.
                                                                                        // We simplified by just checking agg score.
                                                                                        const winners = NewArcadeManager.knockoutBracket.map(m => {
                                                                                            if (m.aggHome > m.aggAway) return m.home;
                                                                                            else return m.away; // If draw, we assume visitor was better seed or penalty logic (simplified)
                                                                                        });

                                                                                        const final = [
                                                                                            { home: winners[0], away: winners[1], stage: 'final', totalLegs: 2, currentLeg: 1 }
                                                                                        ];
                                                                                        NewArcadeManager.knockoutBracket = final;
                                                                                        NewArcadeManager.currentStage = 'final';
                                                                                        let msg = "Final definida!";
                                                                                        if (NewArcadeManager.currentLeague === 'carioca') msg = "Final do Cariocão definida!";
                                                                                        else if (NewArcadeManager.currentLeague === 'gaucho') msg = "Final do Gauchão definida!";
                                                                                        else if (NewArcadeManager.currentLeague === 'mineiro') msg = "Final do Mineiro definida!";
                                                                                        alert(msg);
                                                                                    } else if (NewArcadeManager.currentStage === 'final') {
                                                                                        const match = NewArcadeManager.knockoutBracket[0];
                                                                                        if (match.currentLeg === 1) {
                                                                                            match.currentLeg = 2;
                                                                                            match.completed = false;
                                                                                            const temp = match.home; match.home = match.away; match.away = temp;
                                                                                            alert("Fim do jogo de ida. Decisão na volta!");
                                                                                        } else {
                                                                                            let championId = match.aggHome > match.aggAway ? match.home : match.away;
                                                                                            if (match.aggHome == match.aggAway) championId = match.home;
                                                                                            const champion = NewArcadeManager.leagueTeams.find(t => t.id === championId);
                                                                                            showChampionScreen(champion);
                                                                                        }
                                                                                    }
                                                                                },

                                                                                    transitionToGauchoKnockout: () => {
                                                                                        // Top 8 General
                                                                                        const leaderboard = NewArcadeManager.getLeaderboard();
                                                                                        const top8 = leaderboard.slice(0, 8);

                                                                                        // Quarters: 1v8, 2v7, 3v6, 4v5. 2 Legs.
                                                                                        const matchUps = [
                                                                                            { home: top8[0].id, away: top8[7].id },
                                                                                            { home: top8[1].id, away: top8[6].id },
                                                                                            { home: top8[2].id, away: top8[5].id },
                                                                                            { home: top8[3].id, away: top8[4].id }
                                                                                        ];

                                                                                        NewArcadeManager.knockoutBracket = matchUps.map(m => ({
                                                                                            ...m, stage: 'quarters', totalLegs: 2, currentLeg: 1, aggHome: 0, aggAway: 0, completed: false
                                                                                        }));
                                                                                        NewArcadeManager.currentStage = 'quarters';
                                                                                        alert("Fase Classificatória do Gauchão encerrada!\\nOs 8 melhores avançam para as Quartas.");
                                                                                    },

                                                                                        transitionToMineiroKnockout: () => {
                                                                                            // Leaders of A, B, C + Best 2nd Place
                                                                                            const winners = ['A', 'B', 'C'].map(g => NewArcadeManager.getGroupStandings(g)[0]);

                                                                                            // Best 2nd: Get all 2nd places, compare
                                                                                            const seconds = ['A', 'B', 'C'].map(g => NewArcadeManager.getGroupStandings(g)[1]);
                                                                                            const bestSecond = seconds.sort((a, b) => b.p - a.p || b.v - a.v || b.sg - a.sg)[0];

                                                                                            // Combine and Sort by general campaign to decide bracket
                                                                                            // Mineiro Semis: 1st General vs 4th General, 2nd vs 3rd.
                                                                                            const qualified = [...winners, bestSecond].sort((a, b) => b.p - a.p || b.v - a.v || b.sg - a.sg);

                                                                                            // Semis Matchups (1 vs 4, 2 vs 3)
                                                                                            const semis = [
                                                                                                { home: qualified[0].id, away: qualified[3].id },
                                                                                                { home: qualified[1].id, away: qualified[2].id }
                                                                                            ];

                                                                                            NewArcadeManager.knockoutBracket = semis.map(m => ({
                                                                                                ...m, stage: 'semis', totalLegs: 2, currentLeg: 1, aggHome: 0, aggAway: 0, completed: false
                                                                                            }));
                                                                                            NewArcadeManager.currentStage = 'semis';
                                                                                            alert("Fase de Grupos do Mineiro encerrada!\\nLíderes e melhor 2º avançam.");
                                                                                        },

                                                                                            advanceGaucho: () => {
                                                                                                // Generic advance handler for 2-leg brackets
                                                                                                const stage = NewArcadeManager.currentStage;

                                                                                                const pending = NewArcadeManager.knockoutBracket.some(m => m.currentLeg < 2);
                                                                                                if (pending) {
                                                                                                    NewArcadeManager.setupSecondLeg();
                                                                                                    return;
                                                                                                }

                                                                                                // Next Stage Logic
                                                                                                const winners = NewArcadeManager.resolveWinners();

                                                                                                if (stage === 'quarters') {
                                                                                                    // To Semis
                                                                                                    // Winner Q1 vs Winner Q4? Winner Q2 vs Winner Q3? 
                                                                                                    // Logic: 1v8(W1) vs 4v5(W4) -> Semis 1
                                                                                                    //        2v7(W2) vs 3v6(W3) -> Semis 2
                                                                                                    const semis = [
                                                                                                        { home: winners[0], away: winners[3], stage: 'semis', totalLegs: 2, currentLeg: 1 },
                                                                                                        { home: winners[1], away: winners[2], stage: 'semis', totalLegs: 2, currentLeg: 1 }
                                                                                                    ];
                                                                                                    NewArcadeManager.knockoutBracket = semis;
                                                                                                    NewArcadeManager.currentStage = 'semis';
                                                                                                    alert("Semifinais do Gauchão definidas!");
                                                                                                } else if (stage === 'semis') {
                                                                                                    // To Final
                                                                                                    const final = [
                                                                                                        { home: winners[0], away: winners[1], stage: 'final', totalLegs: 2, currentLeg: 1 }
                                                                                                    ];
                                                                                                    NewArcadeManager.knockoutBracket = final;
                                                                                                    NewArcadeManager.currentStage = 'final';
                                                                                                    alert("Grande Final do Gauchão!");
                                                                                                } else if (stage === 'final') {
                                                                                                    NewArcadeManager.finishChampion(winners[0]);
                                                                                                }
                                                                                            },

                                                                                                advanceMineiro: () => {
                                                                                                    const stage = NewArcadeManager.currentStage;
                                                                                                    const pending = NewArcadeManager.knockoutBracket.some(m => m.currentLeg < 2);
                                                                                                    if (pending) {
                                                                                                        NewArcadeManager.setupSecondLeg();
                                                                                                        return;
                                                                                                    }

                                                                                                    const winners = NewArcadeManager.resolveWinners();

                                                                                                    if (stage === 'semis') {
                                                                                                        const final = [
                                                                                                            { home: winners[0], away: winners[1], stage: 'final', totalLegs: 2, currentLeg: 1 }
                                                                                                        ];
                                                                                                        NewArcadeManager.knockoutBracket = final;
                                                                                                        NewArcadeManager.currentStage = 'final';
                                                                                                        alert("Grande Final do Mineiro!");
                                                                                                    } else if (stage === 'final') {
                                                                                                        NewArcadeManager.finishChampion(winners[0]);
                                                                                                    }
                                                                                                },

                                                                                                    // Helpers for Knockout logic re-use
                                                                                                    setupSecondLeg: () => {
                                                                                                        NewArcadeManager.knockoutBracket.forEach(m => {
                                                                                                            m.currentLeg = 2;
                                                                                                            m.completed = false;
                                                                                                            // Swap home/away, aggregates persist
                                                                                                            const t = m.home; m.home = m.away; m.away = t;
                                                                                                        });
                                                                                                        alert("Rodada de Volta!");
                                                                                                    },

                                                                                                        resolveWinners: () => {
                                                                                                            return NewArcadeManager.knockoutBracket.map(m => {
                                                                                                                if (m.aggHome > m.aggAway) return m.home;
                                                                                                                if (m.aggAway > m.aggHome) return m.away;
                                                                                                                // Draw? Better campaign usually. Simplified: Penalty/Home wins
                                                                                                                return m.home;
                                                                                                            });
                                                                                                        },

                                                                                                            finishChampion: (id) => {
                                                                                                                const team = NewArcadeManager.leagueTeams.find(t => t.id === id);
                                                                                                                showChampionScreen(team);
                                                                                                            },

                                                                                                                // UI Helpers
                                                                                                                checkChampion: () => null, // Managed by advance logic now
                                                                                                                    getLeaderboard: () => {
                                                                                                                        return Object.entries(NewArcadeManager.standings).map(([id, stats]) => {
                                                                                                                            const team = NewArcadeManager.leagueTeams.find(t => t.id === id);
                                                                                                                            return { ...team, ...stats };
                                                                                                                        }).sort((a, b) => {
                                                                                                                            if (b.p !== a.p) return b.p - a.p;
                                                                                                                            if (b.v !== a.v) return b.v - a.v;
                                                                                                                            return b.sg - a.sg;
                                                                                                                        });
                                                                                                                    }
};

// Replace Global
window.ArcadeManager = NewArcadeManager;
