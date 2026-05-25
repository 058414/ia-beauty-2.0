#!/usr/bin/env node

/**
 * Debug: Testar resposta da API
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

console.log('\n🔍 Debugando API /api/gerarCorteVisual\n');

// Carregar imagem
const imagemPath = path.join(__dirname, 'test-images', 'teste.jpeg');
const imagemBuffer = fs.readFileSync(imagemPath);
const imagemBase64 = 'data:image/jpeg;base64,' + imagemBuffer.toString('base64');

console.log('📸 Imagem carregada: ' + imagemBuffer.length + ' bytes');

const quizParaAPI = {
  assimetria: 'lado_esquerdo_mais_alto',
  biotipo: 'triangulo',
  linhasRosto: 'retas',
  linhasCorpo: 'retas',
  tomPele: 'frio',
  usoFranja: 'nao',
  comprimentoPreferido: 'longo'
};

const postData = JSON.stringify({
  fotoOriginal: imagemBase64,
  quiz: quizParaAPI
});

console.log('📤 Enviando requisição...\n');

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
    console.log('📥 Resposta recebida:\n');
    console.log('Status:', res.statusCode);
    console.log('Headers:', res.headers);

    try {
      const resultado = JSON.parse(data);

      console.log('\n✅ JSON parseado com sucesso');
      console.log('Campos retornados:');
      console.log('  - sucesso:', resultado.sucesso);
      console.log('  - promptUsado:', resultado.promptUsado ? resultado.promptUsado.substring(0, 60) + '...' : 'vazio');
      console.log('  - imagemCorteRecomendado:', resultado.imagemCorteRecomendado ? '✅ Presente (' + resultado.imagemCorteRecomendado.length + ' bytes)' : '❌ Ausente');
      console.log('  - simulado:', resultado.simulado);

      if (resultado.imagemCorteRecomendado) {
        if (resultado.imagemCorteRecomendado.startsWith('data:image')) {
          console.log('\n✅ Imagem retornada como Data URL (base64)');
          console.log('   Primeiros 100 caracteres:');
          console.log('   ' + resultado.imagemCorteRecomendado.substring(0, 100) + '...');

          // Salvar imagem extraída para debug
          const base64Part = resultado.imagemCorteRecomendado.split('base64,')[1];
          if (base64Part) {
            const imgBuffer = Buffer.from(base64Part, 'base64');
            fs.writeFileSync(path.join(__dirname, 'debug-imagem-retornada.jpg'), imgBuffer);
            console.log('\n✅ Imagem salva em: debug-imagem-retornada.jpg');
          }
        } else {
          console.log('\n⚠️  Imagem retornada como URL (não é base64):');
          console.log('   ' + resultado.imagemCorteRecomendado);
        }
      } else {
        console.log('\n❌ Campo imagemCorteRecomendado está vazio!');
      }

      console.log('\n');

    } catch (e) {
      console.error('❌ Erro ao parsear JSON:', e.message);
      console.log('\nData recebida (primeiros 500 chars):');
      console.log(data.substring(0, 500));
    }
  });
});

req.on('error', (erro) => {
  console.error('❌ Erro na requisição:', erro.message);
  process.exit(1);
});

req.write(postData);
req.end();
