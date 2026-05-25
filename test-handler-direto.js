#!/usr/bin/env node

/**
 * Teste direto do handler da API com novo System Prompt
 */

require('dotenv').config({ path: '.env.local' });

const fs = require('fs');
const path = require('path');
const Anthropic = require('@anthropic-ai/sdk').default;

async function testarHandlerDireto() {
  try {
    console.log('🚀 Testando handler da API direto com novo System Prompt\n');

    // Carregar imagem
    const imagemPath = path.join(process.env.USERPROFILE, 'Desktop', 'mascara', 'ee.jpeg');
    const imagemBuffer = fs.readFileSync(imagemPath);
    const imagemBase64 = 'data:image/jpeg;base64,' + imagemBuffer.toString('base64');

    console.log('✅ Imagem carregada: ee.jpeg');
    console.log('   Tamanho:', Math.round(imagemBase64.length / 1024), 'KB\n');

    // Quiz data
    const quizData = {
      assimetria: 'lado esquerdo mais alto',
      biotipo: 'triangulo invertido',
      linhasRosto: 'retas',
      linhasCorpo: 'retas',
      usoFranja: 'sim, porém rosto ficou mais largo',
      comprimentoPreferido: 'médio'
    };

    console.log('📋 Dados do Quiz:');
    Object.entries(quizData).forEach(([key, value]) => {
      console.log(`   ${key}: ${value}`);
    });
    console.log('');

    // System prompt (copiado do handler)
    const systemPrompt = `
╔══════════════════════════════════════════════════════════════════════════════╗
║                    MAGICFACE - SISTEMA DE VISAGISMO                          ║
║                  Framework de Análise Facial e Compensação Visual            ║
╚══════════════════════════════════════════════════════════════════════════════╝

VOCÊ É UM ESPECIALISTA EM VISAGISMO E ANÁLISE FACIAL.

Sua tarefa: Converter dados de quiz + análise em RECOMENDAÇÃO VISUAL DETALHADA para gerar imagem com corte ideal.

================================================================================
PARTE 1: CORTE PARA O ROSTO (usuária consigo mesma)
================================================================================

1. ASSIMETRIA FACIAL: qual lado está mais alto/baixo
   - Lado mais alto: jogar cabelo PARA esse lado (expõe lado baixo = equilibria)
   - Lado mais baixo: jogar cabelo PARA esse lado (expõe lado alto = afina)

2. FRANJA:
   - "Rosto ficou mais largo": compensar com GOLA medindo tamanho franja
   - "Rosto equilibra": cuidado com gola (não adicionar mesma linha que já existe)
   - "Nariz proeminente": jogar cabelo para lado (quebra linha vertical)
   - "Não usa": sem franja
   - "Gostaria": educar sobre efeitos

3. LINHAS DO ROSTO:
   - RETAS: usar CURVAS para quebrar rigidez
   - CURVAS: usar RETAS para contrastar
   - DIAGONAIS: usar RETAS ou DIAGONAIS estratégicas

4. COMPENSAÇÃO COM GOLA (CRÍTICO):
   - Rosto vai da testa até ONDE A GOLA DETERMINA (não só até queixo)
   - Gola U = curvas/quentes
   - Gola V = diagonais/dinâmicas
   - Gola quadrada = retas/frias
   - Conectar franja + gola em harmonia

================================================================================
PARTE 2: CORTE PARA O CORPO (como expectador a vê)
================================================================================

1. OBJETIVO: Levar corpo para formato AMPULHETA (ou não estragar se já tem)

2. LINHAS COMO SETAS:
   - HORIZONTAIS = expandem lateralmente
   - VERTICAIS = alongam
   - DIAGONAIS = dinamismo, movimento

3. DIREÇÕES DE CORTE (conforme comprimento e região):
   - RETO = linha horizontal, expande lateral
   - CONVEXO = curva arredondada
   - CÔNCAVO = curva para dentro (U), afunila

4. POR COMPRIMENTO:

   CABELO NA CINTURA:
   - Triângulo invertido: corte RETO (expande cintura) + cinto + roupa clara
   - Ou V/U com compensação luz/sombra
   - Pêra: cuidado com V/U (acentua cintura) - compensar com roupa
   - Retangular: V/U tira rigidez + cinto
   - Ampulheta: não estragar, evitar contrastes altos

   CABELO NO OMBRO:
   - Triângulo/Pêra com corte RETO = ampulheta (ombro largo pareça proporcional)
   - V/U acentua ombros largos = compensar com roupa

   CABELO LONGO (cobre cintura):
   - Ampulheta: adicionar MOVIMENTO (repicado, desfiado) para não occultar curvas
   - Evitar linha reta estática (fica rígida, perde sensualidade)

5. CABELO CURTO (não chega região a compensar):
   ❌ NÃO compensar com cabelo
   ✅ Compensar com ROUPA (luz/sombra)
   - Luz EXPANDE | Sombra RETRAI
   - Exemplo: Triângulo invertido = roupa clara embaixo, escura em cima

6. ENERGIA/PERSONALIDADE (todas as linhas transmitem):
   - DIAGONAIS: dinamismo, extroversão
   - RETAS/COMPACTAS: seriedade, foco
   - ONDULADAS: romance, sensualidade, lirismo, delicadeza

================================================================================
INSTRUÇÕES FINAIS PARA GERAR PROMPT VISUAL
================================================================================

Gere uma DESCRIÇÃO VISUAL SUPER DETALHADA para inpainting que inclua:

1. Descrever exatamente qual corte: direção, comprimento por região, movimento
2. Posicionamento de cabelo: qual lado jogar cabelo
3. Volume: onde colocar/tirar
4. Franja: se tem, qual tipo, qual tamanho
5. Linhas/formas: quentes/frias/dinâmicas conforme análise
6. Efeito visual esperado: como ficar equilibrada/alongada/estruturada

O prompt DEVE SER VISUAL E ACIONÁVEL (IA consegue gerar imagem a partir disso).
Retorne APENAS o prompt, sem explicações adicionais.
`;

    const userMessage = `DADOS DA USUÁRIA:
- Assimetria: ${quizData.assimetria}
- Biotipo: ${quizData.biotipo}
- Linhas Rosto: ${quizData.linhasRosto}
- Linhas Corpo: ${quizData.linhasCorpo}
- Franja: ${quizData.usoFranja}
- Comprimento: ${quizData.comprimentoPreferido}

APLICAR REGRAS DO FRAMEWORK (em ordem):

=== PASSO 1: ANÁLISE ROSTO ===
1. Assimetria: "${quizData.assimetria}"
   → Jogar cabelo PARA O LADO MAIS ALTO (expõe o lado mais baixo = equilibra)

2. Franja: "${quizData.usoFranja}"
   → Se "rosto ficou mais largo": NÃO usar franja OU usar com compensação de gola
   → Se SIM: compensar com gola (U/V/quadrada conforme linhas do rosto)

3. Linhas Rosto: "${quizData.linhasRosto}"
   → Se RETAS: usar CURVAS no corte para quebrar rigidez
   → Se CURVAS: usar RETAS para contrastar
   → Determinar gola: para RETAS use gola quadrada/fria

=== PASSO 2: ANÁLISE CORPO ===
1. Biotipo: "${quizData.biotipo}"
2. Comprimento: "${quizData.comprimentoPreferido}"
3. Aplicar regra específica DO COMPRIMENTO para esse biotipo
4. Linhas Corpo: "${quizData.linhasCorpo}" (retas) → adicionar curvas/diagonais para movimento

=== PASSO 3: GERAR PROMPT VISUAL ===
Retorne UM ÚNICO prompt descritivo (em PORTUGUÊS) que inclua:
- Direção exata do corte (qual lado, qual lado mais curto)
- Comprimento por região (nuca, comprimento, frente)
- Qual tipo de linha (reto/convexo/côncavo)
- Posicionamento de cabelo (qual lado jogar)
- Volume (onde concentrar)
- Franja (sim/não/tipo)
- Efeito esperado (equilibrada/afina/expande onde precisa)

RESTRIÇÕES:
1. Aplicar RIGOROSAMENTE as regras do framework. Sem improvisações.
2. GERAR EM PORTUGUÊS BRASILEIRO.
3. Descrever para IA de inpainting conseguir desenhar o corte exato.`;

    console.log('🤖 Chamando Claude Opus 4.1 com novo System Prompt...\n');

    const client = new Anthropic();

    const response = await client.messages.create({
      model: 'claude-opus-4-1-20250805',
      max_tokens: 800,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: userMessage
        }
      ]
    });

    const promptGerado = response.content[0].type === 'text' ? response.content[0].text : '';

    console.log('═══════════════════════════════════════════════════════════════\n');
    console.log('✅ SUCESSO! Prompt gerado pelo novo System Prompt:\n');
    console.log('═══════════════════════════════════════════════════════════════\n');
    console.log(promptGerado);
    console.log('\n═══════════════════════════════════════════════════════════════\n');

    // Análise do resultado
    console.log('📊 ANÁLISE DO RESULTADO:\n');

    const prompt = promptGerado.toLowerCase();

    const checks = [
      {
        label: 'Mencionou assimetria / lado esquerdo',
        match: prompt.includes('esquerdo') || prompt.includes('lado mais alto') || prompt.includes('assimetria'),
        peso: '🔴 CRÍTICO'
      },
      {
        label: 'Mencionou triângulo invertido / ombros',
        match: prompt.includes('triângulo invertido') || prompt.includes('ombros') || prompt.includes('ombro largo'),
        peso: '🔴 CRÍTICO'
      },
      {
        label: 'Mencionou compensação de cintura',
        match: prompt.includes('cintura') || prompt.includes('quadril') || prompt.includes('expansão'),
        peso: '🔴 CRÍTICO'
      },
      {
        label: 'Mencionou franja e compensação com gola',
        match: prompt.includes('franja') && (prompt.includes('gola') || prompt.includes('compensar')),
        peso: '🟡 IMPORTANTE'
      },
      {
        label: 'Mencionou linhas retas (rosto + corpo)',
        match: prompt.includes('reta') || prompt.includes('reto') || prompt.includes('estrutura'),
        peso: '🟡 IMPORTANTE'
      },
      {
        label: 'Mencionou posicionamento/jogar cabelo',
        match: prompt.includes('jogar') || prompt.includes('posicionar') || prompt.includes('lado'),
        peso: '🟢 NORMAL'
      },
      {
        label: 'Mencionou volume e comprimento',
        match: prompt.includes('volume') || prompt.includes('comprimento'),
        peso: '🟢 NORMAL'
      },
      {
        label: 'Mencionou efeito visual esperado',
        match: prompt.includes('equilibr') || prompt.includes('afin') || prompt.includes('alongad'),
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

    if (passedChecks >= 6) {
      console.log('🎉 Sistema de Visagismo funcionando EXCELENTEMENTE!');
      console.log('✨ O novo framework de visagismo está sendo aplicado corretamente!');
    } else if (passedChecks >= 5) {
      console.log('✅ Sistema funcionando muito bem!');
    } else if (passedChecks >= 4) {
      console.log('⚠️  Sistema funciona, mas alguns elementos precisam ser melhorados');
    } else {
      console.log('❌ Sistema precisa de ajustes');
    }

  } catch (erro) {
    console.error('\n❌ Erro:', erro.message);
    process.exit(1);
  }
}

testarHandlerDireto();
