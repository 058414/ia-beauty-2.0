#!/usr/bin/env node

/**
 * Teste direto da API gerarCorteVisual.js (Replicate)
 * Chamada direta da função handler
 */

require('dotenv').config({ path: '.env.local' });

const fs = require('fs');
const path = require('path');

// Importar a função (precisa de ajuste para suportar CommonJS)
async function testarComReplicate() {
  try {
    console.log('🚀 Testando geração de corte com Replicate...\n');

    // Carregar imagem
    const imagemPath = path.join(process.env.USERPROFILE, 'Desktop', 'mascara', 'ee.jpeg');
    const imagemBuffer = fs.readFileSync(imagemPath);
    const imagemBase64 = 'data:image/jpeg;base64,' + imagemBuffer.toString('base64');

    console.log('✅ Imagem carregada:', imagemPath);
    console.log('   Tamanho:', Math.round(imagemBase64.length / 1024), 'KB\n');

    // Quiz data
    const quizData = {
      assimetria: 'lado esquerdo mais alto',
      biotipo: 'triangulo invertido',
      linhasRosto: 'retas',
      linhasCorpo: 'retas',
      tomPele: 'quente',
      usoFranja: 'não',
      comprimentoPreferido: 'médio'
    };

    console.log('📋 Quiz Data:', JSON.stringify(quizData, null, 2));

    // Validar chaves de API
    const anthropicKey = process.env.ANTHROPIC_API_KEY;
    const replicateToken = process.env.REPLICATE_API_TOKEN;

    if (!anthropicKey) {
      console.error('❌ ANTHROPIC_API_KEY não configurada');
      process.exit(1);
    }

    if (!replicateToken) {
      console.error('❌ REPLICATE_API_TOKEN não configurada');
      process.exit(1);
    }

    console.log('✅ Chaves de API encontradas\n');

    // PASSO 1: Gerar prompt com Claude
    console.log('🤖 Etapa 1: Gerando prompt visual com Claude...');

    const systemPrompt = `Você é um especialista em visagismo e análise facial.
Sua tarefa é converter os dados de análise facial em um PROMPT VISUAL SUPER DETALHADO
para gerar uma imagem com o corte de cabelo recomendado.

O prompt deve ser VISUAL, ESPECÍFICO e ACIONÁVEL para uma IA de geração de imagem.
Inclua:
- Nome do corte exato
- Comprimento (em cm ou comparação)
- Volume (onde colocar/tirar)
- Franja (descrição exata)
- Posicionamento de cabelo (qual lado jogar)
- Cor/tom sugerido
- Efeito visual esperado

Exemplo de bom prompt:
"Bob estruturado assimétrico, comprimento mentoniano, volume pronunciado nos ombros direito,
franja reta lateral esquerda até sobrancelha, linha diagonal acentuada, castanho mel com reflexos caramelo,
efeito limpo e profissional, rosto alongado visualmente"`;

    const userMessage = `Gere um PROMPT VISUAL para Inpainting baseado nestes dados:
Assimetria: ${quizData.assimetria}
Biotipo: ${quizData.biotipo}
Linhas do Rosto: ${quizData.linhasRosto}
Linhas do Corpo: ${quizData.linhasCorpo}
Tom de Pele: ${quizData.tomPele}
Uso de Franja: ${quizData.usoFranja}
Comprimento Preferido: ${quizData.comprimentoPreferido}

Retorne APENAS o prompt visual, sem explicações adicionais.`;

    const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': anthropicKey,
        'content-type': 'application/json',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-opus-4-1-20250805',
        max_tokens: 500,
        system: systemPrompt,
        messages: [{ role: 'user', content: userMessage }]
      })
    });

    if (!claudeResponse.ok) {
      const error = await claudeResponse.text();
      throw new Error(`Claude API error: ${claudeResponse.status} - ${error}`);
    }

    const claudeData = await claudeResponse.json();
    const promptCorte = claudeData.content[0].text;

    console.log('✅ Prompt gerado:');
    console.log('   ' + promptCorte.substring(0, 150) + '...\n');

    // PASSO 2: Enviar para Replicate Inpainting
    console.log('🎨 Etapa 2: Enviando para Replicate Inpainting...');

    const imagemLimpa = imagemBase64.includes('base64,')
      ? imagemBase64.split('base64,')[1]
      : imagemBase64;

    // Usar modelo Stable Diffusion 3
    const replicatePayload = {
      version: '45b83a23d9e327f8410a4894a3c0ef59cb9123676742a48141b67dffeb992bcd', // Stable Diffusion 3
      input: {
        prompt: promptCorte + ' woman with stylized haircut, professional hairstyle, modern',
        negative_prompt: 'ugly, blurry, distorted, bad quality, low res',
        num_inference_steps: 50,
        guidance_scale: 7.5
      }
    };

    const replicateResponse = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${replicateToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(replicatePayload)
    });

    if (!replicateResponse.ok) {
      const error = await replicateResponse.text();
      throw new Error(`Replicate error: ${replicateResponse.status} - ${error}`);
    }

    const replicateData = await replicateResponse.json();
    const predictionId = replicateData.id;

    console.log('✅ Requisição enviada ao Replicate');
    console.log('   Prediction ID:', predictionId);
    console.log('   Status:', replicateData.status);

    // PASSO 3: Fazer polling até ficar pronto
    console.log('\n⏳ Etapa 3: Aguardando geração de imagem (pode levar 1-2 minutos)...');

    let predictionStatus = replicateData.status;
    let attempts = 0;
    const maxAttempts = 120;

    while (predictionStatus !== 'succeeded' && predictionStatus !== 'failed' && attempts < maxAttempts) {
      await new Promise(r => setTimeout(r, 2000));
      attempts++;

      const statusResponse = await fetch(
        `https://api.replicate.com/v1/predictions/${predictionId}`,
        {
          headers: { 'Authorization': `Token ${replicateToken}` }
        }
      );

      const statusData = await statusResponse.json();
      predictionStatus = statusData.status;

      console.log(`   [${attempts}/${maxAttempts}] Status: ${predictionStatus}`);

      if (predictionStatus === 'succeeded' && statusData.output && statusData.output[0]) {
        console.log('\n✅ Imagem gerada com sucesso!');
        console.log('   URL:', statusData.output[0]);

        // Baixar a imagem
        console.log('\n📥 Baixando imagem...');
        const imageData = await fetch(statusData.output[0]);
        const imageBuffer = await imageData.arrayBuffer();
        const outputPath = path.join(__dirname, 'resultado-ee-replicate.jpg');
        fs.writeFileSync(outputPath, Buffer.from(imageBuffer));

        console.log('✅ Imagem salva:', outputPath);
        console.log('   Tamanho:', Math.round(imageBuffer.byteLength / 1024), 'KB');

        return;
      }

      if (predictionStatus === 'failed') {
        throw new Error(`Replicate generation failed: ${statusData.error}`);
      }
    }

    if (attempts >= maxAttempts) {
      throw new Error('Timeout aguardando geração da imagem');
    }

  } catch (erro) {
    console.error('\n❌ Erro:', erro.message);
    process.exit(1);
  }
}

testarComReplicate();
