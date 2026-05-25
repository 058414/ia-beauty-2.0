#!/usr/bin/env node

/**
 * Servidor local para testar MagicFace
 *
 * Uso:
 * node server-local.js
 *
 * Acesse: http://localhost:3000
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const Jimp = require('jimp');

const PORT = process.env.PORT || 3001;

// Mock da API para teste local (sem chamar Claude/Replicate reais)
async function mockGerarCorte(quiz, imagemOriginalBase64) {
  await new Promise(r => setTimeout(r, 2000)); // Simular delay

  const bioTipoMap = {
    retangulo: 'Bob estruturado com volume lateral e assimetria estratégica',
    pera: 'Bob assimétrico com volume pronunciado nos ombros para equilibrar quadril',
    triangulo: 'Bob alongado sem volume no topo, comprimento nas costas',
    ampulheta: 'Long waves com ondas naturais para reforçar curvas',
    oval: 'Corte adaptativo personalizado com linhas retas ou diagonais'
  };

  const prompt = `${bioTipoMap[quiz.biotipo] || 'Corte personalizado'},
    posicionamento: ${quiz.assimetria}, linhas: ${quiz.linhasRosto},
    biotipo: ${quiz.biotipo}, tom de pele: ${quiz.tomPele}.
    Rosto deve parecer equilibrado, alongado e moderno com este corte.`;

  let imagemCorteBase64 = imagemOriginalBase64;

  // Gerar imagem com efeito visual de corte
  try {
    if (imagemOriginalBase64 && imagemOriginalBase64.includes('base64,')) {
      const buffer = Buffer.from(imagemOriginalBase64.split('base64,')[1], 'base64');
      const img = await Jimp.read(buffer);

      const width = img.bitmap.width;
      const height = img.bitmap.height;

      // TESTE: Adicionar gradient MUITO VISÍVEL para debug
      console.log('   🎨 Aplicando efeitos Jimp...');

      // Gradiente VERMELHO -> AZUL na DIAGONAL (super óbvio)
      for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
          const progress = (x + y) / (width + height);

          // Interpolação de cor: Vermelho -> Amarelo -> Verde -> Ciano -> Azul
          let r, g, b;
          if (progress < 0.2) {
            r = 255;
            g = Math.floor(progress * 5 * 255);
            b = 0;
          } else if (progress < 0.4) {
            r = 255;
            g = 255;
            b = Math.floor((progress - 0.2) * 5 * 255);
          } else if (progress < 0.6) {
            r = Math.floor((1 - (progress - 0.4) * 5) * 255);
            g = 255;
            b = 255;
          } else if (progress < 0.8) {
            r = 0;
            g = Math.floor((1 - (progress - 0.6) * 5) * 255);
            b = 255;
          } else {
            r = 0;
            g = 0;
            b = 255;
          }

          // Blender: misturar 30% do gradient com 70% da imagem original
          const pixelOriginal = Jimp.intToRGBA(img.getPixelColor(x, y));
          const rFinal = Math.floor(pixelOriginal.r * 0.7 + r * 0.3);
          const gFinal = Math.floor(pixelOriginal.g * 0.7 + g * 0.3);
          const bFinal = Math.floor(pixelOriginal.b * 0.7 + b * 0.3);

          img.setPixelColor(
            Jimp.rgbaToInt(rFinal, gFinal, bFinal, pixelOriginal.a),
            x,
            y
          );
        }
      }

      console.log('   ✅ Efeitos aplicados');

      const imagemBuffer = await img.getBuffer('image/jpeg');
      imagemCorteBase64 = 'data:image/jpeg;base64,' + imagemBuffer.toString('base64');
    }
  } catch (erro) {
    console.error('⚠️  Erro ao processar imagem com Jimp, usando original:', erro.message);
  }

  return {
    sucesso: true,
    imagemCorteRecomendado: imagemCorteBase64,
    promptUsado: prompt,
    simulado: true,
    nota: '⚠️ Mock local - em produção será gerado com Claude + Replicate'
  };
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // OPTIONS
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Servir arquivos estáticos
  if (req.method === 'GET') {
    if (pathname === '/' || pathname === '/index.html') {
      try {
        const filePath = path.join(__dirname, 'index.html');
        const content = fs.readFileSync(filePath, 'utf-8');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(content);
        return;
      } catch (e) {
        res.writeHead(404);
        res.end('index.html not found');
        return;
      }
    }

    // Servir imagens de teste
    if (pathname.startsWith('/test-images/')) {
      try {
        const filename = pathname.replace('/test-images/', '');
        const filePath = path.join(__dirname, 'test-images', filename);
        const content = fs.readFileSync(filePath);
        const ext = filename.split('.').pop().toLowerCase();
        const contentTypeMap = {
          jpeg: 'image/jpeg',
          jpg: 'image/jpeg',
          png: 'image/png',
          gif: 'image/gif'
        };
        const contentType = contentTypeMap[ext] || 'application/octet-stream';
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
        return;
      } catch (e) {
        res.writeHead(404);
        res.end('Image not found');
        return;
      }
    }

    res.writeHead(404);
    res.end('Not found');
    return;
  }

  // API - Mock
  if (req.method === 'POST' && pathname === '/api/gerarCorteVisual') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      try {
        const data = JSON.parse(body);
        console.log('\n📸 Requisição recebida:');
        console.log('   Biotipo:', data.quiz.biotipo);
        console.log('   Assimetria:', data.quiz.assimetria);
        console.log('   Linhas Rosto:', data.quiz.linhasRosto);
        console.log('   Foto original: recebida (' + (data.fotoOriginal ? Math.floor(data.fotoOriginal.length / 1024) + ' KB' : 'sem imagem') + ')');

        const resultado = await mockGerarCorte(data.quiz, data.fotoOriginal);

        console.log('   ✅ Imagem com corte gerada e enviada\n');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(resultado));
      } catch (erro) {
        console.error('❌ Erro na API:', erro);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          erro: 'Erro ao processar requisição',
          detalhes: erro.message
        }));
      }
    });
    return;
  }

  // 404
  res.writeHead(404);
  res.end('Not found');
});

server.listen(PORT, () => {
  console.log(`\n${'='.repeat(70)}`);
  console.log(`🚀 MagicFace Server Local (MOCK)`);
  console.log(`${'='.repeat(70)}`);
  console.log(`\n📍 Servidor rodando em: http://localhost:${PORT}`);
  console.log(`\n⚠️  Modo: MOCK (usando imagens placeholder)`);
  console.log(`   API real será integrada no Vercel com as chaves de API`);
  console.log(`\n💡 Testar fluxo:`);
  console.log(`   1. Abra http://localhost:${PORT}`);
  console.log(`   2. Clique em "Tirar Foto" (câmera)`);
  console.log(`   3. Complete o Quiz`);
  console.log(`   4. Clique em "Ver Corte Recomendado"`);
  console.log(`   5. Veja a imagem mockada lado a lado`);
  console.log(`\n${'='.repeat(70)}\n`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n\n👋 Servidor parado');
  process.exit(0);
});
