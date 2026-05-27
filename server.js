const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const Anthropic = require("@anthropic-ai/sdk");

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const systemPromptIABeauty = `Você é um especialista em VISAGISMO e ANÁLISE FACIAL focado em recomendações de CORTE DE CABELO.

Seu papel é analisar dados de uma mulher e gerar uma RECOMENDAÇÃO INTEGRADA de corte de cabelo.

## PRINCÍPIOS FUNDAMENTAIS

### 1. Assimetria Facial = Posicionamento Estratégico
- Se lado esquerdo é mais alto → jogar cabelo para DIREITA
- Se lado direito é mais alto → jogar cabelo para ESQUERDA
- Se equilibrado → flexibilidade máxima

### 2. Linhas Visuais = Compensação
- Rosto com MUITAS CURVAS + corpo com MUITAS CURVAS → adicionar RETAS no corte
- Rosto com MUITAS RETAS + corpo com MUITAS RETAS → adicionar CURVAS no corte

### 3. Biotipos + Corte = Sinergia
- RETÂNGULO → movimento, volume lateral
- PÊRA → volume nos OMBROS
- TRIÂNGULO INVERTIDO → ondas nas pontas
- AMPULHETA → reforçar curva
- OVAL → flexibilidade

## FORMATO RESPOSTA
Gere em MARKDOWN com:
- 🎯 Seu Perfil Visual
- ✨ Recomendação de Corte
- 💇 Guia Prático
- 👚 Gola + Franja + Adereços
- 🔄 Teste Prático`;

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // API endpoint
  if (pathname === '/api/gerar-sintese' && req.method === 'POST') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      try {
        const dados = JSON.parse(body);
        const { nome, rosto, corpo } = dados;

        if (!nome || !rosto || !corpo) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Missing required data' }));
          return;
        }

        const userPrompt = `
Análise para: ${nome}

## ROSTO (Q1)
- Assimetria: ${rosto.assimetria}
- Essência: ${rosto.essencia}
- Contexto: ${rosto.contexto}

## CORPO (Q3)
- Biotipo: ${corpo.biotipo}
- Linhas: ${corpo.linhasCorpo}
- Comprimento: ${corpo.comprimentoPreferido}

Gere uma recomendação INTEGRADA de corte de cabelo.`;

        const response = await client.messages.create({
          model: "claude-opus-4-1-20250805",
          max_tokens: 2000,
          system: systemPromptIABeauty,
          messages: [{ role: "user", content: userPrompt }],
        });

        const recomendacao = response.content[0].type === 'text' ? response.content[0].text : '';

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          nome,
          recomendacao,
          timestamp: new Date().toISOString(),
        }));
      } catch (error) {
        console.error('Error:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          error: 'Failed to generate synthesis',
          details: error.message,
        }));
      }
    });
    return;
  }

  // Static files
  let filePath = pathname === '/' ? '/index.html' : pathname;
  filePath = path.join(__dirname, filePath);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }

    const extname = path.extname(filePath);
    let contentType = 'text/html';
    if (extname === '.js') contentType = 'application/javascript';
    if (extname === '.css') contentType = 'text/css';
    if (extname === '.json') contentType = 'application/json';

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`✅ IA BEAUTY 2.0 rodando em http://localhost:${PORT}`);
  console.log(`📡 API em /api/gerar-sintese`);
  console.log(`🔑 ANTHROPIC_API_KEY: ${process.env.ANTHROPIC_API_KEY ? 'Configurada ✅' : 'Não configurada ❌'}`);
});
