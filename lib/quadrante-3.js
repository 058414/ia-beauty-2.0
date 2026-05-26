/**
 * QUADRANTE 3: CORPO — Exploração Educacional de Biotipos & Linhas
 * Fluxo: Intro → Explorar Biotipos → Explorar 3 Regiões → Perguntas → Síntese
 */

let q3State = {
  etapa: 'intro',
  biotipo: null,
  linhasCorpo: null,
  comprimento: null,
  franja: null
};

function abrirQuadrante3() {
  q3State.etapa = 'intro';
  const conteudo = document.getElementById('conteudo-q3');
  const nome = usuariaData.nome || 'você';
  conteudo.innerHTML = `
    <div style="max-width: 800px; margin: 40px auto;">
      <h2 style="color: #E85D9F; font-size: 1.5rem; margin-bottom: 20px; text-align: center;">
        💃 ${nome}, Seu Corpo — Como Linhas & Biotipos Guiam o Corte
      </h2>

      <p style="color: #ccc; font-size: 1.1rem; line-height: 1.8; margin-bottom: 30px; text-align: center;">
        O cabelo não flutua no vácuo. Ele é parte de um sistema visual integrado com seu corpo.
      </p>

      <div style="background: rgba(196, 151, 58, 0.1); border-left: 4px solid #C4973A; padding: 25px; border-radius: 12px; margin-bottom: 30px;">
        <h3 style="color: #C4973A; margin-bottom: 15px;">💡 O Conceito de Biotipos</h3>
        <p style="color: #ddd; line-height: 1.8;">
          Seu corpo tem uma forma. Essa forma — a relação entre ombros, cintura e quadril — cria uma "silhueta".
        </p>
        <p style="color: #ccc; line-height: 1.8; margin-top: 12px;">
          Um cabelo que funciona não "luta" contra sua silhueta. Trabalha COM ela. Amplifica o que é bom, equilibra o que precisa ser equilibrado.
        </p>
      </div>

      <div style="background: rgba(109, 213, 237, 0.1); border-left: 4px solid #6DD5ED; padding: 25px; border-radius: 12px; margin-bottom: 30px;">
        <h3 style="color: #6DD5ED; margin-bottom: 15px;">⚡ As 3 Regiões do Corpo</h3>
        <p style="color: #ddd; line-height: 1.8;">
          Seu corpo funciona em 3 regiões visuais que o cabelo pode amplificar ou atenuar:
        </p>
        <ul style="color: #ccc; line-height: 2; margin-left: 20px; margin-top: 12px;">
          <li><strong>Ombros</strong> — Onde começa a silhueta</li>
          <li><strong>Cintura</strong> — Onde concentra volume ou define transição</li>
          <li><strong>Quadril</strong> — Onde termina a silhueta</li>
        </ul>
        <p style="color: #aaa; font-size: 0.95rem; font-style: italic; margin-top: 15px;">
          O cabelo que termina na altura da cintura ou quadril interfere nessas proporções. Por isso a posição importa.
        </p>
      </div>

      <div style="text-align: center; margin-top: 40px;">
        <button class="quadrante-btn" onclick="explorarBiotipos()" style="font-size: 1rem; padding: 15px 30px; margin-bottom: 15px; width: 100%; max-width: 400px;">
          Entender Biotipos →
        </button>
        <button class="quadrante-btn" onclick="irParaPerguntas()" style="font-size: 1rem; padding: 15px 30px; width: 100%; max-width: 400px;">
          Ir para Perguntas →
        </button>
      </div>
    </div>
  `;
}

