# 🚀 Roadmap de Performance: FutArena Mobile

Este documento detalha as melhorias necessárias para otimizar o desempenho do aplicativo, reduzir o consumo de bateria e garantir uma jogabilidade fluida em dispositivos mobile.

---

## 1. Gestão de Dados e Assets (O Mais Urgente)
Atualmente, o arquivo `script.js` carrega todos os times na memória de uma vez.

- [ ] **Externalizar Dados de Times**: Mover a lista de objetos `teams` para um arquivo `teams.json` ou um banco de dados (ex: Supabase ou Firebase).
- [ ] **Carregamento On-Demand (Lazy Loading)**: Carregar as informações e escudos apenas dos dois times selecionados para a partida.
- [ ] **Otimização de Imagens**:
    - Converter todos os escudos de SVG/PNG para **WebP**.
    - Criar duas versões por escudo: `thumb` (64px) para a grade e `large` (128px) para o modal de gol.
- [ ] **CDN para Imagens**: Hospedar os escudos em um serviço de entrega rápida (Vercel Blob, Cloudinary) em vez de carregar tudo localmente.

---

## 2. Motor de Renderização (O Ganho Real)
Mover a lógica de "DOM" para "Canvas" é o divisor de águas para jogos mobile.

- [ ] **Migração para HTML5 Canvas**: Substituir as `divs` que representam os escudos no campo por desenhos em um elemento `<canvas>`.
- [ ] **Object Pooling (Reuso de Objetos)**:
    - Implementar um sistema para os **Confetes** e **Fogos de Artifício**.
    - Em vez de `document.createElement`, o sistema reutiliza elementos já existentes em um "reservatório" (pool).
- [ ] **Redução de DOM Nodes**: Manter o número total de elementos HTML abaixo de 1.500 para evitar lentidão no scroll e animações.

---

## 3. Código e Arquitetura
O arquivo único de 5000+ linhas dificulta a manutenção e o processamento inicial.

- [ ] **Modularização (ES Modules)**: Dividir o `script.js` em arquivos menores:
    - `engine.js` (Física e loop de jogo).
    - `ui-manager.js` (Modais, botões e telas).
    - `audio-manager.js` (Sfx e músicas).
    - `data-service.js` (Busca de times e persistência).
- [ ] **Eliminar "Layout Thrashing"**: Evitar o uso de `offsetWidth`, `offsetHeight` ou `getBoundingClientRect` dentro do `gameLoop`.
- [ ] **Throttling de Eventos**: Limitar a frequência de disparo de eventos de `resize` ou `scroll`.

---

## 4. Otimização de CSS
Forçar o hardware do celular a trabalhar a favor do app.

- [ ] **Aceleração por GPU**: Adicionar `will-change: transform, opacity;` em elementos que se movem com frequência (bolas, escudos, overlays).
- [ ] **Remover Filtros Pesados**: Evitar o uso excessivo de `backdrop-filter: blur()` e `box-shadow` complexos em elementos que cobrem a tela toda no mobile.
- [ ] **Media Queries de Performance**: Desativar animações secundárias (como o brilho dourado constante) se o dispositivo estiver em modo de economia de energia ou for detectado como low-end.

---

## Próximos Passos Sugeridos
1. Começar pela **Externalização dos Times** (Limpa o código).
2. Aplicar o **Object Pooling nos Confetes** (Resolve travamentos em gols).
3. Avaliar a migração do campo para **Canvas**.
