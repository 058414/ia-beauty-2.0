#!/usr/bin/env node

/**
 * Teste COMPLETO do fluxo MagicFace com imagem "teste"
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

console.log('\n' + '='.repeat(70));
console.log('🧪 TESTE COMPLETO: MagicFace com Imagem "teste"');
console.log('='.repeat(70) + '\n');

const imagemPath = path.join(__dirname, 'test-images', 'teste.jpeg');
if (!fs.existsSync(imagemPath)) {
  console.error('❌ Imagem não encontrada:', imagemPath);
  process.exit(1);
}

console.log('📸 Carregando imagem:', imagemPath);
const imagemBuffer = fs.readFileSync(imagemPath);
const imagemBase64 = 'data:image/jpeg;base64,' + imagemBuffer.toString('base64');
console.log('✅ Imagem carregada (' + imagemBuffer.length + ' bytes)\n');

// Quiz simulado para essa imagem
const quizParaAPI = {
  assimetria: 'lado_esquerdo_mais_alto',
  biotipo: 'triangulo',
  linhasRosto: 'retas',
  linhasCorpo: 'retas',
  tomPele: 'frio',
  usoFranja: 'nao',
  comprimentoPreferido: 'longo'
};

console.log('📋 Quiz Simulado:');
console.log(JSON.stringify(quizParaAPI, null, 2));
console.log('');

console.log('🚀 Chamando API /api/gerarCorteVisual...\n');

const postData = JSON.stringify({
  fotoOriginal: imagemBase64,
  quiz: quizParaAPI
});

const options = {
  hostname: 'localhost',
  port: 3001,
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

      const html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MagicFace — Teste com Imagem "teste"</title>
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
      max-height: 300px;
      overflow-y: auto;
      white-space: pre-wrap;
      word-wrap: break-word;
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
  </style>
</head>
<body>
  <div class="container">
    <h1>🎨 MagicFace — Teste com Imagem "teste"</h1>

    <div class="status">
      ✅ <strong>Teste Executado com Sucesso</strong>
      <span style="margin-left: auto; font-size: 0.85rem; color: #888;">${new Date().toLocaleString('pt-BR')}</span>
    </div>

    <div class="section">
      <h2>Seu Corte Personalizado</h2>
      <div class="comparison">
        <div class="image-box">
          <img src="data:image/jpeg;base64,${imagemBuffer.toString('base64')}" alt="Seu rosto">
          <div class="image-label">Seu Rosto (teste.jpeg)</div>
        </div>
        <div class="image-box">
          <img src="${resultado.imagemCorteRecomendado}" alt="Corte recomendado">
          <div class="image-label">Corte Recomendado</div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2>Análise (Quiz Simulado)</h2>
      <div class="quiz-info">
        <div class="quiz-item">
          <div class="quiz-label">Biotipo</div>
          <div>${quizParaAPI.biotipo} (Triângulo Invertido)</div>
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
          <div class="quiz-label">Comprimento</div>
          <div>${quizParaAPI.comprimentoPreferido}</div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2>Recomendação da IA</h2>
      <div class="prompt-box">${resultado.promptUsado || 'N/A'}</div>
    </div>

    <div class="section">
      <h2>Dados Completos (JSON)</h2>
      <div class="prompt-box">${JSON.stringify({quiz: quizParaAPI, resultado: resultado}, null, 2)}</div>
    </div>
  </div>
</body>
</html>
      `;

      const resultPath = path.join(__dirname, 'test-resultado-teste.html');
      fs.writeFileSync(resultPath, html);

      console.log('✅ Gerando HTML de resultado...');
      console.log('📄 Resultado salvo em: ' + resultPath);
      console.log('\n' + '='.repeat(70));
      console.log('✅ TESTE COM IMAGEM "teste" CONCLUÍDO!');
      console.log('='.repeat(70));
      console.log('\n💡 Para visualizar: file:///' + resultPath.replace(/\\/g, '/'));
      console.log('\n');

      // Abrir no navegador
      require('child_process').exec('start "' + resultPath + '"');

    } catch (e) {
      console.error('❌ Erro ao processar resposta:', e.message);
    }
  });
});

req.on('error', (erro) => {
  console.error('❌ Erro na requisição:', erro.message);
  console.error('\n💡 Certifique-se de que o servidor está rodando: node server-local.js');
  process.exit(1);
});

req.write(postData);
req.end();