function explorarBiotipos() {
  q3State.etapa = 'biotipos';
  const conteudo = document.getElementById('conteudo-q3');
  const nome = usuariaData.nome || 'você';
  conteudo.innerHTML = `
    <div style="max-width: 800px; margin: 40px auto;">
      <h2 style="color: #E85D9F; font-size: 1.3rem; margin-bottom: 30px; text-align: center;">
        Explore Os 5 Biotipos (${nome})
      </h2>

      <div style="background: rgba(100, 100, 150, 0.1); border-left: 4px solid #8888DD; padding: 25px; border-radius: 12px; margin-bottom: 25px;">
        <h3 style="color: #8888DD; margin-bottom: 12px;">⬜ RETÂNGULO</h3>
        <p style="color: #ddd; line-height: 1.8; margin-bottom: 12px;">
          Ombros e quadril na mesma largura. Cintura pouco definida. A silhueta é linear.
        </p>
        <p style="color: #ccc; margin-bottom: 12px;">
          <strong>O Desafio:</strong> Criar dimensão onde não existe. Quebrar a linearidade.
        </p>
        <p style="color: #aaa; line-height: 1.8;">
          <strong>Cortes que funcionam:</strong> Movimento, volume lateral (ondas, cachos), cabelo que sai do rosto para criar amplitude. Franja diagonal (quebra a monotonia). Comprimento que cai na cintura (cria ilusão de curva).
        </p>
      </div>

      <div style="background: rgba(76, 175, 80, 0.1); border-left: 4px solid #4CAF50; padding: 25px; border-radius: 12px; margin-bottom: 25px;">
        <h3 style="color: #4CAF50; margin-bottom: 12px;">🍐 PÊRA</h3>
        <p style="color: #ddd; line-height: 1.8; margin-bottom: 12px;">
          Ombros estreitos, quadril largo. Cintura marcada. A silhueta é triangular para baixo.
        </p>
        <p style="color: #ccc; margin-bottom: 12px;">
          <strong>O Desafio:</strong> Equilibrar: adicionar dimensão nos ombros, não nos quadris.
        </p>
        <p style="color: #aaa; line-height: 1.8;">
          <strong>Cortes que funcionam:</strong> Volume e movimento NOS OMBROS (camadas, ondas, volume nos lados do rosto). Comprimento que termina na cintura (evita ampliar quadril). Franja que abre o rosto (expande ombros). Cor/mechas nos ombros.
        </p>
      </div>

      <div style="background: rgba(233, 30, 99, 0.1); border-left: 4px solid #E91E63; padding: 25px; border-radius: 12px; margin-bottom: 25px;">
        <h3 style="color: #E91E63; margin-bottom: 12px;">△ TRIÂNGULO INVERTIDO</h3>
        <p style="color: #ddd; line-height: 1.8; margin-bottom: 12px;">
          Ombros largos, quadril estreito. Seios proeminentes. A silhueta é triangular para cima.
        </p>
        <p style="color: #ccc; margin-bottom: 12px;">
          <strong>O Desafio:</strong> Retirar peso visual de cima, adicionar dimensão embaixo.
        </p>
        <p style="color: #aaa; line-height: 1.8;">
          <strong>Cortes que funcionam:</strong> Cabelo presos ou lateral (menos volume na parte superior). Comprimento longo (traz peso para baixo). Ondas/cachos nas pontas (amplifica quadril). Franja reta (distribui visualmente). Cores/mechas a partir do meio.
        </p>
      </div>

      <div style="background: rgba(255, 193, 7, 0.1); border-left: 4px solid #FFC107; padding: 25px; border-radius: 12px; margin-bottom: 25px;">
        <h3 style="color: #FFC107; margin-bottom: 12px;">♀️ AMPULHETA</h3>
        <p style="color: #ddd; line-height: 1.8; margin-bottom: 12px;">
          Ombros e quadril proporcionais. Cintura muito marcada. Curvas simétricas.
        </p>
        <p style="color: #ccc; margin-bottom: 12px;">
          <strong>O Desafio:</strong> Nenhum. Reforçar as curvas que já existem.
        </p>
        <p style="color: #aaa; line-height: 1.8;">
          <strong>Cortes que funcionam:</strong> Qualquer coisa. Mas o melhor? Comprimento que marca a cintura (reforça a curva). Volume onde a silhueta já é curva. Movimento fluido. Você tem permissão de usar linhas curvas do cabelo porque seu corpo é curvo.
        </p>
      </div>

      <div style="background: rgba(156, 39, 176, 0.1); border-left: 4px solid #9C27B0; padding: 25px; border-radius: 12px; margin-bottom: 30px;">
        <h3 style="color: #9C27B0; margin-bottom: 12px;">⭕ OVAL</h3>
        <p style="color: #ddd; line-height: 1.8; margin-bottom: 12px;">
          Formas mais arredondadas. Distribuição equilibrada. Nenhuma região é dramática.
        </p>
        <p style="color: #ccc; margin-bottom: 12px;">
          <strong>O Desafio:</strong> Máxima flexibilidade. Seu corpo funciona com quase qualquer proporção de cabelo.
        </p>
        <p style="color: #aaa; line-height: 1.8;">
          <strong>Cortes que funcionam:</strong> Escolha baseada no rosto, não no corpo. Seu corpo é tão equilibrado que o cabelo pode favorecer qualquer estilo que traga segurança emocional.
        </p>
      </div>

      <div style="text-align: center;">
        <button class="quadrante-btn" onclick="irParaPerguntas()" style="font-size: 1rem; padding: 15px 30px; width: 100%; max-width: 400px;">
          Entendi — Próximo →
        </button>
      </div>
    </div>
  `;
}

