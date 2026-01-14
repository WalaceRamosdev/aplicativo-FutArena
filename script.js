// ==================== CONFIGURAÇÃO DE MÚSICA (Playlist) ====================
const PLAYLIST = [

    // IMPORTANTE: Certifique-se de que o arquivo mp3 esteja na pasta correta
    // ADICIONE NOVAS MÚSICAS AQUI:
    { title: "Mas que Nada", src: "/assets/musicas/Sérgio Mendes - Mas Que Nada 2011 Rio Versão.mp3" },
    { title: "Marcelo D2 Claudia - Desabafo", src: "/assets/musicas/Marcelo D2 Claudia - Desabafo.mp3" },
    { title: "Skank - É uma partida de Futebol", src: "/assets/musicas/Skank - É uma partida de futebol.mp3" },
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

    { id: "flamengo", name: "Flamengo", shortName: "FLA", badge: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Logo_Flamengo_crest_1980-2018.png/1200px-Logo_Flamengo_crest_1980-2018.png", primaryColor: "#FFFFFF", secondaryColor: "#E31D1A", overall: 92 },

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

const paulistaTeams = [
    { id: "corinthians", name: "Corinthians", shortName: "COR", badge: "https://upload.wikimedia.org/wikipedia/pt/b/b4/Corinthians_simbolo.png", primaryColor: "#FFFFFF", secondaryColor: "#000000", overall: 78 },

    { id: "palmeiras", name: "Palmeiras", shortName: "PAL", badge: "https://upload.wikimedia.org/wikipedia/commons/1/10/Palmeiras_logo.svg", primaryColor: "#FFFFFF", secondaryColor: "#006437", overall: 85 },

    { id: "saopaulo", name: "São Paulo", shortName: "SAO", badge: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Brasao_do_Sao_Paulo_Futebol_Clube.svg/1200px-Brasao_do_Sao_Paulo_Futebol_Clube.svg.png", primaryColor: "#FFFFFF", secondaryColor: "#FF0000", overall: 76 },

    { id: "santos", name: "Santos", shortName: "SAN", badge: "https://upload.wikimedia.org/wikipedia/commons/1/15/Santos_Logo.png", primaryColor: "#FFFFFF", secondaryColor: "#000000", overall: 72 },

    { id: "saobernardo", name: "São Bernardo", shortName: "SBE", badge: "https://upload.wikimedia.org/wikipedia/pt/e/e7/S%C3%A3o_Bernardo_Futebol_Clube_Logo.PNG", primaryColor: "#FFFFFF", secondaryColor: "#FFF200", overall: 65 },

    { id: "novorizontino", name: "Novorizontino", shortName: "NOV", badge: "https://upload.wikimedia.org/wikipedia/pt/9/9e/Gr%C3%AAmio_Esportivo_Novorizontino_logo.png", primaryColor: "#FFFFFF", secondaryColor: "#FFF200", overall: 66 },

    { id: "bragantino", name: "Red Bull Bragantino", shortName: "RBB", badge: "https://upload.wikimedia.org/wikipedia/pt/9/9e/RedBullBragantino.png", primaryColor: "#FFFFFF", secondaryColor: "#E31D1A", overall: 74 },

    { id: "mirassol", name: "Mirassol", shortName: "MIR", badge: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Mirassol_FC_logo.png", primaryColor: "#FFFFFF", secondaryColor: "#FFD700", overall: 68 },

    { id: "guarani", name: "Guarani", shortName: "GUA", badge: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Guarani_FC_%28E%29_-_SP.svg/1672px-Guarani_FC_%28E%29_-_SP.svg.png", primaryColor: "#FFFFFF", secondaryColor: "#006437", overall: 64 },

    { id: "pontepreta", name: "Ponte Preta", shortName: "PON", badge: "https://logodetimes.com/times/ponte-preta/logo-ponte-preta-4096.png", primaryColor: "#FFFFFF", secondaryColor: "#000000", overall: 64 },

    { id: "veloclube", name: "Velo Clube", shortName: "VEL", badge: "https://upload.wikimedia.org/wikipedia/pt/6/60/Bra_sp_velo-clube.png", primaryColor: "#FFFFFF", secondaryColor: "#FF0000", overall: 60 },

    { id: "portuguesa", name: "Portuguesa", shortName: "POR", badge: "https://static.wixstatic.com/media/26b336_ecbcf3f320f04997bbcf3f5869f99315~mv2.png/v1/fit/w_2500,h_1330,al_c/26b336_ecbcf3f320f04997bbcf3f5869f99315~mv2.png", primaryColor: "#FFFFFF", secondaryColor: "#00834B", overall: 63 },

    { id: "botafogosp", name: "Botafogo-SP", shortName: "BSP", badge: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Botafogo_Ribeirao_Preto_SP.png", primaryColor: "#FFFFFF", secondaryColor: "#FF0000", overall: 65 },

    { id: "primavera", name: "Primavera", shortName: "PRI", badge: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhBsNQxvhlh79TfVqJ7LRuIySm_FuS5a3GtLiPzT1-0dwx4u93gs3cg7cQR2-VLgYybHTJL7UlYpGVfMtoufYtAIxBLljT_ixj2M9Mpdvq-6-pEYDacjxh08hi0rr6buIjVmJ42oAxKhXG9/s1600/ec+primavera.png", primaryColor: "#FFFFFF", secondaryColor: "#FF0000", overall: 58 },

    { id: "noroeste", name: "Noroeste", shortName: "NOR", badge: "https://upload.wikimedia.org/wikipedia/pt/3/36/EC_Noroeste.PNG", primaryColor: "#FFFFFF", secondaryColor: "#FF0000", overall: 59 },

    { id: "capivariano", name: "Capivariano", shortName: "CAP", badge: "https://upload.wikimedia.org/wikipedia/commons/4/43/Capivariano_FC.png", primaryColor: "#FFFFFF", secondaryColor: "#FF0000", overall: 58 },
];

const cariocaTeams = [
    { id: "flamengo", name: "Flamengo", shortName: "FLA", badge: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Logo_Flamengo_crest_1980-2018.png/1200px-Logo_Flamengo_crest_1980-2018.png", primaryColor: "#FFFFFF", secondaryColor: "#E31D1A", overall: 90 },

    { id: "fluminense", name: "Fluminense", shortName: "FLU", badge: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Fluminense_FC_escudo.png/1200px-Fluminense_FC_escudo.png", primaryColor: "#FFFFFF", secondaryColor: "#7B0024", overall: 82 },

    { id: "botafogo", name: "Botafogo", shortName: "BOT", badge: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Botafogo_de_Futebol_e_Regatas_logo.svg/1200px-Botafogo_de_Futebol_e_Regatas_logo.svg.png", primaryColor: "#FFFFFF", secondaryColor: "#000000", overall: 85 },

    { id: "vasco", name: "Vasco da Gama", shortName: "VAS", badge: "https://upload.wikimedia.org/wikipedia/pt/thumb/8/8b/EscudoDoVascoDaGama.svg/960px-EscudoDoVascoDaGama.svg.png", primaryColor: "#FFFFFF", secondaryColor: "#000000", overall: 79 },

    { id: "bangu", name: "Bangu", shortName: "BAN", badge: "https://upload.wikimedia.org/wikipedia/commons/7/70/Bangu_escudo.png", primaryColor: "#FFFFFF", secondaryColor: "#E31D1A", overall: 62 },

    { id: "boavista", name: "Boavista", shortName: "BOA", badge: "https://image-service.onefootball.com/transform?w=256&dpr=2&image=https://images.onefootball.com/icons/teams/164/4770.png", primaryColor: "#FFFFFF", secondaryColor: "#00834B", overall: 61 },

    { id: "madureira", name: "Madureira", shortName: "MAD", badge: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Madureira_EC_%28RJ%29.svg/1120px-Madureira_EC_%28RJ%29.svg.png", primaryColor: "#FFFFFF", secondaryColor: "#003893", overall: 60 },

    { id: "marica", name: "Maricá", shortName: "MAR", badge: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Maric%C3%A1_Futebol_Clube_logo.png/960px-Maric%C3%A1_Futebol_Clube_logo.png", primaryColor: "#FFFFFF", secondaryColor: "#000000", overall: 58 },

    { id: "novaiguacu", name: "Nova Iguaçu", shortName: "NOV", badge: "https://upload.wikimedia.org/wikipedia/pt/7/7a/NovaIguacuFC.png", primaryColor: "#FFFFFF", secondaryColor: "#F36C21", overall: 63 },

    { id: "portuguesarj", name: "Portuguesa (RJ)", shortName: "POR", badge: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Associa%C3%A7%C3%A3o_Atl%C3%A9tica_Portuguesa-RJ.png", primaryColor: "#FFFFFF", secondaryColor: "#D0202F", overall: 61 },

    { id: "sampaiocorrea", name: "Sampaio Corrêa", shortName: "SAM", badge: "https://upload.wikimedia.org/wikipedia/commons/8/86/Sampaio_Corr%C3%AAa_FC.png", primaryColor: "#FFFFFF", secondaryColor: "#00834B", overall: 60 },

    { id: "voltaredonda", name: "Volta Redonda", shortName: "VOL", badge: "https://upload.wikimedia.org/wikipedia/en/d/df/Volta_Redonda_Futebol_Clube.png", primaryColor: "#FFFFFF", secondaryColor: "#000000", overall: 64 },
];

const gauchoTeams = [
    { id: "gremio", name: "Grêmio", shortName: "GRE", badge: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Gremio_logo.svg/1718px-Gremio_logo.svg.png", primaryColor: "#FFFFFF", secondaryColor: "#0A5EB0", overall: 77 },

    { id: "internacional", name: "Internacional", shortName: "INT", badge: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Escudo_do_Sport_Club_Internacional.svg/1200px-Escudo_do_Sport_Club_Internacional.svg.png", primaryColor: "#FFFFFF", secondaryColor: "#E31D1A", overall: 76 },

    {
        id: "juventude", name: "Juventude", shortName: "JUV", badge: "https://logodetimes.com/times/juventude/logo-juventude-4096.png",
        primaryColor: "#FFFFFF", secondaryColor: "#006437", overall: 68
    },

    { id: "caxias", name: "Caxias", shortName: "CAX", badge: "https://logodetimes.com/times/caxias-do-sul/logo-caxias-do-sul-4096.png", primaryColor: "#FFFFFF", secondaryColor: "#7B0024", overall: 64 },

    { id: "ypiranga", name: "Ypiranga", shortName: "YPI", badge: "https://logodetimes.com/times/ypiranga-de-erechim/logo-ypiranga-de-erechim-4096.png", primaryColor: "#FFFFFF", secondaryColor: "#006437", overall: 61 },

    { id: "saojose", name: "São José", shortName: "SJO", badge: "https://logodetimes.com/times/sao-jose-rs/logo-sao-jose-rs-4096.png", primaryColor: "#FFFFFF", secondaryColor: "#003893", overall: 59 },

    { id: "avenida", name: "Avenida", shortName: "AVE", badge: "https://logodetimes.com/times/avenida-rs/logo-avenida-rs-4096.png", primaryColor: "#FFFFFF", secondaryColor: "#006437", overall: 58 },

    { id: "brasilpelotas", name: "Brasil de Pelotas", shortName: "BRA", badge: "https://logodetimes.com/times/brasil-de-pelotas/logo-brasil-de-pelotas-4096.png", primaryColor: "#FFFFFF", secondaryColor: "#000000", overall: 60 },

    { id: "saoluiz", name: "São Luiz", shortName: "SLU", badge: "https://logodetimes.com/times/sao-luiz-rs/logo-sao-luiz-rs-4096.png", primaryColor: "#FFFFFF", secondaryColor: "#E31D1A", overall: 56 },

    { id: "guarany", name: "Guarany de Bagé", shortName: "GUA", badge: "https://logodetimes.com/times/guarany-futebol-clube-rs/logo-guarany-futebol-clube-rs-4096.png", primaryColor: "#FFFFFF", secondaryColor: "#E31D1A", overall: 56 },

    { id: "monsoon", name: "Monsoon", shortName: "MON", badge: "https://s.sde.globo.com/media/organizations/2026/01/08/monsoon.svg", primaryColor: "#FFFFFF", secondaryColor: "#DAA520", overall: 55 },

    { id: "pelotas", name: "Pelotas", shortName: "PEL", badge: "https://s.sde.globo.com/media/organizations/2019/01/03/Pelotas-01.svg", primaryColor: "#FFFFFF", secondaryColor: "#003893", overall: 57 }
];

const mineiroTeams = [
    { id: "atletico", name: "Atlético-MG", shortName: "CAM", badge: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Atletico_mineiro_galo.png/250px-Atletico_mineiro_galo.png", primaryColor: "#FFFFFF", secondaryColor: "#000000", overall: 78 },

    { id: "cruzeiro", name: "Cruzeiro", shortName: "CRU", badge: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Cruzeiro_Esporte_Clube_%28logo%29.svg/2048px-Cruzeiro_Esporte_Clube_%28logo%29.svg.png", primaryColor: "#FFFFFF", secondaryColor: "#003DA5", overall: 77 },

    { id: "america", name: "América-MG", shortName: "AMG", badge: "//ssl.gstatic.com/onebox/media/sports/logos/xE2RajzsCEoen1wz8g8rhg_96x96.png", primaryColor: "#FFFFFF", secondaryColor: "#006437", overall: 72 },

    { id: "tombense", name: "Tombense", shortName: "TOM", badge: "//ssl.gstatic.com/onebox/media/sports/logos/hVv2tWVGqcgg_W-j_oputw_96x96.png", primaryColor: "#FFFFFF", secondaryColor: "#E31D1A", overall: 63 },

    { id: "athletic", name: "Athletic Club", shortName: "ATH", badge: "//ssl.gstatic.com/onebox/media/sports/logos/S9CYRaQLMRSpASVWqjl17A_96x96.png", primaryColor: "#FFFFFF", secondaryColor: "#000000", overall: 64 },

    { id: "pousoalegre", name: "Pouso Alegre", shortName: "POU", badge: "//ssl.gstatic.com/onebox/media/sports/logos/tuJNqEe81IR_a01SNlK68g_96x96.png", primaryColor: "#FFFFFF", secondaryColor: "#E31D1A", overall: 59 },

    { id: "democrata", name: "Democrata GV", shortName: "DEM", badge: "//ssl.gstatic.com/onebox/media/sports/logos/twM1KSyg1AfIYal17xWZAQ_96x96.png", primaryColor: "#FFFFFF", secondaryColor: "#000000", overall: 57 },

    { id: "itabirito", name: "Itabirito", shortName: "ITA", badge: "https://s.sde.globo.com/media/organizations/2024/01/12/itabirito-66507.svg", primaryColor: "#FFFFFF", secondaryColor: "#003893", overall: 55 },

    { id: "betim", name: "Betim", shortName: "BET", badge: "//ssl.gstatic.com/onebox/media/sports/logos/d6JVrza_AUl11TqoxX-Hbg_96x96.png", primaryColor: "#FFFFFF", secondaryColor: "#D0202F", overall: 56 },

    { id: "north", name: "North EC", shortName: "NOR", badge: "https://s.sde.globo.com/media/organizations/2026/01/06/North_EC.svg", primaryColor: "#FFFFFF", secondaryColor: "#003366", overall: 56 },

    { id: "uberlandia", name: "Uberlândia", shortName: "UBE", badge: "//ssl.gstatic.com/onebox/media/sports/logos/aAOQiCjNxB-XrsVLPs9A8g_96x96.png", primaryColor: "#FFFFFF", secondaryColor: "#00834B", overall: 58 },

    { id: "urt", name: "URT", shortName: "URT", badge: "https://s.sde.globo.com/media/organizations/2019/01/08/URT.svg", primaryColor: "#FFFFFF", secondaryColor: "#0000FF", overall: 57 }
];


const paranaenseTeams = [
    { id: "athletico", name: "Athletico-PR", shortName: "CAP", badge: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Athletico_Paranaense_%28Logo_2019%29.svg/250px-Athletico_Paranaense_%28Logo_2019%29.svg.png", primaryColor: "#FFFFFF", secondaryColor: "#000000", overall: 76 },

    { id: "coritiba", name: "Coritiba", shortName: "CFC", badge: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Coritiba_FBC_%282011%29_-_PR.svg/960px-Coritiba_FBC_%282011%29_-_PR.svg.png", primaryColor: "#FFFFFF", secondaryColor: "#005327", overall: 73 },

    { id: "operario", name: "Operário-PR", shortName: "OPE", badge: "//ssl.gstatic.com/onebox/media/sports/logos/GmLvorr4MqC4aRinQQ4Mdw_96x96.png", primaryColor: "#FFFFFF", secondaryColor: "#000000", overall: 65 },

    { id: "londrina", name: "Londrina", shortName: "LON", badge: "//ssl.gstatic.com/onebox/media/sports/logos/e7TVDQHlKXSPLpNT58XzBA_96x96.png", primaryColor: "#FFFFFF", secondaryColor: "#0091CF", overall: 64 },

    { id: "maringa", name: "Maringá FC", shortName: "MFC", badge: "//ssl.gstatic.com/onebox/media/sports/logos/reJfYxbZflCw0Wsi5s0eNA_96x96.png", primaryColor: "#FFFFFF", secondaryColor: "#000000", overall: 63 },

    { id: "fccascavel", name: "FC Cascavel", shortName: "FCC", badge: "//ssl.gstatic.com/onebox/media/sports/logos/qbmj87U49Y1xfIJwuBwKZg_96x96.png", primaryColor: "#FFFFFF", secondaryColor: "#000000", overall: 62 },

    { id: "cianorte", name: "Cianorte", shortName: "CIA", badge: "//ssl.gstatic.com/onebox/media/sports/logos/vsksTb7C-i3371bzVpcU_Q_96x96.png", primaryColor: "#FFFFFF", secondaryColor: "#003893", overall: 60 },

    { id: "azuriz", name: "Azuriz", shortName: "AZU", badge: "//ssl.gstatic.com/onebox/media/sports/logos/tgXFFY3CiWEIul9EmzjD1g_96x96.png", primaryColor: "#FFFFFF", secondaryColor: "#006437", overall: 59 },

    { id: "saojoseense", name: "São Joseense", shortName: "SJO", badge: "//ssl.gstatic.com/onebox/media/sports/logos/fmnyoN22p1UB8q6bo9VPMQ_96x96.png", primaryColor: "#FFFFFF", secondaryColor: "#003893", overall: 58 },

    { id: "andraus", name: "Andraus", shortName: "AND", badge: "//ssl.gstatic.com/onebox/media/sports/logos/d4eI6g7cnpKC8iC3aNkz2g_96x96.png", primaryColor: "#FFFFFF", secondaryColor: "#003893", overall: 57 },

    { id: "galomaringa", name: "Galo Maringá", shortName: "GAL", badge: "//ssl.gstatic.com/onebox/media/sports/logos/bYJj1vEl0KQ8HN73RMxcpg_96x96.png", primaryColor: "#FFFFFF", secondaryColor: "#000000", overall: 58 },

    { id: "fozdoiguacu", name: "Foz do Iguaçu", shortName: "FOZ", badge: "https://upload.wikimedia.org/wikipedia/pt/c/c2/FOZ-FC-2014-229x300_%281%29.png", primaryColor: "#FFFFFF", secondaryColor: "#0091CF", overall: 57 }
];

const allTeamsList = [...new Map([...brazilianTeams, ...paulistaTeams, ...cariocaTeams, ...gauchoTeams, ...mineiroTeams, ...paranaenseTeams].map(t => [t.id, t])).values()];



// ==================== SELEÇÕES INTERNACIONAIS (COPA DO MUNDO) ====================
const internationalTeams = [
    { id: "brasil", name: "Brasil", shortName: "BRA", badge: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Brazilian_Football_Confederation_logo.svg/1200px-Brazilian_Football_Confederation_logo.svg.png", primaryColor: "#FFDF00", secondaryColor: "#009C3B", overall: 94 },
    { id: "argentina", name: "Argentina", shortName: "ARG", badge: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Argentine_Football_Association_logo.svg/800px-Argentine_Football_Association_logo.svg.png", primaryColor: "#75AADB", secondaryColor: "#FFFFFF", overall: 93 },
    { id: "franca", name: "França", shortName: "FRA", badge: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/French_Football_Federation_logo.svg/800px-French_Football_Federation_logo.svg.png", primaryColor: "#002395", secondaryColor: "#FFFFFF", overall: 93 },
    { id: "inglaterra", name: "Inglaterra", shortName: "ING", badge: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8b/England_national_football_team_crest.svg/1200px-England_national_football_team_crest.svg.png", primaryColor: "#FFFFFF", secondaryColor: "#CE1124", overall: 91 },
    { id: "espanha", name: "Espanha", shortName: "ESP", badge: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Royal_Spanish_Football_Federation_logo.svg/1200px-Royal_Spanish_Football_Federation_logo.svg.png", primaryColor: "#C60B1E", secondaryColor: "#FFC400", overall: 91 },
    { id: "alemanha", name: "Alemanha", shortName: "ALE", badge: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Deutscher_Fussball-Bund_logo.svg/1200px-Deutscher_Fussball-Bund_logo.svg.png", primaryColor: "#FFFFFF", secondaryColor: "#000000", overall: 90 },
    { id: "portugal", name: "Portugal", shortName: "POR", badge: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Portuguese_Football_Federation.svg/1200px-Portuguese_Football_Federation.svg.png", primaryColor: "#E42518", secondaryColor: "#006600", overall: 89 },
    { id: "holanda", name: "Holanda", shortName: "HOL", badge: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Royal_Netherlands_Football_Association_Logo.svg/1200px-Royal_Netherlands_Football_Association_Logo.svg.png", primaryColor: "#F36C21", secondaryColor: "#FFFFFF", overall: 88 },
    { id: "croacia", name: "Croácia", shortName: "CRO", badge: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Coat_of_arms_of_Croatia.svg/1200px-Coat_of_arms_of_Croatia.svg.png", primaryColor: "#FFFFFF", secondaryColor: "#FF0000", overall: 86 },
    { id: "italia", name: "Itália", shortName: "ITA", badge: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/FIGC_logo_2023.svg/1200px-FIGC_logo_2023.svg.png", primaryColor: "#0064AA", secondaryColor: "#FFFFFF", overall: 87 },
    { id: "belgica", name: "Bélgica", shortName: "BEL", badge: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Royal_Belgian_Football_Association_logo.svg/1200px-Royal_Belgian_Football_Association_logo.svg.png", primaryColor: "#E30613", secondaryColor: "#000000", overall: 85 },
    { id: "uruguai", name: "Uruguai", shortName: "URU", badge: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Escudo_de_la_Selecci%C3%B3n_Uruguaya_de_F%C3%BAtbol.svg/1200px-Escudo_de_la_Selecci%C3%B3n_Uruguaya_de_F%C3%BAtbol.svg.png", primaryColor: "#5BA4D6", secondaryColor: "#000000", overall: 84 },
    { id: "colombia", name: "Colômbia", shortName: "COL", badge: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Federacion_Colombiana_de_Futbol_logo.svg/1200px-Federacion_Colombiana_de_Futbol_logo.svg.png", primaryColor: "#FCD116", secondaryColor: "#003893", overall: 83 },
    { id: "eua", name: "EUA", shortName: "EUA", badge: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/United_States_Soccer_Federation_logo_2016.svg/1200px-United_States_Soccer_Federation_logo_2016.svg.png", primaryColor: "#FFFFFF", secondaryColor: "#002868", overall: 82 },
    { id: "mexico", name: "México", shortName: "MEX", badge: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Mexican_Football_Federation_logo.svg/1200px-Mexican_Football_Federation_logo.svg.png", primaryColor: "#006847", secondaryColor: "#CE1126", overall: 81 },
    { id: "marrocos", name: "Marrocos", shortName: "MAR", badge: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Royal_Moroccan_Football_Federation_logo.svg/1200px-Royal_Moroccan_Football_Federation_logo.svg.png", primaryColor: "#C1272D", secondaryColor: "#006233", overall: 84 },
    { id: "japao", name: "Japão", shortName: "JPN", badge: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Japan_Football_Association_logo.svg/1200px-Japan_Football_Association_logo.svg.png", primaryColor: "#000555", secondaryColor: "#FFFFFF", overall: 80 },
    { id: "coreia", name: "Coreia do Sul", shortName: "KOR", badge: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Korea_Football_Association_logo.svg/1200px-Korea_Football_Association_logo.svg.png", primaryColor: "#EC0F31", secondaryColor: "#000000", overall: 79 },
    { id: "senegal", name: "Senegal", shortName: "SEN", badge: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Senegalese_Football_Federation_logo.svg/1200px-Senegalese_Football_Federation_logo.svg.png", primaryColor: "#FFFFFF", secondaryColor: "#00853F", overall: 81 },
    { id: "suica", name: "Suíça", shortName: "SUI", badge: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Swiss_Football_Association_logo.svg/1200px-Swiss_Football_Association_logo.svg.png", primaryColor: "#FF0000", secondaryColor: "#FFFFFF", overall: 82 },
    { id: "dinamarca", name: "Dinamarca", shortName: "DIN", badge: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Dansk_Boldspil-Union_logo.svg/1200px-Dansk_Boldspil-Union_logo.svg.png", primaryColor: "#C60C30", secondaryColor: "#FFFFFF", overall: 83 },
    { id: "equador", name: "Equador", shortName: "EQU", badge: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Ecuadorian_Football_Federation_logo_2020.svg/1200px-Ecuadorian_Football_Federation_logo_2020.svg.png", primaryColor: "#FFCE00", secondaryColor: "#00338D", overall: 80 },
    { id: "peru", name: "Peru", shortName: "PER", badge: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Peruvian_Football_Federation_logo.svg/1200px-Peruvian_Football_Federation_logo.svg.png", primaryColor: "#FFFFFF", secondaryColor: "#DA1033", overall: 78 },
    { id: "chile", name: "Chile", shortName: "CHI", badge: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Federaci%C3%B3n_de_F%C3%BAtbol_de_Chile_logo.svg/1200px-Federaci%C3%BAtbol_de_Chile_logo.svg.png", primaryColor: "#E30613", secondaryColor: "#0039A6", overall: 77 },
    { id: "ucrania", name: "Ucrânia", shortName: "UCR", badge: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Ukrainian_Association_of_Football_logo.svg/1200px-Ukrainian_Association_of_Football_logo.svg.png", primaryColor: "#FFD700", secondaryColor: "#0057B8", overall: 79 },
    { id: "servia", name: "Sérvia", shortName: "SRB", badge: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Football_Association_of_Serbia_logo.svg/1200px-Football_Association_of_Serbia_logo.svg.png", primaryColor: "#C6363C", secondaryColor: "#FFFFFF", overall: 80 },
    { id: "polonia", name: "Polônia", shortName: "POL", badge: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Polish_Football_Association_logo.svg/1200px-Polish_Football_Association_logo.svg.png", primaryColor: "#FFFFFF", secondaryColor: "#DC143C", overall: 81 },
    { id: "turquia", name: "Turquia", shortName: "TUR", badge: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Turkish_Football_Federation_logo.svg/1200px-Turkish_Football_Federation_logo.svg.png", primaryColor: "#E30A17", secondaryColor: "#FFFFFF", overall: 78 },
    { id: "australia", name: "Austrália", shortName: "AUS", badge: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Football_Australia_logo.svg/1200px-Football_Australia_logo.svg.png", primaryColor: "#FFD900", secondaryColor: "#014F3C", overall: 76 },
    { id: "canada", name: "Canadá", shortName: "CAN", badge: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Canada_Soccer_logo.svg/1200px-Canada_Soccer_logo.svg.png", primaryColor: "#C5281C", secondaryColor: "#000000", overall: 77 },
    { id: "nigeria", name: "Nigéria", shortName: "NIG", badge: "https://upload.wikimedia.org/wikipedia/en/thumb/9/91/Nigeria_Football_Federation_logo.svg/1200px-Nigeria_Football_Federation_logo.svg.png", primaryColor: "#008753", secondaryColor: "#FFFFFF", overall: 78 },
    { id: "egito", name: "Egito", shortName: "EGI", badge: "https://upload.wikimedia.org/wikipedia/en/thumb/6/69/Egyptian_Football_Association_logo.svg/1200px-Egyptian_Football_Association_logo.svg.png", primaryColor: "#CE1126", secondaryColor: "#FFFFFF", overall: 77 }
];

// ==================== WORLD CUP MANAGER ====================
const WorldCupManager = {
    userTeamId: null,
    currentStage: null,
    bracket: {}, // Estrutura: { groups: [], r16: [], qf: [], sf: [], final: [] }

    // Inicia uma nova Copa
    startNewCampaign: (teamId) => {
        WorldCupManager.userTeamId = teamId;
        WorldCupManager.currentStage = 'groups';
        WorldCupManager.generateGroups();
        WorldCupManager.saveProgress();
    },

    // Gera os grupos (8 grupos de 4)
    generateGroups: () => {
        // Implementação simplificada: Distribui times aleatoriamente
        const allTeams = [...internationalTeams];
        // Embaralhar
        for (let i = allTeams.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [allTeams[i], allTeams[j]] = [allTeams[j], allTeams[i]];
        }

        const groups = [];
        for (let i = 0; i < 8; i++) {
            groups.push({
                name: String.fromCharCode(65 + i), // A, B, C...
                teams: allTeams.slice(i * 4, (i + 1) * 4).map(t => ({
                    id: t.id,
                    p: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0
                })),
                matches: [] // Lista de jogos do grupo
            });
        }
        WorldCupManager.bracket.groups = groups;
        WorldCupManager.generateGroupMatches();
    },

    generateGroupMatches: () => {
        // Gera tabela de jogos para todos os grupos (todos contra todos)
        WorldCupManager.bracket.groups.forEach(group => {
            const teams = group.teams;
            group.matches = [
                { t1: teams[0].id, t2: teams[1].id, played: false, score1: null, score2: null },
                { t1: teams[2].id, t2: teams[3].id, played: false, score1: null, score2: null },
                { t1: teams[0].id, t2: teams[2].id, played: false, score1: null, score2: null },
                { t1: teams[1].id, t2: teams[3].id, played: false, score1: null, score2: null },
                { t1: teams[0].id, t2: teams[3].id, played: false, score1: null, score2: null },
                { t1: teams[1].id, t2: teams[2].id, played: false, score1: null, score2: null }
            ];
        });
    },

    saveProgress: () => {
        const data = {
            userTeamId: WorldCupManager.userTeamId,
            currentStage: WorldCupManager.currentStage,
            bracket: WorldCupManager.bracket,
            savedAt: new Date().toISOString()
        };
        localStorage.setItem('arena_worldcup_progress', JSON.stringify(data));
    },

    loadProgress: () => {
        const data = JSON.parse(localStorage.getItem('arena_worldcup_progress'));
        if (data) {
            WorldCupManager.userTeamId = data.userTeamId;
            WorldCupManager.currentStage = data.currentStage;
            WorldCupManager.bracket = data.bracket;
            return true;
        }
        return false;
    }
};

// ==================== STATE VARIABLES ====================
let currentGameMode = 'quick';
let selectedTeams = [];
let team1, team2;
let score1 = 0, score2 = 0;
let matchTime = 0;
let rotation = 0;
let startTime = 0;
let pausedTime = 0;
let goalCooldown = false;
let hasFirstGoal = false;
let isPlaying = false;
let animationId;
let shield1, shield2;
const startMatchMessageToggle = false;
// selectedLeague managed via window object to ensure global access

// 


// ==================== GAME CONSTANTS ====================
const ARENA_SIZE = 400;
const SHIELD_SIZE = 35;
const GOAL_SIZE = 100;
const GOAL_DEPTH = 35;
const NORMAL_TIME = 90;
const EXTRA_TIME = 97;
const BASE_SPEED = 7;
const MAX_SPEED = 12;
const MIN_SPEED = 5;
const SPEED_SETTINGS = {
    slow: { matchDuration: 60000, rotationMult: 0.5, label: 'Lento' },
    normal: { matchDuration: 40000, rotationMult: 1.0, label: 'Normal' },
    fast: { matchDuration: 20000, rotationMult: 1.5, label: 'Rápido' }
};

// ==================== IMAGENS DE FUNDO (Estádios Brasileirãos) ====================
// Estádios icônicos do futebol Brasileirão
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
            "GOL! Que jogada sensacional!",
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
            "🦓 O fraco venceu o forte! No futebol, tudo pode acontecer!"
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
        if (playerBar && !isPlaying) playerBar.classList.add('visible');
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
            btnPlayPause.textContent = isPlaying ? "⏸" : "►";
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
        if (!this.sfxEnabled) {
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
            } catch (e) { }
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
            currentLeague: ArcadeManager.currentLeague,
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
// ==================== SYSTEM OF LEAGUES ====================
const LeagueSystem = {
    configs: {
        'Brasileirão': {
            name: 'Brasileirão',
            type: 'league',
            rounds: 19
        },
        'paulista': {
            name: 'Paulistão',
            type: 'group_knockout',
            groups: 4
        },
        'carioca': {
            name: 'Cariocão',
            type: 'league_knockout',
            rounds: 11,
            knockout: {
                semis: { legs: 2, advantage: true },
                final: { legs: 2 }
            }
        },
        'Gauchão': {
            name: 'Gauchão',
            type: 'cross_group',
            groups: 3,
            teamsPerGroup: 4,
            rounds: 8,
            knockout: {
                semis: { legs: 2 },
                final: { legs: 2 }
            }
        },
        'mineiro': {
            name: 'Mineiro', type: 'cross_group_mineiro', groups: 3, teamsPerGroup: 4, rounds: 8,
            knockout: { semis: { legs: 2 }, final: { legs: 2 } }
        },
        'paranaense': {
            name: 'Paranaense', type: 'league_knockout', rounds: 11,
            knockout: { quarters: { legs: 2 }, semis: { legs: 2 }, final: { legs: 2 } }
        }
    },

    generatePaulistaGroups: (teams) => {
        const shuffled = [...teams].sort(() => Math.random() - 0.5);
        const groups = { 'A': [], 'B': [], 'C': [], 'D': [] };
        const keys = ['A', 'B', 'C', 'D'];
        shuffled.forEach((team, index) => {
            groups[keys[index % 4]].push(team.id);
        });
        return groups;
    },

    generatePaulistaSchedule: (groups) => {
        const groupKeys = ['A', 'B', 'C', 'D'];
        let allMatches = [];

        groupKeys.forEach(g1 => {
            groups[g1].forEach(t1 => {
                groupKeys.forEach(g2 => {
                    if (g1 === g2) return;
                    groups[g2].forEach(t2 => {
                        if (!allMatches.find(m => (m.home === t1 && m.away === t2) || (m.home === t2 && m.away === t1))) {
                            allMatches.push({ home: t1, away: t2 });
                        }
                    });
                });
            });
        });

        // Pack into 12 rounds
        const rounds = Array.from({ length: 12 }, () => []);
        allMatches.sort(() => Math.random() - 0.5);

        allMatches.forEach(match => {
            for (let i = 0; i < 12; i++) {
                const round = rounds[i];
                if (!round.find(m => m.home === match.home || m.away === match.home || m.home === match.away || m.away === match.away)) {
                    round.push(match);
                    return;
                }
            }
        });
        return rounds.filter(r => r.length > 0);
    },

    generateGauchãoGroups: (teams) => {
        const groups = { 'A': [], 'B': [], 'C': [] };

        // Group A: Grêmio, São José, Guarany, Avenida
        groups['A'] = ['gremio', 'saojose', 'guarany', 'avenida'];

        // Group B: Inter, Caxias, Pelotas, Ypiranga
        groups['B'] = ['internacional', 'caxias', 'pelotas', 'ypiranga'];

        // Group C: Juventude, Monsoon, Brasil-Pel, São Luiz
        groups['C'] = ['juventude', 'monsoon', 'brasilpelotas', 'saoluiz'];

        return groups;
    },

    generateMineiroGroups: (teams) => {
        const groups = { 'A': [], 'B': [], 'C': [] };

        // Group A: Atlético-MG, Democrata-GV, Uberlândia, URT
        groups['A'] = ['atletico', 'democrata', 'uberlandia', 'urt'];

        // Group B: América-MG, Betim, Pouso Alegre, Tombense
        groups['B'] = ['america', 'betim', 'pousoalegre', 'tombense'];

        // Group C: Athletic, Cruzeiro, Itabirito, North
        groups['C'] = ['athletic', 'cruzeiro', 'itabirito', 'north'];

        return groups;
    },

    generateCrossGroupSchedule: (groups, groupPairs, numRounds) => {
        let allMatches = [];

        // Logic for 3 groups cross-play (Generic)
        const groupKeys = Object.keys(groups);
        groupKeys.forEach(g1 => {
            groups[g1].forEach(t1 => {
                groupKeys.forEach(g2 => {
                    if (g1 === g2) return;
                    groups[g2].forEach(t2 => {
                        if (!allMatches.find(m => (m.home === t1 && m.away === t2) || (m.home === t2 && m.away === t1))) {
                            allMatches.push({ home: t1, away: t2 });
                        }
                    });
                });
            });
        });

        allMatches.sort(() => Math.random() - 0.5);
        const rounds = Array.from({ length: numRounds }, () => []);

        allMatches.forEach(match => {
            // Try to fit in existing rounds
            for (let i = 0; i < numRounds; i++) {
                const r = rounds[i];
                if (!r.find(m => m.home === match.home || m.away === match.home || m.home === match.away || m.away === match.away)) {
                    r.push(match);
                    return;
                }
            }
            // Fallback: put in random round even if conflict (shouldn't happen often with few teams)
            const fallback = rounds[Math.floor(Math.random() * numRounds)];
            if (fallback) fallback.push(match);
        });

        return rounds.filter(r => r.length > 0);
    },

    generateRoundRobin: (teamsList) => {
        const teams = teamsList.map(t => t.id);
        const n = teams.length;
        const rounds = [];
        const matchesPerRound = Math.floor(n / 2);
        let roundTeams = [...teams];

        for (let r = 0; r < n - 1; r++) {
            const roundMatches = [];
            for (let i = 0; i < matchesPerRound; i++) {
                if (r % 2 === 0) roundMatches.push({ home: roundTeams[i], away: roundTeams[n - 1 - i] });
                else roundMatches.push({ home: roundTeams[n - 1 - i], away: roundTeams[i] });
            }
            rounds.push(roundMatches);
            roundTeams.splice(1, 0, roundTeams.pop());
        }
        return [...rounds];
    }
};

// ==================== ARCADE MANAGER (Lógica do Campeonato) ====================
const ArcadeManager = {
    userTeamId: null,
    currentLeague: 'Brasileirão',
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

    init: (teamId, leagueType = 'Brasileirão') => {
        ArcadeManager.userTeamId = teamId;
        ArcadeManager.currentLeague = leagueType;
        ArcadeManager.currentStage = 'regular'; // Start at regular stage

        // Load Teams
        if (leagueType === 'paulista') ArcadeManager.leagueTeams = [...paulistaTeams];
        else if (leagueType === 'carioca') ArcadeManager.leagueTeams = [...cariocaTeams];
        else if (leagueType === 'Gauchão') ArcadeManager.leagueTeams = [...gauchoTeams];
        else if (leagueType === 'mineiro') ArcadeManager.leagueTeams = [...mineiroTeams];
        else if (leagueType === 'paranaense') ArcadeManager.leagueTeams = [...paranaenseTeams];
        else ArcadeManager.leagueTeams = [...brazilianTeams];

        // Init Stats
        ArcadeManager.standings = {};
        ArcadeManager.overallBoosts = {}; // Reset boosts for new campaign for balance
        ArcadeManager.coins = 0;

        ArcadeManager.leagueTeams.forEach(t => {
            ArcadeManager.standings[t.id] = { p: 0, j: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0, sg: 0 };
            ArcadeManager.overallBoosts[t.id] = 0;
        });

        // Init Structure
        if (leagueType === 'paulista') {
            ArcadeManager.groups = LeagueSystem.generatePaulistaGroups(ArcadeManager.leagueTeams);
            ArcadeManager.schedule = LeagueSystem.generatePaulistaSchedule(ArcadeManager.groups);
        } else if (leagueType === 'Gauchão') {
            ArcadeManager.groups = LeagueSystem.generateGauchãoGroups(ArcadeManager.leagueTeams);
            ArcadeManager.schedule = LeagueSystem.generateCrossGroupSchedule(ArcadeManager.groups, 'Gauchão', 8);
        } else if (leagueType === 'mineiro') {
            ArcadeManager.groups = LeagueSystem.generateMineiroGroups(ArcadeManager.leagueTeams);
            ArcadeManager.schedule = LeagueSystem.generateCrossGroupSchedule(ArcadeManager.groups, 'mineiro', 8);
        } else {
            // Brasileirão & Carioca & Paranaense (League format initially)
            ArcadeManager.groups = null;
            if (leagueType === 'carioca') {
                ArcadeManager.schedule = LeagueSystem.generateRoundRobin(ArcadeManager.leagueTeams); // 11 Rounds
            } else if (leagueType === 'paranaense') {
                ArcadeManager.schedule = LeagueSystem.generateRoundRobin(ArcadeManager.leagueTeams); // 11 Rounds (same logic as carioca/1-turn)
            } else {
                ArcadeManager.schedule = LeagueSystem.generateRoundRobin(ArcadeManager.leagueTeams); // Brasileirão (logic inside handles turns)
            }
        }

        ArcadeManager.currentRound = 0;
        ArcadeManager.knockoutBracket = [];
        StorageManager.saveArcadeProgress();
    },

    loadProgress: (savedData) => {
        Object.assign(ArcadeManager, savedData);
        // Ensure league logic works
        if (ArcadeManager.currentLeague === 'paulista') ArcadeManager.leagueTeams = [...paulistaTeams];
        else if (ArcadeManager.currentLeague === 'carioca') ArcadeManager.leagueTeams = [...cariocaTeams];
        else if (ArcadeManager.currentLeague === 'Gauchão') ArcadeManager.leagueTeams = [...gauchoTeams];
        else if (ArcadeManager.currentLeague === 'mineiro') ArcadeManager.leagueTeams = [...mineiroTeams];
        else if (ArcadeManager.currentLeague === 'paranaense') ArcadeManager.leagueTeams = [...paranaenseTeams];
        else ArcadeManager.leagueTeams = [...brazilianTeams];
    },

    getTeamOverall: (teamId) => {
        // Helper to find team data
        const findTeam = (id) => paulistaTeams.find(t => t.id === id) || cariocaTeams.find(t => t.id === id) || gauchoTeams.find(t => t.id === id) || mineiroTeams.find(t => t.id === id) || paranaenseTeams.find(t => t.id === id) || brazilianTeams.find(t => t.id === id);
        const team = findTeam(teamId);
        const base = team ? team.overall : 70;
        const boost = ArcadeManager.overallBoosts[teamId] || 0;
        return base + boost;
    },

    addCoins: (amount) => {
        ArcadeManager.coins += amount;
        ArcadeManager.updateCoinsUI();
        StorageManager.saveArcadeProgress();
    },

    spendCoins: (amount) => {
        if (ArcadeManager.coins >= amount) {
            ArcadeManager.coins -= amount;
            ArcadeManager.updateCoinsUI();
            StorageManager.saveArcadeProgress();
            return true;
        }
        return false;
    },

    upgradeTeam: () => {
        const cost = 100 + ((ArcadeManager.overallBoosts[ArcadeManager.userTeamId] || 0) * 50);
        if (ArcadeManager.spendCoins(cost)) {
            ArcadeManager.overallBoosts[ArcadeManager.userTeamId] = (ArcadeManager.overallBoosts[ArcadeManager.userTeamId] || 0) + 1;
            ArcadeManager.updateCoinsUI();
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
            const cost = 100 + ((ArcadeManager.overallBoosts[ArcadeManager.userTeamId] || 0) * 50);
            upgradeCostEl.textContent = cost;
        }
    },

    // ================== MATCH & STANDINGS ==================

    getNextUserMatch: () => {
        if (ArcadeManager.currentStage === 'regular') {
            if (ArcadeManager.currentRound >= ArcadeManager.schedule.length) return null;
            const round = ArcadeManager.schedule[ArcadeManager.currentRound];
            return round.find(m => m.home === ArcadeManager.userTeamId || m.away === ArcadeManager.userTeamId);
        } else {
            // Knockout Logic
            const match = ArcadeManager.knockoutBracket.find(m =>
                (m.home === ArcadeManager.userTeamId || m.away === ArcadeManager.userTeamId) && !m.completed
            );
            return match;
        }
    },

    registerUserResult: (homeId, awayId, scoreHome, scoreAway) => {
        if (ArcadeManager.currentStage === 'regular') {
            ArcadeManager.updateStandings(homeId, awayId, scoreHome, scoreAway);
            ArcadeManager.simulateRound(); // Simulates others
            ArcadeManager.currentRound++;

            // Economy logic
            ArcadeManager.processRewards(homeId, awayId, scoreHome, scoreAway);
            ArcadeManager.checkPhaseTransition();
        } else {
            // Knockout
            ArcadeManager.processKnockoutMatch(homeId, awayId, scoreHome, scoreAway);
            ArcadeManager.processRewards(homeId, awayId, scoreHome, scoreAway);

            // Simulate other knockout matches
            ArcadeManager.simulateKnockoutRound();
            ArcadeManager.checkKnockoutTransition();
        }
        StorageManager.saveArcadeProgress();
    },

    processRewards: (homeId, awayId, scoreHome, scoreAway) => {
        const userIsHome = homeId === ArcadeManager.userTeamId;
        const userScore = userIsHome ? scoreHome : scoreAway;
        const oppScore = userIsHome ? scoreAway : scoreHome;
        let earned = 50; // base
        if (userScore > oppScore) earned += 150;
        else if (userScore == oppScore) earned += 50;
        earned += userScore * 10;
        ArcadeManager.addCoins(earned);
    },

    simulateRound: () => {
        const round = ArcadeManager.schedule[ArcadeManager.currentRound];
        round.forEach(m => {
            if (m.home !== ArcadeManager.userTeamId && m.away !== ArcadeManager.userTeamId) {
                // Sim Logic
                const s1 = Math.floor(Math.random() * 5); // simple
                const s2 = Math.floor(Math.random() * 4);
                ArcadeManager.updateStandings(m.home, m.away, s1, s2);
            }
        });
    },

    updateStandings: (homeId, awayId, s1, s2) => {
        const up = (id, f, a) => {
            if (!ArcadeManager.standings[id]) return;
            const s = ArcadeManager.standings[id];
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
        if (ArcadeManager.currentRound < ArcadeManager.schedule.length) return;

        // Season Done. Check rules.
        if (NewArcadeManager.currentLeague === 'paulista') {
            NewArcadeManager.transitionToPaulistaKnockout();
        } else if (NewArcadeManager.currentLeague === 'Gauchão') {
            NewArcadeManager.transitionToGauchãoKnockout();
        } else if (NewArcadeManager.currentLeague === 'mineiro') {
            NewArcadeManager.transitionToMineiroKnockout();
        } else if (NewArcadeManager.currentLeague === 'carioca') {
            NewArcadeManager.transitionToCariocaKnockout();
        } else if (NewArcadeManager.currentLeague === 'paranaense') {
            NewArcadeManager.transitionToParanaenseKnockout();
        } else {
            // Brasileirão Ends
            NewArcadeManager.finishSeason();
        }
    },

    getGroupStandings: (groupName) => {
        // Returns sorted array of team stats for a specific group
        const groupTeams = ArcadeManager.groups[groupName];
        return groupTeams.map(tid => ({ id: tid, ...ArcadeManager.standings[tid] }))
            .sort((a, b) => b.p - a.p || b.v - a.v || b.sg - a.sg);
    },

    transitionToPaulistaKnockout: () => {
        // Top 2 of each group
        const qfMatches = [];
        ['A', 'B', 'C', 'D'].forEach(g => {
            const table = ArcadeManager.getGroupStandings(g);
            // 1st vs 2nd
            qfMatches.push({
                id: `QF-${g}`,
                home: table[0].id, // Better campaign usually home
                away: table[1].id,
                stage: 'quarters',
                completed: false
            });
        });

        ArcadeManager.knockoutBracket = qfMatches;
        ArcadeManager.currentStage = 'quarters';
        alert("Fase de Grupos encerrada! Iniciando Quartas de Final.");
    },

    transitionToCariocaKnockout: () => {
        // Top 4 General
        const leaderboard = ArcadeManager.getLeaderboard();
        const top4 = leaderboard.slice(0, 4);

        const semiMatches = [
            { home: top4[0].id, away: top4[3].id, stage: 'semis', leg: 1 }, // 1 vs 4
            { home: top4[1].id, away: top4[2].id, stage: 'semis', leg: 1 }  // 2 vs 3
        ];

        ArcadeManager.knockoutBracket = semiMatches.map(m => ({ ...m, totalLegs: 2, currentLeg: 1, aggHome: 0, aggAway: 0, completed: false }));
        ArcadeManager.currentStage = 'semis';

        const leagueName = ArcadeManager.currentLeague === 'carioca' ? 'Taça Guanabara' : 'Fase Classificatória';
        alert(`${leagueName} encerrada! Iniciando Semifinais.`);
    },

    transitionToGauchãoKnockout: () => {
        // Leaders of A, B, C + Best 2nd Place
        const winners = ['A', 'B', 'C'].map(g => ArcadeManager.getGroupStandings(g)[0]);

        // Best 2nd: Get all 2nd places, compare
        const seconds = ['A', 'B', 'C'].map(g => ArcadeManager.getGroupStandings(g)[1]);
        const bestSecond = seconds.sort((a, b) => b.p - a.p || b.v - a.v || b.sg - a.sg)[0];

        // Combine and Sort by general campaign to decide bracket
        // Semis: 1st General vs 4th General, 2nd vs 3rd.
        const qualified = [...winners, bestSecond].sort((a, b) => b.p - a.p || b.v - a.v || b.sg - a.sg);

        // Semis Matchups (1 vs 4, 2 vs 3)
        const semis = [
            { home: qualified[0].id, away: qualified[3].id },
            { home: qualified[1].id, away: qualified[2].id }
        ];

        ArcadeManager.knockoutBracket = semis.map(m => ({
            ...m, stage: 'semis', totalLegs: 2, currentLeg: 1, aggHome: 0, aggAway: 0, completed: false
        }));
        ArcadeManager.currentStage = 'semis';
        alert("Fase de Grupos do Gauchão encerrada!\\nLíderes e melhor 2º avançam.");
    },

    transitionToMineiroKnockout: () => {
        // Leaders of A, B, C + Best 2nd Place
        const winners = ['A', 'B', 'C'].map(g => ArcadeManager.getGroupStandings(g)[0]);

        // Best 2nd: Get all 2nd places, compare
        const seconds = ['A', 'B', 'C'].map(g => ArcadeManager.getGroupStandings(g)[1]);
        const bestSecond = seconds.sort((a, b) => b.p - a.p || b.v - a.v || b.sg - a.sg)[0];

        // Combine and Sort by general campaign to decide bracket
        // Mineiro Semis: 1st General vs 4th General, 2nd vs 3rd.
        const qualified = [...winners, bestSecond].sort((a, b) => b.p - a.p || b.v - a.v || b.sg - a.sg);

        // Semis Matchups (1 vs 4, 2 vs 3)
        const semis = [
            { home: qualified[0].id, away: qualified[3].id },
            { home: qualified[1].id, away: qualified[2].id }
        ];

        ArcadeManager.knockoutBracket = semis.map(m => ({
            ...m, stage: 'semis', totalLegs: 2, currentLeg: 1, aggHome: 0, aggAway: 0, completed: false
        }));
        ArcadeManager.currentStage = 'semis';
        alert("Fase de Grupos do Mineiro encerrada!\\nLíderes e melhor 2º avançam.");
    },

    transitionToParanaenseKnockout: () => {
        // Top 8 General
        const leaderboard = ArcadeManager.getLeaderboard();
        const top8 = leaderboard.slice(0, 8);

        // Quarters: 1v8, 2v7, 3v6, 4v5. 2 Legs.
        const matchUps = [
            { home: top8[0].id, away: top8[7].id },
            { home: top8[1].id, away: top8[6].id },
            { home: top8[2].id, away: top8[5].id },
            { home: top8[3].id, away: top8[4].id }
        ];

        ArcadeManager.knockoutBracket = matchUps.map(m => ({
            ...m, stage: 'quarters', totalLegs: 2, currentLeg: 1, aggHome: 0, aggAway: 0, completed: false
        }));
        ArcadeManager.currentStage = 'quarters';
        alert("Primeira Fase do Paranaense encerrada!\\nOs 8 melhores avançam para as Quartas.");
    },

    // ================== KNOCKOUT LOGIC ==================

    processKnockoutMatch: (homeId, awayId, sHome, sAway) => {
        const match = ArcadeManager.knockoutBracket.find(m => m.home === homeId && m.away === awayId && !m.completed);
        if (!match) return;

        match.homeScore = sHome;
        match.awayScore = sAway;
        match.completed = true;

        if (match.totalLegs && match.totalLegs > 1) {
            match.aggHome = (match.aggHome || 0) + sHome;
            match.aggAway = (match.aggAway || 0) + sAway;
        }
    },

    simulateKnockoutRound: () => {
        ArcadeManager.knockoutBracket.forEach(m => {
            if (!m.completed && m.home !== ArcadeManager.userTeamId && m.away !== ArcadeManager.userTeamId) {
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
        if (ArcadeManager.knockoutBracket.some(m => !m.completed)) return;

        // All done. Next step?
        if (ArcadeManager.currentLeague === 'paulista') {
            ArcadeManager.advancePaulista();
        } else if (ArcadeManager.currentLeague === 'Gauchão') {
            ArcadeManager.advanceGauchão();
        } else if (ArcadeManager.currentLeague === 'mineiro') {
            ArcadeManager.advanceMineiro();
        } else if (ArcadeManager.currentLeague === 'carioca') {
            ArcadeManager.advanceCarioca();
        } else if (ArcadeManager.currentLeague === 'paranaense') {
            ArcadeManager.advanceParanaense();
        }
    },

    advancePaulista: () => {
        if (ArcadeManager.currentStage === 'quarters') {
            const winners = ArcadeManager.knockoutBracket.map(m => {
                if (m.homeScore > m.awayScore) return m.home;
                if (m.awayScore > m.homeScore) return m.away;
                return Math.random() > 0.5 ? m.home : m.away;
            });

            const semis = [
                { home: winners[0], away: winners[1], stage: 'semis' },
                { home: winners[2], away: winners[3], stage: 'semis' }
            ];
            ArcadeManager.knockoutBracket = semis;
            ArcadeManager.currentStage = 'semis';
            alert("Classificado para as Semifinais!");
        } else if (ArcadeManager.currentStage === 'semis') {
            const winners = ArcadeManager.knockoutBracket.map(m => {
                if (m.homeScore > m.awayScore) return m.home;
                if (m.awayScore > m.homeScore) return m.away;
                return Math.random() > 0.5 ? m.home : m.away;
            });

            const final = [
                { home: winners[0], away: winners[1], stage: 'final', totalLegs: 2, currentLeg: 1 }
            ];
            ArcadeManager.knockoutBracket = final;
            ArcadeManager.currentStage = 'final';
            alert("Grande FINAL definida!");
        } else if (ArcadeManager.currentStage === 'final') {
            const match = ArcadeManager.knockoutBracket[0];
            if (match.currentLeg === 1) {
                match.currentLeg = 2;
                match.completed = false;
                const temp = match.home; match.home = match.away; match.away = temp;
                alert("Fim do primeiro jogo da final! Preparando jogo de volta.");
            } else {
                let championId = match.aggHome > match.aggAway ? match.home : match.away;
                if (match.aggHome == match.aggAway) championId = match.home;
                const champion = ArcadeManager.leagueTeams.find(t => t.id === championId);
                showChampionScreen(champion);
            }
        }
    },

    advanceCarioca: () => {
        if (ArcadeManager.currentStage === 'semis') {
            const pending = ArcadeManager.knockoutBracket.some(m => m.currentLeg < 2);
            if (pending) {
                ArcadeManager.setupSecondLeg();
                return;
            }

            const winners = ArcadeManager.resolveWinners();
            const final = [
                { home: winners[0], away: winners[1], stage: 'final', totalLegs: 2, currentLeg: 1 }
            ];
            ArcadeManager.knockoutBracket = final;
            ArcadeManager.currentStage = 'final';

            let msg = "Final definida!";
            if (ArcadeManager.currentLeague === 'carioca') msg = "Final do Cariocão definida!";
            alert(msg);
        } else if (ArcadeManager.currentStage === 'final') {
            const match = ArcadeManager.knockoutBracket[0];
            if (match.currentLeg === 1) {
                match.currentLeg = 2;
                match.completed = false;
                const temp = match.home; match.home = match.away; match.away = temp;
                alert("Fim do jogo de ida. Decisão na volta!");
            } else {
                let championId = match.aggHome > match.aggAway ? match.home : match.away;
                if (match.aggHome == match.aggAway) championId = match.home;
                const champion = ArcadeManager.leagueTeams.find(t => t.id === championId);
                showChampionScreen(champion);
            }
        }
    },

    advanceParanaense: () => {
        const stage = ArcadeManager.currentStage;
        const pending = ArcadeManager.knockoutBracket.some(m => m.currentLeg < 2);
        if (pending) {
            ArcadeManager.setupSecondLeg();
            return;
        }

        const winners = ArcadeManager.resolveWinners();

        if (stage === 'quarters') {
            const semis = [
                { home: winners[0], away: winners[3], stage: 'semis', totalLegs: 2, currentLeg: 1 },
                { home: winners[1], away: winners[2], stage: 'semis', totalLegs: 2, currentLeg: 1 }
            ];
            ArcadeManager.knockoutBracket = semis;
            ArcadeManager.currentStage = 'semis';
            alert("Semifinais do Paranaense definidas!");
        } else if (stage === 'semis') {
            const final = [
                { home: winners[0], away: winners[1], stage: 'final', totalLegs: 2, currentLeg: 1 }
            ];
            ArcadeManager.knockoutBracket = final;
            ArcadeManager.currentStage = 'final';
            alert("Grande Final do Paranaense!");
        } else if (stage === 'final') {
            ArcadeManager.finishChampion(winners[0]);
        }
    },

    advanceGauchão: () => {
        const stage = ArcadeManager.currentStage;
        const pending = ArcadeManager.knockoutBracket.some(m => m.currentLeg < 2);
        if (pending) {
            ArcadeManager.setupSecondLeg();
            return;
        }

        const winners = ArcadeManager.resolveWinners();

        if (stage === 'quarters') {
            const semis = [
                { home: winners[0], away: winners[3], stage: 'semis', totalLegs: 2, currentLeg: 1 },
                { home: winners[1], away: winners[2], stage: 'semis', totalLegs: 2, currentLeg: 1 }
            ];
            ArcadeManager.knockoutBracket = semis;
            ArcadeManager.currentStage = 'semis';
            alert("Semifinais do Gauchão definidas!");
        } else if (stage === 'semis') {
            const final = [
                { home: winners[0], away: winners[1], stage: 'final', totalLegs: 2, currentLeg: 1 }
            ];
            ArcadeManager.knockoutBracket = final;
            ArcadeManager.currentStage = 'final';
            alert("Grande Final do Gauchão!");
        } else if (stage === 'final') {
            ArcadeManager.finishChampion(winners[0]);
        }
    },

    advanceMineiro: () => {
        const stage = ArcadeManager.currentStage;
        const pending = ArcadeManager.knockoutBracket.some(m => m.currentLeg < 2);
        if (pending) {
            ArcadeManager.setupSecondLeg();
            return;
        }

        const winners = ArcadeManager.resolveWinners();

        if (stage === 'semis') {
            const final = [
                { home: winners[0], away: winners[1], stage: 'final', totalLegs: 2, currentLeg: 1 }
            ];
            ArcadeManager.knockoutBracket = final;
            ArcadeManager.currentStage = 'final';
            alert("Grande Final do Mineiro!");
        } else if (stage === 'final') {
            ArcadeManager.finishChampion(winners[0]);
        }
    },

    setupSecondLeg: () => {
        ArcadeManager.knockoutBracket.forEach(m => {
            m.currentLeg = 2;
            m.completed = false;
            const t = m.home; m.home = m.away; m.away = t;
        });
        alert("Rodada de Volta!");
    },

    resolveWinners: () => {
        return ArcadeManager.knockoutBracket.map(m => {
            if (m.aggHome > m.aggAway) return m.home;
            if (m.aggAway > m.aggHome) return m.away;
            return m.home;
        });
    },

    finishChampion: (id) => {
        const team = ArcadeManager.leagueTeams.find(t => t.id === id);
        showChampionScreen(team);
    },

    finishSeason: () => {
        const leaderboard = ArcadeManager.getLeaderboard();
        showChampionScreen(leaderboard[0]);
    },


    getNextUserMatch: () => {
        if (ArcadeManager.currentStage === 'regular') {
            if (ArcadeManager.currentRound >= ArcadeManager.schedule.length) return null;
            const round = ArcadeManager.schedule[ArcadeManager.currentRound];
            return round.find(m => m.home === ArcadeManager.userTeamId || m.away === ArcadeManager.userTeamId);
        } else {
            return ArcadeManager.knockoutBracket.find(m => (m.home === ArcadeManager.userTeamId || m.away === ArcadeManager.userTeamId) && !m.completed);
        }
    },

    registerUserResult: (homeId, awayId, scoreHome, scoreAway) => {
        if (ArcadeManager.currentStage === 'regular') {
            ArcadeManager.updateStandings(homeId, awayId, scoreHome, scoreAway);
            ArcadeManager.simulateRound();
            ArcadeManager.currentRound++;
            ArcadeManager.checkPhaseTransition();
        } else {
            ArcadeManager.processKnockoutMatch(homeId, awayId, scoreHome, scoreAway);
            ArcadeManager.simulateKnockoutRound();
            ArcadeManager.checkKnockoutTransition();
        }

        // Rewards
        const userIsHome = homeId === ArcadeManager.userTeamId;
        const userScore = userIsHome ? scoreHome : scoreAway;
        const oppScore = userIsHome ? scoreAway : scoreHome;
        let earned = 50 + (userScore * 10);
        if (userScore > oppScore) earned += 150;
        else if (userScore == oppScore) earned += 50;
        ArcadeManager.addCoins(earned);

        StorageManager.saveArcadeProgress();
    },

    simulateRound: () => {
        const round = ArcadeManager.schedule[ArcadeManager.currentRound];
        if (!round) return;
        round.forEach(m => {
            if (m.home !== ArcadeManager.userTeamId && m.away !== ArcadeManager.userTeamId) {
                const s1 = Math.floor(Math.random() * 4);
                const s2 = Math.floor(Math.random() * 3);
                ArcadeManager.updateStandings(m.home, m.away, s1, s2);
            }
        });
    },

    updateStandings: (homeId, awayId, s1, s2) => {
        const up = (id, f, a) => {
            if (!ArcadeManager.standings[id]) return;
            const s = ArcadeManager.standings[id];
            s.j++; s.gp += f; s.gc += a; s.sg = s.gp - s.gc;
            if (f > a) { s.v++; s.p += 3; }
            else if (f == a) { s.e++; s.p += 1; }
            else s.d++;
        };
        up(homeId, s1, s2);
        up(awayId, s2, s1);
    },

    getGroupStandings: (groupName) => {
        const groupTeams = ArcadeManager.groups ? ArcadeManager.groups[groupName] : null;
        if (!groupTeams) return [];
        return groupTeams.map(tid => {
            const teamData = ArcadeManager.leagueTeams.find(t => t.id === tid);
            return { ...(teamData || {}), ...ArcadeManager.standings[tid], id: tid };
        }).sort((a, b) => b.p - a.p || b.v - a.v || b.sg - a.sg);
    },

    getLeaderboard: () => {
        return Object.entries(ArcadeManager.standings).map(([id, stats]) => {
            const team = ArcadeManager.leagueTeams.find(t => t.id === id);
            return { ...team, ...stats };
        }).sort((a, b) => {
            if (b.p !== a.p) return b.p - a.p;
            if (b.v !== a.v) return b.v - a.v;
            return b.sg - a.sg;
        });
    },

    checkPhaseTransition: () => {
        if (ArcadeManager.currentRound < ArcadeManager.schedule.length) return;

        if (ArcadeManager.currentLeague === 'paulista') {
            ArcadeManager.transitionToPaulistaKnockout();
        } else if (ArcadeManager.currentLeague === 'carioca') {
            ArcadeManager.transitionToCariocaKnockout();
        } else {
            // Brasileirão - just check winner
            const champion = ArcadeManager.getLeaderboard()[0];
            showChampionScreen(champion);
        }
    },

    transitionToPaulistaKnockout: () => {
        const qfMatches = [];
        ['A', 'B', 'C', 'D'].forEach(g => {
            const table = ArcadeManager.getGroupStandings(g);
            qfMatches.push({
                home: table[0].id, away: table[1].id,
                stage: 'quarters', completed: false, totalLegs: 1
            });
        });
        ArcadeManager.knockoutBracket = qfMatches;
        ArcadeManager.currentStage = 'quarters';

        const userQualified = qfMatches.some(m => m.home === ArcadeManager.userTeamId || m.away === ArcadeManager.userTeamId);
        if (userQualified) {
            window.showCustomModal("QUARTAS DE FINAL", "Fase de Grupos encerrada!<br>Iniciando Quartas de Final.", null, null, false);
        } else {
            window.showCustomModal("FIM DE JOGO", "Fim da linha! Seu time foi eliminado na Fase de Grupos.<br>O campeonato continuar sem você.", null, null, false);
        }
    },

    transitionToCariocaKnockout: () => {
        const table = ArcadeManager.getLeaderboard();
        const semiMatches = [
            { home: table[0].id, away: table[3].id, stage: 'semis', totalLegs: 2, currentLeg: 1, aggHome: 0, aggAway: 0, completed: false },
            { home: table[1].id, away: table[2].id, stage: 'semis', totalLegs: 2, currentLeg: 1, aggHome: 0, aggAway: 0, completed: false }
        ];
        ArcadeManager.knockoutBracket = semiMatches;
        ArcadeManager.currentStage = 'semis';

        const userQualified = semiMatches.some(m => m.home === ArcadeManager.userTeamId || m.away === ArcadeManager.userTeamId);
        if (userQualified) {
            window.showCustomModal("SEMIFINAIS", "Taça Guanabara encerrada!<br>Iniciando Semifinais.", null, null, false);
        } else {
            window.showCustomModal("FIM DE JOGO", "Fim da linha! Seu time não se classificou para as Semifinais.<br>O campeonato continuar sem você.", null, null, false);
        }
    },

    processKnockoutMatch: (homeId, awayId, sHome, sAway) => {
        const match = ArcadeManager.knockoutBracket.find(m => m.home === homeId && m.away === awayId && !m.completed);
        if (!match) return;
        match.homeScore = sHome; match.awayScore = sAway; match.completed = true;
        if (match.totalLegs > 1) { match.aggHome = (match.aggHome || 0) + sHome; match.aggAway = (match.aggAway || 0) + sAway; }
    },

    simulateKnockoutRound: () => {
        ArcadeManager.knockoutBracket.forEach(m => {
            if (!m.completed && m.home !== ArcadeManager.userTeamId && m.away !== ArcadeManager.userTeamId) {
                const s1 = Math.floor(Math.random() * 3);
                const s2 = Math.floor(Math.random() * 3);
                m.homeScore = s1; m.awayScore = s2; m.completed = true;
                if (m.totalLegs > 1) { m.aggHome = (m.aggHome || 0) + s1; m.aggAway = (m.aggAway || 0) + s2; }
            }
        });
    },

    checkKnockoutTransition: () => {
        if (ArcadeManager.knockoutBracket.some(m => !m.completed)) return;
        if (ArcadeManager.currentLeague === 'paulista') ArcadeManager.advancePaulista();
        else if (ArcadeManager.currentLeague === 'carioca') ArcadeManager.advanceCarioca();
    },

    advancePaulista: () => {
        const getWinner = (m) => (m.homeScore > m.awayScore ? m.home : (m.awayScore > m.homeScore ? m.away : (Math.random() > 0.5 ? m.home : m.away)));

        if (ArcadeManager.currentStage === 'quarters') {
            const winners = ArcadeManager.knockoutBracket.map(getWinner);
            ArcadeManager.knockoutBracket = [
                { home: winners[0], away: winners[1], stage: 'semis', completed: false, totalLegs: 1 },
                { home: winners[2], away: winners[3], stage: 'semis', completed: false, totalLegs: 1 }
            ];
            ArcadeManager.currentStage = 'semis';

            if (winners.includes(ArcadeManager.userTeamId)) {
                window.showCustomModal("CLASSIFICADO!", "Parabéns! Você avançou para as Semifinais!", null, null, false);
            } else if (ArcadeManager.knockoutBracket.some(m => m.home === ArcadeManager.userTeamId || m.away === ArcadeManager.userTeamId)) {
                // Should be covered by winners includes check, but safety first
                window.showCustomModal("CLASSIFICADO!", "Parabéns! Você avançou para as Semifinais!", null, null, false);
            } else {
                // Check if user WAS in quarters to show specific elimination msg
                window.showCustomModal("ELIMINADO", "Infelizmente seu time caiu nas Quartas de Final.", null, null, false);
            }
        } else if (ArcadeManager.currentStage === 'semis') {
            const winners = ArcadeManager.knockoutBracket.map(getWinner);
            ArcadeManager.knockoutBracket = [
                { home: winners[0], away: winners[1], stage: 'final', completed: false, totalLegs: 2, currentLeg: 1, aggHome: 0, aggAway: 0 }
            ];
            ArcadeManager.currentStage = 'final';
            window.showCustomModal("A GRANDE FINAL", "Está tudo definido!<br>Prepare-se para a Grande Final!", null, null, false);
        } else if (ArcadeManager.currentStage === 'final') {
            const match = ArcadeManager.knockoutBracket[0];
            if (match.currentLeg === 1) {
                match.currentLeg = 2; match.completed = false;
                const temp = match.home; match.home = match.away; match.away = temp;
                const tempAgg = match.aggHome; match.aggHome = match.aggAway; match.aggAway = tempAgg; // Swap agg for display context
                window.showCustomModal("JOGO DE VOLTA", "Fim do primeiro jogo da final!<br>Preparando jogo de volta.", null, null, false);
            } else {
                let championId = match.aggHome > match.aggAway ? match.home : match.away;
                if (match.aggHome == match.aggAway) championId = match.home;
                showChampionScreen(ArcadeManager.leagueTeams.find(t => t.id === championId));
            }
        }
    },

    advanceCarioca: () => {
        if (ArcadeManager.currentStage === 'semis') {
            const pending = ArcadeManager.knockoutBracket.find(m => m.currentLeg < 2);
            if (pending) {
                ArcadeManager.knockoutBracket.forEach(m => {
                    m.currentLeg = 2; m.completed = false;
                    const temp = m.home; m.home = m.away; m.away = temp;
                    const tempAgg = m.aggHome; m.aggHome = m.aggAway; m.aggAway = tempAgg;
                });
                window.showCustomModal("SEMIFINAIS", "Fim dos jogos de ida.<br>Rodada de volta das semifinais!", null, null, false);
                return;
            }
            const winners = ArcadeManager.knockoutBracket.map(m => (m.aggHome >= m.aggAway ? m.home : m.away));
            ArcadeManager.knockoutBracket = [
                { home: winners[0], away: winners[1], stage: 'final', totalLegs: 2, currentLeg: 1, aggHome: 0, aggAway: 0, completed: false }
            ];
            ArcadeManager.currentStage = 'final';
            window.showCustomModal("FINAL DEFINIDA", "Os finalistas do Cariocão estão definidos!", null, null, false);
        } else if (ArcadeManager.currentStage === 'final') {
            const match = ArcadeManager.knockoutBracket[0];
            if (match.currentLeg === 1) {
                match.currentLeg = 2; match.completed = false;
                const temp = match.home; match.home = match.away; match.away = temp;
                const tempAgg = match.aggHome; match.aggHome = match.aggAway; match.aggAway = tempAgg;
                window.showCustomModal("DECISÃO", "Fim do jogo de ida.<br>A decisão será no próximo jogo!", null, null, false);
            } else {
                let championId = match.aggHome > match.aggAway ? match.home : match.away;
                if (match.aggHome == match.aggAway) championId = match.home;
                showChampionScreen(ArcadeManager.leagueTeams.find(t => t.id === championId));
            }
        }
    },

    checkChampion: () => null // Deprecated/handled internally
};


// Game constants moved to top

let matchState = {
    minute: 0,
    advantageA: 1,
    advantageB: 1,
    blockGoals: false,
    events: []
};


// ==================== SISTEMA DE VELOCIDADE ====================
// Multiplicadores de velocidade (afetam apenas timing, não física)
// Speed settings moved to top
let currentSpeed = 'normal';
let MATCH_DURATION_MS = SPEED_SETTINGS.normal.matchDuration;



// ==================== TUTORIAL SYSTEM (REFAZENDO) ====================
// ==================== EVENTOS DE PARTIDA ====================
const MatchEventManager = {
    EVENT_LOG_EL: document.getElementById('event-log'),
    EVENT_COOLDOWN_MS: 5000,
    lastEventTime: 0,

    EVENTS: [
        { type: 'card', weight: 0.15, text: (team) => ` Cartão Amarelo para ${team.shortName}!`, effect: (team) => { team.overall -= 2; } },
        { type: 'card', weight: 0.05, text: (team) => ` Cartão Vermelho para ${team.shortName}!`, effect: (team) => { team.overall -= 5; } },
        { type: 'injury', weight: 0.1, text: (team) => ` Lesão! ${team.shortName} joga com desvantagem.`, effect: (team) => { team.overall -= 3; } },
        { type: 'save', weight: 0.2, text: (team) => ` Defesa Milagrosa de ${team.shortName}!`, effect: (team) => { team.overall += 1; } },
        { type: 'var', weight: 0.05, text: (team) => ` GOL ANULADO! VAR confirma impedimento contra ${team.shortName}.`, effect: (team) => { } },
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

            const homeTeam = ArcadeManager.leagueTeams.find(t => t.id === userMatch.home);
            const awayTeam = ArcadeManager.leagueTeams.find(t => t.id === userMatch.away);

            if (!homeTeam || !awayTeam) {
                console.error("Teams not found for simulation", userMatch);
                resolve(null);
                return;
            }

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
        AutoSimulator.showOverlay('Simulando resultados...');

        // Simular partida do usuário (se houver)
        await new Promise(r => setTimeout(r, 800)); // Delay para UX

        const userMatch = ArcadeManager.getNextUserMatch();
        let result = null;

        if (userMatch) {
            result = await AutoSimulator.simulateUserMatch();
        }

        if (result) {
            AutoSimulator.showOverlay(`${result.home.shortName} ${result.homeGoals} x ${result.awayGoals} ${result.away.shortName}`);
            await new Promise(r => setTimeout(r, 1000));
            // Registrar resultado do usuário e dos bots
            ArcadeManager.registerUserResult(result.home.id, result.away.id, result.homeGoals, result.awayGoals);
        } else {
            // Usuário não joga (eliminado ou folga), simular apenas os bots
            AutoSimulator.showOverlay('Simulando jogos restantes...');
            await new Promise(r => setTimeout(r, 800));

            if (ArcadeManager.currentStage === 'regular') {
                ArcadeManager.simulateRound();
                ArcadeManager.currentRound++;
                ArcadeManager.checkPhaseTransition();
            } else {
                ArcadeManager.simulateKnockoutRound();
                ArcadeManager.checkKnockoutTransition();
            }
            StorageManager.saveArcadeProgress();
        }

        AutoSimulator.showOverlay('Atualizando tabela...');
        await new Promise(r => setTimeout(r, 600));

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
        const userTeam = allTeamsList.find(t => t.id === savedData.userTeamId);

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

    const userTeam = allTeamsList.find(t => t.id === ArcadeManager.userTeamId);

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
        const modal = document.getElementById('game-custom-modal');
        const titleEl = document.getElementById('custom-modal-title');
        const msgEl = document.getElementById('custom-modal-message');
        const btnConfirm = document.getElementById('btn-modal-confirm');
        const btnCancel = document.getElementById('btn-modal-cancel');

        if (modal && titleEl && msgEl && btnConfirm && btnCancel) {
            titleEl.textContent = 'Apagar Progresso?';
            msgEl.textContent = 'Deseja apagar o progresso salvo? Esta ação não pode ser desfeita.';

            // Show modal
            modal.classList.remove('hidden');

            // Cleanup old listeners to avoid stacking (simple clone method or refined handler)
            const newBtnConfirm = btnConfirm.cloneNode(true);
            const newBtnCancel = btnCancel.cloneNode(true);
            btnConfirm.parentNode.replaceChild(newBtnConfirm, btnConfirm);
            btnCancel.parentNode.replaceChild(newBtnCancel, btnCancel);

            newBtnConfirm.addEventListener('click', () => {
                StorageManager.clearArcadeProgress();
                checkSavedArcadeProgress();
                modal.classList.add('hidden');
            });

            newBtnCancel.addEventListener('click', () => {
                modal.classList.add('hidden');
            });
        } else {
            // Fallback
            if (confirm('Deseja apagar o progresso salvo? Esta ação não pode ser desfeita.')) {
                StorageManager.clearArcadeProgress();
                checkSavedArcadeProgress();
            }
        }
    });
}

// ==================== QUICK MATCH LOGIC ====================
let selectionPhase = 0; // 0: None, 1: Region Home, 2: Team Home, 3: Region Away, 4: Team Away

btnModeQuick.addEventListener('click', () => {
    currentGameMode = 'quick';
    startQuickMatchFlow();
});

function startQuickMatchFlow() {
    // Reset state
    selectedTeams = [];
    selectionPhase = 1;

    // UI Reset
    mainMenu.classList.add('hidden');
    selectionScreen.classList.add('hidden');

    // Show Region Selection for HOME team
    showRegionSelection('MANDANTE');
}

function showRegionSelection(type) {
    const regionScreen = document.getElementById('region-selection-screen');
    const regionTitle = document.getElementById('region-selection-title');
    const btnBackRegion = document.getElementById('btn-back-menu-region');

    if (regionScreen) {
        regionScreen.classList.remove('hidden');
        if (regionTitle) regionTitle.innerHTML = `REGIÃO DO <span>${type}</span>`;

        // Setup Back Button for Region Screen
        if (btnBackRegion) {
            btnBackRegion.onclick = () => {
                if (selectionPhase === 3) {
                    // If canceling Away Region selection, maybe restart or go back? 
                    // For simplicity, back to main menu or restart flow.
                    // Let's go back to Main Menu for consistent "Exit" behavior
                    regionScreen.classList.add('hidden');
                    mainMenu.classList.remove('hidden');
                } else {
                    regionScreen.classList.add('hidden');
                    mainMenu.classList.remove('hidden');
                }
            };
        }
    }
}

// Add listeners to region buttons
document.querySelectorAll('.region-button').forEach(btn => {
    btn.addEventListener('click', () => {
        const regionKey = btn.dataset.region;
        const teams = getTeamsListByKey(regionKey);

        if (selectionPhase === 1) {
            // Selected Home Region -> Go to Team Selection
            selectionPhase = 2;
            populateTeamSelection(teams, "MANDANTE");
        } else if (selectionPhase === 3) {
            // Selected Away Region -> Go to Team Selection
            selectionPhase = 4;
            populateTeamSelection(teams, "VISITANTE");
        }
    });
});

function getTeamsListByKey(key) {
    switch (key) {
        case 'brazilianTeams': return brazilianTeams;
        case 'paulistaTeams': return paulistaTeams;
        case 'cariocaTeams': return cariocaTeams;
        case 'gauchoTeams': return gauchoTeams;
        case 'mineiroTeams': return mineiroTeams;
        case 'paranaenseTeams': return paranaenseTeams;
        case 'allTeamsList': return allTeamsList;
        default: return brazilianTeams;
    }
}




// ==================== WORLD CUP LOGIC ====================
const btnModeWorldCup = document.getElementById('btn-mode-worldcup');
if (btnModeWorldCup) {
    btnModeWorldCup.addEventListener('click', () => {
        currentGameMode = 'worldcup';

        selectionTitle.innerHTML = "ESCOLHA <span>SUA SELEÇÃO</span>";
        selectionSubtitle.innerText = "Para conquistar o mundo!";
        vsSeparator.classList.add('hidden');
        slot2.classList.add('hidden');
        btnStart.innerText = "INICIAR COPA";

        smoothTransition(mainMenu, selectionScreen, initTeamSelection);
    });
}

const btnQuitWorldCup = document.getElementById('btn-quit-wc');
if (btnQuitWorldCup) {
    btnQuitWorldCup.addEventListener('click', () => {
        if (confirm("Sair da Copa? Seu progresso será salvo.")) {
            // WorldCupManager.saveProgress(); // TODO
            smoothTransition(document.getElementById('worldcup-dashboard'), mainMenu, () => {
                sfx.stopCrowd();
            });
        }
    });
}


btnBackMenu.addEventListener('click', () => {
    // Logic to go back one step if possible
    if (currentGameMode === 'quick') {
        if (selectionPhase === 2) {
            // Back from Home Team Select -> Home Region Select
            selectionPhase = 1;
            selectionScreen.classList.add('hidden');
            showRegionSelection('MANDANTE');
            return;
        } else if (selectionPhase === 4) {
            // Back from Away Team Select -> Away Region Select
            selectionPhase = 3;
            selectionScreen.classList.add('hidden');
            showRegionSelection('VISITANTE');
            return;
        }
    }

    selectedTeams = [];
    smoothTransition(selectionScreen, mainMenu, checkSavedArcadeProgress);
});

btnQuitArcade.addEventListener('click', () => {
    window.showCustomModal(
        "SAIR DO CAMPEONATO?",
        "Seu progresso será salvo automaticamente.<br>Deseja voltar ao menu?",
        () => {
            StorageManager.saveArcadeProgress();
            smoothTransition(arcadeDashboard, mainMenu, () => {
                sfx.stopCrowd();
                checkSavedArcadeProgress();
            });
        }
    );
});

btnFinishArcade.addEventListener('click', () => {
    smoothTransition(championScreen, mainMenu, checkSavedArcadeProgress);
});

// ==================== HELPERS ====================
window.showCustomModal = (title, message, onConfirm, onCancel, showCancel = true) => {
    const modal = document.getElementById('game-custom-modal');
    const titleEl = document.getElementById('custom-modal-title');
    const msgEl = document.getElementById('custom-modal-message');
    const btnConfirm = document.getElementById('btn-modal-confirm');
    const btnCancel = document.getElementById('btn-modal-cancel');

    if (!modal) return;

    titleEl.textContent = title;
    msgEl.innerHTML = message;

    // Reset buttons
    const newConfirm = btnConfirm.cloneNode(true);
    const newCancel = btnCancel.cloneNode(true);
    btnConfirm.parentNode.replaceChild(newConfirm, btnConfirm);
    btnCancel.parentNode.replaceChild(newCancel, btnCancel);

    newConfirm.onclick = () => {
        if (onConfirm) onConfirm();
        modal.classList.add('hidden');
    };

    if (showCancel) {
        newCancel.style.display = 'inline-block';
        newCancel.onclick = () => {
            if (onCancel) onCancel();
            modal.classList.add('hidden');
        };
    } else {
        newCancel.style.display = 'none';
        newConfirm.style.width = '100%';
        newConfirm.innerText = "OK";
    }

    modal.classList.remove('hidden');
};

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
    teamsGrid.innerHTML = '';
    // selectedTeams = []; // Don't clear here, we manage it in the flow


    sfx.loadTrack();
    sfx.playMusic();

    updateSlots();
    updateStartButton();

    // Select which list to show
    let teamsToDisplay = brazilianTeams;
    if (currentGameMode === 'worldcup') {
        teamsToDisplay = internationalTeams;
    }

    teamsToDisplay.forEach(team => {
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
        card.addEventListener('click', () => {
            if (currentGameMode === 'worldcup') {
                selectTeam(team, card);
            } else {
                selectTeamQuick(team, card);
            }
        });
        teamsGrid.appendChild(card);
    });
    updateCardStatesQuick();
}

function populateTeamSelection(list, titleType) {
    const regionScreen = document.getElementById('region-selection-screen');
    if (regionScreen) regionScreen.classList.add('hidden');

    selectionScreen.classList.remove('hidden');

    // UI Update
    selectionTitle.innerHTML = `SELECIONE O <span>${titleType}</span>`;
    selectionSubtitle.innerText = "Escolha o time";

    // Setup Slots (show mostly static)
    updateSlots();

    // Populate Grid
    teamsGrid.innerHTML = '';
    list.forEach(team => {
        const card = document.createElement('div');
        card.className = 'team-card';
        card.dataset.teamId = team.id;

        // Highlight if already picked (e.g. as opponent - just in case)
        if (selectedTeams.find(t => t && t.id === team.id)) card.classList.add('selected');

        const shield = createShield(team, 'md');
        const name = document.createElement('span');
        name.className = 'team-card-name';
        name.textContent = team.name;

        card.appendChild(shield);
        card.appendChild(name);
        card.addEventListener('click', () => selectTeamQuick(team, card));
        teamsGrid.appendChild(card);
    });
}

function selectTeamQuick(team, card) {
    sfx.init();

    if (selectionPhase === 2) {
        // Picking Home Team
        selectedTeams[0] = team;
        updateSlots();

        // Move to Next Step: Region for Away
        selectionPhase = 3;

        // Transition back to Region Selection
        setTimeout(() => {
            selectionScreen.classList.add('hidden');
            showRegionSelection('VISITANTE');
        }, 300); // Small delay for visual feedback

    } else if (selectionPhase === 4) {
        // Picking Away Team
        if (selectedTeams[0] && selectedTeams[0].id === team.id) {
            // Prevent picking same team? distinct teams requested usually.
            // But let's allow it for "training" or just warn. 
            // The prompt said "removed duplicate teams", usually implying unique lists, but maybe matches should be unique too.
            // Let's allow it but maybe visual feedback?
            // Actually standard FIFA style allows same teams.
        }

        selectedTeams[1] = team;
        updateSlots();
        updateStartButton();

        // Visual select
        document.querySelectorAll('.team-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');

        // Enable start?
    }
}

function updateCardStatesQuick() {
    // Optional: Highlight if already selected (for away team selection)
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
    } else if (maxSelection === 1) {
        // Swap selection (Better UX for single choice)
        const oldTeam = selectedTeams[0];
        const oldCard = card.parentNode.querySelector(`.team-card[data-team-id="${oldTeam.id}"]`);
        if (oldCard) oldCard.classList.remove('selected');

        selectedTeams = [team];
        card.classList.add('selected');
    }

    updateSlots();
    updateStartButton();
    updateCardStates();
}

function updateSlots() {
    if (currentGameMode === 'quick') {
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

// ==================== ARCADE & WORLD CUP LOGIC ====================
btnStart.addEventListener('click', () => {
    try {
        console.log('Start Button Clicked. Mode:', currentGameMode);
        if (currentGameMode === 'quick') {
            if (!selectedTeams || selectedTeams.length < 2) {
                console.error("Selected teams invalid");
                return;
            }
            team1 = selectedTeams[0];
            team2 = selectedTeams[1];
            console.log("Starting match with:", team1.name, team2.name);
            startMatch();
        } else if (currentGameMode === 'worldcup') {
            startWorldCupCampaign();
        } else {
            startArcadeCampaign();
        }
    } catch (error) {
        console.error("Game Start Error:", error);
        alert("Erro ao iniciar jogo: " + error.message);
    }
});

function startWorldCupCampaign() {
    const wcDashboard = document.getElementById('worldcup-dashboard');
    selectionScreen.classList.add('hidden');
    wcDashboard.classList.remove('hidden');

    const userTeam = selectedTeams[0];
    WorldCupManager.startNewCampaign(userTeam.id);

    document.getElementById('wc-user-team').textContent = userTeam.name;
    // updateArcadeHeaderBg(userTeam); // Optional: reuse if compatible or create new

    // Tab Logic
    setupWorldCupTabs();
    updateWorldCupDashboard(WorldCupManager.bracket.groups[0].name); // Show Group A initially
}

function setupWorldCupTabs() {
    const tabs = document.querySelectorAll('.wc-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            document.querySelectorAll('.wc-tab').forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            updateWorldCupDashboard(e.target.dataset.group);
        });
    });
}

function updateWorldCupDashboard(groupName) {
    const group = WorldCupManager.bracket.groups.find(g => g.name === groupName);
    if (!group) return;

    document.getElementById('wc-group-title').textContent = `Grupo ${groupName}`;
    const tbody = document.getElementById('wc-group-list');
    tbody.innerHTML = '';

    // Sort: Points > SG > GP
    const sortedTeams = [...group.teams].sort((a, b) => {
        if (b.p !== a.p) return b.p - a.p;
        if (b.sg !== a.sg) return b.sg - a.sg;
        return b.gp - a.gp;
    });

    sortedTeams.forEach((t, index) => {
        const teamData = internationalTeams.find(it => it.id === t.id);
        const row = document.createElement('tr');
        if (t.id === WorldCupManager.userTeamId) row.classList.add('user-row');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <span class="stats-shield-wrapper">${createShield(teamData, 'sm').outerHTML}</span>
                    <span>${teamData.shortName}</span>
                </div>
            </td>
            <td><strong>${t.p}</strong></td>
            <td>${t.j}</td>
            <td>${t.sg}</td>
        `;
        tbody.appendChild(row);
    });

    // Next Match Logic
    // Find next match for USER
    // For now, simple mock or logic:
    // ...
}

function startArcadeCampaign() {
    selectionScreen.classList.add('hidden');
    arcadeDashboard.classList.remove('hidden');

    const userTeam = selectedTeams[0];
    const leagueToStart = document.getElementById('btn-start').dataset.league || window.selectedLeague || 'Brasileirão';
    ArcadeManager.init(userTeam.id, leagueToStart);

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
    // Stage Display
    let stageName = "Fase de Grupos";
    if (ArcadeManager.currentStage === 'quarters') stageName = "Quartas de Final";
    else if (ArcadeManager.currentStage === 'semis') stageName = "Semifinais";
    else if (ArcadeManager.currentStage === 'final') stageName = "Grande Final";
    else if (ArcadeManager.currentLeague === 'carioca' && ArcadeManager.currentStage === 'regular') stageName = "Taça Guanabara";
    else if (ArcadeManager.currentLeague === 'Gauchão' && ArcadeManager.currentStage === 'regular') stageName = "Fase Classificatória";
    else if (ArcadeManager.currentLeague === 'mineiro' && ArcadeManager.currentStage === 'regular') stageName = "Fase de Grupos";
    else if (ArcadeManager.currentLeague === 'paranaense' && ArcadeManager.currentStage === 'regular') stageName = "Fase Classificatória";
    else if (ArcadeManager.currentLeague === 'Brasileirão') stageName = "Pontos Corridos";

    currentRoundNum.textContent = stageName + (ArcadeManager.currentStage === 'regular' ? ` - Rodada ${ArcadeManager.currentRound + 1}/${ArcadeManager.schedule.length}` : '');

    // Coins & Overall
    ArcadeManager.updateCoinsUI();

    // Content
    arcadeStandingsList.innerHTML = '';

    if (ArcadeManager.currentStage === 'regular') {
        const tabs = document.getElementById('group-tabs');
        if (tabs && !ArcadeManager.groups) tabs.style.display = 'none'; // Hide tabs if not paulista

        if (ArcadeManager.groups) {
            renderGroupStandings();
        } else {
            renderSimpleStandings();
        }
    } else {
        const tabs = document.getElementById('group-tabs');
        if (tabs) tabs.style.display = 'none';
        renderKnockoutView();
    }

    // Next Match
    updateNextMatchCard();

    // Upgrade Button
    const btnUpgrade = document.getElementById('btn-upgrade-team');
    if (btnUpgrade) {
        const cost = 100 + ((ArcadeManager.overallBoosts[ArcadeManager.userTeamId] || 0) * 50);
        btnUpgrade.disabled = ArcadeManager.coins < cost || ArcadeManager.getTeamOverall(ArcadeManager.userTeamId) >= 99;
    }
}

function renderSimpleStandings() {
    const leaderboard = ArcadeManager.getLeaderboard();
    if (ArcadeManager.currentLeague === 'carioca') {
        leaderboard.forEach((t, index) => {
            const row = createStandingRow(t, index + 1);
            if (index < 4) row.style.borderLeft = "4px solid #00ff00"; // G4
            else if (index === 11) row.style.borderLeft = "4px solid #ff0000"; // Relegation
            else if (index === 10) row.style.borderLeft = "4px solid orange"; // Playoff
            arcadeStandingsList.appendChild(row);
        });
    } else if (ArcadeManager.currentLeague === 'Brasileirão') {
        leaderboard.forEach((t, index) => {
            const row = createStandingRow(t, index + 1);
            if (index < 4) row.style.borderLeft = "4px solid #00ff00";
            else if (index < 6) row.style.borderLeft = "4px solid #00ffff";
            else if (index >= 16) row.style.borderLeft = "4px solid #ff0000";
            arcadeStandingsList.appendChild(row);
        });
    } else if (ArcadeManager.currentLeague === 'Gauchão') {
        leaderboard.forEach((t, index) => {
            const row = createStandingRow(t, index + 1);
            if (index < 8) row.style.borderLeft = "4px solid #00ff00"; // Quarterfinals
            else if (index >= 10) row.style.borderLeft = "4px solid #ff0000"; // Relegation (11th and 12th)
            arcadeStandingsList.appendChild(row);
        });
    } else if (ArcadeManager.currentLeague === 'paranaense') {
        leaderboard.forEach((t, index) => {
            const row = createStandingRow(t, index + 1);
            if (index < 8) row.style.borderLeft = "4px solid #00ff00"; // G8 match Gauchão style
            else if (index >= 10) row.style.borderLeft = "4px solid #ff0000"; // Relegation
            arcadeStandingsList.appendChild(row);
        });
    } else {
        leaderboard.forEach((t, index) => arcadeStandingsList.appendChild(createStandingRow(t, index + 1)));
    }
}

function renderGroupStandings() {
    let tabsContainer = document.getElementById('group-tabs');
    if (!tabsContainer) {
        tabsContainer = document.createElement('div');
        tabsContainer.id = 'group-tabs';
        tabsContainer.style.display = 'flex';
        tabsContainer.style.marginBottom = '15px';
        tabsContainer.style.gap = '10px';
        arcadeStandingsList.parentNode.insertBefore(tabsContainer, arcadeStandingsList);

        const groups = (ArcadeManager.currentLeague === 'mineiro' || ArcadeManager.currentLeague === 'Gauchão') ? ['A', 'B', 'C'] : ['A', 'B', 'C', 'D'];
        groups.forEach(g => {
            const btn = document.createElement('button');
            btn.textContent = `Grupo ${g}`;
            btn.className = 'btn-tab';
            btn.style.flex = '1';
            btn.style.padding = '8px';
            btn.style.background = '#222';
            btn.style.border = '1px solid #444';
            btn.style.color = '#fff';
            btn.style.cursor = 'pointer';
            btn.style.borderRadius = '4px';
            btn.onclick = () => showGroupTable(g);
            tabsContainer.appendChild(btn);
        });

        // Add General Table Tab for Mineiro
        if (ArcadeManager.currentLeague === 'mineiro' || ArcadeManager.currentLeague === 'Gauchão') {
            const btn = document.createElement('button');
            btn.textContent = `Geral`;
            btn.className = 'btn-tab';
            btn.style.flex = '1';
            // ... styles (reuse class if possible, but inline for now to match above pattern)
            btn.style.padding = '8px';
            btn.style.background = '#222';
            btn.style.border = '1px solid #444';
            btn.style.color = '#fff';
            btn.style.borderRadius = '4px';
            btn.onclick = () => {
                window.currentGroupView = 'Geral';
                showGroupTable('Geral');
            };
            tabsContainer.appendChild(btn);
        }
    } else {
        tabsContainer.style.display = 'flex';
    }

    if (!window.currentGroupView) {
        // Default to user's group
        let userGroup = 'A';
        if (ArcadeManager.groups) {
            userGroup = Object.keys(ArcadeManager.groups).find(k => ArcadeManager.groups[k].includes(ArcadeManager.userTeamId)) || 'A';
        }
        window.currentGroupView = userGroup;
    }
    showGroupTable(window.currentGroupView);
}

window.showGroupTable = (group) => {
    window.currentGroupView = group;
    const tabs = document.querySelectorAll('#group-tabs button');
    tabs.forEach(t => {
        const active = t.textContent.trim() === `Grupo ${group}` || (group === 'Geral' && t.textContent.trim() === 'Geral');
        t.style.background = active ? 'var(--accent-gold)' : '#222';
        t.style.color = active ? '#000' : '#fff';
        t.style.borderColor = active ? 'var(--accent-gold)' : '#444';
    });

    arcadeStandingsList.innerHTML = '';

    if (group === 'Geral') {
        // Mineiro General Table
        const leaderboard = ArcadeManager.getLeaderboard();
        leaderboard.forEach((t, index) => {
            const row = createStandingRow(t, index + 1);
            // Highlight Leaders (Hard to know who is leader here without context, but we can highlight logic)
            // Or just show pure table. Relegation bottom 2.
            if (index >= 10) row.style.borderLeft = "4px solid #ff0000";
            arcadeStandingsList.appendChild(row);
        });
    } else {
        const table = ArcadeManager.getGroupStandings(group);
        table.forEach((t, index) => {
            const row = createStandingRow(t, index + 1);

            if (ArcadeManager.currentLeague === 'paulista') {
                if (index < 2) row.style.borderLeft = "4px solid #00ff00";
                // General Relegation Check
                if (ArcadeManager.getLeaderboard().slice(-2).find(x => x.id === t.id)) row.style.borderLeft = "4px solid #ff0000";
            } else if (ArcadeManager.currentLeague === 'mineiro') {
                if (index === 0) row.style.borderLeft = "4px solid #00ff00"; // Leader advances
                // General Relegation Check
                if (ArcadeManager.getLeaderboard().slice(-2).find(x => x.id === t.id)) row.style.borderLeft = "4px solid #ff0000";
            }

            arcadeStandingsList.appendChild(row);
        });
    }
}

function createStandingRow(t, rank) {
    const row = document.createElement('tr');
    if (t.id === ArcadeManager.userTeamId) row.classList.add('user-row');
    row.innerHTML = `
        <td>${rank}</td>
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
    return row;
}

function renderKnockoutView() {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '10px';

    // Sort matches
    const matches = ArcadeManager.knockoutBracket;

    matches.forEach(match => {
        const home = ArcadeManager.leagueTeams.find(t => t.id === match.home);
        const away = ArcadeManager.leagueTeams.find(t => t.id === match.away);

        const card = document.createElement('div');
        card.style.background = '#222';
        card.style.padding = '15px';
        card.style.borderRadius = '8px';
        card.style.border = match.completed ? '1px solid #444' : '1px solid var(--accent-gold)';
        if (!match.completed && (match.home === ArcadeManager.userTeamId || match.away === ArcadeManager.userTeamId)) {
            card.style.boxShadow = '0 0 10px var(--accent-gold)';
        }

        let scoreDisplay = match.completed ? `${match.homeScore} x ${match.awayScore}` : 'VS';
        if (match.totalLegs > 1 && match.completed) {
            scoreDisplay += ` <div style="font-size:0.8rem; margin-top:4px;">(Agg: ${match.aggHome}-${match.aggAway})</div>`;
        }

        card.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <div style="flex:1; text-align:right; display:flex; align-items:center; justify-content:flex-end; gap:10px;">
                    ${home.shortName} ${createShield(home, 'sm').outerHTML}
                </div>
                <div style="margin:0 15px; font-weight:bold; font-size:1.5rem; text-align:center;">${scoreDisplay}</div>
                <div style="flex:1; text-align:left; display:flex; align-items:center; justify-content:flex-start; gap:10px;">
                    ${createShield(away, 'sm').outerHTML} ${away.shortName}
                </div>
            </div>
            ${match.totalLegs ? `<div style="font-size:0.8rem; color:#888; text-align:center; mt-2">Jogo ${match.currentLeg}/${match.totalLegs}</div>` : ''}
        `;
        container.appendChild(card);
    });

    // Add instruction text
    const info = document.createElement('div');
    info.innerHTML = "<p style='text-align:center; color:#888; margin-top:10px;'>Clique em JOGAR para disputar sua partida.</p>";
    container.appendChild(info);

    arcadeStandingsList.appendChild(container);
}

function updateNextMatchCard() {
    let nextMatch = ArcadeManager.getNextUserMatch();
    let isSpectator = false;

    // If user is eliminated (no match found), try to find a match to watch (Spectator Mode)
    if (!nextMatch) {
        if (ArcadeManager.currentStage === 'regular') {
            if (ArcadeManager.schedule[ArcadeManager.currentRound]) {
                nextMatch = ArcadeManager.schedule[ArcadeManager.currentRound][0];
                if (nextMatch && (nextMatch.home === ArcadeManager.userTeamId || nextMatch.away === ArcadeManager.userTeamId)) isSpectator = false; // Just double checking
                else isSpectator = true;
            }
        } else {
            nextMatch = ArcadeManager.knockoutBracket.find(m => !m.completed);
            isSpectator = true;
        }
    }

    if (nextMatch) {
        let t1, t2;
        let title = "PRÓXIMA PARTIDA";

        if (ArcadeManager.currentStage !== 'regular') {
            title = "MATA-MATA";
            if (nextMatch.totalLegs) title += ` - JOGO ${nextMatch.currentLeg}`;
        }

        if (isSpectator) title = "MODO ESPECTADOR - " + title;

        t1 = ArcadeManager.leagueTeams.find(t => t.id === nextMatch.home);
        t2 = ArcadeManager.leagueTeams.find(t => t.id === nextMatch.away);

        arcadeHomeShield.innerHTML = '';
        arcadeHomeShield.appendChild(createShield(t1, 'lg'));
        document.getElementById('arcade-home-name').textContent = t1.name;
        document.getElementById('arcade-home-overall').textContent = `OVR: ${ArcadeManager.getTeamOverall(t1.id)}`;

        arcadeAwayShield.innerHTML = '';
        arcadeAwayShield.appendChild(createShield(t2, 'lg'));
        document.getElementById('arcade-away-name').textContent = t2.name;
        document.getElementById('arcade-away-overall').textContent = `OVR: ${ArcadeManager.getTeamOverall(t2.id)}`;

        // Aggregate Info Display
        const cardTitle = document.querySelector('.next-match-card h3');
        if (cardTitle) {
            cardTitle.innerHTML = title;
            // Add Aggregate Score if 2nd Leg
            if (nextMatch.currentLeg === 2) {
                const aggDiv = document.createElement('div');
                aggDiv.style.fontSize = '0.9rem';
                aggDiv.style.color = '#ccc';
                aggDiv.style.marginTop = '5px';
                aggDiv.innerHTML = `Placar Agregado: <b>${nextMatch.aggHome}</b> x <b>${nextMatch.aggAway}</b>`;
                // Remove meaningful old aggregate if exists to prevent dupes
                const oldAgg = cardTitle.querySelector('div');
                if (oldAgg) oldAgg.remove();
                cardTitle.appendChild(aggDiv);
            }
        }

        team1 = t1;
        team2 = t2;

        // Button State
        const btnPlay = document.getElementById('btn-play-round');
        if (btnPlay) {
            btnPlay.disabled = false;
            btnPlay.innerText = isSpectator ? "ASSISTIR PARTIDA 📺" : "JOGAR RODADA";
            // Store spectator flag on the match object or globally for startMatch to handle differently if needed?
            // Actually startMatch just uses team1/team2. We might want to ensure 'userTeam' isn't confused.
            // But existing startMatch likely uses team1/team2 globals.
        }

        const btnSim = document.getElementById('btn-auto-simulate');
        if (btnSim) {
            btnSim.innerHTML = isSpectator ? "⚡ Simular Restante" : "⚡ Simular Rodada";
        }

    } else {
        // Really no matches left? (Season Over or Bug)
        document.getElementById('arcade-home-name').textContent = "Campeonato";
        document.getElementById('arcade-away-name').textContent = "Encerrado";

        // Disable Play Button
        const btnPlay = document.getElementById('btn-play-round');
        if (btnPlay) {
            btnPlay.disabled = true;
            btnPlay.innerText = "SEM JOGOS";
        }
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
    championDetails.textContent = `${ArcadeManager.currentRound} Jogos ${championTeam.p} Pontos`;

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
    if (playerBar) playerBar.classList.remove('visible');

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
    toggleGameInterface(false);

    if (startMatchMessage) startMatchMessage.classList.remove('hidden');

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
        if (startMatchMessage) startMatchMessage.classList.add('hidden');
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

// Aplica INFLUÊNCIA do overall na física do jogo
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
    commentEl.innerHTML = `<span class="comment-icon">💬</span> ${aiComment}`;
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
        coinsEl.innerHTML = `<span class="coin-icon">💰</span> +${coinsEarned} moedas`;
        finalScore.appendChild(coinsEl);
    }

    // Configurar botões
    const btnBackMenuResult = document.getElementById('btn-back-menu-result');

    if (currentGameMode === 'quick') {
        btnNextAction.innerText = "Revanche";
        btnNextAction.onclick = startMatch;
        if (btnBackMenuResult) btnBackMenuResult.classList.remove('hidden');
    } else {
        btnNextAction.innerText = "Voltar ao Campeonato";
        if (btnBackMenuResult) btnBackMenuResult.classList.add('hidden');
        btnNextAction.onclick = () => {
            resultOverlay.classList.add('hidden');
            matchScreen.classList.add('hidden');
            toggleGameInterface(true);

            const champion = ArcadeManager.checkChampion();

            // Mostrar player ao voltar
            const playerBar = document.getElementById('music-player-bar');
            if (playerBar && !sfx.allMuted) {
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
    toggleGameInterface(true);
    resultOverlay.classList.add('hidden');

    // Mostrar player ao voltar
    const playerBar = document.getElementById('music-player-bar');
    if (playerBar && !sfx.allMuted) {
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
    toggleGameInterface(true);
    resultOverlay.classList.add('hidden');

    // Mostrar player ao voltar
    const playerBar = document.getElementById('music-player-bar');
    if (playerBar && !sfx.allMuted) {
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
    btnToggleSound.textContent = isEnabled ? '' : '';
    btnToggleSound.classList.toggle('muted', !isEnabled);
    if (isEnabled) sfx.init();
});

// Toggle do player de música (expandir/recolher)
const btnTogglePlayer = document.getElementById('btn-toggle-player');
if (btnTogglePlayer) {
    btnTogglePlayer.addEventListener('click', () => {
        const playerBar = document.getElementById('music-player-bar');
        if (playerBar) playerBar.classList.toggle('expanded');
    });
}

if (btnPlayPauseMusic) btnPlayPauseMusic.addEventListener('click', () => { sfx.init(); sfx.togglePlayPause(); });
if (btnNextMusic) btnNextMusic.addEventListener('click', () => { sfx.init(); sfx.playNext(); });
if (btnPrevMusic) btnPrevMusic.addEventListener('click', () => { sfx.init(); sfx.playPrev(); });

const unlockAudio = () => {
    sfx.init();
    if (sfx.musicEnabled && !sfx.allMuted && sfx.bgmPlayer.paused && !isPlaying) {
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
if (btnShowHistory) btnShowHistory.addEventListener('click', () => { renderHistory(); historyOverlay.classList.remove('hidden'); });
if (btnCloseHistory) btnCloseHistory.addEventListener('click', () => { historyOverlay.classList.add('hidden'); });
if (btnClearHistory) btnClearHistory.addEventListener('click', () => { if (confirm('Limpar?')) { StorageManager.clearHistory(); renderHistory(); } });

if (btnShowStats) btnShowStats.addEventListener('click', () => { renderStats(); statsOverlay.classList.remove('hidden'); });
if (btnCloseStats) btnCloseStats.addEventListener('click', () => { statsOverlay.classList.add('hidden'); });
if (btnResetStats) btnResetStats.addEventListener('click', () => { if (confirm('Zerar?')) { StorageManager.clearStats(); renderStats(); } });

// Botão de voltar ao menu no resultado (partida rápida)
const btnBackMenuResult = document.getElementById('btn-back-menu-result');
if (btnBackMenuResult) {
    btnBackMenuResult.addEventListener('click', () => {
        resultOverlay.classList.add('hidden');
        matchScreen.classList.add('hidden');
        toggleGameInterface(true);
        mainMenu.classList.remove('hidden');

        // Mostrar player novamente
        const playerBar = document.getElementById('music-player-bar');
        if (playerBar && !sfx.allMuted) {
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
            btnUpgradeTeam.innerHTML = '&#9989; Time Melhorado!';
            setTimeout(() => {
                const cost = 100 + (ArcadeManager.overallBoosts[ArcadeManager.userTeamId] * 50);
                btnUpgradeTeam.innerHTML = `&#11014;&#65039; Melhorar Time (<span id="upgrade-cost">${cost}</span> &#129689;)`;
            }, 1500);
        } else {
            btnUpgradeTeam.innerHTML = '&#10060; Moedas insuficientes!';
            setTimeout(() => {
                const cost = 100 + (ArcadeManager.overallBoosts[ArcadeManager.userTeamId] * 50);
                btnUpgradeTeam.innerHTML = `&#11014;&#65039; Melhorar Time (<span id="upgrade-cost">${cost}</span> &#129689;)`;
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


// Função auxiliar para esconder/mostrar header e footer
function toggleGameInterface(show) {
    const header = document.querySelector('.site-header');
    const footer = document.querySelector('.site-footer');
    const displayVal = show ? '' : 'none';
    if (header) header.style.display = displayVal;
    if (footer) footer.style.display = displayVal;
}


// ==================== CHAMPIONSHIP UI ====================
let selectedLeague = 'Brasileirão';

function openChampionshipModal() {
    const modal = document.getElementById('championship-modal');
    if (modal) modal.classList.remove('hidden');

    // Close sidebar if open
    const sidebar = document.getElementById('mobile-sidebar');
    if (sidebar) sidebar.classList.remove('open');

    // Reset view to main options
    showMainOptions();
}

function closeChampionshipModal() {
    const modal = document.getElementById('championship-modal');
    if (modal) modal.classList.add('hidden');
}

window.showStateOptions = function () {
    const mainOpts = document.getElementById('champ-main-options');
    const stateOpts = document.getElementById('champ-state-options');
    if (mainOpts) mainOpts.classList.add('hidden');
    if (stateOpts) stateOpts.classList.remove('hidden');
}

window.showMainOptions = function () {
    const mainOpts = document.getElementById('champ-main-options');
    const stateOpts = document.getElementById('champ-state-options');
    if (mainOpts) mainOpts.classList.remove('hidden');
    if (stateOpts) stateOpts.classList.add('hidden');
}

window.selectChampionship = function (league) {
    window.selectedLeague = league;
    closeChampionshipModal();

    let teamsList;
    if (league === 'paulista') teamsList = paulistaTeams;
    else if (league === 'carioca') teamsList = cariocaTeams;
    else if (league === 'Gauchão') teamsList = gauchoTeams;
    else if (league === 'mineiro') teamsList = mineiroTeams;
    else if (league === 'paranaense') teamsList = paranaenseTeams;
    else teamsList = brazilianTeams;

    initTeamSelectionForArcade(teamsList, league);
}

function initTeamSelectionForArcade(teamsList, leagueName) {
    currentGameMode = 'arcade';
    selectedTeams = [];

    const teamsGrid = document.getElementById('teams-grid');
    teamsGrid.innerHTML = '';

    selectionScreen.classList.remove('hidden');
    mainMenu.classList.add('hidden');

    // Update UI for Single Selection (Arcade Mode)
    const vsSeparator = document.getElementById('vs-separator');
    const slot2 = document.getElementById('slot2');
    const btnStart = document.getElementById('btn-start');
    const selectionSubtitle = document.getElementById('selection-subtitle');

    if (vsSeparator) vsSeparator.classList.add('hidden');
    if (slot2) slot2.classList.add('hidden');
    if (btnStart) {
        btnStart.innerText = "INICIAR CAMPANHA";
        btnStart.dataset.league = leagueName;
    }
    if (selectionSubtitle) selectionSubtitle.innerText = "Quem você levará ao título?";

    // Update title
    let leagueDisplay = "Brasileirão";
    if (leagueName === 'paulista') leagueDisplay = "Paulistão 2026";
    else if (leagueName === 'carioca') leagueDisplay = "Cariocão 2026";
    else if (leagueName === 'Gauchão') leagueDisplay = "Gauchão 2026";
    else if (leagueName === 'mineiro') leagueDisplay = "CAMPEONATO MINEIRO 2026";
    else if (leagueName === 'paranaense') leagueDisplay = "PARANAENSE 2026";

    const selectionTitle = document.getElementById('selection-title');
    selectionTitle.innerHTML = `SELECIONE SEU TIME<br><small style="font-size: 0.6em; color: var(--accent-gold);">${leagueDisplay}</small>`;

    teamsList.forEach(team => {
        const card = document.createElement('div');
        card.className = 'team-card';
        card.dataset.teamId = team.id;

        const shieldDiv = document.createElement('div');
        shieldDiv.className = 'team-card-shield';
        // Ajuste de estilo para ficar bonito
        shieldDiv.style.display = 'flex';
        shieldDiv.style.justifyContent = 'center';
        shieldDiv.style.alignItems = 'center';
        shieldDiv.style.margin = '0 auto 10px auto';

        shieldDiv.appendChild(createShield(team, 'lg'));

        const nameSpan = document.createElement('span');
        nameSpan.className = 'team-card-name';
        nameSpan.innerText = team.name;

        card.appendChild(shieldDiv);
        card.appendChild(nameSpan);
        // Overall removed as requested

        card.addEventListener('click', () => selectTeam(team, card));
        teamsGrid.appendChild(card);
    });

    updateSlots();
    updateStartButton();
    updateCardStates();
}

const btnArcade = document.getElementById('btn-mode-arcade');
if (btnArcade) {
    const newBtn = btnArcade.cloneNode(true);
    btnArcade.parentNode.replaceChild(newBtn, btnArcade);
    newBtn.addEventListener('click', () => {
        openChampionshipModal();
    });
}

const btnCloseChamp = document.getElementById('btn-close-champ-modal');
if (btnCloseChamp) {
    btnCloseChamp.addEventListener('click', closeChampionshipModal);
}

