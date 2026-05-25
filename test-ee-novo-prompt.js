#!/usr/bin/env node

/**
 * Teste da API com novo System Prompt de Visagismo
 * Usando ee.jpeg como teste
 */

require('dotenv').config({ path: '.env.local' });

const fs = require('fs');
const path = require('path');

async function testarNovoPrompt() {
  try {
    console.log('🚀 Testando novo System Prompt de Visagismo\n');

    // Carregar imagem ee.jpeg
    const imagemPath = path.join(process.env.USERPROFILE, 'Desktop', 'mascara', 'ee.jpeg');
    const imagemBuffer = fs.readFileSync(imagemPath);
    const imagemBase64 = 'data:image/jpeg;base64,' + imagemBuffer.toString('base64');

    console.log('✅ Imagem carregada: ee.jpeg');
    console.log('   Tamanho:', Math.round(imagemBase64.length / 1024), 'KB\n');

    // Quiz data (exemplo com diferentes características para testar visagismo)
    const quizData = {
      assimetria: 'lado esquerdo mais alto',
      biotipo: 'triangulo invertido',
      linhasRosto: 'retas',
      linhasCorpo: 'retas',
      tomPele: 'quente',
      usoFranja: 'sim, porém rosto ficou mais largo',
      comprimentoPreferido: 'médio'
    };

    console.log('📋 Dados do Quiz:');
    console.log('   Assimetria:', quizData.assimetria);
    console.log('   Biotipo:', quizData.biotipo);
    console.log('   Linhas Rosto:', quizData.linhasRosto);
    console.log('   Linhas Corpo:', quizData.linhasCorpo);
    console.log('   Franja:', quizData.usoFranja);
    console.log('   Comprimento:', quizData.comprimentoPreferido);
    console.log('');

    // Testar endpoint
    const apiUrl = 'http://localhost:3001/api/gerarCorteVisual';

    console.log('🔗 Chamando endpoint:', apiUrl);
    console.log('⏳ Aguardando resposta de Claude...\n');

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fotoOriginal: imagemBase64,
        quiz: quizData
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Erro ${response.status}: ${error}`);
    }

    const resultado = await response.json();

    console.log('═══════════════════════════════════════════════════════════════\n');
    console.log('✅ SUCESSO! Prompt gerado pelo novo System Prompt:\n');
    console.log('═══════════════════════════════════════════════════════════════\n');
    console.log(resultado.promptUsado);
    console.log('\n═══════════════════════════════════════════════════════════════\n');

    console.log('📊 ANÁLISE DO RESULTADO:\n');

    const prompt = resultado.promptUsado.toLowerCase();

    // Verificar se está aplicando as regras corretas
    const checks = [
      {
        label: 'Mencionou assimetria (lado esquerdo mais alto)',
        match: prompt.includes('esquerdo') || prompt.includes('lado mais alto'),
        peso: '🔴 CRÍTICO'
      },
      {
        label: 'Mencionou triângulo invertido',
        match: prompt.includes('triângulo invertido') || prompt.includes('ombros') || prompt.includes('cintura'),
        peso: '🔴 CRÍTICO'
      },
      {
        label: 'Mencionou linhas retas (rosto + corpo)',
        match: prompt.includes('reta') || prompt.includes('reto'),
        peso: '🟡 IMPORTANTE'
      },
      {
        label: 'Mencionou compensação de rosto largo',
        match: prompt.includes('franja') || prompt.includes('gola'),
        peso: '🟡 IMPORTANTE'
      },
      {
        label: 'Mencionou compensação de corpo',
        match: prompt.includes('cintura') || prompt.includes('quadril') || prompt.includes('ombros'),
        peso: '🟢 NORMAL'
      },
      {
        label: 'Mencionou posicionamento de cabelo',
        match: prompt.includes('jogar') || prompt.includes('posicionar') || prompt.includes('lado'),
        peso: '🟢 NORMAL'
      }
    ];

    let totalChecks = 0;
    let passedChecks = 0;

    checks.forEach(check => {
      const symbol = check.match ? '✅' : '❌';
      console.log(`${symbol} ${check.label}`);
      console.log(`   ${check.peso}`);
      if (check.match) passedChecks++;
      totalChecks++;
    });

    console.log(`\n📈 Score: ${passedChecks}/${totalChecks} checks passou\n`);

    if (passedChecks === totalChecks) {
      console.log('🎉 Sistema de Visagismo funcionando PERFEITAMENTE!');
    } else if (passedChecks >= totalChecks - 1) {
      console.log('✅ Sistema funcionando bem, alguns detalhes podem ser melhorados');
    } else {
      console.log('⚠️  Sistema precisa de ajustes');
    }

  } catch (erro) {
    console.error('\n❌ Erro ao testar:', erro.message);
    process.exit(1);
  }
}

testarNovoPrompt();