function irParaPerguntas() {
  q3State.etapa = 'perguntas';
  const conteudo = document.getElementById('conteudo-q3');
  const nome = usuariaData.nome || 'você';
  conteudo.innerHTML = `
    <form id="quiz-corpo-novo" style="max-width: 600px; margin: 40px auto;">
      <div style="margin-bottom: 30px;">
        <h3 style="color: #E85D9F; margin-bottom: 20px; font-size: 1.1rem;">P1: Qual é seu Biotipo, ${nome}?</h3>
        <p style="color: #aaa; margin-bottom: 15px; font-size: 0.9rem;">Escolha a opção que mais descreve seu corpo:</p>

        <div class="quiz-option">
          <input type="radio" name="biotipo" value="retangulo" id="bio-ret">
          <label for="bio-ret"><strong>Retângulo</strong> — Ombros e quadril iguais, cintura pouco marcada</label>
        </div>
        <div class="quiz-option">
          <input type="radio" name="biotipo" value="pera" id="bio-pera">
          <label for="bio-pera"><strong>Pêra</strong> — Ombros estreitos, quadril largo</label>
        </div>
        <div class="quiz-option">
          <input type="radio" name="biotipo" value="triangulo_inv" id="bio-tri">
          <label for="bio-tri"><strong>Triângulo Invertido</strong> — Ombros largos, quadril estreito</label>
        </div>
        <div class="quiz-option">
          <input type="radio" name="biotipo" value="ampulheta" id="bio-amp">
          <label for="bio-amp"><strong>Ampulheta</strong> — Ombros e quadril proporcionais, cintura marcada</label>
        </div>
        <div class="quiz-option">
          <input type="radio" name="biotipo" value="oval" id="bio-oval">
          <label for="bio-oval"><strong>Oval</strong> — Formas redondas, equilibradas</label>
        </div>
      </div>

      <div style="margin-bottom: 30px; padding-top: 20px; border-top: 1px solid #333;">
        <h3 style="color: #E85D9F; margin-bottom: 20px; font-size: 1.1rem;">P2: Linhas do Seu Corpo?</h3>
        <p style="color: #aaa; margin-bottom: 15px; font-size: 0.9rem;">Qual tipo de linhas predominam?</p>

        <div class="quiz-option">
          <input type="radio" name="linhasCorpo" value="retas" id="lin-ret">
          <label for="lin-ret"><strong>Retas</strong> — Linhas definidas, estruturadas</label>
        </div>
        <div class="quiz-option">
          <input type="radio" name="linhasCorpo" value="curvas" id="lin-cur">
          <label for="lin-cur"><strong>Curvas</strong> — Formas suaves, arredondadas</label>
        </div>
        <div class="quiz-option">
          <input type="radio" name="linhasCorpo" value="mistura" id="lin-mix">
          <label for="lin-mix"><strong>Mistura</strong> — Retas e curvas em regiões diferentes</label>
        </div>
      </div>

      <div style="margin-bottom: 30px; padding-top: 20px; border-top: 1px solid #333;">
        <h3 style="color: #E85D9F; margin-bottom: 20px; font-size: 1.1rem;">P3: Comprimento Preferido?</h3>
        <p style="color: #aaa; margin-bottom: 15px; font-size: 0.9rem;">Qual comprimento você prefere?</p>

        <div class="quiz-option">
          <input type="radio" name="comprimento" value="curto" id="comp-curt">
          <label for="comp-curt"><strong>Curto</strong> — Acima ou no ombro</label>
        </div>
        <div class="quiz-option">
          <input type="radio" name="comprimento" value="medio" id="comp-med">
          <label for="comp-med"><strong>Médio</strong> — Ombro até cintura</label>
        </div>
        <div class="quiz-option">
          <input type="radio" name="comprimento" value="longo" id="comp-long">
          <label for="comp-long"><strong>Longo</strong> — Cintura ou mais</label>
        </div>
      </div>

      <button type="button" class="quadrante-btn" onclick="finalizarQ3()" style="width: 100%; padding: 15px;">
        ✓ Finalizar Corpo
      </button>
    </form>
  `;
}

