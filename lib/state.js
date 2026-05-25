/**
 * STATE.JS — Gerenciamento de Estado Compartilhado
 * Cada quadrante lê/escreve no state via funções
 */

const state = {
  rosto: {
    assimetria: null,          // "analisada" ou null (novo fluxo não exige resposta)
    educacaoCompleta: false,   // flag para Q1 finalizado
    imagens: {
      meiaEsquerda: null,      // dataURL
      original: null,          // dataURL
      meiaDireita: null        // dataURL
    }
  },
  corpo: {
    biotipo: null,            // "retangulo" | "pera" | "triangulo_inv" | "ampulheta" | "oval"
    linhasCorpo: null,        // "retas" | "curvas" | "mistura"
    comprimentoPreferido: null, // "curto" | "medio" | "longo"
    franja: null              // "sim" | "nao" | "gostaria"
  },
  recomendacao: {
    texto: null,
    pdfUrl: null
  }
};

// API para ler/escrever no state
function atualizarRosto(dados) {
  Object.assign(state.rosto, dados);
  atualizarStatusBadge(1);
  console.log('Rosto atualizado:', state.rosto);
}

function atualizarCorpo(dados) {
  Object.assign(state.corpo, dados);
  atualizarStatusBadge(2);
  console.log('Corpo atualizado:', state.corpo);
}

function atualizarRecomendacao(dados) {
  Object.assign(state.recomendacao, dados);
  atualizarStatusBadge(3);
  console.log('Recomendação atualizada:', state.recomendacao);
}

function obterState() {
  return state;
}

function lerRosto() {
  return state.rosto;
}

function lerCorpo() {
  return state.corpo;
}

function lerRecomendacao() {
  return state.recomendacao;
}

// Verificar se Q1 e Q2 estão completos
function estaCompletoQ1() {
  return state.rosto.educacaoCompleta && state.rosto.imagens.original !== null;
}

function estaCompletoQ2() {
  return state.corpo.biotipo !== null && state.corpo.linhasCorpo !== null;
}

function podeAbrirQ3() {
  return estaCompletoQ1() && estaCompletoQ2();
}

// Atualizar badges de status
function atualizarStatusBadge(numQuadrante) {
  const badge = document.getElementById(`status-q${numQuadrante}`);
  if (!badge) return;

  if (numQuadrante === 1) {
    badge.textContent = estaCompletoQ1() ? 'Completo' : 'Em progresso';
    badge.className = 'status-badge ' + (estaCompletoQ1() ? 'completo' : 'em-progresso');
  } else if (numQuadrante === 2) {
    badge.textContent = estaCompletoQ2() ? 'Completo' : 'Em progresso';
    badge.className = 'status-badge ' + (estaCompletoQ2() ? 'completo' : 'em-progresso');
  } else if (numQuadrante === 3) {
    const btn = document.getElementById('btn-q3');
    if (podeAbrirQ3()) {
      badge.textContent = 'Disponível';
      badge.className = 'status-badge em-progresso';
      btn.disabled = false;
    }
  }
}

// Inicializar ao carregar
document.addEventListener('DOMContentLoaded', () => {
  atualizarStatusBadge(1);
  atualizarStatusBadge(2);
  atualizarStatusBadge(3);
});
