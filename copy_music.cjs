const fs = require('fs');
const path = require('path');

// Caminhos de origem e destino
const srcDir = path.join(__dirname, 'assets', 'musicas');
const destDir = path.join(__dirname, 'futarena-rn', 'assets', 'musicas');

console.log('🎵 Iniciando cópia de trilha sonora do FutArena (Modo CJS)...');
console.log(`Origem: ${srcDir}`);
console.log(`Destino: ${destDir}`);

// Cria o diretório de destino se não existir
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
  console.log('✅ Pasta "futarena-rn/assets/musicas" criada com sucesso!');
}

// Mapeamento de nomes de arquivo inseguros (com acentos, espaços e maiúsculas)
// para nomes de arquivo seguros compatíveis com Android AAPT (apenas letras minúsculas, números e sublinhados)
const fileMap = {
  'Skank - É uma partida de futebol.mp3': 'skank_e_uma_partida_de_futebol.mp3',
  'Marcelo D2 Claudia - Desabafo.mp3': 'marcelo_d2_claudia_desabafo.mp3',
  'Sérgio Mendes - Mas Que Nada 2011 Rio Versão.mp3': 'sergio_mendes_mas_que_nada_2011_rio_versao.mp3',
  'Tema do Brasileirão.mp3': 'tema_do_brasileirao.mp3',
  'Doves-Black And White Town.mp3': 'doves_black_and_white_town.mp3',
  'Send-Them-Off_-Bastille.mp3': 'send_them_off_bastille.mp3',
  'Supermassive-Black-Hole.mp3': 'supermassive_black_hole.mp3'
};

// Limpa arquivos antigos para não deixar rastros
if (fs.existsSync(destDir)) {
  const existingFiles = fs.readdirSync(destDir);
  existingFiles.forEach(file => {
    if (file.endsWith('.mp3')) {
      try {
        fs.unlinkSync(path.join(destDir, file));
      } catch (e) {}
    }
  });
  console.log('🧹 Limpeza de arquivos MP3 antigos concluída!');
}

// Copia todos os arquivos MP3 com os novos nomes seguros
if (fs.existsSync(srcDir)) {
  let copiedCount = 0;

  Object.entries(fileMap).forEach(([originalName, safeName]) => {
    const srcFile = path.join(srcDir, originalName);
    const destFile = path.join(destDir, safeName);
    
    if (fs.existsSync(srcFile)) {
      fs.copyFileSync(srcFile, destFile);
      console.log(`➡️ Copiado e Renomeado: "${originalName}" ➔ "${safeName}"`);
      copiedCount++;
    } else {
      console.warn(`⚠️ Arquivo de origem não encontrado: "${originalName}"`);
    }
  });

  console.log(`\n🎉 Sucesso! ${copiedCount} músicas copiadas e renomeadas para a trilha do aplicativo React Native de forma 100% segura para Android!`);
} else {
  console.error('❌ Erro: Pasta "assets/musicas" de origem não encontrada no diretório raiz.');
}
