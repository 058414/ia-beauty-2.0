/**
 * SERVIDOR LOCAL PARA TESTES
 * Simula o endpoint /api/gerar-protocolo
 */

require('dotenv').config();
const http = require('http');
const url = require('url');

const PORT = 3001;
const API_KEY = process.env.ANTHROPIC_API_KEY;

if (!API_KEY) {
  console.error('❌ ERRO: ANTHROPIC_API_KEY não configurada!');
  console.error('Crie um arquivo .env com: ANTHROPIC_API_KEY=sk-...');
  process.exit(1);
}

const server = http.createServer(async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);

  // Endpoint: /api/gerar-protocolo
  if (req.method === 'POST' && parsedUrl.pathname === '/api/gerar-protocolo') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      try {
        const { systemPrompt, userPrompt } = JSON.parse(body);

        if (!systemPrompt || !userPrompt) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'systemPrompt e userPrompt são obrigatórios' }));
          return;
        }

        console.log('📝 Chamando Claude API...');

        // Chamar Claude API
        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
            'anthropic-version': '2023-06-01'
          },
          body: JSON.stringify({
            model: 'claude-opus-4-1',
            max_tokens: 2000,
            system: systemPrompt,
            messages: [
              {
                role: 'user',
                content: userPrompt
              }
            ]
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('❌ Erro da API Claude:', errorData);
          res.writeHead(response.status, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Erro ao chamar Claude API', details: errorData }));
          return;
        }

        const data = await response.json();
        const protocolo = data.content?.[0]?.text;

        if (!protocolo) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Resposta vazia da IA' }));
          return;
        }

        console.log('✅ Protocolo gerado com sucesso!');

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          protocolo: protocolo,
          timestamp: new Date().toISOString()
        }));

      } catch (error) {
        console.error('❌ Erro:', error.message);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          error: 'Erro interno do servidor',
          message: error.message
        }));
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Endpoint não encontrado' }));
  }
});

server.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║  🚀 SERVIDOR MAGICFACE PRONTO          ║
╠════════════════════════════════════════╣
║  Porta: ${PORT}                          ║
║  Frontend: http://localhost:3000       ║
║  Backend: http://localhost:${PORT}       ║
╚════════════════════════════════════════╝
  `);
});
