#!/usr/bin/env node

/**
 * Gera imagem com corte simulado usando Canvas
 * Para testes locais do MagicFace
 */

const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

async function gerarImagemComCorte(imagemOriginalPath, tipoCorte = 'bob-assimetrico') {
  try {
    console.log('🎨 Gerando imagem com corte simulado...');

    // Carregar imagem original
    const img = await loadImage(imagemOriginalPath);
    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');

    // Desenhar imagem original
    ctx.drawImage(img, 0, 0);

    // Aplicar efeito visual de corte (sombreado nos lados para simular volume)
    // Isso cria uma ilusão visual de corte diferente
    const gradient = ctx.createLinearGradient(0, 0, img.width, 0);
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0.15)');
    gradient.addColorStop(0.2, 'rgba(0, 0, 0, 0)');
    gradient.addColorStop(0.8, 'rgba(0, 0, 0, 0)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0.15)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, img.width, img.height);

    // Adicionar marca visual no topo (simulando franja/corte)
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 3;
    ctx.globalAlpha = 0.3;
    ctx.beginPath();
    ctx.moveTo(0, img.height * 0.15);
    ctx.quadraticCurveTo(img.width / 2, img.height * 0.08, img.width, img.height * 0.15);
    ctx.stroke();
    ctx.globalAlpha = 1;

    // Converter para base64
    const buffer = canvas.toBuffer('image/jpeg', { quality: 0.85 });
    const base64 = buffer.toString('base64');

    console.log('✅ Imagem gerada!');
    return 'data:image/jpeg;base64,' + base64;

  } catch (erro) {
    console.error('❌ Erro ao gerar imagem:', erro.message);
    throw erro;
  }
}

module.exports = { gerarImagemComCorte };
