/**
 * QUADRANTE 1: ROSTO — Orquestrador do Fluxo Completo
 * Fluxo: Câmera → Meias-faces + Ancestralidade → Análise → Formato → Desconforto → Educação
 */

let q1State = {
  etapa: 'nome',
  nome: null,
  fotoOriginal: null,
  meiaEsquerda: null,
  meiaDireita: null,
  assimetria: null,
  formato: null,
  desconforto: null
};

async function abrirQuadrante1() {
  q1State.etapa = 'camera';
  const conteudo = document.getElementById('conteudo-q1');
  conteudo.innerHTML = '<p style="text-align: center; color: #aaa; padding: 40px;">Preparando câmera...</p>';

  setTimeout(async () => {
    await iniciarCameraQ1();
  }, 300);
}

/**
 * ETAPA 1: Após captura → Exibe meias-faces com ancestralidade
 */
function exibirMeiasFaces(fotoOriginal, meiaEsquerda, meiaDireita) {
  q1State.etapa = 'meias-faces';
  q1State.fotoOriginal = fotoOriginal;
  q1State.meiaEsquerda = meiaEsquerda;
  q1State.meiaDireita = meiaDireita;

  const conteudo = document.getElementById('conteudo-q1');
  conteudo.innerHTML = `
    <div style="text-align: center; margin-bottom: 20px;">
      <h3 style="color: #E85D9F; margin-bottom: 30px;">✓ Foto Capturada!</h3>
      ${gerarTelaMeiasFacesComAncestralidade(meiaEsquerda, fotoOriginal, meiaDireita)}
    </div>
  `;
}

/**
 * ETAPA 2: Exibe análise de assimetria
 */
function irParaAnaliseAssimetria() {
  q1State.etapa = 'analise';
  const conteudo = document.getElementById('conteudo-q1');

  conteudo.innerHTML = '<p style="text-align: center; color: #aaa; padding: 40px;">Analisando seu rosto...</p>';

  setTimeout(() => {
    const assimetria = analisarAssimetria(cameraState.landmarks || []);
    q1State.assimetria = assimetria;

    // Atualizar estado global
    usuariaData.assimetria = {
      lado_alto: assimetria.lado_alto,
      lado_baixo: assimetria.lado_baixo,
      diferenca: assimetria.diferenca
    };

    conteudo.innerHTML = gerarTelaAnaliseAssimetria(assimetria);
  }, 800);
}

/*
 * REMOVIDO: irParaPerguntaFormato() e responderFormato()
 * Essas funções faziam parte do fluxo antigo
 * As perguntas foram movidas para ANTES da câmera
 */

/**
 * ETAPA: Ir para educação final (dados já vêm do HTML/usuariaData)
 */
function irParaEducacaoFinal() {
  q1State.formato = usuariaData.formato;
  q1State.desconforto = usuariaData.desconforto;
  q1State.etapa = 'protocolo';
  const conteudo = document.getElementById('conteudo-q1');
  conteudo.innerHTML = gerarTelaEducacaoCompleta(q1State.assimetria, q1State.formato, q1State.desconforto);
}

/**
 * Finalizar Q1 → Ir para Reflexão SER vs ESTAR
 */
function finalizarQ1() {
  // Em vez de fechar, abre a reflexão
  q1State.etapa = 'reflexao';
  iniciarReflexaoSerEstar();
}

/**
 * Fechar câmera
 */
function fecharCameraQ1() {
  pararCamera();
  fecharPainel(1);
}