function finalizarQ3() {
  const form = document.getElementById('quiz-corpo-novo');

  const biotipo = form.querySelector('input[name="biotipo"]:checked')?.value;
  const linhasCorpo = form.querySelector('input[name="linhasCorpo"]:checked')?.value;
  const comprimento = form.querySelector('input[name="comprimento"]:checked')?.value;
  const franja = form.querySelector('input[name="franja"]:checked')?.value;

  if (!biotipo || !linhasCorpo || !comprimento || !franja) {
    alert('⚠️ Responda todas as perguntas para continuar');
    return;
  }

  // Armazenar no estado
  q3State.biotipo = biotipo;
  q3State.linhasCorpo = linhasCorpo;
  q3State.comprimento = comprimento;
  q3State.franja = franja;

  // Armazenar no usuariaData global também
  usuariaData.corpo = {
    biotipo,
    linhasCorpo,
    comprimento,
    franja
  };

  // UPDATE GLOBAL STATE — Mark Q3 as complete
  atualizarCorpo({
    biotipo,
    linhasCorpo,
    comprimentoPreferido: comprimento
  });
  atualizarStatusBadge(3);

  // Exibir confirmação
  const conteudo = document.getElementById('conteudo-q3');
  conteudo.innerHTML = `
    <div style="text-align: center; padding: 40px;">
      <h3 style="color: #4CAF50; margin-bottom: 20px;">✓ Análise de Corpo Concluída!</h3>
      <div style="background: rgba(76, 175, 80, 0.1); border: 1px solid #4CAF50; padding: 25px; border-radius: 12px; text-align: left; margin-bottom: 30px;">
        <p style="color: #aaa; margin-bottom: 12px;"><strong>Biotipo:</strong> <span style="color: #4CAF50;">${biotipo.toUpperCase()}</span></p>
        <p style="color: #aaa; margin-bottom: 12px;"><strong>Linhas do Corpo:</strong> <span style="color: #4CAF50;">${linhasCorpo.toUpperCase()}</span></p>
        <p style="color: #aaa; margin-bottom: 12px;"><strong>Comprimento Preferido:</strong> <span style="color: #4CAF50;">${comprimento.toUpperCase()}</span></p>
        <p style="color: #aaa;"><strong>Franja:</strong> <span style="color: #4CAF50;">${franja.toUpperCase()}</span></p>
      </div>
      <p style="color: #ccc; line-height: 1.8; margin-bottom: 30px;">
        Você completou os 3 quadrantes! Agora vamos consolidar tudo em uma recomendação integrada.
      </p>
      <button class="quadrante-btn" onclick="fecharPainel(3)" style="padding: 12px 30px;">
        ← Voltar ao Menu
      </button>
    </div>
  `;
}
