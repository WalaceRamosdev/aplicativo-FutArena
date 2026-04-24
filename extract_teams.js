// Script temporário para extrair times do script.js para JSON
const fs = require('fs');
const path = require('path');

// Ler script.js
const scriptPath = path.join(__dirname, 'script.js');
const content = fs.readFileSync(scriptPath, 'utf16le');

// Extrair cada array de times usando regex
function extractArray(varName, src) {
    const regex = new RegExp(`const ${varName} = \\[([\\s\\S]*?)\\];`, 'm');
    const match = src.match(regex);
    if (!match) { console.log('NOT FOUND:', varName); return []; }
    try {
        // Limpar e avaliar como JS
        const arrStr = '[' + match[1] + ']';
        return eval(arrStr);
    } catch(e) {
        console.error('Parse error for', varName, e.message);
        return [];
    }
}

const data = {
    brazilianTeams: extractArray('brazilianTeams', content),
    paulistaTeams: extractArray('paulistaTeams', content),
    cariocaTeams: extractArray('cariocaTeams', content),
    gauchoTeams: extractArray('gauchoTeams', content),
    mineiroTeams: extractArray('mineiroTeams', content),
    paranaenseTeams: extractArray('paranaenseTeams', content),
    internationalTeams: extractArray('internationalTeams', content),
};

// Criar diretório data se não existir
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

// Salvar JSON
const outPath = path.join(dataDir, 'teams.json');
fs.writeFileSync(outPath, JSON.stringify(data, null, 2), 'utf8');

// Contagem
Object.keys(data).forEach(k => {
    console.log(`${k}: ${data[k].length} times`);
});
console.log('\\nSalvo em:', outPath);
