#!/usr/bin/env node

/**
 * Teste COMPLETO do fluxo MagicFace com imagem real
 *
 * Uso:
 * node test-fluxo-completo.js
 *
 * Isso faz:
 * 1. Carrega imagem jjj.jpeg
 * 2. Simula quiz
 * 3. Gera resultado
 * 4. Chama API para gerar corte
 * 5. Salva resultado em HTML para visualizar
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

// ===== CARREGAR IMAGEM =====
console.log('\n' + '='.repeat(70));
console.log('🧪 TESTE COMPLETO: MagicFace com Imagem Real');
console.log('='.repeat(70) + '\n');

const imagemPath = path.join(__dirname, 'test-images', 'jjj.jpeg');
if (!fs.existsSync(imagemPath)) {
  console.error('❌ Imagem não encontrada:', imagemPath);
  process.exit(1);
}

console.log('📸 Carregando imagem:', imagemPath);
const imagemBuffer = fs.readFileSync(imagemPath);
const imagemBase64 = 'data:image/jpeg;base64,' + imagemBuffer.toString('base64');
console.log('✅ Imagem carregada (' + imagemBuffer.length + ' bytes)\n');

// ===== SIMULAR QUIZ =====
const quizSimulado = {
  percepcaoRosto: 'equilibrado',
  geraDesconforto: null,
  franja: 'sim_equilibra',
  linhasRosto: 'curvas',
  biotipo: 'pera',
  linhasCorpo: 'curvas',
  tomPele: 'quente',
  comprimentoPreferido: 'medio'
};

console.log('📋 Quiz Simulado:');
console.log(JSON.stringify(quizSimulado, null, 2));
console.log('');

// ===== CHAMAR API =====
console.log('🚀 Chamando API /api/gerarCorteVisual...\n');

const quizParaAPI = {
  assimetria: 'lado_direito_mais_alto',
  biotipo: quizSimulado.biotipo,
  linhasRosto: quizSimulado.linhasRosto,
  linhasCorpo: quizSimulado.linhasCorpo,
  tomPele: quizSimulado.tomPele,
  usoFranja: quizSimulado.franja,
  comprimentoPreferido: quizSimulado.comprimentoPreferido
};

const postData = JSON.stringify({
  fotoOriginal: imagemBase64,
  quiz: quizParaAPI
});

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/gerarCorteVisual',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = http.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('📊 Resposta da API:');
    console.log('   Status:', res.statusCode);

    try {
      const resultado = JSON.parse(data);
      console.log('   Sucesso:', resultado.sucesso);
      console.log('   Prompt:', resultado.promptUsado ? resultado.promptUsado.substring(0, 100) + '...' : 'N/A');
      console.log('   Imagem:', resultado.imagemCorteRecomendado ? resultado.imagemCorteRecomendado.substring(0, 50) + '...' : 'N/A');

      // ===== GERAR HTML DE RESULTADO =====
      console.log('\n✅ Gerando HTML de resultado...\n');

      const html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MagicFace — Resultado do Teste</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #0a0a0a;
      color: #f0f0f0;
      font-family: 'Segoe UI', system-ui, sans-serif;
      padding: 40px 20px;
    }
    .container {
      max-width: 900px;
      margin: 0 auto;
    }
    h1 {
      color: #C4973A;
      text-align: center;
      margin-bottom: 30px;
      font-size: 2rem;
    }
    .section {
      background: #111;
      border: 1px solid #222;
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 20px;
    }
    h2 {
      color: #C4973A;
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-bottom: 16px;
      padding-bottom: 12px;
      border-bottom: 1px solid #1e1e1e;
    }
    .comparison {
      display: flex;
      gap: 20px;
      justify-content: center;
      margin-bottom: 20px;
    }
    .image-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      flex: 1;
    }
    .image-box img {
      width: 100%;
      max-width: 400px;
      border-radius: 10px;
      border: 1px solid #222;
      box-shadow: 0 4px 12px rgba(196, 151, 58, 0.1);
    }
    .image-label {
      font-size: 0.9rem;
      color: #C4973A;
      text-align: center;
      font-weight: 600;
    }
    .prompt-box {
      background: #0d0d0d;
      border: 1px solid #1e1e1e;
      border-radius: 10px;
      padding: 16px;
      margin-bottom: 16px;
      font-size: 0.9rem;
      line-height: 1.6;
      color: #999;
      max-height: 200px;
      overflow-y: auto;
    }
    .quiz-info {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      font-size: 0.9rem;
    }
    .quiz-item {
      background: #1e1e1e;
      padding: 12px;
      border-radius: 8px;
      border-left: 3px solid #C4973A;
    }
    .quiz-label {
      color: #C4973A;
      font-weight: 600;
      margin-bottom: 4px;
    }
    .status {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px;
      background: #1a2e1a;
      border-left: 3px solid #4ade80;
      border-radius: 6px;
      margin-bottom: 20px;
    }
    .status.warning {
      background: #2e2818;
      border-left-color: #C4973A;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🎨 MagicFace — Resultado do Teste</h1>

    <div class="status">
      ✅ <strong>Teste Executado com Sucesso</strong>
      <span style="margin-left: auto; font-size: 0.85rem; color: #888;">${new Date().toLocaleString('pt-BR')}</span>
    </div>

    <div class="section">
      <h2>Seu Corte Personalizado</h2>
      <div class="comparison">
        <div class="image-box">
          <img src="data:image/jpeg;base64,${imagemBuffer.toString('base64')}" alt="Seu rosto">
          <div class="image-label">Seu Rosto</div>
        </div>
        <div class="image-box">
          <img src="${resultado.imagemCorteRecomendado}" alt="Corte recomendado">
          <div class="image-label">Corte Recomendado</div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2>Dados do Quiz</h2>
      <div class="quiz-info">
        <div class="quiz-item">
          <div class="quiz-label">Biotipo</div>
          <div>${quizParaAPI.biotipo}</div>
        </div>
        <div class="quiz-item">
          <div class="quiz-label">Assimetria</div>
          <div>${quizParaAPI.assimetria}</div>
        </div>
        <div class="quiz-item">
          <div class="quiz-label">Linhas do Rosto</div>
          <div>${quizParaAPI.linhasRosto}</div>
        </div>
        <div class="quiz-item">
          <div class="quiz-label">Linhas do Corpo</div>
          <div>${quizParaAPI.linhasCorpo}</div>
        </div>
        <div class="quiz-item">
          <div class="quiz-label">Tom de Pele</div>
          <div>${quizParaAPI.tomPele}</div>
        </div>
        <div class="quiz-item">
          <div class="quiz-label">Franja</div>
          <div>${quizParaAPI.usoFranja}</div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2>Prompt Gerado pela IA</h2>
      <div class="prompt-box">
        ${resultado.promptUsado || 'N/A'}
      </div>
      ${resultado.simulado ? '<div class="status warning">⚠️ <strong>Modo Mock</strong> — Em produção, será gerado com Claude Opus + Replicate Inpainting reais</div>' : ''}
    </div>

    <div class="section">
      <h2>Response JSON</h2>
      <div class="prompt-box">
        ${JSON.stringify(resultado, null, 2)}
      </div>
    </div>
  </div>
</body>
</html>
      `;

      const resultPath = path.join(__dirname, 'test-resultado.html');
      fs.writeFileSync(resultPath, html);

      console.log('📄 Resultado salvo em: ' + resultPath);
      console.log('\n' + '='.repeat(70));
      console.log('✅ TESTE CONCLUÍDO COM SUCESSO!');
      console.log('='.repeat(70));
      console.log('\n💡 Para visualizar, abra: file://' + resultPath.replace(/\\/g, '/'));
      console.log('\n');

    } catch (e) {
      console.error('❌ Erro ao processar resposta:', e.message);
    }
  });
});

req.on('error', (erro) => {
  console.error('❌ Erro na requisição:', erro.message);
  console.error('\n💡 Dica: Certifique-se de que o servidor está rodando:');
  console.error('   node server-local.js');
  process.exit(1);
});

req.write(postData);
req.end();
