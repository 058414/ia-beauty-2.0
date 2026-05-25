#!/usr/bin/env node

/**
 * Teste da API de Geração de Corte com imagem ee.jpeg
 */

const fs = require('fs');
const path = require('path');

async function testarGeracaoCorte() {
  try {
    // Carregar imagem ee.jpeg
    const imagemPath = path.join(process.env.USERPROFILE, 'Desktop', 'mascara', 'ee.jpeg');
    const imagemBuffer = fs.readFileSync(imagemPath);
    const imagemBase64 = 'data:image/jpeg;base64,' + imagemBuffer.toString('base64');

    console.log('📸 Imagem carregada:', imagemPath);
    console.log('📊 Tamanho:', Math.round(imagemBase64.length / 1024), 'KB');

    // Dados do quiz para teste
    const quizData = {
      assimetria: 'lado esquerdo mais alto',
      biotipo: 'triangulo invertido',
      linhasRosto: 'retas',
      linhasCorpo: 'retas',
      tomPele: 'quente',
      usoFranja: 'não',
      comprimentoPreferido: 'médio'
    };

    // Chamar a API local (se estiver rodando) ou a de produção
    const apiUrl = process.env.API_URL || 'http://localhost:3001/api/gerarCorteVisual';

    console.log('\n🚀 Chamando API:', apiUrl);
    console.log('📋 Quiz:', quizData);

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
      const errorText = await response.text();
      throw new Error(`Erro ${response.status}: ${errorText}`);
    }

    const resultado = await response.json();

    if (resultado.sucesso) {
      console.log('\n✅ Sucesso!');
      console.log('📊 Prompt usado:', resultado.promptUsado.substring(0, 200) + '...');

      // Salvar imagem gerada
      if (resultado.imagemCorteRecomendado) {
        const imagemGerada = resultado.imagemCorteRecomendado.split('base64,')[1];
        const caminhoSaida = path.join(__dirname, 'resultado-ee.jpg');
        fs.writeFileSync(caminhoSaida, imagemGerada, 'base64');
        console.log('💾 Imagem salva:', caminhoSaida);
      }
    } else {
      console.log('❌ Erro:', resultado.erro);
      console.log('Detalhes:', resultado.detalhes);
    }

  } catch (erro) {
    console.error('❌ Erro ao testar:', erro.message);
    process.exit(1);
  }
}

testarGeracaoCorte();
