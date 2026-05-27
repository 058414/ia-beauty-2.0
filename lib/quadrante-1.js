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
  alert('TESTE: abrirQuadrante1 foi chamado!');
  console.log('🎥 abrirQuadrante1 foi chamado!');
  q1State.etapa = 'camera';
  const conteudo = document.getElementById('conteudo-q1');

  let statusDiv = `<div style="padding: 40px; text-align: center; color: #aaa;">
    <h3 style="color: #E85D9F; margin-bottom: 20px;">📸 Abrindo câmera...</h3>
    <p style="font-size: 0.85rem; color: #888; margin-bottom: 20px;">DEBUG: Função iniciada</p>
    <div id="camera-status" style="margin: 20px 0; font-size: 0.95rem; line-height: 1.8;">
      <p id="status-1">⏳ Inicializando...</p>
      <p id="status-2" style="opacity: 0.5;">⏳ Carregando MediaPipe...</p>
      <p id="status-3" style="opacity: 0.5;">⏳ Pronto!</p>
    </div>
  </div>`;

  conteudo.innerHTML = statusDiv;

  try {
    await iniciarCameraQ1();
  } catch (err) {
    console.error('Erro ao abrir câmera:', err);
    console.error('Erro detalhado - Nome:', err.name, '| Mensagem:', err.message);
    conteudo.innerHTML = `<div style="padding: 40px; text-align: center; color: #ff6b6b;">
      <h3>❌ Erro ao abrir câmera</h3>
      <p><strong>${err.name || 'Erro'}:</strong> ${err.message || 'Câmera não disponível'}</p>
      <p style="color: #aaa; font-size: 0.9rem; margin-top: 15px;">
        Possíveis causas:<br>
        • Celular: use HTTPS ou localhost<br>
        • Permissão: autorize acesso à câmera<br>
        • Navegador: compatibilidade limitada
      </p>
      <button class="quadrante-btn" onclick="fecharCameraQ1()" style="margin-top: 20px;">← Voltar</button>
    </div>`;
  }
}

/**
 * ETAPA 1: Após captura → Exibe meias-faces com ancestralidade
 */
function exibirMeiasFaces(fotoOriginal, meiaEsquerda, meiaDireita) {
  q1State.etapa = 'meias-faces';
  q1State.fotoOriginal = fotoOriginal;
  q1State.meiaEsquerda = meiaEsquerda;
  q1State.meiaDireita = meiaDireita;

  // Armazenar em usuariaData global (que Q4 pode acessar)
  usuariaData.rosto = {
    fotoOriginal: fotoOriginal,
    meiaEsquerda: meiaEsquerda,
    meiaDireita: meiaDireita
  };

  // Marcar Q1 como tendo capturado foto (simples flag)
  usuariaData.q1FotoCaptured = true;

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
