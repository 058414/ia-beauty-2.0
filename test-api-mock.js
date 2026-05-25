#!/usr/bin/env node

/**
 * Teste MOCK da API gerarCorteVisual
 * Simula respostas do Claude e Replicate
 */

const fs = require('fs');

// Simular resposta do Claude
async function mockClaudePrompt(quiz) {
  console.log('  🤖 [MOCK] Claude Opus processando...');
  return `Bob estruturado assimétrico com comprimento mentoniano, volume pronunciado nos ombros ${
    quiz.assimetria === 'lado_direito_mais_alto' ? 'esquerdo' : 'direito'
  }, franja reta lateral, castanho mel com reflexos caramelo para tom de pele ${
    quiz.tomPele
  }, efeito alongado e equilibrado.`;
}

// Simular resposta do Replicate Inpainting
async function mockReplicateInpainting(promptCorte) {
  console.log('  🎨 [MOCK] Replicate Inpainting processando...');

  // Simular um delay de processamento
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Retornar uma URL fake de imagem (como se Replicate tivesse gerado)
  return 'https://example.com/generated-image-with-haircut-1234567890.png';
}

// Handler da API com mocks
async function gerarCorteVisualMock(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ erro: 'Método não permitido' });
  }

  try {
    const { fotoOriginal, quiz } = req.body;

    if (!fotoOriginal || !quiz) {
      return res.status(400).json({
        erro: 'Parâmetros faltando: fotoOriginal e quiz são obrigatórios',
      });
    }

    console.log('📸 Processando corte visual para:', quiz.biotipo, quiz.assimetria);

    // PASSO 1: Gerar prompt com Claude (mock)
    const promptCorte = await mockClaudePrompt(quiz);
    console.log('✅ Prompt gerado:', promptCorte.substring(0, 80) + '...');

    // PASSO 2: Chamar Replicate Inpainting (mock)
    const imagemGerada = await mockReplicateInpainting(promptCorte);
    console.log('✅ Imagem gerada!');

    // PASSO 3: Retornar resultado
    return res.status(200).json({
      sucesso: true,
      imagemCorteRecomendado: imagemGerada,
      promptUsado: promptCorte,
      simulado: true,
      mensagem: '⚠️ Esta é uma resposta SIMULADA. Em produção, usará Claude + Replicate reais.'
    });
  } catch (erro) {
    console.error('❌ Erro:', erro);
    return res.status(500).json({
      erro: 'Erro ao gerar corte visual',
      detalhes: erro.message,
    });
  }
}

// ===== TESTE =====
async function rodarTeste() {
  console.log('\n' + '='.repeat(70));
  console.log('🧪 TESTE MOCK: /api/gerarCorteVisual');
  console.log('='.repeat(70) + '\n');

  // Dados de teste
  const quizTeste = {
    assimetria: 'lado_direito_mais_alto',
    biotipo: 'pera',
    linhasRosto: 'curvas',
    linhasCorpo: 'curvas',
    tomPele: 'quente',
    usoFranja: 'sim_equilibra',
    comprimentoPreferido: 'medio'
  };

  console.log('📋 Dados do quiz:');
  console.log(JSON.stringify(quizTeste, null, 2));
  console.log('');

  // Imagem fake (PNG 1x1 pixels em base64)
  const imagemFake = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

  console.log('📸 Foto original: 1x1 px (fake)');
  console.log('');

  // Simular req/res
  const req = {
    method: 'POST',
    body: {
      fotoOriginal: imagemFake,
      quiz: quizTeste
    }
  };

  const res = {
    statusCode: null,
    headers: {},
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    setHeader(key, value) {
      this.headers[key] = value;
      return this;
    },
    json(data) {
      this.body = data;
      return this;
    },
    end() {
      return this;
    }
  };

  console.log('🚀 Processando requisição...\n');

  try {
    await gerarCorteVisualMock(req, res);

    console.log('\n' + '='.repeat(70));
    console.log('✅ RESULTADO DA API');
    console.log('='.repeat(70));
    console.log('Status:', res.statusCode);
    console.log('');

    if (res.body) {
      console.log('Sucesso:', res.body.sucesso);
      console.log('Imagem gerada:', res.body.imagemCorteRecomendado);
      console.log('');
      console.log('Prompt usado:');
      console.log('  ' + res.body.promptUsado);
      console.log('');
      console.log('Nota:', res.body.mensagem);
    }

    console.log('\n' + '='.repeat(70));
    console.log('🎉 TESTE CONCLUÍDO COM SUCESSO!');
    console.log('='.repeat(70) + '\n');

  } catch (erro) {
    console.error('❌ Erro:', erro.message);
    process.exit(1);
  }
}

rodarTeste();
