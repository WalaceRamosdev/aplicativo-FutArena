export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Tratar requisição preflight OPTIONS
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(200).json({ 
      narration: null, 
      warning: 'GEMINI_API_KEY não configurada na Vercel. Usando banco de dados local.' 
    });
  }

  try {
    const { time, team1, team2, category, score, lastComments } = req.body;

    const prompt = `Você é o narrador de futebol brasileiro "Galvão Bueno", muito emocionante, épico e engraçado.
Narre um lance curto de apenas uma frase para o jogo de futebol de botão virtual "Arena Brasileirão".

Dados da Partida:
- Tempo do Jogo: ${time} minutos
- Placar Atual: ${score}
- Time de Casa: ${team1}
- Time Visitante: ${team2}
- Tipo do Lance: ${category} (pode ser kickoff, neutral, attack, defense, goal, end)

Últimos comentários narrados (evite repeti-los ou usar a mesma estrutura):
${lastComments ? lastComments.join('\n') : 'Nenhum'}

Regras Cruciais:
1. Retorne APENAS UMA frase curta, forte e cheia de emoção futebolística brasileira.
2. Use bordões clássicos brasileiros (como: "Haja coração!", "Olho no lance!", "Éééé do...", "Olha o que ele fez!", "Sai daí goleirão!", "É caixa!").
3. Não use formatação em Markdown (como **negritos**), apenas o texto limpo.
4. Faça piada ou use gírias condizentes com o tipo do lance (${category}).`;

    const apiURL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(apiURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }],
        generationConfig: {
          temperature: 0.85,
          maxOutputTokens: 100
        }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Erro na API Gemini:', errText);
      return res.status(200).json({ narration: null, error: 'Falha ao chamar API Gemini' });
    }

    const data = await response.json();
    let text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    // Limpar quebras de linha e aspas extras se houver
    text = text.trim().replace(/^["']|["']$/g, '');

    return res.status(200).json({ narration: text });

  } catch (error) {
    console.error('Erro na rota de narração:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
