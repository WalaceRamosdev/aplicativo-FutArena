const fs = require('fs');
const path = require('path');

// Caminhos de origem e destino
const srcDir = path.join(__dirname, 'assets', 'musicas');
const destDir = path.join(__dirname, 'futarena-rn', 'assets', 'musicas');

console.log('🎵 Iniciando cópia de trilha sonora do FutArena...');
console.log(`Origem: ${srcDir}`);
console.log(`Destino: ${destDir}`);

// Cria o diretório de destino se não existir
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
  console.log('✅ Pasta "futarena-rn/assets/musicas" criada com sucesso!');
}

// Copia todos os arquivos MP3
if (fs.existsSync(srcDir)) {
  const files = fs.readdirSync(srcDir);
  let copiedCount = 0;

  files.forEach(file => {
    if (file.endsWith('.mp3')) {
      const srcFile = path.join(srcDir, file);
      const destFile = path.join(destDir, file);
      fs.copyFileSync(srcFile, destFile);
      console.log(`➡️ Copiado: ${file}`);
      copiedCount++;
    }
  });

  console.log(`\n🎉 Sucesso! ${copiedCount} músicas copiadas para a trilha do aplicativo React Native!`);
} else {
  console.error('❌ Erro: Pasta "assets/musicas" de origem não encontrada no diretório raiz.');
}
