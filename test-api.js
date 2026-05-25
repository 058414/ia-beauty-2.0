#!/usr/bin/env node

/**
 * Script de teste para /api/gerarCorteVisual
 *
 * Uso:
 * 1. Copie .env.local.example para .env.local e preencha as chaves
 * 2. Rode: node test-api.js
 */

require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');

async function testarAPI() {
  console.log('🧪 Testando /api/gerarCorteVisual\n');

  // Verificar variáveis de ambiente
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('❌ ANTHROPIC_API_KEY não configurada');
    console.log('   Crie um arquivo .env.local com:');
    console.log('   ANTHROPIC_API_KEY=sua_chave_aqui');
    process.exit(1);
  }

  if (!process.env.REPLICATE_API_TOKEN) {
    console.error('❌ REPLICATE_API_TOKEN não configurada');
    console.log('   Crie um arquivo .env.local com:');
    console.log('   REPLICATE_API_TOKEN=seu_token_aqui');
    process.exit(1);
  }

  console.log('✅ Variáveis de ambiente configuradas\n');

  // Dados de teste
  const quizTeste = {
    assimetria: "lado_direito_mais_alto",
    biotipo: "pera",
    linhasRosto: "curvas",
    linhasCorpo: "curvas",
    tomPele: "quente",
    usoFranja: "sim_equilibra",
    comprimentoPreferido: "medio"
  };

  console.log('📋 Dados de teste do quiz:');
  console.log(JSON.stringify(quizTeste, null, 2));
  console.log('\n');

  // Criar uma imagem de teste (PNG mínimo em base64)
  // Usando uma imagem genérica pequena para não sobrecarregar
  const imagemTeste = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

  const payload = {
    fotoOriginal: imagemTeste,
    quiz: quizTeste
  };

  console.log('🚀 Enviando requisição para /api/gerarCorteVisual...\n');

  try {
    // Importar o handler direto
    const handler = require('./api/gerarCorteVisual.js').default;

    // Simular req/res
    const req = {
      method: 'POST',
      body: payload
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

    await handler(req, res);

    console.log('\n✅ Resposta da API:');
    console.log('Status:', res.statusCode);
    console.log('Body:', JSON.stringify(res.body, null, 2));

    if (res.statusCode === 200) {
      console.log('\n🎉 Sucesso! Imagem gerada com o corte recomendado');
      if (res.body.imagemCorteRecomendado) {
        console.log('   Tipo: URL remota de imagem');
        console.log('   Prompt usado:', res.body.promptUsado.substring(0, 100) + '...');
      }
    } else {
      console.log('\n❌ Erro na API');
    }

  } catch (erro) {
    console.error('\n❌ Erro ao testar:', erro.message);
    console.error(erro.stack);
    process.exit(1);
  }
}

testarAPI();
