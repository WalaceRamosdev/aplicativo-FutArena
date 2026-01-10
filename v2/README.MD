Arena Brasileirão 2026
Simulador de Futebol em JavaScript Puro
Aplicação web que simula partidas entre clubes do futebol brasileiro, oferecendo dois modos de jogo:

Partida Rápida (Amistoso)
Modo Arcade (Campeonato Brasileiro em 19 rodadas)
Tudo roda 100% no navegador, sem backend, sem frameworks e sem desculpas.

🎯 Objetivo do Projeto

Criar uma experiência simples, visual e divertida de simulação de futebol, onde o usuário:
Escolhe times
Acompanha partidas simuladas em tempo real
Disputa um campeonato completo
Evolua seu time
Tem progresso salvo automaticamente
O foco é lógica de jogo + experiência do usuário, não realismo extremo.

🧱 Tecnologias Utilizadas

HTML5
CSS3 (Flexbox + Grid + Animações)
JavaScript Vanilla (ES6+)
LocalStorage para persistência de dados
Google Fonts
Áudio nativo (HTML Audio API)
Sem frameworks. Sem build. Sem complicação.

📁 Estrutura do Projeto
/
├── index.html      # Estrutura completa da aplicação (telas, overlays e UI)
├── style.css       # Estilos globais, animações, layout e responsividade
├── script.js       # Toda a lógica do jogo, estados e interações
└── README.md       # Este arquivo (sim, alguém se importou)

🖥️ Telas e Fluxo da Aplicação
1. Menu Principal

Escolha do modo de jogo
Controle de som
Opção de continuar campeonato salvo

2. Seleção de Times

Seleção dinâmica via grid
Limite de seleção controlado por JS
Preview visual dos times escolhidos

3. Partida (Match Screen)

Simulação em tempo real
Movimento dos escudos
Colisões
Gols
Placar e tempo de jogo

4. Resultados

Placar final
Atualização de estatísticas
Continuação ou retorno ao menu

5. Modo Arcade (Campeonato)

19 rodadas
Classificação dinâmica
Evolução de atributos (OVR)
Sistema de moedas
Persistência automática

6. Tela de Campeão

Exibida ao final da 19ª rodada
Estatísticas finais
Time vencedor destacado

🧠 Lógica de Jogo (Resumo Técnico)
Simulação da Partida

Movimento dos escudos ocorre em intervalos de tempo
Colisão entre escudos e zona de gol dispara eventos
Probabilidades de gol levam em conta:
OVR do time
Fator aleatório
Cada partida tem tempo máximo simulado
Sistema de Campeonato

Tabela de classificação baseada em:

Pontos
Jogos
Vitórias
Saldo de gols
Confrontos são gerados automaticamente
Evolução do time ocorre via sistema de upgrade

💾 Persistência de Dados

Todos os dados são salvos no LocalStorage, incluindo:

Progresso do campeonato
Time escolhido pelo usuário
Rodada atual
Moedas
Estatísticas gerais
Histórico de partidas

Chaves usadas (exemplo)
localStorage.getItem("arcadeSave")
localStorage.getItem("globalStats")
localStorage.getItem("matchHistory")


Nenhum dado é enviado para servidor. Tudo local.

🔊 Áudio e Efeitos

Música de fundo
Sons de gol
Controle de áudio global
Player flutuante compacto

Todo o controle é feito via JavaScript com Audio().

🎨 Estilo e UI

Design inspirado em transmissões esportivas
Animações suaves
Layout responsivo
Feedback visual para:

Gols
Vitórias
Progresso
Erros de seleção

🛠️ Como Rodar o Projeto

Opção 1: Simples (recomendada)

Baixe os arquivos
Abra index.html no navegador
Pronto

Opção 2: Servidor local
# Exemplo usando VS Code Live Server
Clique com o botão direito no index.html > Open with Live Server

🧩 Possíveis Melhorias Futuras

Inteligência artificial mais avançada
Cartões, faltas e pênaltis
Modo online
Estatísticas detalhadas por jogador
Suporte a ligas internacionais
Backend para ranking global

Se você for implementar algo disso, documente. Não seja essa pessoa.

🤝 Contribuindo

Faça um fork do projeto
Crie uma branch clara
feature/melhoria-x

Comente seu código
Teste antes de enviar
Explique o que você fez no PR
Código sem explicação é só ego disfarçado.

📄 Licença

Projeto de uso livre para estudos, aprendizado e evolução técnica.
Se for monetizar, pelo menos dê os créditos.

👤 Autor

Desenvolvido por Walace Ramos
Projeto independente focado em aprendizado, entretenimento e evolução técnica.