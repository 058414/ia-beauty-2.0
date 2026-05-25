/**
 * ANALISADOR DE ASSIMETRIA — Detecta qual lado é mais alto/baixo
 * Usa landmarks do MediaPipe para análise precisa
 */

function analisarAssimetria(landmarks) {
  if (!landmarks || landmarks.length === 0) {
    return { lado_alto: null, lado_baixo: null, diferenca: 0 };
  }

  // Pontos-chave para análise
  // Sobrancelha esquerda e direita
  const sobrancelha_esq_y = landmarks[70]?.y || 0; // Sobrancelha esquerda
  const sobrancelha_dir_y = landmarks[300]?.y || 0; // Sobrancelha direita

  // Maçãs
  const maca_esq_y = landmarks[206]?.y || 0; // Maçã esquerda
  const maca_dir_y = landmarks[426]?.y || 0; // Maçã direita

  // Queixo
  const queixo_esq_y = landmarks[136]?.y || 0; // Canto esquerdo do queixo
  const queixo_dir_y = landmarks[365]?.y || 0; // Canto direito do queixo

  // Calcular a média de altura de cada lado
  // NOTA: em MediaPipe, Y = 0 está no topo, Y = 1 está embaixo
  // Lado esquerdo do rosto = índices menores
  // Lado direito do rosto = índices maiores

  const altura_esq = (sobrancelha_esq_y + maca_esq_y + queixo_esq_y) / 3;
  const altura_dir = (sobrancelha_dir_y + maca_dir_y + queixo_dir_y) / 3;

  const diferenca = Math.abs(altura_esq - altura_dir);
  const diferenca_percentual = (diferenca * 100).toFixed(1);

  // Determinar qual lado é mais alto
  // Se Y é menor, está mais alto na imagem
  let lado_alto, lado_baixo;

  if (altura_esq < altura_dir) {
    lado_alto = 'esquerdo';
    lado_baixo = 'direito';
  } else if (altura_dir < altura_esq) {
    lado_alto = 'direito';
    lado_baixo = 'esquerdo';
  } else {
    lado_alto = 'equilibrado';
    lado_baixo = 'equilibrado';
  }

  return {
    lado_alto,
    lado_baixo,
    diferenca: diferenca_percentual,
    altura_esq,
    altura_dir
  };
}

/**
 * Gera a análise em texto para exibir à usuária
 */
function gerarTextoAnalise(assimetria) {
  if (assimetria.lado_alto === 'equilibrado') {
    return `Sua assimetria facial é muito sutil — seu rosto está bem equilibrado!`;
  }

  const lado_alto_port = assimetria.lado_alto === 'esquerdo' ? 'esquerdo' : 'direito';
  const lado_baixo_port = assimetria.lado_baixo === 'esquerdo' ? 'esquerdo' : 'direito';

  return `Percebemos que seu lado <strong>${lado_alto_port}</strong> é mais alto e seu lado <strong>${lado_baixo_port}</strong> é mais baixo.`;
}
